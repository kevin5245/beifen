var Wr = Object.defineProperty;
var Yr = (t, e, r) => e in t ? Wr(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: r
}) : t[e] = r;
var l = (t, e, r) => (Yr(t, typeof e != "symbol" ? e + "" : e, r),
r);
var Qr = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {}
  , G = "1.9.0"
  , Re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function Jr(t) {
    var e = new Set([t])
      , r = new Set
      , n = t.match(Re);
    if (!n)
        return function() {
            return !1
        }
        ;
    var s = {
        major: +n[1],
        minor: +n[2],
        patch: +n[3],
        prerelease: n[4]
    };
    if (s.prerelease != null)
        return function(u) {
            return u === t
        }
        ;
    function i(a) {
        return r.add(a),
        !1
    }
    function o(a) {
        return e.add(a),
        !0
    }
    return function(u) {
        if (e.has(u))
            return !0;
        if (r.has(u))
            return !1;
        var c = u.match(Re);
        if (!c)
            return i(u);
        var f = {
            major: +c[1],
            minor: +c[2],
            patch: +c[3],
            prerelease: c[4]
        };
        return f.prerelease != null || s.major !== f.major ? i(u) : s.major === 0 ? s.minor === f.minor && s.patch <= f.patch ? o(u) : i(u) : s.minor <= f.minor ? o(u) : i(u)
    }
}
var Zr = Jr(G)
  , tn = G.split(".")[0]
  , it = Symbol.for("opentelemetry.js.api." + tn)
  , ot = Qr;
function dt(t, e, r, n) {
    var s;
    n === void 0 && (n = !1);
    var i = ot[it] = (s = ot[it]) !== null && s !== void 0 ? s : {
        version: G
    };
    if (!n && i[t]) {
        var o = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + t);
        return r.error(o.stack || o.message),
        !1
    }
    if (i.version !== G) {
        var o = new Error("@opentelemetry/api: Registration of version v" + i.version + " for " + t + " does not match previously registered API v" + G);
        return r.error(o.stack || o.message),
        !1
    }
    return i[t] = e,
    r.debug("@opentelemetry/api: Registered a global for " + t + " v" + G + "."),
    !0
}
function F(t) {
    var e, r, n = (e = ot[it]) === null || e === void 0 ? void 0 : e.version;
    if (!(!n || !Zr(n)))
        return (r = ot[it]) === null || r === void 0 ? void 0 : r[t]
}
function pt(t, e) {
    e.debug("@opentelemetry/api: Unregistering a global for " + t + " v" + G + ".");
    var r = ot[it];
    r && delete r[t]
}
var en = globalThis && globalThis.__read || function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r)
        return t;
    var n = r.call(t), s, i = [], o;
    try {
        for (; (e === void 0 || e-- > 0) && !(s = n.next()).done; )
            i.push(s.value)
    } catch (a) {
        o = {
            error: a
        }
    } finally {
        try {
            s && !s.done && (r = n.return) && r.call(n)
        } finally {
            if (o)
                throw o.error
        }
    }
    return i
}
  , rn = globalThis && globalThis.__spreadArray || function(t, e, r) {
    if (r || arguments.length === 2)
        for (var n = 0, s = e.length, i; n < s; n++)
            (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)),
            i[n] = e[n]);
    return t.concat(i || Array.prototype.slice.call(e))
}
  , nn = function() {
    function t(e) {
        this._namespace = e.namespace || "DiagComponentLogger"
    }
    return t.prototype.debug = function() {
        for (var e = [], r = 0; r < arguments.length; r++)
            e[r] = arguments[r];
        return Q("debug", this._namespace, e)
    }
    ,
    t.prototype.error = function() {
        for (var e = [], r = 0; r < arguments.length; r++)
            e[r] = arguments[r];
        return Q("error", this._namespace, e)
    }
    ,
    t.prototype.info = function() {
        for (var e = [], r = 0; r < arguments.length; r++)
            e[r] = arguments[r];
        return Q("info", this._namespace, e)
    }
    ,
    t.prototype.warn = function() {
        for (var e = [], r = 0; r < arguments.length; r++)
            e[r] = arguments[r];
        return Q("warn", this._namespace, e)
    }
    ,
    t.prototype.verbose = function() {
        for (var e = [], r = 0; r < arguments.length; r++)
            e[r] = arguments[r];
        return Q("verbose", this._namespace, e)
    }
    ,
    t
}();
function Q(t, e, r) {
    var n = F("diag");
    if (n)
        return r.unshift(e),
        n[t].apply(n, rn([], en(r), !1))
}
var O;
(function(t) {
    t[t.NONE = 0] = "NONE",
    t[t.ERROR = 30] = "ERROR",
    t[t.WARN = 50] = "WARN",
    t[t.INFO = 60] = "INFO",
    t[t.DEBUG = 70] = "DEBUG",
    t[t.VERBOSE = 80] = "VERBOSE",
    t[t.ALL = 9999] = "ALL"
}
)(O || (O = {}));
function sn(t, e) {
    t < O.NONE ? t = O.NONE : t > O.ALL && (t = O.ALL),
    e = e || {};
    function r(n, s) {
        var i = e[n];
        return typeof i == "function" && t >= s ? i.bind(e) : function() {}
    }
    return {
        error: r("error", O.ERROR),
        warn: r("warn", O.WARN),
        info: r("info", O.INFO),
        debug: r("debug", O.DEBUG),
        verbose: r("verbose", O.VERBOSE)
    }
}
var on = globalThis && globalThis.__read || function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r)
        return t;
    var n = r.call(t), s, i = [], o;
    try {
        for (; (e === void 0 || e-- > 0) && !(s = n.next()).done; )
            i.push(s.value)
    } catch (a) {
        o = {
            error: a
        }
    } finally {
        try {
            s && !s.done && (r = n.return) && r.call(n)
        } finally {
            if (o)
                throw o.error
        }
    }
    return i
}
  , an = globalThis && globalThis.__spreadArray || function(t, e, r) {
    if (r || arguments.length === 2)
        for (var n = 0, s = e.length, i; n < s; n++)
            (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)),
            i[n] = e[n]);
    return t.concat(i || Array.prototype.slice.call(e))
}
  , un = "diag"
  , I = function() {
    function t() {
        function e(s) {
            return function() {
                for (var i = [], o = 0; o < arguments.length; o++)
                    i[o] = arguments[o];
                var a = F("diag");
                if (a)
                    return a[s].apply(a, an([], on(i), !1))
            }
        }
        var r = this
          , n = function(s, i) {
            var o, a, u;
            if (i === void 0 && (i = {
                logLevel: O.INFO
            }),
            s === r) {
                var c = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                return r.error((o = c.stack) !== null && o !== void 0 ? o : c.message),
                !1
            }
            typeof i == "number" && (i = {
                logLevel: i
            });
            var f = F("diag")
              , d = sn((a = i.logLevel) !== null && a !== void 0 ? a : O.INFO, s);
            if (f && !i.suppressOverrideMessage) {
                var _ = (u = new Error().stack) !== null && u !== void 0 ? u : "<failed to generate stacktrace>";
                f.warn("Current logger will be overwritten from " + _),
                d.warn("Current logger will overwrite one already registered from " + _)
            }
            return dt("diag", d, r, !0)
        };
        r.setLogger = n,
        r.disable = function() {
            pt(un, r)
        }
        ,
        r.createComponentLogger = function(s) {
            return new nn(s)
        }
        ,
        r.verbose = e("verbose"),
        r.debug = e("debug"),
        r.info = e("info"),
        r.warn = e("warn"),
        r.error = e("error")
    }
    return t.instance = function() {
        return this._instance || (this._instance = new t),
        this._instance
    }
    ,
    t
}()
  , cn = globalThis && globalThis.__read || function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r)
        return t;
    var n = r.call(t), s, i = [], o;
    try {
        for (; (e === void 0 || e-- > 0) && !(s = n.next()).done; )
            i.push(s.value)
    } catch (a) {
        o = {
            error: a
        }
    } finally {
        try {
            s && !s.done && (r = n.return) && r.call(n)
        } finally {
            if (o)
                throw o.error
        }
    }
    return i
}
  , ln = globalThis && globalThis.__values || function(t) {
    var e = typeof Symbol == "function" && Symbol.iterator
      , r = e && t[e]
      , n = 0;
    if (r)
        return r.call(t);
    if (t && typeof t.length == "number")
        return {
            next: function() {
                return t && n >= t.length && (t = void 0),
                {
                    value: t && t[n++],
                    done: !t
                }
            }
        };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
}
  , fn = function() {
    function t(e) {
        this._entries = e ? new Map(e) : new Map
    }
    return t.prototype.getEntry = function(e) {
        var r = this._entries.get(e);
        if (r)
            return Object.assign({}, r)
    }
    ,
    t.prototype.getAllEntries = function() {
        return Array.from(this._entries.entries()).map(function(e) {
            var r = cn(e, 2)
              , n = r[0]
              , s = r[1];
            return [n, s]
        })
    }
    ,
    t.prototype.setEntry = function(e, r) {
        var n = new t(this._entries);
        return n._entries.set(e, r),
        n
    }
    ,
    t.prototype.removeEntry = function(e) {
        var r = new t(this._entries);
        return r._entries.delete(e),
        r
    }
    ,
    t.prototype.removeEntries = function() {
        for (var e, r, n = [], s = 0; s < arguments.length; s++)
            n[s] = arguments[s];
        var i = new t(this._entries);
        try {
            for (var o = ln(n), a = o.next(); !a.done; a = o.next()) {
                var u = a.value;
                i._entries.delete(u)
            }
        } catch (c) {
            e = {
                error: c
            }
        } finally {
            try {
                a && !a.done && (r = o.return) && r.call(o)
            } finally {
                if (e)
                    throw e.error
            }
        }
        return i
    }
    ,
    t.prototype.clear = function() {
        return new t
    }
    ,
    t
}()
  , dn = Symbol("BaggageEntryMetadata")
  , pn = I.instance();
function hn(t) {
    return t === void 0 && (t = {}),
    new fn(new Map(Object.entries(t)))
}
function _n(t) {
    return typeof t != "string" && (pn.error("Cannot create baggage metadata from unknown type: " + typeof t),
    t = ""),
    {
        __TYPE__: dn,
        toString: function() {
            return t
        }
    }
}
function le(t) {
    return Symbol.for(t)
}
var gn = function() {
    function t(e) {
        var r = this;
        r._currentContext = e ? new Map(e) : new Map,
        r.getValue = function(n) {
            return r._currentContext.get(n)
        }
        ,
        r.setValue = function(n, s) {
            var i = new t(r._currentContext);
            return i._currentContext.set(n, s),
            i
        }
        ,
        r.deleteValue = function(n) {
            var s = new t(r._currentContext);
            return s._currentContext.delete(n),
            s
        }
    }
    return t
}(), z = new gn, V = globalThis && globalThis.__extends || function() {
    var t = function(e, r) {
        return t = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, s) {
            n.__proto__ = s
        }
        || function(n, s) {
            for (var i in s)
                Object.prototype.hasOwnProperty.call(s, i) && (n[i] = s[i])
        }
        ,
        t(e, r)
    };
    return function(e, r) {
        if (typeof r != "function" && r !== null)
            throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        t(e, r);
        function n() {
            this.constructor = e
        }
        e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype,
        new n)
    }
}(), mn = function() {
    function t() {}
    return t.prototype.createGauge = function(e, r) {
        return wn
    }
    ,
    t.prototype.createHistogram = function(e, r) {
        return Cn
    }
    ,
    t.prototype.createCounter = function(e, r) {
        return On
    }
    ,
    t.prototype.createUpDownCounter = function(e, r) {
        return Pn
    }
    ,
    t.prototype.createObservableGauge = function(e, r) {
        return Nn
    }
    ,
    t.prototype.createObservableCounter = function(e, r) {
        return Ln
    }
    ,
    t.prototype.createObservableUpDownCounter = function(e, r) {
        return In
    }
    ,
    t.prototype.addBatchObservableCallback = function(e, r) {}
    ,
    t.prototype.removeBatchObservableCallback = function(e) {}
    ,
    t
}(), wt = function() {
    function t() {}
    return t
}(), En = function(t) {
    V(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.add = function(r, n) {}
    ,
    e
}(wt), Tn = function(t) {
    V(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.add = function(r, n) {}
    ,
    e
}(wt), Sn = function(t) {
    V(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.record = function(r, n) {}
    ,
    e
}(wt), yn = function(t) {
    V(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this
    }
    return e.prototype.record = function(r, n) {}
    ,
    e
}(wt), fe = function() {
    function t() {}
    return t.prototype.addCallback = function(e) {}
    ,
    t.prototype.removeCallback = function(e) {}
    ,
    t
}(), bn = function(t) {
    V(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this
    }
    return e
}(fe), An = function(t) {
    V(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this
    }
    return e
}(fe), Rn = function(t) {
    V(e, t);
    function e() {
        return t !== null && t.apply(this, arguments) || this
    }
    return e
}(fe), vn = new mn, On = new En, wn = new Sn, Cn = new yn, Pn = new Tn, Ln = new bn, Nn = new An, In = new Rn, xn = {
    get: function(t, e) {
        if (t != null)
            return t[e]
    },
    keys: function(t) {
        return t == null ? [] : Object.keys(t)
    }
}, Dn = {
    set: function(t, e, r) {
        t != null && (t[e] = r)
    }
}, Mn = globalThis && globalThis.__read || function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r)
        return t;
    var n = r.call(t), s, i = [], o;
    try {
        for (; (e === void 0 || e-- > 0) && !(s = n.next()).done; )
            i.push(s.value)
    } catch (a) {
        o = {
            error: a
        }
    } finally {
        try {
            s && !s.done && (r = n.return) && r.call(n)
        } finally {
            if (o)
                throw o.error
        }
    }
    return i
}
, Un = globalThis && globalThis.__spreadArray || function(t, e, r) {
    if (r || arguments.length === 2)
        for (var n = 0, s = e.length, i; n < s; n++)
            (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)),
            i[n] = e[n]);
    return t.concat(i || Array.prototype.slice.call(e))
}
, Bn = function() {
    function t() {}
    return t.prototype.active = function() {
        return z
    }
    ,
    t.prototype.with = function(e, r, n) {
        for (var s = [], i = 3; i < arguments.length; i++)
            s[i - 3] = arguments[i];
        return r.call.apply(r, Un([n], Mn(s), !1))
    }
    ,
    t.prototype.bind = function(e, r) {
        return r
    }
    ,
    t.prototype.enable = function() {
        return this
    }
    ,
    t.prototype.disable = function() {
        return this
    }
    ,
    t
}(), kn = globalThis && globalThis.__read || function(t, e) {
    var r = typeof Symbol == "function" && t[Symbol.iterator];
    if (!r)
        return t;
    var n = r.call(t), s, i = [], o;
    try {
        for (; (e === void 0 || e-- > 0) && !(s = n.next()).done; )
            i.push(s.value)
    } catch (a) {
        o = {
            error: a
        }
    } finally {
        try {
            s && !s.done && (r = n.return) && r.call(n)
        } finally {
            if (o)
                throw o.error
        }
    }
    return i
}
, Hn = globalThis && globalThis.__spreadArray || function(t, e, r) {
    if (r || arguments.length === 2)
        for (var n = 0, s = e.length, i; n < s; n++)
            (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)),
            i[n] = e[n]);
    return t.concat(i || Array.prototype.slice.call(e))
}
, xt = "context", jn = new Bn, Ct = function() {
    function t() {}
    return t.getInstance = function() {
        return this._instance || (this._instance = new t),
        this._instance
    }
    ,
    t.prototype.setGlobalContextManager = function(e) {
        return dt(xt, e, I.instance())
    }
    ,
    t.prototype.active = function() {
        return this._getContextManager().active()
    }
    ,
    t.prototype.with = function(e, r, n) {
        for (var s, i = [], o = 3; o < arguments.length; o++)
            i[o - 3] = arguments[o];
        return (s = this._getContextManager()).with.apply(s, Hn([e, r, n], kn(i), !1))
    }
    ,
    t.prototype.bind = function(e, r) {
        return this._getContextManager().bind(e, r)
    }
    ,
    t.prototype._getContextManager = function() {
        return F(xt) || jn
    }
    ,
    t.prototype.disable = function() {
        this._getContextManager().disable(),
        pt(xt, I.instance())
    }
    ,
    t
}(), H;
(function(t) {
    t[t.NONE = 0] = "NONE",
    t[t.SAMPLED = 1] = "SAMPLED"
}
)(H || (H = {}));
var We = "0000000000000000"
  , Ye = "00000000000000000000000000000000"
  , Qe = {
    traceId: Ye,
    spanId: We,
    traceFlags: H.NONE
}
  , rt = function() {
    function t(e) {
        e === void 0 && (e = Qe),
        this._spanContext = e
    }
    return t.prototype.spanContext = function() {
        return this._spanContext
    }
    ,
    t.prototype.setAttribute = function(e, r) {
        return this
    }
    ,
    t.prototype.setAttributes = function(e) {
        return this
    }
    ,
    t.prototype.addEvent = function(e, r) {
        return this
    }
    ,
    t.prototype.addLink = function(e) {
        return this
    }
    ,
    t.prototype.addLinks = function(e) {
        return this
    }
    ,
    t.prototype.setStatus = function(e) {
        return this
    }
    ,
    t.prototype.updateName = function(e) {
        return this
    }
    ,
    t.prototype.end = function(e) {}
    ,
    t.prototype.isRecording = function() {
        return !1
    }
    ,
    t.prototype.recordException = function(e, r) {}
    ,
    t
}()
  , de = le("OpenTelemetry Context Key SPAN");
