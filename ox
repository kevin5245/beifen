addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 仅响应 /txt 和 /m3u 路径
  if (path !== '/txt' && path !== '/m3u') {
    return new Response('请访问 /txt 或 /m3u 获取直播列表。', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const apiUrl = 'https://olxtv.com/api/v1/livescore?status=live';
  
  try {
    // 抓取上游 API 数据
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    const json = await response.json();

    let streams = [];

    // 解析并提取满足条件的数据
    if (json.success && json.data) {
      for (const sportData of json.data) {
        if (!sportData.leagues) continue;
        
        for (const league of sportData.leagues) {
          if (!league.matches) continue;
          
          for (const match of league.matches) {
            // 筛选正在直播的比赛并且有直播源的数据
            if (match.status === 'live' && match.live_sources && match.live_sources.length > 0) {
              for (const source of match.live_sources) {
                if (source.source) {
                  // 执行 URL 替换拼接规则
                  let transformedUrl = source.source
                    .replace('/sportnobar/', '/streamoke/')
                    .replace('.m3u8', '/main_stream.m3u8');
                  
                  // 拼接标题，例如：Colombia U19 VS Tunisia U23 [HD]
                  let title = `${match.title} [${source.name}]`;
                  
                  streams.push({
                    title: title,
                    url: transformedUrl
                  });
                }
              }
            }
          }
        }
      }
    }

    // 根据请求路径返回不同格式
    if (path === '/txt') {
      // 输出 TXT 格式 (添加统一分组名头)
      const txtContent = 'OXTV线路,#genre#\n' + streams.map(s => `${s.title},${s.url}`).join('\n');
      return new Response(txtContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      });
      
    } else if (path === '/m3u') {
      // 输出 M3U 格式 (添加 group-title 属性)
      let m3uContent = '#EXTM3U\n';
      streams.forEach(s => {
        m3uContent += `#EXTINF:-1 group-title="OXTV线路",${s.title}\n${s.url}\n`;
      });
      return new Response(m3uContent, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl; charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      });
    }

  } catch (error) {
    return new Response(`Error fetching or parsing data: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
