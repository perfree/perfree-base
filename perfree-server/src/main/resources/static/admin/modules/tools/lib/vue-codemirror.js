import { b as B } from "./codemirror.js";
import { z as g, E as h, p as z, A as T, B as E, C as F, S as P, D as W } from "./@codemirror.js";
/*!
* VueCodemirror v6.1.1
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon
*/
const R = window.Vue.inject, A = window.Vue.defineComponent, y = window.Vue.shallowRef, M = window.Vue.computed, I = window.Vue.toRaw, k = window.Vue.onMounted, f = window.Vue.watch, L = window.Vue.onBeforeUnmount, N = window.Vue.h;
var q = Object.freeze({ autofocus: !1, disabled: !1, indentWithTab: !0, tabSize: 2, placeholder: "", autoDestroy: !0, extensions: [B] }), G = Symbol("vue-codemirror-global-config"), a, H = function(t) {
  var r = t.onUpdate, c = t.onChange, p = t.onFocus, d = t.onBlur, s = function(n, l) {
    var o = {};
    for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && l.indexOf(e) < 0 && (o[e] = n[e]);
    if (n != null && typeof Object.getOwnPropertySymbols == "function") {
      var i = 0;
      for (e = Object.getOwnPropertySymbols(n); i < e.length; i++) l.indexOf(e[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, e[i]) && (o[e[i]] = n[e[i]]);
    }
    return o;
  }(t, ["onUpdate", "onChange", "onFocus", "onBlur"]);
  return h.create({ doc: s.doc, selection: s.selection, extensions: (Array.isArray(s.extensions) ? s.extensions : [s.extensions]).concat([g.updateListener.of(function(n) {
    r(n), n.docChanged && c(n.state.doc.toString(), n), n.focusChanged && (n.view.hasFocus ? p(n) : d(n));
  })]) });
}, b = function(t) {
  var r = new W();
  return { compartment: r, run: function(c) {
    r.get(t.state) ? t.dispatch({ effects: r.reconfigure(c) }) : t.dispatch({ effects: P.appendConfig.of(r.of(c)) });
  } };
}, w = function(t, r) {
  var c = b(t), p = c.compartment, d = c.run;
  return function(s) {
    var n = p.get(t.state);
    d(s ?? n !== r ? r : []);
  };
}, v = { type: Boolean, default: void 0 }, J = { autofocus: v, disabled: v, indentWithTab: v, tabSize: Number, placeholder: String, style: Object, autoDestroy: v, phrases: Object, root: Object, extensions: Array, selection: Object }, K = { modelValue: { type: String, default: "" } }, Q = Object.assign(Object.assign({}, J), K);
(function(t) {
  t.Change = "change", t.Update = "update", t.Focus = "focus", t.Blur = "blur", t.Ready = "ready", t.ModelUpdate = "update:modelValue";
})(a || (a = {}));
var m = {};
m[a.Change] = function(t, r) {
  return !0;
}, m[a.Update] = function(t) {
  return !0;
}, m[a.Focus] = function(t) {
  return !0;
}, m[a.Blur] = function(t) {
  return !0;
}, m[a.Ready] = function(t) {
  return !0;
};
var O = {};
O[a.ModelUpdate] = m[a.Change];
var X = Object.assign(Object.assign({}, m), O), Y = A({ name: "VueCodemirror", props: Object.assign({}, Q), emits: Object.assign({}, X), setup: function(t, r) {
  var c = y(), p = y(), d = y(), s = Object.assign(Object.assign({}, q), R(G, {})), n = M(function() {
    var l = {};
    return Object.keys(I(t)).forEach(function(o) {
      var e;
      o !== "modelValue" && (l[o] = (e = t[o]) !== null && e !== void 0 ? e : s[o]);
    }), l;
  });
  return k(function() {
    var l;
    p.value = H({ doc: t.modelValue, selection: n.value.selection, extensions: (l = s.extensions) !== null && l !== void 0 ? l : [], onFocus: function(e) {
      return r.emit(a.Focus, e);
    }, onBlur: function(e) {
      return r.emit(a.Blur, e);
    }, onUpdate: function(e) {
      return r.emit(a.Update, e);
    }, onChange: function(e, i) {
      e !== t.modelValue && (r.emit(a.Change, e, i), r.emit(a.ModelUpdate, e, i));
    } }), d.value = function(e) {
      return new g(Object.assign({}, e));
    }({ state: p.value, parent: c.value, root: n.value.root });
    var o = function(e) {
      var i = function() {
        return e.state.doc.toString();
      }, j = b(e).run, S = w(e, [g.editable.of(!1), h.readOnly.of(!0)]), V = w(e, z.of([T])), C = b(e).run, x = b(e).run, U = b(e).run, D = b(e).run;
      return { focus: function() {
        return e.focus();
      }, getDoc: i, setDoc: function(u) {
        u !== i() && e.dispatch({ changes: { from: 0, to: e.state.doc.length, insert: u } });
      }, reExtensions: j, toggleDisabled: S, toggleIndentWithTab: V, setTabSize: function(u) {
        C([h.tabSize.of(u), E.of(" ".repeat(u))]);
      }, setPhrases: function(u) {
        x([h.phrases.of(u)]);
      }, setPlaceholder: function(u) {
        U(F(u));
      }, setStyle: function(u) {
        u === void 0 && (u = {}), D(g.theme({ "&": Object.assign({}, u) }));
      } };
    }(d.value);
    f(function() {
      return t.modelValue;
    }, function(e) {
      e !== o.getDoc() && o.setDoc(e);
    }), f(function() {
      return t.extensions;
    }, function(e) {
      return o.reExtensions(e || []);
    }, { immediate: !0 }), f(function() {
      return n.value.disabled;
    }, function(e) {
      return o.toggleDisabled(e);
    }, { immediate: !0 }), f(function() {
      return n.value.indentWithTab;
    }, function(e) {
      return o.toggleIndentWithTab(e);
    }, { immediate: !0 }), f(function() {
      return n.value.tabSize;
    }, function(e) {
      return o.setTabSize(e);
    }, { immediate: !0 }), f(function() {
      return n.value.phrases;
    }, function(e) {
      return o.setPhrases(e || {});
    }, { immediate: !0 }), f(function() {
      return n.value.placeholder;
    }, function(e) {
      return o.setPlaceholder(e);
    }, { immediate: !0 }), f(function() {
      return n.value.style;
    }, function(e) {
      return o.setStyle(e);
    }, { immediate: !0 }), n.value.autofocus && o.focus(), r.emit(a.Ready, { state: p.value, view: d.value, container: c.value });
  }), L(function() {
    n.value.autoDestroy && d.value && function(l) {
      l.destroy();
    }(d.value);
  }), function() {
    return N("div", { class: "v-codemirror", style: { display: "contents" }, ref: c });
  };
} }), $ = Y;
export {
  $ as T
};