function pe(t) {
    return t.getValue(de) || void 0
}
function $n() {
    return pe(Ct.getInstance().active())
}
function he(t, e) {
    return t.setValue(de, e)
}
function Gn(t) {
    return t.deleteValue(de)
}
function Fn(t, e) {
    return he(t, new rt(e))
}
function Je(t) {
    var e;
    return (e = pe(t)) === null || e === void 0 ? void 0 : e.spanContext()
}
var Vn = /^([0-9a-f]{32})$/i
  , zn = /^[0-9a-f]{16}$/i;
function Ze(t) {
    return Vn.test(t) && t !== Ye
}
function qn(t) {
    return zn.test(t) && t !== We
}
function Pt(t) {
    return Ze(t.traceId) && qn(t.spanId)
}
function Xn(t) {
    return new rt(t)
}
var Dt = Ct.getInstance()
  , tr = function() {
    function t() {}
    return t.prototype.startSpan = function(e, r, n) {
        n === void 0 && (n = Dt.active());
        var s = !!(r != null && r.root);
        if (s)
            return new rt;
        var i = n && Je(n);
        return Kn(i) && Pt(i) ? new rt(i) : new rt
    }
    ,
    t.prototype.startActiveSpan = function(e, r, n, s) {
        var i, o, a;
        if (!(arguments.length < 2)) {
            arguments.length === 2 ? a = r : arguments.length === 3 ? (i = r,
            a = n) : (i = r,
            o = n,
            a = s);
            var u = o != null ? o : Dt.active()
              , c = this.startSpan(e, i, u)
              , f = he(u, c);
            return Dt.with(f, a, void 0, c)
        }
    }
    ,
    t
}();
function Kn(t) {
    return typeof t == "object" && typeof t.spanId == "string" && typeof t.traceId == "string" && typeof t.traceFlags == "number"
}
var Wn = new tr, Yn = function() {
    function t(e, r, n, s) {
        this._provider = e,
        this.name = r,
        this.version = n,
        this.options = s
    }
    return t.prototype.startSpan = function(e, r, n) {
        return this._getTracer().startSpan(e, r, n)
    }
    ,
    t.prototype.startActiveSpan = function(e, r, n, s) {
        var i = this._getTracer();
        return Reflect.apply(i.startActiveSpan, i, arguments)
    }
    ,
    t.prototype._getTracer = function() {
        if (this._delegate)
            return this._delegate;
        var e = this._provider.getDelegateTracer(this.name, this.version, this.options);
        return e ? (this._delegate = e,
        this._delegate) : Wn
    }
    ,
    t
}(), Qn = function() {
    function t() {}
    return t.prototype.getTracer = function(e, r, n) {
        return new tr
    }
    ,
    t
}(), Jn = new Qn, ve = function() {
    function t() {}
    return t.prototype.getTracer = function(e, r, n) {
        var s;
        return (s = this.getDelegateTracer(e, r, n)) !== null && s !== void 0 ? s : new Yn(this,e,r,n)
    }
    ,
    t.prototype.getDelegate = function() {
        var e;
        return (e = this._delegate) !== null && e !== void 0 ? e : Jn
    }
    ,
    t.prototype.setDelegate = function(e) {
        this._delegate = e
    }
    ,
    t.prototype.getDelegateTracer = function(e, r, n) {
        var s;
        return (s = this._delegate) === null || s === void 0 ? void 0 : s.getTracer(e, r, n)
    }
    ,
    t
}(), St;
(function(t) {
    t[t.NOT_RECORD = 0] = "NOT_RECORD",
    t[t.RECORD = 1] = "RECORD",
    t[t.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED"
}
)(St || (St = {}));
var at;
(function(t) {
    t[t.INTERNAL = 0] = "INTERNAL",
    t[t.SERVER = 1] = "SERVER",
    t[t.CLIENT = 2] = "CLIENT",
    t[t.PRODUCER = 3] = "PRODUCER",
    t[t.CONSUMER = 4] = "CONSUMER"
}
)(at || (at = {}));
var C;
(function(t) {
    t[t.UNSET = 0] = "UNSET",
    t[t.OK = 1] = "OK",
    t[t.ERROR = 2] = "ERROR"
}
)(C || (C = {}));
var A = Ct.getInstance()
  , E = I.instance()
  , Zn = function() {
    function t() {}
    return t.prototype.getMeter = function(e, r, n) {
        return vn
    }
    ,
    t
}()
  , ts = new Zn
  , Mt = "metrics"
  , es = function() {
    function t() {}
    return t.getInstance = function() {
        return this._instance || (this._instance = new t),
        this._instance
    }
    ,
    t.prototype.setGlobalMeterProvider = function(e) {
        return dt(Mt, e, I.instance())
    }
    ,
    t.prototype.getMeterProvider = function() {
        return F(Mt) || ts
    }
    ,
    t.prototype.getMeter = function(e, r, n) {
        return this.getMeterProvider().getMeter(e, r, n)
    }
    ,
    t.prototype.disable = function() {
        pt(Mt, I.instance())
    }
    ,
    t
}()
  , er = es.getInstance()
  , rs = function() {
    function t() {}
    return t.prototype.inject = function(e, r) {}
    ,
    t.prototype.extract = function(e, r) {
        return e
    }
    ,
    t.prototype.fields = function() {
        return []
    }
    ,
    t
}()
  , _e = le("OpenTelemetry Baggage Key");
function rr(t) {
    return t.getValue(_e) || void 0
}
function ns() {
    return rr(Ct.getInstance().active())
}
function ss(t, e) {
    return t.setValue(_e, e)
}
function is(t) {
    return t.deleteValue(_e)
}
var Ut = "propagation"
  , os = new rs
  , as = function() {
    function t() {
        this.createBaggage = hn,
        this.getBaggage = rr,
        this.getActiveBaggage = ns,
        this.setBaggage = ss,
        this.deleteBaggage = is
    }
    return t.getInstance = function() {
        return this._instance || (this._instance = new t),
        this._instance
    }
    ,
    t.prototype.setGlobalPropagator = function(e) {
        return dt(Ut, e, I.instance())
    }
    ,
    t.prototype.inject = function(e, r, n) {
        return n === void 0 && (n = Dn),
        this._getGlobalPropagator().inject(e, r, n)
    }
    ,
    t.prototype.extract = function(e, r, n) {
        return n === void 0 && (n = xn),
        this._getGlobalPropagator().extract(e, r, n)
    }
    ,
    t.prototype.fields = function() {
        return this._getGlobalPropagator().fields()
    }
    ,
    t.prototype.disable = function() {
        pt(Ut, I.instance())
    }
    ,
    t.prototype._getGlobalPropagator = function() {
        return F(Ut) || os
    }
    ,
    t
}()
  , P = as.getInstance()
  , Bt = "trace"
  , us = function() {
    function t() {
        this._proxyTracerProvider = new ve,
        this.wrapSpanContext = Xn,
        this.isSpanContextValid = Pt,
        this.deleteSpan = Gn,
        this.getSpan = pe,
        this.getActiveSpan = $n,
        this.getSpanContext = Je,
        this.setSpan = he,
        this.setSpanContext = Fn
    }
    return t.getInstance = function() {
        return this._instance || (this._instance = new t),
        this._instance
    }
    ,
    t.prototype.setGlobalTracerProvider = function(e) {
        var r = dt(Bt, this._proxyTracerProvider, I.instance());
        return r && this._proxyTracerProvider.setDelegate(e),
        r
    }
    ,
    t.prototype.getTracerProvider = function() {
        return F(Bt) || this._proxyTracerProvider
    }
    ,
    t.prototype.getTracer = function(e, r) {
        return this.getTracerProvider().getTracer(e, r)
    }
    ,
    t.prototype.disable = function() {
        pt(Bt, I.instance()),
        this._proxyTracerProvider = new ve
    }
    ,
    t
}()
  , R = us.getInstance();
const nr = le("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
function cs(t) {
    return t.setValue(nr, !0)
}
function ge(t) {
    return t.getValue(nr) === !0
}
const ls = "="
  , sr = ";"
  , Wt = ","
  , kt = "baggage"
  , fs = 180
  , ds = 4096
  , ps = 8192;
function hs(t) {
    return t.reduce( (e, r) => {
        const n = "".concat(e).concat(e !== "" ? Wt : "").concat(r);
        return n.length > ps ? e : n
    }
    , "")
}
function _s(t) {
    return t.getAllEntries().map( ([e,r]) => {
        let n = "".concat(encodeURIComponent(e), "=").concat(encodeURIComponent(r.value));
        return r.metadata !== void 0 && (n += sr + r.metadata.toString()),
        n
    }
    )
}
function gs(t) {
    if (!t)
        return;
    const e = t.indexOf(sr)
      , r = e === -1 ? t : t.substring(0, e)
      , n = r.indexOf(ls);
    if (n <= 0)
        return;
    const s = r.substring(0, n).trim()
      , i = r.substring(n + 1).trim();
    if (!s || !i)
        return;
    let o, a;
    try {
        o = decodeURIComponent(s),
        a = decodeURIComponent(i)
    } catch (c) {
        return
    }
    let u;
    if (e !== -1 && e < t.length - 1) {
        const c = t.substring(e + 1);
        u = _n(c)
    }
    return {
        key: o,
        value: a,
        metadata: u
    }
}
class ms {
    inject(e, r, n) {
        const s = P.getBaggage(e);
        if (!s || ge(e))
            return;
        const i = _s(s).filter(a => a.length <= ds).slice(0, fs)
          , o = hs(i);
        o.length > 0 && n.set(r, kt, o)
    }
    extract(e, r, n) {
        const s = n.get(r, kt)
          , i = Array.isArray(s) ? s.join(Wt) : s;
        if (!i)
            return e;
        const o = {};
        return i.length === 0 || (i.split(Wt).forEach(u => {
            const c = gs(u);
            if (c) {
                const f = {
                    value: c.value
                };
                c.metadata && (f.metadata = c.metadata),
                o[c.key] = f
            }
        }
        ),
        Object.entries(o).length === 0) ? e : P.setBaggage(e, P.createBaggage(o))
    }
    fields() {
        return [kt]
    }
}
function Et(t) {
    const e = {};
    if (typeof t != "object" || t == null)
        return e;
    for (const r in t) {
        if (!Object.prototype.hasOwnProperty.call(t, r))
            continue;
        if (!Es(r)) {
            E.warn("Invalid attribute key: ".concat(r));
            continue
        }
        const n = t[r];
        if (!ir(n)) {
            E.warn("Invalid attribute value set for key: ".concat(r));
            continue
        }
        Array.isArray(n) ? e[r] = n.slice() : e[r] = n
    }
    return e
}
function Es(t) {
    return typeof t == "string" && t !== ""
}
function ir(t) {
    return t == null ? !0 : Array.isArray(t) ? Ts(t) : or(typeof t)
}
function Ts(t) {
    let e;
    for (const r of t) {
        if (r == null)
            continue;
        const n = typeof r;
        if (n !== e) {
            if (!e) {
                if (or(n)) {
                    e = n;
                    continue
                }
                return !1
            }
            return !1
        }
    }
    return !0
}
function or(t) {
    switch (t) {
    case "number":
    case "boolean":
    case "string":
        return !0
    }
    return !1
}
function Ss() {
    return t => {
        E.error(ys(t))
    }
}
function ys(t) {
    return typeof t == "string" ? t : JSON.stringify(bs(t))
}
function bs(t) {
    const e = {};
    let r = t;
    for (; r !== null; )
        Object.getOwnPropertyNames(r).forEach(n => {
            if (e[n])
                return;
            const s = r[n];
            s && (e[n] = String(s))
        }
        ),
        r = Object.getPrototypeOf(r);
    return e
}
let As = Ss();
function W(t) {
    try {
        As(t)
    } catch (e) {}
}
const Rs = "2.5.0"
  , Yt = "error.type"
  , Ht = "exception.message"
  , vs = "exception.stacktrace"
  , jt = "exception.type"
  , ar = "http.request.method"
  , ur = "http.request.method_original"
  , cr = "http.response.status_code"
  , lr = "server.address"
  , fr = "server.port"
  , Os = "service.name"
  , Qt = "telemetry.sdk.language"
  , ws = "webjs"
  , Jt = "telemetry.sdk.name"
  , Zt = "telemetry.sdk.version"
  , dr = "url.full"
  , Cs = "process.runtime.name"
  , $t = {
    [Jt]: "opentelemetry",
    [Cs]: "browser",
    [Qt]: ws,
    [Zt]: Rs
}
  , q = performance
  , Ps = 9
  , Ls = 6
  , Ns = Math.pow(10, Ls)
  , te = Math.pow(10, Ps);
function X(t) {
    const e = t / 1e3
      , r = Math.trunc(e)
      , n = Math.round(t % 1e3 * Ns);
    return [r, n]
}
function Is(t) {
    const e = X(q.timeOrigin)
      , r = X(typeof t == "number" ? t : q.now());
    return hr(e, r)
}
function xs(t, e) {
    let r = e[0] - t[0]
      , n = e[1] - t[1];
    return n < 0 && (r -= 1,
    n += te),
    [r, n]
}
function pr(t) {
    return Array.isArray(t) && t.length === 2 && typeof t[0] == "number" && typeof t[1] == "number"
}
function Oe(t) {
    return pr(t) || typeof t == "number" || t instanceof Date
}
function hr(t, e) {
    const r = [t[0] + e[0], t[1] + e[1]];
    return r[1] >= te && (r[1] -= te,
    r[0] += 1),
    r
}
var ee;
(function(t) {
    t[t.SUCCESS = 0] = "SUCCESS",
    t[t.FAILED = 1] = "FAILED"
}
)(ee || (ee = {}));
class Ds {
    constructor(e={}) {
        l(this, "_propagators");
        l(this, "_fields");
        var r;
        this._propagators = (r = e.propagators) != null ? r : [],
        this._fields = Array.from(new Set(this._propagators.map(n => typeof n.fields == "function" ? n.fields() : []).reduce( (n, s) => n.concat(s), [])))
    }
    inject(e, r, n) {
        for (const s of this._propagators)
            try {
                s.inject(e, r, n)
            } catch (i) {
                E.warn("Failed to inject with ".concat(s.constructor.name, ". Err: ").concat(i.message))
            }
    }
    extract(e, r, n) {
        return this._propagators.reduce( (s, i) => {
            try {
                return i.extract(s, r, n)
            } catch (o) {
                E.warn("Failed to extract with ".concat(i.constructor.name, ". Err: ").concat(o.message))
            }
            return s
        }
        , e)
    }
    fields() {
        return this._fields.slice()
    }
}
const re = "[_0-9a-z-*/]"
  , Ms = "[a-z]".concat(re, "{0,255}")
  , Us = "[a-z0-9]".concat(re, "{0,240}@[a-z]").concat(re, "{0,13}")
  , Bs = new RegExp("^(?:".concat(Ms, "|").concat(Us, ")$"))
  , ks = /^[ -~]{0,255}[!-~]$/
  , Hs = /,|=/;
function js(t) {
    return Bs.test(t)
}
function $s(t) {
    return ks.test(t) && !Hs.test(t)
}
const we = 32
  , Gs = 512
  , Ce = ","
  , Pe = "=";
class me {
    constructor(e) {
        l(this, "_internalState", new Map);
        e && this._parse(e)
    }
    set(e, r) {
        const n = this._clone();
        return n._internalState.has(e) && n._internalState.delete(e),
        n._internalState.set(e, r),
        n
    }
    unset(e) {
        const r = this._clone();
        return r._internalState.delete(e),
        r
    }
    get(e) {
        return this._internalState.get(e)
    }
    serialize() {
        return this._keys().reduce( (e, r) => (e.push(r + Pe + this.get(r)),
        e), []).join(Ce)
    }
    _parse(e) {
        e.length > Gs || (this._internalState = e.split(Ce).reverse().reduce( (r, n) => {
            const s = n.trim()
              , i = s.indexOf(Pe);
            if (i !== -1) {
                const o = s.slice(0, i)
                  , a = s.slice(i + 1, n.length);
                js(o) && $s(a) && r.set(o, a)
            }
            return r
        }
        , new Map),
        this._internalState.size > we && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, we))))
    }
    _keys() {
        return Array.from(this._internalState.keys()).reverse()
    }
    _clone() {
        const e = new me;
        return e._internalState = new Map(this._internalState),
        e
    }
}
const Gt = "traceparent"
  , Ft = "tracestate"
  , Fs = "00"
  , Vs = "(?!ff)[\\da-f]{2}"
  , zs = "(?![0]{32})[\\da-f]{32}"
  , qs = "(?![0]{16})[\\da-f]{16}"
  , Xs = "[\\da-f]{2}"
  , Ks = new RegExp("^\\s?(".concat(Vs, ")-(").concat(zs, ")-(").concat(qs, ")-(").concat(Xs, ")(-.*)?\\s?$"));
