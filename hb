export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const origin = url.origin;

    // ==========================================
    // 路由 1: GET 触发更新 (/update)
    // ==========================================
    if (path === '/update') {
      return await handleGetUpdate(request, env);
    }

    // ==========================================
    // 路由 2 & 3: 输出播放列表 (从 D1 极速读取)
    // ==========================================
    if (path === '/m3u' || path === '/playlist.m3u') {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM channels").all();
        return generatePlaylist(origin, 'm3u', results || []);
      } catch (e) { return new Response("D1 读取失败: " + e.message, { status: 500 }); }
    }
    if (path === '/txt' || path === '/playlist.txt') {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM channels").all();
        return generatePlaylist(origin, 'txt', results || []);
      } catch (e) { return new Response("D1 读取失败: " + e.message, { status: 500 }); }
    }

    // ==========================================
    // 路由 4: 播放时实时解析直播流并跳转
    // 兼容格式: /平台/房间号 或 /平台/房间号/线路序号
    // ==========================================
    const match = path.match(/^\/(huya|bilibili)\/(\d+)(?:\/(\d+))?$/);
    if (match) {
      const platform = match[1];
      const roomId = match[2];
      const lineIndex = match[3]; // 可选的线路参数
      return await handleStreamRedirect(platform, roomId, lineIndex);
    }

    return new Response("Worker is running with D1! 访问 /m3u 获取列表。", { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
};

// ==========================================
// 处理 GET 拉取更新逻辑 (保持不变)
// ==========================================
async function handleGetUpdate(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const sourceUrl = url.searchParams.get('url') || env.SOURCE_URL;

  if (env.API_TOKEN && token !== env.API_TOKEN) {
    return new Response("Unauthorized: 访问被拒绝", { status: 401 });
  }
  if (!sourceUrl) {
    return new Response("缺少数据源", { status: 400 });
  }

  try {
    const fetchRes = await fetch(sourceUrl, { headers: { "User-Agent": "CloudflareWorker" } });
    if (!fetchRes.ok) throw new Error("无法读取远程文件");
    const newChannels = await fetchRes.json();
    if (!Array.isArray(newChannels)) throw new Error("数据格式非 JSON 数组");

    await env.DB.prepare("DELETE FROM channels").run();
    const stmt = env.DB.prepare("INSERT INTO channels (name, platform, room_id, group_name) VALUES (?, ?, ?, ?)");
    const batch = newChannels.map(ch => stmt.bind(ch.name, ch.platform, ch.roomId || ch.room_id, ch.group || ch.group_name || '未分类'));
    if (batch.length > 0) await env.DB.batch(batch);

    return new Response(`🎉 更新成功！同步了 ${batch.length} 个频道。`, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (error) {
    return new Response("更新失败: " + error.message, { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}

// ==========================================
// 生成播放列表 (自动为B站裂变多条线路)
// ==========================================
function generatePlaylist(origin, format, channels) {
  if (format === 'm3u') {
    let content = "#EXTM3U\n";
    for (const ch of channels) {
      const roomId = ch.roomId || ch.room_id;
      if (ch.platform === 'bilibili') {
        // B站自动输出 线路1 和 线路2
        content += `#EXTINF:-1 group-title="${ch.group_name}",${ch.name}-线路1\n${origin}/${ch.platform}/${roomId}/1\n`;
        content += `#EXTINF:-1 group-title="${ch.group_name}",${ch.name}-线路2\n${origin}/${ch.platform}/${roomId}/2\n`;
      } else {
        content += `#EXTINF:-1 group-title="${ch.group_name}",${ch.name}\n${origin}/${ch.platform}/${roomId}\n`;
      }
    }
    return new Response(content, { headers: { "Content-Type": "application/vnd.apple.mpegurl; charset=utf-8" }});
  } else {
    let content = "";
    for (const ch of channels) {
      const roomId = ch.roomId || ch.room_id;
      if (ch.platform === 'bilibili') {
        // TXT 格式的 B站线路输出
        content += `${ch.name}-线路1,${origin}/${ch.platform}/${roomId}/1\n`;
        content += `${ch.name}-线路2,${origin}/${ch.platform}/${roomId}/2\n`;
      } else {
        content += `${ch.name},${origin}/${ch.platform}/${roomId}\n`;
      }
    }
    return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" }});
  }
}

// ==========================================
// 实时解析直播流并跳转 (按线路精准提取)
// ==========================================
async function handleStreamRedirect(platform, roomId, lineIndexStr) {
  const apiUrl = `https://okmnibox.ksg.pp.ua/api/live/stream/${platform}/${roomId}`;
  try {
    const response = await fetch(apiUrl, { headers: { "User-Agent": "Mozilla/5.0" }});
    const json = await response.json();
    
    if (!json.data || !json.data.success || !json.data.data) {
       return new Response("获取直播流失败或主播未开播", { status: 404 });
    }

    const streamData = json.data.data;
    const streams = streamData.multi_stream_urls || [];
    let targetUrl = "";
    
    // 解析用户请求的线路号，默认为 1
    const lineIndex = parseInt(lineIndexStr) || 1;

    if (platform === 'huya') {
      // 虎牙逻辑不变，取第一个蓝光
      targetUrl = streams.find(s => s.quality?.name?.includes("蓝光"))?.url || streams[0]?.url || streamData?.stream_urls?.hls;
    } else if (platform === 'bilibili') {
      // 提取出所有画质包含“原画”的流
      const originalStreams = streams.filter(s => s.quality?.name?.includes("原画"));
      
      if (originalStreams.length > 0) {
        // 根据用户请求的线路号获取对应流（数组索引从0开始，所以减1）
        // 如果请求的线路超出范围（比如请求线路3但只有2条原画），则智能回退到第1条
        const selectedStream = originalStreams[lineIndex - 1] || originalStreams[0];
        targetUrl = selectedStream.url;
      } else {
        // 如果没有原画流，降级获取第一个流
        targetUrl = streams[0]?.url || streamData?.stream_urls?.hls;
      }
    }

    if (targetUrl) return Response.redirect(targetUrl, 302);
    return new Response("未能解析出播放地址，主播可能未开播", { status: 404 });
  } catch (error) {
    return new Response("请求接口超时或失败", { status: 500 });
  }
}
