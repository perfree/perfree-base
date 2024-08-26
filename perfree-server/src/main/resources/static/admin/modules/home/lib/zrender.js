var Gf = /* @__PURE__ */ function() {
  function r() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return r;
}(), Xf = /* @__PURE__ */ function() {
  function r() {
    this.browser = new Gf(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
  }
  return r;
}(), U = new Xf();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (U.wxa = !0, U.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? U.worker = !0 : typeof navigator > "u" || navigator.userAgent.indexOf("Node.js") === 0 ? (U.node = !0, U.svgSupported = !0) : Uf(navigator.userAgent, U);
function Uf(r, t) {
  var e = t.browser, i = r.match(/Firefox\/([\d.]+)/), n = r.match(/MSIE\s([\d.]+)/) || r.match(/Trident\/.+?rv:(([\d.]+))/), a = r.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(r);
  i && (e.firefox = !0, e.version = i[1]), n && (e.ie = !0, e.version = n[1]), a && (e.edge = !0, e.version = a[1], e.newEdge = +a[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document < "u";
  var s = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in s || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var ha = 12, _s = "sans-serif", Jt = ha + "px " + _s, $f = 20, Wf = 100, qf = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function Vf(r) {
  var t = {};
  if (typeof JSON > "u")
    return t;
  for (var e = 0; e < r.length; e++) {
    var i = String.fromCharCode(e + 32), n = (r.charCodeAt(e) - $f) / Wf;
    t[i] = n;
  }
  return t;
}
var Zf = Vf(qf), Li = {
  createCanvas: function() {
    return typeof document < "u" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var r, t;
    return function(e, i) {
      if (!r) {
        var n = Li.createCanvas();
        r = n && n.getContext("2d");
      }
      if (r)
        return t !== i && (t = r.font = i || Jt), r.measureText(e);
      e = e || "", i = i || Jt;
      var a = /((?:\d+)?\.?\d*)px/.exec(i), o = a && +a[1] || ha, s = 0;
      if (i.indexOf("mono") >= 0)
        s = o * e.length;
      else
        for (var f = 0; f < e.length; f++) {
          var h = Zf[e[f]];
          s += h == null ? o : h * o;
        }
      return { width: s };
    };
  }(),
  loadImage: function(r, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = r, i;
  }
}, gs = Ri([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(r, t) {
  return r["[object " + t + "]"] = !0, r;
}, {}), ys = Ri([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(r, t) {
  return r["[object " + t + "Array]"] = !0, r;
}, {}), jr = Object.prototype.toString, xi = Array.prototype, Qf = xi.forEach, Kf = xi.filter, ua = xi.slice, Jf = xi.map, Ra = (function() {
}).constructor, He = Ra ? Ra.prototype : null, va = "__proto__", jf = 2311;
function ms() {
  return jf++;
}
function Ut() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  typeof console < "u" && console.error.apply(console, r);
}
function Lr(r) {
  if (r == null || typeof r != "object")
    return r;
  var t = r, e = jr.call(r);
  if (e === "[object Array]") {
    if (!ye(r)) {
      t = [];
      for (var i = 0, n = r.length; i < n; i++)
        t[i] = Lr(r[i]);
    }
  } else if (ys[e]) {
    if (!ye(r)) {
      var a = r.constructor;
      if (a.from)
        t = a.from(r);
      else {
        t = new a(r.length);
        for (var i = 0, n = r.length; i < n; i++)
          t[i] = r[i];
      }
    }
  } else if (!gs[e] && !ye(r) && !Dn(r)) {
    t = {};
    for (var o in r)
      r.hasOwnProperty(o) && o !== va && (t[o] = Lr(r[o]));
  }
  return t;
}
function Nr(r, t, e) {
  if (!Xt(t) || !Xt(r))
    return e ? Lr(t) : r;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== va) {
      var n = r[i], a = t[i];
      Xt(a) && Xt(n) && !Kr(a) && !Kr(n) && !Dn(a) && !Dn(n) && !Da(a) && !Da(n) && !ye(a) && !ye(n) ? Nr(n, a, e) : (e || !(i in r)) && (r[i] = Lr(t[i]));
    }
  return r;
}
function Dc(r, t) {
  for (var e = r[0], i = 1, n = r.length; i < n; i++)
    e = Nr(e, r[i], t);
  return e;
}
function H(r, t) {
  if (Object.assign)
    Object.assign(r, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== va && (r[e] = t[e]);
  return r;
}
function Tt(r, t, e) {
  for (var i = G(t), n = 0; n < i.length; n++) {
    var a = i[n];
    (e ? t[a] != null : r[a] == null) && (r[a] = t[a]);
  }
  return r;
}
function It(r, t) {
  if (r) {
    if (r.indexOf)
      return r.indexOf(t);
    for (var e = 0, i = r.length; e < i; e++)
      if (r[e] === t)
        return e;
  }
  return -1;
}
function Ac(r, t) {
  var e = r.prototype;
  function i() {
  }
  i.prototype = t.prototype, r.prototype = new i();
  for (var n in e)
    e.hasOwnProperty(n) && (r.prototype[n] = e[n]);
  r.prototype.constructor = r, r.superClass = t;
}
function ws(r, t, e) {
  if (r = "prototype" in r ? r.prototype : r, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
      var a = i[n];
      a !== "constructor" && (e ? t[a] != null : r[a] == null) && (r[a] = t[a]);
    }
  else
    Tt(r, t, e);
}
function Ft(r) {
  return !r || typeof r == "string" ? !1 : typeof r.length == "number";
}
function at(r, t, e) {
  if (r && t)
    if (r.forEach && r.forEach === Qf)
      r.forEach(t, e);
    else if (r.length === +r.length)
      for (var i = 0, n = r.length; i < n; i++)
        t.call(e, r[i], i, r);
    else
      for (var a in r)
        r.hasOwnProperty(a) && t.call(e, r[a], a, r);
}
function V(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return Ts(r);
  if (r.map && r.map === Jf)
    return r.map(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    i.push(t.call(e, r[n], n, r));
  return i;
}
function Ri(r, t, e, i) {
  if (r && t) {
    for (var n = 0, a = r.length; n < a; n++)
      e = t.call(i, e, r[n], n, r);
    return e;
  }
}
function Rn(r, t, e) {
  if (!r)
    return [];
  if (!t)
    return Ts(r);
  if (r.filter && r.filter === Kf)
    return r.filter(t, e);
  for (var i = [], n = 0, a = r.length; n < a; n++)
    t.call(e, r[n], n, r) && i.push(r[n]);
  return i;
}
function Ec(r, t, e) {
  if (r && t) {
    for (var i = 0, n = r.length; i < n; i++)
      if (t.call(e, r[i], i, r))
        return r[i];
  }
}
function G(r) {
  if (!r)
    return [];
  if (Object.keys)
    return Object.keys(r);
  var t = [];
  for (var e in r)
    r.hasOwnProperty(e) && t.push(e);
  return t;
}
function th(r, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return r.apply(t, e.concat(ua.call(arguments)));
  };
}
var Ic = He && Ee(He.bind) ? He.call.bind(He.bind) : th;
function Oc(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return function() {
    return r.apply(this, t.concat(ua.call(arguments)));
  };
}
function Kr(r) {
  return Array.isArray ? Array.isArray(r) : jr.call(r) === "[object Array]";
}
function Ee(r) {
  return typeof r == "function";
}
function Bt(r) {
  return typeof r == "string";
}
function Fc(r) {
  return jr.call(r) === "[object String]";
}
function ge(r) {
  return typeof r == "number";
}
function Xt(r) {
  var t = typeof r;
  return t === "function" || !!r && t === "object";
}
function Da(r) {
  return !!gs[jr.call(r)];
}
function rh(r) {
  return !!ys[jr.call(r)];
}
function Dn(r) {
  return typeof r == "object" && typeof r.nodeType == "number" && typeof r.ownerDocument == "object";
}
function Di(r) {
  return r.colorStops != null;
}
function eh(r) {
  return r.image != null;
}
function Bc(r) {
  return jr.call(r) === "[object RegExp]";
}
function ih(r) {
  return r !== r;
}
function kc() {
  for (var r = [], t = 0; t < arguments.length; t++)
    r[t] = arguments[t];
  for (var e = 0, i = r.length; e < i; e++)
    if (r[e] != null)
      return r[e];
}
function W(r, t) {
  return r ?? t;
}
function ai(r, t, e) {
  return r ?? t ?? e;
}
function Ts(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return ua.apply(r, t);
}
function nh(r) {
  if (typeof r == "number")
    return [r, r, r, r];
  var t = r.length;
  return t === 2 ? [r[0], r[1], r[0], r[1]] : t === 3 ? [r[0], r[1], r[2], r[1]] : r;
}
function Aa(r, t) {
  if (!r)
    throw new Error(t);
}
function Yr(r) {
  return r == null ? null : typeof r.trim == "function" ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var bs = "__ec_primitive__";
function Hc(r) {
  r[bs] = !0;
}
function ye(r) {
  return r[bs];
}
var ah = function() {
  function r() {
    this.data = {};
  }
  return r.prototype.delete = function(t) {
    var e = this.has(t);
    return e && delete this.data[t], e;
  }, r.prototype.has = function(t) {
    return this.data.hasOwnProperty(t);
  }, r.prototype.get = function(t) {
    return this.data[t];
  }, r.prototype.set = function(t, e) {
    return this.data[t] = e, this;
  }, r.prototype.keys = function() {
    return G(this.data);
  }, r.prototype.forEach = function(t) {
    var e = this.data;
    for (var i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }, r;
}(), Ss = typeof Map == "function";
function oh() {
  return Ss ? /* @__PURE__ */ new Map() : new ah();
}
var sh = function() {
  function r(t) {
    var e = Kr(t);
    this.data = oh();
    var i = this;
    t instanceof r ? t.each(n) : t && at(t, n);
    function n(a, o) {
      e ? i.set(a, o) : i.set(o, a);
    }
  }
  return r.prototype.hasKey = function(t) {
    return this.data.has(t);
  }, r.prototype.get = function(t) {
    return this.data.get(t);
  }, r.prototype.set = function(t, e) {
    return this.data.set(t, e), e;
  }, r.prototype.each = function(t, e) {
    this.data.forEach(function(i, n) {
      t.call(e, i, n);
    });
  }, r.prototype.keys = function() {
    var t = this.data.keys();
    return Ss ? Array.from(t) : t;
  }, r.prototype.removeKey = function(t) {
    this.data.delete(t);
  }, r;
}();
function zc(r) {
  return new sh(r);
}
function Nc(r, t) {
  for (var e = new r.constructor(r.length + t.length), i = 0; i < r.length; i++)
    e[i] = r[i];
  for (var n = r.length, i = 0; i < t.length; i++)
    e[i + n] = t[i];
  return e;
}
function Ai(r, t) {
  var e;
  if (Object.create)
    e = Object.create(r);
  else {
    var i = function() {
    };
    i.prototype = r, e = new i();
  }
  return t && H(e, t), e;
}
function Cs(r) {
  var t = r.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function vi(r, t) {
  return r.hasOwnProperty(t);
}
function Sr() {
}
var oi = 180 / Math.PI;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var An = function(r, t) {
  return An = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, An(r, t);
};
function z(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  An(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function te(r, t) {
  return r == null && (r = 0), t == null && (t = 0), [r, t];
}
function Yc(r, t) {
  return r[0] = t[0], r[1] = t[1], r;
}
function fh(r) {
  return [r[0], r[1]];
}
function Gc(r, t, e) {
  return r[0] = t, r[1] = e, r;
}
function Ea(r, t, e) {
  return r[0] = t[0] + e[0], r[1] = t[1] + e[1], r;
}
function Xc(r, t, e, i) {
  return r[0] = t[0] + e[0] * i, r[1] = t[1] + e[1] * i, r;
}
function hh(r, t, e) {
  return r[0] = t[0] - e[0], r[1] = t[1] - e[1], r;
}
function uh(r) {
  return Math.sqrt(vh(r));
}
function vh(r) {
  return r[0] * r[0] + r[1] * r[1];
}
function Yi(r, t, e) {
  return r[0] = t[0] * e, r[1] = t[1] * e, r;
}
function lh(r, t) {
  var e = uh(t);
  return e === 0 ? (r[0] = 0, r[1] = 0) : (r[0] = t[0] / e, r[1] = t[1] / e), r;
}
function En(r, t) {
  return Math.sqrt((r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]));
}
var ch = En;
function dh(r, t) {
  return (r[0] - t[0]) * (r[0] - t[0]) + (r[1] - t[1]) * (r[1] - t[1]);
}
var Zr = dh;
function ph(r, t, e, i) {
  return r[0] = t[0] + i * (e[0] - t[0]), r[1] = t[1] + i * (e[1] - t[1]), r;
}
function me(r, t, e) {
  var i = t[0], n = t[1];
  return r[0] = e[0] * i + e[2] * n + e[4], r[1] = e[1] * i + e[3] * n + e[5], r;
}
function Gr(r, t, e) {
  return r[0] = Math.min(t[0], e[0]), r[1] = Math.min(t[1], e[1]), r;
}
function Xr(r, t, e) {
  return r[0] = Math.max(t[0], e[0]), r[1] = Math.max(t[1], e[1]), r;
}
var xr = /* @__PURE__ */ function() {
  function r(t, e) {
    this.target = t, this.topTarget = e && e.topTarget;
  }
  return r;
}(), _h = function() {
  function r(t) {
    this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), t.on("mouseup", this._dragEnd, this);
  }
  return r.prototype._dragStart = function(t) {
    for (var e = t.target; e && !e.draggable; )
      e = e.parent || e.__hostTarget;
    e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.handler.dispatchToElement(new xr(e, t), "dragstart", t.event));
  }, r.prototype._drag = function(t) {
    var e = this._draggingTarget;
    if (e) {
      var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
      this._x = i, this._y = n, e.drift(a, o, t), this.handler.dispatchToElement(new xr(e, t), "drag", t.event);
      var s = this.handler.findHover(i, n, e).target, f = this._dropTarget;
      this._dropTarget = s, e !== s && (f && s !== f && this.handler.dispatchToElement(new xr(f, t), "dragleave", t.event), s && s !== f && this.handler.dispatchToElement(new xr(s, t), "dragenter", t.event));
    }
  }, r.prototype._dragEnd = function(t) {
    var e = this._draggingTarget;
    e && (e.dragging = !1), this.handler.dispatchToElement(new xr(e, t), "dragend", t.event), this._dropTarget && this.handler.dispatchToElement(new xr(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null;
  }, r;
}(), re = function() {
  function r(t) {
    t && (this._$eventProcessor = t);
  }
  return r.prototype.on = function(t, e, i, n) {
    this._$handlers || (this._$handlers = {});
    var a = this._$handlers;
    if (typeof e == "function" && (n = i, i = e, e = null), !i || !t)
      return this;
    var o = this._$eventProcessor;
    e != null && o && o.normalizeQuery && (e = o.normalizeQuery(e)), a[t] || (a[t] = []);
    for (var s = 0; s < a[t].length; s++)
      if (a[t][s].h === i)
        return this;
    var f = {
      h: i,
      query: e,
      ctx: n || this,
      callAtLast: i.zrEventfulCallAtLast
    }, h = a[t].length - 1, u = a[t][h];
    return u && u.callAtLast ? a[t].splice(h, 0, f) : a[t].push(f), this;
  }, r.prototype.isSilent = function(t) {
    var e = this._$handlers;
    return !e || !e[t] || !e[t].length;
  }, r.prototype.off = function(t, e) {
    var i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (e) {
      if (i[t]) {
        for (var n = [], a = 0, o = i[t].length; a < o; a++)
          i[t][a].h !== e && n.push(i[t][a]);
        i[t] = n;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }, r.prototype.trigger = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = n.length, f = 0; f < s; f++) {
        var h = n[f];
        if (!(a && a.filter && h.query != null && !a.filter(t, h.query)))
          switch (o) {
            case 0:
              h.h.call(h.ctx);
              break;
            case 1:
              h.h.call(h.ctx, e[0]);
              break;
            case 2:
              h.h.call(h.ctx, e[0], e[1]);
              break;
            default:
              h.h.apply(h.ctx, e);
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r.prototype.triggerWithContext = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var n = this._$handlers[t], a = this._$eventProcessor;
    if (n)
      for (var o = e.length, s = e[o - 1], f = n.length, h = 0; h < f; h++) {
        var u = n[h];
        if (!(a && a.filter && u.query != null && !a.filter(t, u.query)))
          switch (o) {
            case 0:
              u.h.call(s);
              break;
            case 1:
              u.h.call(s, e[0]);
              break;
            case 2:
              u.h.call(s, e[0], e[1]);
              break;
            default:
              u.h.apply(s, e.slice(1, o - 1));
              break;
          }
      }
    return a && a.afterTrigger && a.afterTrigger(t), this;
  }, r;
}(), gh = Math.log(2);
function In(r, t, e, i, n, a) {
  var o = i + "-" + n, s = r.length;
  if (a.hasOwnProperty(o))
    return a[o];
  if (t === 1) {
    var f = Math.round(Math.log((1 << s) - 1 & ~n) / gh);
    return r[e][f];
  }
  for (var h = i | 1 << e, u = e + 1; i & 1 << u; )
    u++;
  for (var v = 0, l = 0, c = 0; l < s; l++) {
    var p = 1 << l;
    p & n || (v += (c % 2 ? -1 : 1) * r[e][l] * In(r, t - 1, u, h, n | p, a), c++);
  }
  return a[o] = v, v;
}
function Ia(r, t) {
  var e = [
    [r[0], r[1], 1, 0, 0, 0, -t[0] * r[0], -t[0] * r[1]],
    [0, 0, 0, r[0], r[1], 1, -t[1] * r[0], -t[1] * r[1]],
    [r[2], r[3], 1, 0, 0, 0, -t[2] * r[2], -t[2] * r[3]],
    [0, 0, 0, r[2], r[3], 1, -t[3] * r[2], -t[3] * r[3]],
    [r[4], r[5], 1, 0, 0, 0, -t[4] * r[4], -t[4] * r[5]],
    [0, 0, 0, r[4], r[5], 1, -t[5] * r[4], -t[5] * r[5]],
    [r[6], r[7], 1, 0, 0, 0, -t[6] * r[6], -t[6] * r[7]],
    [0, 0, 0, r[6], r[7], 1, -t[7] * r[6], -t[7] * r[7]]
  ], i = {}, n = In(e, 8, 0, 0, 0, i);
  if (n !== 0) {
    for (var a = [], o = 0; o < 8; o++)
      for (var s = 0; s < 8; s++)
        a[s] == null && (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * In(e, 7, o === 0 ? 1 : 0, 1 << o, 1 << s, i) / n * t[o];
    return function(f, h, u) {
      var v = h * a[6] + u * a[7] + 1;
      f[0] = (h * a[0] + u * a[1] + a[2]) / v, f[1] = (h * a[3] + u * a[4] + a[5]) / v;
    };
  }
}
var Oa = "___zrEVENTSAVED", Gi = [];
function Uc(r, t, e, i, n) {
  return On(Gi, t, i, n, !0) && On(r, e, Gi[0], Gi[1]);
}
function On(r, t, e, i, n) {
  if (t.getBoundingClientRect && U.domSupported && !Ms(t)) {
    var a = t[Oa] || (t[Oa] = {}), o = yh(t, a), s = mh(o, a, n);
    if (s)
      return s(r, e, i), !0;
  }
  return !1;
}
function yh(r, t) {
  var e = t.markers;
  if (e)
    return e;
  e = t.markers = [];
  for (var i = ["left", "right"], n = ["top", "bottom"], a = 0; a < 4; a++) {
    var o = document.createElement("div"), s = o.style, f = a % 2, h = (a >> 1) % 2;
    s.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      i[f] + ":0",
      n[h] + ":0",
      i[1 - f] + ":auto",
      n[1 - h] + ":auto",
      ""
    ].join("!important;"), r.appendChild(o), e.push(o);
  }
  return e;
}
function mh(r, t, e) {
  for (var i = e ? "invTrans" : "trans", n = t[i], a = t.srcCoords, o = [], s = [], f = !0, h = 0; h < 4; h++) {
    var u = r[h].getBoundingClientRect(), v = 2 * h, l = u.left, c = u.top;
    o.push(l, c), f = f && a && l === a[v] && c === a[v + 1], s.push(r[h].offsetLeft, r[h].offsetTop);
  }
  return f && n ? n : (t.srcCoords = o, t[i] = e ? Ia(s, o) : Ia(o, s));
}
function Ms(r) {
  return r.nodeName.toUpperCase() === "CANVAS";
}
var wh = /([&<>"'])/g, Th = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function bh(r) {
  return r == null ? "" : (r + "").replace(wh, function(t, e) {
    return Th[e];
  });
}
var Sh = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Xi = [], Ch = U.browser.firefox && +U.browser.version.split(".")[0] < 39;
function Fn(r, t, e, i) {
  return e = e || {}, i ? Fa(r, t, e) : Ch && t.layerX != null && t.layerX !== t.offsetX ? (e.zrX = t.layerX, e.zrY = t.layerY) : t.offsetX != null ? (e.zrX = t.offsetX, e.zrY = t.offsetY) : Fa(r, t, e), e;
}
function Fa(r, t, e) {
  if (U.domSupported && r.getBoundingClientRect) {
    var i = t.clientX, n = t.clientY;
    if (Ms(r)) {
      var a = r.getBoundingClientRect();
      e.zrX = i - a.left, e.zrY = n - a.top;
      return;
    } else if (On(Xi, r, i, n)) {
      e.zrX = Xi[0], e.zrY = Xi[1];
      return;
    }
  }
  e.zrX = e.zrY = 0;
}
function la(r) {
  return r || window.event;
}
function St(r, t, e) {
  if (t = la(t), t.zrX != null)
    return t;
  var i = t.type, n = i && i.indexOf("touch") >= 0;
  if (n) {
    var o = i !== "touchend" ? t.targetTouches[0] : t.changedTouches[0];
    o && Fn(r, o, t, e);
  } else {
    Fn(r, t, t, e);
    var a = Mh(t);
    t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
  }
  var s = t.button;
  return t.which == null && s !== void 0 && Sh.test(t.type) && (t.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), t;
}
function Mh(r) {
  var t = r.wheelDelta;
  if (t)
    return t;
  var e = r.deltaX, i = r.deltaY;
  if (e == null || i == null)
    return t;
  var n = Math.abs(i !== 0 ? i : e), a = i > 0 ? -1 : i < 0 ? 1 : e > 0 ? -1 : 1;
  return 3 * n * a;
}
function Ph(r, t, e, i) {
  r.addEventListener(t, e, i);
}
function Lh(r, t, e, i) {
  r.removeEventListener(t, e, i);
}
var xh = function(r) {
  r.preventDefault(), r.stopPropagation(), r.cancelBubble = !0;
};
function $c(r) {
  return r.which === 2 || r.which === 3;
}
var Rh = function() {
  function r() {
    this._track = [];
  }
  return r.prototype.recognize = function(t, e, i) {
    return this._doTrack(t, e, i), this._recognize(t);
  }, r.prototype.clear = function() {
    return this._track.length = 0, this;
  }, r.prototype._doTrack = function(t, e, i) {
    var n = t.touches;
    if (n) {
      for (var a = {
        points: [],
        touches: [],
        target: e,
        event: t
      }, o = 0, s = n.length; o < s; o++) {
        var f = n[o], h = Fn(i, f, {});
        a.points.push([h.zrX, h.zrY]), a.touches.push(f);
      }
      this._track.push(a);
    }
  }, r.prototype._recognize = function(t) {
    for (var e in Ui)
      if (Ui.hasOwnProperty(e)) {
        var i = Ui[e](this._track, t);
        if (i)
          return i;
      }
  }, r;
}();
function Ba(r) {
  var t = r[1][0] - r[0][0], e = r[1][1] - r[0][1];
  return Math.sqrt(t * t + e * e);
}
function Dh(r) {
  return [
    (r[0][0] + r[1][0]) / 2,
    (r[0][1] + r[1][1]) / 2
  ];
}
var Ui = {
  pinch: function(r, t) {
    var e = r.length;
    if (e) {
      var i = (r[e - 1] || {}).points, n = (r[e - 2] || {}).points || i;
      if (n && n.length > 1 && i && i.length > 1) {
        var a = Ba(i) / Ba(n);
        !isFinite(a) && (a = 1), t.pinchScale = a;
        var o = Dh(i);
        return t.pinchX = o[0], t.pinchY = o[1], {
          type: "pinch",
          target: r[0].target,
          event: t
        };
      }
    }
  }
};
function Cr() {
  return [1, 0, 0, 1, 0, 0];
}
function Ah(r) {
  return r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 1, r[4] = 0, r[5] = 0, r;
}
function Ps(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4], r[5] = t[5], r;
}
function we(r, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], n = t[1] * e[0] + t[3] * e[1], a = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], s = t[0] * e[4] + t[2] * e[5] + t[4], f = t[1] * e[4] + t[3] * e[5] + t[5];
  return r[0] = i, r[1] = n, r[2] = a, r[3] = o, r[4] = s, r[5] = f, r;
}
function Bn(r, t, e) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r[4] = t[4] + e[0], r[5] = t[5] + e[1], r;
}
function Ls(r, t, e, i) {
  i === void 0 && (i = [0, 0]);
  var n = t[0], a = t[2], o = t[4], s = t[1], f = t[3], h = t[5], u = Math.sin(e), v = Math.cos(e);
  return r[0] = n * v + s * u, r[1] = -n * u + s * v, r[2] = a * v + f * u, r[3] = -a * u + v * f, r[4] = v * (o - i[0]) + u * (h - i[1]) + i[0], r[5] = v * (h - i[1]) - u * (o - i[0]) + i[1], r;
}
function xs(r, t, e) {
  var i = e[0], n = e[1];
  return r[0] = t[0] * i, r[1] = t[1] * n, r[2] = t[2] * i, r[3] = t[3] * n, r[4] = t[4] * i, r[5] = t[5] * n, r;
}
function Eh(r, t) {
  var e = t[0], i = t[2], n = t[4], a = t[1], o = t[3], s = t[5], f = e * o - a * i;
  return f ? (f = 1 / f, r[0] = o * f, r[1] = -a * f, r[2] = -i * f, r[3] = e * f, r[4] = (i * s - o * n) * f, r[5] = (a * n - e * s) * f, r) : null;
}
function Wc(r) {
  var t = Cr();
  return Ps(t, r), t;
}
var F = function() {
  function r(t, e) {
    this.x = t || 0, this.y = e || 0;
  }
  return r.prototype.copy = function(t) {
    return this.x = t.x, this.y = t.y, this;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y);
  }, r.prototype.set = function(t, e) {
    return this.x = t, this.y = e, this;
  }, r.prototype.equal = function(t) {
    return t.x === this.x && t.y === this.y;
  }, r.prototype.add = function(t) {
    return this.x += t.x, this.y += t.y, this;
  }, r.prototype.scale = function(t) {
    this.x *= t, this.y *= t;
  }, r.prototype.scaleAndAdd = function(t, e) {
    this.x += t.x * e, this.y += t.y * e;
  }, r.prototype.sub = function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }, r.prototype.dot = function(t) {
    return this.x * t.x + this.y * t.y;
  }, r.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, r.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, r.prototype.normalize = function() {
    var t = this.len();
    return this.x /= t, this.y /= t, this;
  }, r.prototype.distance = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(e * e + i * i);
  }, r.prototype.distanceSquare = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return e * e + i * i;
  }, r.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, r.prototype.transform = function(t) {
    if (t) {
      var e = this.x, i = this.y;
      return this.x = t[0] * e + t[2] * i + t[4], this.y = t[1] * e + t[3] * i + t[5], this;
    }
  }, r.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, r.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.set = function(t, e, i) {
    t.x = e, t.y = i;
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y;
  }, r.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, r.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, r.dot = function(t, e) {
    return t.x * e.x + t.y * e.y;
  }, r.add = function(t, e, i) {
    t.x = e.x + i.x, t.y = e.y + i.y;
  }, r.sub = function(t, e, i) {
    t.x = e.x - i.x, t.y = e.y - i.y;
  }, r.scale = function(t, e, i) {
    t.x = e.x * i, t.y = e.y * i;
  }, r.scaleAndAdd = function(t, e, i, n) {
    t.x = e.x + i.x * n, t.y = e.y + i.y * n;
  }, r.lerp = function(t, e, i, n) {
    var a = 1 - n;
    t.x = a * e.x + n * i.x, t.y = a * e.y + n * i.y;
  }, r;
}(), ze = Math.min, Ne = Math.max, rr = new F(), er = new F(), ir = new F(), nr = new F(), ie = new F(), ne = new F(), X = function() {
  function r(t, e, i, n) {
    i < 0 && (t = t + i, i = -i), n < 0 && (e = e + n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n;
  }
  return r.prototype.union = function(t) {
    var e = ze(t.x, this.x), i = ze(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Ne(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Ne(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, r.prototype.applyTransform = function(t) {
    r.applyTransform(this, this, t);
  }, r.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, n = t.height / e.height, a = Cr();
    return Bn(a, a, [-e.x, -e.y]), xs(a, a, [i, n]), Bn(a, a, [t.x, t.y]), a;
  }, r.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof r || (t = r.create(t));
    var i = this, n = i.x, a = i.x + i.width, o = i.y, s = i.y + i.height, f = t.x, h = t.x + t.width, u = t.y, v = t.y + t.height, l = !(a < f || h < n || s < u || v < o);
    if (e) {
      var c = 1 / 0, p = 0, g = Math.abs(a - f), d = Math.abs(h - n), _ = Math.abs(s - u), y = Math.abs(v - o), m = Math.min(g, d), T = Math.min(_, y);
      a < f || h < n ? m > p && (p = m, g < d ? F.set(ne, -g, 0) : F.set(ne, d, 0)) : m < c && (c = m, g < d ? F.set(ie, g, 0) : F.set(ie, -d, 0)), s < u || v < o ? T > p && (p = T, _ < y ? F.set(ne, 0, -_) : F.set(ne, 0, y)) : m < c && (c = m, _ < y ? F.set(ie, 0, _) : F.set(ie, 0, -y));
    }
    return e && F.copy(e, l ? ie : ne), l;
  }, r.prototype.contain = function(t, e) {
    var i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }, r.prototype.clone = function() {
    return new r(this.x, this.y, this.width, this.height);
  }, r.prototype.copy = function(t) {
    r.copy(this, t);
  }, r.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, r.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, r.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, r.create = function(t) {
    return new r(t.x, t.y, t.width, t.height);
  }, r.copy = function(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }, r.applyTransform = function(t, e, i) {
    if (!i) {
      t !== e && r.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var n = i[0], a = i[3], o = i[4], s = i[5];
      t.x = e.x * n + o, t.y = e.y * a + s, t.width = e.width * n, t.height = e.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    rr.x = ir.x = e.x, rr.y = nr.y = e.y, er.x = nr.x = e.x + e.width, er.y = ir.y = e.y + e.height, rr.transform(i), nr.transform(i), er.transform(i), ir.transform(i), t.x = ze(rr.x, er.x, ir.x, nr.x), t.y = ze(rr.y, er.y, ir.y, nr.y);
    var f = Ne(rr.x, er.x, ir.x, nr.x), h = Ne(rr.y, er.y, ir.y, nr.y);
    t.width = f - t.x, t.height = h - t.y;
  }, r;
}(), Rs = "silent";
function Ih(r, t, e) {
  return {
    type: r,
    event: e,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: e.zrX,
    offsetY: e.zrY,
    gestureEvent: e.gestureEvent,
    pinchX: e.pinchX,
    pinchY: e.pinchY,
    pinchScale: e.pinchScale,
    wheelDelta: e.zrDelta,
    zrByTouch: e.zrByTouch,
    which: e.which,
    stop: Oh
  };
}
function Oh() {
  xh(this.event);
}
var Fh = function(r) {
  z(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.handler = null, e;
  }
  return t.prototype.dispose = function() {
  }, t.prototype.setCursor = function() {
  }, t;
}(re), ae = /* @__PURE__ */ function() {
  function r(t, e) {
    this.x = t, this.y = e;
  }
  return r;
}(), Bh = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
], $i = new X(0, 0, 0, 0), Ds = function(r) {
  z(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this) || this;
    return s._hovered = new ae(0, 0), s.storage = e, s.painter = i, s.painterRoot = a, s._pointerSize = o, n = n || new Fh(), s.proxy = null, s.setHandlerProxy(n), s._draggingMgr = new _h(s), s;
  }
  return t.prototype.setHandlerProxy = function(e) {
    this.proxy && this.proxy.dispose(), e && (at(Bh, function(i) {
      e.on && e.on(i, this[i], this);
    }, this), e.handler = this), this.proxy = e;
  }, t.prototype.mousemove = function(e) {
    var i = e.zrX, n = e.zrY, a = As(this, i, n), o = this._hovered, s = o.target;
    s && !s.__zr && (o = this.findHover(o.x, o.y), s = o.target);
    var f = this._hovered = a ? new ae(i, n) : this.findHover(i, n), h = f.target, u = this.proxy;
    u.setCursor && u.setCursor(h ? h.cursor : "default"), s && h !== s && this.dispatchToElement(o, "mouseout", e), this.dispatchToElement(f, "mousemove", e), h && h !== s && this.dispatchToElement(f, "mouseover", e);
  }, t.prototype.mouseout = function(e) {
    var i = e.zrEventControl;
    i !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), i !== "no_globalout" && this.trigger("globalout", { type: "globalout", event: e });
  }, t.prototype.resize = function() {
    this._hovered = new ae(0, 0);
  }, t.prototype.dispatch = function(e, i) {
    var n = this[e];
    n && n.call(this, i);
  }, t.prototype.dispose = function() {
    this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
  }, t.prototype.setCursorStyle = function(e) {
    var i = this.proxy;
    i.setCursor && i.setCursor(e);
  }, t.prototype.dispatchToElement = function(e, i, n) {
    e = e || {};
    var a = e.target;
    if (!(a && a.silent)) {
      for (var o = "on" + i, s = Ih(i, e, n); a && (a[o] && (s.cancelBubble = !!a[o].call(a, s)), a.trigger(i, s), a = a.__hostTarget ? a.__hostTarget : a.parent, !s.cancelBubble); )
        ;
      s.cancelBubble || (this.trigger(i, s), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(f) {
        typeof f[o] == "function" && f[o].call(f, s), f.trigger && f.trigger(i, s);
      }));
    }
  }, t.prototype.findHover = function(e, i, n) {
    var a = this.storage.getDisplayList(), o = new ae(e, i);
    if (ka(a, o, e, i, n), this._pointerSize && !o.target) {
      for (var s = [], f = this._pointerSize, h = f / 2, u = new X(e - h, i - h, f, f), v = a.length - 1; v >= 0; v--) {
        var l = a[v];
        l !== n && !l.ignore && !l.ignoreCoarsePointer && (!l.parent || !l.parent.ignoreCoarsePointer) && ($i.copy(l.getBoundingRect()), l.transform && $i.applyTransform(l.transform), $i.intersect(u) && s.push(l));
      }
      if (s.length)
        for (var c = 4, p = Math.PI / 12, g = Math.PI * 2, d = 0; d < h; d += c)
          for (var _ = 0; _ < g; _ += p) {
            var y = e + d * Math.cos(_), m = i + d * Math.sin(_);
            if (ka(s, o, y, m, n), o.target)
              return o;
          }
    }
    return o;
  }, t.prototype.processGesture = function(e, i) {
    this._gestureMgr || (this._gestureMgr = new Rh());
    var n = this._gestureMgr;
    i === "start" && n.clear();
    var a = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
    if (i === "end" && n.clear(), a) {
      var o = a.type;
      e.gestureEvent = o;
      var s = new ae();
      s.target = a.target, this.dispatchToElement(s, o, a.event);
    }
  }, t;
}(re);
at(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(r) {
  Ds.prototype[r] = function(t) {
    var e = t.zrX, i = t.zrY, n = As(this, e, i), a, o;
    if ((r !== "mouseup" || !n) && (a = this.findHover(e, i), o = a.target), r === "mousedown")
      this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
    else if (r === "mouseup")
      this._upEl = o;
    else if (r === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || ch(this._downPoint, [t.zrX, t.zrY]) > 4)
        return;
      this._downPoint = null;
    }
    this.dispatchToElement(a, r, t);
  };
});
function kh(r, t, e) {
  if (r[r.rectHover ? "rectContain" : "contain"](t, e)) {
    for (var i = r, n = void 0, a = !1; i; ) {
      if (i.ignoreClip && (a = !0), !a) {
        var o = i.getClipPath();
        if (o && !o.contain(t, e))
          return !1;
      }
      i.silent && (n = !0);
      var s = i.__hostTarget;
      i = s || i.parent;
    }
    return n ? Rs : !0;
  }
  return !1;
}
function ka(r, t, e, i, n) {
  for (var a = r.length - 1; a >= 0; a--) {
    var o = r[a], s = void 0;
    if (o !== n && !o.ignore && (s = kh(o, e, i)) && (!t.topTarget && (t.topTarget = o), s !== Rs)) {
      t.target = o;
      break;
    }
  }
}
function As(r, t, e) {
  var i = r.painter;
  return t < 0 || t > i.getWidth() || e < 0 || e > i.getHeight();
}
var Es = 32, oe = 7;
function Hh(r) {
  for (var t = 0; r >= Es; )
    t |= r & 1, r >>= 1;
  return r + t;
}
function Ha(r, t, e, i) {
  var n = t + 1;
  if (n === e)
    return 1;
  if (i(r[n++], r[t]) < 0) {
    for (; n < e && i(r[n], r[n - 1]) < 0; )
      n++;
    zh(r, t, n);
  } else
    for (; n < e && i(r[n], r[n - 1]) >= 0; )
      n++;
  return n - t;
}
function zh(r, t, e) {
  for (e--; t < e; ) {
    var i = r[t];
    r[t++] = r[e], r[e--] = i;
  }
}
function za(r, t, e, i, n) {
  for (i === t && i++; i < e; i++) {
    for (var a = r[i], o = t, s = i, f; o < s; )
      f = o + s >>> 1, n(a, r[f]) < 0 ? s = f : o = f + 1;
    var h = i - o;
    switch (h) {
      case 3:
        r[o + 3] = r[o + 2];
      case 2:
        r[o + 2] = r[o + 1];
      case 1:
        r[o + 1] = r[o];
        break;
      default:
        for (; h > 0; )
          r[o + h] = r[o + h - 1], h--;
    }
    r[o] = a;
  }
}
function Wi(r, t, e, i, n, a) {
  var o = 0, s = 0, f = 1;
  if (a(r, t[e + n]) > 0) {
    for (s = i - n; f < s && a(r, t[e + n + f]) > 0; )
      o = f, f = (f << 1) + 1, f <= 0 && (f = s);
    f > s && (f = s), o += n, f += n;
  } else {
    for (s = n + 1; f < s && a(r, t[e + n - f]) <= 0; )
      o = f, f = (f << 1) + 1, f <= 0 && (f = s);
    f > s && (f = s);
    var h = o;
    o = n - f, f = n - h;
  }
  for (o++; o < f; ) {
    var u = o + (f - o >>> 1);
    a(r, t[e + u]) > 0 ? o = u + 1 : f = u;
  }
  return f;
}
function qi(r, t, e, i, n, a) {
  var o = 0, s = 0, f = 1;
  if (a(r, t[e + n]) < 0) {
    for (s = n + 1; f < s && a(r, t[e + n - f]) < 0; )
      o = f, f = (f << 1) + 1, f <= 0 && (f = s);
    f > s && (f = s);
    var h = o;
    o = n - f, f = n - h;
  } else {
    for (s = i - n; f < s && a(r, t[e + n + f]) >= 0; )
      o = f, f = (f << 1) + 1, f <= 0 && (f = s);
    f > s && (f = s), o += n, f += n;
  }
  for (o++; o < f; ) {
    var u = o + (f - o >>> 1);
    a(r, t[e + u]) < 0 ? f = u : o = u + 1;
  }
  return f;
}
function Nh(r, t) {
  var e = oe, i, n, a = 0, o = [];
  i = [], n = [];
  function s(c, p) {
    i[a] = c, n[a] = p, a += 1;
  }
  function f() {
    for (; a > 1; ) {
      var c = a - 2;
      if (c >= 1 && n[c - 1] <= n[c] + n[c + 1] || c >= 2 && n[c - 2] <= n[c] + n[c - 1])
        n[c - 1] < n[c + 1] && c--;
      else if (n[c] > n[c + 1])
        break;
      u(c);
    }
  }
  function h() {
    for (; a > 1; ) {
      var c = a - 2;
      c > 0 && n[c - 1] < n[c + 1] && c--, u(c);
    }
  }
  function u(c) {
    var p = i[c], g = n[c], d = i[c + 1], _ = n[c + 1];
    n[c] = g + _, c === a - 3 && (i[c + 1] = i[c + 2], n[c + 1] = n[c + 2]), a--;
    var y = qi(r[d], r, p, g, 0, t);
    p += y, g -= y, g !== 0 && (_ = Wi(r[p + g - 1], r, d, _, _ - 1, t), _ !== 0 && (g <= _ ? v(p, g, d, _) : l(p, g, d, _)));
  }
  function v(c, p, g, d) {
    var _ = 0;
    for (_ = 0; _ < p; _++)
      o[_] = r[c + _];
    var y = 0, m = g, T = c;
    if (r[T++] = r[m++], --d === 0) {
      for (_ = 0; _ < p; _++)
        r[T + _] = o[y + _];
      return;
    }
    if (p === 1) {
      for (_ = 0; _ < d; _++)
        r[T + _] = r[m + _];
      r[T + d] = o[y];
      return;
    }
    for (var b = e, w, S, C; ; ) {
      w = 0, S = 0, C = !1;
      do
        if (t(r[m], o[y]) < 0) {
          if (r[T++] = r[m++], S++, w = 0, --d === 0) {
            C = !0;
            break;
          }
        } else if (r[T++] = o[y++], w++, S = 0, --p === 1) {
          C = !0;
          break;
        }
      while ((w | S) < b);
      if (C)
        break;
      do {
        if (w = qi(r[m], o, y, p, 0, t), w !== 0) {
          for (_ = 0; _ < w; _++)
            r[T + _] = o[y + _];
          if (T += w, y += w, p -= w, p <= 1) {
            C = !0;
            break;
          }
        }
        if (r[T++] = r[m++], --d === 0) {
          C = !0;
          break;
        }
        if (S = Wi(o[y], r, m, d, 0, t), S !== 0) {
          for (_ = 0; _ < S; _++)
            r[T + _] = r[m + _];
          if (T += S, m += S, d -= S, d === 0) {
            C = !0;
            break;
          }
        }
        if (r[T++] = o[y++], --p === 1) {
          C = !0;
          break;
        }
        b--;
      } while (w >= oe || S >= oe);
      if (C)
        break;
      b < 0 && (b = 0), b += 2;
    }
    if (e = b, e < 1 && (e = 1), p === 1) {
      for (_ = 0; _ < d; _++)
        r[T + _] = r[m + _];
      r[T + d] = o[y];
    } else {
      if (p === 0)
        throw new Error();
      for (_ = 0; _ < p; _++)
        r[T + _] = o[y + _];
    }
  }
  function l(c, p, g, d) {
    var _ = 0;
    for (_ = 0; _ < d; _++)
      o[_] = r[g + _];
    var y = c + p - 1, m = d - 1, T = g + d - 1, b = 0, w = 0;
    if (r[T--] = r[y--], --p === 0) {
      for (b = T - (d - 1), _ = 0; _ < d; _++)
        r[b + _] = o[_];
      return;
    }
    if (d === 1) {
      for (T -= p, y -= p, w = T + 1, b = y + 1, _ = p - 1; _ >= 0; _--)
        r[w + _] = r[b + _];
      r[T] = o[m];
      return;
    }
    for (var S = e; ; ) {
      var C = 0, M = 0, P = !1;
      do
        if (t(o[m], r[y]) < 0) {
          if (r[T--] = r[y--], C++, M = 0, --p === 0) {
            P = !0;
            break;
          }
        } else if (r[T--] = o[m--], M++, C = 0, --d === 1) {
          P = !0;
          break;
        }
      while ((C | M) < S);
      if (P)
        break;
      do {
        if (C = p - qi(o[m], r, c, p, p - 1, t), C !== 0) {
          for (T -= C, y -= C, p -= C, w = T + 1, b = y + 1, _ = C - 1; _ >= 0; _--)
            r[w + _] = r[b + _];
          if (p === 0) {
            P = !0;
            break;
          }
        }
        if (r[T--] = o[m--], --d === 1) {
          P = !0;
          break;
        }
        if (M = d - Wi(r[y], o, 0, d, d - 1, t), M !== 0) {
          for (T -= M, m -= M, d -= M, w = T + 1, b = m + 1, _ = 0; _ < M; _++)
            r[w + _] = o[b + _];
          if (d <= 1) {
            P = !0;
            break;
          }
        }
        if (r[T--] = r[y--], --p === 0) {
          P = !0;
          break;
        }
        S--;
      } while (C >= oe || M >= oe);
      if (P)
        break;
      S < 0 && (S = 0), S += 2;
    }
    if (e = S, e < 1 && (e = 1), d === 1) {
      for (T -= p, y -= p, w = T + 1, b = y + 1, _ = p - 1; _ >= 0; _--)
        r[w + _] = r[b + _];
      r[T] = o[m];
    } else {
      if (d === 0)
        throw new Error();
      for (b = T - (d - 1), _ = 0; _ < d; _++)
        r[b + _] = o[_];
    }
  }
  return {
    mergeRuns: f,
    forceMergeRuns: h,
    pushRun: s
  };
}
function Yh(r, t, e, i) {
  e || (e = 0), i || (i = r.length);
  var n = i - e;
  if (!(n < 2)) {
    var a = 0;
    if (n < Es) {
      a = Ha(r, e, i, t), za(r, e, i, e + a, t);
      return;
    }
    var o = Nh(r, t), s = Hh(n);
    do {
      if (a = Ha(r, e, i, t), a < s) {
        var f = n;
        f > s && (f = s), za(r, e, e + f, e + a, t), a = f;
      }
      o.pushRun(e, a), o.mergeRuns(), n -= a, e += a;
    } while (n !== 0);
    o.forceMergeRuns();
  }
}
var ct = 1, ve = 2, kr = 4, Na = !1;
function Vi() {
  Na || (Na = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function Ya(r, t) {
  return r.zlevel === t.zlevel ? r.z === t.z ? r.z2 - t.z2 : r.z - t.z : r.zlevel - t.zlevel;
}
var Gh = function() {
  function r() {
    this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Ya;
  }
  return r.prototype.traverse = function(t, e) {
    for (var i = 0; i < this._roots.length; i++)
      this._roots[i].traverse(t, e);
  }, r.prototype.getDisplayList = function(t, e) {
    e = e || !1;
    var i = this._displayList;
    return (t || !i.length) && this.updateDisplayList(e), i;
  }, r.prototype.updateDisplayList = function(t) {
    this._displayListLen = 0;
    for (var e = this._roots, i = this._displayList, n = 0, a = e.length; n < a; n++)
      this._updateAndAddDisplayable(e[n], null, t);
    i.length = this._displayListLen, Yh(i, Ya);
  }, r.prototype._updateAndAddDisplayable = function(t, e, i) {
    if (!(t.ignore && !i)) {
      t.beforeUpdate(), t.update(), t.afterUpdate();
      var n = t.getClipPath();
      if (t.ignoreClip)
        e = null;
      else if (n) {
        e ? e = e.slice() : e = [];
        for (var a = n, o = t; a; )
          a.parent = o, a.updateTransform(), e.push(a), o = a, a = a.getClipPath();
      }
      if (t.childrenRef) {
        for (var s = t.childrenRef(), f = 0; f < s.length; f++) {
          var h = s[f];
          t.__dirty && (h.__dirty |= ct), this._updateAndAddDisplayable(h, e, i);
        }
        t.__dirty = 0;
      } else {
        var u = t;
        e && e.length ? u.__clipPaths = e : u.__clipPaths && u.__clipPaths.length > 0 && (u.__clipPaths = []), isNaN(u.z) && (Vi(), u.z = 0), isNaN(u.z2) && (Vi(), u.z2 = 0), isNaN(u.zlevel) && (Vi(), u.zlevel = 0), this._displayList[this._displayListLen++] = u;
      }
      var v = t.getDecalElement && t.getDecalElement();
      v && this._updateAndAddDisplayable(v, e, i);
      var l = t.getTextGuideLine();
      l && this._updateAndAddDisplayable(l, e, i);
      var c = t.getTextContent();
      c && this._updateAndAddDisplayable(c, e, i);
    }
  }, r.prototype.addRoot = function(t) {
    t.__zr && t.__zr.storage === this || this._roots.push(t);
  }, r.prototype.delRoot = function(t) {
    if (t instanceof Array) {
      for (var e = 0, i = t.length; e < i; e++)
        this.delRoot(t[e]);
      return;
    }
    var n = It(this._roots, t);
    n >= 0 && this._roots.splice(n, 1);
  }, r.prototype.delAllRoots = function() {
    this._roots = [], this._displayList = [], this._displayListLen = 0;
  }, r.prototype.getRoots = function() {
    return this._roots;
  }, r.prototype.dispose = function() {
    this._displayList = null, this._roots = null;
  }, r;
}(), li;
li = U.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(r) {
  return setTimeout(r, 16);
};
var Te = {
  linear: function(r) {
    return r;
  },
  quadraticIn: function(r) {
    return r * r;
  },
  quadraticOut: function(r) {
    return r * (2 - r);
  },
  quadraticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r : -0.5 * (--r * (r - 2) - 1);
  },
  cubicIn: function(r) {
    return r * r * r;
  },
  cubicOut: function(r) {
    return --r * r * r + 1;
  },
  cubicInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r : 0.5 * ((r -= 2) * r * r + 2);
  },
  quarticIn: function(r) {
    return r * r * r * r;
  },
  quarticOut: function(r) {
    return 1 - --r * r * r * r;
  },
  quarticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r : -0.5 * ((r -= 2) * r * r * r - 2);
  },
  quinticIn: function(r) {
    return r * r * r * r * r;
  },
  quinticOut: function(r) {
    return --r * r * r * r * r + 1;
  },
  quinticInOut: function(r) {
    return (r *= 2) < 1 ? 0.5 * r * r * r * r * r : 0.5 * ((r -= 2) * r * r * r * r + 2);
  },
  sinusoidalIn: function(r) {
    return 1 - Math.cos(r * Math.PI / 2);
  },
  sinusoidalOut: function(r) {
    return Math.sin(r * Math.PI / 2);
  },
  sinusoidalInOut: function(r) {
    return 0.5 * (1 - Math.cos(Math.PI * r));
  },
  exponentialIn: function(r) {
    return r === 0 ? 0 : Math.pow(1024, r - 1);
  },
  exponentialOut: function(r) {
    return r === 1 ? 1 : 1 - Math.pow(2, -10 * r);
  },
  exponentialInOut: function(r) {
    return r === 0 ? 0 : r === 1 ? 1 : (r *= 2) < 1 ? 0.5 * Math.pow(1024, r - 1) : 0.5 * (-Math.pow(2, -10 * (r - 1)) + 2);
  },
  circularIn: function(r) {
    return 1 - Math.sqrt(1 - r * r);
  },
  circularOut: function(r) {
    return Math.sqrt(1 - --r * r);
  },
  circularInOut: function(r) {
    return (r *= 2) < 1 ? -0.5 * (Math.sqrt(1 - r * r) - 1) : 0.5 * (Math.sqrt(1 - (r -= 2) * r) + 1);
  },
  elasticIn: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)));
  },
  elasticOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * r) * Math.sin((r - t) * (2 * Math.PI) / i) + 1);
  },
  elasticInOut: function(r) {
    var t, e = 0.1, i = 0.4;
    return r === 0 ? 0 : r === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), (r *= 2) < 1 ? -0.5 * (e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i)) : e * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  backIn: function(r) {
    var t = 1.70158;
    return r * r * ((t + 1) * r - t);
  },
  backOut: function(r) {
    var t = 1.70158;
    return --r * r * ((t + 1) * r + t) + 1;
  },
  backInOut: function(r) {
    var t = 2.5949095;
    return (r *= 2) < 1 ? 0.5 * (r * r * ((t + 1) * r - t)) : 0.5 * ((r -= 2) * r * ((t + 1) * r + t) + 2);
  },
  bounceIn: function(r) {
    return 1 - Te.bounceOut(1 - r);
  },
  bounceOut: function(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  bounceInOut: function(r) {
    return r < 0.5 ? Te.bounceIn(r * 2) * 0.5 : Te.bounceOut(r * 2 - 1) * 0.5 + 0.5;
  }
}, Ye = Math.pow, Kt = Math.sqrt, ci = 1e-8, Is = 1e-4, Ga = Kt(3), Ge = 1 / 3, Ot = te(), wt = te(), Qr = te();
function Vt(r) {
  return r > -ci && r < ci;
}
function Os(r) {
  return r > ci || r < -ci;
}
function rt(r, t, e, i, n) {
  var a = 1 - n;
  return a * a * (a * r + 3 * n * t) + n * n * (n * i + 3 * a * e);
}
function Xa(r, t, e, i, n) {
  var a = 1 - n;
  return 3 * (((t - r) * a + 2 * (e - t) * n) * a + (i - e) * n * n);
}
function Fs(r, t, e, i, n, a) {
  var o = i + 3 * (t - e) - r, s = 3 * (e - t * 2 + r), f = 3 * (t - r), h = r - n, u = s * s - 3 * o * f, v = s * f - 9 * o * h, l = f * f - 3 * s * h, c = 0;
  if (Vt(u) && Vt(v))
    if (Vt(s))
      a[0] = 0;
    else {
      var p = -f / s;
      p >= 0 && p <= 1 && (a[c++] = p);
    }
  else {
    var g = v * v - 4 * u * l;
    if (Vt(g)) {
      var d = v / u, p = -s / o + d, _ = -d / 2;
      p >= 0 && p <= 1 && (a[c++] = p), _ >= 0 && _ <= 1 && (a[c++] = _);
    } else if (g > 0) {
      var y = Kt(g), m = u * s + 1.5 * o * (-v + y), T = u * s + 1.5 * o * (-v - y);
      m < 0 ? m = -Ye(-m, Ge) : m = Ye(m, Ge), T < 0 ? T = -Ye(-T, Ge) : T = Ye(T, Ge);
      var p = (-s - (m + T)) / (3 * o);
      p >= 0 && p <= 1 && (a[c++] = p);
    } else {
      var b = (2 * u * s - 3 * o * v) / (2 * Kt(u * u * u)), w = Math.acos(b) / 3, S = Kt(u), C = Math.cos(w), p = (-s - 2 * S * C) / (3 * o), _ = (-s + S * (C + Ga * Math.sin(w))) / (3 * o), M = (-s + S * (C - Ga * Math.sin(w))) / (3 * o);
      p >= 0 && p <= 1 && (a[c++] = p), _ >= 0 && _ <= 1 && (a[c++] = _), M >= 0 && M <= 1 && (a[c++] = M);
    }
  }
  return c;
}
function Bs(r, t, e, i, n) {
  var a = 6 * e - 12 * t + 6 * r, o = 9 * t + 3 * i - 3 * r - 9 * e, s = 3 * t - 3 * r, f = 0;
  if (Vt(o)) {
    if (Os(a)) {
      var h = -s / a;
      h >= 0 && h <= 1 && (n[f++] = h);
    }
  } else {
    var u = a * a - 4 * o * s;
    if (Vt(u))
      n[0] = -a / (2 * o);
    else if (u > 0) {
      var v = Kt(u), h = (-a + v) / (2 * o), l = (-a - v) / (2 * o);
      h >= 0 && h <= 1 && (n[f++] = h), l >= 0 && l <= 1 && (n[f++] = l);
    }
  }
  return f;
}
function jt(r, t, e, i, n, a) {
  var o = (t - r) * n + r, s = (e - t) * n + t, f = (i - e) * n + e, h = (s - o) * n + o, u = (f - s) * n + s, v = (u - h) * n + h;
  a[0] = r, a[1] = o, a[2] = h, a[3] = v, a[4] = v, a[5] = u, a[6] = f, a[7] = i;
}
function Xh(r, t, e, i, n, a, o, s, f, h, u) {
  var v, l = 5e-3, c = 1 / 0, p, g, d, _;
  Ot[0] = f, Ot[1] = h;
  for (var y = 0; y < 1; y += 0.05)
    wt[0] = rt(r, e, n, o, y), wt[1] = rt(t, i, a, s, y), d = Zr(Ot, wt), d < c && (v = y, c = d);
  c = 1 / 0;
  for (var m = 0; m < 32 && !(l < Is); m++)
    p = v - l, g = v + l, wt[0] = rt(r, e, n, o, p), wt[1] = rt(t, i, a, s, p), d = Zr(wt, Ot), p >= 0 && d < c ? (v = p, c = d) : (Qr[0] = rt(r, e, n, o, g), Qr[1] = rt(t, i, a, s, g), _ = Zr(Qr, Ot), g <= 1 && _ < c ? (v = g, c = _) : l *= 0.5);
  return u && (u[0] = rt(r, e, n, o, v), u[1] = rt(t, i, a, s, v)), Kt(c);
}
function Uh(r, t, e, i, n, a, o, s, f) {
  for (var h = r, u = t, v = 0, l = 1 / f, c = 1; c <= f; c++) {
    var p = c * l, g = rt(r, e, n, o, p), d = rt(t, i, a, s, p), _ = g - h, y = d - u;
    v += Math.sqrt(_ * _ + y * y), h = g, u = d;
  }
  return v;
}
function nt(r, t, e, i) {
  var n = 1 - i;
  return n * (n * r + 2 * i * t) + i * i * e;
}
function Ua(r, t, e, i) {
  return 2 * ((1 - i) * (t - r) + i * (e - t));
}
function $h(r, t, e, i, n) {
  var a = r - 2 * t + e, o = 2 * (t - r), s = r - i, f = 0;
  if (Vt(a)) {
    if (Os(o)) {
      var h = -s / o;
      h >= 0 && h <= 1 && (n[f++] = h);
    }
  } else {
    var u = o * o - 4 * a * s;
    if (Vt(u)) {
      var h = -o / (2 * a);
      h >= 0 && h <= 1 && (n[f++] = h);
    } else if (u > 0) {
      var v = Kt(u), h = (-o + v) / (2 * a), l = (-o - v) / (2 * a);
      h >= 0 && h <= 1 && (n[f++] = h), l >= 0 && l <= 1 && (n[f++] = l);
    }
  }
  return f;
}
function ks(r, t, e) {
  var i = r + e - 2 * t;
  return i === 0 ? 0.5 : (r - t) / i;
}
function di(r, t, e, i, n) {
  var a = (t - r) * i + r, o = (e - t) * i + t, s = (o - a) * i + a;
  n[0] = r, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = e;
}
function Wh(r, t, e, i, n, a, o, s, f) {
  var h, u = 5e-3, v = 1 / 0;
  Ot[0] = o, Ot[1] = s;
  for (var l = 0; l < 1; l += 0.05) {
    wt[0] = nt(r, e, n, l), wt[1] = nt(t, i, a, l);
    var c = Zr(Ot, wt);
    c < v && (h = l, v = c);
  }
  v = 1 / 0;
  for (var p = 0; p < 32 && !(u < Is); p++) {
    var g = h - u, d = h + u;
    wt[0] = nt(r, e, n, g), wt[1] = nt(t, i, a, g);
    var c = Zr(wt, Ot);
    if (g >= 0 && c < v)
      h = g, v = c;
    else {
      Qr[0] = nt(r, e, n, d), Qr[1] = nt(t, i, a, d);
      var _ = Zr(Qr, Ot);
      d <= 1 && _ < v ? (h = d, v = _) : u *= 0.5;
    }
  }
  return f && (f[0] = nt(r, e, n, h), f[1] = nt(t, i, a, h)), Kt(v);
}
function qh(r, t, e, i, n, a, o) {
  for (var s = r, f = t, h = 0, u = 1 / o, v = 1; v <= o; v++) {
    var l = v * u, c = nt(r, e, n, l), p = nt(t, i, a, l), g = c - s, d = p - f;
    h += Math.sqrt(g * g + d * d), s = c, f = p;
  }
  return h;
}
var Vh = /cubic-bezier\(([0-9,\.e ]+)\)/;
function ca(r) {
  var t = r && Vh.exec(r);
  if (t) {
    var e = t[1].split(","), i = +Yr(e[0]), n = +Yr(e[1]), a = +Yr(e[2]), o = +Yr(e[3]);
    if (isNaN(i + n + a + o))
      return;
    var s = [];
    return function(f) {
      return f <= 0 ? 0 : f >= 1 ? 1 : Fs(0, i, a, 1, f, s) && rt(0, n, o, 1, s[0]);
    };
  }
}
var Zh = function() {
  function r(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Sr, this.ondestroy = t.ondestroy || Sr, this.onrestart = t.onrestart || Sr, t.easing && this.setEasing(t.easing);
  }
  return r.prototype.step = function(t, e) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += e;
      return;
    }
    var i = this._life, n = t - this._startTime - this._pausedTime, a = n / i;
    a < 0 && (a = 0), a = Math.min(a, 1);
    var o = this.easingFunc, s = o ? o(a) : a;
    if (this.onframe(s), a === 1)
      if (this.loop) {
        var f = n % i;
        this._startTime = t - f, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, r.prototype.pause = function() {
    this._paused = !0;
  }, r.prototype.resume = function() {
    this._paused = !1;
  }, r.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = Ee(t) ? t : Te[t] || ca(t);
  }, r;
}(), Hs = /* @__PURE__ */ function() {
  function r(t) {
    this.value = t;
  }
  return r;
}(), Qh = function() {
  function r() {
    this._len = 0;
  }
  return r.prototype.insert = function(t) {
    var e = new Hs(t);
    return this.insertEntry(e), e;
  }, r.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, r.prototype.remove = function(t) {
    var e = t.prev, i = t.next;
    e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, r;
}(), Ei = function() {
  function r(t) {
    this._list = new Qh(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return r.prototype.put = function(t, e) {
    var i = this._list, n = this._map, a = null;
    if (n[t] == null) {
      var o = i.len(), s = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var f = i.head;
        i.remove(f), delete n[f.key], a = f.value, this._lastRemovedEntry = f;
      }
      s ? s.value = e : s = new Hs(e), s.key = t, i.insertEntry(s), n[t] = s;
    }
    return a;
  }, r.prototype.get = function(t) {
    var e = this._map[t], i = this._list;
    if (e != null)
      return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
  }, r.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, r.prototype.len = function() {
    return this._list.len();
  }, r;
}(), $a = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function Mt(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 255 ? 255 : r;
}
function Kh(r) {
  return r = Math.round(r), r < 0 ? 0 : r > 360 ? 360 : r;
}
function Ce(r) {
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function Zi(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? Mt(parseFloat(t) / 100 * 255) : Mt(parseInt(t, 10));
}
function Mr(r) {
  var t = r;
  return t.length && t.charAt(t.length - 1) === "%" ? Ce(parseFloat(t) / 100) : Ce(parseFloat(t));
}
function Qi(r, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? r + (t - r) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function Zt(r, t, e) {
  return r + (t - r) * e;
}
function yt(r, t, e, i, n) {
  return r[0] = t, r[1] = e, r[2] = i, r[3] = n, r;
}
function kn(r, t) {
  return r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = t[3], r;
}
var zs = new Ei(20), Xe = null;
function Rr(r, t) {
  Xe && kn(Xe, t), Xe = zs.put(r, Xe || t.slice());
}
function Pt(r, t) {
  if (r) {
    t = t || [];
    var e = zs.get(r);
    if (e)
      return kn(t, e);
    r = r + "";
    var i = r.replace(/ /g, "").toLowerCase();
    if (i in $a)
      return kn(t, $a[i]), Rr(r, t), t;
    var n = i.length;
    if (i.charAt(0) === "#") {
      if (n === 4 || n === 5) {
        var a = parseInt(i.slice(1, 4), 16);
        if (!(a >= 0 && a <= 4095)) {
          yt(t, 0, 0, 0, 1);
          return;
        }
        return yt(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, n === 5 ? parseInt(i.slice(4), 16) / 15 : 1), Rr(r, t), t;
      } else if (n === 7 || n === 9) {
        var a = parseInt(i.slice(1, 7), 16);
        if (!(a >= 0 && a <= 16777215)) {
          yt(t, 0, 0, 0, 1);
          return;
        }
        return yt(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, n === 9 ? parseInt(i.slice(7), 16) / 255 : 1), Rr(r, t), t;
      }
      return;
    }
    var o = i.indexOf("("), s = i.indexOf(")");
    if (o !== -1 && s + 1 === n) {
      var f = i.substr(0, o), h = i.substr(o + 1, s - (o + 1)).split(","), u = 1;
      switch (f) {
        case "rgba":
          if (h.length !== 4)
            return h.length === 3 ? yt(t, +h[0], +h[1], +h[2], 1) : yt(t, 0, 0, 0, 1);
          u = Mr(h.pop());
        case "rgb":
          if (h.length >= 3)
            return yt(t, Zi(h[0]), Zi(h[1]), Zi(h[2]), h.length === 3 ? u : Mr(h[3])), Rr(r, t), t;
          yt(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (h.length !== 4) {
            yt(t, 0, 0, 0, 1);
            return;
          }
          return h[3] = Mr(h[3]), Hn(h, t), Rr(r, t), t;
        case "hsl":
          if (h.length !== 3) {
            yt(t, 0, 0, 0, 1);
            return;
          }
          return Hn(h, t), Rr(r, t), t;
        default:
          return;
      }
    }
    yt(t, 0, 0, 0, 1);
  }
}
function Hn(r, t) {
  var e = (parseFloat(r[0]) % 360 + 360) % 360 / 360, i = Mr(r[1]), n = Mr(r[2]), a = n <= 0.5 ? n * (i + 1) : n + i - n * i, o = n * 2 - a;
  return t = t || [], yt(t, Mt(Qi(o, a, e + 1 / 3) * 255), Mt(Qi(o, a, e) * 255), Mt(Qi(o, a, e - 1 / 3) * 255), 1), r.length === 4 && (t[3] = r[3]), t;
}
function Jh(r) {
  if (r) {
    var t = r[0] / 255, e = r[1] / 255, i = r[2] / 255, n = Math.min(t, e, i), a = Math.max(t, e, i), o = a - n, s = (a + n) / 2, f, h;
    if (o === 0)
      f = 0, h = 0;
    else {
      s < 0.5 ? h = o / (a + n) : h = o / (2 - a - n);
      var u = ((a - t) / 6 + o / 2) / o, v = ((a - e) / 6 + o / 2) / o, l = ((a - i) / 6 + o / 2) / o;
      t === a ? f = l - v : e === a ? f = 1 / 3 + u - l : i === a && (f = 2 / 3 + v - u), f < 0 && (f += 1), f > 1 && (f -= 1);
    }
    var c = [f * 360, h, s];
    return r[3] != null && c.push(r[3]), c;
  }
}
function Wa(r, t) {
  var e = Pt(r);
  if (e) {
    for (var i = 0; i < 3; i++)
      t < 0 ? e[i] = e[i] * (1 - t) | 0 : e[i] = (255 - e[i]) * t + e[i] | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return Ie(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function qc(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    e = e || [];
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = t[n], s = t[a], f = i - n;
    return e[0] = Mt(Zt(o[0], s[0], f)), e[1] = Mt(Zt(o[1], s[1], f)), e[2] = Mt(Zt(o[2], s[2], f)), e[3] = Ce(Zt(o[3], s[3], f)), e;
  }
}
function Vc(r, t, e) {
  if (!(!(t && t.length) || !(r >= 0 && r <= 1))) {
    var i = r * (t.length - 1), n = Math.floor(i), a = Math.ceil(i), o = Pt(t[n]), s = Pt(t[a]), f = i - n, h = Ie([
      Mt(Zt(o[0], s[0], f)),
      Mt(Zt(o[1], s[1], f)),
      Mt(Zt(o[2], s[2], f)),
      Ce(Zt(o[3], s[3], f))
    ], "rgba");
    return e ? {
      color: h,
      leftIndex: n,
      rightIndex: a,
      value: i
    } : h;
  }
}
function Zc(r, t, e, i) {
  var n = Pt(r);
  if (r)
    return n = Jh(n), t != null && (n[0] = Kh(t)), e != null && (n[1] = Mr(e)), i != null && (n[2] = Mr(i)), Ie(Hn(n), "rgba");
}
function Qc(r, t) {
  var e = Pt(r);
  if (e && t != null)
    return e[3] = Ce(t), Ie(e, "rgba");
}
function Ie(r, t) {
  if (!(!r || !r.length)) {
    var e = r[0] + "," + r[1] + "," + r[2];
    return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + r[3]), t + "(" + e + ")";
  }
}
function pi(r, t) {
  var e = Pt(r);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var qa = new Ei(100);
function jh(r) {
  if (Bt(r)) {
    var t = qa.get(r);
    return t || (t = Wa(r, -0.1), qa.put(r, t)), t;
  } else if (Di(r)) {
    var e = H({}, r);
    return e.colorStops = V(r.colorStops, function(i) {
      return {
        offset: i.offset,
        color: Wa(i.color, -0.1)
      };
    }), e;
  }
  return r;
}
var tu = { env: {} }, _i = Math.round;
function Me(r) {
  var t;
  if (!r || r === "transparent")
    r = "none";
  else if (typeof r == "string" && r.indexOf("rgba") > -1) {
    var e = Pt(r);
    e && (r = "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")", t = e[3]);
  }
  return {
    color: r,
    opacity: t ?? 1
  };
}
var Va = 1e-4;
function Qt(r) {
  return r < Va && r > -Va;
}
function Ue(r) {
  return _i(r * 1e3) / 1e3;
}
function zn(r) {
  return _i(r * 1e4) / 1e4;
}
function ru(r) {
  return "matrix(" + Ue(r[0]) + "," + Ue(r[1]) + "," + Ue(r[2]) + "," + Ue(r[3]) + "," + zn(r[4]) + "," + zn(r[5]) + ")";
}
var eu = {
  left: "start",
  right: "end",
  center: "middle",
  middle: "middle"
};
function iu(r, t, e) {
  return e === "top" ? r += t / 2 : e === "bottom" && (r -= t / 2), r;
}
function nu(r) {
  return r && (r.shadowBlur || r.shadowOffsetX || r.shadowOffsetY);
}
function au(r) {
  var t = r.style, e = r.getGlobalScale();
  return [
    t.shadowColor,
    (t.shadowBlur || 0).toFixed(2),
    (t.shadowOffsetX || 0).toFixed(2),
    (t.shadowOffsetY || 0).toFixed(2),
    e[0],
    e[1]
  ].join(",");
}
function Ns(r) {
  return r && !!r.image;
}
function ou(r) {
  return r && !!r.svgElement;
}
function da(r) {
  return Ns(r) || ou(r);
}
function Ys(r) {
  return r.type === "linear";
}
function Gs(r) {
  return r.type === "radial";
}
function Xs(r) {
  return r && (r.type === "linear" || r.type === "radial");
}
function Ii(r) {
  return "url(#" + r + ")";
}
function Us(r) {
  var t = r.getGlobalScale(), e = Math.max(t[0], t[1]);
  return Math.max(Math.ceil(Math.log(e) / Math.log(10)), 1);
}
function $s(r) {
  var t = r.x || 0, e = r.y || 0, i = (r.rotation || 0) * oi, n = W(r.scaleX, 1), a = W(r.scaleY, 1), o = r.skewX || 0, s = r.skewY || 0, f = [];
  return (t || e) && f.push("translate(" + t + "px," + e + "px)"), i && f.push("rotate(" + i + ")"), (n !== 1 || a !== 1) && f.push("scale(" + n + "," + a + ")"), (o || s) && f.push("skew(" + _i(o * oi) + "deg, " + _i(s * oi) + "deg)"), f.join(" ");
}
var su = function() {
  return U.hasGlobalWindow && Ee(window.btoa) ? function(r) {
    return window.btoa(unescape(encodeURIComponent(r)));
  } : typeof Buffer < "u" ? function(r) {
    return Buffer.from(r).toString("base64");
  } : function(r) {
    return tu.env.NODE_ENV !== "production" && Ut("Base64 isn't natively supported in the current environment."), null;
  };
}(), Nn = Array.prototype.slice;
function Yt(r, t, e) {
  return (t - r) * e + r;
}
function Ki(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = Yt(t[a], e[a], i);
  return r;
}
function fu(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = Yt(t[o][s], e[o][s], i);
  }
  return r;
}
function $e(r, t, e, i) {
  for (var n = t.length, a = 0; a < n; a++)
    r[a] = t[a] + e[a] * i;
  return r;
}
function Za(r, t, e, i) {
  for (var n = t.length, a = n && t[0].length, o = 0; o < n; o++) {
    r[o] || (r[o] = []);
    for (var s = 0; s < a; s++)
      r[o][s] = t[o][s] + e[o][s] * i;
  }
  return r;
}
function hu(r, t) {
  for (var e = r.length, i = t.length, n = e > i ? t : r, a = Math.min(e, i), o = n[a - 1] || { color: [0, 0, 0, 0], offset: 0 }, s = a; s < Math.max(e, i); s++)
    n.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function uu(r, t, e) {
  var i = r, n = t;
  if (!(!i.push || !n.push)) {
    var a = i.length, o = n.length;
    if (a !== o) {
      var s = a > o;
      if (s)
        i.length = o;
      else
        for (var f = a; f < o; f++)
          i.push(e === 1 ? n[f] : Nn.call(n[f]));
    }
    for (var h = i[0] && i[0].length, f = 0; f < i.length; f++)
      if (e === 1)
        isNaN(i[f]) && (i[f] = n[f]);
      else
        for (var u = 0; u < h; u++)
          isNaN(i[f][u]) && (i[f][u] = n[f][u]);
  }
}
function si(r) {
  if (Ft(r)) {
    var t = r.length;
    if (Ft(r[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(Nn.call(r[i]));
      return e;
    }
    return Nn.call(r);
  }
  return r;
}
function fi(r) {
  return r[0] = Math.floor(r[0]) || 0, r[1] = Math.floor(r[1]) || 0, r[2] = Math.floor(r[2]) || 0, r[3] = r[3] == null ? 1 : r[3], "rgba(" + r.join(",") + ")";
}
function vu(r) {
  return Ft(r && r[0]) ? 2 : 1;
}
var We = 0, hi = 1, Ws = 2, le = 3, Yn = 4, Gn = 5, Qa = 6;
function Ka(r) {
  return r === Yn || r === Gn;
}
function qe(r) {
  return r === hi || r === Ws;
}
var se = [0, 0, 0, 0], lu = function() {
  function r(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  return r.prototype.isFinished = function() {
    return this._finished;
  }, r.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, r.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, r.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, r.prototype.addKeyframe = function(t, e, i) {
    this._needsSort = !0;
    var n = this.keyframes, a = n.length, o = !1, s = Qa, f = e;
    if (Ft(e)) {
      var h = vu(e);
      s = h, (h === 1 && !ge(e[0]) || h === 2 && !ge(e[0][0])) && (o = !0);
    } else if (ge(e) && !ih(e))
      s = We;
    else if (Bt(e))
      if (!isNaN(+e))
        s = We;
      else {
        var u = Pt(e);
        u && (f = u, s = le);
      }
    else if (Di(e)) {
      var v = H({}, f);
      v.colorStops = V(e.colorStops, function(c) {
        return {
          offset: c.offset,
          color: Pt(c.color)
        };
      }), Ys(e) ? s = Yn : Gs(e) && (s = Gn), f = v;
    }
    a === 0 ? this.valType = s : (s !== this.valType || s === Qa) && (o = !0), this.discrete = this.discrete || o;
    var l = {
      time: t,
      value: f,
      rawValue: e,
      percent: 0
    };
    return i && (l.easing = i, l.easingFunc = Ee(i) ? i : Te[i] || ca(i)), n.push(l), l;
  }, r.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(g, d) {
      return g.time - d.time;
    });
    for (var n = this.valType, a = i.length, o = i[a - 1], s = this.discrete, f = qe(n), h = Ka(n), u = 0; u < a; u++) {
      var v = i[u], l = v.value, c = o.value;
      v.percent = v.time / t, s || (f && u !== a - 1 ? uu(l, c, n) : h && hu(l.colorStops, c.colorStops));
    }
    if (!s && n !== Gn && e && this.needsAnimate() && e.needsAnimate() && n === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var p = i[0].value, u = 0; u < a; u++)
        n === We ? i[u].additiveValue = i[u].value - p : n === le ? i[u].additiveValue = $e([], i[u].value, p, -1) : qe(n) && (i[u].additiveValue = n === hi ? $e([], i[u].value, p, -1) : Za([], i[u].value, p, -1));
    }
  }, r.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, n = i ? "additiveValue" : "value", a = this.valType, o = this.keyframes, s = o.length, f = this.propName, h = a === le, u, v = this._lastFr, l = Math.min, c, p;
      if (s === 1)
        c = p = o[0];
      else {
        if (e < 0)
          u = 0;
        else if (e < this._lastFrP) {
          var g = l(v + 1, s - 1);
          for (u = g; u >= 0 && !(o[u].percent <= e); u--)
            ;
          u = l(u, s - 2);
        } else {
          for (u = v; u < s && !(o[u].percent > e); u++)
            ;
          u = l(u - 1, s - 2);
        }
        p = o[u + 1], c = o[u];
      }
      if (c && p) {
        this._lastFr = u, this._lastFrP = e;
        var d = p.percent - c.percent, _ = d === 0 ? 1 : l((e - c.percent) / d, 1);
        p.easingFunc && (_ = p.easingFunc(_));
        var y = i ? this._additiveValue : h ? se : t[f];
        if ((qe(a) || h) && !y && (y = this._additiveValue = []), this.discrete)
          t[f] = _ < 1 ? c.rawValue : p.rawValue;
        else if (qe(a))
          a === hi ? Ki(y, c[n], p[n], _) : fu(y, c[n], p[n], _);
        else if (Ka(a)) {
          var m = c[n], T = p[n], b = a === Yn;
          t[f] = {
            type: b ? "linear" : "radial",
            x: Yt(m.x, T.x, _),
            y: Yt(m.y, T.y, _),
            colorStops: V(m.colorStops, function(S, C) {
              var M = T.colorStops[C];
              return {
                offset: Yt(S.offset, M.offset, _),
                color: fi(Ki([], S.color, M.color, _))
              };
            }),
            global: T.global
          }, b ? (t[f].x2 = Yt(m.x2, T.x2, _), t[f].y2 = Yt(m.y2, T.y2, _)) : t[f].r = Yt(m.r, T.r, _);
        } else if (h)
          Ki(y, c[n], p[n], _), i || (t[f] = fi(y));
        else {
          var w = Yt(c[n], p[n], _);
          i ? this._additiveValue = w : t[f] = w;
        }
        i && this._addToTarget(t);
      }
    }
  }, r.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, n = this._additiveValue;
    e === We ? t[i] = t[i] + n : e === le ? (Pt(t[i], se), $e(se, se, n, 1), t[i] = fi(se)) : e === hi ? $e(t[i], t[i], n, 1) : e === Ws && Za(t[i], t[i], n, 1);
  }, r;
}(), pa = function() {
  function r(t, e, i, n) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && n) {
      Ut("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = n, this._allowDiscrete = i;
  }
  return r.prototype.getMaxTime = function() {
    return this._maxTime;
  }, r.prototype.getDelay = function() {
    return this._delay;
  }, r.prototype.getLoop = function() {
    return this._loop;
  }, r.prototype.getTarget = function() {
    return this._target;
  }, r.prototype.changeTarget = function(t) {
    this._target = t;
  }, r.prototype.when = function(t, e, i) {
    return this.whenWithKeys(t, e, G(e), i);
  }, r.prototype.whenWithKeys = function(t, e, i, n) {
    for (var a = this._tracks, o = 0; o < i.length; o++) {
      var s = i[o], f = a[s];
      if (!f) {
        f = a[s] = new lu(s);
        var h = void 0, u = this._getAdditiveTrack(s);
        if (u) {
          var v = u.keyframes, l = v[v.length - 1];
          h = l && l.value, u.valType === le && h && (h = fi(h));
        } else
          h = this._target[s];
        if (h == null)
          continue;
        t > 0 && f.addKeyframe(0, si(h), n), this._trackKeys.push(s);
      }
      f.addKeyframe(t, si(e[s]), n);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }, r.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, r.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, r.prototype.isPaused = function() {
    return !!this._paused;
  }, r.prototype.duration = function(t) {
    return this._maxTime = t, this._force = !0, this;
  }, r.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var t = this._doneCbs;
    if (t)
      for (var e = t.length, i = 0; i < e; i++)
        t[i].call(this);
  }, r.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, e = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, e)
      for (var i = 0; i < e.length; i++)
        e[i].call(this);
  }, r.prototype._setTracksFinished = function() {
    for (var t = this._tracks, e = this._trackKeys, i = 0; i < e.length; i++)
      t[e[i]].setFinished();
  }, r.prototype._getAdditiveTrack = function(t) {
    var e, i = this._additiveAnimators;
    if (i)
      for (var n = 0; n < i.length; n++) {
        var a = i[n].getTrack(t);
        a && (e = a);
      }
    return e;
  }, r.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var e = this, i = [], n = this._maxTime || 0, a = 0; a < this._trackKeys.length; a++) {
        var o = this._trackKeys[a], s = this._tracks[o], f = this._getAdditiveTrack(o), h = s.keyframes, u = h.length;
        if (s.prepare(n, f), s.needsAnimate())
          if (!this._allowDiscrete && s.discrete) {
            var v = h[u - 1];
            v && (e._target[s.propName] = v.rawValue), s.setFinished();
          } else
            i.push(s);
      }
      if (i.length || this._force) {
        var l = new Zh({
          life: n,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(c) {
            e._started = 2;
            var p = e._additiveAnimators;
            if (p) {
              for (var g = !1, d = 0; d < p.length; d++)
                if (p[d]._clip) {
                  g = !0;
                  break;
                }
              g || (e._additiveAnimators = null);
            }
            for (var d = 0; d < i.length; d++)
              i[d].step(e._target, c);
            var _ = e._onframeCbs;
            if (_)
              for (var d = 0; d < _.length; d++)
                _[d](e._target, c);
          },
          ondestroy: function() {
            e._doneCallback();
          }
        });
        this._clip = l, this.animation && this.animation.addClip(l), t && l.setEasing(t);
      } else
        this._doneCallback();
      return this;
    }
  }, r.prototype.stop = function(t) {
    if (this._clip) {
      var e = this._clip;
      t && e.onframe(1), this._abortedCallback();
    }
  }, r.prototype.delay = function(t) {
    return this._delay = t, this;
  }, r.prototype.during = function(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }, r.prototype.done = function(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }, r.prototype.aborted = function(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }, r.prototype.getClip = function() {
    return this._clip;
  }, r.prototype.getTrack = function(t) {
    return this._tracks[t];
  }, r.prototype.getTracks = function() {
    var t = this;
    return V(this._trackKeys, function(e) {
      return t._tracks[e];
    });
  }, r.prototype.stopTracks = function(t, e) {
    if (!t.length || !this._clip)
      return !0;
    for (var i = this._tracks, n = this._trackKeys, a = 0; a < t.length; a++) {
      var o = i[t[a]];
      o && !o.isFinished() && (e ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var s = !0, a = 0; a < n.length; a++)
      if (!i[n[a]].isFinished()) {
        s = !1;
        break;
      }
    return s && this._abortedCallback(), s;
  }, r.prototype.saveTo = function(t, e, i) {
    if (t) {
      e = e || this._trackKeys;
      for (var n = 0; n < e.length; n++) {
        var a = e[n], o = this._tracks[a];
        if (!(!o || o.isFinished())) {
          var s = o.keyframes, f = s[i ? 0 : s.length - 1];
          f && (t[a] = si(f.rawValue));
        }
      }
    }
  }, r.prototype.__changeFinalValue = function(t, e) {
    e = e || G(t);
    for (var i = 0; i < e.length; i++) {
      var n = e[i], a = this._tracks[n];
      if (a) {
        var o = a.keyframes;
        if (o.length > 1) {
          var s = o.pop();
          a.addKeyframe(s.time, t[n]), a.prepare(this._maxTime, a.getAdditiveTrack());
        }
      }
    }
  }, r;
}();
function Ur() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var cu = function(r) {
  z(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i._running = !1, i._time = 0, i._pausedTime = 0, i._pauseStart = 0, i._paused = !1, e = e || {}, i.stage = e.stage || {}, i;
  }
  return t.prototype.addClip = function(e) {
    e.animation && this.removeClip(e), this._head ? (this._tail.next = e, e.prev = this._tail, e.next = null, this._tail = e) : this._head = this._tail = e, e.animation = this;
  }, t.prototype.addAnimator = function(e) {
    e.animation = this;
    var i = e.getClip();
    i && this.addClip(i);
  }, t.prototype.removeClip = function(e) {
    if (e.animation) {
      var i = e.prev, n = e.next;
      i ? i.next = n : this._head = n, n ? n.prev = i : this._tail = i, e.next = e.prev = e.animation = null;
    }
  }, t.prototype.removeAnimator = function(e) {
    var i = e.getClip();
    i && this.removeClip(i), e.animation = null;
  }, t.prototype.update = function(e) {
    for (var i = Ur() - this._pausedTime, n = i - this._time, a = this._head; a; ) {
      var o = a.next, s = a.step(i, n);
      s && (a.ondestroy(), this.removeClip(a)), a = o;
    }
    this._time = i, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
  }, t.prototype._startLoop = function() {
    var e = this;
    this._running = !0;
    function i() {
      e._running && (li(i), !e._paused && e.update());
    }
    li(i);
  }, t.prototype.start = function() {
    this._running || (this._time = Ur(), this._pausedTime = 0, this._startLoop());
  }, t.prototype.stop = function() {
    this._running = !1;
  }, t.prototype.pause = function() {
    this._paused || (this._pauseStart = Ur(), this._paused = !0);
  }, t.prototype.resume = function() {
    this._paused && (this._pausedTime += Ur() - this._pauseStart, this._paused = !1);
  }, t.prototype.clear = function() {
    for (var e = this._head; e; ) {
      var i = e.next;
      e.prev = e.next = e.animation = null, e = i;
    }
    this._head = this._tail = null;
  }, t.prototype.isFinished = function() {
    return this._head == null;
  }, t.prototype.animate = function(e, i) {
    i = i || {}, this.start();
    var n = new pa(e, i.loop);
    return this.addAnimator(n), n;
  }, t;
}(re), du = 300, Ji = U.domSupported, ji = function() {
  var r = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ], t = [
    "touchstart",
    "touchend",
    "touchmove"
  ], e = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  }, i = V(r, function(n) {
    var a = n.replace("mouse", "pointer");
    return e.hasOwnProperty(a) ? a : n;
  });
  return {
    mouse: r,
    touch: t,
    pointer: i
  };
}(), Ja = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
}, ja = !1;
function Xn(r) {
  var t = r.pointerType;
  return t === "pen" || t === "touch";
}
function pu(r) {
  r.touching = !0, r.touchTimer != null && (clearTimeout(r.touchTimer), r.touchTimer = null), r.touchTimer = setTimeout(function() {
    r.touching = !1, r.touchTimer = null;
  }, 700);
}
function tn(r) {
  r && (r.zrByTouch = !0);
}
function _u(r, t) {
  return St(r.dom, new gu(r, t), !0);
}
function qs(r, t) {
  for (var e = t, i = !1; e && e.nodeType !== 9 && !(i = e.domBelongToZr || e !== t && e === r.painterRoot); )
    e = e.parentNode;
  return i;
}
var gu = /* @__PURE__ */ function() {
  function r(t, e) {
    this.stopPropagation = Sr, this.stopImmediatePropagation = Sr, this.preventDefault = Sr, this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, this.clientX = e.clientX, this.clientY = e.clientY;
  }
  return r;
}(), Ct = {
  mousedown: function(r) {
    r = St(this.dom, r), this.__mayPointerCapture = [r.zrX, r.zrY], this.trigger("mousedown", r);
  },
  mousemove: function(r) {
    r = St(this.dom, r);
    var t = this.__mayPointerCapture;
    t && (r.zrX !== t[0] || r.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    r = St(this.dom, r), this.__togglePointerCapture(!1), this.trigger("mouseup", r);
  },
  mouseout: function(r) {
    r = St(this.dom, r);
    var t = r.toElement || r.relatedTarget;
    qs(this, t) || (this.__pointerCapturing && (r.zrEventControl = "no_globalout"), this.trigger("mouseout", r));
  },
  wheel: function(r) {
    ja = !0, r = St(this.dom, r), this.trigger("mousewheel", r);
  },
  mousewheel: function(r) {
    ja || (r = St(this.dom, r), this.trigger("mousewheel", r));
  },
  touchstart: function(r) {
    r = St(this.dom, r), tn(r), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(r, "start"), Ct.mousemove.call(this, r), Ct.mousedown.call(this, r);
  },
  touchmove: function(r) {
    r = St(this.dom, r), tn(r), this.handler.processGesture(r, "change"), Ct.mousemove.call(this, r);
  },
  touchend: function(r) {
    r = St(this.dom, r), tn(r), this.handler.processGesture(r, "end"), Ct.mouseup.call(this, r), +/* @__PURE__ */ new Date() - +this.__lastTouchMoment < du && Ct.click.call(this, r);
  },
  pointerdown: function(r) {
    Ct.mousedown.call(this, r);
  },
  pointermove: function(r) {
    Xn(r) || Ct.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Ct.mouseup.call(this, r);
  },
  pointerout: function(r) {
    Xn(r) || Ct.mouseout.call(this, r);
  }
};
at(["click", "dblclick", "contextmenu"], function(r) {
  Ct[r] = function(t) {
    t = St(this.dom, t), this.trigger(r, t);
  };
});
var Un = {
  pointermove: function(r) {
    Xn(r) || Un.mousemove.call(this, r);
  },
  pointerup: function(r) {
    Un.mouseup.call(this, r);
  },
  mousemove: function(r) {
    this.trigger("mousemove", r);
  },
  mouseup: function(r) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", r), t && (r.zrEventControl = "only_globalout", this.trigger("mouseout", r));
  }
};
function yu(r, t) {
  var e = t.domHandlers;
  U.pointerEventsSupported ? at(ji.pointer, function(i) {
    ui(t, i, function(n) {
      e[i].call(r, n);
    });
  }) : (U.touchEventsSupported && at(ji.touch, function(i) {
    ui(t, i, function(n) {
      e[i].call(r, n), pu(t);
    });
  }), at(ji.mouse, function(i) {
    ui(t, i, function(n) {
      n = la(n), t.touching || e[i].call(r, n);
    });
  }));
}
function mu(r, t) {
  U.pointerEventsSupported ? at(Ja.pointer, e) : U.touchEventsSupported || at(Ja.mouse, e);
  function e(i) {
    function n(a) {
      a = la(a), qs(r, a.target) || (a = _u(r, a), t.domHandlers[i].call(r, a));
    }
    ui(t, i, n, { capture: !0 });
  }
}
function ui(r, t, e, i) {
  r.mounted[t] = e, r.listenerOpts[t] = i, Ph(r.domTarget, t, e, i);
}
function rn(r) {
  var t = r.mounted;
  for (var e in t)
    t.hasOwnProperty(e) && Lh(r.domTarget, e, t[e], r.listenerOpts[e]);
  r.mounted = {};
}
var to = /* @__PURE__ */ function() {
  function r(t, e) {
    this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, this.domHandlers = e;
  }
  return r;
}(), wu = function(r) {
  z(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.__pointerCapturing = !1, n.dom = e, n.painterRoot = i, n._localHandlerScope = new to(e, Ct), Ji && (n._globalHandlerScope = new to(document, Un)), yu(n, n._localHandlerScope), n;
  }
  return t.prototype.dispose = function() {
    rn(this._localHandlerScope), Ji && rn(this._globalHandlerScope);
  }, t.prototype.setCursor = function(e) {
    this.dom.style && (this.dom.style.cursor = e || "default");
  }, t.prototype.__togglePointerCapture = function(e) {
    if (this.__mayPointerCapture = null, Ji && +this.__pointerCapturing ^ +e) {
      this.__pointerCapturing = e;
      var i = this._globalHandlerScope;
      e ? mu(this, i) : rn(i);
    }
  }, t;
}(re), Vs = 1;
U.hasGlobalWindow && (Vs = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var gi = Vs, $n = 0.4, Wn = "#333", qn = "#ccc", Tu = "#eee", ro = Ah, eo = 5e-5;
function ar(r) {
  return r > eo || r < -eo;
}
var or = [], Dr = [], en = Cr(), nn = Math.abs, _a = function() {
  function r() {
  }
  return r.prototype.getLocalTransform = function(t) {
    return r.getLocalTransform(this, t);
  }, r.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, r.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, r.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, r.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, r.prototype.needLocalTransform = function() {
    return ar(this.rotation) || ar(this.x) || ar(this.y) || ar(this.scaleX - 1) || ar(this.scaleY - 1) || ar(this.skewX) || ar(this.skewY);
  }, r.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && (ro(i), this.invTransform = null);
      return;
    }
    i = i || Cr(), e ? this.getLocalTransform(i) : ro(i), t && (e ? we(i, t, i) : Ps(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, r.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(or);
      var i = or[0] < 0 ? -1 : 1, n = or[1] < 0 ? -1 : 1, a = ((or[0] - i) * e + i) / or[0] || 0, o = ((or[1] - n) * e + n) / or[1] || 0;
      t[0] *= a, t[1] *= a, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || Cr(), Eh(this.invTransform, t);
  }, r.prototype.getComputedTransform = function() {
    for (var t = this, e = []; t; )
      e.push(t), t = t.parent;
    for (; t = e.pop(); )
      t.updateTransform();
    return this.transform;
  }, r.prototype.setLocalTransform = function(t) {
    if (t) {
      var e = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3], n = Math.atan2(t[1], t[0]), a = Math.PI / 2 + n - Math.atan2(t[3], t[2]);
      i = Math.sqrt(i) * Math.cos(a), e = Math.sqrt(e), this.skewX = a, this.skewY = 0, this.rotation = -n, this.x = +t[4], this.y = +t[5], this.scaleX = e, this.scaleY = i, this.originX = 0, this.originY = 0;
    }
  }, r.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, e = this.transform;
      t && t.transform && (t.invTransform = t.invTransform || Cr(), we(Dr, t.invTransform, e), e = Dr);
      var i = this.originX, n = this.originY;
      (i || n) && (en[4] = i, en[5] = n, we(Dr, e, en), Dr[4] -= i, Dr[5] -= n, e = Dr), this.setLocalTransform(e);
    }
  }, r.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, r.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], n = this.invTransform;
    return n && me(i, i, n), i;
  }, r.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], n = this.transform;
    return n && me(i, i, n), i;
  }, r.prototype.getLineScale = function() {
    var t = this.transform;
    return t && nn(t[0] - 1) > 1e-10 && nn(t[3] - 1) > 1e-10 ? Math.sqrt(nn(t[0] * t[3] - t[2] * t[1])) : 1;
  }, r.prototype.copyTransform = function(t) {
    Zs(this, t);
  }, r.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, n = t.originY || 0, a = t.scaleX, o = t.scaleY, s = t.anchorX, f = t.anchorY, h = t.rotation || 0, u = t.x, v = t.y, l = t.skewX ? Math.tan(t.skewX) : 0, c = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || n || s || f) {
      var p = i + s, g = n + f;
      e[4] = -p * a - l * g * o, e[5] = -g * o - c * p * a;
    } else
      e[4] = e[5] = 0;
    return e[0] = a, e[3] = o, e[1] = c * a, e[2] = l * o, h && Ls(e, e, h), e[4] += i + u, e[5] += n + v, e;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  }(), r;
}(), Pe = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function Zs(r, t) {
  for (var e = 0; e < Pe.length; e++) {
    var i = Pe[e];
    r[i] = t[i];
  }
}
var io = {};
function dt(r, t) {
  t = t || Jt;
  var e = io[t];
  e || (e = io[t] = new Ei(500));
  var i = e.get(r);
  return i == null && (i = Li.measureText(r, t).width, e.put(r, i)), i;
}
function no(r, t, e, i) {
  var n = dt(r, t), a = Oi(t), o = ce(0, n, e), s = Hr(0, a, i), f = new X(o, s, n, a);
  return f;
}
function bu(r, t, e, i) {
  var n = ((r || "") + "").split(`
`), a = n.length;
  if (a === 1)
    return no(n[0], t, e, i);
  for (var o = new X(0, 0, 0, 0), s = 0; s < n.length; s++) {
    var f = no(n[s], t, e, i);
    s === 0 ? o.copy(f) : o.union(f);
  }
  return o;
}
function ce(r, t, e) {
  return e === "right" ? r -= t : e === "center" && (r -= t / 2), r;
}
function Hr(r, t, e) {
  return e === "middle" ? r -= t / 2 : e === "bottom" && (r -= t), r;
}
function Oi(r) {
  return dt("国", r);
}
function Le(r, t) {
  return typeof r == "string" ? r.lastIndexOf("%") >= 0 ? parseFloat(r) / 100 * t : parseFloat(r) : r;
}
function Su(r, t, e) {
  var i = t.position || "inside", n = t.distance != null ? t.distance : 5, a = e.height, o = e.width, s = a / 2, f = e.x, h = e.y, u = "left", v = "top";
  if (i instanceof Array)
    f += Le(i[0], e.width), h += Le(i[1], e.height), u = null, v = null;
  else
    switch (i) {
      case "left":
        f -= n, h += s, u = "right", v = "middle";
        break;
      case "right":
        f += n + o, h += s, v = "middle";
        break;
      case "top":
        f += o / 2, h -= n, u = "center", v = "bottom";
        break;
      case "bottom":
        f += o / 2, h += a + n, u = "center";
        break;
      case "inside":
        f += o / 2, h += s, u = "center", v = "middle";
        break;
      case "insideLeft":
        f += n, h += s, v = "middle";
        break;
      case "insideRight":
        f += o - n, h += s, u = "right", v = "middle";
        break;
      case "insideTop":
        f += o / 2, h += n, u = "center";
        break;
      case "insideBottom":
        f += o / 2, h += a - n, u = "center", v = "bottom";
        break;
      case "insideTopLeft":
        f += n, h += n;
        break;
      case "insideTopRight":
        f += o - n, h += n, u = "right";
        break;
      case "insideBottomLeft":
        f += n, h += a - n, v = "bottom";
        break;
      case "insideBottomRight":
        f += o - n, h += a - n, u = "right", v = "bottom";
        break;
    }
  return r = r || {}, r.x = f, r.y = h, r.align = u, r.verticalAlign = v, r;
}
var Ar = { env: {} }, an = "__zr_normal__", on = Pe.concat(["ignore"]), Cu = Ri(Pe, function(r, t) {
  return r[t] = !0, r;
}, { ignore: !1 }), Er = {}, Mu = new X(0, 0, 0, 0), Fi = function() {
  function r(t) {
    this.id = ms(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return r.prototype._init = function(t) {
    this.attr(t);
  }, r.prototype.drift = function(t, e, i) {
    switch (this.draggable) {
      case "horizontal":
        e = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var n = this.transform;
    n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.markRedraw();
  }, r.prototype.beforeUpdate = function() {
  }, r.prototype.afterUpdate = function() {
  }, r.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, r.prototype.updateInnerText = function(t) {
    var e = this._textContent;
    if (e && (!e.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var i = this.textConfig, n = i.local, a = e.innerTransformable, o = void 0, s = void 0, f = !1;
      a.parent = n ? this : null;
      var h = !1;
      if (a.copyTransform(e), i.position != null) {
        var u = Mu;
        i.layoutRect ? u.copy(i.layoutRect) : u.copy(this.getBoundingRect()), n || u.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(Er, i, u) : Su(Er, i, u), a.x = Er.x, a.y = Er.y, o = Er.align, s = Er.verticalAlign;
        var v = i.origin;
        if (v && i.rotation != null) {
          var l = void 0, c = void 0;
          v === "center" ? (l = u.width * 0.5, c = u.height * 0.5) : (l = Le(v[0], u.width), c = Le(v[1], u.height)), h = !0, a.originX = -a.x + l + (n ? 0 : u.x), a.originY = -a.y + c + (n ? 0 : u.y);
        }
      }
      i.rotation != null && (a.rotation = i.rotation);
      var p = i.offset;
      p && (a.x += p[0], a.y += p[1], h || (a.originX = -p[0], a.originY = -p[1]));
      var g = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, d = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), _ = void 0, y = void 0, m = void 0;
      g && this.canBeInsideText() ? (_ = i.insideFill, y = i.insideStroke, (_ == null || _ === "auto") && (_ = this.getInsideTextFill()), (y == null || y === "auto") && (y = this.getInsideTextStroke(_), m = !0)) : (_ = i.outsideFill, y = i.outsideStroke, (_ == null || _ === "auto") && (_ = this.getOutsideFill()), (y == null || y === "auto") && (y = this.getOutsideStroke(_), m = !0)), _ = _ || "#000", (_ !== d.fill || y !== d.stroke || m !== d.autoStroke || o !== d.align || s !== d.verticalAlign) && (f = !0, d.fill = _, d.stroke = y, d.autoStroke = m, d.align = o, d.verticalAlign = s, e.setDefaultTextStyle(d)), e.__dirty |= ct, f && e.dirtyStyle(!0);
    }
  }, r.prototype.canBeInsideText = function() {
    return !0;
  }, r.prototype.getInsideTextFill = function() {
    return "#fff";
  }, r.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, r.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? qn : Wn;
  }, r.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && Pt(e);
    i || (i = [255, 255, 255, 1]);
    for (var n = i[3], a = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * n + (a ? 0 : 255) * (1 - n);
    return i[3] = 1, Ie(i, "rgba");
  }, r.prototype.traverse = function(t, e) {
  }, r.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, H(this.extra, e)) : this[t] = e;
  }, r.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, r.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, r.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (Xt(t))
      for (var i = t, n = G(i), a = 0; a < n.length; a++) {
        var o = n[a];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, r.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var n = this.animators[i], a = n.__fromStateTransition;
      if (!(n.getLoop() || a && a !== an)) {
        var o = n.targetName, s = o ? e[o] : e;
        n.saveTo(s);
      }
    }
  }, r.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, on);
  }, r.prototype._savePrimaryToNormal = function(t, e, i) {
    for (var n = 0; n < i.length; n++) {
      var a = i[n];
      t[a] != null && !(a in e) && (e[a] = this[a]);
    }
  }, r.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, r.prototype.getState = function(t) {
    return this.states[t];
  }, r.prototype.ensureState = function(t) {
    var e = this.states;
    return e[t] || (e[t] = {}), e[t];
  }, r.prototype.clearStates = function(t) {
    this.useState(an, !1, t);
  }, r.prototype.useState = function(t, e, i, n) {
    var a = t === an, o = this.hasState();
    if (!(!o && a)) {
      var s = this.currentStates, f = this.stateTransition;
      if (!(It(s, t) >= 0 && (e || s.length === 1))) {
        var h;
        if (this.stateProxy && !a && (h = this.stateProxy(t)), h || (h = this.states && this.states[t]), !h && !a) {
          Ut("State " + t + " not exists.");
          return;
        }
        a || this.saveCurrentToNormalState(h);
        var u = !!(h && h.hoverLayer || n);
        u && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, h, this._normalState, e, !i && !this.__inHover && f && f.duration > 0, f);
        var v = this._textContent, l = this._textGuide;
        return v && v.useState(t, e, i, u), l && l.useState(t, e, i, u), a ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !u && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ct), h;
      }
    }
  }, r.prototype.useStates = function(t, e, i) {
    if (!t.length)
      this.clearStates();
    else {
      var n = [], a = this.currentStates, o = t.length, s = o === a.length;
      if (s) {
        for (var f = 0; f < o; f++)
          if (t[f] !== a[f]) {
            s = !1;
            break;
          }
      }
      if (s)
        return;
      for (var f = 0; f < o; f++) {
        var h = t[f], u = void 0;
        this.stateProxy && (u = this.stateProxy(h, t)), u || (u = this.states[h]), u && n.push(u);
      }
      var v = n[o - 1], l = !!(v && v.hoverLayer || i);
      l && this._toggleHoverLayerFlag(!0);
      var c = this._mergeStates(n), p = this.stateTransition;
      this.saveCurrentToNormalState(c), this._applyStateObj(t.join(","), c, this._normalState, !1, !e && !this.__inHover && p && p.duration > 0, p);
      var g = this._textContent, d = this._textGuide;
      g && g.useStates(t, e, l), d && d.useStates(t, e, l), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !l && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ct);
    }
  }, r.prototype.isSilent = function() {
    for (var t = this.silent, e = this.parent; !t && e; ) {
      if (e.silent) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    return t;
  }, r.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var e = this.animators[t];
      e.targetName && e.changeTarget(this[e.targetName]);
    }
  }, r.prototype.removeState = function(t) {
    var e = It(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, r.prototype.replaceState = function(t, e, i) {
    var n = this.currentStates.slice(), a = It(n, t), o = It(n, e) >= 0;
    a >= 0 ? o ? n.splice(a, 1) : n[a] = e : i && !o && n.push(e), this.useStates(n);
  }, r.prototype.toggleState = function(t, e) {
    e ? this.useState(t, !0) : this.removeState(t);
  }, r.prototype._mergeStates = function(t) {
    for (var e = {}, i, n = 0; n < t.length; n++) {
      var a = t[n];
      H(e, a), a.textConfig && (i = i || {}, H(i, a.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, r.prototype._applyStateObj = function(t, e, i, n, a, o) {
    var s = !(e && n);
    e && e.textConfig ? (this.textConfig = H({}, n ? this.textConfig : i.textConfig), H(this.textConfig, e.textConfig)) : s && i.textConfig && (this.textConfig = i.textConfig);
    for (var f = {}, h = !1, u = 0; u < on.length; u++) {
      var v = on[u], l = a && Cu[v];
      e && e[v] != null ? l ? (h = !0, f[v] = e[v]) : this[v] = e[v] : s && i[v] != null && (l ? (h = !0, f[v] = i[v]) : this[v] = i[v]);
    }
    if (!a)
      for (var u = 0; u < this.animators.length; u++) {
        var c = this.animators[u], p = c.targetName;
        c.getLoop() || c.__changeFinalValue(p ? (e || i)[p] : e || i);
      }
    h && this._transitionState(t, f, o);
  }, r.prototype._attachComponent = function(t) {
    if (t.__zr && !t.__hostTarget) {
      if (Ar.env.NODE_ENV !== "production")
        throw new Error("Text element has been added to zrender.");
      return;
    }
    if (t === this) {
      if (Ar.env.NODE_ENV !== "production")
        throw new Error("Recursive component attachment.");
      return;
    }
    var e = this.__zr;
    e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
  }, r.prototype._detachComponent = function(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }, r.prototype.getClipPath = function() {
    return this._clipPath;
  }, r.prototype.setClipPath = function(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }, r.prototype.removeClipPath = function() {
    var t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }, r.prototype.getTextContent = function() {
    return this._textContent;
  }, r.prototype.setTextContent = function(t) {
    var e = this._textContent;
    if (e !== t) {
      if (e && e !== t && this.removeTextContent(), Ar.env.NODE_ENV !== "production" && t.__zr && !t.__hostTarget)
        throw new Error("Text element has been added to zrender.");
      t.innerTransformable = new _a(), this._attachComponent(t), this._textContent = t, this.markRedraw();
    }
  }, r.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), H(this.textConfig, t), this.markRedraw();
  }, r.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, r.prototype.removeTextContent = function() {
    var t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, r.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, r.prototype.setTextGuideLine = function(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }, r.prototype.removeTextGuideLine = function() {
    var t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }, r.prototype.markRedraw = function() {
    this.__dirty |= ct;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, r.prototype.dirty = function() {
    this.markRedraw();
  }, r.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var e = this._textContent, i = this._textGuide;
    e && (e.__inHover = t), i && (i.__inHover = t);
  }, r.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.addAnimator(e[i]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, r.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.removeAnimator(e[i]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, r.prototype.animate = function(t, e, i) {
    var n = t ? this[t] : this;
    if (Ar.env.NODE_ENV !== "production" && !n) {
      Ut('Property "' + t + '" is not existed in element ' + this.id);
      return;
    }
    var a = new pa(n, e, i);
    return t && (a.targetName = t), this.addAnimator(a, t), a;
  }, r.prototype.addAnimator = function(t, e) {
    var i = this.__zr, n = this;
    t.during(function() {
      n.updateDuringAnimation(e);
    }).done(function() {
      var a = n.animators, o = It(a, t);
      o >= 0 && a.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }, r.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, r.prototype.stopAnimation = function(t, e) {
    for (var i = this.animators, n = i.length, a = [], o = 0; o < n; o++) {
      var s = i[o];
      !t || t === s.scope ? s.stop(e) : a.push(s);
    }
    return this.animators = a, this;
  }, r.prototype.animateTo = function(t, e, i) {
    sn(this, t, e, i);
  }, r.prototype.animateFrom = function(t, e, i) {
    sn(this, t, e, i, !0);
  }, r.prototype._transitionState = function(t, e, i, n) {
    for (var a = sn(this, e, i, n), o = 0; o < a.length; o++)
      a[o].__fromStateTransition = t;
  }, r.prototype.getBoundingRect = function() {
    return null;
  }, r.prototype.getPaintRect = function() {
    return null;
  }, r.initDefaultProps = function() {
    var t = r.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = ct;
    var e = {};
    function i(a, o, s) {
      e[a + o + s] || (console.warn("DEPRECATED: '" + a + "' has been deprecated. use '" + o + "', '" + s + "' instead"), e[a + o + s] = !0);
    }
    function n(a, o, s, f) {
      Object.defineProperty(t, a, {
        get: function() {
          if (Ar.env.NODE_ENV !== "production" && i(a, s, f), !this[o]) {
            var u = this[o] = [];
            h(this, u);
          }
          return this[o];
        },
        set: function(u) {
          Ar.env.NODE_ENV !== "production" && i(a, s, f), this[s] = u[0], this[f] = u[1], this[o] = u, h(this, u);
        }
      });
      function h(u, v) {
        Object.defineProperty(v, 0, {
          get: function() {
            return u[s];
          },
          set: function(l) {
            u[s] = l;
          }
        }), Object.defineProperty(v, 1, {
          get: function() {
            return u[f];
          },
          set: function(l) {
            u[f] = l;
          }
        });
      }
    }
    Object.defineProperty && (n("position", "_legacyPos", "x", "y"), n("scale", "_legacyScale", "scaleX", "scaleY"), n("origin", "_legacyOrigin", "originX", "originY"));
  }(), r;
}();
ws(Fi, re);
ws(Fi, _a);
function sn(r, t, e, i, n) {
  e = e || {};
  var a = [];
  Qs(r, "", r, t, e, i, a, n);
  var o = a.length, s = !1, f = e.done, h = e.aborted, u = function() {
    s = !0, o--, o <= 0 && (s ? f && f() : h && h());
  }, v = function() {
    o--, o <= 0 && (s ? f && f() : h && h());
  };
  o || f && f(), a.length > 0 && e.during && a[0].during(function(p, g) {
    e.during(g);
  });
  for (var l = 0; l < a.length; l++) {
    var c = a[l];
    u && c.done(u), v && c.aborted(v), e.force && c.duration(e.duration), c.start(e.easing);
  }
  return a;
}
function fn(r, t, e) {
  for (var i = 0; i < e; i++)
    r[i] = t[i];
}
function Pu(r) {
  return Ft(r[0]);
}
function Lu(r, t, e) {
  if (Ft(t[e]))
    if (Ft(r[e]) || (r[e] = []), rh(t[e])) {
      var i = t[e].length;
      r[e].length !== i && (r[e] = new t[e].constructor(i), fn(r[e], t[e], i));
    } else {
      var n = t[e], a = r[e], o = n.length;
      if (Pu(n))
        for (var s = n[0].length, f = 0; f < o; f++)
          a[f] ? fn(a[f], n[f], s) : a[f] = Array.prototype.slice.call(n[f]);
      else
        fn(a, n, o);
      a.length = n.length;
    }
  else
    r[e] = t[e];
}
function xu(r, t) {
  return r === t || Ft(r) && Ft(t) && Ru(r, t);
}
function Ru(r, t) {
  var e = r.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function Qs(r, t, e, i, n, a, o, s) {
  for (var f = G(i), h = n.duration, u = n.delay, v = n.additive, l = n.setToFinal, c = !Xt(a), p = r.animators, g = [], d = 0; d < f.length; d++) {
    var _ = f[d], y = i[_];
    if (y != null && e[_] != null && (c || a[_]))
      if (Xt(y) && !Ft(y) && !Di(y)) {
        if (t) {
          s || (e[_] = y, r.updateDuringAnimation(t));
          continue;
        }
        Qs(r, _, e[_], y, n, a && a[_], o, s);
      } else
        g.push(_);
    else s || (e[_] = y, r.updateDuringAnimation(t), g.push(_));
  }
  var m = g.length;
  if (!v && m)
    for (var T = 0; T < p.length; T++) {
      var b = p[T];
      if (b.targetName === t) {
        var w = b.stopTracks(g);
        if (w) {
          var S = It(p, b);
          p.splice(S, 1);
        }
      }
    }
  if (n.force || (g = Rn(g, function(L) {
    return !xu(i[L], e[L]);
  }), m = g.length), m > 0 || n.force && !o.length) {
    var C = void 0, M = void 0, P = void 0;
    if (s) {
      M = {}, l && (C = {});
      for (var T = 0; T < m; T++) {
        var _ = g[T];
        M[_] = e[_], l ? C[_] = i[_] : e[_] = i[_];
      }
    } else if (l) {
      P = {};
      for (var T = 0; T < m; T++) {
        var _ = g[T];
        P[_] = si(e[_]), Lu(e, i, _);
      }
    }
    var b = new pa(e, !1, !1, v ? Rn(p, function(x) {
      return x.targetName === t;
    }) : null);
    b.targetName = t, n.scope && (b.scope = n.scope), l && C && b.whenWithKeys(0, C, g), P && b.whenWithKeys(0, P, g), b.whenWithKeys(h ?? 500, s ? M : i, g).delay(u || 0), r.addAnimator(b, t), o.push(b);
  }
}
var Du = { env: {} }, mr = function(r) {
  z(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.isGroup = !0, i._children = [], i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.children = function() {
    return this._children.slice();
  }, t.prototype.childAt = function(e) {
    return this._children[e];
  }, t.prototype.childOfName = function(e) {
    for (var i = this._children, n = 0; n < i.length; n++)
      if (i[n].name === e)
        return i[n];
  }, t.prototype.childCount = function() {
    return this._children.length;
  }, t.prototype.add = function(e) {
    if (e && (e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), Du.env.NODE_ENV !== "production" && e.__hostTarget))
      throw "This elemenet has been used as an attachment";
    return this;
  }, t.prototype.addBefore = function(e, i) {
    if (e && e !== this && e.parent !== this && i && i.parent === this) {
      var n = this._children, a = n.indexOf(i);
      a >= 0 && (n.splice(a, 0, e), this._doAdd(e));
    }
    return this;
  }, t.prototype.replace = function(e, i) {
    var n = It(this._children, e);
    return n >= 0 && this.replaceAt(i, n), this;
  }, t.prototype.replaceAt = function(e, i) {
    var n = this._children, a = n[i];
    if (e && e !== this && e.parent !== this && e !== a) {
      n[i] = e, a.parent = null;
      var o = this.__zr;
      o && a.removeSelfFromZr(o), this._doAdd(e);
    }
    return this;
  }, t.prototype._doAdd = function(e) {
    e.parent && e.parent.remove(e), e.parent = this;
    var i = this.__zr;
    i && i !== e.__zr && e.addSelfToZr(i), i && i.refresh();
  }, t.prototype.remove = function(e) {
    var i = this.__zr, n = this._children, a = It(n, e);
    return a < 0 ? this : (n.splice(a, 1), e.parent = null, i && e.removeSelfFromZr(i), i && i.refresh(), this);
  }, t.prototype.removeAll = function() {
    for (var e = this._children, i = this.__zr, n = 0; n < e.length; n++) {
      var a = e[n];
      i && a.removeSelfFromZr(i), a.parent = null;
    }
    return e.length = 0, this;
  }, t.prototype.eachChild = function(e, i) {
    for (var n = this._children, a = 0; a < n.length; a++) {
      var o = n[a];
      e.call(i, o, a);
    }
    return this;
  }, t.prototype.traverse = function(e, i) {
    for (var n = 0; n < this._children.length; n++) {
      var a = this._children[n], o = e.call(i, a);
      a.isGroup && !o && a.traverse(e, i);
    }
    return this;
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.addSelfToZr(e);
    }
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++) {
      var n = this._children[i];
      n.removeSelfFromZr(e);
    }
  }, t.prototype.getBoundingRect = function(e) {
    for (var i = new X(0, 0, 0, 0), n = e || this._children, a = [], o = null, s = 0; s < n.length; s++) {
      var f = n[s];
      if (!(f.ignore || f.invisible)) {
        var h = f.getBoundingRect(), u = f.getLocalTransform(a);
        u ? (X.applyTransform(i, h, u), o = o || i.clone(), o.union(i)) : (o = o || h.clone(), o.union(h));
      }
    }
    return o || i;
  }, t;
}(Fi);
mr.prototype.type = "group";
var Au = { env: {} }, de = {}, Ks = {};
function Eu(r) {
  delete Ks[r];
}
function Iu(r) {
  if (!r)
    return !1;
  if (typeof r == "string")
    return pi(r, 1) < $n;
  if (r.colorStops) {
    for (var t = r.colorStops, e = 0, i = t.length, n = 0; n < i; n++)
      e += pi(t[n].color, 1);
    return e /= i, e < $n;
  }
  return !1;
}
var Ou = function() {
  function r(t, e, i) {
    var n = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, i = i || {}, this.dom = e, this.id = t;
    var a = new Gh(), o = i.renderer || "canvas";
    if (de[o] || (o = G(de)[0]), Au.env.NODE_ENV !== "production" && !de[o])
      throw new Error("Renderer '" + o + "' is not imported. Please import it first.");
    i.useDirtyRect = i.useDirtyRect == null ? !1 : i.useDirtyRect;
    var s = new de[o](e, a, i, t), f = i.ssr || s.ssrOnly;
    this.storage = a, this.painter = s;
    var h = !U.node && !U.worker && !f ? new wu(s.getViewportRoot(), s.root) : null, u = i.useCoarsePointer, v = u == null || u === "auto" ? U.touchEventsSupported : !!u, l = 44, c;
    v && (c = W(i.pointerSize, l)), this.handler = new Ds(a, s, h, s.root, c), this.animation = new cu({
      stage: {
        update: f ? null : function() {
          return n._flush(!0);
        }
      }
    }), f || this.animation.start();
  }
  return r.prototype.add = function(t) {
    this._disposed || !t || (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
  }, r.prototype.remove = function(t) {
    this._disposed || !t || (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
  }, r.prototype.configLayer = function(t, e) {
    this._disposed || (this.painter.configLayer && this.painter.configLayer(t, e), this.refresh());
  }, r.prototype.setBackgroundColor = function(t) {
    this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), this._backgroundColor = t, this._darkMode = Iu(t));
  }, r.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  }, r.prototype.setDarkMode = function(t) {
    this._darkMode = t;
  }, r.prototype.isDarkMode = function() {
    return this._darkMode;
  }, r.prototype.refreshImmediately = function(t) {
    this._disposed || (t || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1);
  }, r.prototype.refresh = function() {
    this._disposed || (this._needsRefresh = !0, this.animation.start());
  }, r.prototype.flush = function() {
    this._disposed || this._flush(!1);
  }, r.prototype._flush = function(t) {
    var e, i = Ur();
    this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, this.refreshHoverImmediately());
    var n = Ur();
    e ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: n - i
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, r.prototype.setSleepAfterStill = function(t) {
    this._sleepAfterStill = t;
  }, r.prototype.wakeUp = function() {
    this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
  }, r.prototype.refreshHover = function() {
    this._needsRefreshHover = !0;
  }, r.prototype.refreshHoverImmediately = function() {
    this._disposed || (this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.getType() === "canvas" && this.painter.refreshHover());
  }, r.prototype.resize = function(t) {
    this._disposed || (t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize());
  }, r.prototype.clearAnimation = function() {
    this._disposed || this.animation.clear();
  }, r.prototype.getWidth = function() {
    if (!this._disposed)
      return this.painter.getWidth();
  }, r.prototype.getHeight = function() {
    if (!this._disposed)
      return this.painter.getHeight();
  }, r.prototype.setCursorStyle = function(t) {
    this._disposed || this.handler.setCursorStyle(t);
  }, r.prototype.findHover = function(t, e) {
    if (!this._disposed)
      return this.handler.findHover(t, e);
  }, r.prototype.on = function(t, e, i) {
    return this._disposed || this.handler.on(t, e, i), this;
  }, r.prototype.off = function(t, e) {
    this._disposed || this.handler.off(t, e);
  }, r.prototype.trigger = function(t, e) {
    this._disposed || this.handler.trigger(t, e);
  }, r.prototype.clear = function() {
    if (!this._disposed) {
      for (var t = this.storage.getRoots(), e = 0; e < t.length; e++)
        t[e] instanceof mr && t[e].removeSelfFromZr(this);
      this.storage.delAllRoots(), this.painter.clear();
    }
  }, r.prototype.dispose = function() {
    this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, Eu(this.id));
  }, r;
}();
function Kc(r, t) {
  var e = new Ou(ms(), r, t);
  return Ks[e.id] = e, e;
}
function Jc(r, t) {
  de[r] = t;
}
var Vn;
function Fu(r) {
  if (typeof Vn == "function")
    return Vn(r);
}
function jc(r) {
  Vn = r;
}
var Zn = new Ei(50);
function Bu(r) {
  if (typeof r == "string") {
    var t = Zn.get(r);
    return t && t.image;
  } else
    return r;
}
function ga(r, t, e, i, n) {
  if (r)
    if (typeof r == "string") {
      if (t && t.__zrImageSrc === r || !e)
        return t;
      var a = Zn.get(r), o = { hostEl: e, cb: i, cbPayload: n };
      return a ? (t = a.image, !Bi(t) && a.pending.push(o)) : (t = Li.loadImage(r, ao, ao), t.__zrImageSrc = r, Zn.put(r, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return r;
  else return t;
}
function ao() {
  var r = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < r.pending.length; t++) {
    var e = r.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  r.pending.length = 0;
}
function Bi(r) {
  return r && r.width && r.height;
}
var hn = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function ku(r, t, e, i, n) {
  if (!t)
    return "";
  var a = (r + "").split(`
`);
  n = Js(t, e, i, n);
  for (var o = 0, s = a.length; o < s; o++)
    a[o] = js(a[o], n);
  return a.join(`
`);
}
function Js(r, t, e, i) {
  i = i || {};
  var n = H({}, i);
  n.font = t, e = W(e, "..."), n.maxIterations = W(i.maxIterations, 2);
  var a = n.minChar = W(i.minChar, 0);
  n.cnCharWidth = dt("国", t);
  var o = n.ascCharWidth = dt("a", t);
  n.placeholder = W(i.placeholder, "");
  for (var s = r = Math.max(0, r - 1), f = 0; f < a && s >= o; f++)
    s -= o;
  var h = dt(e, t);
  return h > s && (e = "", h = 0), s = r - h, n.ellipsis = e, n.ellipsisWidth = h, n.contentWidth = s, n.containerWidth = r, n;
}
function js(r, t) {
  var e = t.containerWidth, i = t.font, n = t.contentWidth;
  if (!e)
    return "";
  var a = dt(r, i);
  if (a <= e)
    return r;
  for (var o = 0; ; o++) {
    if (a <= n || o >= t.maxIterations) {
      r += t.ellipsis;
      break;
    }
    var s = o === 0 ? Hu(r, n, t.ascCharWidth, t.cnCharWidth) : a > 0 ? Math.floor(r.length * n / a) : 0;
    r = r.substr(0, s), a = dt(r, i);
  }
  return r === "" && (r = t.placeholder), r;
}
function Hu(r, t, e, i) {
  for (var n = 0, a = 0, o = r.length; a < o && n < t; a++) {
    var s = r.charCodeAt(a);
    n += 0 <= s && s <= 127 ? e : i;
  }
  return a;
}
function zu(r, t) {
  r != null && (r += "");
  var e = t.overflow, i = t.padding, n = t.font, a = e === "truncate", o = Oi(n), s = W(t.lineHeight, o), f = !!t.backgroundColor, h = t.lineOverflow === "truncate", u = t.width, v;
  u != null && (e === "break" || e === "breakAll") ? v = r ? tf(r, t.font, u, e === "breakAll", 0).lines : [] : v = r ? r.split(`
`) : [];
  var l = v.length * s, c = W(t.height, l);
  if (l > c && h) {
    var p = Math.floor(c / s);
    v = v.slice(0, p);
  }
  if (r && a && u != null)
    for (var g = Js(u, n, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), d = 0; d < v.length; d++)
      v[d] = js(v[d], g);
  for (var _ = c, y = 0, d = 0; d < v.length; d++)
    y = Math.max(dt(v[d], n), y);
  u == null && (u = y);
  var m = y;
  return i && (_ += i[0] + i[2], m += i[1] + i[3], u += i[1] + i[3]), f && (m = u), {
    lines: v,
    height: c,
    outerWidth: m,
    outerHeight: _,
    lineHeight: s,
    calculatedLineHeight: o,
    contentWidth: y,
    contentHeight: l,
    width: u
  };
}
var Nu = /* @__PURE__ */ function() {
  function r() {
  }
  return r;
}(), oo = /* @__PURE__ */ function() {
  function r(t) {
    this.tokens = [], t && (this.tokens = t);
  }
  return r;
}(), Yu = /* @__PURE__ */ function() {
  function r() {
    this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [];
  }
  return r;
}();
function Gu(r, t) {
  var e = new Yu();
  if (r != null && (r += ""), !r)
    return e;
  for (var i = t.width, n = t.height, a = t.overflow, o = (a === "break" || a === "breakAll") && i != null ? { width: i, accumWidth: 0, breakAll: a === "breakAll" } : null, s = hn.lastIndex = 0, f; (f = hn.exec(r)) != null; ) {
    var h = f.index;
    h > s && un(e, r.substring(s, h), t, o), un(e, f[2], t, o, f[1]), s = hn.lastIndex;
  }
  s < r.length && un(e, r.substring(s, r.length), t, o);
  var u = [], v = 0, l = 0, c = t.padding, p = a === "truncate", g = t.lineOverflow === "truncate";
  function d(N, j, q) {
    N.width = j, N.lineHeight = q, v += q, l = Math.max(l, j);
  }
  t: for (var _ = 0; _ < e.lines.length; _++) {
    for (var y = e.lines[_], m = 0, T = 0, b = 0; b < y.tokens.length; b++) {
      var w = y.tokens[b], S = w.styleName && t.rich[w.styleName] || {}, C = w.textPadding = S.padding, M = C ? C[1] + C[3] : 0, P = w.font = S.font || t.font;
      w.contentHeight = Oi(P);
      var L = W(S.height, w.contentHeight);
      if (w.innerHeight = L, C && (L += C[0] + C[2]), w.height = L, w.lineHeight = ai(S.lineHeight, t.lineHeight, L), w.align = S && S.align || t.align, w.verticalAlign = S && S.verticalAlign || "middle", g && n != null && v + w.lineHeight > n) {
        b > 0 ? (y.tokens = y.tokens.slice(0, b), d(y, T, m), e.lines = e.lines.slice(0, _ + 1)) : e.lines = e.lines.slice(0, _);
        break t;
      }
      var x = S.width, R = x == null || x === "auto";
      if (typeof x == "string" && x.charAt(x.length - 1) === "%")
        w.percentWidth = x, u.push(w), w.contentWidth = dt(w.text, P);
      else {
        if (R) {
          var D = S.backgroundColor, I = D && D.image;
          I && (I = Bu(I), Bi(I) && (w.width = Math.max(w.width, I.width * L / I.height)));
        }
        var A = p && i != null ? i - T : null;
        A != null && A < w.width ? !R || A < M ? (w.text = "", w.width = w.contentWidth = 0) : (w.text = ku(w.text, A - M, P, t.ellipsis, { minChar: t.truncateMinChar }), w.width = w.contentWidth = dt(w.text, P)) : w.contentWidth = dt(w.text, P);
      }
      w.width += M, T += w.width, S && (m = Math.max(m, w.lineHeight));
    }
    d(y, T, m);
  }
  e.outerWidth = e.width = W(i, l), e.outerHeight = e.height = W(n, v), e.contentHeight = v, e.contentWidth = l, c && (e.outerWidth += c[1] + c[3], e.outerHeight += c[0] + c[2]);
  for (var _ = 0; _ < u.length; _++) {
    var w = u[_], B = w.percentWidth;
    w.width = parseInt(B, 10) / 100 * e.width;
  }
  return e;
}
function un(r, t, e, i, n) {
  var a = t === "", o = n && e.rich[n] || {}, s = r.lines, f = o.font || e.font, h = !1, u, v;
  if (i) {
    var l = o.padding, c = l ? l[1] + l[3] : 0;
    if (o.width != null && o.width !== "auto") {
      var p = Le(o.width, i.width) + c;
      s.length > 0 && p + i.accumWidth > i.width && (u = t.split(`
`), h = !0), i.accumWidth = p;
    } else {
      var g = tf(t, f, i.width, i.breakAll, i.accumWidth);
      i.accumWidth = g.accumWidth + c, v = g.linesWidths, u = g.lines;
    }
  } else
    u = t.split(`
`);
  for (var d = 0; d < u.length; d++) {
    var _ = u[d], y = new Nu();
    if (y.styleName = n, y.text = _, y.isLineHolder = !_ && !a, typeof o.width == "number" ? y.width = o.width : y.width = v ? v[d] : dt(_, f), !d && !h) {
      var m = (s[s.length - 1] || (s[0] = new oo())).tokens, T = m.length;
      T === 1 && m[0].isLineHolder ? m[0] = y : (_ || !T || a) && m.push(y);
    } else
      s.push(new oo([y]));
  }
}
function Xu(r) {
  var t = r.charCodeAt(0);
  return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var Uu = Ri(",&?/;] ".split(""), function(r, t) {
  return r[t] = !0, r;
}, {});
function $u(r) {
  return Xu(r) ? !!Uu[r] : !0;
}
function tf(r, t, e, i, n) {
  for (var a = [], o = [], s = "", f = "", h = 0, u = 0, v = 0; v < r.length; v++) {
    var l = r.charAt(v);
    if (l === `
`) {
      f && (s += f, u += h), a.push(s), o.push(u), s = "", f = "", h = 0, u = 0;
      continue;
    }
    var c = dt(l, t), p = i ? !1 : !$u(l);
    if (a.length ? u + c > e : n + u + c > e) {
      u ? (s || f) && (p ? (s || (s = f, f = "", h = 0, u = h), a.push(s), o.push(u - h), f += l, h += c, s = "", u = h) : (f && (s += f, f = "", h = 0), a.push(s), o.push(u), s = l, u = c)) : p ? (a.push(f), o.push(h), f = l, h = c) : (a.push(l), o.push(c));
      continue;
    }
    u += c, p ? (f += l, h += c) : (f && (s += f, f = "", h = 0), s += l);
  }
  return !a.length && !s && (s = r, f = "", h = 0), f && (s += f), s && (a.push(s), o.push(u)), a.length === 1 && (u += n), {
    accumWidth: u,
    lines: a,
    linesWidths: o
  };
}
var Qn = "__zr_style_" + Math.round(Math.random() * 10), Pr = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, ki = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Pr[Qn] = !0;
var so = ["z", "z2", "invisible"], Wu = ["invisible"], Oe = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = G(e), n = 0; n < i.length; n++) {
      var a = i[n];
      a === "style" ? this.useStyle(e[a]) : r.prototype.attrKV.call(this, a, e[a]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(e, i, n, a) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && qu(this, e, i) || o && !o[0] && !o[3])
      return !1;
    if (n && this.__clipPaths) {
      for (var s = 0; s < this.__clipPaths.length; ++s)
        if (this.__clipPaths[s].isZeroArea())
          return !1;
    }
    if (a && this.parent)
      for (var f = this.parent; f; ) {
        if (f.ignore)
          return !1;
        f = f.parent;
      }
    return !0;
  }, t.prototype.contain = function(e, i) {
    return this.rectContain(e, i);
  }, t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.rectContain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    return a.contain(n[0], n[1]);
  }, t.prototype.getPaintRect = function() {
    var e = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var i = this.transform, n = this.getBoundingRect(), a = this.style, o = a.shadowBlur || 0, s = a.shadowOffsetX || 0, f = a.shadowOffsetY || 0;
      e = this._paintRect || (this._paintRect = new X(0, 0, 0, 0)), i ? X.applyTransform(e, n, i) : e.copy(n), (o || s || f) && (e.width += o * 2 + Math.abs(s), e.height += o * 2 + Math.abs(f), e.x = Math.min(e.x, e.x + s - o), e.y = Math.min(e.y, e.y + f - o));
      var h = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - h), e.y = Math.floor(e.y - h), e.width = Math.ceil(e.width + 1 + h * 2), e.height = Math.ceil(e.height + 1 + h * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new X(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(e) {
    return this.animate("style", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e !== "style" ? r.prototype.attrKV.call(this, e, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(e, i) {
    return typeof e == "string" ? this.style[e] = i : H(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= ve, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & ve);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~ve;
  }, t.prototype.createStyle = function(e) {
    return Ai(Pr, e);
  }, t.prototype.useStyle = function(e) {
    e[Qn] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[Qn];
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, so);
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var f = !(i && a), h;
    if (i && i.style ? o ? a ? h = i.style : (h = this._mergeStyle(this.createStyle(), n.style), this._mergeStyle(h, i.style)) : (h = this._mergeStyle(this.createStyle(), a ? this.style : n.style), this._mergeStyle(h, i.style)) : f && (h = n.style), h)
      if (o) {
        var u = this.style;
        if (this.style = this.createStyle(f ? {} : u), f)
          for (var v = G(u), l = 0; l < v.length; l++) {
            var c = v[l];
            c in h && (h[c] = h[c], this.style[c] = u[c]);
          }
        for (var p = G(h), l = 0; l < p.length; l++) {
          var c = p[l];
          this.style[c] = this.style[c];
        }
        this._transitionState(e, {
          style: h
        }, s, this.getAnimationStyleProps());
      } else
        this.useStyle(h);
    for (var g = this.__inHover ? Wu : so, l = 0; l < g.length; l++) {
      var c = g[l];
      i && i[c] != null ? this[c] = i[c] : f && n[c] != null && (this[c] = n[c]);
    }
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.style && (n = n || {}, this._mergeStyle(n, o.style));
    }
    return n && (i.style = n), i;
  }, t.prototype._mergeStyle = function(e, i) {
    return H(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return ki;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = ct | ve;
  }(), t;
}(Fi), vn = new X(0, 0, 0, 0), ln = new X(0, 0, 0, 0);
function qu(r, t, e) {
  return vn.copy(r.getBoundingRect()), r.transform && vn.applyTransform(r.transform), ln.width = t, ln.height = e, !vn.intersect(ln);
}
var ht = Math.min, ut = Math.max, cn = Math.sin, dn = Math.cos, sr = Math.PI * 2, Ve = te(), Ze = te(), Qe = te();
function rf(r, t, e) {
  if (r.length !== 0) {
    for (var i = r[0], n = i[0], a = i[0], o = i[1], s = i[1], f = 1; f < r.length; f++)
      i = r[f], n = ht(n, i[0]), a = ut(a, i[0]), o = ht(o, i[1]), s = ut(s, i[1]);
    t[0] = n, t[1] = o, e[0] = a, e[1] = s;
  }
}
function fo(r, t, e, i, n, a) {
  n[0] = ht(r, e), n[1] = ht(t, i), a[0] = ut(r, e), a[1] = ut(t, i);
}
var ho = [], uo = [];
function Vu(r, t, e, i, n, a, o, s, f, h) {
  var u = Bs, v = rt, l = u(r, e, n, o, ho);
  f[0] = 1 / 0, f[1] = 1 / 0, h[0] = -1 / 0, h[1] = -1 / 0;
  for (var c = 0; c < l; c++) {
    var p = v(r, e, n, o, ho[c]);
    f[0] = ht(p, f[0]), h[0] = ut(p, h[0]);
  }
  l = u(t, i, a, s, uo);
  for (var c = 0; c < l; c++) {
    var g = v(t, i, a, s, uo[c]);
    f[1] = ht(g, f[1]), h[1] = ut(g, h[1]);
  }
  f[0] = ht(r, f[0]), h[0] = ut(r, h[0]), f[0] = ht(o, f[0]), h[0] = ut(o, h[0]), f[1] = ht(t, f[1]), h[1] = ut(t, h[1]), f[1] = ht(s, f[1]), h[1] = ut(s, h[1]);
}
function Zu(r, t, e, i, n, a, o, s) {
  var f = ks, h = nt, u = ut(ht(f(r, e, n), 1), 0), v = ut(ht(f(t, i, a), 1), 0), l = h(r, e, n, u), c = h(t, i, a, v);
  o[0] = ht(r, n, l), o[1] = ht(t, a, c), s[0] = ut(r, n, l), s[1] = ut(t, a, c);
}
function Qu(r, t, e, i, n, a, o, s, f) {
  var h = Gr, u = Xr, v = Math.abs(n - a);
  if (v % sr < 1e-4 && v > 1e-4) {
    s[0] = r - e, s[1] = t - i, f[0] = r + e, f[1] = t + i;
    return;
  }
  if (Ve[0] = dn(n) * e + r, Ve[1] = cn(n) * i + t, Ze[0] = dn(a) * e + r, Ze[1] = cn(a) * i + t, h(s, Ve, Ze), u(f, Ve, Ze), n = n % sr, n < 0 && (n = n + sr), a = a % sr, a < 0 && (a = a + sr), n > a && !o ? a += sr : n < a && o && (n += sr), o) {
    var l = a;
    a = n, n = l;
  }
  for (var c = 0; c < a; c += Math.PI / 2)
    c > n && (Qe[0] = dn(c) * e + r, Qe[1] = cn(c) * i + t, h(s, Qe, s), u(f, Qe, f));
}
var k = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, fr = [], hr = [], Lt = [], $t = [], xt = [], Rt = [], pn = Math.min, _n = Math.max, ur = Math.cos, vr = Math.sin, Nt = Math.abs, Kn = Math.PI, qt = Kn * 2, gn = typeof Float32Array < "u", fe = [];
function yn(r) {
  var t = Math.round(r / Kn * 1e8) / 1e8;
  return t % 2 * Kn;
}
function Ku(r, t) {
  var e = yn(r[0]);
  e < 0 && (e += qt);
  var i = e - r[0], n = r[1];
  n += i, !t && n - e >= qt ? n = e + qt : t && e - n >= qt ? n = e - qt : !t && e > n ? n = e + (qt - yn(e - n)) : t && e < n && (n = e - (qt - yn(n - e))), r[0] = e, r[1] = n;
}
var tr = function() {
  function r(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return r.prototype.increaseVersion = function() {
    this._version++;
  }, r.prototype.getVersion = function() {
    return this._version;
  }, r.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Nt(i / gi / t) || 0, this._uy = Nt(i / gi / e) || 0);
  }, r.prototype.setDPR = function(t) {
    this.dpr = t;
  }, r.prototype.setContext = function(t) {
    this._ctx = t;
  }, r.prototype.getContext = function() {
    return this._ctx;
  }, r.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, r.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, r.prototype.moveTo = function(t, e) {
    return this._drawPendingPt(), this.addData(k.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, r.prototype.lineTo = function(t, e) {
    var i = Nt(t - this._xi), n = Nt(e - this._yi), a = i > this._ux || n > this._uy;
    if (this.addData(k.L, t, e), this._ctx && a && this._ctx.lineTo(t, e), a)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + n * n;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    return this._drawPendingPt(), this.addData(k.C, t, e, i, n, a, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, n, a, o), this._xi = a, this._yi = o, this;
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    return this._drawPendingPt(), this.addData(k.Q, t, e, i, n), this._ctx && this._ctx.quadraticCurveTo(t, e, i, n), this._xi = i, this._yi = n, this;
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this._drawPendingPt(), fe[0] = n, fe[1] = a, Ku(fe, o), n = fe[0], a = fe[1];
    var s = a - n;
    return this.addData(k.A, t, e, i, i, n, s, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, a, o), this._xi = ur(a) * i + t, this._yi = vr(a) * i + e, this;
  }, r.prototype.arcTo = function(t, e, i, n, a) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, n, a), this;
  }, r.prototype.rect = function(t, e, i, n) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, n), this.addData(k.R, t, e, i, n), this;
  }, r.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(k.Z);
    var t = this._ctx, e = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = e, this._yi = i, this;
  }, r.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, r.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, r.prototype.len = function() {
    return this._len;
  }, r.prototype.setData = function(t) {
    var e = t.length;
    !(this.data && this.data.length === e) && gn && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, r.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, n = this._len, a = 0; a < e; a++)
      i += t[a].len();
    gn && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
    for (var a = 0; a < e; a++)
      for (var o = t[a].data, s = 0; s < o.length; s++)
        this.data[n++] = o[s];
    this._len = n;
  }, r.prototype.addData = function(t, e, i, n, a, o, s, f, h) {
    if (this._saveData) {
      var u = this.data;
      this._len + arguments.length > u.length && (this._expandData(), u = this.data);
      for (var v = 0; v < arguments.length; v++)
        u[this._len++] = arguments[v];
    }
  }, r.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, r.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var t = [], e = 0; e < this._len; e++)
        t[e] = this.data[e];
      this.data = t;
    }
  }, r.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var t = this.data;
      t instanceof Array && (t.length = this._len, gn && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, r.prototype.getBoundingRect = function() {
    Lt[0] = Lt[1] = xt[0] = xt[1] = Number.MAX_VALUE, $t[0] = $t[1] = Rt[0] = Rt[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, n = 0, a = 0, o;
    for (o = 0; o < this._len; ) {
      var s = t[o++], f = o === 1;
      switch (f && (e = t[o], i = t[o + 1], n = e, a = i), s) {
        case k.M:
          e = n = t[o++], i = a = t[o++], xt[0] = n, xt[1] = a, Rt[0] = n, Rt[1] = a;
          break;
        case k.L:
          fo(e, i, t[o], t[o + 1], xt, Rt), e = t[o++], i = t[o++];
          break;
        case k.C:
          Vu(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], xt, Rt), e = t[o++], i = t[o++];
          break;
        case k.Q:
          Zu(e, i, t[o++], t[o++], t[o], t[o + 1], xt, Rt), e = t[o++], i = t[o++];
          break;
        case k.A:
          var h = t[o++], u = t[o++], v = t[o++], l = t[o++], c = t[o++], p = t[o++] + c;
          o += 1;
          var g = !t[o++];
          f && (n = ur(c) * v + h, a = vr(c) * l + u), Qu(h, u, v, l, c, p, g, xt, Rt), e = ur(p) * v + h, i = vr(p) * l + u;
          break;
        case k.R:
          n = e = t[o++], a = i = t[o++];
          var d = t[o++], _ = t[o++];
          fo(n, a, n + d, a + _, xt, Rt);
          break;
        case k.Z:
          e = n, i = a;
          break;
      }
      Gr(Lt, Lt, xt), Xr($t, $t, Rt);
    }
    return o === 0 && (Lt[0] = Lt[1] = $t[0] = $t[1] = 0), new X(Lt[0], Lt[1], $t[0] - Lt[0], $t[1] - Lt[1]);
  }, r.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, n = this._uy, a = 0, o = 0, s = 0, f = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var h = this._pathSegLen, u = 0, v = 0, l = 0; l < e; ) {
      var c = t[l++], p = l === 1;
      p && (a = t[l], o = t[l + 1], s = a, f = o);
      var g = -1;
      switch (c) {
        case k.M:
          a = s = t[l++], o = f = t[l++];
          break;
        case k.L: {
          var d = t[l++], _ = t[l++], y = d - a, m = _ - o;
          (Nt(y) > i || Nt(m) > n || l === e - 1) && (g = Math.sqrt(y * y + m * m), a = d, o = _);
          break;
        }
        case k.C: {
          var T = t[l++], b = t[l++], d = t[l++], _ = t[l++], w = t[l++], S = t[l++];
          g = Uh(a, o, T, b, d, _, w, S, 10), a = w, o = S;
          break;
        }
        case k.Q: {
          var T = t[l++], b = t[l++], d = t[l++], _ = t[l++];
          g = qh(a, o, T, b, d, _, 10), a = d, o = _;
          break;
        }
        case k.A:
          var C = t[l++], M = t[l++], P = t[l++], L = t[l++], x = t[l++], R = t[l++], D = R + x;
          l += 1, p && (s = ur(x) * P + C, f = vr(x) * L + M), g = _n(P, L) * pn(qt, Math.abs(R)), a = ur(D) * P + C, o = vr(D) * L + M;
          break;
        case k.R: {
          s = a = t[l++], f = o = t[l++];
          var I = t[l++], A = t[l++];
          g = I * 2 + A * 2;
          break;
        }
        case k.Z: {
          var y = s - a, m = f - o;
          g = Math.sqrt(y * y + m * m), a = s, o = f;
          break;
        }
      }
      g >= 0 && (h[v++] = g, u += g);
    }
    return this._pathLen = u, u;
  }, r.prototype.rebuildPath = function(t, e) {
    var i = this.data, n = this._ux, a = this._uy, o = this._len, s, f, h, u, v, l, c = e < 1, p, g, d = 0, _ = 0, y, m = 0, T, b;
    if (!(c && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, g = this._pathLen, y = e * g, !y)))
      t: for (var w = 0; w < o; ) {
        var S = i[w++], C = w === 1;
        switch (C && (h = i[w], u = i[w + 1], s = h, f = u), S !== k.L && m > 0 && (t.lineTo(T, b), m = 0), S) {
          case k.M:
            s = h = i[w++], f = u = i[w++], t.moveTo(h, u);
            break;
          case k.L: {
            v = i[w++], l = i[w++];
            var M = Nt(v - h), P = Nt(l - u);
            if (M > n || P > a) {
              if (c) {
                var L = p[_++];
                if (d + L > y) {
                  var x = (y - d) / L;
                  t.lineTo(h * (1 - x) + v * x, u * (1 - x) + l * x);
                  break t;
                }
                d += L;
              }
              t.lineTo(v, l), h = v, u = l, m = 0;
            } else {
              var R = M * M + P * P;
              R > m && (T = v, b = l, m = R);
            }
            break;
          }
          case k.C: {
            var D = i[w++], I = i[w++], A = i[w++], B = i[w++], N = i[w++], j = i[w++];
            if (c) {
              var L = p[_++];
              if (d + L > y) {
                var x = (y - d) / L;
                jt(h, D, A, N, x, fr), jt(u, I, B, j, x, hr), t.bezierCurveTo(fr[1], hr[1], fr[2], hr[2], fr[3], hr[3]);
                break t;
              }
              d += L;
            }
            t.bezierCurveTo(D, I, A, B, N, j), h = N, u = j;
            break;
          }
          case k.Q: {
            var D = i[w++], I = i[w++], A = i[w++], B = i[w++];
            if (c) {
              var L = p[_++];
              if (d + L > y) {
                var x = (y - d) / L;
                di(h, D, A, x, fr), di(u, I, B, x, hr), t.quadraticCurveTo(fr[1], hr[1], fr[2], hr[2]);
                break t;
              }
              d += L;
            }
            t.quadraticCurveTo(D, I, A, B), h = A, u = B;
            break;
          }
          case k.A:
            var q = i[w++], Q = i[w++], Y = i[w++], et = i[w++], tt = i[w++], pt = i[w++], kt = i[w++], Ht = !i[w++], _t = Y > et ? Y : et, K = Nt(Y - et) > 1e-3, $ = tt + pt, E = !1;
            if (c) {
              var L = p[_++];
              d + L > y && ($ = tt + pt * (y - d) / L, E = !0), d += L;
            }
            if (K && t.ellipse ? t.ellipse(q, Q, Y, et, kt, tt, $, Ht) : t.arc(q, Q, _t, tt, $, Ht), E)
              break t;
            C && (s = ur(tt) * Y + q, f = vr(tt) * et + Q), h = ur($) * Y + q, u = vr($) * et + Q;
            break;
          case k.R:
            s = h = i[w], f = u = i[w + 1], v = i[w++], l = i[w++];
            var O = i[w++], zt = i[w++];
            if (c) {
              var L = p[_++];
              if (d + L > y) {
                var st = y - d;
                t.moveTo(v, l), t.lineTo(v + pn(st, O), l), st -= O, st > 0 && t.lineTo(v + O, l + pn(st, zt)), st -= zt, st > 0 && t.lineTo(v + _n(O - st, 0), l + zt), st -= O, st > 0 && t.lineTo(v, l + _n(zt - st, 0));
                break t;
              }
              d += L;
            }
            t.rect(v, l, O, zt);
            break;
          case k.Z:
            if (c) {
              var L = p[_++];
              if (d + L > y) {
                var x = (y - d) / L;
                t.lineTo(h * (1 - x) + s * x, u * (1 - x) + f * x);
                break t;
              }
              d += L;
            }
            t.closePath(), h = s, u = f;
        }
      }
  }, r.prototype.clone = function() {
    var t = new r(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }, r.CMD = k, r.initDefaultProps = function() {
    var t = r.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  }(), r;
}();
function Ir(r, t, e, i, n, a, o) {
  if (n === 0)
    return !1;
  var s = n, f = 0, h = r;
  if (o > t + s && o > i + s || o < t - s && o < i - s || a > r + s && a > e + s || a < r - s && a < e - s)
    return !1;
  if (r !== e)
    f = (t - i) / (r - e), h = (r * i - e * t) / (r - e);
  else
    return Math.abs(a - r) <= s / 2;
  var u = f * a - o + h, v = u * u / (f * f + 1);
  return v <= s / 2 * s / 2;
}
function Ju(r, t, e, i, n, a, o, s, f, h, u) {
  if (f === 0)
    return !1;
  var v = f;
  if (u > t + v && u > i + v && u > a + v && u > s + v || u < t - v && u < i - v && u < a - v && u < s - v || h > r + v && h > e + v && h > n + v && h > o + v || h < r - v && h < e - v && h < n - v && h < o - v)
    return !1;
  var l = Xh(r, t, e, i, n, a, o, s, h, u, null);
  return l <= v / 2;
}
function ju(r, t, e, i, n, a, o, s, f) {
  if (o === 0)
    return !1;
  var h = o;
  if (f > t + h && f > i + h && f > a + h || f < t - h && f < i - h && f < a - h || s > r + h && s > e + h && s > n + h || s < r - h && s < e - h && s < n - h)
    return !1;
  var u = Wh(r, t, e, i, n, a, s, f, null);
  return u <= h / 2;
}
var vo = Math.PI * 2;
function Ke(r) {
  return r %= vo, r < 0 && (r += vo), r;
}
var he = Math.PI * 2;
function tv(r, t, e, i, n, a, o, s, f) {
  if (o === 0)
    return !1;
  var h = o;
  s -= r, f -= t;
  var u = Math.sqrt(s * s + f * f);
  if (u - h > e || u + h < e)
    return !1;
  if (Math.abs(i - n) % he < 1e-4)
    return !0;
  if (a) {
    var v = i;
    i = Ke(n), n = Ke(v);
  } else
    i = Ke(i), n = Ke(n);
  i > n && (n += he);
  var l = Math.atan2(f, s);
  return l < 0 && (l += he), l >= i && l <= n || l + he >= i && l + he <= n;
}
function Gt(r, t, e, i, n, a) {
  if (a > t && a > i || a < t && a < i || i === t)
    return 0;
  var o = (a - t) / (i - t), s = i < t ? 1 : -1;
  (o === 1 || o === 0) && (s = i < t ? 0.5 : -0.5);
  var f = o * (e - r) + r;
  return f === n ? 1 / 0 : f > n ? s : 0;
}
var Wt = tr.CMD, lr = Math.PI * 2, rv = 1e-4;
function ev(r, t) {
  return Math.abs(r - t) < rv;
}
var ot = [-1, -1, -1], mt = [-1, -1];
function iv() {
  var r = mt[0];
  mt[0] = mt[1], mt[1] = r;
}
function nv(r, t, e, i, n, a, o, s, f, h) {
  if (h > t && h > i && h > a && h > s || h < t && h < i && h < a && h < s)
    return 0;
  var u = Fs(t, i, a, s, h, ot);
  if (u === 0)
    return 0;
  for (var v = 0, l = -1, c = void 0, p = void 0, g = 0; g < u; g++) {
    var d = ot[g], _ = d === 0 || d === 1 ? 0.5 : 1, y = rt(r, e, n, o, d);
    y < f || (l < 0 && (l = Bs(t, i, a, s, mt), mt[1] < mt[0] && l > 1 && iv(), c = rt(t, i, a, s, mt[0]), l > 1 && (p = rt(t, i, a, s, mt[1]))), l === 2 ? d < mt[0] ? v += c < t ? _ : -_ : d < mt[1] ? v += p < c ? _ : -_ : v += s < p ? _ : -_ : d < mt[0] ? v += c < t ? _ : -_ : v += s < c ? _ : -_);
  }
  return v;
}
function av(r, t, e, i, n, a, o, s) {
  if (s > t && s > i && s > a || s < t && s < i && s < a)
    return 0;
  var f = $h(t, i, a, s, ot);
  if (f === 0)
    return 0;
  var h = ks(t, i, a);
  if (h >= 0 && h <= 1) {
    for (var u = 0, v = nt(t, i, a, h), l = 0; l < f; l++) {
      var c = ot[l] === 0 || ot[l] === 1 ? 0.5 : 1, p = nt(r, e, n, ot[l]);
      p < o || (ot[l] < h ? u += v < t ? c : -c : u += a < v ? c : -c);
    }
    return u;
  } else {
    var c = ot[0] === 0 || ot[0] === 1 ? 0.5 : 1, p = nt(r, e, n, ot[0]);
    return p < o ? 0 : a < t ? c : -c;
  }
}
function ov(r, t, e, i, n, a, o, s) {
  if (s -= t, s > e || s < -e)
    return 0;
  var f = Math.sqrt(e * e - s * s);
  ot[0] = -f, ot[1] = f;
  var h = Math.abs(i - n);
  if (h < 1e-4)
    return 0;
  if (h >= lr - 1e-4) {
    i = 0, n = lr;
    var u = a ? 1 : -1;
    return o >= ot[0] + r && o <= ot[1] + r ? u : 0;
  }
  if (i > n) {
    var v = i;
    i = n, n = v;
  }
  i < 0 && (i += lr, n += lr);
  for (var l = 0, c = 0; c < 2; c++) {
    var p = ot[c];
    if (p + r > o) {
      var g = Math.atan2(s, p), u = a ? 1 : -1;
      g < 0 && (g = lr + g), (g >= i && g <= n || g + lr >= i && g + lr <= n) && (g > Math.PI / 2 && g < Math.PI * 1.5 && (u = -u), l += u);
    }
  }
  return l;
}
function ef(r, t, e, i, n) {
  for (var a = r.data, o = r.len(), s = 0, f = 0, h = 0, u = 0, v = 0, l, c, p = 0; p < o; ) {
    var g = a[p++], d = p === 1;
    switch (g === Wt.M && p > 1 && (e || (s += Gt(f, h, u, v, i, n))), d && (f = a[p], h = a[p + 1], u = f, v = h), g) {
      case Wt.M:
        u = a[p++], v = a[p++], f = u, h = v;
        break;
      case Wt.L:
        if (e) {
          if (Ir(f, h, a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += Gt(f, h, a[p], a[p + 1], i, n) || 0;
        f = a[p++], h = a[p++];
        break;
      case Wt.C:
        if (e) {
          if (Ju(f, h, a[p++], a[p++], a[p++], a[p++], a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += nv(f, h, a[p++], a[p++], a[p++], a[p++], a[p], a[p + 1], i, n) || 0;
        f = a[p++], h = a[p++];
        break;
      case Wt.Q:
        if (e) {
          if (ju(f, h, a[p++], a[p++], a[p], a[p + 1], t, i, n))
            return !0;
        } else
          s += av(f, h, a[p++], a[p++], a[p], a[p + 1], i, n) || 0;
        f = a[p++], h = a[p++];
        break;
      case Wt.A:
        var _ = a[p++], y = a[p++], m = a[p++], T = a[p++], b = a[p++], w = a[p++];
        p += 1;
        var S = !!(1 - a[p++]);
        l = Math.cos(b) * m + _, c = Math.sin(b) * T + y, d ? (u = l, v = c) : s += Gt(f, h, l, c, i, n);
        var C = (i - _) * T / m + _;
        if (e) {
          if (tv(_, y, T, b, b + w, S, t, C, n))
            return !0;
        } else
          s += ov(_, y, T, b, b + w, S, C, n);
        f = Math.cos(b + w) * m + _, h = Math.sin(b + w) * T + y;
        break;
      case Wt.R:
        u = f = a[p++], v = h = a[p++];
        var M = a[p++], P = a[p++];
        if (l = u + M, c = v + P, e) {
          if (Ir(u, v, l, v, t, i, n) || Ir(l, v, l, c, t, i, n) || Ir(l, c, u, c, t, i, n) || Ir(u, c, u, v, t, i, n))
            return !0;
        } else
          s += Gt(l, v, l, c, i, n), s += Gt(u, c, u, v, i, n);
        break;
      case Wt.Z:
        if (e) {
          if (Ir(f, h, u, v, t, i, n))
            return !0;
        } else
          s += Gt(f, h, u, v, i, n);
        f = u, h = v;
        break;
    }
  }
  return !e && !ev(h, v) && (s += Gt(f, h, u, v, i, n) || 0), s !== 0;
}
function sv(r, t, e) {
  return ef(r, 0, !1, t, e);
}
function fv(r, t, e, i) {
  return ef(r, t, !0, e, i);
}
var yi = Tt({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, Pr), hv = {
  style: Tt({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, ki.style)
}, mn = Pe.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), Z = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.update = function() {
    var e = this;
    r.prototype.update.call(this);
    var i = this.style;
    if (i.decal) {
      var n = this._decalEl = this._decalEl || new t();
      n.buildPath === t.prototype.buildPath && (n.buildPath = function(f) {
        e.buildPath(f, e.shape);
      }), n.silent = !0;
      var a = n.style;
      for (var o in i)
        a[o] !== i[o] && (a[o] = i[o]);
      a.fill = i.fill ? i.decal : null, a.decal = null, a.shadowColor = null, i.strokeFirst && (a.stroke = null);
      for (var s = 0; s < mn.length; ++s)
        n[mn[s]] = this[mn[s]];
      n.__dirty |= ct;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = G(e);
    this.shape = this.getDefaultShape();
    var n = this.getDefaultStyle();
    n && this.useStyle(n);
    for (var a = 0; a < i.length; a++) {
      var o = i[a], s = e[o];
      o === "style" ? this.style ? H(this.style, s) : this.useStyle(s) : o === "shape" ? H(this.shape, s) : r.prototype.attrKV.call(this, o, s);
    }
    this.style || this.useStyle({});
  }, t.prototype.getDefaultStyle = function() {
    return null;
  }, t.prototype.getDefaultShape = function() {
    return {};
  }, t.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, t.prototype.getInsideTextFill = function() {
    var e = this.style.fill;
    if (e !== "none") {
      if (Bt(e)) {
        var i = pi(e, 0);
        return i > 0.5 ? Wn : i > 0.2 ? Tu : qn;
      } else if (e)
        return qn;
    }
    return Wn;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (Bt(i)) {
      var n = this.__zr, a = !!(n && n.isDarkMode()), o = pi(e, 0) < $n;
      if (a === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, n) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~kr;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new tr(!1);
  }, t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return !(i == null || i === "none" || !(e.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.getBoundingRect = function() {
    var e = this._rect, i = this.style, n = !e;
    if (n) {
      var a = !1;
      this.path || (a = !0, this.createPathProxy());
      var o = this.path;
      (a || this.__dirty & kr) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
    }
    if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
      var s = this._rectStroke || (this._rectStroke = e.clone());
      if (this.__dirty || n) {
        s.copy(e);
        var f = i.strokeNoScale ? this.getLineScale() : 1, h = i.lineWidth;
        if (!this.hasFill()) {
          var u = this.strokeContainThreshold;
          h = Math.max(h, u ?? 4);
        }
        f > 1e-10 && (s.width += h / f, s.height += h / f, s.x -= h / f / 2, s.y -= h / f / 2);
      }
      return s;
    }
    return e;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect(), o = this.style;
    if (e = n[0], i = n[1], a.contain(e, i)) {
      var s = this.path;
      if (this.hasStroke()) {
        var f = o.lineWidth, h = o.strokeNoScale ? this.getLineScale() : 1;
        if (h > 1e-10 && (this.hasFill() || (f = Math.max(f, this.strokeContainThreshold)), fv(s, f / h, e, i)))
          return !0;
      }
      if (this.hasFill())
        return sv(s, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= kr, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(e) {
    return this.animate("shape", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : e === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e === "shape" ? this.setShape(i) : r.prototype.attrKV.call(this, e, i);
  }, t.prototype.setShape = function(e, i) {
    var n = this.shape;
    return n || (n = this.shape = {}), typeof e == "string" ? n[e] = i : H(n, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & kr);
  }, t.prototype.createStyle = function(e) {
    return Ai(yi, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    r.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = H({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, n, a, o, s) {
    r.prototype._applyStateObj.call(this, e, i, n, a, o, s);
    var f = !(i && a), h;
    if (i && i.shape ? o ? a ? h = i.shape : (h = H({}, n.shape), H(h, i.shape)) : (h = H({}, a ? this.shape : n.shape), H(h, i.shape)) : f && (h = n.shape), h)
      if (o) {
        this.shape = H({}, this.shape);
        for (var u = {}, v = G(h), l = 0; l < v.length; l++) {
          var c = v[l];
          typeof h[c] == "object" ? this.shape[c] = h[c] : u[c] = h[c];
        }
        this._transitionState(e, {
          shape: u
        }, s);
      } else
        this.shape = h, this.dirtyShape();
  }, t.prototype._mergeStates = function(e) {
    for (var i = r.prototype._mergeStates.call(this, e), n, a = 0; a < e.length; a++) {
      var o = e[a];
      o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
    }
    return n && (i.shape = n), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return hv;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = function(a) {
      z(o, a);
      function o(s) {
        var f = a.call(this, s) || this;
        return e.init && e.init.call(f, s), f;
      }
      return o.prototype.getDefaultStyle = function() {
        return Lr(e.style);
      }, o.prototype.getDefaultShape = function() {
        return Lr(e.shape);
      }, o;
    }(t);
    for (var n in e)
      typeof e[n] == "function" && (i.prototype[n] = e[n]);
    return i;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = ct | ve | kr;
  }(), t;
}(Oe), uv = Tt({
  strokeFirst: !0,
  font: Jt,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, yi), Jr = function(r) {
  z(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return i != null && i !== "none" && e.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(e) {
    return Ai(uv, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var n = bu(i, e.font, e.textAlign, e.textBaseline);
      if (n.x += e.x || 0, n.y += e.y || 0, this.hasStroke()) {
        var a = e.lineWidth;
        n.x -= a / 2, n.y -= a / 2, n.width += a, n.height += a;
      }
      this._rect = n;
    }
    return this._rect;
  }, t.initDefaultProps = function() {
    var e = t.prototype;
    e.dirtyRectTolerance = 10;
  }(), t;
}(Oe);
Jr.prototype.type = "tspan";
var vv = Tt({
  x: 0,
  y: 0
}, Pr), lv = {
  style: Tt({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, ki.style)
};
function cv(r) {
  return !!(r && typeof r != "string" && r.width && r.height);
}
var ee = function(r) {
  z(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return Ai(vv, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, n = i[e];
    if (n != null)
      return n;
    var a = cv(i.image) ? i.image : this.__image;
    if (!a)
      return 0;
    var o = e === "width" ? "height" : "width", s = i[o];
    return s == null ? a[e] : a[e] / a[o] * s;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return lv;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new X(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(Oe);
ee.prototype.type = "image";
function dv(r, t) {
  var e = t.x, i = t.y, n = t.width, a = t.height, o = t.r, s, f, h, u;
  n < 0 && (e = e + n, n = -n), a < 0 && (i = i + a, a = -a), typeof o == "number" ? s = f = h = u = o : o instanceof Array ? o.length === 1 ? s = f = h = u = o[0] : o.length === 2 ? (s = h = o[0], f = u = o[1]) : o.length === 3 ? (s = o[0], f = u = o[1], h = o[2]) : (s = o[0], f = o[1], h = o[2], u = o[3]) : s = f = h = u = 0;
  var v;
  s + f > n && (v = s + f, s *= n / v, f *= n / v), h + u > n && (v = h + u, h *= n / v, u *= n / v), f + h > a && (v = f + h, f *= a / v, h *= a / v), s + u > a && (v = s + u, s *= a / v, u *= a / v), r.moveTo(e + s, i), r.lineTo(e + n - f, i), f !== 0 && r.arc(e + n - f, i + f, f, -Math.PI / 2, 0), r.lineTo(e + n, i + a - h), h !== 0 && r.arc(e + n - h, i + a - h, h, 0, Math.PI / 2), r.lineTo(e + u, i + a), u !== 0 && r.arc(e + u, i + a - u, u, Math.PI / 2, Math.PI), r.lineTo(e, i + s), s !== 0 && r.arc(e + s, i + s, s, Math.PI, Math.PI * 1.5);
}
var $r = Math.round;
function pv(r, t, e) {
  if (t) {
    var i = t.x1, n = t.x2, a = t.y1, o = t.y2;
    r.x1 = i, r.x2 = n, r.y1 = a, r.y2 = o;
    var s = e && e.lineWidth;
    return s && ($r(i * 2) === $r(n * 2) && (r.x1 = r.x2 = Wr(i, s, !0)), $r(a * 2) === $r(o * 2) && (r.y1 = r.y2 = Wr(a, s, !0))), r;
  }
}
function _v(r, t, e) {
  if (t) {
    var i = t.x, n = t.y, a = t.width, o = t.height;
    r.x = i, r.y = n, r.width = a, r.height = o;
    var s = e && e.lineWidth;
    return s && (r.x = Wr(i, s, !0), r.y = Wr(n, s, !0), r.width = Math.max(Wr(i + a, s, !1) - r.x, a === 0 ? 0 : 1), r.height = Math.max(Wr(n + o, s, !1) - r.y, o === 0 ? 0 : 1)), r;
  }
}
function Wr(r, t, e) {
  if (!t)
    return r;
  var i = $r(r * 2);
  return (i + $r(t)) % 2 === 0 ? i / 2 : (i + (e ? 1 : -1)) / 2;
}
var gv = /* @__PURE__ */ function() {
  function r() {
    this.x = 0, this.y = 0, this.width = 0, this.height = 0;
  }
  return r;
}(), yv = {}, xe = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new gv();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var f = _v(yv, i, this.style);
      n = f.x, a = f.y, o = f.width, s = f.height, f.r = i.r, i = f;
    } else
      n = i.x, a = i.y, o = i.width, s = i.height;
    i.r ? dv(e, i) : e.rect(n, a, o, s);
  }, t.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  }, t;
}(Z);
xe.prototype.type = "rect";
var mv = { env: {} }, lo = {
  fill: "#000"
}, co = 2, wv = {
  style: Tt({
    fill: !0,
    stroke: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineWidth: !0,
    fontSize: !0,
    lineHeight: !0,
    width: !0,
    height: !0,
    textShadowColor: !0,
    textShadowBlur: !0,
    textShadowOffsetX: !0,
    textShadowOffsetY: !0,
    backgroundColor: !0,
    padding: !0,
    borderColor: !0,
    borderWidth: !0,
    borderRadius: !0
  }, ki.style)
}, Tv = function(r) {
  z(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.type = "text", i._children = [], i._defaultStyle = lo, i.attr(e), i;
  }
  return t.prototype.childrenRef = function() {
    return this._children;
  }, t.prototype.update = function() {
    r.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
    for (var e = 0; e < this._children.length; e++) {
      var i = this._children[e];
      i.zlevel = this.zlevel, i.z = this.z, i.z2 = this.z2, i.culling = this.culling, i.cursor = this.cursor, i.invisible = this.invisible;
    }
  }, t.prototype.updateTransform = function() {
    var e = this.innerTransformable;
    e ? (e.updateTransform(), e.transform && (this.transform = e.transform)) : r.prototype.updateTransform.call(this);
  }, t.prototype.getLocalTransform = function(e) {
    var i = this.innerTransformable;
    return i ? i.getLocalTransform(e) : r.prototype.getLocalTransform.call(this, e);
  }, t.prototype.getComputedTransform = function() {
    return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), r.prototype.getComputedTransform.call(this);
  }, t.prototype._updateSubTexts = function() {
    this._childCursor = 0, Cv(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
  }, t.prototype.addSelfToZr = function(e) {
    r.prototype.addSelfToZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = e;
  }, t.prototype.removeSelfFromZr = function(e) {
    r.prototype.removeSelfFromZr.call(this, e);
    for (var i = 0; i < this._children.length; i++)
      this._children[i].__zr = null;
  }, t.prototype.getBoundingRect = function() {
    if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
      for (var e = new X(0, 0, 0, 0), i = this._children, n = [], a = null, o = 0; o < i.length; o++) {
        var s = i[o], f = s.getBoundingRect(), h = s.getLocalTransform(n);
        h ? (e.copy(f), e.applyTransform(h), a = a || e.clone(), a.union(e)) : (a = a || f.clone(), a.union(f));
      }
      this._rect = a || e;
    }
    return this._rect;
  }, t.prototype.setDefaultTextStyle = function(e) {
    this._defaultStyle = e || lo;
  }, t.prototype.setTextContent = function(e) {
    if (mv.env.NODE_ENV !== "production")
      throw new Error("Can't attach text on another text");
  }, t.prototype._mergeStyle = function(e, i) {
    if (!i)
      return e;
    var n = i.rich, a = e.rich || n && {};
    return H(e, i), n && a ? (this._mergeRich(a, n), e.rich = a) : a && (e.rich = a), e;
  }, t.prototype._mergeRich = function(e, i) {
    for (var n = G(i), a = 0; a < n.length; a++) {
      var o = n[a];
      e[o] = e[o] || {}, H(e[o], i[o]);
    }
  }, t.prototype.getAnimationStyleProps = function() {
    return wv;
  }, t.prototype._getOrCreateChild = function(e) {
    var i = this._children[this._childCursor];
    return (!i || !(i instanceof e)) && (i = new e()), this._children[this._childCursor++] = i, i.__zr = this.__zr, i.parent = this, i;
  }, t.prototype._updatePlainTexts = function() {
    var e = this.style, i = e.font || Jt, n = e.padding, a = To(e), o = zu(a, e), s = wn(e), f = !!e.backgroundColor, h = o.outerHeight, u = o.outerWidth, v = o.contentWidth, l = o.lines, c = o.lineHeight, p = this._defaultStyle, g = e.x || 0, d = e.y || 0, _ = e.align || p.align || "left", y = e.verticalAlign || p.verticalAlign || "top", m = g, T = Hr(d, o.contentHeight, y);
    if (s || n) {
      var b = ce(g, u, _), w = Hr(d, h, y);
      s && this._renderBackground(e, e, b, w, u, h);
    }
    T += c / 2, n && (m = wo(g, _, n), y === "top" ? T += n[0] : y === "bottom" && (T -= n[2]));
    for (var S = 0, C = !1, M = mo("fill" in e ? e.fill : (C = !0, p.fill)), P = yo("stroke" in e ? e.stroke : !f && (!p.autoStroke || C) ? (S = co, p.stroke) : null), L = e.textShadowBlur > 0, x = e.width != null && (e.overflow === "truncate" || e.overflow === "break" || e.overflow === "breakAll"), R = o.calculatedLineHeight, D = 0; D < l.length; D++) {
      var I = this._getOrCreateChild(Jr), A = I.createStyle();
      I.useStyle(A), A.text = l[D], A.x = m, A.y = T, _ && (A.textAlign = _), A.textBaseline = "middle", A.opacity = e.opacity, A.strokeFirst = !0, L && (A.shadowBlur = e.textShadowBlur || 0, A.shadowColor = e.textShadowColor || "transparent", A.shadowOffsetX = e.textShadowOffsetX || 0, A.shadowOffsetY = e.textShadowOffsetY || 0), A.stroke = P, A.fill = M, P && (A.lineWidth = e.lineWidth || S, A.lineDash = e.lineDash, A.lineDashOffset = e.lineDashOffset || 0), A.font = i, _o(A, e), T += c, x && I.setBoundingRect(new X(ce(A.x, e.width, A.textAlign), Hr(A.y, R, A.textBaseline), v, R));
    }
  }, t.prototype._updateRichTexts = function() {
    var e = this.style, i = To(e), n = Gu(i, e), a = n.width, o = n.outerWidth, s = n.outerHeight, f = e.padding, h = e.x || 0, u = e.y || 0, v = this._defaultStyle, l = e.align || v.align, c = e.verticalAlign || v.verticalAlign, p = ce(h, o, l), g = Hr(u, s, c), d = p, _ = g;
    f && (d += f[3], _ += f[0]);
    var y = d + a;
    wn(e) && this._renderBackground(e, e, p, g, o, s);
    for (var m = !!e.backgroundColor, T = 0; T < n.lines.length; T++) {
      for (var b = n.lines[T], w = b.tokens, S = w.length, C = b.lineHeight, M = b.width, P = 0, L = d, x = y, R = S - 1, D = void 0; P < S && (D = w[P], !D.align || D.align === "left"); )
        this._placeToken(D, e, C, _, L, "left", m), M -= D.width, L += D.width, P++;
      for (; R >= 0 && (D = w[R], D.align === "right"); )
        this._placeToken(D, e, C, _, x, "right", m), M -= D.width, x -= D.width, R--;
      for (L += (a - (L - d) - (y - x) - M) / 2; P <= R; )
        D = w[P], this._placeToken(D, e, C, _, L + D.width / 2, "center", m), L += D.width, P++;
      _ += C;
    }
  }, t.prototype._placeToken = function(e, i, n, a, o, s, f) {
    var h = i.rich[e.styleName] || {};
    h.text = e.text;
    var u = e.verticalAlign, v = a + n / 2;
    u === "top" ? v = a + e.height / 2 : u === "bottom" && (v = a + n - e.height / 2);
    var l = !e.isLineHolder && wn(h);
    l && this._renderBackground(h, i, s === "right" ? o - e.width : s === "center" ? o - e.width / 2 : o, v - e.height / 2, e.width, e.height);
    var c = !!h.backgroundColor, p = e.textPadding;
    p && (o = wo(o, s, p), v -= e.height / 2 - p[0] - e.innerHeight / 2);
    var g = this._getOrCreateChild(Jr), d = g.createStyle();
    g.useStyle(d);
    var _ = this._defaultStyle, y = !1, m = 0, T = mo("fill" in h ? h.fill : "fill" in i ? i.fill : (y = !0, _.fill)), b = yo("stroke" in h ? h.stroke : "stroke" in i ? i.stroke : !c && !f && (!_.autoStroke || y) ? (m = co, _.stroke) : null), w = h.textShadowBlur > 0 || i.textShadowBlur > 0;
    d.text = e.text, d.x = o, d.y = v, w && (d.shadowBlur = h.textShadowBlur || i.textShadowBlur || 0, d.shadowColor = h.textShadowColor || i.textShadowColor || "transparent", d.shadowOffsetX = h.textShadowOffsetX || i.textShadowOffsetX || 0, d.shadowOffsetY = h.textShadowOffsetY || i.textShadowOffsetY || 0), d.textAlign = s, d.textBaseline = "middle", d.font = e.font || Jt, d.opacity = ai(h.opacity, i.opacity, 1), _o(d, h), b && (d.lineWidth = ai(h.lineWidth, i.lineWidth, m), d.lineDash = W(h.lineDash, i.lineDash), d.lineDashOffset = i.lineDashOffset || 0, d.stroke = b), T && (d.fill = T);
    var S = e.contentWidth, C = e.contentHeight;
    g.setBoundingRect(new X(ce(d.x, S, d.textAlign), Hr(d.y, C, d.textBaseline), S, C));
  }, t.prototype._renderBackground = function(e, i, n, a, o, s) {
    var f = e.backgroundColor, h = e.borderWidth, u = e.borderColor, v = f && f.image, l = f && !v, c = e.borderRadius, p = this, g, d;
    if (l || e.lineHeight || h && u) {
      g = this._getOrCreateChild(xe), g.useStyle(g.createStyle()), g.style.fill = null;
      var _ = g.shape;
      _.x = n, _.y = a, _.width = o, _.height = s, _.r = c, g.dirtyShape();
    }
    if (l) {
      var y = g.style;
      y.fill = f || null, y.fillOpacity = W(e.fillOpacity, 1);
    } else if (v) {
      d = this._getOrCreateChild(ee), d.onload = function() {
        p.dirtyStyle();
      };
      var m = d.style;
      m.image = f.image, m.x = n, m.y = a, m.width = o, m.height = s;
    }
    if (h && u) {
      var y = g.style;
      y.lineWidth = h, y.stroke = u, y.strokeOpacity = W(e.strokeOpacity, 1), y.lineDash = e.borderDash, y.lineDashOffset = e.borderDashOffset || 0, g.strokeContainThreshold = 0, g.hasFill() && g.hasStroke() && (y.strokeFirst = !0, y.lineWidth *= 2);
    }
    var T = (g || d).style;
    T.shadowBlur = e.shadowBlur || 0, T.shadowColor = e.shadowColor || "transparent", T.shadowOffsetX = e.shadowOffsetX || 0, T.shadowOffsetY = e.shadowOffsetY || 0, T.opacity = ai(e.opacity, i.opacity, 1);
  }, t.makeFont = function(e) {
    var i = "";
    return af(e) && (i = [
      e.fontStyle,
      e.fontWeight,
      nf(e.fontSize),
      e.fontFamily || "sans-serif"
    ].join(" ")), i && Yr(i) || e.textFont || e.font;
  }, t;
}(Oe), bv = { left: !0, right: 1, center: 1 }, Sv = { top: 1, bottom: 1, middle: 1 }, po = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function nf(r) {
  return typeof r == "string" && (r.indexOf("px") !== -1 || r.indexOf("rem") !== -1 || r.indexOf("em") !== -1) ? r : isNaN(+r) ? ha + "px" : r + "px";
}
function _o(r, t) {
  for (var e = 0; e < po.length; e++) {
    var i = po[e], n = t[i];
    n != null && (r[i] = n);
  }
}
function af(r) {
  return r.fontSize != null || r.fontFamily || r.fontWeight;
}
function Cv(r) {
  return go(r), at(r.rich, go), r;
}
function go(r) {
  if (r) {
    r.font = Tv.makeFont(r);
    var t = r.align;
    t === "middle" && (t = "center"), r.align = t == null || bv[t] ? t : "left";
    var e = r.verticalAlign;
    e === "center" && (e = "middle"), r.verticalAlign = e == null || Sv[e] ? e : "top";
    var i = r.padding;
    i && (r.padding = nh(r.padding));
  }
}
function yo(r, t) {
  return r == null || t <= 0 || r === "transparent" || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function mo(r) {
  return r == null || r === "none" ? null : r.image || r.colorStops ? "#000" : r;
}
function wo(r, t, e) {
  return t === "right" ? r - e[1] : t === "center" ? r + e[3] / 2 - e[1] / 2 : r + e[3];
}
function To(r) {
  var t = r.text;
  return t != null && (t += ""), t;
}
function wn(r) {
  return !!(r.backgroundColor || r.lineHeight || r.borderWidth && r.borderColor);
}
var Or = tr.CMD, Mv = [[], [], []], bo = Math.sqrt, Pv = Math.atan2;
function of(r, t) {
  if (t) {
    var e = r.data, i = r.len(), n, a, o, s, f, h, u = Or.M, v = Or.C, l = Or.L, c = Or.R, p = Or.A, g = Or.Q;
    for (o = 0, s = 0; o < i; ) {
      switch (n = e[o++], s = o, a = 0, n) {
        case u:
          a = 1;
          break;
        case l:
          a = 1;
          break;
        case v:
          a = 3;
          break;
        case g:
          a = 2;
          break;
        case p:
          var d = t[4], _ = t[5], y = bo(t[0] * t[0] + t[1] * t[1]), m = bo(t[2] * t[2] + t[3] * t[3]), T = Pv(-t[1] / m, t[0] / y);
          e[o] *= y, e[o++] += d, e[o] *= m, e[o++] += _, e[o++] *= y, e[o++] *= m, e[o++] += T, e[o++] += T, o += 2, s = o;
          break;
        case c:
          h[0] = e[o++], h[1] = e[o++], me(h, h, t), e[s++] = h[0], e[s++] = h[1], h[0] += e[o++], h[1] += e[o++], me(h, h, t), e[s++] = h[0], e[s++] = h[1];
      }
      for (f = 0; f < a; f++) {
        var b = Mv[f];
        b[0] = e[o++], b[1] = e[o++], me(b, b, t), e[s++] = b[0], e[s++] = b[1];
      }
    }
    r.increaseVersion();
  }
}
var Tn = Math.sqrt, Je = Math.sin, je = Math.cos, ue = Math.PI;
function So(r) {
  return Math.sqrt(r[0] * r[0] + r[1] * r[1]);
}
function Jn(r, t) {
  return (r[0] * t[0] + r[1] * t[1]) / (So(r) * So(t));
}
function Co(r, t) {
  return (r[0] * t[1] < r[1] * t[0] ? -1 : 1) * Math.acos(Jn(r, t));
}
function Mo(r, t, e, i, n, a, o, s, f, h, u) {
  var v = f * (ue / 180), l = je(v) * (r - e) / 2 + Je(v) * (t - i) / 2, c = -1 * Je(v) * (r - e) / 2 + je(v) * (t - i) / 2, p = l * l / (o * o) + c * c / (s * s);
  p > 1 && (o *= Tn(p), s *= Tn(p));
  var g = (n === a ? -1 : 1) * Tn((o * o * (s * s) - o * o * (c * c) - s * s * (l * l)) / (o * o * (c * c) + s * s * (l * l))) || 0, d = g * o * c / s, _ = g * -s * l / o, y = (r + e) / 2 + je(v) * d - Je(v) * _, m = (t + i) / 2 + Je(v) * d + je(v) * _, T = Co([1, 0], [(l - d) / o, (c - _) / s]), b = [(l - d) / o, (c - _) / s], w = [(-1 * l - d) / o, (-1 * c - _) / s], S = Co(b, w);
  if (Jn(b, w) <= -1 && (S = ue), Jn(b, w) >= 1 && (S = 0), S < 0) {
    var C = Math.round(S / ue * 1e6) / 1e6;
    S = ue * 2 + C % 2 * ue;
  }
  u.addData(h, y, m, o, s, T, S, v, a);
}
var Lv = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, xv = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Rv(r) {
  var t = new tr();
  if (!r)
    return t;
  var e = 0, i = 0, n = e, a = i, o, s = tr.CMD, f = r.match(Lv);
  if (!f)
    return t;
  for (var h = 0; h < f.length; h++) {
    for (var u = f[h], v = u.charAt(0), l = void 0, c = u.match(xv) || [], p = c.length, g = 0; g < p; g++)
      c[g] = parseFloat(c[g]);
    for (var d = 0; d < p; ) {
      var _ = void 0, y = void 0, m = void 0, T = void 0, b = void 0, w = void 0, S = void 0, C = e, M = i, P = void 0, L = void 0;
      switch (v) {
        case "l":
          e += c[d++], i += c[d++], l = s.L, t.addData(l, e, i);
          break;
        case "L":
          e = c[d++], i = c[d++], l = s.L, t.addData(l, e, i);
          break;
        case "m":
          e += c[d++], i += c[d++], l = s.M, t.addData(l, e, i), n = e, a = i, v = "l";
          break;
        case "M":
          e = c[d++], i = c[d++], l = s.M, t.addData(l, e, i), n = e, a = i, v = "L";
          break;
        case "h":
          e += c[d++], l = s.L, t.addData(l, e, i);
          break;
        case "H":
          e = c[d++], l = s.L, t.addData(l, e, i);
          break;
        case "v":
          i += c[d++], l = s.L, t.addData(l, e, i);
          break;
        case "V":
          i = c[d++], l = s.L, t.addData(l, e, i);
          break;
        case "C":
          l = s.C, t.addData(l, c[d++], c[d++], c[d++], c[d++], c[d++], c[d++]), e = c[d - 2], i = c[d - 1];
          break;
        case "c":
          l = s.C, t.addData(l, c[d++] + e, c[d++] + i, c[d++] + e, c[d++] + i, c[d++] + e, c[d++] + i), e += c[d - 2], i += c[d - 1];
          break;
        case "S":
          _ = e, y = i, P = t.len(), L = t.data, o === s.C && (_ += e - L[P - 4], y += i - L[P - 3]), l = s.C, C = c[d++], M = c[d++], e = c[d++], i = c[d++], t.addData(l, _, y, C, M, e, i);
          break;
        case "s":
          _ = e, y = i, P = t.len(), L = t.data, o === s.C && (_ += e - L[P - 4], y += i - L[P - 3]), l = s.C, C = e + c[d++], M = i + c[d++], e += c[d++], i += c[d++], t.addData(l, _, y, C, M, e, i);
          break;
        case "Q":
          C = c[d++], M = c[d++], e = c[d++], i = c[d++], l = s.Q, t.addData(l, C, M, e, i);
          break;
        case "q":
          C = c[d++] + e, M = c[d++] + i, e += c[d++], i += c[d++], l = s.Q, t.addData(l, C, M, e, i);
          break;
        case "T":
          _ = e, y = i, P = t.len(), L = t.data, o === s.Q && (_ += e - L[P - 4], y += i - L[P - 3]), e = c[d++], i = c[d++], l = s.Q, t.addData(l, _, y, e, i);
          break;
        case "t":
          _ = e, y = i, P = t.len(), L = t.data, o === s.Q && (_ += e - L[P - 4], y += i - L[P - 3]), e += c[d++], i += c[d++], l = s.Q, t.addData(l, _, y, e, i);
          break;
        case "A":
          m = c[d++], T = c[d++], b = c[d++], w = c[d++], S = c[d++], C = e, M = i, e = c[d++], i = c[d++], l = s.A, Mo(C, M, e, i, w, S, m, T, b, l, t);
          break;
        case "a":
          m = c[d++], T = c[d++], b = c[d++], w = c[d++], S = c[d++], C = e, M = i, e += c[d++], i += c[d++], l = s.A, Mo(C, M, e, i, w, S, m, T, b, l, t);
          break;
      }
    }
    (v === "z" || v === "Z") && (l = s.Z, t.addData(l), e = n, i = a), o = l;
  }
  return t.toStatic(), t;
}
var sf = function(r) {
  z(t, r);
  function t() {
    return r !== null && r.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
}(Z);
function ff(r) {
  return r.setData != null;
}
function hf(r, t) {
  var e = Rv(r), i = H({}, t);
  return i.buildPath = function(n) {
    if (ff(n)) {
      n.setData(e.data);
      var a = n.getContext();
      a && n.rebuildPath(a, 1);
    } else {
      var a = n;
      e.rebuildPath(a, 1);
    }
  }, i.applyTransform = function(n) {
    of(e, n), this.dirtyShape();
  }, i;
}
function Dv(r, t) {
  return new sf(hf(r, t));
}
function td(r, t) {
  var e = hf(r, t), i = function(n) {
    z(a, n);
    function a(o) {
      var s = n.call(this, o) || this;
      return s.applyTransform = e.applyTransform, s.buildPath = e.buildPath, s;
    }
    return a;
  }(sf);
  return i;
}
function rd(r, t) {
  for (var e = [], i = r.length, n = 0; n < i; n++) {
    var a = r[n];
    e.push(a.getUpdatedPathProxy(!0));
  }
  var o = new Z(t);
  return o.createPathProxy(), o.buildPath = function(s) {
    if (ff(s)) {
      s.appendPath(e);
      var f = s.getContext();
      f && s.rebuildPath(f, 1);
    }
  }, o;
}
function uf(r, t) {
  t = t || {};
  var e = new Z();
  return r.shape && e.setShape(r.shape), e.setStyle(r.style), t.bakeTransform ? of(e.path, r.getComputedTransform()) : t.toLocal ? e.setLocalTransform(r.getComputedTransform()) : e.copyTransform(r), e.buildPath = r.buildPath, e.applyTransform = e.applyTransform, e.z = r.z, e.z2 = r.z2, e.zlevel = r.zlevel, e;
}
var Av = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0;
  }
  return r;
}(), vf = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Av();
  }, t.prototype.buildPath = function(e, i) {
    e.moveTo(i.cx + i.r, i.cy), e.arc(i.cx, i.cy, i.r, 0, Math.PI * 2);
  }, t;
}(Z);
vf.prototype.type = "circle";
var Ev = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
  }
  return r;
}(), lf = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Ev();
  }, t.prototype.buildPath = function(e, i) {
    var n = 0.5522848, a = i.cx, o = i.cy, s = i.rx, f = i.ry, h = s * n, u = f * n;
    e.moveTo(a - s, o), e.bezierCurveTo(a - s, o - u, a - h, o - f, a, o - f), e.bezierCurveTo(a + h, o - f, a + s, o - u, a + s, o), e.bezierCurveTo(a + s, o + u, a + h, o + f, a, o + f), e.bezierCurveTo(a - h, o + f, a - s, o + u, a - s, o), e.closePath();
  }, t;
}(Z);
lf.prototype.type = "ellipse";
const Iv = lf;
var cf = Math.PI, bn = cf * 2, cr = Math.sin, Fr = Math.cos, Ov = Math.acos, it = Math.atan2, Po = Math.abs, be = Math.sqrt, pe = Math.max, Dt = Math.min, bt = 1e-4;
function Fv(r, t, e, i, n, a, o, s) {
  var f = e - r, h = i - t, u = o - n, v = s - a, l = v * f - u * h;
  if (!(l * l < bt))
    return l = (u * (t - a) - v * (r - n)) / l, [r + l * f, t + l * h];
}
function ti(r, t, e, i, n, a, o) {
  var s = r - e, f = t - i, h = (o ? a : -a) / be(s * s + f * f), u = h * f, v = -h * s, l = r + u, c = t + v, p = e + u, g = i + v, d = (l + p) / 2, _ = (c + g) / 2, y = p - l, m = g - c, T = y * y + m * m, b = n - a, w = l * g - p * c, S = (m < 0 ? -1 : 1) * be(pe(0, b * b * T - w * w)), C = (w * m - y * S) / T, M = (-w * y - m * S) / T, P = (w * m + y * S) / T, L = (-w * y + m * S) / T, x = C - d, R = M - _, D = P - d, I = L - _;
  return x * x + R * R > D * D + I * I && (C = P, M = L), {
    cx: C,
    cy: M,
    x0: -u,
    y0: -v,
    x1: C * (n / b - 1),
    y1: M * (n / b - 1)
  };
}
function Bv(r) {
  var t;
  if (Kr(r)) {
    var e = r.length;
    if (!e)
      return r;
    e === 1 ? t = [r[0], r[0], 0, 0] : e === 2 ? t = [r[0], r[0], r[1], r[1]] : e === 3 ? t = r.concat(r[2]) : t = r;
  } else
    t = [r, r, r, r];
  return t;
}
function kv(r, t) {
  var e, i = pe(t.r, 0), n = pe(t.r0 || 0, 0), a = i > 0, o = n > 0;
  if (!(!a && !o)) {
    if (a || (i = n, n = 0), n > i) {
      var s = i;
      i = n, n = s;
    }
    var f = t.startAngle, h = t.endAngle;
    if (!(isNaN(f) || isNaN(h))) {
      var u = t.cx, v = t.cy, l = !!t.clockwise, c = Po(h - f), p = c > bn && c % bn;
      if (p > bt && (c = p), !(i > bt))
        r.moveTo(u, v);
      else if (c > bn - bt)
        r.moveTo(u + i * Fr(f), v + i * cr(f)), r.arc(u, v, i, f, h, !l), n > bt && (r.moveTo(u + n * Fr(h), v + n * cr(h)), r.arc(u, v, n, h, f, l));
      else {
        var g = void 0, d = void 0, _ = void 0, y = void 0, m = void 0, T = void 0, b = void 0, w = void 0, S = void 0, C = void 0, M = void 0, P = void 0, L = void 0, x = void 0, R = void 0, D = void 0, I = i * Fr(f), A = i * cr(f), B = n * Fr(h), N = n * cr(h), j = c > bt;
        if (j) {
          var q = t.cornerRadius;
          q && (e = Bv(q), g = e[0], d = e[1], _ = e[2], y = e[3]);
          var Q = Po(i - n) / 2;
          if (m = Dt(Q, _), T = Dt(Q, y), b = Dt(Q, g), w = Dt(Q, d), M = S = pe(m, T), P = C = pe(b, w), (S > bt || C > bt) && (L = i * Fr(h), x = i * cr(h), R = n * Fr(f), D = n * cr(f), c < cf)) {
            var Y = Fv(I, A, R, D, L, x, B, N);
            if (Y) {
              var et = I - Y[0], tt = A - Y[1], pt = L - Y[0], kt = x - Y[1], Ht = 1 / cr(Ov((et * pt + tt * kt) / (be(et * et + tt * tt) * be(pt * pt + kt * kt))) / 2), _t = be(Y[0] * Y[0] + Y[1] * Y[1]);
              M = Dt(S, (i - _t) / (Ht + 1)), P = Dt(C, (n - _t) / (Ht - 1));
            }
          }
        }
        if (!j)
          r.moveTo(u + I, v + A);
        else if (M > bt) {
          var K = Dt(_, M), $ = Dt(y, M), E = ti(R, D, I, A, i, K, l), O = ti(L, x, B, N, i, $, l);
          r.moveTo(u + E.cx + E.x0, v + E.cy + E.y0), M < S && K === $ ? r.arc(u + E.cx, v + E.cy, M, it(E.y0, E.x0), it(O.y0, O.x0), !l) : (K > 0 && r.arc(u + E.cx, v + E.cy, K, it(E.y0, E.x0), it(E.y1, E.x1), !l), r.arc(u, v, i, it(E.cy + E.y1, E.cx + E.x1), it(O.cy + O.y1, O.cx + O.x1), !l), $ > 0 && r.arc(u + O.cx, v + O.cy, $, it(O.y1, O.x1), it(O.y0, O.x0), !l));
        } else
          r.moveTo(u + I, v + A), r.arc(u, v, i, f, h, !l);
        if (!(n > bt) || !j)
          r.lineTo(u + B, v + N);
        else if (P > bt) {
          var K = Dt(g, P), $ = Dt(d, P), E = ti(B, N, L, x, n, -$, l), O = ti(I, A, R, D, n, -K, l);
          r.lineTo(u + E.cx + E.x0, v + E.cy + E.y0), P < C && K === $ ? r.arc(u + E.cx, v + E.cy, P, it(E.y0, E.x0), it(O.y0, O.x0), !l) : ($ > 0 && r.arc(u + E.cx, v + E.cy, $, it(E.y0, E.x0), it(E.y1, E.x1), !l), r.arc(u, v, n, it(E.cy + E.y1, E.cx + E.x1), it(O.cy + O.y1, O.cx + O.x1), l), K > 0 && r.arc(u + O.cx, v + O.cy, K, it(O.y1, O.x1), it(O.y0, O.x0), !l));
        } else
          r.lineTo(u + B, v + N), r.arc(u, v, n, h, f, l);
      }
      r.closePath();
    }
  }
}
var Hv = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
  }
  return r;
}(), jn = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Hv();
  }, t.prototype.buildPath = function(e, i) {
    kv(e, i);
  }, t.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  }, t;
}(Z);
jn.prototype.type = "sector";
var zv = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
  }
  return r;
}(), df = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new zv();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.PI * 2;
    e.moveTo(n + i.r, a), e.arc(n, a, i.r, 0, o, !1), e.moveTo(n + i.r0, a), e.arc(n, a, i.r0, 0, o, !0);
  }, t;
}(Z);
df.prototype.type = "ring";
const ed = df;
function Nv(r, t, e, i) {
  var n = [], a = [], o = [], s = [], f, h, u, v;
  if (i) {
    u = [1 / 0, 1 / 0], v = [-1 / 0, -1 / 0];
    for (var l = 0, c = r.length; l < c; l++)
      Gr(u, u, r[l]), Xr(v, v, r[l]);
    Gr(u, u, i[0]), Xr(v, v, i[1]);
  }
  for (var l = 0, c = r.length; l < c; l++) {
    var p = r[l];
    if (e)
      f = r[l ? l - 1 : c - 1], h = r[(l + 1) % c];
    else if (l === 0 || l === c - 1) {
      n.push(fh(r[l]));
      continue;
    } else
      f = r[l - 1], h = r[l + 1];
    hh(a, h, f), Yi(a, a, t);
    var g = En(p, f), d = En(p, h), _ = g + d;
    _ !== 0 && (g /= _, d /= _), Yi(o, a, -g), Yi(s, a, d);
    var y = Ea([], p, o), m = Ea([], p, s);
    i && (Xr(y, y, u), Gr(y, y, v), Xr(m, m, u), Gr(m, m, v)), n.push(y), n.push(m);
  }
  return e && n.push(n.shift()), n;
}
function pf(r, t, e) {
  var i = t.smooth, n = t.points;
  if (n && n.length >= 2) {
    if (i) {
      var a = Nv(n, i, e, t.smoothConstraint);
      r.moveTo(n[0][0], n[0][1]);
      for (var o = n.length, s = 0; s < (e ? o : o - 1); s++) {
        var f = a[s * 2], h = a[s * 2 + 1], u = n[(s + 1) % o];
        r.bezierCurveTo(f[0], f[1], h[0], h[1], u[0], u[1]);
      }
    } else {
      r.moveTo(n[0][0], n[0][1]);
      for (var s = 1, v = n.length; s < v; s++)
        r.lineTo(n[s][0], n[s][1]);
    }
    e && r.closePath();
  }
}
var Yv = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), ya = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultShape = function() {
    return new Yv();
  }, t.prototype.buildPath = function(e, i) {
    pf(e, i, !0);
  }, t;
}(Z);
ya.prototype.type = "polygon";
var Gv = /* @__PURE__ */ function() {
  function r() {
    this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
  }
  return r;
}(), _f = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Gv();
  }, t.prototype.buildPath = function(e, i) {
    pf(e, i, !1);
  }, t;
}(Z);
_f.prototype.type = "polyline";
var Xv = {}, Uv = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
  }
  return r;
}(), gf = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new Uv();
  }, t.prototype.buildPath = function(e, i) {
    var n, a, o, s;
    if (this.subPixelOptimize) {
      var f = pv(Xv, i, this.style);
      n = f.x1, a = f.y1, o = f.x2, s = f.y2;
    } else
      n = i.x1, a = i.y1, o = i.x2, s = i.y2;
    var h = i.percent;
    h !== 0 && (e.moveTo(n, a), h < 1 && (o = n * (1 - h) + o * h, s = a * (1 - h) + s * h), e.lineTo(o, s));
  }, t.prototype.pointAt = function(e) {
    var i = this.shape;
    return [
      i.x1 * (1 - e) + i.x2 * e,
      i.y1 * (1 - e) + i.y2 * e
    ];
  }, t;
}(Z);
gf.prototype.type = "line";
var ft = [], $v = /* @__PURE__ */ function() {
  function r() {
    this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
  }
  return r;
}();
function Lo(r, t, e) {
  var i = r.cpx2, n = r.cpy2;
  return i != null || n != null ? [
    (e ? Xa : rt)(r.x1, r.cpx1, r.cpx2, r.x2, t),
    (e ? Xa : rt)(r.y1, r.cpy1, r.cpy2, r.y2, t)
  ] : [
    (e ? Ua : nt)(r.x1, r.cpx1, r.x2, t),
    (e ? Ua : nt)(r.y1, r.cpy1, r.y2, t)
  ];
}
var Wv = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new $v();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.x1, a = i.y1, o = i.x2, s = i.y2, f = i.cpx1, h = i.cpy1, u = i.cpx2, v = i.cpy2, l = i.percent;
    l !== 0 && (e.moveTo(n, a), u == null || v == null ? (l < 1 && (di(n, f, o, l, ft), f = ft[1], o = ft[2], di(a, h, s, l, ft), h = ft[1], s = ft[2]), e.quadraticCurveTo(f, h, o, s)) : (l < 1 && (jt(n, f, u, o, l, ft), f = ft[1], u = ft[2], o = ft[3], jt(a, h, v, s, l, ft), h = ft[1], v = ft[2], s = ft[3]), e.bezierCurveTo(f, h, u, v, o, s)));
  }, t.prototype.pointAt = function(e) {
    return Lo(this.shape, e, !1);
  }, t.prototype.tangentAt = function(e) {
    var i = Lo(this.shape, e, !0);
    return lh(i, i);
  }, t;
}(Z);
Wv.prototype.type = "bezier-curve";
var qv = /* @__PURE__ */ function() {
  function r() {
    this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
  }
  return r;
}(), Vv = function(r) {
  z(t, r);
  function t(e) {
    return r.call(this, e) || this;
  }
  return t.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function() {
    return new qv();
  }, t.prototype.buildPath = function(e, i) {
    var n = i.cx, a = i.cy, o = Math.max(i.r, 0), s = i.startAngle, f = i.endAngle, h = i.clockwise, u = Math.cos(s), v = Math.sin(s);
    e.moveTo(u * o + n, v * o + a), e.arc(n, a, o, s, f, !h);
  }, t;
}(Z);
Vv.prototype.type = "arc";
var Zv = function(r) {
  z(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.type = "compound", e;
  }
  return t.prototype._updatePathDirty = function() {
    for (var e = this.shape.paths, i = this.shapeChanged(), n = 0; n < e.length; n++)
      i = i || e[n].shapeChanged();
    i && this.dirtyShape();
  }, t.prototype.beforeBrush = function() {
    this._updatePathDirty();
    for (var e = this.shape.paths || [], i = this.getGlobalScale(), n = 0; n < e.length; n++)
      e[n].path || e[n].createPathProxy(), e[n].path.setScale(i[0], i[1], e[n].segmentIgnoreThreshold);
  }, t.prototype.buildPath = function(e, i) {
    for (var n = i.paths || [], a = 0; a < n.length; a++)
      n[a].buildPath(e, n[a].shape, !0);
  }, t.prototype.afterBrush = function() {
    for (var e = this.shape.paths || [], i = 0; i < e.length; i++)
      e[i].pathUpdated();
  }, t.prototype.getBoundingRect = function() {
    return this._updatePathDirty.call(this), Z.prototype.getBoundingRect.call(this);
  }, t;
}(Z);
const Qv = Zv;
var yf = function() {
  function r(t) {
    this.colorStops = t || [];
  }
  return r.prototype.addColorStop = function(t, e) {
    this.colorStops.push({
      offset: t,
      color: e
    });
  }, r;
}(), Kv = function(r) {
  z(t, r);
  function t(e, i, n, a, o, s) {
    var f = r.call(this, o) || this;
    return f.x = e ?? 0, f.y = i ?? 0, f.x2 = n ?? 1, f.y2 = a ?? 0, f.type = "linear", f.global = s || !1, f;
  }
  return t;
}(yf), Jv = function(r) {
  z(t, r);
  function t(e, i, n, a, o) {
    var s = r.call(this, a) || this;
    return s.x = e ?? 0.5, s.y = i ?? 0.5, s.r = n ?? 0.5, s.type = "radial", s.global = o || !1, s;
  }
  return t;
}(yf);
const jv = Jv;
var dr = [0, 0], pr = [0, 0], ri = new F(), ei = new F(), tl = function() {
  function r(t, e) {
    this._corners = [], this._axes = [], this._origin = [0, 0];
    for (var i = 0; i < 4; i++)
      this._corners[i] = new F();
    for (var i = 0; i < 2; i++)
      this._axes[i] = new F();
    t && this.fromBoundingRect(t, e);
  }
  return r.prototype.fromBoundingRect = function(t, e) {
    var i = this._corners, n = this._axes, a = t.x, o = t.y, s = a + t.width, f = o + t.height;
    if (i[0].set(a, o), i[1].set(s, o), i[2].set(s, f), i[3].set(a, f), e)
      for (var h = 0; h < 4; h++)
        i[h].transform(e);
    F.sub(n[0], i[1], i[0]), F.sub(n[1], i[3], i[0]), n[0].normalize(), n[1].normalize();
    for (var h = 0; h < 2; h++)
      this._origin[h] = n[h].dot(i[0]);
  }, r.prototype.intersect = function(t, e) {
    var i = !0, n = !e;
    return ri.set(1 / 0, 1 / 0), ei.set(0, 0), !this._intersectCheckOneSide(this, t, ri, ei, n, 1) && (i = !1, n) || !this._intersectCheckOneSide(t, this, ri, ei, n, -1) && (i = !1, n) || n || F.copy(e, i ? ri : ei), i;
  }, r.prototype._intersectCheckOneSide = function(t, e, i, n, a, o) {
    for (var s = !0, f = 0; f < 2; f++) {
      var h = this._axes[f];
      if (this._getProjMinMaxOnAxis(f, t._corners, dr), this._getProjMinMaxOnAxis(f, e._corners, pr), dr[1] < pr[0] || dr[0] > pr[1]) {
        if (s = !1, a)
          return s;
        var u = Math.abs(pr[0] - dr[1]), v = Math.abs(dr[0] - pr[1]);
        Math.min(u, v) > n.len() && (u < v ? F.scale(n, h, -u * o) : F.scale(n, h, v * o));
      } else if (i) {
        var u = Math.abs(pr[0] - dr[1]), v = Math.abs(dr[0] - pr[1]);
        Math.min(u, v) < i.len() && (u < v ? F.scale(i, h, u * o) : F.scale(i, h, -v * o));
      }
    }
    return s;
  }, r.prototype._getProjMinMaxOnAxis = function(t, e, i) {
    for (var n = this._axes[t], a = this._origin, o = e[0].dot(n) + a[t], s = o, f = o, h = 1; h < e.length; h++) {
      var u = e[h].dot(n) + a[t];
      s = Math.min(u, s), f = Math.max(u, f);
    }
    i[0] = s, i[1] = f;
  }, r;
}();
const id = tl;
var rl = [], el = function(r) {
  z(t, r);
  function t() {
    var e = r !== null && r.apply(this, arguments) || this;
    return e.notClear = !0, e.incremental = !0, e._displayables = [], e._temporaryDisplayables = [], e._cursor = 0, e;
  }
  return t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.useStyle = function() {
    this.style = {};
  }, t.prototype.getCursor = function() {
    return this._cursor;
  }, t.prototype.innerAfterBrush = function() {
    this._cursor = this._displayables.length;
  }, t.prototype.clearDisplaybles = function() {
    this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
  }, t.prototype.clearTemporalDisplayables = function() {
    this._temporaryDisplayables = [];
  }, t.prototype.addDisplayable = function(e, i) {
    i ? this._temporaryDisplayables.push(e) : this._displayables.push(e), this.markRedraw();
  }, t.prototype.addDisplayables = function(e, i) {
    i = i || !1;
    for (var n = 0; n < e.length; n++)
      this.addDisplayable(e[n], i);
  }, t.prototype.getDisplayables = function() {
    return this._displayables;
  }, t.prototype.getTemporalDisplayables = function() {
    return this._temporaryDisplayables;
  }, t.prototype.eachPendingDisplayable = function(e) {
    for (var i = this._cursor; i < this._displayables.length; i++)
      e && e(this._displayables[i]);
    for (var i = 0; i < this._temporaryDisplayables.length; i++)
      e && e(this._temporaryDisplayables[i]);
  }, t.prototype.update = function() {
    this.updateTransform();
    for (var e = this._cursor; e < this._displayables.length; e++) {
      var i = this._displayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
    for (var e = 0; e < this._temporaryDisplayables.length; e++) {
      var i = this._temporaryDisplayables[e];
      i.parent = this, i.update(), i.parent = null;
    }
  }, t.prototype.getBoundingRect = function() {
    if (!this._rect) {
      for (var e = new X(1 / 0, 1 / 0, -1 / 0, -1 / 0), i = 0; i < this._displayables.length; i++) {
        var n = this._displayables[i], a = n.getBoundingRect().clone();
        n.needLocalTransform() && a.applyTransform(n.getLocalTransform(rl)), e.union(a);
      }
      this._rect = e;
    }
    return this._rect;
  }, t.prototype.contain = function(e, i) {
    var n = this.transformCoordToLocal(e, i), a = this.getBoundingRect();
    if (a.contain(n[0], n[1]))
      for (var o = 0; o < this._displayables.length; o++) {
        var s = this._displayables[o];
        if (s.contain(e, i))
          return !0;
      }
    return !1;
  }, t;
}(Oe);
const nd = el;
var il = Math.round(Math.random() * 9), nl = typeof Object.defineProperty == "function", ad = function() {
  function r() {
    this._id = "__ec_inner_" + il++;
  }
  return r.prototype.get = function(t) {
    return this._guard(t)[this._id];
  }, r.prototype.set = function(t, e) {
    var i = this._guard(t);
    return nl ? Object.defineProperty(i, this._id, {
      value: e,
      enumerable: !1,
      configurable: !0
    }) : i[this._id] = e, this;
  }, r.prototype.delete = function(t) {
    return this.has(t) ? (delete this._guard(t)[this._id], !0) : !1;
  }, r.prototype.has = function(t) {
    return !!this._guard(t)[this._id];
  }, r.prototype._guard = function(t) {
    if (t !== Object(t))
      throw TypeError("Value of WeakMap is not a non-null object.");
    return t;
  }, r;
}();
function Tr(r) {
  return isFinite(r);
}
function al(r, t, e) {
  var i = t.x == null ? 0 : t.x, n = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, n = n * e.width + e.x, a = a * e.height + e.y, o = o * e.height + e.y), i = Tr(i) ? i : 0, n = Tr(n) ? n : 1, a = Tr(a) ? a : 0, o = Tr(o) ? o : 0;
  var s = r.createLinearGradient(i, a, n, o);
  return s;
}
function ol(r, t, e) {
  var i = e.width, n = e.height, a = Math.min(i, n), o = t.x == null ? 0.5 : t.x, s = t.y == null ? 0.5 : t.y, f = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, s = s * n + e.y, f = f * a), o = Tr(o) ? o : 0.5, s = Tr(s) ? s : 0.5, f = f >= 0 && Tr(f) ? f : 0.5;
  var h = r.createRadialGradient(o, s, 0, o, s, f);
  return h;
}
function ta(r, t, e) {
  for (var i = t.type === "radial" ? ol(r, t, e) : al(r, t, e), n = t.colorStops, a = 0; a < n.length; a++)
    i.addColorStop(n[a].offset, n[a].color);
  return i;
}
function sl(r, t) {
  if (r === t || !r && !t)
    return !1;
  if (!r || !t || r.length !== t.length)
    return !0;
  for (var e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !0;
  return !1;
}
function ii(r) {
  return parseInt(r, 10);
}
function qr(r, t, e) {
  var i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var s = document.defaultView.getComputedStyle(r);
  return (r[n] || ii(s[i]) || ii(r.style[i])) - (ii(s[a]) || 0) - (ii(s[o]) || 0) | 0;
}
function fl(r, t) {
  return !r || r === "solid" || !(t > 0) ? null : r === "dashed" ? [4 * t, 2 * t] : r === "dotted" ? [t] : ge(r) ? [r] : Kr(r) ? r : null;
}
function ma(r) {
  var t = r.style, e = t.lineDash && t.lineWidth > 0 && fl(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var n = t.strokeNoScale && r.getLineScale ? r.getLineScale() : 1;
    n && n !== 1 && (e = V(e, function(a) {
      return a / n;
    }), i /= n);
  }
  return [e, i];
}
var hl = new tr(!0);
function mi(r) {
  var t = r.stroke;
  return !(t == null || t === "none" || !(r.lineWidth > 0));
}
function xo(r) {
  return typeof r == "string" && r !== "none";
}
function wi(r) {
  var t = r.fill;
  return t != null && t !== "none";
}
function Ro(r, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.fillOpacity * t.opacity, r.fill(), r.globalAlpha = e;
  } else
    r.fill();
}
function Do(r, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = r.globalAlpha;
    r.globalAlpha = t.strokeOpacity * t.opacity, r.stroke(), r.globalAlpha = e;
  } else
    r.stroke();
}
function ra(r, t, e) {
  var i = ga(t.image, t.__image, e);
  if (Bi(i)) {
    var n = r.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && n && n.setTransform) {
      var a = new DOMMatrix();
      a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * oi), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), n.setTransform(a);
    }
    return n;
  }
}
function ul(r, t, e, i) {
  var n, a = mi(e), o = wi(e), s = e.strokePercent, f = s < 1, h = !t.path;
  (!t.silent || f) && h && t.createPathProxy();
  var u = t.path || hl, v = t.__dirty;
  if (!i) {
    var l = e.fill, c = e.stroke, p = o && !!l.colorStops, g = a && !!c.colorStops, d = o && !!l.image, _ = a && !!c.image, y = void 0, m = void 0, T = void 0, b = void 0, w = void 0;
    (p || g) && (w = t.getBoundingRect()), p && (y = v ? ta(r, l, w) : t.__canvasFillGradient, t.__canvasFillGradient = y), g && (m = v ? ta(r, c, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = m), d && (T = v || !t.__canvasFillPattern ? ra(r, l, t) : t.__canvasFillPattern, t.__canvasFillPattern = T), _ && (b = v || !t.__canvasStrokePattern ? ra(r, c, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = T), p ? r.fillStyle = y : d && (T ? r.fillStyle = T : o = !1), g ? r.strokeStyle = m : _ && (b ? r.strokeStyle = b : a = !1);
  }
  var S = t.getGlobalScale();
  u.setScale(S[0], S[1], t.segmentIgnoreThreshold);
  var C, M;
  r.setLineDash && e.lineDash && (n = ma(t), C = n[0], M = n[1]);
  var P = !0;
  (h || v & kr) && (u.setDPR(r.dpr), f ? u.setContext(null) : (u.setContext(r), P = !1), u.reset(), t.buildPath(u, t.shape, i), u.toStatic(), t.pathUpdated()), P && u.rebuildPath(r, f ? s : 1), C && (r.setLineDash(C), r.lineDashOffset = M), i || (e.strokeFirst ? (a && Do(r, e), o && Ro(r, e)) : (o && Ro(r, e), a && Do(r, e))), C && r.setLineDash([]);
}
function vl(r, t, e) {
  var i = t.__image = ga(e.image, t.__image, t, t.onload);
  if (!(!i || !Bi(i))) {
    var n = e.x || 0, a = e.y || 0, o = t.getWidth(), s = t.getHeight(), f = i.width / i.height;
    if (o == null && s != null ? o = s * f : s == null && o != null ? s = o / f : o == null && s == null && (o = i.width, s = i.height), e.sWidth && e.sHeight) {
      var h = e.sx || 0, u = e.sy || 0;
      r.drawImage(i, h, u, e.sWidth, e.sHeight, n, a, o, s);
    } else if (e.sx && e.sy) {
      var h = e.sx, u = e.sy, v = o - h, l = s - u;
      r.drawImage(i, h, u, v, l, n, a, o, s);
    } else
      r.drawImage(i, n, a, o, s);
  }
}
function ll(r, t, e) {
  var i, n = e.text;
  if (n != null && (n += ""), n) {
    r.font = e.font || Jt, r.textAlign = e.textAlign, r.textBaseline = e.textBaseline;
    var a = void 0, o = void 0;
    r.setLineDash && e.lineDash && (i = ma(t), a = i[0], o = i[1]), a && (r.setLineDash(a), r.lineDashOffset = o), e.strokeFirst ? (mi(e) && r.strokeText(n, e.x, e.y), wi(e) && r.fillText(n, e.x, e.y)) : (wi(e) && r.fillText(n, e.x, e.y), mi(e) && r.strokeText(n, e.x, e.y)), a && r.setLineDash([]);
  }
}
var Ao = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Eo = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function mf(r, t, e, i, n) {
  var a = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    vt(r, n), a = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    r.globalAlpha = isNaN(o) ? Pr.opacity : o;
  }
  (i || t.blend !== e.blend) && (a || (vt(r, n), a = !0), r.globalCompositeOperation = t.blend || Pr.blend);
  for (var s = 0; s < Ao.length; s++) {
    var f = Ao[s];
    (i || t[f] !== e[f]) && (a || (vt(r, n), a = !0), r[f] = r.dpr * (t[f] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (a || (vt(r, n), a = !0), r.shadowColor = t.shadowColor || Pr.shadowColor), a;
}
function Io(r, t, e, i, n) {
  var a = Re(t, n.inHover), o = i ? null : e && Re(e, n.inHover) || {};
  if (a === o)
    return !1;
  var s = mf(r, a, o, i, n);
  if ((i || a.fill !== o.fill) && (s || (vt(r, n), s = !0), xo(a.fill) && (r.fillStyle = a.fill)), (i || a.stroke !== o.stroke) && (s || (vt(r, n), s = !0), xo(a.stroke) && (r.strokeStyle = a.stroke)), (i || a.opacity !== o.opacity) && (s || (vt(r, n), s = !0), r.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
    var f = a.lineWidth, h = f / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    r.lineWidth !== h && (s || (vt(r, n), s = !0), r.lineWidth = h);
  }
  for (var u = 0; u < Eo.length; u++) {
    var v = Eo[u], l = v[0];
    (i || a[l] !== o[l]) && (s || (vt(r, n), s = !0), r[l] = a[l] || v[1]);
  }
  return s;
}
function cl(r, t, e, i, n) {
  return mf(r, Re(t, n.inHover), e && Re(e, n.inHover), i, n);
}
function wf(r, t) {
  var e = t.transform, i = r.dpr || 1;
  e ? r.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : r.setTransform(i, 0, 0, i, 0, 0);
}
function dl(r, t, e) {
  for (var i = !1, n = 0; n < r.length; n++) {
    var a = r[n];
    i = i || a.isZeroArea(), wf(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
  }
  e.allClipped = i;
}
function pl(r, t) {
  return r && t ? r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2] || r[3] !== t[3] || r[4] !== t[4] || r[5] !== t[5] : !(!r && !t);
}
var Oo = 1, Fo = 2, Bo = 3, ko = 4;
function _l(r) {
  var t = wi(r), e = mi(r);
  return !(r.lineDash || !(+t ^ +e) || t && typeof r.fill != "string" || e && typeof r.stroke != "string" || r.strokePercent < 1 || r.strokeOpacity < 1 || r.fillOpacity < 1);
}
function vt(r, t) {
  t.batchFill && r.fill(), t.batchStroke && r.stroke(), t.batchFill = "", t.batchStroke = "";
}
function Re(r, t) {
  return t && r.__hoverStyle || r.style;
}
function gl(r, t) {
  br(r, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function br(r, t, e, i) {
  var n = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~ct, t.__isRendered = !1;
    return;
  }
  var a = t.__clipPaths, o = e.prevElClipPaths, s = !1, f = !1;
  if ((!o || sl(a, o)) && (o && o.length && (vt(r, e), r.restore(), f = s = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), a && a.length && (vt(r, e), r.save(), dl(a, r, e), s = !0), e.prevElClipPaths = a), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var h = e.prevEl;
  h || (f = s = !0);
  var u = t instanceof Z && t.autoBatch && _l(t.style);
  s || pl(n, h.transform) ? (vt(r, e), wf(r, t)) : u || vt(r, e);
  var v = Re(t, e.inHover);
  t instanceof Z ? (e.lastDrawType !== Oo && (f = !0, e.lastDrawType = Oo), Io(r, t, h, f, e), (!u || !e.batchFill && !e.batchStroke) && r.beginPath(), ul(r, t, v, u), u && (e.batchFill = v.fill || "", e.batchStroke = v.stroke || "")) : t instanceof Jr ? (e.lastDrawType !== Bo && (f = !0, e.lastDrawType = Bo), Io(r, t, h, f, e), ll(r, t, v)) : t instanceof ee ? (e.lastDrawType !== Fo && (f = !0, e.lastDrawType = Fo), cl(r, t, h, f, e), vl(r, t, v)) : t.getTemporalDisplayables && (e.lastDrawType !== ko && (f = !0, e.lastDrawType = ko), yl(r, t, e)), u && i && vt(r, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function yl(r, t, e) {
  var i = t.getDisplayables(), n = t.getTemporalDisplayables();
  r.save();
  var a = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: e.viewWidth,
    viewHeight: e.viewHeight,
    inHover: e.inHover
  }, o, s;
  for (o = t.getCursor(), s = i.length; o < s; o++) {
    var f = i[o];
    f.beforeBrush && f.beforeBrush(), f.innerBeforeBrush(), br(r, f, a, o === s - 1), f.innerAfterBrush(), f.afterBrush && f.afterBrush(), a.prevEl = f;
  }
  for (var h = 0, u = n.length; h < u; h++) {
    var f = n[h];
    f.beforeBrush && f.beforeBrush(), f.innerBeforeBrush(), br(r, f, a, h === u - 1), f.innerAfterBrush(), f.afterBrush && f.afterBrush(), a.prevEl = f;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, r.restore();
}
var ml = 1e-8;
function Ho(r, t) {
  return Math.abs(r - t) < ml;
}
function od(r, t, e) {
  var i = 0, n = r[0];
  if (!n)
    return !1;
  for (var a = 1; a < r.length; a++) {
    var o = r[a];
    i += Gt(n[0], n[1], o[0], o[1], t, e), n = o;
  }
  var s = r[0];
  return (!Ho(n[0], s[0]) || !Ho(n[1], s[1])) && (i += Gt(n[0], n[1], s[0], s[1], t, e)), i !== 0;
}
var Sn = Math.sin, Cn = Math.cos, Tf = Math.PI, _r = Math.PI * 2, wl = 180 / Tf, bf = function() {
  function r() {
  }
  return r.prototype.reset = function(t) {
    this._start = !0, this._d = [], this._str = "", this._p = Math.pow(10, t || 4);
  }, r.prototype.moveTo = function(t, e) {
    this._add("M", t, e);
  }, r.prototype.lineTo = function(t, e) {
    this._add("L", t, e);
  }, r.prototype.bezierCurveTo = function(t, e, i, n, a, o) {
    this._add("C", t, e, i, n, a, o);
  }, r.prototype.quadraticCurveTo = function(t, e, i, n) {
    this._add("Q", t, e, i, n);
  }, r.prototype.arc = function(t, e, i, n, a, o) {
    this.ellipse(t, e, i, i, 0, n, a, o);
  }, r.prototype.ellipse = function(t, e, i, n, a, o, s, f) {
    var h = s - o, u = !f, v = Math.abs(h), l = Qt(v - _r) || (u ? h >= _r : -h >= _r), c = h > 0 ? h % _r : h % _r + _r, p = !1;
    l ? p = !0 : Qt(v) ? p = !1 : p = c >= Tf == !!u;
    var g = t + i * Cn(o), d = e + n * Sn(o);
    this._start && this._add("M", g, d);
    var _ = Math.round(a * wl);
    if (l) {
      var y = 1 / this._p, m = (u ? 1 : -1) * (_r - y);
      this._add("A", i, n, _, 1, +u, t + i * Cn(o + m), e + n * Sn(o + m)), y > 0.01 && this._add("A", i, n, _, 0, +u, g, d);
    } else {
      var T = t + i * Cn(s), b = e + n * Sn(s);
      this._add("A", i, n, _, +p, +u, T, b);
    }
  }, r.prototype.rect = function(t, e, i, n) {
    this._add("M", t, e), this._add("l", i, 0), this._add("l", 0, n), this._add("l", -i, 0), this._add("Z");
  }, r.prototype.closePath = function() {
    this._d.length > 0 && this._add("Z");
  }, r.prototype._add = function(t, e, i, n, a, o, s, f, h) {
    for (var u = [], v = this._p, l = 1; l < arguments.length; l++) {
      var c = arguments[l];
      if (isNaN(c)) {
        this._invalid = !0;
        return;
      }
      u.push(Math.round(c * v) / v);
    }
    this._d.push(t + u.join(" ")), this._start = t === "Z";
  }, r.prototype.generateStr = function() {
    this._str = this._invalid ? "" : this._d.join(""), this._d = [];
  }, r.prototype.getStr = function() {
    return this._str;
  }, r;
}(), wa = "none", Tl = Math.round;
function bl(r) {
  var t = r.fill;
  return t != null && t !== wa;
}
function Sl(r) {
  var t = r.stroke;
  return t != null && t !== wa;
}
var ea = ["lineCap", "miterLimit", "lineJoin"], Cl = V(ea, function(r) {
  return "stroke-" + r.toLowerCase();
});
function Ml(r, t, e, i) {
  var n = t.opacity == null ? 1 : t.opacity;
  if (e instanceof ee) {
    r("opacity", n);
    return;
  }
  if (bl(t)) {
    var a = Me(t.fill);
    r("fill", a.color);
    var o = t.fillOpacity != null ? t.fillOpacity * a.opacity * n : a.opacity * n;
    o < 1 && r("fill-opacity", o);
  } else
    r("fill", wa);
  if (Sl(t)) {
    var s = Me(t.stroke);
    r("stroke", s.color);
    var f = t.strokeNoScale ? e.getLineScale() : 1, h = f ? (t.lineWidth || 0) / f : 0, u = t.strokeOpacity != null ? t.strokeOpacity * s.opacity * n : s.opacity * n, v = t.strokeFirst;
    if (h !== 1 && r("stroke-width", h), v && r("paint-order", v ? "stroke" : "fill"), u < 1 && r("stroke-opacity", u), t.lineDash) {
      var l = ma(e), c = l[0], p = l[1];
      c && (p = Tl(p || 0), r("stroke-dasharray", c.join(",")), (p || i) && r("stroke-dashoffset", p));
    }
    for (var g = 0; g < ea.length; g++) {
      var d = ea[g];
      if (t[d] !== yi[d]) {
        var _ = t[d] || yi[d];
        _ && r(Cl[g], _);
      }
    }
  }
}
var Sf = "http://www.w3.org/2000/svg", Cf = "http://www.w3.org/1999/xlink", Pl = "http://www.w3.org/2000/xmlns/", Ll = "http://www.w3.org/XML/1998/namespace", zo = "ecmeta_";
function Mf(r) {
  return document.createElementNS(Sf, r);
}
function J(r, t, e, i, n) {
  return {
    tag: r,
    attrs: e || {},
    children: i,
    text: n,
    key: t
  };
}
function xl(r, t) {
  var e = [];
  if (t)
    for (var i in t) {
      var n = t[i], a = i;
      n !== !1 && (n !== !0 && n != null && (a += '="' + n + '"'), e.push(a));
    }
  return "<" + r + " " + e.join(" ") + ">";
}
function Rl(r) {
  return "</" + r + ">";
}
function Ta(r, t) {
  t = t || {};
  var e = t.newline ? `
` : "";
  function i(n) {
    var a = n.children, o = n.tag, s = n.attrs, f = n.text;
    return xl(o, s) + (o !== "style" ? bh(f) : f || "") + (a ? "" + e + V(a, function(h) {
      return i(h);
    }).join(e) + e : "") + Rl(o);
  }
  return i(r);
}
function Dl(r, t, e) {
  e = e || {};
  var i = e.newline ? `
` : "", n = " {" + i, a = i + "}", o = V(G(r), function(f) {
    return f + n + V(G(r[f]), function(h) {
      return h + ":" + r[f][h] + ";";
    }).join(i) + a;
  }).join(i), s = V(G(t), function(f) {
    return "@keyframes " + f + n + V(G(t[f]), function(h) {
      return h + n + V(G(t[f][h]), function(u) {
        var v = t[f][h][u];
        return u === "d" && (v = 'path("' + v + '")'), u + ":" + v + ";";
      }).join(i) + a;
    }).join(i) + a;
  }).join(i);
  return !o && !s ? "" : ["<![CDATA[", o, s, "]]>"].join(i);
}
function ia(r) {
  return {
    zrId: r,
    shadowCache: {},
    patternCache: {},
    gradientCache: {},
    clipPathCache: {},
    defs: {},
    cssNodes: {},
    cssAnims: {},
    cssStyleCache: {},
    cssAnimIdx: 0,
    shadowIdx: 0,
    gradientIdx: 0,
    patternIdx: 0,
    clipPathIdx: 0
  };
}
function No(r, t, e, i) {
  return J("svg", "root", {
    width: r,
    height: t,
    xmlns: Sf,
    "xmlns:xlink": Cf,
    version: "1.1",
    baseProfile: "full",
    viewBox: i ? "0 0 " + r + " " + t : !1
  }, e);
}
var Al = 0;
function Pf() {
  return Al++;
}
var Yo = {
  cubicIn: "0.32,0,0.67,0",
  cubicOut: "0.33,1,0.68,1",
  cubicInOut: "0.65,0,0.35,1",
  quadraticIn: "0.11,0,0.5,0",
  quadraticOut: "0.5,1,0.89,1",
  quadraticInOut: "0.45,0,0.55,1",
  quarticIn: "0.5,0,0.75,0",
  quarticOut: "0.25,1,0.5,1",
  quarticInOut: "0.76,0,0.24,1",
  quinticIn: "0.64,0,0.78,0",
  quinticOut: "0.22,1,0.36,1",
  quinticInOut: "0.83,0,0.17,1",
  sinusoidalIn: "0.12,0,0.39,0",
  sinusoidalOut: "0.61,1,0.88,1",
  sinusoidalInOut: "0.37,0,0.63,1",
  exponentialIn: "0.7,0,0.84,0",
  exponentialOut: "0.16,1,0.3,1",
  exponentialInOut: "0.87,0,0.13,1",
  circularIn: "0.55,0,1,0.45",
  circularOut: "0,0.55,0.45,1",
  circularInOut: "0.85,0,0.15,1"
}, yr = "transform-origin";
function El(r, t, e) {
  var i = H({}, r.shape);
  H(i, t), r.buildPath(e, i);
  var n = new bf();
  return n.reset(Us(r)), e.rebuildPath(n, 1), n.generateStr(), n.getStr();
}
function Il(r, t) {
  var e = t.originX, i = t.originY;
  (e || i) && (r[yr] = e + "px " + i + "px");
}
var Ol = {
  fill: "fill",
  opacity: "opacity",
  lineWidth: "stroke-width",
  lineDashOffset: "stroke-dashoffset"
};
function Lf(r, t) {
  var e = t.zrId + "-ani-" + t.cssAnimIdx++;
  return t.cssAnims[e] = r, e;
}
function Fl(r, t, e) {
  var i = r.shape.paths, n = {}, a, o;
  if (at(i, function(f) {
    var h = ia(e.zrId);
    h.animation = !0, Hi(f, {}, h, !0);
    var u = h.cssAnims, v = h.cssNodes, l = G(u), c = l.length;
    if (c) {
      o = l[c - 1];
      var p = u[o];
      for (var g in p) {
        var d = p[g];
        n[g] = n[g] || { d: "" }, n[g].d += d.d || "";
      }
      for (var _ in v) {
        var y = v[_].animation;
        y.indexOf(o) >= 0 && (a = y);
      }
    }
  }), !!a) {
    t.d = !1;
    var s = Lf(n, e);
    return a.replace(o, s);
  }
}
function Go(r) {
  return Bt(r) ? Yo[r] ? "cubic-bezier(" + Yo[r] + ")" : ca(r) ? r : "" : "";
}
function Hi(r, t, e, i) {
  var n = r.animators, a = n.length, o = [];
  if (r instanceof Qv) {
    var s = Fl(r, t, e);
    if (s)
      o.push(s);
    else if (!a)
      return;
  } else if (!a)
    return;
  for (var f = {}, h = 0; h < a; h++) {
    var u = n[h], v = [u.getMaxTime() / 1e3 + "s"], l = Go(u.getClip().easing), c = u.getDelay();
    l ? v.push(l) : v.push("linear"), c && v.push(c / 1e3 + "s"), u.getLoop() && v.push("infinite");
    var p = v.join(" ");
    f[p] = f[p] || [p, []], f[p][1].push(u);
  }
  function g(y) {
    var m = y[1], T = m.length, b = {}, w = {}, S = {}, C = "animation-timing-function";
    function M(_t, K, $) {
      for (var E = _t.getTracks(), O = _t.getMaxTime(), zt = 0; zt < E.length; zt++) {
        var st = E[zt];
        if (st.needsAnimate()) {
          var Pa = st.keyframes, Fe = st.propName;
          if ($ && (Fe = $(Fe)), Fe)
            for (var Ni = 0; Ni < Pa.length; Ni++) {
              var Be = Pa[Ni], ke = Math.round(Be.time / O * 100) + "%", La = Go(Be.easing), xa = Be.rawValue;
              (Bt(xa) || ge(xa)) && (K[ke] = K[ke] || {}, K[ke][Fe] = Be.rawValue, La && (K[ke][C] = La));
            }
        }
      }
    }
    for (var P = 0; P < T; P++) {
      var L = m[P], x = L.targetName;
      x ? x === "shape" && M(L, w) : !i && M(L, b);
    }
    for (var R in b) {
      var D = {};
      Zs(D, r), H(D, b[R]);
      var I = $s(D), A = b[R][C];
      S[R] = I ? {
        transform: I
      } : {}, Il(S[R], D), A && (S[R][C] = A);
    }
    var B, N = !0;
    for (var R in w) {
      S[R] = S[R] || {};
      var j = !B, A = w[R][C];
      j && (B = new tr());
      var q = B.len();
      B.reset(), S[R].d = El(r, w[R], B);
      var Q = B.len();
      if (!j && q !== Q) {
        N = !1;
        break;
      }
      A && (S[R][C] = A);
    }
    if (!N)
      for (var R in S)
        delete S[R].d;
    if (!i)
      for (var P = 0; P < T; P++) {
        var L = m[P], x = L.targetName;
        x === "style" && M(L, S, function(E) {
          return Ol[E];
        });
      }
    for (var Y = G(S), et = !0, tt, P = 1; P < Y.length; P++) {
      var pt = Y[P - 1], kt = Y[P];
      if (S[pt][yr] !== S[kt][yr]) {
        et = !1;
        break;
      }
      tt = S[pt][yr];
    }
    if (et && tt) {
      for (var R in S)
        S[R][yr] && delete S[R][yr];
      t[yr] = tt;
    }
    if (Rn(Y, function(_t) {
      return G(S[_t]).length > 0;
    }).length) {
      var Ht = Lf(S, e);
      return Ht + " " + y[0] + " both";
    }
  }
  for (var d in f) {
    var s = g(f[d]);
    s && o.push(s);
  }
  if (o.length) {
    var _ = e.zrId + "-cls-" + Pf();
    e.cssNodes["." + _] = {
      animation: o.join(",")
    }, t.class = _;
  }
}
function Bl(r, t, e) {
  if (!r.ignore)
    if (r.isSilent()) {
      var i = {
        "pointer-events": "none"
      };
      Xo(i, t, e);
    } else {
      var n = r.states.emphasis && r.states.emphasis.style ? r.states.emphasis.style : {}, a = n.fill;
      if (!a) {
        var o = r.style && r.style.fill, s = r.states.select && r.states.select.style && r.states.select.style.fill, f = r.currentStates.indexOf("select") >= 0 && s || o;
        f && (a = jh(f));
      }
      var h = n.lineWidth;
      if (h) {
        var u = !n.strokeNoScale && r.transform ? r.transform[0] : 1;
        h = h / u;
      }
      var i = {
        cursor: "pointer"
      };
      a && (i.fill = a), n.stroke && (i.stroke = n.stroke), h && (i["stroke-width"] = h), Xo(i, t, e);
    }
}
function Xo(r, t, e, i) {
  var n = JSON.stringify(r), a = e.cssStyleCache[n];
  a || (a = e.zrId + "-cls-" + Pf(), e.cssStyleCache[n] = a, e.cssNodes["." + a + ":hover"] = r), t.class = t.class ? t.class + " " + a : a;
}
var kl = { env: {} }, De = Math.round;
function xf(r) {
  return r && Bt(r.src);
}
function Rf(r) {
  return r && Ee(r.toDataURL);
}
function ba(r, t, e, i) {
  Ml(function(n, a) {
    var o = n === "fill" || n === "stroke";
    o && Xs(a) ? Af(t, r, n, i) : o && da(a) ? Ef(e, r, n, i) : o && a === "none" ? r[n] = "transparent" : r[n] = a;
  }, t, e, !1), Ul(e, r, i);
}
function Sa(r, t) {
  var e = Fu(t);
  e && (e.each(function(i, n) {
    i != null && (r[(zo + n).toLowerCase()] = i + "");
  }), t.isSilent() && (r[zo + "silent"] = "true"));
}
function Uo(r) {
  return Qt(r[0] - 1) && Qt(r[1]) && Qt(r[2]) && Qt(r[3] - 1);
}
function Hl(r) {
  return Qt(r[4]) && Qt(r[5]);
}
function Ca(r, t, e) {
  if (t && !(Hl(t) && Uo(t))) {
    var i = 1e4;
    r.transform = Uo(t) ? "translate(" + De(t[4] * i) / i + " " + De(t[5] * i) / i + ")" : ru(t);
  }
}
function $o(r, t, e) {
  for (var i = r.points, n = [], a = 0; a < i.length; a++)
    n.push(De(i[a][0] * e) / e), n.push(De(i[a][1] * e) / e);
  t.points = n.join(" ");
}
function Wo(r) {
  return !r.smooth;
}
function zl(r) {
  var t = V(r, function(e) {
    return typeof e == "string" ? [e, e] : e;
  });
  return function(e, i, n) {
    for (var a = 0; a < t.length; a++) {
      var o = t[a], s = e[o[0]];
      s != null && (i[o[1]] = De(s * n) / n);
    }
  };
}
var Nl = {
  circle: [zl(["cx", "cy", "r"])],
  polyline: [$o, Wo],
  polygon: [$o, Wo]
};
function Yl(r) {
  for (var t = r.animators, e = 0; e < t.length; e++)
    if (t[e].targetName === "shape")
      return !0;
  return !1;
}
function Df(r, t) {
  var e = r.style, i = r.shape, n = Nl[r.type], a = {}, o = t.animation, s = "path", f = r.style.strokePercent, h = t.compress && Us(r) || 4;
  if (n && !t.willUpdate && !(n[1] && !n[1](i)) && !(o && Yl(r)) && !(f < 1)) {
    s = r.type;
    var u = Math.pow(10, h);
    n[0](i, a, u);
  } else {
    var v = !r.path || r.shapeChanged();
    r.path || r.createPathProxy();
    var l = r.path;
    v && (l.beginPath(), r.buildPath(l, r.shape), r.pathUpdated());
    var c = l.getVersion(), p = r, g = p.__svgPathBuilder;
    (p.__svgPathVersion !== c || !g || f !== p.__svgPathStrokePercent) && (g || (g = p.__svgPathBuilder = new bf()), g.reset(h), l.rebuildPath(g, f), g.generateStr(), p.__svgPathVersion = c, p.__svgPathStrokePercent = f), a.d = g.getStr();
  }
  return Ca(a, r.transform), ba(a, e, r, t), Sa(a, r), t.animation && Hi(r, a, t), t.emphasis && Bl(r, a, t), J(s, r.id + "", a);
}
function Gl(r, t) {
  var e = r.style, i = e.image;
  if (i && !Bt(i) && (xf(i) ? i = i.src : Rf(i) && (i = i.toDataURL())), !!i) {
    var n = e.x || 0, a = e.y || 0, o = e.width, s = e.height, f = {
      href: i,
      width: o,
      height: s
    };
    return n && (f.x = n), a && (f.y = a), Ca(f, r.transform), ba(f, e, r, t), Sa(f, r), t.animation && Hi(r, f, t), J("image", r.id + "", f);
  }
}
function Xl(r, t) {
  var e = r.style, i = e.text;
  if (i != null && (i += ""), !(!i || isNaN(e.x) || isNaN(e.y))) {
    var n = e.font || Jt, a = e.x || 0, o = iu(e.y || 0, Oi(n), e.textBaseline), s = eu[e.textAlign] || e.textAlign, f = {
      "dominant-baseline": "central",
      "text-anchor": s
    };
    if (af(e)) {
      var h = "", u = e.fontStyle, v = nf(e.fontSize);
      if (!parseFloat(v))
        return;
      var l = e.fontFamily || _s, c = e.fontWeight;
      h += "font-size:" + v + ";font-family:" + l + ";", u && u !== "normal" && (h += "font-style:" + u + ";"), c && c !== "normal" && (h += "font-weight:" + c + ";"), f.style = h;
    } else
      f.style = "font: " + n;
    return i.match(/\s/) && (f["xml:space"] = "preserve"), a && (f.x = a), o && (f.y = o), Ca(f, r.transform), ba(f, e, r, t), Sa(f, r), t.animation && Hi(r, f, t), J("text", r.id + "", f, void 0, i);
  }
}
function qo(r, t) {
  if (r instanceof Z)
    return Df(r, t);
  if (r instanceof ee)
    return Gl(r, t);
  if (r instanceof Jr)
    return Xl(r, t);
}
function Ul(r, t, e) {
  var i = r.style;
  if (nu(i)) {
    var n = au(r), a = e.shadowCache, o = a[n];
    if (!o) {
      var s = r.getGlobalScale(), f = s[0], h = s[1];
      if (!f || !h)
        return;
      var u = i.shadowOffsetX || 0, v = i.shadowOffsetY || 0, l = i.shadowBlur, c = Me(i.shadowColor), p = c.opacity, g = c.color, d = l / 2 / f, _ = l / 2 / h, y = d + " " + _;
      o = e.zrId + "-s" + e.shadowIdx++, e.defs[o] = J("filter", o, {
        id: o,
        x: "-100%",
        y: "-100%",
        width: "300%",
        height: "300%"
      }, [
        J("feDropShadow", "", {
          dx: u / f,
          dy: v / h,
          stdDeviation: y,
          "flood-color": g,
          "flood-opacity": p
        })
      ]), a[n] = o;
    }
    t.filter = Ii(o);
  }
}
function Af(r, t, e, i) {
  var n = r[e], a, o = {
    gradientUnits: n.global ? "userSpaceOnUse" : "objectBoundingBox"
  };
  if (Ys(n))
    a = "linearGradient", o.x1 = n.x, o.y1 = n.y, o.x2 = n.x2, o.y2 = n.y2;
  else if (Gs(n))
    a = "radialGradient", o.cx = W(n.x, 0.5), o.cy = W(n.y, 0.5), o.r = W(n.r, 0.5);
  else {
    kl.env.NODE_ENV !== "production" && Ut("Illegal gradient type.");
    return;
  }
  for (var s = n.colorStops, f = [], h = 0, u = s.length; h < u; ++h) {
    var v = zn(s[h].offset) * 100 + "%", l = s[h].color, c = Me(l), p = c.color, g = c.opacity, d = {
      offset: v
    };
    d["stop-color"] = p, g < 1 && (d["stop-opacity"] = g), f.push(J("stop", h + "", d));
  }
  var _ = J(a, "", o, f), y = Ta(_), m = i.gradientCache, T = m[y];
  T || (T = i.zrId + "-g" + i.gradientIdx++, m[y] = T, o.id = T, i.defs[T] = J(a, T, o, f)), t[e] = Ii(T);
}
function Ef(r, t, e, i) {
  var n = r.style[e], a = r.getBoundingRect(), o = {}, s = n.repeat, f = s === "no-repeat", h = s === "repeat-x", u = s === "repeat-y", v;
  if (Ns(n)) {
    var l = n.imageWidth, c = n.imageHeight, p = void 0, g = n.image;
    if (Bt(g) ? p = g : xf(g) ? p = g.src : Rf(g) && (p = g.toDataURL()), typeof Image > "u") {
      var d = "Image width/height must been given explictly in svg-ssr renderer.";
      Aa(l, d), Aa(c, d);
    } else if (l == null || c == null) {
      var _ = function(P, L) {
        if (P) {
          var x = P.elm, R = l || L.width, D = c || L.height;
          P.tag === "pattern" && (h ? (D = 1, R /= a.width) : u && (R = 1, D /= a.height)), P.attrs.width = R, P.attrs.height = D, x && (x.setAttribute("width", R), x.setAttribute("height", D));
        }
      }, y = ga(p, null, r, function(P) {
        f || _(w, P), _(v, P);
      });
      y && y.width && y.height && (l = l || y.width, c = c || y.height);
    }
    v = J("image", "img", {
      href: p,
      width: l,
      height: c
    }), o.width = l, o.height = c;
  } else n.svgElement && (v = Lr(n.svgElement), o.width = n.svgWidth, o.height = n.svgHeight);
  if (v) {
    var m, T;
    f ? m = T = 1 : h ? (T = 1, m = o.width / a.width) : u ? (m = 1, T = o.height / a.height) : o.patternUnits = "userSpaceOnUse", m != null && !isNaN(m) && (o.width = m), T != null && !isNaN(T) && (o.height = T);
    var b = $s(n);
    b && (o.patternTransform = b);
    var w = J("pattern", "", o, [v]), S = Ta(w), C = i.patternCache, M = C[S];
    M || (M = i.zrId + "-p" + i.patternIdx++, C[S] = M, o.id = M, w = i.defs[M] = J("pattern", M, o, [v])), t[e] = Ii(M);
  }
}
function $l(r, t, e) {
  var i = e.clipPathCache, n = e.defs, a = i[r.id];
  if (!a) {
    a = e.zrId + "-c" + e.clipPathIdx++;
    var o = {
      id: a
    };
    i[r.id] = a, n[a] = J("clipPath", a, o, [Df(r, e)]);
  }
  t["clip-path"] = Ii(a);
}
function Vo(r) {
  return document.createTextNode(r);
}
function wr(r, t, e) {
  r.insertBefore(t, e);
}
function Zo(r, t) {
  r.removeChild(t);
}
function Qo(r, t) {
  r.appendChild(t);
}
function If(r) {
  return r.parentNode;
}
function Of(r) {
  return r.nextSibling;
}
function Mn(r, t) {
  r.textContent = t;
}
var Wl = { env: {} }, Ko = 58, ql = 120, Vl = J("", "");
function na(r) {
  return r === void 0;
}
function Et(r) {
  return r !== void 0;
}
function Zl(r, t, e) {
  for (var i = {}, n = t; n <= e; ++n) {
    var a = r[n].key;
    a !== void 0 && (Wl.env.NODE_ENV !== "production" && i[a] != null && console.error("Duplicate key " + a), i[a] = n);
  }
  return i;
}
function _e(r, t) {
  var e = r.key === t.key, i = r.tag === t.tag;
  return i && e;
}
function Ae(r) {
  var t, e = r.children, i = r.tag;
  if (Et(i)) {
    var n = r.elm = Mf(i);
    if (Ma(Vl, r), Kr(e))
      for (t = 0; t < e.length; ++t) {
        var a = e[t];
        a != null && Qo(n, Ae(a));
      }
    else Et(r.text) && !Xt(r.text) && Qo(n, Vo(r.text));
  } else
    r.elm = Vo(r.text);
  return r.elm;
}
function Ff(r, t, e, i, n) {
  for (; i <= n; ++i) {
    var a = e[i];
    a != null && wr(r, Ae(a), t);
  }
}
function Ti(r, t, e, i) {
  for (; e <= i; ++e) {
    var n = t[e];
    if (n != null)
      if (Et(n.tag)) {
        var a = If(n.elm);
        Zo(a, n.elm);
      } else
        Zo(r, n.elm);
  }
}
function Ma(r, t) {
  var e, i = t.elm, n = r && r.attrs || {}, a = t.attrs || {};
  if (n !== a) {
    for (e in a) {
      var o = a[e], s = n[e];
      s !== o && (o === !0 ? i.setAttribute(e, "") : o === !1 ? i.removeAttribute(e) : e === "style" ? i.style.cssText = o : e.charCodeAt(0) !== ql ? i.setAttribute(e, o) : e === "xmlns:xlink" || e === "xmlns" ? i.setAttributeNS(Pl, e, o) : e.charCodeAt(3) === Ko ? i.setAttributeNS(Ll, e, o) : e.charCodeAt(5) === Ko ? i.setAttributeNS(Cf, e, o) : i.setAttribute(e, o));
    }
    for (e in n)
      e in a || i.removeAttribute(e);
  }
}
function Ql(r, t, e) {
  for (var i = 0, n = 0, a = t.length - 1, o = t[0], s = t[a], f = e.length - 1, h = e[0], u = e[f], v, l, c, p; i <= a && n <= f; )
    o == null ? o = t[++i] : s == null ? s = t[--a] : h == null ? h = e[++n] : u == null ? u = e[--f] : _e(o, h) ? (zr(o, h), o = t[++i], h = e[++n]) : _e(s, u) ? (zr(s, u), s = t[--a], u = e[--f]) : _e(o, u) ? (zr(o, u), wr(r, o.elm, Of(s.elm)), o = t[++i], u = e[--f]) : _e(s, h) ? (zr(s, h), wr(r, s.elm, o.elm), s = t[--a], h = e[++n]) : (na(v) && (v = Zl(t, i, a)), l = v[h.key], na(l) ? wr(r, Ae(h), o.elm) : (c = t[l], c.tag !== h.tag ? wr(r, Ae(h), o.elm) : (zr(c, h), t[l] = void 0, wr(r, c.elm, o.elm))), h = e[++n]);
  (i <= a || n <= f) && (i > a ? (p = e[f + 1] == null ? null : e[f + 1].elm, Ff(r, p, e, n, f)) : Ti(r, t, i, a));
}
function zr(r, t) {
  var e = t.elm = r.elm, i = r.children, n = t.children;
  r !== t && (Ma(r, t), na(t.text) ? Et(i) && Et(n) ? i !== n && Ql(e, i, n) : Et(n) ? (Et(r.text) && Mn(e, ""), Ff(e, null, n, 0, n.length - 1)) : Et(i) ? Ti(e, i, 0, i.length - 1) : Et(r.text) && Mn(e, "") : r.text !== t.text && (Et(i) && Ti(e, i, 0, i.length - 1), Mn(e, t.text)));
}
function Kl(r, t) {
  if (_e(r, t))
    zr(r, t);
  else {
    var e = r.elm, i = If(e);
    Ae(t), i !== null && (wr(i, t.elm, Of(e)), Ti(i, [r], 0, 0));
  }
  return t;
}
var Jl = { env: {} }, jl = 0, sd = function() {
  function r(t, e, i) {
    if (this.type = "svg", this.refreshHover = Jo("refreshHover"), this.configLayer = Jo("configLayer"), this.storage = e, this._opts = i = H({}, i), this.root = t, this._id = "zr" + jl++, this._oldVNode = No(i.width, i.height), t && !i.ssr) {
      var n = this._viewport = document.createElement("div");
      n.style.cssText = "position:relative;overflow:hidden";
      var a = this._svgDom = this._oldVNode.elm = Mf("svg");
      Ma(null, this._oldVNode), n.appendChild(a), t.appendChild(n);
    }
    this.resize(i.width, i.height);
  }
  return r.prototype.getType = function() {
    return this.type;
  }, r.prototype.getViewportRoot = function() {
    return this._viewport;
  }, r.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, r.prototype.getSvgDom = function() {
    return this._svgDom;
  }, r.prototype.refresh = function() {
    if (this.root) {
      var t = this.renderToVNode({
        willUpdate: !0
      });
      t.attrs.style = "position:absolute;left:0;top:0;user-select:none", Kl(this._oldVNode, t), this._oldVNode = t;
    }
  }, r.prototype.renderOneToVNode = function(t) {
    return qo(t, ia(this._id));
  }, r.prototype.renderToVNode = function(t) {
    t = t || {};
    var e = this.storage.getDisplayList(!0), i = this._width, n = this._height, a = ia(this._id);
    a.animation = t.animation, a.willUpdate = t.willUpdate, a.compress = t.compress, a.emphasis = t.emphasis;
    var o = [], s = this._bgVNode = tc(i, n, this._backgroundColor, a);
    s && o.push(s);
    var f = t.compress ? null : this._mainVNode = J("g", "main", {}, []);
    this._paintList(e, a, f ? f.children : o), f && o.push(f);
    var h = V(G(a.defs), function(l) {
      return a.defs[l];
    });
    if (h.length && o.push(J("defs", "defs", {}, h)), t.animation) {
      var u = Dl(a.cssNodes, a.cssAnims, { newline: !0 });
      if (u) {
        var v = J("style", "stl", {}, [], u);
        o.push(v);
      }
    }
    return No(i, n, o, t.useViewBox);
  }, r.prototype.renderToString = function(t) {
    return t = t || {}, Ta(this.renderToVNode({
      animation: W(t.cssAnimation, !0),
      emphasis: W(t.cssEmphasis, !0),
      willUpdate: !1,
      compress: !0,
      useViewBox: W(t.useViewBox, !0)
    }), { newline: !0 });
  }, r.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t;
  }, r.prototype.getSvgRoot = function() {
    return this._mainVNode && this._mainVNode.elm;
  }, r.prototype._paintList = function(t, e, i) {
    for (var n = t.length, a = [], o = 0, s, f, h = 0, u = 0; u < n; u++) {
      var v = t[u];
      if (!v.invisible) {
        var l = v.__clipPaths, c = l && l.length || 0, p = f && f.length || 0, g = void 0;
        for (g = Math.max(c - 1, p - 1); g >= 0 && !(l && f && l[g] === f[g]); g--)
          ;
        for (var d = p - 1; d > g; d--)
          o--, s = a[o - 1];
        for (var _ = g + 1; _ < c; _++) {
          var y = {};
          $l(l[_], y, e);
          var m = J("g", "clip-g-" + h++, y, []);
          (s ? s.children : i).push(m), a[o++] = m, s = m;
        }
        f = l;
        var T = qo(v, e);
        T && (s ? s.children : i).push(T);
      }
    }
  }, r.prototype.resize = function(t, e) {
    var i = this._opts, n = this.root, a = this._viewport;
    if (t != null && (i.width = t), e != null && (i.height = e), n && a && (a.style.display = "none", t = qr(n, 0, i), e = qr(n, 1, i), a.style.display = ""), this._width !== t || this._height !== e) {
      if (this._width = t, this._height = e, a) {
        var o = a.style;
        o.width = t + "px", o.height = e + "px";
      }
      if (da(this._backgroundColor))
        this.refresh();
      else {
        var s = this._svgDom;
        s && (s.setAttribute("width", t), s.setAttribute("height", e));
        var f = this._bgVNode && this._bgVNode.elm;
        f && (f.setAttribute("width", t), f.setAttribute("height", e));
      }
    }
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r.prototype.dispose = function() {
    this.root && (this.root.innerHTML = ""), this._svgDom = this._viewport = this.storage = this._oldVNode = this._bgVNode = this._mainVNode = null;
  }, r.prototype.clear = function() {
    this._svgDom && (this._svgDom.innerHTML = null), this._oldVNode = null;
  }, r.prototype.toDataURL = function(t) {
    var e = this.renderToString(), i = "data:image/svg+xml;";
    return t ? (e = su(e), e && i + "base64," + e) : i + "charset=UTF-8," + encodeURIComponent(e);
  }, r;
}();
function Jo(r) {
  return function() {
    Jl.env.NODE_ENV !== "production" && Ut('In SVG mode painter not support method "' + r + '"');
  };
}
function tc(r, t, e, i) {
  var n;
  if (e && e !== "none")
    if (n = J("rect", "bg", {
      width: r,
      height: t,
      x: "0",
      y: "0"
    }), Xs(e))
      Af({ fill: e }, n.attrs, "fill", i);
    else if (da(e))
      Ef({
        style: {
          fill: e
        },
        dirty: Sr,
        getBoundingRect: function() {
          return { width: r, height: t };
        }
      }, n.attrs, "fill", i);
    else {
      var a = Me(e), o = a.color, s = a.opacity;
      n.attrs.fill = o, s < 1 && (n.attrs["fill-opacity"] = s);
    }
  return n;
}
function jo(r, t, e) {
  var i = Li.createCanvas(), n = t.getWidth(), a = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = n + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", r)), i.width = n * e, i.height = a * e, i;
}
var Pn = function(r) {
  z(t, r);
  function t(e, i, n) {
    var a = r.call(this) || this;
    a.motionBlur = !1, a.lastFrameAlpha = 0.7, a.dpr = 1, a.virtual = !1, a.config = {}, a.incremental = !1, a.zlevel = 0, a.maxRepaintRectCount = 5, a.__dirty = !0, a.__firstTimePaint = !0, a.__used = !1, a.__drawIndex = 0, a.__startIndex = 0, a.__endIndex = 0, a.__prevStartIndex = null, a.__prevEndIndex = null;
    var o;
    n = n || gi, typeof e == "string" ? o = jo(e, i, n) : Xt(e) && (o = e, e = o.id), a.id = e, a.dom = o;
    var s = o.style;
    return s && (Cs(o), o.onselectstart = function() {
      return !1;
    }, s.padding = "0", s.margin = "0", s.borderWidth = "0"), a.painter = i, a.dpr = n, a;
  }
  return t.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  }, t.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex;
  }, t.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, t.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, t.prototype.createBackBuffer = function() {
    var e = this.dpr;
    this.domBack = jo("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, n, a) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], s = this.maxRepaintRectCount, f = !1, h = new X(0, 0, 0, 0);
    function u(y) {
      if (!(!y.isFinite() || y.isZero()))
        if (o.length === 0) {
          var m = new X(0, 0, 0, 0);
          m.copy(y), o.push(m);
        } else {
          for (var T = !1, b = 1 / 0, w = 0, S = 0; S < o.length; ++S) {
            var C = o[S];
            if (C.intersect(y)) {
              var M = new X(0, 0, 0, 0);
              M.copy(C), M.union(y), o[S] = M, T = !0;
              break;
            } else if (f) {
              h.copy(y), h.union(C);
              var P = y.width * y.height, L = C.width * C.height, x = h.width * h.height, R = x - P - L;
              R < b && (b = R, w = S);
            }
          }
          if (f && (o[w].union(y), T = !0), !T) {
            var m = new X(0, 0, 0, 0);
            m.copy(y), o.push(m);
          }
          f || (f = o.length >= s);
        }
    }
    for (var v = this.__startIndex; v < this.__endIndex; ++v) {
      var l = e[v];
      if (l) {
        var c = l.shouldBePainted(n, a, !0, !0), p = l.__isRendered && (l.__dirty & ct || !c) ? l.getPrevPaintRect() : null;
        p && u(p);
        var g = c && (l.__dirty & ct || !l.__isRendered) ? l.getPaintRect() : null;
        g && u(g);
      }
    }
    for (var v = this.__prevStartIndex; v < this.__prevEndIndex; ++v) {
      var l = i[v], c = l && l.shouldBePainted(n, a, !0, !0);
      if (l && (!c || !l.__zr) && l.__isRendered) {
        var p = l.getPrevPaintRect();
        p && u(p);
      }
    }
    var d;
    do {
      d = !1;
      for (var v = 0; v < o.length; ) {
        if (o[v].isZero()) {
          o.splice(v, 1);
          continue;
        }
        for (var _ = v + 1; _ < o.length; )
          o[v].intersect(o[_]) ? (d = !0, o[v].union(o[_]), o.splice(_, 1)) : _++;
        v++;
      }
    } while (d);
    return this._paintRects = o, o;
  }, t.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  }, t.prototype.resize = function(e, i) {
    var n = this.dpr, a = this.dom, o = a.style, s = this.domBack;
    o && (o.width = e + "px", o.height = i + "px"), a.width = e * n, a.height = i * n, s && (s.width = e * n, s.height = i * n, n !== 1 && this.ctxBack.scale(n, n));
  }, t.prototype.clear = function(e, i, n) {
    var a = this.dom, o = this.ctx, s = a.width, f = a.height;
    i = i || this.clearColor;
    var h = this.motionBlur && !e, u = this.lastFrameAlpha, v = this.dpr, l = this;
    h && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(a, 0, 0, s / v, f / v));
    var c = this.domBack;
    function p(g, d, _, y) {
      if (o.clearRect(g, d, _, y), i && i !== "transparent") {
        var m = void 0;
        if (Di(i)) {
          var T = i.global || i.__width === _ && i.__height === y;
          m = T && i.__canvasGradient || ta(o, i, {
            x: 0,
            y: 0,
            width: _,
            height: y
          }), i.__canvasGradient = m, i.__width = _, i.__height = y;
        } else eh(i) && (i.scaleX = i.scaleX || v, i.scaleY = i.scaleY || v, m = ra(o, i, {
          dirty: function() {
            l.setUnpainted(), l.painter.refresh();
          }
        }));
        o.save(), o.fillStyle = m || i, o.fillRect(g, d, _, y), o.restore();
      }
      h && (o.save(), o.globalAlpha = u, o.drawImage(c, g, d, _, y), o.restore());
    }
    !n || h ? p(0, 0, s, f) : n.length && at(n, function(g) {
      p(g.x * v, g.y * v, g.width * v, g.height * v);
    });
  }, t;
}(re), ts = { env: {} }, rs = 1e5, gr = 314159, ni = 0.01, rc = 1e-3;
function ec(r) {
  return r ? r.__builtin__ ? !0 : !(typeof r.resize != "function" || typeof r.refresh != "function") : !1;
}
function ic(r, t) {
  var e = document.createElement("div");
  return e.style.cssText = [
    "position:relative",
    "width:" + r + "px",
    "height:" + t + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", e;
}
var fd = function() {
  function r(t, e, i, n) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var a = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = H({}, i || {}), this.dpr = i.devicePixelRatio || gi, this._singleCanvas = a, this.root = t;
    var o = t.style;
    o && (Cs(t), t.innerHTML = ""), this.storage = e;
    var s = this._zlevelList;
    this._prevDisplayList = [];
    var f = this._layers;
    if (a) {
      var u = t, v = u.width, l = u.height;
      i.width != null && (v = i.width), i.height != null && (l = i.height), this.dpr = i.devicePixelRatio || 1, u.width = v * this.dpr, u.height = l * this.dpr, this._width = v, this._height = l;
      var c = new Pn(u, this, this.dpr);
      c.__builtin__ = !0, c.initContext(), f[gr] = c, c.zlevel = gr, s.push(gr), this._domRoot = t;
    } else {
      this._width = qr(t, 0, i), this._height = qr(t, 1, i);
      var h = this._domRoot = ic(this._width, this._height);
      t.appendChild(h);
    }
  }
  return r.prototype.getType = function() {
    return "canvas";
  }, r.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, r.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, r.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, r.prototype.refresh = function(t) {
    var e = this.storage.getDisplayList(!0), i = this._prevDisplayList, n = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(e, i, t, this._redrawId);
    for (var a = 0; a < n.length; a++) {
      var o = n[a], s = this._layers[o];
      if (!s.__builtin__ && s.refresh) {
        var f = a === 0 ? this._backgroundColor : null;
        s.refresh(f);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this;
  }, r.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, r.prototype._paintHoverList = function(t) {
    var e = t.length, i = this._hoverlayer;
    if (i && i.clear(), !!e) {
      for (var n = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, a, o = 0; o < e; o++) {
        var s = t[o];
        s.__inHover && (i || (i = this._hoverlayer = this.getLayer(rs)), a || (a = i.ctx, a.save()), br(a, s, n, o === e - 1));
      }
      a && a.restore();
    }
  }, r.prototype.getHoverLayer = function() {
    return this.getLayer(rs);
  }, r.prototype.paintOne = function(t, e) {
    gl(t, e);
  }, r.prototype._paintList = function(t, e, i, n) {
    if (this._redrawId === n) {
      i = i || !1, this._updateLayerStatus(t);
      var a = this._doPaintList(t, e, i), o = a.finished, s = a.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), s && this._paintHoverList(t), o)
        this.eachLayer(function(h) {
          h.afterBrush && h.afterBrush();
        });
      else {
        var f = this;
        li(function() {
          f._paintList(t, e, i, n);
        });
      }
    }
  }, r.prototype._compositeManually = function() {
    var t = this.getLayer(gr).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
      n.virtual && t.drawImage(n.dom, 0, 0, e, i);
    });
  }, r.prototype._doPaintList = function(t, e, i) {
    for (var n = this, a = [], o = this._opts.useDirtyRect, s = 0; s < this._zlevelList.length; s++) {
      var f = this._zlevelList[s], h = this._layers[f];
      h.__builtin__ && h !== this._hoverlayer && (h.__dirty || i) && a.push(h);
    }
    for (var u = !0, v = !1, l = function(g) {
      var d = a[g], _ = d.ctx, y = o && d.createRepaintRects(t, e, c._width, c._height), m = i ? d.__startIndex : d.__drawIndex, T = !i && d.incremental && Date.now, b = T && Date.now(), w = d.zlevel === c._zlevelList[0] ? c._backgroundColor : null;
      if (d.__startIndex === d.__endIndex)
        d.clear(!1, w, y);
      else if (m === d.__startIndex) {
        var S = t[m];
        (!S.incremental || !S.notClear || i) && d.clear(!1, w, y);
      }
      m === -1 && (console.error("For some unknown reason. drawIndex is -1"), m = d.__startIndex);
      var C, M = function(R) {
        var D = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: n._width,
          viewHeight: n._height
        };
        for (C = m; C < d.__endIndex; C++) {
          var I = t[C];
          if (I.__inHover && (v = !0), n._doPaintEl(I, d, o, R, D, C === d.__endIndex - 1), T) {
            var A = Date.now() - b;
            if (A > 15)
              break;
          }
        }
        D.prevElClipPaths && _.restore();
      };
      if (y)
        if (y.length === 0)
          C = d.__endIndex;
        else
          for (var P = c.dpr, L = 0; L < y.length; ++L) {
            var x = y[L];
            _.save(), _.beginPath(), _.rect(x.x * P, x.y * P, x.width * P, x.height * P), _.clip(), M(x), _.restore();
          }
      else
        _.save(), M(), _.restore();
      d.__drawIndex = C, d.__drawIndex < d.__endIndex && (u = !1);
    }, c = this, p = 0; p < a.length; p++)
      l(p);
    return U.wxa && at(this._layers, function(g) {
      g && g.ctx && g.ctx.draw && g.ctx.draw();
    }), {
      finished: u,
      needsRefreshHover: v
    };
  }, r.prototype._doPaintEl = function(t, e, i, n, a, o) {
    var s = e.ctx;
    if (i) {
      var f = t.getPaintRect();
      (!n || f && f.intersect(n)) && (br(s, t, a, o), t.setPrevPaintRect(f));
    } else
      br(s, t, a, o);
  }, r.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = gr);
    var i = this._layers[t];
    return i || (i = new Pn("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? Nr(i, this._layerConfig[t], !0) : this._layerConfig[t - ni] && Nr(i, this._layerConfig[t - ni], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, r.prototype.insertLayer = function(t, e) {
    var i = this._layers, n = this._zlevelList, a = n.length, o = this._domRoot, s = null, f = -1;
    if (i[t]) {
      ts.env.NODE_ENV !== "production" && Ut("ZLevel " + t + " has been used already");
      return;
    }
    if (!ec(e)) {
      ts.env.NODE_ENV !== "production" && Ut("Layer of zlevel " + t + " is not valid");
      return;
    }
    if (a > 0 && t > n[0]) {
      for (f = 0; f < a - 1 && !(n[f] < t && n[f + 1] > t); f++)
        ;
      s = i[n[f]];
    }
    if (n.splice(f + 1, 0, t), i[t] = e, !e.virtual)
      if (s) {
        var h = s.dom;
        h.nextSibling ? o.insertBefore(e.dom, h.nextSibling) : o.appendChild(e.dom);
      } else
        o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
    e.painter || (e.painter = this);
  }, r.prototype.eachLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n];
      t.call(e, this._layers[a], a);
    }
  }, r.prototype.eachBuiltinLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ && t.call(e, o, a);
    }
  }, r.prototype.eachOtherLayer = function(t, e) {
    for (var i = this._zlevelList, n = 0; n < i.length; n++) {
      var a = i[n], o = this._layers[a];
      o.__builtin__ || t.call(e, o, a);
    }
  }, r.prototype.getLayers = function() {
    return this._layers;
  }, r.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(v, l) {
      v.__dirty = v.__used = !1;
    });
    function e(v) {
      a && (a.__endIndex !== v && (a.__dirty = !0), a.__endIndex = v);
    }
    if (this._singleCanvas)
      for (var i = 1; i < t.length; i++) {
        var n = t[i];
        if (n.zlevel !== t[i - 1].zlevel || n.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }
    var a = null, o = 0, s, f;
    for (f = 0; f < t.length; f++) {
      var n = t[f], h = n.zlevel, u = void 0;
      s !== h && (s = h, o = 0), n.incremental ? (u = this.getLayer(h + rc, this._needsManuallyCompositing), u.incremental = !0, o = 1) : u = this.getLayer(h + (o > 0 ? ni : 0), this._needsManuallyCompositing), u.__builtin__ || Ut("ZLevel " + h + " has been used by unkown layer " + u.id), u !== a && (u.__used = !0, u.__startIndex !== f && (u.__dirty = !0), u.__startIndex = f, u.incremental ? u.__drawIndex = -1 : u.__drawIndex = f, e(f), a = u), n.__dirty & ct && !n.__inHover && (u.__dirty = !0, u.incremental && u.__drawIndex < 0 && (u.__drawIndex = f));
    }
    e(f), this.eachBuiltinLayer(function(v, l) {
      !v.__used && v.getElementCount() > 0 && (v.__dirty = !0, v.__startIndex = v.__endIndex = v.__drawIndex = 0), v.__dirty && v.__drawIndex < 0 && (v.__drawIndex = v.__startIndex);
    });
  }, r.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, r.prototype._clearLayer = function(t) {
    t.clear();
  }, r.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, at(this._layers, function(e) {
      e.setUnpainted();
    });
  }, r.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? Nr(i[t], e, !0) : i[t] = e;
      for (var n = 0; n < this._zlevelList.length; n++) {
        var a = this._zlevelList[n];
        if (a === t || a === t + ni) {
          var o = this._layers[a];
          Nr(o, i[t], !0);
        }
      }
    }
  }, r.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, n = e[t];
    n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(It(i, t), 1));
  }, r.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var n = this._opts, a = this.root;
      if (t != null && (n.width = t), e != null && (n.height = e), t = qr(a, 0, n), e = qr(a, 1, n), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(gr).resize(t, e);
    }
    return this;
  }, r.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, r.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, r.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[gr].dom;
    var e = new Pn("image", this, t.pixelRatio || this.dpr);
    e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = e.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var n = e.dom.width, a = e.dom.height;
      this.eachLayer(function(v) {
        v.__builtin__ ? i.drawImage(v.dom, 0, 0, n, a) : v.renderToCanvas && (i.save(), v.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, s = this.storage.getDisplayList(!0), f = 0, h = s.length; f < h; f++) {
        var u = s[f];
        br(i, u, o, f === h - 1);
      }
    return e.dom;
  }, r.prototype.getWidth = function() {
    return this._width;
  }, r.prototype.getHeight = function() {
    return this._height;
  }, r;
}();
function nc(r) {
  if (Bt(r)) {
    var t = new DOMParser();
    r = t.parseFromString(r, "text/xml");
  }
  var e = r;
  for (e.nodeType === 9 && (e = e.firstChild); e.nodeName.toLowerCase() !== "svg" || e.nodeType !== 1; )
    e = e.nextSibling;
  return e;
}
var ac = { env: {} }, Ln, bi = {
  fill: "fill",
  stroke: "stroke",
  "stroke-width": "lineWidth",
  opacity: "opacity",
  "fill-opacity": "fillOpacity",
  "stroke-opacity": "strokeOpacity",
  "stroke-dasharray": "lineDash",
  "stroke-dashoffset": "lineDashOffset",
  "stroke-linecap": "lineCap",
  "stroke-linejoin": "lineJoin",
  "stroke-miterlimit": "miterLimit",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-style": "fontStyle",
  "font-weight": "fontWeight",
  "text-anchor": "textAlign",
  visibility: "visibility",
  display: "display"
}, es = G(bi), Si = {
  "alignment-baseline": "textBaseline",
  "stop-color": "stopColor"
}, is = G(Si), oc = function() {
  function r() {
    this._defs = {}, this._root = null;
  }
  return r.prototype.parse = function(t, e) {
    e = e || {};
    var i = nc(t);
    if (ac.env.NODE_ENV !== "production" && !i)
      throw new Error("Illegal svg");
    this._defsUsePending = [];
    var n = new mr();
    this._root = n;
    var a = [], o = i.getAttribute("viewBox") || "", s = parseFloat(i.getAttribute("width") || e.width), f = parseFloat(i.getAttribute("height") || e.height);
    isNaN(s) && (s = null), isNaN(f) && (f = null), lt(i, n, null, !0, !1);
    for (var h = i.firstChild; h; )
      this._parseNode(h, n, a, null, !1, !1), h = h.nextSibling;
    hc(this._defs, this._defsUsePending), this._defsUsePending = [];
    var u, v;
    if (o) {
      var l = zi(o);
      l.length >= 4 && (u = {
        x: parseFloat(l[0] || 0),
        y: parseFloat(l[1] || 0),
        width: parseFloat(l[2]),
        height: parseFloat(l[3])
      });
    }
    if (u && s != null && f != null && (v = dc(u, { x: 0, y: 0, width: s, height: f }), !e.ignoreViewBox)) {
      var c = n;
      n = new mr(), n.add(c), c.scaleX = c.scaleY = v.scale, c.x = v.x, c.y = v.y;
    }
    return !e.ignoreRootClip && s != null && f != null && n.setClipPath(new xe({
      shape: { x: 0, y: 0, width: s, height: f }
    })), {
      root: n,
      width: s,
      height: f,
      viewBoxRect: u,
      viewBoxTransform: v,
      named: a
    };
  }, r.prototype._parseNode = function(t, e, i, n, a, o) {
    var s = t.nodeName.toLowerCase(), f, h = n;
    if (s === "defs" && (a = !0), s === "text" && (o = !0), s === "defs" || s === "switch")
      f = e;
    else {
      if (!a) {
        var u = Ln[s];
        if (u && vi(Ln, s)) {
          f = u.call(this, t, e);
          var v = t.getAttribute("name");
          if (v) {
            var l = {
              name: v,
              namedFrom: null,
              svgNodeTagLower: s,
              el: f
            };
            i.push(l), s === "g" && (h = l);
          } else n && i.push({
            name: n.name,
            namedFrom: n,
            svgNodeTagLower: s,
            el: f
          });
          e.add(f);
        }
      }
      var c = ns[s];
      if (c && vi(ns, s)) {
        var p = c.call(this, t), g = t.getAttribute("id");
        g && (this._defs[g] = p);
      }
    }
    if (f && f.isGroup)
      for (var d = t.firstChild; d; )
        d.nodeType === 1 ? this._parseNode(d, f, i, h, a, o) : d.nodeType === 3 && o && this._parseText(d, f), d = d.nextSibling;
  }, r.prototype._parseText = function(t, e) {
    var i = new Jr({
      style: {
        text: t.textContent
      },
      silent: !0,
      x: this._textX || 0,
      y: this._textY || 0
    });
    gt(e, i), lt(t, i, this._defsUsePending, !1, !1), sc(i, e);
    var n = i.style, a = n.fontSize;
    a && a < 9 && (n.fontSize = 9, i.scaleX *= a / 9, i.scaleY *= a / 9);
    var o = (n.fontSize || n.fontFamily) && [
      n.fontStyle,
      n.fontWeight,
      (n.fontSize || 12) + "px",
      n.fontFamily || "sans-serif"
    ].join(" ");
    n.font = o;
    var s = i.getBoundingRect();
    return this._textX += s.width, e.add(i), i;
  }, r.internalField = function() {
    Ln = {
      g: function(t, e) {
        var i = new mr();
        return gt(e, i), lt(t, i, this._defsUsePending, !1, !1), i;
      },
      rect: function(t, e) {
        var i = new xe();
        return gt(e, i), lt(t, i, this._defsUsePending, !1, !1), i.setShape({
          x: parseFloat(t.getAttribute("x") || "0"),
          y: parseFloat(t.getAttribute("y") || "0"),
          width: parseFloat(t.getAttribute("width") || "0"),
          height: parseFloat(t.getAttribute("height") || "0")
        }), i.silent = !0, i;
      },
      circle: function(t, e) {
        var i = new vf();
        return gt(e, i), lt(t, i, this._defsUsePending, !1, !1), i.setShape({
          cx: parseFloat(t.getAttribute("cx") || "0"),
          cy: parseFloat(t.getAttribute("cy") || "0"),
          r: parseFloat(t.getAttribute("r") || "0")
        }), i.silent = !0, i;
      },
      line: function(t, e) {
        var i = new gf();
        return gt(e, i), lt(t, i, this._defsUsePending, !1, !1), i.setShape({
          x1: parseFloat(t.getAttribute("x1") || "0"),
          y1: parseFloat(t.getAttribute("y1") || "0"),
          x2: parseFloat(t.getAttribute("x2") || "0"),
          y2: parseFloat(t.getAttribute("y2") || "0")
        }), i.silent = !0, i;
      },
      ellipse: function(t, e) {
        var i = new Iv();
        return gt(e, i), lt(t, i, this._defsUsePending, !1, !1), i.setShape({
          cx: parseFloat(t.getAttribute("cx") || "0"),
          cy: parseFloat(t.getAttribute("cy") || "0"),
          rx: parseFloat(t.getAttribute("rx") || "0"),
          ry: parseFloat(t.getAttribute("ry") || "0")
        }), i.silent = !0, i;
      },
      polygon: function(t, e) {
        var i = t.getAttribute("points"), n;
        i && (n = ss(i));
        var a = new ya({
          shape: {
            points: n || []
          },
          silent: !0
        });
        return gt(e, a), lt(t, a, this._defsUsePending, !1, !1), a;
      },
      polyline: function(t, e) {
        var i = t.getAttribute("points"), n;
        i && (n = ss(i));
        var a = new _f({
          shape: {
            points: n || []
          },
          silent: !0
        });
        return gt(e, a), lt(t, a, this._defsUsePending, !1, !1), a;
      },
      image: function(t, e) {
        var i = new ee();
        return gt(e, i), lt(t, i, this._defsUsePending, !1, !1), i.setStyle({
          image: t.getAttribute("xlink:href") || t.getAttribute("href"),
          x: +t.getAttribute("x"),
          y: +t.getAttribute("y"),
          width: +t.getAttribute("width"),
          height: +t.getAttribute("height")
        }), i.silent = !0, i;
      },
      text: function(t, e) {
        var i = t.getAttribute("x") || "0", n = t.getAttribute("y") || "0", a = t.getAttribute("dx") || "0", o = t.getAttribute("dy") || "0";
        this._textX = parseFloat(i) + parseFloat(a), this._textY = parseFloat(n) + parseFloat(o);
        var s = new mr();
        return gt(e, s), lt(t, s, this._defsUsePending, !1, !0), s;
      },
      tspan: function(t, e) {
        var i = t.getAttribute("x"), n = t.getAttribute("y");
        i != null && (this._textX = parseFloat(i)), n != null && (this._textY = parseFloat(n));
        var a = t.getAttribute("dx") || "0", o = t.getAttribute("dy") || "0", s = new mr();
        return gt(e, s), lt(t, s, this._defsUsePending, !1, !0), this._textX += parseFloat(a), this._textY += parseFloat(o), s;
      },
      path: function(t, e) {
        var i = t.getAttribute("d") || "", n = Dv(i);
        return gt(e, n), lt(t, n, this._defsUsePending, !1, !1), n.silent = !0, n;
      }
    };
  }(), r;
}(), ns = {
  lineargradient: function(r) {
    var t = parseInt(r.getAttribute("x1") || "0", 10), e = parseInt(r.getAttribute("y1") || "0", 10), i = parseInt(r.getAttribute("x2") || "10", 10), n = parseInt(r.getAttribute("y2") || "0", 10), a = new Kv(t, e, i, n);
    return as(r, a), os(r, a), a;
  },
  radialgradient: function(r) {
    var t = parseInt(r.getAttribute("cx") || "0", 10), e = parseInt(r.getAttribute("cy") || "0", 10), i = parseInt(r.getAttribute("r") || "0", 10), n = new jv(t, e, i);
    return as(r, n), os(r, n), n;
  }
};
function as(r, t) {
  var e = r.getAttribute("gradientUnits");
  e === "userSpaceOnUse" && (t.global = !0);
}
function os(r, t) {
  for (var e = r.firstChild; e; ) {
    if (e.nodeType === 1 && e.nodeName.toLocaleLowerCase() === "stop") {
      var i = e.getAttribute("offset"), n = void 0;
      i && i.indexOf("%") > 0 ? n = parseInt(i, 10) / 100 : i ? n = parseFloat(i) : n = 0;
      var a = {};
      Bf(e, a, a);
      var o = a.stopColor || e.getAttribute("stop-color") || "#000000";
      t.colorStops.push({
        offset: n,
        color: o
      });
    }
    e = e.nextSibling;
  }
}
function gt(r, t) {
  r && r.__inheritedStyle && (t.__inheritedStyle || (t.__inheritedStyle = {}), Tt(t.__inheritedStyle, r.__inheritedStyle));
}
function ss(r) {
  for (var t = zi(r), e = [], i = 0; i < t.length; i += 2) {
    var n = parseFloat(t[i]), a = parseFloat(t[i + 1]);
    e.push([n, a]);
  }
  return e;
}
function lt(r, t, e, i, n) {
  var a = t, o = a.__inheritedStyle = a.__inheritedStyle || {}, s = {};
  r.nodeType === 1 && (lc(r, t), Bf(r, o, s), i || cc(r, o, s)), a.style = a.style || {}, o.fill != null && (a.style.fill = fs(a, "fill", o.fill, e)), o.stroke != null && (a.style.stroke = fs(a, "stroke", o.stroke, e)), at([
    "lineWidth",
    "opacity",
    "fillOpacity",
    "strokeOpacity",
    "miterLimit",
    "fontSize"
  ], function(f) {
    o[f] != null && (a.style[f] = parseFloat(o[f]));
  }), at([
    "lineDashOffset",
    "lineCap",
    "lineJoin",
    "fontWeight",
    "fontFamily",
    "fontStyle",
    "textAlign"
  ], function(f) {
    o[f] != null && (a.style[f] = o[f]);
  }), n && (a.__selfStyle = s), o.lineDash && (a.style.lineDash = V(zi(o.lineDash), function(f) {
    return parseFloat(f);
  })), (o.visibility === "hidden" || o.visibility === "collapse") && (a.invisible = !0), o.display === "none" && (a.ignore = !0);
}
function sc(r, t) {
  var e = t.__selfStyle;
  if (e) {
    var i = e.textBaseline, n = i;
    !i || i === "auto" || i === "baseline" ? n = "alphabetic" : i === "before-edge" || i === "text-before-edge" ? n = "top" : i === "after-edge" || i === "text-after-edge" ? n = "bottom" : (i === "central" || i === "mathematical") && (n = "middle"), r.style.textBaseline = n;
  }
  var a = t.__inheritedStyle;
  if (a) {
    var o = a.textAlign, s = o;
    o && (o === "middle" && (s = "center"), r.style.textAlign = s);
  }
}
var fc = /^url\(\s*#(.*?)\)/;
function fs(r, t, e, i) {
  var n = e && e.match(fc);
  if (n) {
    var a = Yr(n[1]);
    i.push([r, t, a]);
    return;
  }
  return e === "none" && (e = null), e;
}
function hc(r, t) {
  for (var e = 0; e < t.length; e++) {
    var i = t[e];
    i[0].style[i[1]] = r[i[2]];
  }
}
var uc = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function zi(r) {
  return r.match(uc) || [];
}
var vc = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.eE,]*)\)/g, xn = Math.PI / 180;
function lc(r, t) {
  var e = r.getAttribute("transform");
  if (e) {
    e = e.replace(/,/g, " ");
    var i = [], n = null;
    e.replace(vc, function(v, l, c) {
      return i.push(l, c), "";
    });
    for (var a = i.length - 1; a > 0; a -= 2) {
      var o = i[a], s = i[a - 1], f = zi(o);
      switch (n = n || Cr(), s) {
        case "translate":
          Bn(n, n, [parseFloat(f[0]), parseFloat(f[1] || "0")]);
          break;
        case "scale":
          xs(n, n, [parseFloat(f[0]), parseFloat(f[1] || f[0])]);
          break;
        case "rotate":
          Ls(n, n, -parseFloat(f[0]) * xn, [
            parseFloat(f[1] || "0"),
            parseFloat(f[2] || "0")
          ]);
          break;
        case "skewX":
          var h = Math.tan(parseFloat(f[0]) * xn);
          we(n, [1, 0, h, 1, 0, 0], n);
          break;
        case "skewY":
          var u = Math.tan(parseFloat(f[0]) * xn);
          we(n, [1, u, 0, 1, 0, 0], n);
          break;
        case "matrix":
          n[0] = parseFloat(f[0]), n[1] = parseFloat(f[1]), n[2] = parseFloat(f[2]), n[3] = parseFloat(f[3]), n[4] = parseFloat(f[4]), n[5] = parseFloat(f[5]);
          break;
      }
    }
    t.setLocalTransform(n);
  }
}
var hs = /([^\s:;]+)\s*:\s*([^:;]+)/g;
function Bf(r, t, e) {
  var i = r.getAttribute("style");
  if (i) {
    hs.lastIndex = 0;
    for (var n; (n = hs.exec(i)) != null; ) {
      var a = n[1], o = vi(bi, a) ? bi[a] : null;
      o && (t[o] = n[2]);
      var s = vi(Si, a) ? Si[a] : null;
      s && (e[s] = n[2]);
    }
  }
}
function cc(r, t, e) {
  for (var i = 0; i < es.length; i++) {
    var n = es[i], a = r.getAttribute(n);
    a != null && (t[bi[n]] = a);
  }
  for (var i = 0; i < is.length; i++) {
    var n = is[i], a = r.getAttribute(n);
    a != null && (e[Si[n]] = a);
  }
}
function dc(r, t) {
  var e = t.width / r.width, i = t.height / r.height, n = Math.min(e, i);
  return {
    scale: n,
    x: -(r.x + r.width / 2) * n + (t.x + t.width / 2),
    y: -(r.y + r.height / 2) * n + (t.y + t.height / 2)
  };
}
function hd(r, t) {
  var e = new oc();
  return e.parse(r, t);
}
var At = tr.CMD;
function Vr(r, t) {
  return Math.abs(r - t) < 1e-5;
}
function aa(r) {
  var t = r.data, e = r.len(), i = [], n, a = 0, o = 0, s = 0, f = 0;
  function h(R, D) {
    n && n.length > 2 && i.push(n), n = [R, D];
  }
  function u(R, D, I, A) {
    Vr(R, I) && Vr(D, A) || n.push(R, D, I, A, I, A);
  }
  function v(R, D, I, A, B, N) {
    var j = Math.abs(D - R), q = Math.tan(j / 4) * 4 / 3, Q = D < R ? -1 : 1, Y = Math.cos(R), et = Math.sin(R), tt = Math.cos(D), pt = Math.sin(D), kt = Y * B + I, Ht = et * N + A, _t = tt * B + I, K = pt * N + A, $ = B * q * Q, E = N * q * Q;
    n.push(kt - $ * et, Ht + E * Y, _t + $ * pt, K - E * tt, _t, K);
  }
  for (var l, c, p, g, d = 0; d < e; ) {
    var _ = t[d++], y = d === 1;
    switch (y && (a = t[d], o = t[d + 1], s = a, f = o, (_ === At.L || _ === At.C || _ === At.Q) && (n = [s, f])), _) {
      case At.M:
        a = s = t[d++], o = f = t[d++], h(s, f);
        break;
      case At.L:
        l = t[d++], c = t[d++], u(a, o, l, c), a = l, o = c;
        break;
      case At.C:
        n.push(t[d++], t[d++], t[d++], t[d++], a = t[d++], o = t[d++]);
        break;
      case At.Q:
        l = t[d++], c = t[d++], p = t[d++], g = t[d++], n.push(a + 2 / 3 * (l - a), o + 2 / 3 * (c - o), p + 2 / 3 * (l - p), g + 2 / 3 * (c - g), p, g), a = p, o = g;
        break;
      case At.A:
        var m = t[d++], T = t[d++], b = t[d++], w = t[d++], S = t[d++], C = t[d++] + S;
        d += 1;
        var M = !t[d++];
        l = Math.cos(S) * b + m, c = Math.sin(S) * w + T, y ? (s = l, f = c, h(s, f)) : u(a, o, l, c), a = Math.cos(C) * b + m, o = Math.sin(C) * w + T;
        for (var P = (M ? -1 : 1) * Math.PI / 2, L = S; M ? L > C : L < C; L += P) {
          var x = M ? Math.max(L + P, C) : Math.min(L + P, C);
          v(L, x, m, T, b, w);
        }
        break;
      case At.R:
        s = a = t[d++], f = o = t[d++], l = s + t[d++], c = f + t[d++], h(l, f), u(l, f, l, c), u(l, c, s, c), u(s, c, s, f), u(s, f, l, f);
        break;
      case At.Z:
        n && u(a, o, s, f), a = s, o = f;
        break;
    }
  }
  return n && n.length > 2 && i.push(n), i;
}
function oa(r, t, e, i, n, a, o, s, f, h) {
  if (Vr(r, e) && Vr(t, i) && Vr(n, o) && Vr(a, s)) {
    f.push(o, s);
    return;
  }
  var u = 2 / h, v = u * u, l = o - r, c = s - t, p = Math.sqrt(l * l + c * c);
  l /= p, c /= p;
  var g = e - r, d = i - t, _ = n - o, y = a - s, m = g * g + d * d, T = _ * _ + y * y;
  if (m < v && T < v) {
    f.push(o, s);
    return;
  }
  var b = l * g + c * d, w = -l * _ - c * y, S = m - b * b, C = T - w * w;
  if (S < v && b >= 0 && C < v && w >= 0) {
    f.push(o, s);
    return;
  }
  var M = [], P = [];
  jt(r, e, n, o, 0.5, M), jt(t, i, a, s, 0.5, P), oa(M[0], P[0], M[1], P[1], M[2], P[2], M[3], P[3], f, h), oa(M[4], P[4], M[5], P[5], M[6], P[6], M[7], P[7], f, h);
}
function pc(r, t) {
  var e = aa(r), i = [];
  t = t || 1;
  for (var n = 0; n < e.length; n++) {
    var a = e[n], o = [], s = a[0], f = a[1];
    o.push(s, f);
    for (var h = 2; h < a.length; ) {
      var u = a[h++], v = a[h++], l = a[h++], c = a[h++], p = a[h++], g = a[h++];
      oa(s, f, u, v, l, c, p, g, o, t), s = p, f = g;
    }
    i.push(o);
  }
  return i;
}
function kf(r, t, e) {
  var i = r[t], n = r[1 - t], a = Math.abs(i / n), o = Math.ceil(Math.sqrt(a * e)), s = Math.floor(e / o);
  s === 0 && (s = 1, o = e);
  for (var f = [], h = 0; h < o; h++)
    f.push(s);
  var u = o * s, v = e - u;
  if (v > 0)
    for (var h = 0; h < v; h++)
      f[h % o] += 1;
  return f;
}
function us(r, t, e) {
  for (var i = r.r0, n = r.r, a = r.startAngle, o = r.endAngle, s = Math.abs(o - a), f = s * n, h = n - i, u = f > Math.abs(h), v = kf([f, h], u ? 0 : 1, t), l = (u ? s : h) / v.length, c = 0; c < v.length; c++)
    for (var p = (u ? h : s) / v[c], g = 0; g < v[c]; g++) {
      var d = {};
      u ? (d.startAngle = a + l * c, d.endAngle = a + l * (c + 1), d.r0 = i + p * g, d.r = i + p * (g + 1)) : (d.startAngle = a + p * g, d.endAngle = a + p * (g + 1), d.r0 = i + l * c, d.r = i + l * (c + 1)), d.clockwise = r.clockwise, d.cx = r.cx, d.cy = r.cy, e.push(d);
    }
}
function _c(r, t, e) {
  for (var i = r.width, n = r.height, a = i > n, o = kf([i, n], a ? 0 : 1, t), s = a ? "width" : "height", f = a ? "height" : "width", h = a ? "x" : "y", u = a ? "y" : "x", v = r[s] / o.length, l = 0; l < o.length; l++)
    for (var c = r[f] / o[l], p = 0; p < o[l]; p++) {
      var g = {};
      g[h] = l * v, g[u] = p * c, g[s] = v, g[f] = c, g.x += r.x, g.y += r.y, e.push(g);
    }
}
function vs(r, t, e, i) {
  return r * i - e * t;
}
function gc(r, t, e, i, n, a, o, s) {
  var f = e - r, h = i - t, u = o - n, v = s - a, l = vs(u, v, f, h);
  if (Math.abs(l) < 1e-6)
    return null;
  var c = r - n, p = t - a, g = vs(c, p, u, v) / l;
  return g < 0 || g > 1 ? null : new F(g * f + r, g * h + t);
}
function yc(r, t, e) {
  var i = new F();
  F.sub(i, e, t), i.normalize();
  var n = new F();
  F.sub(n, r, t);
  var a = n.dot(i);
  return a;
}
function Br(r, t) {
  var e = r[r.length - 1];
  e && e[0] === t[0] && e[1] === t[1] || r.push(t);
}
function mc(r, t, e) {
  for (var i = r.length, n = [], a = 0; a < i; a++) {
    var o = r[a], s = r[(a + 1) % i], f = gc(o[0], o[1], s[0], s[1], t.x, t.y, e.x, e.y);
    f && n.push({
      projPt: yc(f, t, e),
      pt: f,
      idx: a
    });
  }
  if (n.length < 2)
    return [{ points: r }, { points: r }];
  n.sort(function(d, _) {
    return d.projPt - _.projPt;
  });
  var h = n[0], u = n[n.length - 1];
  if (u.idx < h.idx) {
    var v = h;
    h = u, u = v;
  }
  for (var l = [h.pt.x, h.pt.y], c = [u.pt.x, u.pt.y], p = [l], g = [c], a = h.idx + 1; a <= u.idx; a++)
    Br(p, r[a].slice());
  Br(p, c), Br(p, l);
  for (var a = u.idx + 1; a <= h.idx + i; a++)
    Br(g, r[a % i].slice());
  return Br(g, l), Br(g, c), [{
    points: p
  }, {
    points: g
  }];
}
function ls(r) {
  var t = r.points, e = [], i = [];
  rf(t, e, i);
  var n = new X(e[0], e[1], i[0] - e[0], i[1] - e[1]), a = n.width, o = n.height, s = n.x, f = n.y, h = new F(), u = new F();
  return a > o ? (h.x = u.x = s + a / 2, h.y = f, u.y = f + o) : (h.y = u.y = f + o / 2, h.x = s, u.x = s + a), mc(t, h, u);
}
function Ci(r, t, e, i) {
  if (e === 1)
    i.push(t);
  else {
    var n = Math.floor(e / 2), a = r(t);
    Ci(r, a[0], n, i), Ci(r, a[1], e - n, i);
  }
  return i;
}
function wc(r, t) {
  for (var e = [], i = 0; i < t; i++)
    e.push(uf(r));
  return e;
}
function Tc(r, t) {
  t.setStyle(r.style), t.z = r.z, t.z2 = r.z2, t.zlevel = r.zlevel;
}
function bc(r) {
  for (var t = [], e = 0; e < r.length; )
    t.push([r[e++], r[e++]]);
  return t;
}
function Sc(r, t) {
  var e = [], i = r.shape, n;
  switch (r.type) {
    case "rect":
      _c(i, t, e), n = xe;
      break;
    case "sector":
      us(i, t, e), n = jn;
      break;
    case "circle":
      us({
        r0: 0,
        r: i.r,
        startAngle: 0,
        endAngle: Math.PI * 2,
        cx: i.cx,
        cy: i.cy
      }, t, e), n = jn;
      break;
    default:
      var a = r.getComputedTransform(), o = a ? Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1], a[2] * a[2] + a[3] * a[3])) : 1, s = V(pc(r.getUpdatedPathProxy(), o), function(_) {
        return bc(_);
      }), f = s.length;
      if (f === 0)
        Ci(ls, {
          points: s[0]
        }, t, e);
      else if (f === t)
        for (var h = 0; h < f; h++)
          e.push({
            points: s[h]
          });
      else {
        var u = 0, v = V(s, function(_) {
          var y = [], m = [];
          rf(_, y, m);
          var T = (m[1] - y[1]) * (m[0] - y[0]);
          return u += T, { poly: _, area: T };
        });
        v.sort(function(_, y) {
          return y.area - _.area;
        });
        for (var l = t, h = 0; h < f; h++) {
          var c = v[h];
          if (l <= 0)
            break;
          var p = h === f - 1 ? l : Math.ceil(c.area / u * t);
          p < 0 || (Ci(ls, {
            points: c.poly
          }, p, e), l -= p);
        }
      }
      n = ya;
      break;
  }
  if (!n)
    return wc(r, t);
  for (var g = [], h = 0; h < e.length; h++) {
    var d = new n();
    d.setShape(e[h]), Tc(r, d), g.push(d);
  }
  return g;
}
function Cc(r, t) {
  var e = r.length, i = t.length;
  if (e === i)
    return [r, t];
  for (var n = [], a = [], o = e < i ? r : t, s = Math.min(e, i), f = Math.abs(i - e) / 6, h = (s - 2) / 6, u = Math.ceil(f / h) + 1, v = [o[0], o[1]], l = f, c = 2; c < s; ) {
    var p = o[c - 2], g = o[c - 1], d = o[c++], _ = o[c++], y = o[c++], m = o[c++], T = o[c++], b = o[c++];
    if (l <= 0) {
      v.push(d, _, y, m, T, b);
      continue;
    }
    for (var w = Math.min(l, u - 1) + 1, S = 1; S <= w; S++) {
      var C = S / w;
      jt(p, d, y, T, C, n), jt(g, _, m, b, C, a), p = n[3], g = a[3], v.push(n[1], a[1], n[2], a[2], p, g), d = n[5], _ = a[5], y = n[6], m = a[6];
    }
    l -= w - 1;
  }
  return o === r ? [v, t] : [r, v];
}
function cs(r, t) {
  for (var e = r.length, i = r[e - 2], n = r[e - 1], a = [], o = 0; o < t.length; )
    a[o++] = i, a[o++] = n;
  return a;
}
function Mc(r, t) {
  for (var e, i, n, a = [], o = [], s = 0; s < Math.max(r.length, t.length); s++) {
    var f = r[s], h = t[s], u = void 0, v = void 0;
    f ? h ? (e = Cc(f, h), u = e[0], v = e[1], i = u, n = v) : (v = cs(n || f, f), u = f) : (u = cs(i || h, h), v = h), a.push(u), o.push(v);
  }
  return [a, o];
}
function ds(r) {
  for (var t = 0, e = 0, i = 0, n = r.length, a = 0, o = n - 2; a < n; o = a, a += 2) {
    var s = r[o], f = r[o + 1], h = r[a], u = r[a + 1], v = s * u - h * f;
    t += v, e += (s + h) * v, i += (f + u) * v;
  }
  return t === 0 ? [r[0] || 0, r[1] || 0] : [e / t / 3, i / t / 3, t];
}
function Pc(r, t, e, i) {
  for (var n = (r.length - 2) / 6, a = 1 / 0, o = 0, s = r.length, f = s - 2, h = 0; h < n; h++) {
    for (var u = h * 6, v = 0, l = 0; l < s; l += 2) {
      var c = l === 0 ? u : (u + l - 2) % f + 2, p = r[c] - e[0], g = r[c + 1] - e[1], d = t[l] - i[0], _ = t[l + 1] - i[1], y = d - p, m = _ - g;
      v += y * y + m * m;
    }
    v < a && (a = v, o = h);
  }
  return o;
}
function Lc(r) {
  for (var t = [], e = r.length, i = 0; i < e; i += 2)
    t[i] = r[e - i - 2], t[i + 1] = r[e - i - 1];
  return t;
}
function xc(r, t, e, i) {
  for (var n = [], a, o = 0; o < r.length; o++) {
    var s = r[o], f = t[o], h = ds(s), u = ds(f);
    a == null && (a = h[2] < 0 != u[2] < 0);
    var v = [], l = [], c = 0, p = 1 / 0, g = [], d = s.length;
    a && (s = Lc(s));
    for (var _ = Pc(s, f, h, u) * 6, y = d - 2, m = 0; m < y; m += 2) {
      var T = (_ + m) % y + 2;
      v[m + 2] = s[T] - h[0], v[m + 3] = s[T + 1] - h[1];
    }
    v[0] = s[_] - h[0], v[1] = s[_ + 1] - h[1];
    for (var b = i / e, w = -i / 2; w <= i / 2; w += b) {
      for (var S = Math.sin(w), C = Math.cos(w), M = 0, m = 0; m < s.length; m += 2) {
        var P = v[m], L = v[m + 1], x = f[m] - u[0], R = f[m + 1] - u[1], D = x * C - R * S, I = x * S + R * C;
        g[m] = D, g[m + 1] = I;
        var A = D - P, B = I - L;
        M += A * A + B * B;
      }
      if (M < p) {
        p = M, c = w;
        for (var N = 0; N < g.length; N++)
          l[N] = g[N];
      }
    }
    n.push({
      from: v,
      to: l,
      fromCp: h,
      toCp: u,
      rotation: -c
    });
  }
  return n;
}
function sa(r) {
  return r.__isCombineMorphing;
}
var Hf = "__mOriginal_";
function Mi(r, t, e) {
  var i = Hf + t, n = r[i] || r[t];
  r[i] || (r[i] = r[t]);
  var a = e.replace, o = e.after, s = e.before;
  r[t] = function() {
    var f = arguments, h;
    return s && s.apply(this, f), a ? h = a.apply(this, f) : h = n.apply(this, f), o && o.apply(this, f), h;
  };
}
function Se(r, t) {
  var e = Hf + t;
  r[e] && (r[t] = r[e], r[e] = null);
}
function ps(r, t) {
  for (var e = 0; e < r.length; e++)
    for (var i = r[e], n = 0; n < i.length; ) {
      var a = i[n], o = i[n + 1];
      i[n++] = t[0] * a + t[2] * o + t[4], i[n++] = t[1] * a + t[3] * o + t[5];
    }
}
function zf(r, t) {
  var e = r.getUpdatedPathProxy(), i = t.getUpdatedPathProxy(), n = Mc(aa(e), aa(i)), a = n[0], o = n[1], s = r.getComputedTransform(), f = t.getComputedTransform();
  function h() {
    this.transform = null;
  }
  s && ps(a, s), f && ps(o, f), Mi(t, "updateTransform", { replace: h }), t.transform = null;
  var u = xc(a, o, 10, Math.PI), v = [];
  Mi(t, "buildPath", { replace: function(l) {
    for (var c = t.__morphT, p = 1 - c, g = [], d = 0; d < u.length; d++) {
      var _ = u[d], y = _.from, m = _.to, T = _.rotation * c, b = _.fromCp, w = _.toCp, S = Math.sin(T), C = Math.cos(T);
      ph(g, b, w, c);
      for (var M = 0; M < y.length; M += 2) {
        var P = y[M], L = y[M + 1], x = m[M], R = m[M + 1], D = P * p + x * c, I = L * p + R * c;
        v[M] = D * C - I * S + g[0], v[M + 1] = D * S + I * C + g[1];
      }
      var A = v[0], B = v[1];
      l.moveTo(A, B);
      for (var M = 2; M < y.length; ) {
        var x = v[M++], R = v[M++], N = v[M++], j = v[M++], q = v[M++], Q = v[M++];
        A === x && B === R && N === q && j === Q ? l.lineTo(q, Q) : l.bezierCurveTo(x, R, N, j, q, Q), A = q, B = Q;
      }
    }
  } });
}
function Nf(r, t, e) {
  if (!r || !t)
    return t;
  var i = e.done, n = e.during;
  zf(r, t), t.__morphT = 0;
  function a() {
    Se(t, "buildPath"), Se(t, "updateTransform"), t.__morphT = -1, t.createPathProxy(), t.dirtyShape();
  }
  return t.animateTo({
    __morphT: 1
  }, Tt({
    during: function(o) {
      t.dirtyShape(), n && n(o);
    },
    done: function() {
      a(), i && i();
    }
  }, e)), t;
}
function Rc(r, t, e, i, n, a) {
  var o = 16;
  r = n === e ? 0 : Math.round(32767 * (r - e) / (n - e)), t = a === i ? 0 : Math.round(32767 * (t - i) / (a - i));
  for (var s = 0, f, h = (1 << o) / 2; h > 0; h /= 2) {
    var u = 0, v = 0;
    (r & h) > 0 && (u = 1), (t & h) > 0 && (v = 1), s += h * h * (3 * u ^ v), v === 0 && (u === 1 && (r = h - 1 - r, t = h - 1 - t), f = r, r = t, t = f);
  }
  return s;
}
function Pi(r) {
  var t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0, a = V(r, function(s) {
    var f = s.getBoundingRect(), h = s.getComputedTransform(), u = f.x + f.width / 2 + (h ? h[4] : 0), v = f.y + f.height / 2 + (h ? h[5] : 0);
    return t = Math.min(u, t), e = Math.min(v, e), i = Math.max(u, i), n = Math.max(v, n), [u, v];
  }), o = V(a, function(s, f) {
    return {
      cp: s,
      z: Rc(s[0], s[1], t, e, i, n),
      path: r[f]
    };
  });
  return o.sort(function(s, f) {
    return s.z - f.z;
  }).map(function(s) {
    return s.path;
  });
}
function Yf(r) {
  return Sc(r.path, r.count);
}
function fa() {
  return {
    fromIndividuals: [],
    toIndividuals: [],
    count: 0
  };
}
function ud(r, t, e) {
  var i = [];
  function n(b) {
    for (var w = 0; w < b.length; w++) {
      var S = b[w];
      sa(S) ? n(S.childrenRef()) : S instanceof Z && i.push(S);
    }
  }
  n(r);
  var a = i.length;
  if (!a)
    return fa();
  var o = e.dividePath || Yf, s = o({
    path: t,
    count: a
  });
  if (s.length !== a)
    return console.error("Invalid morphing: unmatched splitted path"), fa();
  i = Pi(i), s = Pi(s);
  for (var f = e.done, h = e.during, u = e.individualDelay, v = new _a(), l = 0; l < a; l++) {
    var c = i[l], p = s[l];
    p.parent = t, p.copyTransform(v), u || zf(c, p);
  }
  t.__isCombineMorphing = !0, t.childrenRef = function() {
    return s;
  };
  function g(b) {
    for (var w = 0; w < s.length; w++)
      s[w].addSelfToZr(b);
  }
  Mi(t, "addSelfToZr", {
    after: function(b) {
      g(b);
    }
  }), Mi(t, "removeSelfFromZr", {
    after: function(b) {
      for (var w = 0; w < s.length; w++)
        s[w].removeSelfFromZr(b);
    }
  });
  function d() {
    t.__isCombineMorphing = !1, t.__morphT = -1, t.childrenRef = null, Se(t, "addSelfToZr"), Se(t, "removeSelfFromZr");
  }
  var _ = s.length;
  if (u)
    for (var y = _, m = function() {
      y--, y === 0 && (d(), f && f());
    }, l = 0; l < _; l++) {
      var T = u ? Tt({
        delay: (e.delay || 0) + u(l, _, i[l], s[l]),
        done: m
      }, e) : e;
      Nf(i[l], s[l], T);
    }
  else
    t.__morphT = 0, t.animateTo({
      __morphT: 1
    }, Tt({
      during: function(b) {
        for (var w = 0; w < _; w++) {
          var S = s[w];
          S.__morphT = t.__morphT, S.dirtyShape();
        }
        h && h(b);
      },
      done: function() {
        d();
        for (var b = 0; b < r.length; b++)
          Se(r[b], "updateTransform");
        f && f();
      }
    }, e));
  return t.__zr && g(t.__zr), {
    fromIndividuals: i,
    toIndividuals: s,
    count: _
  };
}
function vd(r, t, e) {
  var i = t.length, n = [], a = e.dividePath || Yf;
  function o(c) {
    for (var p = 0; p < c.length; p++) {
      var g = c[p];
      sa(g) ? o(g.childrenRef()) : g instanceof Z && n.push(g);
    }
  }
  if (sa(r)) {
    o(r.childrenRef());
    var s = n.length;
    if (s < i)
      for (var f = 0, h = s; h < i; h++)
        n.push(uf(n[f++ % s]));
    n.length = i;
  } else {
    n = a({ path: r, count: i });
    for (var u = r.getComputedTransform(), h = 0; h < n.length; h++)
      n[h].setLocalTransform(u);
    if (n.length !== i)
      return console.error("Invalid morphing: unmatched splitted path"), fa();
  }
  n = Pi(n), t = Pi(t);
  for (var v = e.individualDelay, h = 0; h < i; h++) {
    var l = v ? Tt({
      delay: (e.delay || 0) + v(h, i, n[h], t[h])
    }, e) : e;
    Nf(n[h], t[h], l);
  }
  return {
    fromIndividuals: n,
    toIndividuals: t,
    count: t.length
  };
}
export {
  jv as $,
  Ah as A,
  we as B,
  Eh as C,
  me as D,
  Tt as E,
  vi as F,
  vf as G,
  Iv as H,
  ya as I,
  _f as J,
  xe as K,
  gf as L,
  Wv as M,
  Vv as N,
  td as O,
  Z as P,
  X as Q,
  ed as R,
  jn as S,
  _a as T,
  Qv as U,
  mr as V,
  nd as W,
  Kv as X,
  id as Y,
  ee as Z,
  F as _,
  Ee as a,
  Zc as a$,
  Tv as a0,
  Yr as a1,
  Nr as a2,
  Lr as a3,
  ws as a4,
  nh as a5,
  bh as a6,
  Oc as a7,
  rh as a8,
  Rn as a9,
  tr as aA,
  Ke as aB,
  sd as aC,
  fd as aD,
  Fs as aE,
  rt as aF,
  Vc as aG,
  Ku as aH,
  ai as aI,
  Ls as aJ,
  Ec as aK,
  $c as aL,
  xh as aM,
  nc as aN,
  hd as aO,
  dc as aP,
  Oe as aQ,
  Ps as aR,
  Cr as aS,
  Yc as aT,
  Dc as aU,
  rf as aV,
  Bn as aW,
  xs as aX,
  qc as aY,
  Ie as aZ,
  Pt as a_,
  Ic as aa,
  Hc as ab,
  Nc as ac,
  Sr as ad,
  Su as ae,
  Li as af,
  gl as ag,
  ad as ah,
  Ei as ai,
  re as aj,
  Dn as ak,
  Kc as al,
  Yh as am,
  jc as an,
  Jc as ao,
  Ts as ap,
  kc as aq,
  Le as ar,
  od as as,
  Gr as at,
  Xr as au,
  bu as av,
  ch as aw,
  ph as ax,
  Wh as ay,
  Xh as az,
  Bc as b,
  Qc as b0,
  fh as b1,
  lh as b2,
  Yi as b3,
  te as b4,
  hh as b5,
  uh as b6,
  Gc as b7,
  Xc as b8,
  di as b9,
  nt as ba,
  Zr as bb,
  Wc as bc,
  Ua as bd,
  Ir as be,
  ju as bf,
  Wa as bg,
  Pe as bh,
  si as bi,
  Ut as bj,
  Ph as bk,
  St as bl,
  Uc as bm,
  sa as bn,
  Nf as bo,
  ud as bp,
  vd as bq,
  uf as br,
  Kr as c,
  zc as d,
  ih as e,
  at as f,
  Xt as g,
  Aa as h,
  Bt as i,
  ge as j,
  Fc as k,
  It as l,
  V as m,
  U as n,
  Ac as o,
  H as p,
  jh as q,
  Ri as r,
  Ft as s,
  G as t,
  W as u,
  Dv as v,
  rd as w,
  pv as x,
  _v as y,
  Wr as z
};