function Ws(t) {
    const e = Ks.exec(t);
    return !e || e[1] === "00" && e[5] ? null : {
        traceId: e[2],
        spanId: e[3],
        traceFlags: parseInt(e[4], 16)
    }
}
class Ys {
    inject(e, r, n) {
        const s = R.getSpanContext(e);
        if (!s || ge(e) || !Pt(s))
            return;
        const i = "".concat(Fs, "-").concat(s.traceId, "-").concat(s.spanId, "-0").concat(Number(s.traceFlags || H.NONE).toString(16));
        n.set(r, Gt, i),
        s.traceState && n.set(r, Ft, s.traceState.serialize())
    }
    extract(e, r, n) {
        const s = n.get(r, Gt);
        if (!s)
            return e;
        const i = Array.isArray(s) ? s[0] : s;
        if (typeof i != "string")
            return e;
        const o = Ws(i);
        if (!o)
            return e;
        o.isRemote = !0;
        const a = n.get(r, Ft);
        if (a) {
            const u = Array.isArray(a) ? a.join(",") : a;
            o.traceState = new me(typeof u == "string" ? u : void 0)
        }
        return R.setSpanContext(e, o)
    }
    fields() {
        return [Gt, Ft]
    }
}
const Qs = "[object Object]"
  , Js = "[object Null]"
  , Zs = "[object Undefined]"
  , ti = Function.prototype
  , _r = ti.toString
  , ei = _r.call(Object)
  , ri = Object.getPrototypeOf
  , gr = Object.prototype
  , mr = gr.hasOwnProperty
  , j = Symbol ? Symbol.toStringTag : void 0
  , Er = gr.toString;
function Le(t) {
    if (!ni(t) || si(t) !== Qs)
        return !1;
    const e = ri(t);
    if (e === null)
        return !0;
    const r = mr.call(e, "constructor") && e.constructor;
    return typeof r == "function" && r instanceof r && _r.call(r) === ei
}
function ni(t) {
    return t != null && typeof t == "object"
}
function si(t) {
    return t == null ? t === void 0 ? Zs : Js : j && j in Object(t) ? ii(t) : oi(t)
}
function ii(t) {
    const e = mr.call(t, j)
      , r = t[j];
    let n = !1;
    try {
        t[j] = void 0,
        n = !0
    } catch (i) {}
    const s = Er.call(t);
    return n && (e ? t[j] = r : delete t[j]),
    s
}
function oi(t) {
    return Er.call(t)
}
const ai = 20;
function ui(...t) {
    let e = t.shift();
    const r = new WeakMap;
    for (; t.length > 0; )
        e = Tr(e, t.shift(), 0, r);
    return e
}
function Vt(t) {
    return yt(t) ? t.slice() : t
}
function Tr(t, e, r=0, n) {
    let s;
    if (!(r > ai)) {
        if (r++,
        Tt(t) || Tt(e) || Sr(e))
            s = Vt(e);
        else if (yt(t)) {
            if (s = t.slice(),
            yt(e))
                for (let i = 0, o = e.length; i < o; i++)
                    s.push(Vt(e[i]));
            else if (J(e)) {
                const i = Object.keys(e);
                for (let o = 0, a = i.length; o < a; o++) {
                    const u = i[o];
                    s[u] = Vt(e[u])
                }
            }
        } else if (J(t))
            if (J(e)) {
                if (!ci(t, e))
                    return e;
                s = Object.assign({}, t);
                const i = Object.keys(e);
                for (let o = 0, a = i.length; o < a; o++) {
                    const u = i[o]
                      , c = e[u];
                    if (Tt(c))
                        typeof c > "u" ? delete s[u] : s[u] = c;
                    else {
                        const f = s[u]
                          , d = c;
                        if (Ne(t, u, n) || Ne(e, u, n))
                            delete s[u];
                        else {
                            if (J(f) && J(d)) {
                                const _ = n.get(f) || []
                                  , p = n.get(d) || [];
                                _.push({
                                    obj: t,
                                    key: u
                                }),
                                p.push({
                                    obj: e,
                                    key: u
                                }),
                                n.set(f, _),
                                n.set(d, p)
                            }
                            s[u] = Tr(s[u], c, r, n)
                        }
                    }
                }
            } else
                s = e;
        return s
    }
}
function Ne(t, e, r) {
    const n = r.get(t[e]) || [];
    for (let s = 0, i = n.length; s < i; s++) {
        const o = n[s];
        if (o.key === e && o.obj === t)
            return !0
    }
    return !1
}
function yt(t) {
    return Array.isArray(t)
}
function Sr(t) {
    return typeof t == "function"
}
function J(t) {
    return !Tt(t) && !yt(t) && !Sr(t) && typeof t == "object"
}
function Tt(t) {
    return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t > "u" || t instanceof Date || t instanceof RegExp || t === null
}
function ci(t, e) {
    return !(!Le(t) || !Le(e))
}
class li {
    constructor() {
        l(this, "_promise");
        l(this, "_resolve");
        l(this, "_reject");
        this._promise = new Promise( (e, r) => {
            this._resolve = e,
            this._reject = r
        }
        )
    }
    get promise() {
        return this._promise
    }
    resolve(e) {
        this._resolve(e)
    }
    reject(e) {
        this._reject(e)
    }
}
class fi {
    constructor(e, r) {
        l(this, "_isCalled", !1);
        l(this, "_deferred", new li);
        l(this, "_callback");
        l(this, "_that");
        this._callback = e,
        this._that = r
    }
    get isCalled() {
        return this._isCalled
    }
    get promise() {
        return this._deferred.promise
    }
    call(...e) {
        if (!this._isCalled) {
            this._isCalled = !0;
            try {
                Promise.resolve(this._callback.call(this._that, ...e)).then(r => this._deferred.resolve(r), r => this._deferred.reject(r))
            } catch (r) {
                this._deferred.reject(r)
            }
        }
        return this._deferred.promise
    }
}
let ht;
function di() {
    if (ht === void 0)
        try {
            const t = globalThis.process.argv0;
            ht = t ? "unknown_service:".concat(t) : "unknown_service"
        } catch (t) {
            ht = "unknown_service"
        }
    return ht
}
const et = t => t !== null && typeof t == "object" && typeof t.then == "function";
class bt {
    constructor(e, r) {
        l(this, "_rawAttributes");
        l(this, "_asyncAttributesPending", !1);
        l(this, "_schemaUrl");
        l(this, "_memoizedAttributes");
        var s;
        const n = (s = e.attributes) != null ? s : {};
        this._rawAttributes = Object.entries(n).map( ([i,o]) => (et(o) && (this._asyncAttributesPending = !0),
        [i, o])),
        this._rawAttributes = Ie(this._rawAttributes),
        this._schemaUrl = hi(r == null ? void 0 : r.schemaUrl)
    }
    static FromAttributeList(e, r) {
        const n = new bt({},r);
        return n._rawAttributes = Ie(e),
        n._asyncAttributesPending = e.filter( ([s,i]) => et(i)).length > 0,
        n
    }
    get asyncAttributesPending() {
        return this._asyncAttributesPending
    }
    async waitForAsyncAttributes() {
        if (this.asyncAttributesPending) {
            for (let e = 0; e < this._rawAttributes.length; e++) {
                const [r,n] = this._rawAttributes[e];
                this._rawAttributes[e] = [r, et(n) ? await n : n]
            }
            this._asyncAttributesPending = !1
        }
    }
    get attributes() {
        var r;
        if (this.asyncAttributesPending && E.error("Accessing resource attributes before async attributes settled"),
        this._memoizedAttributes)
            return this._memoizedAttributes;
        const e = {};
        for (const [n,s] of this._rawAttributes) {
            if (et(s)) {
                E.debug("Unsettled resource attribute ".concat(n, " skipped"));
                continue
            }
            s != null && ((r = e[n]) != null || (e[n] = s))
        }
        return this._asyncAttributesPending || (this._memoizedAttributes = e),
        e
    }
    getRawAttributes() {
        return this._rawAttributes
    }
    get schemaUrl() {
        return this._schemaUrl
    }
    merge(e) {
        if (e == null)
            return this;
        const r = _i(this, e)
          , n = r ? {
            schemaUrl: r
        } : void 0;
        return bt.FromAttributeList([...e.getRawAttributes(), ...this.getRawAttributes()], n)
    }
}
function yr(t, e) {
    return bt.FromAttributeList(Object.entries(t), e)
}
function pi() {
    return yr({
        [Os]: di(),
        [Qt]: $t[Qt],
        [Jt]: $t[Jt],
        [Zt]: $t[Zt]
    })
}
function Ie(t) {
    return t.map( ([e,r]) => et(r) ? [e, r.catch(n => {
        E.debug("promise rejection for resource attribute: %s - %s", e, n)
    }
    )] : [e, r])
}
function hi(t) {
    if (typeof t == "string" || t === void 0)
        return t;
    E.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", t)
}
function _i(t, e) {
    const r = t == null ? void 0 : t.schemaUrl
      , n = e == null ? void 0 : e.schemaUrl
      , s = r === void 0 || r === ""
      , i = n === void 0 || n === "";
    if (s)
        return n;
    if (i || r === n)
        return r;
    E.warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', r, n)
}
const gi = "exception";
class mi {
    constructor(e) {
        l(this, "_spanContext");
        l(this, "kind");
        l(this, "parentSpanContext");
        l(this, "attributes", {});
        l(this, "links", []);
        l(this, "events", []);
        l(this, "startTime");
        l(this, "resource");
        l(this, "instrumentationScope");
        l(this, "_droppedAttributesCount", 0);
        l(this, "_droppedEventsCount", 0);
        l(this, "_droppedLinksCount", 0);
        l(this, "name");
        l(this, "status", {
            code: C.UNSET
        });
        l(this, "endTime", [0, 0]);
        l(this, "_ended", !1);
        l(this, "_duration", [-1, -1]);
        l(this, "_spanProcessor");
        l(this, "_spanLimits");
        l(this, "_attributeValueLengthLimit");
        l(this, "_performanceStartTime");
        l(this, "_performanceOffset");
        l(this, "_startTimeProvided");
        var n;
        const r = Date.now();
        this._spanContext = e.spanContext,
        this._performanceStartTime = q.now(),
        this._performanceOffset = r - (this._performanceStartTime + q.timeOrigin),
        this._startTimeProvided = e.startTime != null,
        this._spanLimits = e.spanLimits,
        this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0,
        this._spanProcessor = e.spanProcessor,
        this.name = e.name,
        this.parentSpanContext = e.parentSpanContext,
        this.kind = e.kind,
        this.links = e.links || [],
        this.startTime = this._getTime((n = e.startTime) != null ? n : r),
        this.resource = e.resource,
        this.instrumentationScope = e.scope,
        e.attributes != null && this.setAttributes(e.attributes),
        this._spanProcessor.onStart(this, e.context)
    }
    spanContext() {
        return this._spanContext
    }
    setAttribute(e, r) {
        if (r == null || this._isSpanEnded())
            return this;
        if (e.length === 0)
            return E.warn("Invalid attribute key: ".concat(e)),
            this;
        if (!ir(r))
            return E.warn("Invalid attribute value set for key: ".concat(e)),
            this;
        const {attributeCountLimit: n} = this._spanLimits;
        return n !== void 0 && Object.keys(this.attributes).length >= n && !Object.prototype.hasOwnProperty.call(this.attributes, e) ? (this._droppedAttributesCount++,
        this) : (this.attributes[e] = this._truncateToSize(r),
        this)
    }
    setAttributes(e) {
        for (const [r,n] of Object.entries(e))
            this.setAttribute(r, n);
        return this
    }
    addEvent(e, r, n) {
        if (this._isSpanEnded())
            return this;
        const {eventCountLimit: s} = this._spanLimits;
        if (s === 0)
            return E.warn("No events allowed."),
            this._droppedEventsCount++,
            this;
        s !== void 0 && this.events.length >= s && (this._droppedEventsCount === 0 && E.debug("Dropping extra events."),
        this.events.shift(),
        this._droppedEventsCount++),
        Oe(r) && (Oe(n) || (n = r),
        r = void 0);
        const i = Et(r);
        return this.events.push({
            name: e,
            attributes: i,
            time: this._getTime(n),
            droppedAttributesCount: 0
        }),
        this
    }
    addLink(e) {
        return this.links.push(e),
        this
    }
    addLinks(e) {
        return this.links.push(...e),
        this
    }
    setStatus(e) {
        return this._isSpanEnded() ? this : (this.status = {
            ...e
        },
        this.status.message != null && typeof e.message != "string" && (E.warn("Dropping invalid status.message of type '".concat(typeof e.message, "', expected 'string'")),
        delete this.status.message),
        this)
    }
    updateName(e) {
        return this._isSpanEnded() ? this : (this.name = e,
        this)
    }
    end(e) {
        if (this._isSpanEnded()) {
            E.error("".concat(this.name, " ").concat(this._spanContext.traceId, "-").concat(this._spanContext.spanId, " - You can only call end() on a span once."));
            return
        }
        this.endTime = this._getTime(e),
        this._duration = xs(this.startTime, this.endTime),
        this._duration[0] < 0 && (E.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime),
        this.endTime = this.startTime.slice(),
        this._duration = [0, 0]),
        this._droppedEventsCount > 0 && E.warn("Dropped ".concat(this._droppedEventsCount, " events because eventCountLimit reached")),
        this._spanProcessor.onEnding && this._spanProcessor.onEnding(this),
        this._ended = !0,
        this._spanProcessor.onEnd(this)
    }
    _getTime(e) {
        if (typeof e == "number" && e <= q.now())
            return Is(e + this._performanceOffset);
        if (typeof e == "number")
            return X(e);
        if (e instanceof Date)
            return X(e.getTime());
        if (pr(e))
            return e;
        if (this._startTimeProvided)
            return X(Date.now());
        const r = q.now() - this._performanceStartTime;
        return hr(this.startTime, X(r))
    }
    isRecording() {
        return this._ended === !1
    }
    recordException(e, r) {
        const n = {};
        typeof e == "string" ? n[Ht] = e : e && (e.code ? n[jt] = e.code.toString() : e.name && (n[jt] = e.name),
        e.message && (n[Ht] = e.message),
        e.stack && (n[vs] = e.stack)),
        n[jt] || n[Ht] ? this.addEvent(gi, n, r) : E.warn("Failed to record an exception ".concat(e))
    }
    get duration() {
        return this._duration
    }
    get ended() {
        return this._ended
    }
    get droppedAttributesCount() {
        return this._droppedAttributesCount
    }
    get droppedEventsCount() {
        return this._droppedEventsCount
    }
    get droppedLinksCount() {
        return this._droppedLinksCount
    }
    _isSpanEnded() {
        if (this._ended) {
            const e = new Error("Operation attempted on ended Span {traceId: ".concat(this._spanContext.traceId, ", spanId: ").concat(this._spanContext.spanId, "}"));
            E.warn("Cannot execute the operation on ended Span {traceId: ".concat(this._spanContext.traceId, ", spanId: ").concat(this._spanContext.spanId, "}"), e)
        }
        return this._ended
    }
    _truncateToLimitUtil(e, r) {
        return e.length <= r ? e : e.substring(0, r)
    }
    _truncateToSize(e) {
        const r = this._attributeValueLengthLimit;
        return r <= 0 ? (E.warn("Attribute value limit must be positive, got ".concat(r)),
        e) : typeof e == "string" ? this._truncateToLimitUtil(e, r) : Array.isArray(e) ? e.map(n => typeof n == "string" ? this._truncateToLimitUtil(n, r) : n) : e
    }
}
var Y;
(function(t) {
    t[t.NOT_RECORD = 0] = "NOT_RECORD",
    t[t.RECORD = 1] = "RECORD",
    t[t.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED"
}
)(Y || (Y = {}));
class At {
    shouldSample() {
        return {
            decision: Y.NOT_RECORD
        }
    }
    toString() {
        return "AlwaysOffSampler"
    }
}
class K {
    shouldSample() {
        return {
            decision: Y.RECORD_AND_SAMPLED
        }
    }
    toString() {
        return "AlwaysOnSampler"
    }
}
class _t {
    constructor(e) {
        l(this, "_root");
        l(this, "_remoteParentSampled");
        l(this, "_remoteParentNotSampled");
        l(this, "_localParentSampled");
        l(this, "_localParentNotSampled");
        var r, n, s, i;
        this._root = e.root,
        this._root || (W(new Error("ParentBasedSampler must have a root sampler configured")),
        this._root = new K),
        this._remoteParentSampled = (r = e.remoteParentSampled) != null ? r : new K,
        this._remoteParentNotSampled = (n = e.remoteParentNotSampled) != null ? n : new At,
        this._localParentSampled = (s = e.localParentSampled) != null ? s : new K,
        this._localParentNotSampled = (i = e.localParentNotSampled) != null ? i : new At
    }
    shouldSample(e, r, n, s, i, o) {
        const a = R.getSpanContext(e);
        return !a || !Pt(a) ? this._root.shouldSample(e, r, n, s, i, o) : a.isRemote ? a.traceFlags & H.SAMPLED ? this._remoteParentSampled.shouldSample(e, r, n, s, i, o) : this._remoteParentNotSampled.shouldSample(e, r, n, s, i, o) : a.traceFlags & H.SAMPLED ? this._localParentSampled.shouldSample(e, r, n, s, i, o) : this._localParentNotSampled.shouldSample(e, r, n, s, i, o)
    }
    toString() {
        return "ParentBased{root=".concat(this._root.toString(), ", remoteParentSampled=").concat(this._remoteParentSampled.toString(), ", remoteParentNotSampled=").concat(this._remoteParentNotSampled.toString(), ", localParentSampled=").concat(this._localParentSampled.toString(), ", localParentNotSampled=").concat(this._localParentNotSampled.toString(), "}")
    }
}
class xe {
    constructor(e=0) {
        l(this, "_ratio");
        l(this, "_upperBound");
        this._ratio = this._normalize(e),
        this._upperBound = Math.floor(this._ratio * 4294967295)
    }
    shouldSample(e, r) {
        return {
            decision: Ze(r) && this._accumulate(r) < this._upperBound ? Y.RECORD_AND_SAMPLED : Y.NOT_RECORD
        }
    }
    toString() {
        return "TraceIdRatioBased{".concat(this._ratio, "}")
    }
    _normalize(e) {
        return typeof e != "number" || isNaN(e) ? 0 : e >= 1 ? 1 : e <= 0 ? 0 : e
    }
    _accumulate(e) {
        let r = 0;
        for (let n = 0; n < e.length / 8; n++) {
            const s = n * 8
              , i = parseInt(e.slice(s, s + 8), 16);
            r = (r ^ i) >>> 0
        }
        return r
    }
}
var N;
(function(t) {
    t.AlwaysOff = "always_off",
    t.AlwaysOn = "always_on",
    t.ParentBasedAlwaysOff = "parentbased_always_off",
    t.ParentBasedAlwaysOn = "parentbased_always_on",
    t.ParentBasedTraceIdRatio = "parentbased_traceidratio",
    t.TraceIdRatio = "traceidratio"
}
)(N || (N = {}));
const De = 1;
function br() {
    return {
        sampler: Ar(),
        forceFlushTimeoutMillis: 3e4,
        generalLimits: {
            attributeValueLengthLimit: 1 / 0,
            attributeCountLimit: 128
        },
        spanLimits: {
            attributeValueLengthLimit: 1 / 0,
            attributeCountLimit: 128,
            linkCountLimit: 128,
            eventCountLimit: 128,
            attributePerEventCountLimit: 128,
            attributePerLinkCountLimit: 128
        }
    }
}
function Ar() {
    const t = N.ParentBasedAlwaysOn;
    switch (t) {
    case N.AlwaysOn:
        return new K;
    case N.AlwaysOff:
        return new At;
    case N.ParentBasedAlwaysOn:
        return new _t({
            root: new K
        });
    case N.ParentBasedAlwaysOff:
        return new _t({
            root: new At
        });
    case N.TraceIdRatio:
        return new xe(Me());
    case N.ParentBasedTraceIdRatio:
        return new _t({
            root: new xe(Me())
        });
    default:
        return E.error('OTEL_TRACES_SAMPLER value "'.concat(t, '" invalid, defaulting to "').concat(N.ParentBasedAlwaysOn, '".')),
        new _t({
            root: new K
        })
    }
}
function Me() {
    return E.error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ".concat(De, ".")),
    De
}
const Ei = 128
  , Ti = 1 / 0;
function Si(t) {
    const e = {
        sampler: Ar()
    }
      , r = br()
      , n = Object.assign({}, r, e, t);
    return n.generalLimits = Object.assign({}, r.generalLimits, t.generalLimits || {}),
    n.spanLimits = Object.assign({}, r.spanLimits, t.spanLimits || {}),
    n
}
function yi(t) {
    var r, n, s, i, o, a, u, c, f, d, _, p;
    const e = Object.assign({}, t.spanLimits);
    return e.attributeCountLimit = (a = (o = (i = (s = (r = t.spanLimits) == null ? void 0 : r.attributeCountLimit) != null ? s : (n = t.generalLimits) == null ? void 0 : n.attributeCountLimit) != null ? i : void 0) != null ? o : void 0) != null ? a : Ei,
    e.attributeValueLengthLimit = (p = (_ = (d = (f = (u = t.spanLimits) == null ? void 0 : u.attributeValueLengthLimit) != null ? f : (c = t.generalLimits) == null ? void 0 : c.attributeValueLengthLimit) != null ? d : void 0) != null ? _ : void 0) != null ? p : Ti,
    Object.assign({}, t, {
        spanLimits: e
    })
}
class bi {
    constructor(e, r) {
        l(this, "_maxExportBatchSize");
        l(this, "_maxQueueSize");
        l(this, "_scheduledDelayMillis");
        l(this, "_exportTimeoutMillis");
        l(this, "_exporter");
        l(this, "_isExporting", !1);
        l(this, "_finishedSpans", []);
        l(this, "_timer");
        l(this, "_shutdownOnce");
        l(this, "_droppedSpansCount", 0);
        this._exporter = e,
        this._maxExportBatchSize = typeof (r == null ? void 0 : r.maxExportBatchSize) == "number" ? r.maxExportBatchSize : 512,
        this._maxQueueSize = typeof (r == null ? void 0 : r.maxQueueSize) == "number" ? r.maxQueueSize : 2048,
        this._scheduledDelayMillis = typeof (r == null ? void 0 : r.scheduledDelayMillis) == "number" ? r.scheduledDelayMillis : 5e3,
        this._exportTimeoutMillis = typeof (r == null ? void 0 : r.exportTimeoutMillis) == "number" ? r.exportTimeoutMillis : 3e4,
        this._shutdownOnce = new fi(this._shutdown,this),
        this._maxExportBatchSize > this._maxQueueSize && (E.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize"),
        this._maxExportBatchSize = this._maxQueueSize)
    }
    forceFlush() {
        return this._shutdownOnce.isCalled ? this._shutdownOnce.promise : this._flushAll()
    }
    onStart(e, r) {}
    onEnd(e) {
        this._shutdownOnce.isCalled || e.spanContext().traceFlags & H.SAMPLED && this._addToBuffer(e)
    }
    shutdown() {
        return this._shutdownOnce.call()
    }
    _shutdown() {
        return Promise.resolve().then( () => this.onShutdown()).then( () => this._flushAll()).then( () => this._exporter.shutdown())
    }
    _addToBuffer(e) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
            this._droppedSpansCount === 0 && E.debug("maxQueueSize reached, dropping spans"),
            this._droppedSpansCount++;
            return
        }
        this._droppedSpansCount > 0 && (E.warn("Dropped ".concat(this._droppedSpansCount, " spans because maxQueueSize reached")),
        this._droppedSpansCount = 0),
        this._finishedSpans.push(e),
        this._maybeStartTimer()
    }
    _flushAll() {
        return new Promise( (e, r) => {
            const n = []
              , s = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
            for (let i = 0, o = s; i < o; i++)
                n.push(this._flushOneBatch());
            Promise.all(n).then( () => {
                e()
            }
            ).catch(r)
        }
        )
    }
    _flushOneBatch() {
        return this._clearTimer(),
        this._finishedSpans.length === 0 ? Promise.resolve() : new Promise( (e, r) => {
            const n = setTimeout( () => {
                r(new Error("Timeout"))
            }
            , this._exportTimeoutMillis);
            A.with(cs(A.active()), () => {
                let s;
                this._finishedSpans.length <= this._maxExportBatchSize ? (s = this._finishedSpans,
                this._finishedSpans = []) : s = this._finishedSpans.splice(0, this._maxExportBatchSize);
                const i = () => this._exporter.export(s, a => {
                    var u;
                    clearTimeout(n),
                    a.code === ee.SUCCESS ? e() : r((u = a.error) != null ? u : new Error("BatchSpanProcessor: span export failed"))
                }
                );
                let o = null;
                for (let a = 0, u = s.length; a < u; a++) {
                    const c = s[a];
                    c.resource.asyncAttributesPending && c.resource.waitForAsyncAttributes && (o != null || (o = []),
                    o.push(c.resource.waitForAsyncAttributes()))
                }
                o === null ? i() : Promise.all(o).then(i, a => {
                    W(a),
                    r(a)
                }
                )
            }
            )
        }
        )
    }
    _maybeStartTimer() {
        if (this._isExporting)
            return;
        const e = () => {
            this._isExporting = !0,
            this._flushOneBatch().finally( () => {
                this._isExporting = !1,
                this._finishedSpans.length > 0 && (this._clearTimer(),
                this._maybeStartTimer())
            }
            ).catch(r => {
                this._isExporting = !1,
                W(r)
            }
            )
        }
        ;
        if (this._finishedSpans.length >= this._maxExportBatchSize)
            return e();
        this._timer === void 0 && (this._timer = setTimeout( () => e(), this._scheduledDelayMillis),
        typeof this._timer != "number" && this._timer.unref())
    }
    _clearTimer() {
        this._timer !== void 0 && (clearTimeout(this._timer),
        this._timer = void 0)
    }
}
class Ai extends bi {
    constructor(r, n) {
        super(r, n);
        l(this, "_visibilityChangeListener");
        l(this, "_pageHideListener");
        this.onInit(n)
    }
    onInit(r) {
        (r == null ? void 0 : r.disableAutoFlushOnDocumentHide) !== !0 && typeof document < "u" && (this._visibilityChangeListener = () => {
            document.visibilityState === "hidden" && this.forceFlush().catch(n => {
                W(n)
            }
            )
        }
        ,
        this._pageHideListener = () => {
            this.forceFlush().catch(n => {
                W(n)
            }
            )
        }
        ,
        document.addEventListener("visibilitychange", this._visibilityChangeListener),
        document.addEventListener("pagehide", this._pageHideListener))
    }
    onShutdown() {
        typeof document < "u" && (this._visibilityChangeListener && document.removeEventListener("visibilitychange", this._visibilityChangeListener),
        this._pageHideListener && document.removeEventListener("pagehide", this._pageHideListener))
    }
}
const Ri = 8
  , vi = 16;
