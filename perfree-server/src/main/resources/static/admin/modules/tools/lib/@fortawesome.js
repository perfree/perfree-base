var E = { env: {} };
const w = window["fontawesome-svg-core"].parse, R = window["fontawesome-svg-core"].icon, T = window["fontawesome-svg-core"].config, V = window["fontawesome-svg-core"].text, C = window.Vue.h, j = window.Vue.defineComponent, d = window.Vue.computed, U = window.Vue.watch;
function z(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function v(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? z(Object(r), !0).forEach(function(n) {
      f(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : z(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function q(e) {
  var t = $(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function O(e) {
  "@babel/helpers - typeof";
  return O = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, O(e);
}
function f(e, t, r) {
  return t = q(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function G(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function H(e, t) {
  if (e == null) return {};
  var r = G(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    for (i = 0; i < l.length; i++)
      n = l[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function _(e) {
  return M(e) || Z(e) || J(e) || Q();
}
function M(e) {
  if (Array.isArray(e)) return A(e);
}
function Z(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function J(e, t) {
  if (e) {
    if (typeof e == "string") return A(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return A(e, t);
  }
}
function A(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Q() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, W = { exports: {} };
(function(e) {
  (function(t) {
    var r = function(a, o, y) {
      if (!m(o) || F(o) || K(o) || k(o) || u(o))
        return o;
      var b, g = 0, I = 0;
      if (c(o))
        for (b = [], I = o.length; g < I; g++)
          b.push(r(a, o[g], y));
      else {
        b = {};
        for (var S in o)
          Object.prototype.hasOwnProperty.call(o, S) && (b[a(S, y)] = r(a, o[S], y));
      }
      return b;
    }, n = function(a, o) {
      o = o || {};
      var y = o.separator || "_", b = o.split || /(?=[A-Z])/;
      return a.split(b).join(y);
    }, i = function(a) {
      return L(a) ? a : (a = a.replace(/[\-_\s]+(.)?/g, function(o, y) {
        return y ? y.toUpperCase() : "";
      }), a.substr(0, 1).toLowerCase() + a.substr(1));
    }, l = function(a) {
      var o = i(a);
      return o.substr(0, 1).toUpperCase() + o.substr(1);
    }, p = function(a, o) {
      return n(a, o).toLowerCase();
    }, s = Object.prototype.toString, u = function(a) {
      return typeof a == "function";
    }, m = function(a) {
      return a === Object(a);
    }, c = function(a) {
      return s.call(a) == "[object Array]";
    }, F = function(a) {
      return s.call(a) == "[object Date]";
    }, K = function(a) {
      return s.call(a) == "[object RegExp]";
    }, k = function(a) {
      return s.call(a) == "[object Boolean]";
    }, L = function(a) {
      return a = a - 0, a === a;
    }, x = function(a, o) {
      var y = o && "process" in o ? o.process : o;
      return typeof y != "function" ? a : function(b, g) {
        return y(b, a, g);
      };
    }, B = {
      camelize: i,
      decamelize: p,
      pascalize: l,
      depascalize: p,
      camelizeKeys: function(a, o) {
        return r(x(i, o), a);
      },
      decamelizeKeys: function(a, o) {
        return r(x(p, o), a, o);
      },
      pascalizeKeys: function(a, o) {
        return r(x(l, o), a);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    e.exports ? e.exports = B : t.humps = B;
  })(X);
})(W);
var Y = W.exports, ee = ["class", "style"];
function te(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, r) {
    var n = r.indexOf(":"), i = Y.camelize(r.slice(0, n)), l = r.slice(n + 1).trim();
    return t[i] = l, t;
  }, {});
}
function re(e) {
  return e.split(/\s+/).reduce(function(t, r) {
    return t[r] = !0, t;
  }, {});
}
function P(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == "string")
    return e;
  var n = (e.children || []).map(function(u) {
    return P(u);
  }), i = Object.keys(e.attributes || {}).reduce(function(u, m) {
    var c = e.attributes[m];
    switch (m) {
      case "class":
        u.class = re(c);
        break;
      case "style":
        u.style = te(c);
        break;
      default:
        u.attrs[m] = c;
    }
    return u;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  r.class;
  var l = r.style, p = l === void 0 ? {} : l, s = H(r, ee);
  return C(e.tag, v(v(v({}, t), {}, {
    class: i.class,
    style: v(v({}, i.style), p)
  }, i.attrs), s), n);
}
var D = !1;
try {
  D = E.env.NODE_ENV === "production";
} catch {
}
function ne() {
  if (!D && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function h(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? f({}, e, t) : {};
}
function ae(e) {
  var t, r = (t = {
    "fa-spin": e.spin,
    "fa-pulse": e.pulse,
    "fa-fw": e.fixedWidth,
    "fa-border": e.border,
    "fa-li": e.listItem,
    "fa-inverse": e.inverse,
    "fa-flip": e.flip === !0,
    "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
    "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
  }, f(f(f(f(f(f(f(f(f(f(t, "fa-".concat(e.size), e.size !== null), "fa-rotate-".concat(e.rotation), e.rotation !== null), "fa-pull-".concat(e.pull), e.pull !== null), "fa-swap-opacity", e.swapOpacity), "fa-bounce", e.bounce), "fa-shake", e.shake), "fa-beat", e.beat), "fa-fade", e.fade), "fa-beat-fade", e.beatFade), "fa-flash", e.flash), f(f(t, "fa-spin-pulse", e.spinPulse), "fa-spin-reverse", e.spinReverse));
  return Object.keys(r).map(function(n) {
    return r[n] ? n : null;
  }).filter(function(n) {
    return n;
  });
}
function N(e) {
  if (e && O(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (w.icon)
    return w.icon(e);
  if (e === null)
    return null;
  if (O(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
var oe = j({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: !1
    },
    fixedWidth: {
      type: Boolean,
      default: !1
    },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function(t) {
        return [!0, !1, "horizontal", "vertical", "both"].indexOf(t) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: !0
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    maskId: {
      type: String,
      default: null
    },
    listItem: {
      type: Boolean,
      default: !1
    },
    pull: {
      type: String,
      default: null,
      validator: function(t) {
        return ["right", "left"].indexOf(t) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: !1
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null,
      validator: function(t) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: !1
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    titleId: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: !1
    },
    bounce: {
      type: Boolean,
      default: !1
    },
    shake: {
      type: Boolean,
      default: !1
    },
    beat: {
      type: Boolean,
      default: !1
    },
    fade: {
      type: Boolean,
      default: !1
    },
    beatFade: {
      type: Boolean,
      default: !1
    },
    flash: {
      type: Boolean,
      default: !1
    },
    spinPulse: {
      type: Boolean,
      default: !1
    },
    spinReverse: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, r) {
    var n = r.attrs, i = d(function() {
      return N(t.icon);
    }), l = d(function() {
      return h("classes", ae(t));
    }), p = d(function() {
      return h("transform", typeof t.transform == "string" ? w.transform(t.transform) : t.transform);
    }), s = d(function() {
      return h("mask", N(t.mask));
    }), u = d(function() {
      return R(i.value, v(v(v(v({}, l.value), p.value), s.value), {}, {
        symbol: t.symbol,
        title: t.title,
        titleId: t.titleId,
        maskId: t.maskId
      }));
    });
    U(u, function(c) {
      if (!c)
        return ne("Could not find one or more icon(s)", i.value, s.value);
    }, {
      immediate: !0
    });
    var m = d(function() {
      return u.value ? P(u.value.abstract[0], {}, n) : null;
    });
    return function() {
      return m.value;
    };
  }
});
j({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, r) {
    var n = r.slots, i = T.familyPrefix, l = d(function() {
      return ["".concat(i, "-layers")].concat(_(t.fixedWidth ? ["".concat(i, "-fw")] : []));
    });
    return function() {
      return C("div", {
        class: l.value
      }, n.default ? n.default() : []);
    };
  }
});
j({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: null,
      validator: function(t) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(t) > -1;
      }
    }
  },
  setup: function(t, r) {
    var n = r.attrs, i = T.familyPrefix, l = d(function() {
      return h("classes", [].concat(_(t.counter ? ["".concat(i, "-layers-counter")] : []), _(t.position ? ["".concat(i, "-layers-").concat(t.position)] : [])));
    }), p = d(function() {
      return h("transform", typeof t.transform == "string" ? w.transform(t.transform) : t.transform);
    }), s = d(function() {
      var m = V(t.value.toString(), v(v({}, p.value), l.value)), c = m.abstract;
      return t.counter && (c[0].attributes.class = c[0].attributes.class.replace("fa-layers-text", "")), c[0];
    }), u = d(function() {
      return P(s.value, {}, n);
    });
    return function() {
      return u.value;
    };
  }
});
export {
  oe as F
};