class Oi {
    constructor() {
        l(this, "generateTraceId", Ue(vi));
        l(this, "generateSpanId", Ue(Ri))
    }
}
const gt = Array(32);
function Ue(t) {
    return function() {
        for (let r = 0; r < t * 2; r++)
            gt[r] = Math.floor(Math.random() * 16) + 48,
            gt[r] >= 58 && (gt[r] += 39);
        return String.fromCharCode.apply(null, gt.slice(0, t * 2))
    }
}
class wi {
    constructor(e, r, n, s) {
        l(this, "_sampler");
        l(this, "_generalLimits");
        l(this, "_spanLimits");
        l(this, "_idGenerator");
        l(this, "instrumentationScope");
        l(this, "_resource");
        l(this, "_spanProcessor");
        const i = Si(r);
        this._sampler = i.sampler,
        this._generalLimits = i.generalLimits,
        this._spanLimits = i.spanLimits,
        this._idGenerator = r.idGenerator || new Oi,
        this._resource = n,
        this._spanProcessor = s,
        this.instrumentationScope = e
    }
    startSpan(e, r={}, n=A.active()) {
        var y, v, x;
        r.root && (n = R.deleteSpan(n));
        const s = R.getSpan(n);
        if (ge(n))
            return E.debug("Instrumentation suppressed, returning Noop Span"),
            R.wrapSpanContext(Qe);
        const i = s == null ? void 0 : s.spanContext()
          , o = this._idGenerator.generateSpanId();
        let a, u, c;
        !i || !R.isSpanContextValid(i) ? u = this._idGenerator.generateTraceId() : (u = i.traceId,
        c = i.traceState,
        a = i);
        const f = (y = r.kind) != null ? y : at.INTERNAL
          , d = ((v = r.links) != null ? v : []).map(L => ({
            context: L.context,
            attributes: Et(L.attributes)
        }))
          , _ = Et(r.attributes)
          , p = this._sampler.shouldSample(n, u, e, f, _, d);
        c = (x = p.traceState) != null ? x : c;
        const m = p.decision === St.RECORD_AND_SAMPLED ? H.SAMPLED : H.NONE
          , T = {
            traceId: u,
            spanId: o,
            traceFlags: m,
            traceState: c
        };
        if (p.decision === St.NOT_RECORD)
            return E.debug("Recording is off, propagating context in a non-recording span"),
            R.wrapSpanContext(T);
        const h = Et(Object.assign(_, p.attributes));
        return new mi({
            resource: this._resource,
            scope: this.instrumentationScope,
            context: n,
            spanContext: T,
            name: e,
            kind: f,
            links: d,
            parentSpanContext: a,
            attributes: h,
            startTime: r.startTime,
            spanProcessor: this._spanProcessor,
            spanLimits: this._spanLimits
        })
    }
    startActiveSpan(e, r, n, s) {
        let i, o, a;
        if (arguments.length < 2)
            return;
        arguments.length === 2 ? a = r : arguments.length === 3 ? (i = r,
        a = n) : (i = r,
        o = n,
        a = s);
        const u = o != null ? o : A.active()
          , c = this.startSpan(e, i, u)
          , f = R.setSpan(u, c);
        return A.with(f, a, void 0, c)
    }
    getGeneralLimits() {
        return this._generalLimits
    }
    getSpanLimits() {
        return this._spanLimits
    }
}
class Ci {
    constructor(e) {
        l(this, "_spanProcessors");
        this._spanProcessors = e
    }
    forceFlush() {
        const e = [];
        for (const r of this._spanProcessors)
            e.push(r.forceFlush());
        return new Promise(r => {
            Promise.all(e).then( () => {
                r()
            }
            ).catch(n => {
                W(n || new Error("MultiSpanProcessor: forceFlush failed")),
                r()
            }
            )
        }
        )
    }
    onStart(e, r) {
        for (const n of this._spanProcessors)
            n.onStart(e, r)
    }
    onEnding(e) {
        for (const r of this._spanProcessors)
            r.onEnding && r.onEnding(e)
    }
    onEnd(e) {
        for (const r of this._spanProcessors)
            r.onEnd(e)
    }
    shutdown() {
        const e = [];
        for (const r of this._spanProcessors)
            e.push(r.shutdown());
        return new Promise( (r, n) => {
            Promise.all(e).then( () => {
                r()
            }
            , n)
        }
        )
    }
}
var $;
(function(t) {
    t[t.resolved = 0] = "resolved",
    t[t.timeout = 1] = "timeout",
    t[t.error = 2] = "error",
    t[t.unresolved = 3] = "unresolved"
}
)($ || ($ = {}));
class Pi {
    constructor(e={}) {
        l(this, "_config");
        l(this, "_tracers", new Map);
        l(this, "_resource");
        l(this, "_activeSpanProcessor");
        var s, i;
        const r = ui({}, br(), yi(e));
        this._resource = (s = r.resource) != null ? s : pi(),
        this._config = Object.assign({}, r, {
            resource: this._resource
        });
        const n = [];
        (i = e.spanProcessors) != null && i.length && n.push(...e.spanProcessors),
        this._activeSpanProcessor = new Ci(n)
    }
    getTracer(e, r, n) {
        const s = "".concat(e, "@").concat(r || "", ":").concat((n == null ? void 0 : n.schemaUrl) || "");
        return this._tracers.has(s) || this._tracers.set(s, new wi({
            name: e,
            version: r,
            schemaUrl: n == null ? void 0 : n.schemaUrl
        },this._config,this._resource,this._activeSpanProcessor)),
        this._tracers.get(s)
    }
    forceFlush() {
        const e = this._config.forceFlushTimeoutMillis
          , r = this._activeSpanProcessor._spanProcessors.map(n => new Promise(s => {
            let i;
            const o = setTimeout( () => {
                s(new Error("Span processor did not completed within timeout period of ".concat(e, " ms"))),
                i = $.timeout
            }
            , e);
            n.forceFlush().then( () => {
                clearTimeout(o),
                i !== $.timeout && (i = $.resolved,
                s(i))
            }
            ).catch(a => {
                clearTimeout(o),
                i = $.error,
                s(a)
            }
            )
        }
        ));
        return new Promise( (n, s) => {
            Promise.all(r).then(i => {
                const o = i.filter(a => a !== $.resolved);
                o.length > 0 ? s(o) : n()
            }
            ).catch(i => s([i]))
        }
        )
    }
    shutdown() {
        return this._activeSpanProcessor.shutdown()
    }
}
class Li {
    constructor() {
        l(this, "_enabled", !1);
        l(this, "_currentContext", z)
    }
    _bindFunction(e=z, r) {
        const n = this
          , s = function(...i) {
            return n.with(e, () => r.apply(this, i))
        };
        return Object.defineProperty(s, "length", {
            enumerable: !1,
            configurable: !0,
            writable: !1,
            value: r.length
        }),
        s
    }
    active() {
        return this._currentContext
    }
    bind(e, r) {
        return e === void 0 && (e = this.active()),
        typeof r == "function" ? this._bindFunction(e, r) : r
    }
    disable() {
        return this._currentContext = z,
        this._enabled = !1,
        this
    }
    enable() {
        return this._enabled ? this : (this._enabled = !0,
        this._currentContext = z,
        this)
    }
    with(e, r, n, ...s) {
        const i = this._currentContext;
        this._currentContext = e || z;
        try {
            return r.call(n, ...s)
        } finally {
            this._currentContext = i
        }
    }
}
function Ni(t) {
    if (t !== null) {
        if (t === void 0) {
            const e = new Li;
            e.enable(),
            A.setGlobalContextManager(e);
            return
        }
        t.enable(),
        A.setGlobalContextManager(t)
    }
}
function Ii(t) {
    if (t !== null) {
        if (t === void 0) {
            P.setGlobalPropagator(new Ds({
                propagators: [new Ys, new ms]
            }));
            return
        }
        P.setGlobalPropagator(t)
    }
}
class xi extends Pi {
    constructor(e={}) {
        super(e)
    }
    register(e={}) {
        R.setGlobalTracerProvider(this),
        Ii(e.propagator),
        Ni(e.contextManager)
    }
}
class Di {
    constructor(e) {
        l(this, "_delegate");
        this._delegate = e
    }
    export(e, r) {
        this._delegate.export(e, r)
    }
    forceFlush() {
        return this._delegate.forceFlush()
    }
    shutdown() {
        return this._delegate.shutdown()
    }
}
class Be extends Error {
    constructor(r, n, s) {
        super(r);
        l(this, "code");
        l(this, "name", "OTLPExporterError");
        l(this, "data");
        this.data = s,
        this.code = n
    }
}
function Mi(t) {
    if (Number.isFinite(t) && t > 0)
        return t;
    throw new Error("Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '".concat(t, "')"))
}
function Ui(t) {
    if (t != null)
        return async () => t
}
function Bi(t, e, r) {
    var n, s, i, o, a, u;
    return {
        timeoutMillis: Mi((s = (n = t.timeoutMillis) != null ? n : e.timeoutMillis) != null ? s : r.timeoutMillis),
        concurrencyLimit: (o = (i = t.concurrencyLimit) != null ? i : e.concurrencyLimit) != null ? o : r.concurrencyLimit,
        compression: (u = (a = t.compression) != null ? a : e.compression) != null ? u : r.compression
    }
}
function ki() {
    return {
        timeoutMillis: 1e4,
        concurrencyLimit: 30,
        compression: "none"
    }
}
var ne;
(function(t) {
    t.NONE = "none",
    t.GZIP = "gzip"
}
)(ne || (ne = {}));
class Hi {
    constructor(e) {
        l(this, "_concurrencyLimit");
        l(this, "_sendingPromises", []);
        this._concurrencyLimit = e
    }
    pushPromise(e) {
        if (this.hasReachedLimit())
            throw new Error("Concurrency Limit reached");
        this._sendingPromises.push(e);
        const r = () => {
            const n = this._sendingPromises.indexOf(e);
            this._sendingPromises.splice(n, 1)
        }
        ;
        e.then(r, r)
    }
    hasReachedLimit() {
        return this._sendingPromises.length >= this._concurrencyLimit
    }
    async awaitAll() {
        await Promise.all(this._sendingPromises)
    }
}
function ji(t) {
    return new Hi(t.concurrencyLimit)
}
const zt = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {}
  , ut = performance
  , $i = 9
  , Gi = 6
  , Fi = Math.pow(10, Gi)
  , se = Math.pow(10, $i);
function ct(t) {
    const e = t / 1e3
      , r = Math.trunc(e)
      , n = Math.round(t % 1e3 * Fi);
    return [r, n]
}
function Rr() {
    let t = ut.timeOrigin;
    if (typeof t != "number") {
        const e = ut;
        t = e.timing && e.timing.fetchStart
    }
    return t
}
function lt(t) {
    const e = ct(Rr())
      , r = ct(typeof t == "number" ? t : ut.now());
    return zi(e, r)
}
function nt(t) {
    if (Vi(t))
        return t;
    if (typeof t == "number")
        return t < Rr() ? lt(t) : ct(t);
    if (t instanceof Date)
        return ct(t.getTime());
    throw TypeError("Invalid input type")
}
function k(t) {
    return t[0] * se + t[1]
}
function Vi(t) {
    return Array.isArray(t) && t.length === 2 && typeof t[0] == "number" && typeof t[1] == "number"
}
function zi(t, e) {
    const r = [t[0] + e[0], t[1] + e[1]];
    return r[1] >= se && (r[1] -= se,
    r[0] += 1),
    r
}
var M;
(function(t) {
    t[t.SUCCESS = 0] = "SUCCESS",
    t[t.FAILED = 1] = "FAILED"
}
)(M || (M = {}));
function vr(t, e) {
    return typeof e == "string" ? t === e : !!t.match(e)
}
function Or(t, e) {
    if (!e)
        return !1;
    for (const r of e)
        if (vr(t, r))
            return !0;
    return !1
}
function qi(t) {
    return Object.prototype.hasOwnProperty.call(t, "partialSuccess")
}
function Xi() {
    return {
        handleResponse(t) {
            t == null || !qi(t) || t.partialSuccess == null || Object.keys(t.partialSuccess).length === 0 || E.warn("Received Partial Success response:", JSON.stringify(t.partialSuccess))
        }
    }
}
class Ki {
    constructor(e, r, n, s, i) {
        l(this, "_transport");
        l(this, "_serializer");
        l(this, "_responseHandler");
        l(this, "_promiseQueue");
        l(this, "_timeout");
        l(this, "_diagLogger");
        this._transport = e,
        this._serializer = r,
        this._responseHandler = n,
        this._promiseQueue = s,
        this._timeout = i,
        this._diagLogger = E.createComponentLogger({
            namespace: "OTLPExportDelegate"
        })
    }
    export(e, r) {
        if (this._diagLogger.debug("items to be sent", e),
        this._promiseQueue.hasReachedLimit()) {
            r({
                code: M.FAILED,
                error: new Error("Concurrent export limit reached")
            });
            return
        }
        const n = this._serializer.serializeRequest(e);
        if (n == null) {
            r({
                code: M.FAILED,
                error: new Error("Nothing to send")
            });
            return
        }
        this._promiseQueue.pushPromise(this._transport.send(n, this._timeout).then(s => {
            if (s.status === "success") {
                if (s.data != null)
                    try {
                        this._responseHandler.handleResponse(this._serializer.deserializeResponse(s.data))
                    } catch (i) {
                        this._diagLogger.warn("Export succeeded but could not deserialize response - is the response specification compliant?", i, s.data)
                    }
                r({
                    code: M.SUCCESS
                });
                return
            } else if (s.status === "failure" && s.error) {
                r({
                    code: M.FAILED,
                    error: s.error
                });
                return
            } else
                s.status === "retryable" ? r({
                    code: M.FAILED,
                    error: new Be("Export failed with retryable status")
                }) : r({
                    code: M.FAILED,
                    error: new Be("Export failed with unknown error")
                })
        }
        , s => r({
            code: M.FAILED,
            error: s
        })))
    }
    forceFlush() {
        return this._promiseQueue.awaitAll()
    }
    async shutdown() {
        this._diagLogger.debug("shutdown started"),
        await this.forceFlush(),
        this._transport.shutdown()
    }
}
function Wi(t, e) {
    return new Ki(t.transport,t.serializer,Xi(),t.promiseHandler,e.timeout)
}
function Ee(t, e, r) {
    return Wi({
        transport: r,
        serializer: e,
        promiseHandler: ji(t)
    }, {
        timeout: t.timeoutMillis
    })
}
function ke(t) {
    return t >= 48 && t <= 57 ? t - 48 : t >= 97 && t <= 102 ? t - 87 : t - 55
}
function Te(t) {
    const e = new Uint8Array(t.length / 2);
    let r = 0;
    for (let n = 0; n < t.length; n += 2) {
        const s = ke(t.charCodeAt(n))
          , i = ke(t.charCodeAt(n + 1));
        e[r++] = s << 4 | i
    }
    return e
}
function wr(t) {
    const e = BigInt(1e9);
    return BigInt(Math.trunc(t[0])) * e + BigInt(Math.trunc(t[1]))
}
function Yi(t) {
    const e = Number(BigInt.asUintN(32, t))
      , r = Number(BigInt.asUintN(32, t >> BigInt(32)));
    return {
        low: e,
        high: r
    }
}
function Cr(t) {
    const e = wr(t);
    return Yi(e)
}
function Qi(t) {
    return wr(t).toString()
}
const Ji = typeof BigInt < "u" ? Qi : k;
function He(t) {
    return t
}
function Pr(t) {
    if (t !== void 0)
        return Te(t)
}
const Zi = {
    encodeHrTime: Cr,
    encodeSpanContext: Te,
    encodeOptionalSpanContext: Pr
};
function to(t) {
    var n, s;
    if (t === void 0)
        return Zi;
    const e = (n = t.useLongBits) != null ? n : !0
      , r = (s = t.useHex) != null ? s : !1;
    return {
        encodeHrTime: e ? Cr : Ji,
        encodeSpanContext: r ? He : Te,
        encodeOptionalSpanContext: r ? He : Pr
    }
}
function eo(t) {
    const e = {
        attributes: Lt(t.attributes),
        droppedAttributesCount: 0
    }
      , r = t.schemaUrl;
    return r && r !== "" && (e.schemaUrl = r),
    e
}
function ro(t) {
    return {
        name: t.name,
        version: t.version
    }
}
function Lt(t) {
    return Object.keys(t).map(e => Lr(e, t[e]))
}
function Lr(t, e) {
    return {
        key: t,
        value: Nr(e)
    }
}
function Nr(t) {
    const e = typeof t;
    return e === "string" ? {
        stringValue: t
    } : e === "number" ? Number.isInteger(t) ? {
        intValue: t
    } : {
        doubleValue: t
    } : e === "boolean" ? {
        boolValue: t
    } : t instanceof Uint8Array ? {
        bytesValue: t
    } : Array.isArray(t) ? {
        arrayValue: {
            values: t.map(Nr)
        }
    } : e === "object" && t != null ? {
        kvlistValue: {
            values: Object.entries(t).map( ([r,n]) => Lr(r, n))
        }
    } : {}
}
const no = 256
  , so = 512;
function Ir(t, e) {
    let r = t & 255 | no;
    return e && (r |= so),
    r
}
function io(t, e) {
    var i, o, a, u;
    const r = t.spanContext()
      , n = t.status
      , s = (i = t.parentSpanContext) != null && i.spanId ? e.encodeSpanContext((o = t.parentSpanContext) == null ? void 0 : o.spanId) : void 0;
    return {
        traceId: e.encodeSpanContext(r.traceId),
        spanId: e.encodeSpanContext(r.spanId),
        parentSpanId: s,
        traceState: (a = r.traceState) == null ? void 0 : a.serialize(),
        name: t.name,
        kind: t.kind == null ? 0 : t.kind + 1,
        startTimeUnixNano: e.encodeHrTime(t.startTime),
        endTimeUnixNano: e.encodeHrTime(t.endTime),
        attributes: Lt(t.attributes),
        droppedAttributesCount: t.droppedAttributesCount,
        events: t.events.map(c => ao(c, e)),
        droppedEventsCount: t.droppedEventsCount,
        status: {
            code: n.code,
            message: n.message
        },
        links: t.links.map(c => oo(c, e)),
        droppedLinksCount: t.droppedLinksCount,
        flags: Ir(r.traceFlags, (u = t.parentSpanContext) == null ? void 0 : u.isRemote)
    }
}
function oo(t, e) {
    var r;
    return {
        attributes: t.attributes ? Lt(t.attributes) : [],
        spanId: e.encodeSpanContext(t.context.spanId),
        traceId: e.encodeSpanContext(t.context.traceId),
        traceState: (r = t.context.traceState) == null ? void 0 : r.serialize(),
        droppedAttributesCount: t.droppedAttributesCount || 0,
        flags: Ir(t.context.traceFlags, t.context.isRemote)
    }
}
function ao(t, e) {
    return {
        attributes: t.attributes ? Lt(t.attributes) : [],
        name: t.name,
        timeUnixNano: e.encodeHrTime(t.time),
        droppedAttributesCount: t.droppedAttributesCount || 0
    }
}
function uo(t, e) {
    const r = to(e);
    return {
        resourceSpans: lo(t, r)
    }
}
function co(t) {
    const e = new Map;
    for (const r of t) {
        let n = e.get(r.resource);
        n || (n = new Map,
        e.set(r.resource, n));
        const s = "".concat(r.instrumentationScope.name, "@").concat(r.instrumentationScope.version || "", ":").concat(r.instrumentationScope.schemaUrl || "");
        let i = n.get(s);
        i || (i = [],
        n.set(s, i)),
        i.push(r)
    }
    return e
}
function lo(t, e) {
    const r = co(t)
      , n = []
      , s = r.entries();
    let i = s.next();
    for (; !i.done; ) {
        const [o,a] = i.value
          , u = []
          , c = a.values();
        let f = c.next();
        for (; !f.done; ) {
            const p = f.value;
            if (p.length > 0) {
                const m = p.map(T => io(T, e));
                u.push({
                    scope: ro(p[0].instrumentationScope),
                    spans: m,
                    schemaUrl: p[0].instrumentationScope.schemaUrl
                })
            }
            f = c.next()
        }
        const d = eo(o)
          , _ = {
            resource: d,
            scopeSpans: u,
            schemaUrl: d.schemaUrl
        };
        n.push(_),
        i = s.next()
    }
    return n
}
const fo = {
    serializeRequest: t => {
        const e = uo(t, {
            useHex: !0,
            useLongBits: !1
        });
        return new TextEncoder().encode(JSON.stringify(e))
    }
    ,
    deserializeResponse: t => {
        if (t.length === 0)
            return {};
        const e = new TextDecoder;
        return JSON.parse(e.decode(t))
    }
}
  , po = 5
  , ho = 1e3
  , _o = 5e3
  , go = 1.5
  , je = .2;
function mo() {
    return Math.random() * (2 * je) - je
}
class Eo {
    constructor(e) {
        l(this, "_transport");
        this._transport = e
    }
    retry(e, r, n) {
        return new Promise( (s, i) => {
            setTimeout( () => {
                this._transport.send(e, r).then(s, i)
            }
            , n)
        }
        )
    }
    async send(e, r) {
        var a;
        const n = Date.now() + r;
        let s = await this._transport.send(e, r)
          , i = po
          , o = ho;
        for (; s.status === "retryable" && i > 0; ) {
            i--;
            const u = Math.max(Math.min(o, _o) + mo(), 0);
            o = o * go;
            const c = (a = s.retryInMillis) != null ? a : u
              , f = n - Date.now();
            if (c > f)
                return s;
            s = await this.retry(e, f, c)
        }
        return s
    }
    shutdown() {
        return this._transport.shutdown()
    }
}
function Se(t) {
    return new Eo(t.transport)
}
function xr(t) {
    return [429, 502, 503, 504].includes(t)
}
function Dr(t) {
    if (t == null)
        return;
    const e = Number.parseInt(t, 10);
    if (Number.isInteger(e))
        return e > 0 ? e * 1e3 : -1;
    const r = new Date(t).getTime() - Date.now();
    return r >= 0 ? r : 0
}
class To {
    constructor(e) {
        l(this, "_parameters");
        this._parameters = e
    }
    async send(e, r) {
        const n = await this._parameters.headers();
        return await new Promise(i => {
            const o = new XMLHttpRequest;
            o.timeout = r,
            o.open("POST", this._parameters.url),
            Object.entries(n).forEach( ([a,u]) => {
                o.setRequestHeader(a, u)
            }
            ),
            o.ontimeout = a => {
                i({
                    status: "failure",
                    error: new Error("XHR request timed out")
                })
            }
            ,
            o.onreadystatechange = () => {
                o.status >= 200 && o.status <= 299 ? (E.debug("XHR success"),
                i({
                    status: "success"
                })) : o.status && xr(o.status) ? i({
                    status: "retryable",
                    retryInMillis: Dr(o.getResponseHeader("Retry-After"))
                }) : o.status !== 0 && i({
                    status: "failure",
                    error: new Error("XHR request failed with non-retryable status")
                })
            }
            ,
            o.onabort = () => {
                i({
                    status: "failure",
                    error: new Error("XHR request aborted")
                })
            }
            ,
            o.onerror = () => {
                i({
                    status: "failure",
                    error: new Error("XHR request errored")
                })
            }
            ,
            o.send(e)
        }
        )
    }
    shutdown() {}
}
function So(t) {
    return new To(t)
}
class yo {
    constructor(e) {
        l(this, "_params");
        this._params = e
    }
    async send(e) {
        const r = (await this._params.headers())["Content-Type"];
        return new Promise(n => {
            navigator.sendBeacon(this._params.url, new Blob([e],{
                type: r
            })) ? (E.debug("SendBeacon success"),
            n({
                status: "success"
            })) : n({
                status: "failure",
                error: new Error("SendBeacon failed")
            })
        }
        )
    }
    shutdown() {}
}
function bo(t) {
    return new yo(t)
}
class Ao {
    constructor(e) {
        l(this, "_parameters");
        this._parameters = e
    }
    async send(e, r) {
        var i;
        const n = new AbortController
          , s = setTimeout( () => n.abort(), r);
        try {
            const o = !!globalThis.location
              , a = new URL(this._parameters.url)
              , u = await fetch(a.href, {
                method: "POST",
                headers: await this._parameters.headers(),
                body: e,
                signal: n.signal,
                keepalive: o,
                mode: o ? ((i = globalThis.location) == null ? void 0 : i.origin) === a.origin ? "same-origin" : "cors" : "no-cors"
            });
            if (u.status >= 200 && u.status <= 299)
                return E.debug("response success"),
                {
                    status: "success"
                };
            if (xr(u.status)) {
                const c = u.headers.get("Retry-After");
                return {
                    status: "retryable",
                    retryInMillis: Dr(c)
                }
            }
            return {
                status: "failure",
                error: new Error("Fetch request failed with non-retryable status")
            }
        } catch (o) {
            return (o == null ? void 0 : o.name) === "AbortError" ? {
                status: "failure",
                error: new Error("Fetch request timed out",{
                    cause: o
                })
            } : {
                status: "failure",
                error: new Error("Fetch request errored",{
                    cause: o
                })
            }
        } finally {
            clearTimeout(s)
        }
    }
    shutdown() {}
}
function Ro(t) {
    return new Ao(t)
}
function vo(t, e) {
    return Ee(t, e, Se({
        transport: So(t)
    }))
}
function Oo(t, e) {
    return Ee(t, e, Se({
        transport: Ro(t)
    }))
}
function wo(t, e) {
    return Ee(t, e, Se({
        transport: bo({
            url: t.url,
            headers: t.headers
        })
    }))
}
function Co(t) {
    const e = {};
    return Object.entries(t != null ? t : {}).forEach( ([r,n]) => {
        typeof n < "u" ? e[r] = String(n) : E.warn('Header "'.concat(r, '" has invalid value (').concat(n, ") and will be ignored"))
    }
    ),
    e
}
function Po(t, e, r) {
    return async () => {
        const n = {
            ...await r()
        }
          , s = {};
        return e != null && Object.assign(s, await e()),
        t != null && Object.assign(s, Co(await t())),
        Object.assign(s, n)
    }
}
function Lo(t) {
    var e;
    if (t != null)
        try {
            const r = (e = globalThis.location) == null ? void 0 : e.href;
            return new URL(t,r).href
        } catch (r) {
            throw new Error("Configuration: Could not parse user-provided export URL: '".concat(t, "'"))
        }
}
function No(t, e, r) {
    var n, s;
    return {
        ...Bi(t, e, r),
        headers: Po(t.headers, e.headers, r.headers),
        url: (s = (n = Lo(t.url)) != null ? n : e.url) != null ? s : r.url
    }
}
function Io(t, e) {
    return {
        ...ki(),
        headers: async () => t,
        url: "http://localhost:4318/" + e
    }
}
function xo(t) {
    return typeof t.headers == "function" ? t.headers : Ui(t.headers)
}
function Do(t, e, r) {
    return No({
        url: t.url,
        timeoutMillis: t.timeoutMillis,
        headers: xo(t),
        concurrencyLimit: t.concurrencyLimit
    }, {}, Io(r, e))
}
function Mo(t, e, r, n) {
    const s = Uo(t.headers)
      , i = Do(t, r, n);
    return s(i, e)
}
function Uo(t) {
    return !t && typeof navigator.sendBeacon == "function" ? wo : typeof globalThis.fetch < "u" ? Oo : vo
}
class Bo extends Di {
    constructor(e={}) {
        super(Mo(e, fo, "v1/traces", {
            "Content-Type": "application/json"
        }))
    }
}
class Mr {
    emit(e) {}
}
const ko = new Mr;
class Ho {
    getLogger(e, r, n) {
        return new Mr
    }
}
const Ur = new Ho;
class jo {
    constructor(e, r, n, s) {
        this._provider = e,
        this.name = r,
        this.version = n,
        this.options = s
    }
    emit(e) {
        this._getLogger().emit(e)
    }
    _getLogger() {
        if (this._delegate)
            return this._delegate;
        const e = this._provider._getDelegateLogger(this.name, this.version, this.options);
        return e ? (this._delegate = e,
        this._delegate) : ko
    }
}
class $e {
    getLogger(e, r, n) {
        var s;
        return (s = this._getDelegateLogger(e, r, n)) !== null && s !== void 0 ? s : new jo(this,e,r,n)
    }
    _getDelegate() {
        var e;
        return (e = this._delegate) !== null && e !== void 0 ? e : Ur
    }
    _setDelegate(e) {
        this._delegate = e
    }
    _getDelegateLogger(e, r, n) {
        var s;
        return (s = this._delegate) === null || s === void 0 ? void 0 : s.getLogger(e, r, n)
    }
}
const $o = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global == "object" ? global : {}
  , mt = Symbol.for("io.opentelemetry.js.api.logs")
  , Z = $o;
function Go(t, e, r) {
    return n => n === t ? e : r
}
const Ge = 1;
class ye {
    constructor() {
        this._proxyLoggerProvider = new $e
    }
    static getInstance() {
        return this._instance || (this._instance = new ye),
        this._instance
    }
    setGlobalLoggerProvider(e) {
        return Z[mt] ? this.getLoggerProvider() : (Z[mt] = Go(Ge, e, Ur),
        this._proxyLoggerProvider._setDelegate(e),
        e)
    }
    getLoggerProvider() {
        var e, r;
        return (r = (e = Z[mt]) === null || e === void 0 ? void 0 : e.call(Z, Ge)) !== null && r !== void 0 ? r : this._proxyLoggerProvider
    }
    getLogger(e, r, n) {
        return this.getLoggerProvider().getLogger(e, r, n)
    }
    disable() {
        delete Z[mt],
        this._proxyLoggerProvider = new $e
    }
}
const Br = ye.getInstance();
function Fo(t, e, r, n) {
    for (let s = 0, i = t.length; s < i; s++) {
        const o = t[s];
        e && o.setTracerProvider(e),
        r && o.setMeterProvider(r),
        n && o.setLoggerProvider && o.setLoggerProvider(n),
        o.getConfig().enabled || o.enable()
    }
}
function Vo(t) {
    t.forEach(e => e.disable())
}
function zo(t) {
    var i, o;
    const e = t.tracerProvider || R.getTracerProvider()
      , r = t.meterProvider || er.getMeterProvider()
      , n = t.loggerProvider || Br.getLoggerProvider()
      , s = (o = (i = t.instrumentations) == null ? void 0 : i.flat()) != null ? o : [];
    return Fo(s, e, r, n),
    () => {
        Vo(s)
    }
}
let w = console.error.bind(console);
function tt(t, e, r) {
    const n = !!t[e] && Object.prototype.propertyIsEnumerable.call(t, e);
    Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: n,
        writable: !0,
        value: r
    })
}
const kr = (t, e, r) => {
    if (!t || !t[e]) {
        w("no original function " + String(e) + " to wrap");
        return
    }
    if (!r) {
        w("no wrapper function"),
        w(new Error().stack);
        return
    }
    const n = t[e];
    if (typeof n != "function" || typeof r != "function") {
        w("original object and wrapper must be functions");
        return
    }
    const s = r(n, e);
    return tt(s, "__original", n),
    tt(s, "__unwrap", () => {
        t[e] === s && tt(t, e, n)
    }
    ),
    tt(s, "__wrapped", !0),
    tt(t, e, s),
    s
}
  , qo = (t, e, r) => {
    if (t)
        Array.isArray(t) || (t = [t]);
    else {
        w("must provide one or more modules to patch"),
        w(new Error().stack);
        return
    }
    if (!(e && Array.isArray(e))) {
        w("must provide one or more functions to wrap on modules");
        return
    }
    t.forEach(n => {
        e.forEach(s => {
            kr(n, s, r)
        }
        )
    }
    )
}
  , Hr = (t, e) => {
    if (!t || !t[e]) {
        w("no function to unwrap."),
        w(new Error().stack);
        return
    }
    const r = t[e];
    if (!r.__unwrap)
        w("no original to unwrap to -- has " + String(e) + " already been unwrapped?");
    else {
        r.__unwrap();
        return
    }
}
  , Xo = (t, e) => {
    if (t)
        Array.isArray(t) || (t = [t]);
    else {
        w("must provide one or more modules to patch"),
        w(new Error().stack);
        return
    }
    if (!(e && Array.isArray(e))) {
        w("must provide one or more functions to unwrap on modules");
        return
    }
    t.forEach(r => {
        e.forEach(n => {
            Hr(r, n)
        }
        )
    }
    )
}
;
class Ko {
    constructor(e, r, n) {
        l(this, "instrumentationName");
        l(this, "instrumentationVersion");
        l(this, "_config", {});
        l(this, "_tracer");
        l(this, "_meter");
        l(this, "_logger");
        l(this, "_diag");
        l(this, "_wrap", kr);
        l(this, "_unwrap", Hr);
        l(this, "_massWrap", qo);
        l(this, "_massUnwrap", Xo);
        this.instrumentationName = e,
        this.instrumentationVersion = r,
        this.setConfig(n),
        this._diag = E.createComponentLogger({
            namespace: e
        }),
        this._tracer = R.getTracer(e, r),
        this._meter = er.getMeter(e, r),
        this._logger = Br.getLogger(e, r),
        this._updateMetricInstruments()
    }
    get meter() {
        return this._meter
    }
    setMeterProvider(e) {
        this._meter = e.getMeter(this.instrumentationName, this.instrumentationVersion),
        this._updateMetricInstruments()
    }
    get logger() {
        return this._logger
    }
    setLoggerProvider(e) {
        this._logger = e.getLogger(this.instrumentationName, this.instrumentationVersion)
    }
    getModuleDefinitions() {
        var r;
        const e = (r = this.init()) != null ? r : [];
        return Array.isArray(e) ? e : [e]
    }
    _updateMetricInstruments() {}
    getConfig() {
        return this._config
    }
    setConfig(e) {
        this._config = {
            enabled: !0,
            ...e
        }
    }
    setTracerProvider(e) {
        this._tracer = e.getTracer(this.instrumentationName, this.instrumentationVersion)
    }
    get tracer() {
        return this._tracer
    }
    _runSpanCustomizationHook(e, r, n, s) {
        if (e)
            try {
                e(n, s)
            } catch (i) {
                this._diag.error("Error running span customization hook due to exception in handler", {
                    triggerName: r
                }, i)
            }
    }
}
class jr extends Ko {
    constructor(e, r, n) {
        super(e, r, n),
        this._config.enabled && this.enable()
    }
}
function ie(t, e, r) {
    let n, s;
    try {
        s = t()
    } catch (i) {
        n = i
    } finally {
        if (e(n, s),
        n && !r)
            throw n;
        return s
    }
}
function oe(t) {
    return typeof t == "function" && typeof t.__original == "function" && typeof t.__unwrap == "function" && t.__wrapped === !0
}
var b;
(function(t) {
    t[t.STABLE = 1] = "STABLE",
    t[t.OLD = 2] = "OLD",
    t[t.DUPLICATE = 3] = "DUPLICATE"
}
)(b || (b = {}));
function $r(t, e) {
    let r = b.OLD;
    const n = e == null ? void 0 : e.split(",").map(s => s.trim()).filter(s => s !== "");
    for (const s of n != null ? n : [])
        if (s.toLowerCase() === t + "/dup") {
            r = b.DUPLICATE;
            break
        } else
            s.toLowerCase() === t && (r = b.STABLE);
    return r
}
var S;
(function(t) {
    t.CONNECT_END = "connectEnd",
    t.CONNECT_START = "connectStart",
    t.DECODED_BODY_SIZE = "decodedBodySize",
    t.DOM_COMPLETE = "domComplete",
    t.DOM_CONTENT_LOADED_EVENT_END = "domContentLoadedEventEnd",
    t.DOM_CONTENT_LOADED_EVENT_START = "domContentLoadedEventStart",
    t.DOM_INTERACTIVE = "domInteractive",
    t.DOMAIN_LOOKUP_END = "domainLookupEnd",
    t.DOMAIN_LOOKUP_START = "domainLookupStart",
    t.ENCODED_BODY_SIZE = "encodedBodySize",
    t.FETCH_START = "fetchStart",
    t.LOAD_EVENT_END = "loadEventEnd",
    t.LOAD_EVENT_START = "loadEventStart",
    t.NAVIGATION_START = "navigationStart",
    t.REDIRECT_END = "redirectEnd",
    t.REDIRECT_START = "redirectStart",
    t.REQUEST_START = "requestStart",
    t.RESPONSE_END = "responseEnd",
    t.RESPONSE_START = "responseStart",
    t.SECURE_CONNECTION_START = "secureConnectionStart",
    t.START_TIME = "startTime",
    t.UNLOAD_EVENT_END = "unloadEventEnd",
    t.UNLOAD_EVENT_START = "unloadEventStart"
}
)(S || (S = {}));
const Wo = "http.response_content_length"
  , Yo = "http.response_content_length_uncompressed";
let qt;
function Qo() {
    return qt || (qt = document.createElement("a")),
    qt
}
function Jo(t, e) {
    return e in t
}
function D(t, e, r, n=!0) {
    if (Jo(r, e) && typeof r[e] == "number" && !(n && r[e] === 0))
        return t.addEvent(e, r[e])
}
function Rt(t, e, r=!1, n, s) {
    if (n === void 0 && (n = e[S.START_TIME] !== 0),
    r || (D(t, S.FETCH_START, e, n),
    D(t, S.DOMAIN_LOOKUP_START, e, n),
    D(t, S.DOMAIN_LOOKUP_END, e, n),
    D(t, S.CONNECT_START, e, n),
    D(t, S.SECURE_CONNECTION_START, e, n),
    D(t, S.CONNECT_END, e, n),
    D(t, S.REQUEST_START, e, n),
    D(t, S.RESPONSE_START, e, n),
    D(t, S.RESPONSE_END, e, n)),
    !s) {
        const i = e[S.ENCODED_BODY_SIZE];
        i !== void 0 && t.setAttribute(Wo, i);
        const o = e[S.DECODED_BODY_SIZE];
        o !== void 0 && i !== o && t.setAttribute(Yo, o)
    }
}
function Zo(t) {
    return t.slice().sort( (e, r) => {
        const n = e[S.FETCH_START]
          , s = r[S.FETCH_START];
        return n > s ? 1 : n < s ? -1 : 0
    }
    )
}
function Gr() {
    return typeof location < "u" ? location.origin : void 0
}
function Fr(t, e, r, n, s=new WeakSet, i) {
    const o = B(t);
    t = o.toString();
    const a = ea(t, e, r, n, s, i);
    if (a.length === 0)
        return {
            mainRequest: void 0
        };
    if (a.length === 1)
        return {
            mainRequest: a[0]
        };
    const u = Zo(a);
    if (o.origin !== Gr() && u.length > 1) {
        let c = u[0]
          , f = ta(u, c[S.RESPONSE_END], r);
        const d = c[S.RESPONSE_END];
        return f[S.FETCH_START] < d && (f = c,
        c = void 0),
        {
            corsPreFlightRequest: c,
            mainRequest: f
        }
    } else
        return {
            mainRequest: a[0]
        }
}
function ta(t, e, r) {
    const n = k(r)
      , s = k(nt(e));
    let i = t[1], o;
    const a = t.length;
    for (let u = 1; u < a; u++) {
        const c = t[u]
          , f = k(nt(c[S.FETCH_START]))
          , d = k(nt(c[S.RESPONSE_END]))
          , _ = n - d;
        f >= s && (!o || _ < o) && (o = _,
        i = c)
    }
    return i
}
function ea(t, e, r, n, s, i) {
    const o = k(e)
      , a = k(r);
    let u = n.filter(c => {
        const f = k(nt(c[S.FETCH_START]))
          , d = k(nt(c[S.RESPONSE_END]));
        return c.initiatorType.toLowerCase() === (i || "xmlhttprequest") && c.name === t && f >= o && d <= a
    }
    );
    return u.length > 0 && (u = u.filter(c => !s.has(c))),
    u
}
function B(t) {
    if (typeof URL == "function")
        return new URL(t,typeof document < "u" ? document.baseURI : typeof location < "u" ? location.href : void 0);
    const e = Qo();
    return e.href = t,
    e
}
function Vr(t, e) {
    let r = e || [];
    return (typeof r == "string" || r instanceof RegExp) && (r = [r]),
    B(t).origin === Gr() ? !0 : r.some(s => vr(t, s))
}
var vt;
(function(t) {
    t.COMPONENT = "component",
    t.HTTP_STATUS_TEXT = "http.status_text"
}
)(vt || (vt = {}));
const ra = "http.host"
  , na = "http.method"
  , sa = "http.request.body.size"
  , ia = "http.request_content_length_uncompressed"
  , oa = "http.scheme"
  , aa = "http.status_code"
  , ua = "http.url"
  , ca = "http.user_agent"
  , zr = E.createComponentLogger({
    namespace: "@opentelemetry/opentelemetry-instrumentation-fetch/utils"
});
function la(...t) {
    if (t[0]instanceof URL || typeof t[0] == "string") {
        const e = t[1];
        if (!(e != null && e.body))
            return Promise.resolve();
        if (e.body instanceof ReadableStream) {
            const {body: r, length: n} = fa(e.body);
            return e.body = r,
            n
        } else
            return Promise.resolve(pa(e.body))
    } else {
        const e = t[0];
        return e != null && e.body ? e.clone().text().then(r => ae(r)) : Promise.resolve()
    }
}
function fa(t) {
    if (!t.pipeThrough)
        return zr.warn("Platform has ReadableStream but not pipeThrough!"),
        {
            body: t,
            length: Promise.resolve(void 0)
        };
    let e = 0, r;
    const n = new Promise(i => {
        r = i
    }
    )
      , s = new TransformStream({
        start() {},
        async transform(i, o) {
            const a = await i;
            e += a.byteLength,
            o.enqueue(i)
        },
        flush() {
            r(e)
        }
    });
    return {
        body: t.pipeThrough(s),
        length: n
    }
}
function da(t) {
    return typeof Document < "u" && t instanceof Document
}
function pa(t) {
    if (da(t))
        return new XMLSerializer().serializeToString(document).length;
    if (typeof t == "string")
        return ae(t);
    if (t instanceof Blob)
        return t.size;
    if (t instanceof FormData)
        return _a(t);
    if (t instanceof URLSearchParams)
        return ae(t.toString());
    if (t.byteLength !== void 0)
        return t.byteLength;
    zr.warn("unknown body type")
}
const ha = new TextEncoder;
function ae(t) {
    return ha.encode(t).byteLength
}
function _a(t) {
    let e = 0;
    for (const [r,n] of t.entries())
        e += r.length,
        n instanceof Blob ? e += n.size : e += n.length;
    return e
}
function ga(t) {
    const e = Ea()
      , r = t.toUpperCase();
    return r in e ? r : "_OTHER"
}
const ma = {
    CONNECT: !0,
    DELETE: !0,
    GET: !0,
    HEAD: !0,
    OPTIONS: !0,
    PATCH: !0,
    POST: !0,
    PUT: !0,
    TRACE: !0
};
let Xt;
function Ea() {
    return Xt === void 0 && (Xt = ma),
    Xt
}
const Ta = {
    "https:": "443",
    "http:": "80"
};
function Sa(t) {
    const e = Number(t.port || Ta[t.protocol]);
    if (e && !isNaN(e))
        return e
}
const Fe = "0.208.0"
  , ya = 300;
var Ke;
const Ve = typeof process == "object" && ((Ke = process.release) == null ? void 0 : Ke.name) === "node";
class ba extends jr {
    constructor(r={}) {
        super("@opentelemetry/instrumentation-fetch", Fe, r);
        l(this, "component", "fetch");
        l(this, "version", Fe);
        l(this, "moduleName", this.component);
        l(this, "_usedResources", new WeakSet);
        l(this, "_tasksCount", 0);
        l(this, "_semconvStability");
        this._semconvStability = $r("http", r == null ? void 0 : r.semconvStabilityOptIn)
    }
    init() {}
    _addChildSpan(r, n) {
        const s = this.tracer.startSpan("CORS Preflight", {
            startTime: n[S.FETCH_START]
        }, R.setSpan(A.active(), r))
          , i = !(this._semconvStability & b.OLD);
        Rt(s, n, this.getConfig().ignoreNetworkEvents, void 0, i),
        s.end(n[S.RESPONSE_END])
    }
    _addFinalSpanAttributes(r, n) {
        const s = B(n.url);
        if (this._semconvStability & b.OLD && (r.setAttribute(aa, n.status),
        n.statusText != null && r.setAttribute(vt.HTTP_STATUS_TEXT, n.statusText),
        r.setAttribute(ra, s.host),
        r.setAttribute(oa, s.protocol.replace(":", "")),
        typeof navigator < "u" && r.setAttribute(ca, navigator.userAgent)),
        this._semconvStability & b.STABLE) {
            r.setAttribute(cr, n.status),
            r.setAttribute(lr, s.hostname);
            const i = Sa(s);
            i && r.setAttribute(fr, i)
        }
    }
    _addHeaders(r, n) {
        if (!Vr(n, this.getConfig().propagateTraceHeaderCorsUrls)) {
            const s = {};
            P.inject(A.active(), s),
            Object.keys(s).length > 0 && this._diag.debug("headers inject skipped due to CORS policy");
            return
        }
        if (r instanceof Request)
            P.inject(A.active(), r.headers, {
                set: (s, i, o) => s.set(i, typeof o == "string" ? o : String(o))
            });
        else if (r.headers instanceof Headers)
            P.inject(A.active(), r.headers, {
                set: (s, i, o) => s.set(i, typeof o == "string" ? o : String(o))
            });
        else if (r.headers instanceof Map)
            P.inject(A.active(), r.headers, {
                set: (s, i, o) => s.set(i, typeof o == "string" ? o : String(o))
            });
        else {
            const s = {};
            P.inject(A.active(), s),
            r.headers = Object.assign({}, s, r.headers || {})
        }
    }
    _clearResources() {
        this._tasksCount === 0 && this.getConfig().clearTimingResources && (performance.clearResourceTimings(),
        this._usedResources = new WeakSet)
    }
    _createSpan(r, n={}) {
        if (Or(r, this.getConfig().ignoreUrls)) {
            this._diag.debug("ignoring span as url matches ignored url");
            return
        }
        let s = "";
        const i = {};
        if (this._semconvStability & b.OLD) {
            const o = (n.method || "GET").toUpperCase();
            s = "HTTP ".concat(o),
            i[vt.COMPONENT] = this.moduleName,
            i[na] = o,
            i[ua] = r
        }
        if (this._semconvStability & b.STABLE) {
            const o = n.method
              , a = ga(n.method || "GET");
            s || (s = a),
            i[ar] = a,
            a !== o && (i[ur] = o),
            i[dr] = r
        }
        return this.tracer.startSpan(s, {
            kind: at.CLIENT,
            attributes: i
        })
    }
    _findResourceAndAddNetworkEvents(r, n, s) {
        let i = n.entries;
        if (!i.length) {
            if (!performance.getEntriesByType)
                return;
            i = performance.getEntriesByType("resource")
        }
        const o = Fr(n.spanUrl, n.startTime, s, i, this._usedResources, "fetch");
        if (o.mainRequest) {
            const a = o.mainRequest;
            this._markResourceAsUsed(a);
            const u = o.corsPreFlightRequest;
            u && (this._addChildSpan(r, u),
            this._markResourceAsUsed(u));
            const c = !(this._semconvStability & b.OLD);
            Rt(r, a, this.getConfig().ignoreNetworkEvents, void 0, c)
        }
    }
    _markResourceAsUsed(r) {
        this._usedResources.add(r)
    }
    _endSpan(r, n, s) {
        const i = ct(Date.now())
          , o = lt();
        this._addFinalSpanAttributes(r, s),
        this._semconvStability & b.STABLE && s.status >= 400 && (r.setStatus({
            code: C.ERROR
        }),
        r.setAttribute(Yt, String(s.status))),
        setTimeout( () => {
            var a;
            (a = n.observer) == null || a.disconnect(),
            this._findResourceAndAddNetworkEvents(r, n, o),
            this._tasksCount--,
            this._clearResources(),
            r.end(i)
        }
        , ya)
    }
    _patchConstructor() {
        return r => {
            const n = this;
            return function(...i) {
                const o = this
                  , a = B(i[0]instanceof Request ? i[0].url : String(i[0])).href
                  , u = i[0]instanceof Request ? i[0] : i[1] || {}
                  , c = n._createSpan(a, u);
                if (!c)
                    return r.apply(this, i);
                const f = n._prepareSpanData(a);
                n.getConfig().measureRequestSize && la(...i).then(h => {
                    h && (n._semconvStability & b.OLD && c.setAttribute(ia, h),
                    n._semconvStability & b.STABLE && c.setAttribute(sa, h))
                }
                ).catch(h => {
                    n._diag.warn("getFetchBodyLength", h)
                }
                );
                function d(h, g) {
                    n._applyAttributesAfterFetch(h, u, g),
                    n._endSpan(h, f, {
                        status: g.status || 0,
                        statusText: g.message,
                        url: a
                    })
                }
                function _(h, g) {
                    n._applyAttributesAfterFetch(h, u, g),
                    g.status >= 200 && g.status < 400 ? n._endSpan(h, f, g) : n._endSpan(h, f, {
                        status: g.status,
                        statusText: g.statusText,
                        url: a
                    })
                }
                function p(h, g) {
                    if (!h)
                        return null;
                    const y = h.getReader();
                    return new ReadableStream({
                        async pull(v) {
                            try {
                                const {value: x, done: L} = await y.read();
                                L ? (y.releaseLock(),
                                v.close()) : v.enqueue(x)
                            } catch (x) {
                                v.error(x),
                                y.cancel(x).catch(L => {}
                                );
                                try {
                                    y.releaseLock()
                                } catch (L) {}
                            }
                        },
                        cancel(v) {
                            return g.cancel(v).catch(x => {}
                            ),
                            y.cancel(v)
                        }
                    })
                }
                function m(h, g, y) {
                    let v = null;
                    try {
                        const L = y.clone().body;
                        if (L) {
                            const be = L.getReader()
                              , Kr = y.status === 204 || y.status === 205 || y.status === 304 ? null : p(y.body, be);
                            v = new Response(Kr,{
                                status: y.status,
                                statusText: y.statusText,
                                headers: y.headers
                            });
                            const Ae = () => {
                                be.read().then( ({done: It}) => {
                                    It ? _(h, y) : Ae()
                                }
                                , It => {
                                    d(h, It)
                                }
                                )
                            }
                            ;
                            Ae()
                        } else
                            _(h, y)
                    } finally {
                        g(v != null ? v : y)
                    }
                }
                function T(h, g, y) {
                    try {
                        d(h, y)
                    } finally {
                        g(y)
                    }
                }
                return new Promise( (h, g) => A.with(R.setSpan(A.active(), c), () => (n._addHeaders(u, a),
                n._callRequestHook(c, u),
                n._tasksCount++,
                r.apply(o, u instanceof Request ? [u] : [a, u]).then(m.bind(o, c, h), T.bind(o, c, g)))))
            }
        }
    }
    _applyAttributesAfterFetch(r, n, s) {
        const i = this.getConfig().applyCustomAttributesOnSpan;
        i && ie( () => i(r, n, s), o => {
            o && this._diag.error("applyCustomAttributesOnSpan", o)
        }
        , !0)
    }
    _callRequestHook(r, n) {
        const s = this.getConfig().requestHook;
        s && ie( () => s(r, n), i => {
            i && this._diag.error("requestHook", i)
        }
        , !0)
    }
    _prepareSpanData(r) {
        const n = lt()
          , s = [];
        if (typeof PerformanceObserver != "function")
            return {
                entries: s,
                startTime: n,
                spanUrl: r
            };
        const i = new PerformanceObserver(o => {
            o.getEntries().forEach(u => {
                u.initiatorType === "fetch" && u.name === r && s.push(u)
            }
            )
        }
        );
        return i.observe({
            entryTypes: ["resource"]
        }),
        {
            entries: s,
            observer: i,
            startTime: n,
            spanUrl: r
        }
    }
    enable() {
        if (Ve) {
            this._diag.warn("this instrumentation is intended for web usage only, it does not instrument Node.js's fetch()");
            return
        }
        oe(fetch) && (this._unwrap(zt, "fetch"),
        this._diag.debug("removing previous patch for constructor")),
        this._wrap(zt, "fetch", this._patchConstructor())
    }
    disable() {
        Ve || (this._unwrap(zt, "fetch"),
        this._usedResources = new WeakSet)
    }
}
const Aa = "http.host"
  , Ra = "http.method"
  , va = "http.request.body.size"
  , Oa = "http.request_content_length_uncompressed"
  , wa = "http.scheme"
  , Ca = "http.status_code"
  , Pa = "http.url"
  , La = "http.user_agent";
var U;
(function(t) {
    t.METHOD_OPEN = "open",
    t.METHOD_SEND = "send",
    t.EVENT_ABORT = "abort",
    t.EVENT_ERROR = "error",
    t.EVENT_LOAD = "loaded",
    t.EVENT_TIMEOUT = "timeout"
}
)(U || (U = {}));
const Na = E.createComponentLogger({
    namespace: "@opentelemetry/opentelemetry-instrumentation-xml-http-request/utils"
});
function Ia(t) {
    return typeof Document < "u" && t instanceof Document
}
function xa(t) {
    if (Ia(t))
        return new XMLSerializer().serializeToString(document).length;
    if (typeof t == "string")
        return ze(t);
    if (t instanceof Blob)
        return t.size;
    if (t instanceof FormData)
        return Ma(t);
    if (t instanceof URLSearchParams)
        return ze(t.toString());
    if (t.byteLength !== void 0)
        return t.byteLength;
    Na.warn("unknown body type")
}
const Da = new TextEncoder;
function ze(t) {
    return Da.encode(t).byteLength
}
function Ma(t) {
    let e = 0;
    for (const [r,n] of t.entries())
        e += r.length,
        n instanceof Blob ? e += n.size : e += n.length;
    return e
}
function Ua(t) {
    const e = ka()
      , r = t.toUpperCase();
    return r in e ? r : "_OTHER"
}
const Ba = {
    CONNECT: !0,
    DELETE: !0,
    GET: !0,
    HEAD: !0,
    OPTIONS: !0,
    PATCH: !0,
    POST: !0,
    PUT: !0,
    TRACE: !0
};
let Kt;
function ka() {
    return Kt === void 0 && (Kt = Ba),
    Kt
}
const Ha = {
    "https:": "443",
    "http:": "80"
};
function ja(t) {
    const e = Number(t.port || Ha[t.protocol]);
    if (e && !isNaN(e))
        return e
}
const qe = "0.208.0";
var ue;
(function(t) {
    t.HTTP_STATUS_TEXT = "http.status_text"
}
)(ue || (ue = {}));
const $a = 300;
class Ga extends jr {
    constructor(r={}) {
        super("@opentelemetry/instrumentation-xml-http-request", qe, r);
        l(this, "component", "xml-http-request");
        l(this, "version", qe);
        l(this, "moduleName", this.component);
        l(this, "_tasksCount", 0);
        l(this, "_xhrMem", new WeakMap);
        l(this, "_usedResources", new WeakSet);
        l(this, "_semconvStability");
        this._semconvStability = $r("http", r == null ? void 0 : r.semconvStabilityOptIn)
    }
    init() {}
    _addHeaders(r, n) {
        const s = B(n).href;
        if (!Vr(s, this.getConfig().propagateTraceHeaderCorsUrls)) {
            const o = {};
            P.inject(A.active(), o),
            Object.keys(o).length > 0 && this._diag.debug("headers inject skipped due to CORS policy");
            return
        }
        const i = {};
        P.inject(A.active(), i),
        Object.keys(i).forEach(o => {
            r.setRequestHeader(o, String(i[o]))
        }
        )
    }
    _addChildSpan(r, n) {
        A.with(R.setSpan(A.active(), r), () => {
            const s = this.tracer.startSpan("CORS Preflight", {
                startTime: n[S.FETCH_START]
            })
              , i = !(this._semconvStability & b.OLD);
            Rt(s, n, this.getConfig().ignoreNetworkEvents, void 0, i),
            s.end(n[S.RESPONSE_END])
        }
        )
    }
    _addFinalSpanAttributes(r, n, s) {
        if (this._semconvStability & b.OLD) {
            if (n.status !== void 0 && r.setAttribute(Ca, n.status),
            n.statusText !== void 0 && r.setAttribute(ue.HTTP_STATUS_TEXT, n.statusText),
            typeof s == "string") {
                const i = B(s);
                r.setAttribute(Aa, i.host),
                r.setAttribute(wa, i.protocol.replace(":", ""))
            }
            r.setAttribute(La, navigator.userAgent)
        }
        this._semconvStability & b.STABLE && n.status && r.setAttribute(cr, n.status)
    }
    _applyAttributesAfterXHR(r, n) {
        const s = this.getConfig().applyCustomAttributesOnSpan;
        typeof s == "function" && ie( () => s(r, n), i => {
            i && this._diag.error("applyCustomAttributesOnSpan", i)
        }
        , !0)
    }
    _addResourceObserver(r, n) {
        const s = this._xhrMem.get(r);
        !s || typeof PerformanceObserver != "function" || typeof PerformanceResourceTiming != "function" || (s.createdResources = {
            observer: new PerformanceObserver(i => {
                const o = i.getEntries()
                  , a = B(n);
                o.forEach(u => {
                    u.initiatorType === "xmlhttprequest" && u.name === a.href && s.createdResources && s.createdResources.entries.push(u)
                }
                )
            }
            ),
            entries: []
        },
        s.createdResources.observer.observe({
            entryTypes: ["resource"]
        }))
    }
    _clearResources() {
        this._tasksCount === 0 && this.getConfig().clearTimingResources && (ut.clearResourceTimings(),
        this._xhrMem = new WeakMap,
        this._usedResources = new WeakSet)
    }
    _findResourceAndAddNetworkEvents(r, n, s, i, o) {
        if (!s || !i || !o || !r.createdResources)
            return;
        let a = r.createdResources.entries;
        (!a || !a.length) && (a = ut.getEntriesByType("resource"));
        const u = Fr(B(s).href, i, o, a, this._usedResources);
        if (u.mainRequest) {
            const c = u.mainRequest;
            this._markResourceAsUsed(c);
            const f = u.corsPreFlightRequest;
            f && (this._addChildSpan(n, f),
            this._markResourceAsUsed(f));
            const d = !(this._semconvStability & b.OLD);
            Rt(n, c, this.getConfig().ignoreNetworkEvents, void 0, d)
        }
    }
    _cleanPreviousSpanInformation(r) {
        const n = this._xhrMem.get(r);
        if (n) {
            const s = n.callbackToRemoveEvents;
            s && s(),
            this._xhrMem.delete(r)
        }
    }
    _createSpan(r, n, s) {
        if (Or(n, this.getConfig().ignoreUrls)) {
            this._diag.debug("ignoring span as url matches ignored url");
            return
        }
        let i = "";
        const o = B(n)
          , a = {};
        if (this._semconvStability & b.OLD && (i = s.toUpperCase(),
        a[Ra] = s,
        a[Pa] = o.toString()),
        this._semconvStability & b.STABLE) {
            const c = s
              , f = Ua(s);
            i || (i = f),
            a[ar] = f,
            f !== c && (a[ur] = c),
            a[dr] = o.toString(),
            a[lr] = o.hostname;
            const d = ja(o);
            d && (a[fr] = d)
        }
        const u = this.tracer.startSpan(i, {
            kind: at.CLIENT,
            attributes: a
        });
        return u.addEvent(U.METHOD_OPEN),
        this._cleanPreviousSpanInformation(r),
        this._xhrMem.set(r, {
            span: u,
            spanUrl: n
        }),
        u
    }
    _markResourceAsUsed(r) {
        this._usedResources.add(r)
    }
    _patchOpen() {
        return r => {
            const n = this;
            return function(...i) {
                const o = i[0]
                  , a = i[1];
                return n._createSpan(this, a, o),
                r.apply(this, i)
            }
        }
    }
    _patchSend() {
        const r = this;
        function n(f, d, _, p) {
            const m = d.callbackToRemoveEvents;
            typeof m == "function" && m();
            const {span: T, spanUrl: h, sendStartTime: g} = d;
            T && (r._findResourceAndAddNetworkEvents(d, T, h, g, _),
            T.addEvent(f, p),
            r._addFinalSpanAttributes(T, d, h),
            T.end(p),
            r._tasksCount--),
            r._clearResources()
        }
        function s(f, d, _, p) {
            const m = r._xhrMem.get(d);
            if (!m)
                return;
            if (m.status = d.status,
            m.statusText = d.statusText,
            r._xhrMem.delete(d),
            m.span) {
                const g = m.span;
                r._applyAttributesAfterXHR(g, d),
                r._semconvStability & b.STABLE && (_ ? p && (g.setStatus({
                    code: C.ERROR,
                    message: p
                }),
                g.setAttribute(Yt, p)) : m.status && m.status >= 400 && (g.setStatus({
                    code: C.ERROR
                }),
                g.setAttribute(Yt, String(m.status))))
            }
            const T = lt()
              , h = Date.now();
            setTimeout( () => {
                n(f, m, T, h)
            }
            , $a)
        }
        function i() {
            s(U.EVENT_ERROR, this, !0, "error")
        }
        function o() {
            s(U.EVENT_ABORT, this, !1)
        }
        function a() {
            s(U.EVENT_TIMEOUT, this, !0, "timeout")
        }
        function u() {
            this.status < 299 ? s(U.EVENT_LOAD, this, !1) : s(U.EVENT_ERROR, this, !1)
        }
        function c(f) {
            f.removeEventListener("abort", o),
            f.removeEventListener("error", i),
            f.removeEventListener("load", u),
            f.removeEventListener("timeout", a);
            const d = r._xhrMem.get(f);
            d && (d.callbackToRemoveEvents = void 0)
        }
        return f => function(..._) {
            const p = r._xhrMem.get(this);
            if (!p)
                return f.apply(this, _);
            const m = p.span
              , T = p.spanUrl;
            if (m && T) {
                if (r.getConfig().measureRequestSize && (_ != null && _[0])) {
                    const h = _[0]
                      , g = xa(h);
                    g !== void 0 && (r._semconvStability & b.OLD && m.setAttribute(Oa, g),
                    r._semconvStability & b.STABLE && m.setAttribute(va, g))
                }
                A.with(R.setSpan(A.active(), m), () => {
                    r._tasksCount++,
                    p.sendStartTime = lt(),
                    m.addEvent(U.METHOD_SEND),
                    this.addEventListener("abort", o),
                    this.addEventListener("error", i),
                    this.addEventListener("load", u),
                    this.addEventListener("timeout", a),
                    p.callbackToRemoveEvents = () => {
                        c(this),
                        p.createdResources && p.createdResources.observer.disconnect()
                    }
                    ,
                    r._addHeaders(this, T),
                    r._addResourceObserver(this, T)
                }
                )
            }
            return f.apply(this, _)
        }
    }
    enable() {
        this._diag.debug("applying patch to", this.moduleName, this.version),
        oe(XMLHttpRequest.prototype.open) && (this._unwrap(XMLHttpRequest.prototype, "open"),
        this._diag.debug("removing previous patch from method open")),
        oe(XMLHttpRequest.prototype.send) && (this._unwrap(XMLHttpRequest.prototype, "send"),
        this._diag.debug("removing previous patch from method send")),
        this._wrap(XMLHttpRequest.prototype, "open", this._patchOpen()),
        this._wrap(XMLHttpRequest.prototype, "send", this._patchSend())
    }
    disable() {
        this._diag.debug("removing patch from", this.moduleName, this.version),
        this._unwrap(XMLHttpRequest.prototype, "open"),
        this._unwrap(XMLHttpRequest.prototype, "send"),
        this._tasksCount = 0,
        this._xhrMem = new WeakMap,
        this._usedResources = new WeakSet
    }
}
const Fa = "@devops-observability/otel-web"
  , Va = "0.0.6";
let ft = null;
function za(t) {
    var e, r, n, s;
    return {
        onlyTraceError: (e = t.onlyTraceError) !== null && e !== void 0 ? e : !0,
        ignoreUrls: (r = t.ignoreUrls) !== null && r !== void 0 ? r : [],
        propagateTraceHeaderCorsUrls: (n = t.propagateTraceHeaderCorsUrls) !== null && n !== void 0 ? n : [],
        enableTraceUrls: (s = t.enableTraceUrls) !== null && s !== void 0 ? s : [],
        endpoints: {
            traces: t.endpoints.traces,
            logs: t.endpoints.logs
        },
        service: {
            name: t.service.name,
            version: t.service.version
        },
        tracer: {
            name: t.tracer.name
        },
        logger: {
            scopeName: Fa,
            scopeVersion: Va
        }
    }
}
function qa(t) {
    if (!t)
        throw new Error("telemetry not initialized.")
}
function Xa(t) {
    return ft = za(t),
    ft
}
function Nt() {
    return qa(ft),
    ft
}
function cu() {
    ft = null
}
function Ka(t) {
    switch (t) {
    case "TRACE":
        return 1;
    case "DEBUG":
        return 5;
    case "INFO":
        return 9;
    case "WARN":
        return 13;
    case "ERROR":
        return 17;
    case "FATAL":
        return 21;
    default:
        return 9
    }
}
function Wa(t) {
    return typeof t == "string" ? {
        stringValue: t
    } : typeof t == "boolean" ? {
        boolValue: t
    } : typeof t == "number" ? Number.isInteger(t) ? {
        intValue: t.toString()
    } : {
        doubleValue: t
    } : {
        stringValue: String(t)
    }
}
async function st(t) {
    var e;
    const {severity: r="INFO", message: n, attributes: s={}} = t
      , i = Nt()
      , o = "".concat(Date.now(), "000000");
    let a, u;
    const c = (e = t.span) !== null && e !== void 0 ? e : R.getSpan(A.active());
    if (c) {
        const p = c.spanContext();
        a = p.traceId,
        u = p.spanId
    }
    const f = Object.entries(s).map( ([p,m]) => ({
        key: p,
        value: Wa(m)
    }))
      , d = [{
        key: "service.name",
        value: {
            stringValue: i.service.name
        }
    }];
    i.service.version && d.push({
        key: "service.version",
        value: {
            stringValue: i.service.version
        }
    });
    const _ = {
        resourceLogs: [{
            resource: {
                attributes: d
            },
            scopeLogs: [{
                scope: {
                    name: i.logger.scopeName,
                    version: i.logger.scopeVersion
                },
                logRecords: [Object.assign({
                    timeUnixNano: o,
                    severityNumber: Ka(r),
                    severityText: r,
                    body: {
                        stringValue: typeof n == "string" ? n : JSON.stringify(n)
                    },
                    attributes: f
                }, a && u ? {
                    traceId: a,
                    spanId: u,
                    flags: 0
                } : {})]
            }]
        }]
    };
    try {
        await fetch(i.endpoints.logs, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(_),
            keepalive: !0
        })
    } catch (p) {}
}
function lu(t) {
    return st(t)
}
let Xe = !1;
function ce(t) {
    try {
        const e = new URL(t,typeof window < "u" ? window.location.href : void 0);
        return "".concat(e.origin).concat(e.pathname)
    } catch (e) {
        return t
    }
}
function Ya(t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
function Ot(t) {
    const e = ce(t);
    return new RegExp("^".concat(Ya(e), "(?:[?#].*)?$"))
}
function qr(t, e) {
    return (t.global || t.sticky) && (t.lastIndex = 0),
    t.test(e)
}
function Qa(t, e) {
    return e instanceof RegExp ? qr(e, t) : ce(t) === ce(e)
}
function Ja(t, e) {
    return e.some(r => Qa(t, r))
}
function Za(t) {
    var e, r, n;
    const s = (e = t.attributes) !== null && e !== void 0 ? e : {}
      , i = (n = (r = s["url.full"]) !== null && r !== void 0 ? r : s["http.url"]) !== null && n !== void 0 ? n : s["http.target"];
    if (!(typeof i != "string" || i.length === 0))
        return i
}
function Xr(t) {
    return [Ot(t.endpoints.traces), Ot(t.endpoints.logs)]
}
function tu(t) {
    const e = [...Xr(t)];
    if (t.enableTraceUrls.length === 0 && t.ignoreUrls.length > 0)
        for (const r of t.ignoreUrls)
            r instanceof RegExp ? e.push(r) : e.push(Ot(r));
    return e
}
function eu(t) {
    if (t.propagateTraceHeaderCorsUrls.length !== 0)
        return t.propagateTraceHeaderCorsUrls.map(e => e instanceof RegExp ? e : Ot(e))
}
function ru(t) {
    var e, r, n;
    if (((e = t.status) === null || e === void 0 ? void 0 : e.code) === C.ERROR)
        return !0;
    const s = (r = t.attributes) !== null && r !== void 0 ? r : {};
    if (s.error === !0)
        return !0;
    const i = (n = s["http.response.status_code"]) !== null && n !== void 0 ? n : s["http.status_code"];
    if (typeof i == "number" && i >= 400)
        return !0;
    if (typeof i == "string") {
        const o = Number(i);
        if (Number.isFinite(o) && o >= 400)
            return !0
    }
    return !!(Array.isArray(t.events) && t.events.some(o => o.name === "exception"))
}
class nu {
    constructor(e) {
        this.delegate = e
    }
    onStart(e, r) {
        this.delegate.onStart(e, r)
    }
    onEnd(e) {
        ru(e) && this.delegate.onEnd(e)
    }
    shutdown() {
        return this.delegate.shutdown()
    }
    forceFlush() {
        return this.delegate.forceFlush()
    }
}
class su {
    constructor(e, r, n) {
        this.delegate = e,
        this.allowlist = r,
        this.endpointIgnores = n
    }
    onStart(e, r) {
        this.delegate.onStart(e, r)
    }
    onEnd(e) {
        const r = Za(e);
        if (!r) {
            this.delegate.onEnd(e);
            return
        }
        this.endpointIgnores.some(n => qr(n, r)) || Ja(r, this.allowlist) && this.delegate.onEnd(e)
    }
    shutdown() {
        return this.delegate.shutdown()
    }
    forceFlush() {
        return this.delegate.forceFlush()
    }
}
function iu(t) {
    if (typeof t == "string" || typeof t == "number" || typeof t == "boolean")
        return t;
    if (Array.isArray(t)) {
        const e = t.filter(r => typeof r == "string" || typeof r == "number" || typeof r == "boolean");
        if (e.length > 0)
            return e
    }
    try {
        return typeof t > "u" ? "undefined" : JSON.stringify(t)
    } catch (e) {
        return String(t)
    }
}
function ou(t, e) {
    for (const [r,n] of Object.entries(e))
        t.setAttribute(r, iu(n))
}
function fu(t) {
    if (Xe)
        return;
    Xe = !0,
    t && Xa(t);
    const e = Nt()
      , r = Xr(e)
      , n = tu(e)
      , s = eu(e)
      , i = new Bo({
        url: e.endpoints.traces,
        compression: ne.GZIP
    });
    let a = new Ai(i);
    e.enableTraceUrls.length > 0 && (a = new su(a,e.enableTraceUrls,r)),
    e.onlyTraceError && (a = new nu(a)),
    new xi({
        spanProcessors: [a],
        resource: yr(Object.assign({
            "service.name": e.service.name
        }, e.service.version ? {
            "service.version": e.service.version
        } : {}))
    }).register(),
    zo({
        instrumentations: [new ba({
            ignoreUrls: n,
            propagateTraceHeaderCorsUrls: s,
            clearTimingResources: !0,
            semconvStabilityOptIn: "http",
            applyCustomAttributesOnSpan(c, f, d) {
                c.setAttribute("component", "fetch");
                const _ = c.attributes || c._attributes || {}
                  , p = typeof f != "string" && "method"in f && f.method ? f.method : "GET"
                  , m = typeof f == "string" ? f : "url"in f && f.url || "responseURL"in f && f.responseURL || _["url.full"] || _["http.url"] || "";
                if (c.setAttribute("http.request.method", p),
                typeof Response < "u" && d instanceof Response) {
                    const T = d.status;
                    if (c.setAttribute("http.response.status_code", T),
                    !d.ok) {
                        const h = d.statusText || "HTTP ".concat(d.status.toString());
                        c.setStatus({
                            code: C.ERROR,
                            message: h
                        });
                        const g = new Error(h);
                        c.recordException(g),
                        c.setAttribute("error", !0),
                        c.setAttribute("error.message", h),
                        g.stack && c.setAttribute("error.stack", g.stack);
                        const y = {
                            error: g.message,
                            stack: g.stack
                        };
                        st({
                            severity: "ERROR",
                            message: Object.assign({
                                message: "Fetch request failed: ".concat(p, " ").concat(m, " - ").concat(h)
                            }, y),
                            attributes: Object.assign(Object.assign({}, _), {
                                "http.request.method": p,
                                "http.response.status_code": T
                            })
                        })
                    }
                }
                if (d instanceof Error) {
                    c.setStatus({
                        code: C.ERROR,
                        message: d.message
                    }),
                    c.recordException(d),
                    c.setAttribute("error", !0),
                    c.setAttribute("error.message", d.message),
                    d.stack && c.setAttribute("error.stack", d.stack);
                    const T = {
                        error: d.message,
                        stack: d.stack
                    };
                    st({
                        span: c,
                        severity: "ERROR",
                        message: Object.assign({
                            message: "Fetch network error: ".concat(p, " ").concat(m)
                        }, T),
                        attributes: Object.assign(Object.assign({}, _), {
                            "http.request.method": p
                        })
                    })
                }
            }
        }), new Ga({
            ignoreUrls: n,
            propagateTraceHeaderCorsUrls: s,
            clearTimingResources: !0,
            semconvStabilityOptIn: "http",
            applyCustomAttributesOnSpan(c, f) {
                c.setAttribute("user_agent.original", navigator.userAgent),
                c.setAttribute("component", "xml-http-request");
                const d = c.attributes || c._attributes || {}
                  , _ = c != null && c.name && typeof c.name == "string" ? c.name : "GET"
                  , p = (f == null ? void 0 : f.responseURL) || d["url.full"] || d["http.url"] || "";
                c.setAttribute("http.request.method", _);
                const m = f.status;
                if (typeof m == "number" && c.setAttribute("http.response.status_code", m),
                m >= 400 || m === 0) {
                    const T = f.statusText || (m === 0 ? "Network error" : "HTTP ".concat(m.toString()));
                    c.setStatus({
                        code: C.ERROR,
                        message: T
                    });
                    const h = new Error(T);
                    c.recordException(h),
                    c.setAttribute("error", !0),
                    c.setAttribute("error.message", T),
                    h.stack && c.setAttribute("error.stack", h.stack);
                    const g = {
                        error: h.message,
                        stack: h.stack
                    };
                    st({
                        span: c,
                        severity: "ERROR",
                        message: Object.assign({
                            message: "Request failed: ".concat(_, " ").concat(p, " - ").concat(T)
                        }, g),
                        attributes: Object.assign(Object.assign({}, d), {
                            "http.request.method": _,
                            "http.response.status_code": m
                        })
                    })
                }
            }
        })]
    })
}
function du(t) {
    var e;
    const {spanName: r, severity: n, message: s} = t
      , i = (e = t.attributes) !== null && e !== void 0 ? e : {}
      , a = R.getTracer(Nt().tracer.name).startSpan(r);
    ou(a, i);
    let u = Object.assign({}, i);
    if (n === "ERROR") {
        const c = s instanceof Error ? s : new Error(typeof s == "string" ? s : JSON.stringify(s))
          , f = c.message
          , d = c.name;
        a.setAttribute("error.type", d),
        a.setAttribute("error.message", f),
        a.setStatus({
            code: C.ERROR,
            message: f
        }),
        a.recordException(c),
        u = Object.assign(Object.assign({}, u), {
            "error.type": d,
            "error.message": f
        })
    }
    a.end(),
    st({
        severity: n,
        message: s,
        attributes: u,
        span: a
    })
}
function pu() {
    const t = R.getTracer(Nt().tracer.name);
    window.addEventListener("error", e => {
        var r;
        const n = t.startSpan("window.error");
        n.setStatus({
            code: C.ERROR,
            message: e.message
        }),
        n.recordException((r = e.error) !== null && r !== void 0 ? r : e.message),
        n.end()
    }
    ),
    window.addEventListener("unhandledrejection", e => {
        var r;
        const n = (r = e.reason) !== null && r !== void 0 ? r : "unhandledrejection"
          , s = t.startSpan("window.unhandledrejection");
        s.setStatus({
            code: C.ERROR,
            message: n instanceof Error ? n.message : String(n)
        }),
        s.recordException(n),
        s.end()
    }
    )
}
export {st as exportOtlpLog, Nt as getOtelWebConfig, Xa as initOtelWeb, lu as logger, pu as registerGlobalErrorHandlers, cu as resetOtelWebConfig, fu as setupOpenTelemetry, du as traceLogger};
