/*!
 * @form-create/element-ui v3.2.1
 * (c) 2018-2024 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
const ee = window.Vue.defineComponent, q = window.Vue.toRef, ot = window.Vue.ref, G = window.Vue.watch, _ = window.Vue.createVNode, I = window.Vue.resolveComponent, X = window.Vue.mergeProps, me = window.Vue.openBlock, ve = window.Vue.createElementBlock, le = window.Vue.createElementVNode, kt = window.Vue.isVNode, Q = window.Vue.nextTick, bn = window.Vue.Fragment, _e = window.Vue.markRaw, ie = window.Vue.reactive, Ke = window.Vue.getCurrentInstance, _n = window.Vue.provide, $n = window.Vue.inject, dt = window.Vue.toRefs, wn = window.Vue.onBeforeMount, Cn = window.Vue.onMounted, Vn = window.Vue.onBeforeUnmount, Sn = window.Vue.onUpdated, On = window.Vue.computed, Rn = window.Vue.withDirectives, Fn = window.Vue.resolveDirective, En = window.Vue.createApp, An = window.Vue.h;
function pt(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), e.push.apply(e, r);
  }
  return e;
}
function b(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pt(Object(e), !0).forEach(function(r) {
      L(n, r, e[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : pt(Object(e)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
    });
  }
  return n;
}
function U(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? U = function(t) {
    return typeof t;
  } : U = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, U(n);
}
function Dn(n, t) {
  if (!(n instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function L(n, t, e) {
  return t in n ? Object.defineProperty(n, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[t] = e, n;
}
function Pn(n, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  n.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: n,
      writable: !0,
      configurable: !0
    }
  }), t && Xe(n, t);
}
function Ae(n) {
  return Ae = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Ae(n);
}
function Xe(n, t) {
  return Xe = Object.setPrototypeOf || function(r, i) {
    return r.__proto__ = i, r;
  }, Xe(n, t);
}
function In() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function jn(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function kn(n, t) {
  if (t && (typeof t == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return jn(n);
}
function xn(n) {
  var t = In();
  return function() {
    var r = Ae(n), i;
    if (t) {
      var a = Ae(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return kn(this, i);
  };
}
function R(n) {
  return Bn(n) || Tn(n) || Mn(n) || Nn();
}
function Bn(n) {
  if (Array.isArray(n)) return Qe(n);
}
function Tn(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function Mn(n, t) {
  if (n) {
    if (typeof n == "string") return Qe(n, t);
    var e = Object.prototype.toString.call(n).slice(8, -1);
    if (e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set") return Array.from(n);
    if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return Qe(n, t);
  }
}
function Qe(n, t) {
  (t == null || t > n.length) && (t = n.length);
  for (var e = 0, r = new Array(t); e < t; e++) r[e] = n[e];
  return r;
}
function Nn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ie(n, t) {
  return Object.keys(n).reduce(function(e, r) {
    return (!t || t.indexOf(r) === -1) && e.push(n[r]), e;
  }, []);
}
function Y(n) {
  return Array.isArray(n) ? n : [null, void 0, ""].indexOf(n) > -1 ? [] : [n];
}
var Ln = "fcCheckbox", Un = ee({
  name: Ln,
  inheritAttrs: !1,
  props: {
    formCreateInject: Object,
    modelValue: {
      type: Array,
      default: function() {
        return [];
      }
    },
    type: String,
    input: Boolean,
    inputValue: String
  },
  emits: ["update:modelValue", "fc.el"],
  setup: function(t, e) {
    var r = q(t.formCreateInject, "options", []), i = q(t, "modelValue"), a = q(t, "inputValue", ""), o = ot(a.value), u = q(t, "input", !1), s = function(d) {
      var m = R(Y(i.value)), v = m.indexOf(o.value);
      o.value = d, v > -1 && (m.splice(v, 1), m.push(d), f(m));
    };
    G(a, function(c) {
      if (!u.value) {
        o.value = c;
        return;
      }
      s(c);
    });
    var l = function() {
      return Array.isArray(r.value) ? r.value : [];
    }, f = function(d) {
      e.emit("update:modelValue", d);
    };
    return {
      options: l,
      value: i,
      onInput: f,
      updateCustomValue: s,
      makeInput: function(d) {
        if (u.value)
          return _(d, {
            value: o.value,
            label: o.value
          }, {
            default: function() {
              return [_(I("ElInput"), {
                modelValue: o.value,
                "onUpdate:modelValue": s
              }, null)];
            }
          });
      }
    };
  },
  render: function() {
    var t, e, r = this, i = this.type === "button" ? "ElCheckboxButton" : "ElCheckbox", a = I(i);
    return _(I("ElCheckboxGroup"), X(this.$attrs, {
      modelValue: this.value,
      "onUpdate:modelValue": this.onInput,
      ref: "el"
    }), b({
      default: function() {
        return [r.options().map(function(u, s) {
          var l = b({}, u), f = l.value, c = l.label;
          return delete l.value, delete l.label, _(a, X(l, {
            label: f,
            value: f,
            key: i + s + "-" + f
          }), {
            default: function() {
              return [c || f || ""];
            }
          });
        }), (t = (e = r.$slots).default) === null || t === void 0 ? void 0 : t.call(e), r.makeInput(a)];
      }
    }, Ie(this.$slots, ["default"])));
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.el);
  }
});
function xt(n) {
  n = n || /* @__PURE__ */ new Map();
  var t = {
    $on: function(r, i) {
      var a = n.get(r), o = a && a.push(i);
      o || n.set(r, [i]);
    },
    $once: function(r, i) {
      i._once = !0, t.$on(r, i);
    },
    $off: function(r, i) {
      var a = n.get(r);
      a && a.splice(a.indexOf(i) >>> 0, 1);
    },
    $emit: function(r) {
      for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
        a[o - 1] = arguments[o];
      (n.get(r) || []).slice().map(function(u) {
        u._once && (t.$off(r, u), delete u._once), u.apply(void 0, a);
      }), (n.get("*") || []).slice().map(function(u) {
        u(r, a);
      });
    }
  };
  return t;
}
function je(n, t) {
  t === void 0 && (t = {});
  var e = t.insertAt;
  if (!(!n || typeof document > "u")) {
    var r = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
    i.type = "text/css", e === "top" && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n));
  }
}
var Hn = "._fc-frame ._fc-files img{display:inline-block;height:100%;vertical-align:top;width:100%}._fc-frame ._fc-upload-btn{border:1px dashed #c0ccda;cursor:pointer}._fc-frame._fc-disabled ._fc-upload-btn,._fc-frame._fc-disabled .el-button{color:#999;cursor:not-allowed!important}._fc-frame ._fc-upload-cover{background:rgba(0,0,0,.6);bottom:0;left:0;opacity:0;position:absolute;right:0;top:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}._fc-frame ._fc-upload-cover i{color:#fff;cursor:pointer;font-size:20px;margin:0 2px}._fc-frame ._fc-files:hover ._fc-upload-cover{opacity:1}._fc-frame .el-upload{display:block}._fc-frame ._fc-upload-icon{cursor:pointer}._fc-files,._fc-frame ._fc-upload-btn{background:#fff;border:1px solid #c0ccda;border-radius:4px;-webkit-box-shadow:2px 2px 5px rgba(0,0,0,.1);box-shadow:2px 2px 5px rgba(0,0,0,.1);-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;height:58px;line-height:58px;margin-right:4px;overflow:hidden;position:relative;text-align:center;width:58px}";
je(Hn);
var Bt = {
  name: "IconCircleClose"
}, zn = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Gn = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M466.752 512l-90.496-90.496a32 32 0 0145.248-45.248L512 466.752l90.496-90.496a32 32 0 1145.248 45.248L557.248 512l90.496 90.496a32 32 0 11-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 01-45.248-45.248L466.752 512z"
}, null, -1), Yn = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
}, null, -1), qn = [Gn, Yn];
function Jn(n, t, e, r, i, a) {
  return me(), ve("svg", zn, qn);
}
Bt.render = Jn;
var Tt = {
  name: "IconDocument"
}, Wn = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Kn = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 01-32 32H160a32 32 0 01-32-32V96a32 32 0 0132-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
}, null, -1), Xn = [Kn];
function Qn(n, t, e, r, i, a) {
  return me(), ve("svg", Wn, Xn);
}
Tt.render = Qn;
var Mt = {
  name: "IconDelete"
}, Zn = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, er = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32zm192 0a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32z"
}, null, -1), tr = [er];
function nr(n, t, e, r, i, a) {
  return me(), ve("svg", Zn, tr);
}
Mt.render = nr;
var Nt = {
  name: "IconView"
}, rr = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, ir = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
}, null, -1), ar = [ir];
function or(n, t, e, r, i, a) {
  return me(), ve("svg", rr, ar);
}
Nt.render = or;
var Lt = {
  name: "IconFolderOpened"
}, ur = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, sr = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M878.08 448H241.92l-96 384h636.16l96-384zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 01216.96 384H832zm-24.96 512H96a32 32 0 01-32-32V160a32 32 0 0132-32h287.872l128.384 128H864a32 32 0 0132 32v96h23.04a32 32 0 0131.04 39.744l-112 448A32 32 0 01807.04 896z"
}, null, -1), lr = [sr];
function fr(n, t, e, r, i, a) {
  return me(), ve("svg", ur, lr);
}
Lt.render = fr;
function ht(n) {
  return typeof n == "function" || Object.prototype.toString.call(n) === "[object Object]" && !kt(n);
}
var cr = "fcFrame", dr = ee({
  name: cr,
  props: {
    type: {
      type: String,
      default: "input"
    },
    field: String,
    helper: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    src: {
      type: String,
      required: !0
    },
    icon: {
      type: String,
      default: "IconFolderOpened"
    },
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "370px"
    },
    maxLength: {
      type: Number,
      default: 0
    },
    okBtnText: {
      type: String,
      default: "确定"
    },
    closeBtnText: {
      type: String,
      default: "关闭"
    },
    modalTitle: String,
    handleIcon: {
      type: [String, Boolean],
      default: void 0
    },
    title: String,
    allowRemove: {
      type: Boolean,
      default: !0
    },
    onOpen: {
      type: Function,
      default: function() {
      }
    },
    onOk: {
      type: Function,
      default: function() {
      }
    },
    onCancel: {
      type: Function,
      default: function() {
      }
    },
    onLoad: {
      type: Function,
      default: function() {
      }
    },
    onBeforeRemove: {
      type: Function,
      default: function() {
      }
    },
    onRemove: {
      type: Function,
      default: function() {
      }
    },
    onHandle: Function,
    modal: {
      type: Object,
      default: function() {
        return {};
      }
    },
    srcKey: [String, Number],
    modelValue: [Array, String, Number, Object],
    previewMask: void 0,
    footer: {
      type: Boolean,
      default: !0
    },
    reload: {
      type: Boolean,
      default: !0
    },
    closeBtn: {
      type: Boolean,
      default: !0
    },
    okBtn: {
      type: Boolean,
      default: !0
    },
    formCreateInject: Object
  },
  emits: ["update:modelValue", "change"],
  components: {
    IconFolderOpened: Lt,
    IconView: Nt
  },
  data: function() {
    return {
      fileList: Y(this.modelValue),
      previewVisible: !1,
      frameVisible: !1,
      previewImage: "",
      bus: new xt()
    };
  },
  watch: {
    modelValue: function(t) {
      this.fileList = Y(t);
    }
  },
  methods: {
    close: function() {
      this.closeModel(!0);
    },
    closeModel: function(t) {
      this.bus.$emit(t ? "$close" : "$ok"), this.reload && (this.bus.$off("$ok"), this.bus.$off("$close")), this.frameVisible = !1;
    },
    handleCancel: function() {
      this.previewVisible = !1;
    },
    showModel: function() {
      this.disabled || this.onOpen() === !1 || (this.frameVisible = !0);
    },
    input: function() {
      var t = this.fileList, e = this.maxLength === 1 ? t[0] || "" : t;
      this.$emit("update:modelValue", e), this.$emit("change", e);
    },
    makeInput: function() {
      var t = this;
      return _(I("ElInput"), X({
        type: "text",
        modelValue: this.fileList.map(function(e) {
          return t.getSrc(e);
        }).toString(),
        readonly: !0
      }, {
        key: 1
      }), {
        append: function() {
          return _(I("ElButton"), {
            icon: I(t.icon),
            onClick: function() {
              return t.showModel();
            }
          }, null);
        },
        suffix: function() {
          return t.fileList.length && !t.disabled ? _(I("ElIcon"), {
            class: "el-input__icon _fc-upload-icon",
            onClick: function() {
              t.fileList = [], t.input();
            }
          }, {
            default: function() {
              return [_(Bt, null, null)];
            }
          }) : null;
        }
      });
    },
    makeGroup: function(t) {
      return (!this.maxLength || this.fileList.length < this.maxLength) && t.push(this.makeBtn()), _("div", {
        key: 2
      }, [t]);
    },
    makeItem: function(t, e) {
      return _("div", {
        class: "_fc-files",
        key: "3" + t
      }, [e]);
    },
    valid: function(t) {
      var e = this.formCreateInject.field || this.field;
      if (e && t !== e)
        throw new Error("[frame]无效的字段值");
    },
    makeIcons: function(t, e) {
      if (this.handleIcon !== !1 || this.allowRemove === !0) {
        var r = [];
        return (this.type !== "file" && this.handleIcon !== !1 || this.type === "file" && this.handleIcon) && r.push(this.makeHandleIcon(t, e)), this.allowRemove && r.push(this.makeRemoveIcon(t, e)), _("div", {
          class: "_fc-upload-cover",
          key: 4
        }, [r]);
      }
    },
    makeHandleIcon: function(t, e) {
      var r = this, i = I(this.handleIcon === !0 || this.handleIcon === void 0 ? "icon-view" : this.handleIcon);
      return _(I("ElIcon"), {
        onClick: function() {
          return r.handleClick(t);
        },
        key: "5" + e
      }, {
        default: function() {
          return [_(i, null, null)];
        }
      });
    },
    makeRemoveIcon: function(t, e) {
      var r = this;
      return _(I("ElIcon"), {
        onClick: function() {
          return r.handleRemove(t);
        },
        key: "6" + e
      }, {
        default: function() {
          return [_(Mt, null, null)];
        }
      });
    },
    makeFiles: function() {
      var t = this;
      return this.makeGroup(this.fileList.map(function(e, r) {
        return t.makeItem(r, [_(I("ElIcon"), {
          onClick: function() {
            return t.handleClick(e);
          }
        }, {
          default: function() {
            return [_(Tt, null, null)];
          }
        }), t.makeIcons(e, r)]);
      }));
    },
    makeImages: function() {
      var t = this;
      return this.makeGroup(this.fileList.map(function(e, r) {
        return t.makeItem(r, [_("img", {
          src: t.getSrc(e)
        }, null), t.makeIcons(e, r)]);
      }));
    },
    makeBtn: function() {
      var t = this, e = I(this.icon);
      return _("div", {
        class: "_fc-upload-btn",
        onClick: function() {
          return t.showModel();
        },
        key: 7
      }, [_(I("ElIcon"), null, {
        default: function() {
          return [_(e, null, null)];
        }
      })]);
    },
    handleClick: function(t) {
      if (this.onHandle)
        return this.onHandle(t);
      this.previewImage = this.getSrc(t), this.previewVisible = !0;
    },
    handleRemove: function(t) {
      this.disabled || this.onBeforeRemove(t) !== !1 && (this.fileList.splice(this.fileList.indexOf(t), 1), this.input(), this.onRemove(t));
    },
    getSrc: function(t) {
      return this.srcKey ? t[this.srcKey] : t;
    },
    frameLoad: function(t) {
      var e = this;
      this.onLoad(t);
      try {
        this.helper === !0 && (t.form_create_helper = {
          api: this.formCreateInject.api,
          close: function(i) {
            e.valid(i), e.closeModel();
          },
          set: function(i, a) {
            e.valid(i), !e.disabled && e.$emit("update:modelValue", a);
          },
          get: function(i) {
            return e.valid(i), e.modelValue;
          },
          onOk: function(i) {
            return e.bus.$on("$ok", i);
          },
          onClose: function(i) {
            return e.bus.$on("$close", i);
          }
        });
      } catch (r) {
        console.error(r);
      }
    },
    makeFooter: function() {
      var t = this, e = this.$props, r = e.okBtnText, i = e.closeBtnText, a = e.closeBtn, o = e.okBtn, u = e.footer;
      if (u)
        return _("div", null, [a ? _(I("ElButton"), {
          onClick: function() {
            return t.onCancel() !== !1 && (t.frameVisible = !1);
          }
        }, ht(i) ? i : {
          default: function() {
            return [i];
          }
        }) : null, o ? _(I("ElButton"), {
          type: "primary",
          onClick: function() {
            return t.onOk() !== !1 && t.closeModel();
          }
        }, ht(r) ? r : {
          default: function() {
            return [r];
          }
        }) : null]);
    }
  },
  render: function() {
    var t = this, e = this.type, r;
    e === "input" ? r = this.makeInput() : e === "image" ? r = this.makeImages() : r = this.makeFiles();
    var i = this.$props, a = i.width, o = a === void 0 ? "30%" : a, u = i.height, s = i.src, l = i.title, f = i.modalTitle;
    return Q(function() {
      t.$refs.frame && t.frameLoad(t.$refs.frame.contentWindow || {});
    }), _("div", {
      class: {
        "_fc-frame": !0,
        "_fc-disabled": this.disabled
      }
    }, [r, _(I("ElDialog"), {
      appendToBody: !0,
      modal: this.previewMask,
      title: f,
      modelValue: this.previewVisible,
      onClose: this.handleCancel
    }, {
      default: function() {
        return [_("img", {
          style: "width: 100%",
          src: t.previewImage
        }, null)];
      }
    }), _(I("ElDialog"), X({
      appendToBody: !0
    }, b({
      width: o,
      title: l
    }, this.modal), {
      modelValue: this.frameVisible,
      onClose: function() {
        return t.closeModel(!0);
      }
    }), {
      default: function() {
        return [t.frameVisible || !t.reload ? _("iframe", {
          ref: "frame",
          src: s,
          frameBorder: "0",
          style: {
            height: u,
            border: "0 none",
            width: "100%"
          }
        }, null) : null];
      },
      footer: function() {
        return t.makeFooter();
      }
    })]);
  },
  beforeMount: function() {
    var t = this.formCreateInject, e = t.name, r = t.field, i = t.api;
    e && i.on("fc:closeModal:" + e, this.close), r && i.on("fc:closeModal:" + r, this.close);
  },
  beforeUnmount: function() {
    var t = this.formCreateInject, e = t.name, r = t.field, i = t.api;
    e && i.off("fc:closeModal:" + e, this.close), r && i.off("fc:closeModal:" + r, this.close);
  }
}), pr = "fcRadio", hr = ee({
  name: pr,
  inheritAttrs: !1,
  props: {
    formCreateInject: Object,
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    type: String,
    input: Boolean,
    inputValue: String
  },
  emits: ["update:modelValue", "fc.el"],
  setup: function(t, e) {
    var r = q(t.formCreateInject, "options", []), i = q(t, "modelValue"), a = q(t, "inputValue", ""), o = ot(a.value), u = q(t, "input", !1), s = function() {
      return Array.isArray(r.value) ? r.value : [];
    };
    G(a, function(c) {
      if (!u.value) {
        o.value = c;
        return;
      }
      f(c);
    });
    var l = function(d) {
      e.emit("update:modelValue", d);
    }, f = function(d) {
      var m = o.value;
      o.value = d, i.value === m && l(d);
    };
    return {
      options: s,
      value: i,
      onInput: l,
      updateCustomValue: f,
      customValue: o,
      makeInput: function(d) {
        if (u.value)
          return _(d, {
            value: o.value,
            label: o.value
          }, {
            default: function() {
              return [_(I("ElInput"), {
                modelValue: o.value,
                "onUpdate:modelValue": f
              }, null)];
            }
          });
      }
    };
  },
  render: function() {
    var t, e, r = this, i = this.type === "button" ? "ElRadioButton" : "ElRadio", a = I(i);
    return _(I("ElRadioGroup"), X(this.$attrs, {
      modelValue: this.value,
      "onUpdate:modelValue": this.onInput,
      ref: "el"
    }), b({
      default: function() {
        return [r.options().map(function(u, s) {
          var l = b({}, u), f = l.value, c = l.label;
          return delete l.value, delete l.label, _(a, X(l, {
            label: f,
            value: f,
            key: i + s + "-" + f
          }), {
            default: function() {
              return [c || f || ""];
            }
          });
        }), (t = (e = r.$slots).default) === null || t === void 0 ? void 0 : t.call(e), r.makeInput(a)];
      }
    }, Ie(this.$slots, ["default"])));
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.el);
  }
}), g = {
  type: function(t, e) {
    return Object.prototype.toString.call(t) === "[object " + e + "]";
  },
  Undef: function(t) {
    return t == null;
  },
  Element: function(t) {
    return U(t) === "object" && t !== null && t.nodeType === 1 && !g.Object(t);
  },
  trueArray: function(t) {
    return Array.isArray(t) && t.length > 0;
  },
  Function: function(t) {
    var e = this.getType(t);
    return e === "Function" || e === "AsyncFunction";
  },
  getType: function(t) {
    var e = Object.prototype.toString.call(t);
    return /^\[object (.*)\]$/.exec(e)[1];
  },
  empty: function(t) {
    return t == null || Array.isArray(t) && Array.isArray(t) && !t.length ? !0 : typeof t == "string" && !t;
  }
};
["Date", "Object", "String", "Boolean", "Array", "Number"].forEach(function(n) {
  g[n] = function(t) {
    return g.type(t, n);
  };
});
function T(n, t) {
  return {}.hasOwnProperty.call(n, t);
}
var mr = "fcSelect", vr = ee({
  name: mr,
  inheritAttrs: !1,
  props: {
    formCreateInject: Object,
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: void 0
    },
    type: String
  },
  emits: ["update:modelValue", "fc.el"],
  setup: function(t) {
    var e = q(t.formCreateInject, "options", []), r = q(t, "modelValue"), i = function() {
      return Array.isArray(e.value) ? e.value : [];
    };
    return {
      options: i,
      value: r
    };
  },
  render: function() {
    var t = this, e, r, i = function(s, l) {
      return _(I("ElOption"), X(s, {
        key: "" + l + "-" + s.value
      }), null);
    }, a = function(s, l) {
      return _(I("ElOptionGroup"), {
        label: s.label,
        key: "" + l + "-" + s.label
      }, {
        default: function() {
          return [g.trueArray(s.options) && s.options.map(function(c, d) {
            return i(c, d);
          })];
        }
      });
    }, o = this.options();
    return _(I("ElSelect"), X(this.$attrs, {
      modelValue: this.value,
      "onUpdate:modelValue": function(s) {
        return t.$emit("update:modelValue", s);
      },
      ref: "el"
    }), b({
      default: function() {
        return [o.map(function(s, l) {
          return T(s || "", "options") ? a(s, l) : i(s, l);
        }), (e = (r = t.$slots).default) === null || e === void 0 ? void 0 : e.call(r)];
      }
    }, Ie(this.$slots, ["default"])));
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.el);
  }
}), gr = "fcTree", yr = ee({
  name: gr,
  inheritAttrs: !1,
  formCreateParser: {
    mergeProp: function(t) {
      var e = t.prop.props;
      e.nodeKey || (e.nodeKey = "id"), e.props || (e.props = {
        label: "title"
      });
    }
  },
  props: {
    type: String,
    modelValue: {
      type: [Array, String, Number],
      default: function() {
        return [];
      }
    }
  },
  emits: ["update:modelValue", "fc.el"],
  watch: {
    modelValue: function() {
      this.setValue();
    }
  },
  methods: {
    updateValue: function() {
      if (this.$refs.tree) {
        var t;
        this.type === "selected" ? t = this.$refs.tree.getCurrentKey() : t = this.$refs.tree.getCheckedKeys(), this.$emit("update:modelValue", t);
      }
    },
    setValue: function() {
      if (this.$refs.tree) {
        var t = this.type;
        t === "selected" ? this.$refs.tree.setCurrentKey(this.modelValue) : this.$refs.tree.setCheckedKeys(Y(this.modelValue));
      }
    }
  },
  render: function() {
    return _(I("ElTree"), X(this.$attrs, {
      ref: "tree",
      onCheck: this.updateValue,
      "onNode-click": this.updateValue
    }), this.$slots);
  },
  mounted: function() {
    this.setValue(), this.$emit("fc.el", this.$refs.tree);
  }
}), br = "._fc-exceed .el-upload{display:none}.el-upload-list.is-disabled .el-upload{cursor:not-allowed!important}";
je(br);
var Ut = {
  name: "IconUpload"
}, _r = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, $r = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M160 832h704a32 32 0 110 64H160a32 32 0 110-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
}, null, -1), wr = [$r];
function Cr(n, t, e, r, i, a) {
  return me(), ve("svg", _r, wr);
}
Ut.render = Cr;
function mt(n, t) {
  return {
    url: n,
    name: Vr(n),
    uid: t
  };
}
function Vr(n) {
  return ("" + n).split("/").pop();
}
var Sr = "fcUpload", Or = ee({
  name: Sr,
  inheritAttrs: !1,
  formCreateParser: {
    toFormValue: function(t) {
      return Y(t);
    },
    toValue: function(t, e) {
      return e.prop.props.limit === 1 ? t[0] || "" : t;
    }
  },
  props: {
    previewMask: void 0,
    onPreview: Function,
    modalTitle: String,
    modelValue: [Array, String]
  },
  emits: ["update:modelValue", "change", "remove", "fc.el"],
  data: function() {
    return {
      previewVisible: !1,
      previewImage: "",
      fileList: []
    };
  },
  created: function() {
    this.fileList = Y(this.modelValue).map(mt);
  },
  watch: {
    modelValue: function(t) {
      this.fileList = Y(t).map(mt);
    }
  },
  methods: {
    handlePreview: function(t) {
      this.onPreview ? this.onPreview.apply(this, arguments) : (this.previewImage = t.url, this.previewVisible = !0);
    },
    update: function(t) {
      var e = t.map(function(r) {
        return r.url;
      }).filter(function(r) {
        return r !== void 0;
      });
      this.$emit("update:modelValue", e);
    },
    handleCancel: function() {
      this.previewVisible = !1;
    },
    handleChange: function(t, e) {
      this.$emit.apply(this, ["change"].concat(Array.prototype.slice.call(arguments))), t.status === "success" && this.update(e);
    },
    handleRemove: function(t, e) {
      this.$emit.apply(this, ["remove"].concat(Array.prototype.slice.call(arguments))), this.update(e);
    }
  },
  render: function() {
    var t, e, r = this, i = Y(this.modelValue).length;
    return _(bn, null, [_(I("ElUpload"), X({
      key: i,
      "list-type": "picture-card"
    }, this.$attrs, {
      class: {
        "_fc-exceed": this.$attrs.limit ? this.$attrs.limit <= i : !1
      },
      onPreview: this.handlePreview,
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      fileList: this.fileList,
      ref: "upload"
    }), b({
      default: function() {
        return [((t = (e = r.$slots).default) === null || t === void 0 ? void 0 : t.call(e)) || _(I("ElIcon"), null, {
          default: function() {
            return [_(Ut, null, null)];
          }
        })];
      }
    }, Ie(this.$slots, ["default"]))), _(I("ElDialog"), {
      appendToBody: !0,
      modal: this.previewMask,
      title: this.modalTitle,
      modelValue: this.previewVisible,
      onClose: this.handleCancel
    }, {
      default: function() {
        return [_("img", {
          style: "width: 100%",
          src: r.previewImage
        }, null)];
      }
    })]);
  },
  mounted: function() {
    this.$emit("fc.el", this.$refs.upload);
  }
});
function W(n, t, e) {
  n[t] = e;
}
function ce(n, t) {
  delete n[t];
}
function Re(n) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 ? arguments[2] : void 0, r = !1;
  for (var i in t)
    if (Object.prototype.hasOwnProperty.call(t, i)) {
      var a = t[i];
      if ((r = Array.isArray(a)) || g.Object(a)) {
        var o = n[i] === void 0;
        if (r)
          r = !1, o && W(n, i, []);
        else if (a._clone && e !== void 0)
          if (e)
            a = a.getRule(), o && W(n, i, {});
          else {
            W(n, i, a._clone());
            continue;
          }
        else
          o && W(n, i, {});
        n[i] = Re(n[i], a, e);
      } else
        W(n, i, a), g.Undef(a) || (g.Undef(a.__json) || (n[i].__json = a.__json), g.Undef(a.__origin) || (n[i].__origin = a.__origin));
    }
  return e !== void 0 && Array.isArray(n) ? n.filter(function(u) {
    return !u || !u.__ctrl;
  }) : n;
}
function Z(n) {
  return Re({}, {
    value: n
  }).value;
}
var Rr = Object.assign || function(n) {
  for (var t, e = 1; e < arguments.length; e++)
    for (var r in t = arguments[e], t)
      Object.prototype.hasOwnProperty.call(t, r) && W(n, r, t[r]);
  return n;
};
function $() {
  return Rr.apply(this, arguments);
}
function Ze(n) {
  return U(n) !== "object" || n === null ? n : n instanceof Array ? R(n) : b({}, n);
}
var Fr = '._fc-group{display:flex;flex-direction:column;justify-content:center;min-height:38px;width:100%}._fc-group-disabled ._fc-group-add,._fc-group-disabled ._fc-group-btn{cursor:not-allowed}._fc-group-handle{background-color:#fff;border:1px dashed #d9d9d9;border-radius:15px;bottom:-15px;display:flex;flex-direction:row;padding:3px 8px;position:absolute;right:30px}._fc-group-btn{cursor:pointer}._fc-group-idx{align-items:center;background:#eee;border-radius:15px;bottom:-15px;display:flex;font-weight:700;height:30px;justify-content:center;left:10px;position:absolute;width:30px}._fc-group-handle ._fc-group-btn+._fc-group-btn{margin-left:7px}._fc-group-container{border:1px dashed #d9d9d9;border-radius:5px;display:flex;flex-direction:column;margin:5px 5px 25px;padding:20px 20px 25px;position:relative}._fc-group-arrow{height:20px;position:relative;width:20px}._fc-group-arrow:before{border-left:2px solid #999;border-top:2px solid #999;content:"";height:9px;left:5px;position:absolute;top:8px;transform:rotate(45deg);width:9px}._fc-group-arrow._fc-group-down{transform:rotate(180deg)}._fc-group-plus-minus{cursor:pointer;height:20px;position:relative;width:20px}._fc-group-plus-minus:after,._fc-group-plus-minus:before{background-color:#409eff;content:"";height:2px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:60%}._fc-group-plus-minus:before{transform:translate(-50%,-50%) rotate(90deg)}._fc-group-plus-minus._fc-group-minus:before{display:none}._fc-group-plus-minus._fc-group-minus:after{background-color:#f56c6c}._fc-group-add{border:1px solid rgba(64,158,255,.5);border-radius:15px;cursor:pointer;height:25px;width:25px}._fc-group-add._fc-group-plus-minus:after,._fc-group-add._fc-group-plus-minus:before{width:50%}';
je(Fr);
var Er = "fcGroup", Ar = ee({
  name: Er,
  props: {
    field: String,
    rule: Array,
    expand: Number,
    options: Object,
    button: {
      type: Boolean,
      default: !0
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: Array,
      default: function() {
        return [];
      }
    },
    defaultValue: Object,
    sortBtn: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    syncDisabled: {
      type: Boolean,
      default: !0
    },
    onBeforeRemove: {
      type: Function,
      default: function() {
      }
    },
    onBeforeAdd: {
      type: Function,
      default: function() {
      }
    },
    formCreateInject: Object,
    parse: Function
  },
  data: function() {
    return {
      len: 0,
      cacheRule: {},
      cacheValue: {},
      sort: [],
      form: _e(this.formCreateInject.form.$form())
    };
  },
  emits: ["update:modelValue", "change", "itemMounted", "remove", "add"],
  watch: {
    rule: {
      handler: function(t, e) {
        var r = this;
        Object.keys(this.cacheRule).forEach(function(i) {
          var a = r.cacheRule[i];
          if (a.$f) {
            var o = a.$f.formData();
            if (t === e)
              a.$f.deferSyncValue(function() {
                Re(a.rule, t), a.$f.setValue(o);
              }, !0);
            else {
              var u = a.$f.formData();
              a.$f.once("reloading", function() {
                a.$f.setValue(u);
              }), a.rule = Z(t);
            }
          }
        });
      },
      deep: !0
    },
    expand: function(t) {
      var e = t - this.modelValue.length;
      e > 0 && this.expandRule(e);
    },
    modelValue: {
      handler: function(t) {
        var e = this;
        t = t || [];
        var r = Object.keys(this.sort), i = r.length, a = i - t.length;
        if (a < 0) {
          for (var o = a; o < 0; o++)
            this.addRule(t.length + o, !0);
          for (var u = 0; u < i; u++)
            this.setValue(r[u], t[u]);
        } else {
          if (a > 0)
            for (var s = 0; s < a; s++)
              this.removeRule(r[i - s - 1]);
          t.forEach(function(l, f) {
            e.setValue(r[f], t[f]);
          });
        }
      },
      deep: !0
    }
  },
  methods: {
    _value: function(t) {
      return t && T(t, this.field) ? t[this.field] : t;
    },
    cache: function(t, e) {
      this.cacheValue[t] = JSON.stringify(e);
    },
    input: function(t) {
      this.$emit("update:modelValue", t), this.$emit("change", t);
    },
    formData: function(t, e) {
      var r = this, i = this.cacheRule, a = this.sort;
      if (a.filter(function(u) {
        return i[u].$f;
      }).length === a.length) {
        var o = a.map(function(u) {
          var s = t === u ? e : b({}, r.cacheRule[u].$f.form), l = r.field ? s[r.field] || null : s;
          return r.cache(u, l), l;
        });
        this.input(o);
      }
    },
    setValue: function(t, e) {
      var r = this.field;
      r && (e = L({}, r, this._value(e))), this.cacheValue[t] !== JSON.stringify(r ? e[r] : e) && this.cache(t, e);
    },
    addRule: function(t, e) {
      var r = this, i = this.formCreateInject.form.copyRules(this.rule || []), a = this.options ? b({}, this.options) : {
        submitBtn: !1,
        resetBtn: !1
      };
      if (this.defaultValue) {
        a.formData || (a.formData = {});
        var o = Z(this.defaultValue);
        $(a.formData, this.field ? L({}, this.field, o) : o);
      }
      this.parse && this.parse({
        rule: i,
        options: a,
        index: this.sort.length
      }), this.cacheRule[++this.len] = {
        rule: i,
        options: a
      }, e && Q(function() {
        return r.$emit("add", i, Object.keys(r.cacheRule).length - 1);
      });
    },
    add$f: function(t, e, r) {
      var i = this;
      this.cacheRule[e].$f = r, Q(function() {
        i.$emit("itemMounted", r, Object.keys(i.cacheRule).indexOf(e));
      });
    },
    removeRule: function(t, e) {
      var r = this, i = Object.keys(this.cacheRule).indexOf(t);
      delete this.cacheRule[t], delete this.cacheValue[t], e && Q(function() {
        return r.$emit("remove", i);
      });
    },
    add: function(t) {
      if (!(this.disabled || this.onBeforeAdd(this.modelValue) === !1)) {
        var e = R(this.modelValue);
        e.push(this.defaultValue ? Z(this.defaultValue) : this.field ? null : {}), this.input(e);
      }
    },
    del: function(t, e) {
      if (!(this.disabled || this.onBeforeRemove(this.modelValue, t) === !1)) {
        this.removeRule(e, !0);
        var r = R(this.modelValue);
        r.splice(t, 1), this.input(r);
      }
    },
    addIcon: function(t) {
      return _("div", {
        class: "_fc-group-btn _fc-group-plus-minus",
        onClick: this.add
      }, null);
    },
    delIcon: function(t, e) {
      var r = this;
      return _("div", {
        class: "_fc-group-btn _fc-group-plus-minus _fc-group-minus",
        onClick: function() {
          return r.del(t, e);
        }
      }, null);
    },
    sortUpIcon: function(t) {
      var e = this;
      return _("div", {
        class: "_fc-group-btn _fc-group-arrow _fc-group-up",
        onClick: function() {
          return e.changeSort(t, -1);
        }
      }, null);
    },
    sortDownIcon: function(t) {
      var e = this;
      return _("div", {
        class: "_fc-group-btn _fc-group-arrow _fc-group-down",
        onClick: function() {
          return e.changeSort(t, 1);
        }
      }, null);
    },
    changeSort: function(t, e) {
      var r = this.sort[t];
      this.sort[t] = this.sort[t + e], this.sort[t + e] = r, this.formData(0);
    },
    makeIcon: function(t, e, r) {
      var i = this;
      if (this.$slots.button)
        return this.$slots.button({
          total: t,
          index: e,
          vm: this,
          key: r,
          del: function() {
            return i.del(e, r);
          },
          add: this.add
        });
      var a = [];
      return (!this.max || t < this.max) && t === e + 1 && a.push(this.addIcon(r)), t > this.min && a.push(this.delIcon(e, r)), this.sortBtn && e && a.push(this.sortUpIcon(e)), this.sortBtn && e !== t - 1 && a.push(this.sortDownIcon(e)), a;
    },
    emitEvent: function(t, e, r, i) {
      this.$emit.apply(this, [t].concat(R(e), [this.cacheRule[i].$f, r]));
    },
    expandRule: function(t) {
      for (var e = 0; e < t; e++)
        this.addRule(e);
    }
  },
  created: function() {
    var t = this;
    G(function() {
      return b({}, t.cacheRule);
    }, function(i) {
      t.sort = Object.keys(i);
    }, {
      immediate: !0
    });
    for (var e = (this.expand || 0) - this.modelValue.length, r = 0; r < this.modelValue.length; r++)
      this.addRule(r);
    e > 0 && this.expandRule(e);
  },
  render: function() {
    var t = this, e = this.sort, r = this.button, i = this.form, a = this.disabled, o = e.length === 0 ? this.$slots.default ? this.$slots.default({
      vm: this,
      add: this.add
    }) : _("div", {
      key: "a_def",
      class: "_fc-group-plus-minus _fc-group-add fc-clock",
      onClick: this.add
    }, null) : e.map(function(u, s) {
      var l = t.cacheRule[u], f = l.rule, c = l.options, d = r && !a ? t.makeIcon(e.length, s, u) : [];
      return _("div", {
        class: "_fc-group-container",
        key: u
      }, [_(i, X({
        key: u
      }, {
        disabled: a,
        "onUpdate:modelValue": function(v) {
          return t.formData(u, v);
        },
        "onEmit-event": function(v) {
          for (var w = arguments.length, V = new Array(w > 1 ? w - 1 : 0), D = 1; D < w; D++)
            V[D - 1] = arguments[D];
          return t.emitEvent(v, V, s, u);
        },
        "onUpdate:api": function(v) {
          return t.add$f(s, u, v);
        },
        inFor: !0,
        modelValue: t.field ? L({}, t.field, t._value(t.modelValue[s])) : t.modelValue[s],
        rule: f,
        option: c,
        extendOption: !0
      }), null), _("div", {
        class: "_fc-group-idx"
      }, [s + 1]), d.length ? _("div", {
        class: "_fc-group-handle fc-clock"
      }, [d]) : null]);
    });
    return _("div", {
      key: "con",
      class: "_fc-group " + (a ? "_fc-group-disabled" : "")
    }, [o]);
  }
}), Dr = "fcSubForm", Pr = ee({
  name: Dr,
  props: {
    rule: Array,
    options: {
      type: Object,
      default: function() {
        return ie({
          submitBtn: !1,
          resetBtn: !1
        });
      }
    },
    modelValue: {
      type: Object,
      default: function() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    syncDisabled: {
      type: Boolean,
      default: !0
    },
    formCreateInject: Object
  },
  data: function() {
    return {
      cacheValue: {},
      subApi: {},
      form: _e(this.formCreateInject.form.$form())
    };
  },
  emits: ["fc:subform", "update:modelValue", "change", "itemMounted"],
  watch: {
    modelValue: function(t) {
      this.setValue(t);
    }
  },
  methods: {
    formData: function(t) {
      this.cacheValue = JSON.stringify(t), this.$emit("update:modelValue", t), this.$emit("change", t);
    },
    setValue: function(t) {
      var e = JSON.stringify(t);
      this.cacheValue !== e && (this.cacheValue = e, this.subApi.coverValue(t || {}));
    },
    add$f: function(t) {
      var e = this;
      this.subApi = t, Q(function() {
        e.$emit("itemMounted", t);
      });
    }
  },
  render: function() {
    var t = this.form;
    return _(t, {
      disabled: this.disabled,
      "onUpdate:modelValue": this.formData,
      modelValue: this.modelValue,
      "onEmit-event": this.$emit,
      "onUpdate:api": this.add$f,
      rule: this.rule,
      option: this.options,
      extendOption: !0
    }, null);
  }
}), Ht = {
  name: "IconWarning"
}, Ir = {
  class: "icon",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, jr = /* @__PURE__ */ le("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm48-176a48 48 0 11-96 0 48 48 0 0196 0zm-48-464a32 32 0 0132 32v288a32 32 0 01-64 0V288a32 32 0 0132-32z"
}, null, -1), kr = [jr];
function xr(n, t, e, r, i, a) {
  return me(), ve("svg", Ir, kr);
}
Ht.render = xr;
var Br = [Un, dr, hr, vr, yr, Or, Ar, Pr, Ht];
function Ve(n, t) {
  var e = null;
  return function() {
    for (var r = this, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    e !== null && clearTimeout(e), e = setTimeout(function() {
      return n.call.apply(n, [r].concat(a));
    }, t);
  };
}
function Se(n) {
  var t = n.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();
  return t.indexOf("-") === 0 && (t = t.substr(1)), t;
}
function Tr(n) {
  return n.replace(n[0], n[0].toLocaleUpperCase());
}
var vt = function n(t, e) {
  if (!(!t || t === e)) {
    if (t.props.formCreateInject)
      return t.props.formCreateInject;
    if (t.parent)
      return n(t.parent, e);
  }
};
function Mr(n, t, e) {
  return ee({
    name: "FormCreate" + (n.isMobile ? "Mobile" : ""),
    components: t,
    directives: e,
    props: {
      rule: {
        type: Array,
        required: !0,
        default: function() {
          return [];
        }
      },
      option: {
        type: Object,
        default: function() {
          return {};
        }
      },
      extendOption: Boolean,
      modelValue: Object,
      disabled: {
        type: Boolean,
        default: void 0
      },
      preview: {
        type: Boolean,
        default: void 0
      },
      api: Object,
      name: String,
      subForm: {
        type: Boolean,
        default: !0
      },
      inFor: Boolean
    },
    emits: ["update:api", "update:modelValue", "mounted", "submit", "change", "emit-event", "control", "remove-rule", "remove-field", "sync", "reload", "repeat-field", "update", "validate-field-fail", "validate-fail", "created"],
    render: function() {
      return this.fc.render();
    },
    setup: function(i) {
      var a = Ke();
      _n("parentFC", a);
      var o = $n("parentFC", null), u = dt(i), s = u.rule, l = u.modelValue, f = u.subForm, c = u.inFor, d = ie({
        ctxInject: {},
        destroyed: !1,
        isShow: !0,
        unique: 1,
        renderRule: R(s.value || []),
        updateValue: JSON.stringify(l.value || {})
      }), m = new n(a), v = m.api(), w = c.value, V = function() {
        if (o) {
          var O = vt(a, o);
          if (O) {
            var j;
            w ? (j = Y(O.getSubForm()), j.push(v)) : j = v, O.subForm(j);
          }
        }
      }, D = function() {
        var O = vt(a, o);
        if (O)
          if (w) {
            var j = Y(O.getSubForm()), ne = j.indexOf(v);
            ne > -1 && j.splice(ne, 1);
          } else
            O.subForm();
      }, S = null;
      wn(function() {
        var E = "", O = i.option && i.option.globalClass || {};
        Object.keys(O).forEach(function(j) {
          var ne = "";
          O[j].style && Object.keys(O[j].style).forEach(function(Fe) {
            ne += Se(Fe) + ":" + O[j].style[Fe] + ";";
          }), O[j].content && (ne += O[j].content + ";"), ne && (E += ".".concat(j, "{").concat(ne, "}"));
        }), i.option && i.option.style && (E += i.option.style), E && (S = document.createElement("style"), S.type = "text/css", S.innerHTML = E, document.head.appendChild(S));
      });
      var A = Ve(function() {
        m.bus.$emit("$loadData.$topForm");
      }, 100), k = Ve(function() {
        m.bus.$emit("$loadData.$form");
      }, 100);
      return Cn(function() {
        o && v.top.bus.$on("$loadData.$form", A), m.mounted();
      }), Vn(function() {
        o && v.top.bus.$off("$loadData.$form", A), S && document.head.removeChild(S), D(), d.destroyed = !0, m.unmount();
      }), Sn(function() {
        m.updated();
      }), G(f, function(E) {
        E ? V() : D();
      }, {
        immediate: !0
      }), G(function() {
        return R(s.value);
      }, function(E) {
        m.$handle.isBreakWatch() || E.length === d.renderRule.length && E.every(function(O) {
          return d.renderRule.indexOf(O) > -1;
        }) || (m.$handle.reloadRule(s.value), a.setupState.renderRule());
      }), G(function() {
        return i.option;
      }, function() {
        m.initOptions(), v.refresh();
      }, {
        deep: !0
      }), G(function() {
        return [i.disabled, i.preview];
      }, function() {
        v.refresh();
      }), G(l, function(E) {
        JSON.stringify(E || {}) !== d.updateValue && (v.config.forceCoverValue ? v.coverValue(E || {}) : v.setValue(E || {}));
      }, {
        deep: !0
      }), b(b({
        fc: _e(m),
        parent: o && _e(o),
        fapi: _e(v)
      }, dt(d)), {}, {
        refresh: function() {
          ++d.unique;
        },
        renderRule: function() {
          d.renderRule = R(s.value || []);
        },
        updateValue: function(O) {
          if (!d.destroyed) {
            var j = JSON.stringify(O);
            d.updateValue !== j && (d.updateValue = j, a.emit("update:modelValue", O), Q(function() {
              k(), o || A();
            }));
          }
        }
      });
    },
    created: function() {
      var i = Ke();
      i.emit("update:api", i.setupState.fapi), i.setupState.fc.init();
    }
  });
}
var zt = ["props"], Gt = ["class", "style", "directives"], Yt = ["on"], ue = function n(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = [].concat(zt, R(r.normal || [])), a = [].concat(Gt, R(r.array || [])), o = [].concat(Yt, R(r.functional || [])), u = r.props || [];
  return t.reduce(function(s, l) {
    for (var f in l)
      if (s[f])
        if (u.indexOf(f) > -1)
          s[f] = n([l[f]], s[f]);
        else if (i.indexOf(f) > -1)
          s[f] = b(b({}, s[f]), l[f]);
        else if (a.indexOf(f) > -1) {
          var c = s[f] instanceof Array ? s[f] : [s[f]], d = l[f] instanceof Array ? l[f] : [l[f]];
          s[f] = [].concat(R(c), R(d));
        } else if (o.indexOf(f) > -1)
          for (var m in l[f])
            if (s[f][m]) {
              var v = s[f][m] instanceof Array ? s[f][m] : [s[f][m]], w = l[f][m] instanceof Array ? l[f][m] : [l[f][m]];
              s[f][m] = [].concat(R(v), R(w));
            } else
              s[f][m] = l[f][m];
        else if (f === "hook")
          for (var V in l[f])
            s[f][V] ? s[f][V] = Nr(s[f][V], l[f][V]) : s[f][V] = l[f][V];
        else
          s[f] = l[f];
      else
        i.indexOf(f) > -1 || o.indexOf(f) > -1 || u.indexOf(f) > -1 ? s[f] = b({}, l[f]) : a.indexOf(f) > -1 ? s[f] = l[f] instanceof Array ? R(l[f]) : U(l[f]) === "object" ? b({}, l[f]) : l[f] : s[f] = l[f];
    return s;
  }, e);
}, Nr = function(t, e) {
  return function() {
    t && t.apply(this, arguments), e && e.apply(this, arguments);
  };
}, et = ["type", "slot", "emitPrefix", "value", "name", "native", "hidden", "display", "inject", "options", "emit", "link", "prefix", "suffix", "update", "sync", "optionsTo", "key", "slotUpdate", "computed", "preview", "component", "cache", "modelEmit"], De = ["validate", "children", "control"], Pe = ["effect"];
function qt() {
  return [].concat(et, R(zt), R(Gt), R(Yt), De, Pe);
}
function Jt(n, t, e) {
  return "[form-create ".concat(n, "]: ").concat(t) + "";
}
function ut(n, t) {
  console.error(Jt("err", n));
}
function Lr(n) {
  ut(n.toString()), console.error(n);
}
var tt = "[[FORM-CREATE-PREFIX-", nt = "-FORM-CREATE-SUFFIX]]", gt = "$FN:", yt = "$FNX:", bt = "$GLOBAL:", Ce = "function";
function Wt(n, t) {
  return JSON.stringify(Re(Array.isArray(n) ? [] : {}, n, !0), function(e, r) {
    if (!(r && r._isVue === !0)) {
      if (U(r) !== Ce)
        return r;
      if (r.__json)
        return r.__json;
      if (r.__origin && (r = r.__origin), !r.__emit)
        return tt + r + nt;
    }
  }, t);
}
function _t(n) {
  return new Function("return " + n)();
}
function oe(n, t) {
  if (n && g.String(n) && n.length > 4) {
    var e = n.trim(), r = !1;
    try {
      if (e.indexOf(nt) > 0 && e.indexOf(tt) === 0)
        e = e.replace(nt, "").replace(tt, ""), r = !0;
      else if (e.indexOf(gt) === 0)
        e = e.replace(gt, ""), r = !0;
      else if (e.indexOf(bt) === 0) {
        var i = e.replace(bt, "");
        return e = function() {
          for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++)
            s[l] = arguments[l];
          var f = s[0].api.getGlobalEvent(i);
          if (f)
            return f.call.apply(f, [this].concat(s));
        }, e.__json = n, e.__inject = !0, e;
      } else {
        if (e.indexOf(yt) === 0)
          return e = _t("function($inject){" + e.replace(yt, "") + "}"), e.__json = n, e.__inject = !0, e;
        !t && e.indexOf(Ce) === 0 && e !== Ce && (r = !0);
      }
      if (!r) return n;
      var a = _t(e.indexOf(Ce) === -1 && e.indexOf("(") !== 0 ? Ce + " " + e : e);
      return a.__json = n, a;
    } catch (o) {
      ut("解析失败:".concat(e, `

err: `).concat(o));
      return;
    }
  }
  return n;
}
function Ur(n, t) {
  return JSON.parse(n, function(e, r) {
    return g.Undef(r) || !r.indexOf ? r : oe(r, t);
  });
}
function Kt(n, t) {
  return {
    value: n,
    enumerable: !1,
    configurable: !1,
    writable: !!t
  };
}
function st(n, t) {
  return Xt([n], t || !1)[0];
}
function Xt(n, t) {
  return Re([], R(n), t || !1);
}
function se(n, t) {
  return ue(Array.isArray(t) ? t : [t], n, {
    array: De,
    normal: Pe
  }), n;
}
function $t(n) {
  var t = g.Function(n.getRule) ? n.getRule() : n;
  return t.type || (t.type = "input"), t;
}
function Hr(n, t) {
  return n ? (Object.keys(t || {}).forEach(function(e) {
    t[e] && (n[e] = se(n[e] || {}, t[e]));
  }), n) : t;
}
function Qt(n, t) {
  Object.defineProperties(n, Object.keys(t).reduce(function(e, r) {
    return e[r] = {
      get: function() {
        return t[r]();
      }
    }, e;
  }, {}));
}
function be(n) {
  return n.__fc__ || (n.__origin__ ? n.__origin__.__fc__ : null);
}
function M(n, t) {
  try {
    t = n();
  } catch (e) {
    Lr(e);
  }
  return t;
}
function He() {
  var n = {}, t = function(r) {
    return r || "default";
  };
  return {
    setSlot: function(r, i) {
      r = t(r), !(!i || Array.isArray(i) && i.length) && (n[r] || (n[r] = []), n[r].push(i));
    },
    getSlot: function(r, i) {
      r = t(r);
      var a = [];
      return (n[r] || []).forEach(function(o) {
        if (Array.isArray(o))
          a.push.apply(a, R(o));
        else if (g.Function(o)) {
          var u = o.apply(void 0, R(i || []));
          Array.isArray(u) ? a.push.apply(a, R(u)) : a.push(u);
        } else g.Undef(o) || a.push(o);
      }), a;
    },
    getSlots: function() {
      var r = this, i = {};
      return Object.keys(n).forEach(function(a) {
        i[a] = function() {
          for (var o = arguments.length, u = new Array(o), s = 0; s < o; s++)
            u[s] = arguments[s];
          return r.getSlot(a, u);
        };
      }), i;
    },
    slotLen: function(r) {
      return r = t(r), n[r] ? n[r].length : 0;
    },
    mergeBag: function(r) {
      var i = this;
      if (!r) return this;
      var a = g.Function(r.getSlots) ? r.getSlots() : r;
      return Array.isArray(r) || kt(r) ? this.setSlot(void 0, function() {
        return r;
      }) : Object.keys(a).forEach(function(o) {
        i.setSlot(o, a[o]);
      }), this;
    }
  };
}
function wt(n) {
  var t = b({}, n.props || {});
  return Object.keys(n.on || {}).forEach(function(e) {
    var r = "on".concat(Tr(e));
    Array.isArray(t[r]) ? t[r] = [].concat(R(t[r]), [n.on[e]]) : t[r] ? t[r] = [t[r], n.on[e]] : t[r] = n.on[e];
  }), t.key = n.key, t.ref = n.ref, t.class = n.class, t.style = n.style, t.slot && delete t.slot, t;
}
function Ct(n, t) {
  return Object.setPrototypeOf(n, t), n;
}
var Vt = function(t, e) {
  return typeof t == "string" ? String(e) : typeof t == "number" ? Number(e) : e;
}, pe = {
  "==": function(t, e) {
    return JSON.stringify(t) === JSON.stringify(Vt(t, e));
  },
  "!=": function(t, e) {
    return !pe["=="](t, e);
  },
  ">": function(t, e) {
    return t > e;
  },
  ">=": function(t, e) {
    return t >= e;
  },
  "<": function(t, e) {
    return t < e;
  },
  "<=": function(t, e) {
    return t <= e;
  },
  on: function(t, e) {
    return t && t.indexOf && t.indexOf(Vt(t[0], e)) > -1;
  },
  notOn: function(t, e) {
    return !pe.on(t, e);
  },
  in: function(t, e) {
    return e && e.indexOf && e.indexOf(t) > -1;
  },
  notIn: function(t, e) {
    return !pe.in(t, e);
  },
  between: function(t, e) {
    return t > e[0] && t < e[1];
  },
  notBetween: function(t, e) {
    return t < e[0] || t > e[1];
  },
  empty: function(t) {
    return g.empty(t);
  },
  notEmpty: function(t) {
    return !g.empty(t);
  },
  pattern: function(t, e) {
    return new RegExp(e, "g").test(t);
  }
};
function de(n, t) {
  return (Array.isArray(t) ? t : (t || "").split(".")).forEach(function(e) {
    n != null && (n = n[e]);
  }), n;
}
function zr(n) {
  for (var t = /{{\s*(.*?)\s*}}/g, e, r = {}; (e = t.exec(n)) !== null; )
    e[1] && (r[e[1]] = !0);
  return Object.keys(r);
}
function Zt() {
  return {
    props: {},
    on: {},
    options: [],
    children: [],
    hidden: !1,
    display: !0,
    value: void 0
  };
}
function H(n, t) {
  return function(e, r, i) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, o = new lt(n, e, r, i, a);
    return t && (g.Function(t) ? t(o) : o.props(t)), o;
  };
}
function lt(n, t, e, r, i) {
  this._data = $(Zt(), {
    type: n,
    title: t,
    field: e,
    value: r,
    props: i || {}
  }), this.event = this.on;
}
$(lt.prototype, {
  getRule: function() {
    return this._data;
  },
  setProp: function(t, e) {
    return W(this._data, t, e), this;
  },
  modelField: function(t) {
    return this._data.modelField = t, this;
  },
  _clone: function() {
    var t = new this.constructor();
    return t._data = st(this._data), t;
  }
});
function en(n) {
  n.forEach(function(t) {
    lt.prototype[t] = function(e) {
      return se(this._data, L({}, t, arguments.length < 2 ? e : L({}, e, arguments[1]))), this;
    };
  });
}
en(qt());
var Gr = H("");
function Yr(n, t, e) {
  var r = Gr("", t);
  return r._data.type = n, r._data.title = e, r;
}
function qr() {
  return {
    create: Yr,
    factory: H
  };
}
function Jr(n, t, e) {
  var r = "fail to ".concat(n, " ").concat(e.status, "'"), i = new Error(r);
  return i.status = e.status, i.url = n, i;
}
function St(n) {
  var t = n.responseText || n.response;
  if (!t)
    return t;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}
function tn(n) {
  if (!(typeof XMLHttpRequest > "u")) {
    var t = new XMLHttpRequest(), e = n.action;
    t.onerror = function(o) {
      n.onError(o);
    }, t.onload = function() {
      if (t.status < 200 || t.status >= 300)
        return n.onError(Jr(e, n, t), St(t));
      n.onSuccess(St(t));
    }, t.open(n.method || "get", e, !0);
    var r;
    n.data && ((n.dataType || "").toLowerCase() !== "json" ? (r = new FormData(), Object.keys(n.data).map(function(a) {
      r.append(a, n.data[a]);
    })) : (r = JSON.stringify(n.data), t.setRequestHeader("content-type", "application/json"))), n.withCredentials && "withCredentials" in t && (t.withCredentials = !0);
    var i = n.headers || {};
    Object.keys(i).forEach(function(a) {
      i[a] != null && t.setRequestHeader(a, i[a]);
    }), t.send(r);
  }
}
function Wr(n) {
  return new Promise(function(t, e) {
    tn(b(b({}, n), {}, {
      onSuccess: function(i) {
        var a = function(s) {
          return s;
        }, o = oe(n.parse);
        g.Function(o) ? a = o : o && g.String(o) && (a = function(s) {
          return de(s, o);
        }), t(a(i));
      },
      onError: function(i) {
        e(i);
      }
    }));
  });
}
function we(n) {
  return Z(n);
}
function Kr(n) {
  function t(a) {
    return g.Undef(a) ? a = n.fields() : Array.isArray(a) || (a = [a]), a;
  }
  function e(a, o, u) {
    t(a).forEach(function(s) {
      n.getCtxs(s).forEach(function(l) {
        W(l.rule, o, u), n.$render.clearCache(l);
      });
    });
  }
  function r() {
    var a = n.subForm;
    return Object.keys(a).reduce(function(o, u) {
      var s = a[u];
      return s && (Array.isArray(s) ? o.push.apply(o, R(s)) : o.push(s)), o;
    }, []);
  }
  var i = {
    get config() {
      return n.options;
    },
    set config(a) {
      n.fc.options.value = a;
    },
    get options() {
      return n.options;
    },
    set options(a) {
      n.fc.options.value = a;
    },
    get form() {
      return n.form;
    },
    get rule() {
      return n.rules;
    },
    get parent() {
      return n.vm.setupState.parent && n.vm.setupState.parent.setupState.fapi;
    },
    get top() {
      return i.parent ? i.parent.top : i;
    },
    get children() {
      return r();
    },
    formData: function(o) {
      return t(o).reduce(function(u, s) {
        var l = n.getFieldCtx(s);
        return l && (u[l.field] = we(l.rule.value)), u;
      }, n.options.appendValue !== !1 ? we(n.appendData) : {});
    },
    getValue: function(o) {
      var u = n.getFieldCtx(o);
      if (u)
        return we(u.rule.value);
    },
    coverValue: function(o) {
      var u = b({}, o || {});
      n.deferSyncValue(function() {
        i.fields().forEach(function(s) {
          var l = n.fieldCtx[s];
          if (l) {
            var f = T(o, s);
            l.forEach(function(c) {
              c.rule.value = f ? o[s] : void 0;
            }), delete u[s];
          }
        }), $(n.appendData, u);
      });
    },
    setValue: function(o) {
      var u = o;
      arguments.length >= 2 && (u = L({}, o, arguments[1])), n.deferSyncValue(function() {
        Object.keys(u).forEach(function(s) {
          var l = n.fieldCtx[s];
          if (!l) return n.appendData[s] = u[s];
          l.forEach(function(f) {
            f.rule.value = u[s];
          });
        });
      });
    },
    removeField: function(o) {
      var u = n.getCtx(o);
      return n.deferSyncValue(function() {
        n.getCtxs(o).forEach(function(s) {
          s.rm();
        });
      }, !0), u ? u.origin : void 0;
    },
    removeRule: function(o) {
      var u = o && be(o);
      if (u)
        return u.rm(), u.origin;
    },
    fields: function() {
      return n.fields();
    },
    append: function(o, u, s) {
      var l = n.sort.length - 1, f, c = n.getCtx(u);
      if (c)
        if (s) {
          if (f = c.getPending("children", c.rule.children), !Array.isArray(f)) return;
          l = c.rule.children.length - 1;
        } else
          l = c.root.indexOf(c.origin), f = c.root;
      else f = n.rules;
      f.splice(l + 1, 0, o);
    },
    prepend: function(o, u, s) {
      var l = 0, f, c = n.getCtx(u);
      if (c)
        if (s) {
          if (f = c.getPending("children", c.rule.children), !Array.isArray(f)) return;
        } else
          l = c.root.indexOf(c.origin), f = c.root;
      else f = n.rules;
      f.splice(l, 0, o);
    },
    hidden: function(o, u) {
      e(u, "hidden", !!o), n.refresh();
    },
    hiddenStatus: function(o) {
      var u = n.getCtx(o);
      if (u)
        return !!u.rule.hidden;
    },
    display: function(o, u) {
      e(u, "display", !!o), n.refresh();
    },
    displayStatus: function(o) {
      var u = n.getCtx(o);
      if (u)
        return !!u.rule.display;
    },
    disabled: function(o, u) {
      t(u).forEach(function(s) {
        n.getCtxs(s).forEach(function(l) {
          W(l.rule.props, "disabled", !!o);
        });
      }), n.refresh();
    },
    all: function(o) {
      return Object.keys(n.ctxs).map(function(u) {
        var s = n.ctxs[u];
        return o ? s.origin : s.rule;
      });
    },
    model: function(o) {
      return n.fields().reduce(function(u, s) {
        var l = n.fieldCtx[s][0];
        return u[s] = o ? l.origin : l.rule, u;
      }, {});
    },
    component: function(o) {
      return Object.keys(n.nameCtx).reduce(function(u, s) {
        var l = n.nameCtx[s].map(function(f) {
          return o ? f.origin : f.rule;
        });
        return u[s] = l.length === 1 ? l[0] : l, u;
      }, {});
    },
    bind: function() {
      return i.form;
    },
    reload: function(o) {
      n.reloadRule(o);
    },
    updateOptions: function(o) {
      n.fc.updateOptions(o), i.refresh();
    },
    onSubmit: function(o) {
      i.updateOptions({
        onSubmit: o
      });
    },
    sync: function(o) {
      if (Array.isArray(o)) {
        o.forEach(function(s) {
          return i.sync(s);
        });
        return;
      }
      var u = g.Object(o) ? be(o) : n.getCtxs(o);
      u && (u = Array.isArray(u) ? u : [u], u.forEach(function(s) {
        if (!s.deleted) {
          var l = n.subForm[s.id];
          l && (Array.isArray(l) ? l.forEach(function(f) {
            f.refresh();
          }) : l && l.refresh()), n.$render.clearCache(s);
        }
      }), n.refresh());
    },
    refresh: function() {
      r().forEach(function(o) {
        o.refresh();
      }), n.$render.clearCacheAll(), n.refresh();
    },
    refreshOptions: function() {
      n.$manager.updateOptions(n.options), i.refresh();
    },
    hideForm: function(o) {
      n.vm.setupState.isShow = !o;
    },
    changeStatus: function() {
      return n.changeStatus;
    },
    clearChangeStatus: function() {
      n.changeStatus = !1;
    },
    updateRule: function(o, u) {
      n.getCtxs(o).forEach(function(s) {
        $(s.rule, u);
      });
    },
    updateRules: function(o) {
      Object.keys(o).forEach(function(u) {
        i.updateRule(u, o[u]);
      });
    },
    mergeRule: function(o, u) {
      n.getCtxs(o).forEach(function(s) {
        se(s.rule, u);
      });
    },
    mergeRules: function(o) {
      Object.keys(o).forEach(function(u) {
        i.mergeRule(u, o[u]);
      });
    },
    getRule: function(o, u) {
      var s = n.getCtx(o);
      if (s)
        return u ? s.origin : s.rule;
    },
    getRenderRule: function(o) {
      var u = n.getCtx(o);
      if (u)
        return u.prop;
    },
    getRefRule: function(o) {
      var u = n.getCtxs(o);
      if (u) {
        var s = u.map(function(l) {
          return l.rule;
        });
        return s.length === 1 ? s[0] : s;
      }
    },
    setEffect: function(o, u, s) {
      var l = n.getCtx(o);
      l && u && (u[0] === "$" && (u = u.substr(1)), T(l.rule, "$" + u) && W(l.rule, "$" + u, s), T(l.rule, "effect") || (l.rule.effect = {}), W(l.rule.effect, u, s));
    },
    clearEffectData: function(o, u) {
      var s = n.getCtx(o);
      s && (u && u[0] === "$" && (u = u.substr(1)), s.clearEffectData(u), i.sync(o));
    },
    updateValidate: function(o, u, s) {
      s ? i.mergeRule(o, {
        validate: u
      }) : e(o, "validate", u);
    },
    updateValidates: function(o, u) {
      Object.keys(o).forEach(function(s) {
        i.updateValidate(s, o[s], u);
      });
    },
    refreshValidate: function() {
      i.refresh();
    },
    resetFields: function(o) {
      t(o).forEach(function(u) {
        n.getCtxs(u).forEach(function(s) {
          n.$render.clearCache(s), s.rule.value = we(s.defaultValue);
        });
      });
    },
    method: function(o, u) {
      var s = i.el(o);
      if (!s || !s[u]) throw new Error(Jt("err", "".concat(u, "方法不存在")));
      return function() {
        return s[u].apply(s, arguments);
      };
    },
    exec: function(o, u) {
      for (var s = arguments.length, l = new Array(s > 2 ? s - 2 : 0), f = 2; f < s; f++)
        l[f - 2] = arguments[f];
      return M(function() {
        return i.method(o, u).apply(void 0, l);
      });
    },
    toJson: function(o) {
      return Wt(i.rule, o);
    },
    trigger: function(o, u) {
      for (var s = i.el(o), l = arguments.length, f = new Array(l > 2 ? l - 2 : 0), c = 2; c < l; c++)
        f[c - 2] = arguments[c];
      s && s.$emit.apply(s, [u].concat(f));
    },
    el: function(o) {
      var u = n.getCtx(o);
      if (u) return u.el || n.vm.refs[u.ref];
    },
    closeModal: function(o) {
      n.bus.$emit("fc:closeModal:" + o);
    },
    getSubForm: function(o) {
      var u = n.getCtx(o);
      return u ? n.subForm[u.id] : void 0;
    },
    getChildrenRuleList: function(o) {
      var u = U(o) === "object", s = u ? be(o) : n.getCtx(o), l = s ? s.rule : u ? o : i.getRule(o);
      if (!l)
        return [];
      var f = [], c = function(m) {
        m && m.forEach(function(v) {
          U(v) === "object" && (v.field && f.push(v), f.push.apply(f, R(i.getChildrenRuleList(v))));
        });
      };
      return c(s ? s.loadChildrenPending() : l.children), f;
    },
    getParentSubRule: function(o) {
      var u = U(o) === "object", s = u ? be(o) : n.getCtx(o);
      if (s) {
        var l = s.getParentGroup();
        if (l)
          return l.rule;
      }
    },
    getChildrenFormData: function(o) {
      var u = i.getChildrenRuleList(o);
      return u.reduce(function(s, l) {
        return s[l.field] = we(l.value), s;
      }, {});
    },
    setChildrenFormData: function(o, u, s) {
      var l = i.getChildrenRuleList(o);
      n.deferSyncValue(function() {
        l.forEach(function(f) {
          T(u, f.field) ? f.value = u[f.field] : s && (f.value = void 0);
        });
      });
    },
    getGlobalEvent: function(o) {
      var u = i.options.globalEvent[o];
      if (u)
        return U(u) === "object" && (u = u.handle), oe(u);
    },
    getGlobalData: function(o) {
      return new Promise(function(u, s) {
        var l = i.options.globalData[o];
        l || u(n.fc.loadData[o]), l.type === "fetch" ? i.fetch(l).then(function(f) {
          u(f);
        }).catch(s) : u(l.data);
      });
    },
    nextTick: function(o) {
      n.bus.$once("next-tick", o), n.refresh();
    },
    nextRefresh: function(o) {
      n.nextRefresh(), o && M(o);
    },
    deferSyncValue: function(o, u) {
      n.deferSyncValue(o, u);
    },
    emit: function(o) {
      for (var u, s = arguments.length, l = new Array(s > 1 ? s - 1 : 0), f = 1; f < s; f++)
        l[f - 1] = arguments[f];
      (u = n.vm).emit.apply(u, [o].concat(l));
    },
    bus: n.bus,
    fetch: function(o) {
      return new Promise(function(u, s) {
        n.beforeFetch(o).then(function() {
          return Wr(o).then(u).catch(s);
        });
      });
    },
    getData: function(o, u) {
      return n.fc.getLoadData(o, u);
    },
    setData: function(o, u) {
      return n.fc.setData(o, u);
    },
    helper: {
      tidyFields: t,
      props: e
    }
  };
  return ["on", "once", "off"].forEach(function(a) {
    i[a] = function() {
      var o;
      (o = n.bus)["$".concat(a)].apply(o, arguments);
    };
  }), i.changeValue = i.changeField = i.setValue, i;
}
function Xr(n) {
  $(n.prototype, {
    initCache: function() {
      this.clearCacheAll();
    },
    clearCache: function(e) {
      if (!e.rule.cache) {
        if (!this.cache[e.id]) {
          e.parent && this.clearCache(e.parent);
          return;
        }
        (this.cache[e.id].use === !0 || this.cache[e.id].parent) && this.$handle.refresh(), this.cache[e.id].parent && this.clearCache(this.cache[e.id].parent), this.cache[e.id] = null;
      }
    },
    clearCacheAll: function() {
      this.cache = {};
    },
    setCache: function(e, r, i) {
      this.cache[e.id] = {
        vnode: r,
        use: !1,
        parent: i,
        slot: e.rule.slot
      };
    },
    getCache: function(e) {
      var r = this.cache[e.id];
      if (r)
        return r.use = !0, r.vnode;
    }
  });
}
function ae(n) {
  var t = n.replace(/(-[a-z])/g, function(e) {
    return e.replace("-", "").toLocaleUpperCase();
  });
  return nn(t);
}
function nn(n) {
  return n.replace(n[0], n[0].toLowerCase());
}
function rn(n) {
  return n == null ? "" : U(n) === "object" ? JSON.stringify(n, null, 2) : String(n);
}
var Qr = 0;
function ke() {
  var n = 370 + ++Qr;
  return "F" + Math.random().toString(36).substr(3, 3) + Number("".concat(Date.now())).toString(36) + n.toString(36) + "c";
}
function Oe(n, t, e) {
  var r = n, i;
  return (t || "").split(".").forEach(function(a) {
    i && ((!r[i] || U(r[i]) != "object") && (r[i] = {}), r = r[i]), i = a;
  }), r[i] = e, r;
}
function Zr(n) {
  $(n.prototype, {
    initRender: function() {
      this.cacheConfig = {};
    },
    getTypeSlot: function(e) {
      var r = function i(a) {
        if (a) {
          var o = void 0;
          return e.rule.field && (o = a.slots["field-" + Se(e.rule.field)] || a.slots["field-" + e.rule.field]), o || (o = a.slots["type-" + Se(e.type)] || a.slots["type-" + e.type]), o || i(a.setupState.parent);
        }
      };
      return r(this.vm);
    },
    render: function() {
      var e = this;
      if (this.vm.setupState.isShow) {
        this.$manager.beforeRender();
        var r = He();
        return this.sort.forEach(function(i) {
          e.renderSlot(r, e.$handle.ctxs[i]);
        }), this.$manager.render(r);
      }
    },
    renderSlot: function(e, r, i) {
      if (this.isFragment(r)) {
        r.initProp(), this.mergeGlobal(r), r.initNone();
        var a = this.renderChildren(r.loadChildrenPending(), r), o = a.default;
        o && e.setSlot(r.rule.slot, function() {
          return o();
        }), delete a.default, e.mergeBag(a);
      } else
        e.setSlot(r.rule.slot, this.renderCtx(r, i));
    },
    mergeGlobal: function(e) {
      var r = this, i = this.$handle.options.global;
      i && (this.cacheConfig[e.trueType] || (this.cacheConfig[e.trueType] = On(function() {
        var a = r.$handle.options.global;
        return se({}, [a["*"], a[e.originType] || a[e.type] || a[e.type] || {}]);
      })), e.prop = se({}, [this.cacheConfig[e.trueType].value, e.prop]));
    },
    setOptions: function(e) {
      var r = e.loadPending({
        key: "options",
        origin: e.prop.options,
        def: []
      });
      e.prop.options = r, e.prop.optionsTo && r && Oe(e.prop, e.prop.optionsTo, r);
    },
    deepSet: function(e) {
      var r = e.rule.deep;
      r && Object.keys(r).sort(function(i, a) {
        return i.length < a.length ? -1 : 1;
      }).forEach(function(i) {
        Oe(e.prop, i, r[i]);
      });
    },
    parseSide: function(e, r) {
      return g.Object(e) ? se({
        props: {
          formCreateInject: r.prop.props.formCreateInject
        }
      }, e) : e;
    },
    renderSides: function(e, r, i) {
      var a = r[i ? "rule" : "prop"];
      return [this.renderRule(this.parseSide(a.prefix, r)), e, this.renderRule(this.parseSide(a.suffix, r))];
    },
    renderId: function(e, r) {
      var i = this, a = this.$handle[r === "field" ? "fieldCtx" : "nameCtx"][e];
      return a ? a.map(function(o) {
        return i.renderCtx(o, o.parent);
      }) : void 0;
    },
    renderCtx: function(e, r) {
      var i = this;
      try {
        if (e.type === "hidden") return;
        var a = e.rule;
        if (!this.cache[e.id] || this.cache[e.id].slot !== a.slot) {
          var o;
          e.initProp(), this.mergeGlobal(e), e.initNone(), this.$manager.tidyRule(e), this.deepSet(e), this.setOptions(e), this.ctxProp(e);
          var u = e.prop;
          u.preview = !!(u.preview != null ? u.preview : this.vm.props.preview !== void 0 ? this.vm.props.preview : this.options.preview), u.props.formCreateInject = this.injectProp(e);
          var s = u.cache !== !1, l = u.preview;
          if (u.hidden) {
            this.setCache(e, void 0, r);
            return;
          }
          o = function() {
            for (var c = arguments.length, d = new Array(c), m = 0; m < c; m++)
              d[m] = arguments[m];
            var v = {
              rule: a,
              prop: u,
              preview: l,
              api: i.$handle.api,
              model: u.model || {},
              slotValue: d
            };
            d.length && a.slotUpdate && M(function() {
              return a.slotUpdate(v);
            });
            var w = {}, V = e.loadChildrenPending();
            e.parser.renderChildren ? w = e.parser.renderChildren(V, e) : e.parser.loadChildren !== !1 && (w = i.renderChildren(V, e));
            var D = i.getTypeSlot(e), S;
            return D ? (v.children = w, S = D(v)) : S = l ? e.parser.preview(Ze(w), e) : e.parser.render(Ze(w), e), S = i.renderSides(S, e), !(!e.input && g.Undef(u.native)) && u.native !== !0 && (S = i.$manager.makeWrap(e, S)), e.none && (Array.isArray(S) ? S = S.map(function(A) {
              return !A || !A.__v_isVNode ? A : i.none(A);
            }) : S = i.none(S)), s && i.setCache(e, function() {
              return i.stable(S);
            }, r), S;
          }, this.setCache(e, o, r);
        }
        return function() {
          var f = i.getCache(e);
          if (f)
            return f.apply(void 0, arguments);
          if (i.cache[e.id])
            return;
          var c = i.renderCtx(e, e.parent);
          if (c)
            return c();
        };
      } catch (f) {
        console.error(f);
        return;
      }
    },
    none: function(e) {
      if (e)
        return Array.isArray(e.props.class) ? e.props.class.push("fc-none") : e.props.class = e.props.class ? [e.props.class, "fc-none"] : "fc-none", e;
    },
    stable: function(e) {
      var r = this, i = Array.isArray(e) ? e : [e];
      return i.forEach(function(a) {
        a && a.__v_isVNode && a.children && U(a.children) === "object" && (a.children.$stable = !0, r.stable(a.children));
      }), e;
    },
    getModelField: function(e) {
      return e.rule.modelField || e.parser.modelField || this.fc.modelFields[this.vNode.aliasMap[e.type]] || this.fc.modelFields[e.type] || this.fc.modelFields[e.originType] || "modelValue";
    },
    isFragment: function(e) {
      return e.type === "fragment" || e.type === "template";
    },
    injectProp: function(e) {
      var r = this, i = this.vm.setupState;
      i.ctxInject[e.id] || (i.ctxInject[e.id] = {
        api: this.$handle.api,
        form: this.fc.create,
        subForm: function(u) {
          r.$handle.addSubForm(e, u);
        },
        getSubForm: function() {
          return r.$handle.subForm[e.id];
        },
        options: [],
        children: [],
        preview: !1,
        id: e.id,
        field: e.field,
        rule: e.rule,
        input: e.input
      });
      var a = i.ctxInject[e.id];
      return $(a, {
        preview: e.prop.preview,
        options: e.prop.options,
        children: e.loadChildrenPending()
      }), a;
    },
    ctxProp: function(e) {
      var r = this, i = e.ref, a = e.key, o = e.rule;
      this.$manager.mergeProp(e), e.parser.mergeProp(e);
      var u = [{
        ref: i,
        key: o.key || "".concat(a, "fc"),
        slot: void 0,
        on: {
          vnodeMounted: function(c) {
            c.el.__rule__ = e.rule, r.onMounted(e, c.el);
          },
          "fc.updateValue": function(c) {
            r.$handle.onUpdateValue(e, c);
          },
          "fc.el": function(c) {
            e.exportEl = c, c && ((c.$el || c).__rule__ = e.rule);
          }
        }
      }];
      if (e.input) {
        this.vm.props.disabled === !0 && (e.prop.props.disabled = !0);
        var s = this.getModelField(e), l = {
          callback: function(c) {
            r.onInput(e, c);
          },
          value: this.$handle.getFormData(e)
        };
        u.push({
          on: b(L({}, "update:".concat(s), l.callback), e.prop.modelEmit ? L({}, e.prop.modelEmit, function() {
            return r.onEmitInput(e);
          }) : {}),
          props: L({}, s, l.value)
        }), e.prop.model = l;
      }
      return ue(u, e.prop), e.prop;
    },
    onMounted: function(e, r) {
      e.el = this.vm.refs[e.ref] || r, e.parser.mounted(e), this.$handle.effect(e, "mounted");
    },
    onInput: function(e, r) {
      if (e.prop.modelEmit) {
        this.$handle.onBaseInput(e, r);
        return;
      }
      this.$handle.onInput(e, r);
    },
    onEmitInput: function(e) {
      this.$handle.setValue(e, e.parser.toValue(e.modelValue, e), e.modelValue);
    },
    renderChildren: function(e, r) {
      var i = this;
      if (!g.trueArray(e)) return {};
      var a = He();
      return e.map(function(o) {
        if (o) {
          if (g.String(o)) return a.setSlot(null, o);
          if (o.__fc__)
            return i.renderSlot(a, o.__fc__, r);
          o.type && Q(function() {
            i.$handle.loadChildren(e, r), i.$handle.refresh();
          });
        }
      }), a.getSlots();
    },
    defaultRender: function(e, r) {
      var i = e.prop;
      return i.component ? this.vNode.makeComponent(i.component, i, r) : this.vNode[e.type] ? this.vNode[e.type](i, r) : this.vNode[e.originType] ? this.vNode[e.originType](i, r) : this.vNode.make(nn(e.originType), i, r);
    },
    renderRule: function(e, r, i) {
      var a = this;
      if (e) {
        if (g.String(e)) return e;
        var o;
        if (i)
          o = e.type;
        else if (o = e.is, e.type) {
          o = ae(e.type);
          var u = this.vNode.aliasMap[o];
          u && (o = ae(u));
        }
        if (o) {
          var s = He();
          g.trueArray(e.children) && e.children.forEach(function(f) {
            f && s.setSlot(f == null ? void 0 : f.slot, function() {
              return a.renderRule(f);
            });
          });
          var l = b({}, e);
          return delete l.type, delete l.is, this.vNode.make(o, l, s.mergeBag(r).getSlots());
        }
      }
    }
  });
}
var ei = 1;
function ft(n) {
  $(this, {
    $handle: n,
    fc: n.fc,
    vm: n.vm,
    $manager: n.$manager,
    vNode: new n.fc.CreateNode(n.vm),
    id: ei++
  }), Qt(this, {
    options: function() {
      return n.options;
    },
    sort: function() {
      return n.sort;
    }
  }), this.initCache(), this.initRender();
}
Xr(ft);
Zr(ft);
function ti(n) {
  $(n.prototype, {
    parseInjectEvent: function(e, r) {
      var i = e.inject || this.options.injectEvent;
      return this.parseEventLst(e, r, i);
    },
    parseEventLst: function(e, r, i, a) {
      var o = this;
      return Object.keys(r).forEach(function(u) {
        var s = o.parseEvent(e, r[u], i, a);
        s && (r[u] = s);
      }), r;
    },
    parseEvent: function(e, r, i, a) {
      if (g.Function(r) && (i !== !1 && !g.Undef(i) || r.__inject))
        return this.inject(e, r, i);
      if (!a && Array.isArray(r) && r[0] && (g.String(r[0]) || g.Function(r[0])))
        return this.parseEventLst(e, r, i, !0);
      if (g.String(r)) {
        var o = oe(r);
        if (o && r !== o)
          return o.__inject ? this.parseEvent(e, o, i, !0) : o;
      }
    },
    parseEmit: function(e) {
      var r = this, i = {}, a = e.rule, o = a.emitPrefix, u = a.field, s = a.name, l = a.inject, f = a.emit || [];
      return g.trueArray(f) && f.forEach(function(c) {
        if (c) {
          var d, m = o || u || s;
          if (g.Object(c) && (d = c.inject, c = c.name, m = c.prefix || m), m) {
            var v = Se("".concat(m, "-").concat(c)), w = function() {
              var S, A, k;
              r.vm.emitsOptions && (r.vm.emitsOptions[v] = null);
              for (var E = arguments.length, O = new Array(E), j = 0; j < E; j++)
                O[j] = arguments[j];
              (S = r.vm).emit.apply(S, [v].concat(O)), (A = r.vm).emit.apply(A, ["emit-event", v].concat(O)), (k = r.bus).$emit.apply(k, [v].concat(O));
            };
            if (w.__emit = !0, !d && l === !1)
              i[c] = w;
            else {
              var V = d || l || r.options.injectEvent;
              i[c] = g.Undef(V) ? w : r.inject(a, w, V);
            }
          }
        }
      }), e.computed.on = i, i;
    },
    getInjectData: function(e, r) {
      var i = this.vm.props, a = i.option, o = i.rule;
      return {
        $f: this.api,
        api: this.api,
        rule: o,
        self: e.__origin__,
        option: a,
        inject: r
      };
    },
    inject: function(e, r, i) {
      if (r.__origin) {
        if (this.watching && !this.loading) return r;
        r = r.__origin;
      }
      var a = this, o = function() {
        for (var s = a.getInjectData(e, i), l = arguments.length, f = new Array(l), c = 0; c < l; c++)
          f[c] = arguments[c];
        return s.args = [].concat(f), f.unshift(s), r.apply(this, f);
      };
      return o.__origin = r, o.__json = r.__json, o;
    },
    loadStrVar: function(e, r) {
      var i = this;
      if (e && typeof e == "string" && e.indexOf("{{") > -1 && e.indexOf("}}") > -1) {
        var a = zr(e);
        a.forEach(function(o) {
          var u = o.split("||"), s = u[0].trim();
          if (s) {
            var l = (u[1] || "").trim(), f = r ? r(s, l) : i.fc.getLoadData(s, l);
            e = e.replaceAll("{{".concat(o, "}}"), f ?? "");
          }
        });
      }
      return e;
    },
    loadFetchVar: function(e, r) {
      var i = this, a = function(l) {
        return i.loadStrVar(l, r);
      };
      if (e.action = a(e.action), e.headers) {
        var o = {};
        Object.keys(e.headers).forEach(function(s) {
          o[a(s)] = a(e.headers[s]);
        }), e.headers = o;
      }
      if (e.data) {
        var u = {};
        Object.keys(e.data).forEach(function(s) {
          u[a(s)] = a(e.data[s]);
        }), e.data = u;
      }
      return e;
    }
  });
}
var Ot = ["hook:updated", "hook:mounted"];
function ni(n) {
  $(n.prototype, {
    usePage: function() {
      var e = this, r = this.options.page;
      if (r) {
        var i = 25, a = ri(this.rules);
        g.Object(r) && (r.first && (i = parseInt(r.first, 10) || i), r.limit && (a = parseInt(r.limit, 10) || a)), $(this, {
          first: i,
          limit: a,
          pageEnd: this.rules.length <= i
        }), this.bus.$on("page-end", function() {
          return e.vm.emit("page-end", e.api);
        }), this.pageLoad();
      }
    },
    pageLoad: function() {
      var e = this, r = function i() {
        e.pageEnd ? (e.bus.$off(Ot, i), e.bus.$emit("page-end")) : (e.first += e.limit, e.pageEnd = e.rules.length <= e.first, e.loadRule(), e.refresh());
      };
      this.bus.$on(Ot, r);
    }
  });
}
function ri(n) {
  return n.length < 31 ? 31 : Math.ceil(n.length / 3);
}
function ii(n) {
  $(n.prototype, {
    clearNextTick: function() {
      this.nextTick && clearTimeout(this.nextTick), this.nextTick = null;
    },
    bindNextTick: function(e) {
      var r = this;
      this.clearNextTick(), this.nextTick = setTimeout(function() {
        e(), r.nextTick = null;
      }, 10);
    },
    render: function() {
      return ++this.loadedId, this.vm.setupState.unique > 0 ? this.$render.render() : (this.vm.setupState.unique = 1, []);
    }
  });
}
function ai(n) {
  Object.defineProperties(n.origin, {
    __fc__: Kt(_e(n), !0)
  });
}
function an(n, t, e) {
  var r = ke(), i = !!t.field;
  $(this, {
    id: r,
    ref: r,
    wrapRef: r + "fi",
    rule: t,
    origin: t.__origin__ || t,
    name: t.name,
    pending: {},
    none: !1,
    watch: [],
    linkOn: [],
    root: [],
    ctrlRule: [],
    children: [],
    parent: null,
    group: t.subRule ? this : null,
    cacheConfig: null,
    prop: b({}, t),
    computed: {},
    payload: {},
    refRule: {},
    input: i,
    el: void 0,
    exportEl: void 0,
    defaultValue: i ? Z(e) : void 0,
    field: t.field || void 0
  }), this.updateKey(), ai(this), this.update(n, !0);
}
$(an.prototype, {
  getParentGroup: function() {
    for (var t = this.parent; t; ) {
      if (t.group)
        return t;
      t = t.parent;
    }
  },
  loadChildrenPending: function() {
    var t = this, e = this.rule.children || [];
    return Array.isArray(e) ? e : this.loadPending({
      key: "children",
      origin: e,
      def: [],
      onLoad: function(i) {
        t.$handle && t.$handle.loadChildren(i, t);
      },
      onUpdate: function(i, a) {
        t.$handle && (i === a ? t.$handle.loadChildren(i, t) : t.$handle.updateChildren(t, i, a));
      },
      onReload: function(i) {
        t.$handle ? t.$handle.updateChildren(t, [], i) : delete t.pending.children;
      }
    });
  },
  loadPending: function(t) {
    var e = this, r = t.key, i = t.origin, a = t.def, o = t.onLoad, u = t.onReload, s = t.onUpdate;
    if (this.pending[r] && this.pending[r].origin === i)
      return this.getPending(r, a);
    delete this.pending[r];
    var l = i;
    if (g.Function(i)) {
      var f = M(function() {
        return i({
          rule: e.rule,
          api: e.$api,
          update: function(d) {
            var m = d || a, v = e.getPending(r, a);
            e.setPending(r, i, m), s && s(m, v);
          },
          reload: function() {
            var d = e.getPending(r, a);
            delete e.pending[r], u && u(d), e.$api && e.$api.sync(e.rule);
          }
        });
      });
      f && g.Function(f.then) ? (f.then(function(c) {
        var d = c || a;
        e.setPending(r, i, d), o && o(d), e.$api && e.$api.sync(e.rule);
      }).catch(function(c) {
        console.error(c);
      }), l = a, this.setPending(r, i, l)) : (l = f || a, this.setPending(r, i, l), o && o(l));
    }
    return l;
  },
  getPending: function(t, e) {
    return this.pending[t] && this.pending[t].value || e;
  },
  setPending: function(t, e, r) {
    this.pending[t] = {
      origin: e,
      value: ie(r)
    };
  },
  effectData: function(t) {
    return this.payload[t] || (this.payload[t] = {}), this.payload[t];
  },
  clearEffectData: function(t) {
    t === void 0 ? this.payload = {} : delete this.payload[t];
  },
  updateKey: function(t) {
    this.key = ke(), t && this.parent && this.parent.updateKey(t);
  },
  updateType: function() {
    this.originType = this.rule.type, this.type = ae(this.rule.type), this.trueType = this.$handle.getType(this.originType);
  },
  setParser: function(t) {
    this.parser = t, t.init(this);
  },
  initProp: function() {
    var t = this, e = b({}, this.rule);
    delete e.children, this.prop = se({}, [e].concat(R(Object.keys(this.payload).map(function(r) {
      return t.payload[r];
    })), [this.computed]));
  },
  initNone: function() {
    this.none = !(g.Undef(this.prop.display) || this.prop.display);
  },
  injectValidate: function() {
    var t = this;
    return Y(this.prop.validate).map(function(e) {
      if (g.Function(e.validator)) {
        var r = b({}, e), i = t;
        return r.validator = function() {
          for (var a, o = arguments.length, u = new Array(o), s = 0; s < o; s++)
            u[s] = arguments[s];
          return (a = e.validator).call.apply(a, [{
            that: this,
            id: i.id,
            field: i.field,
            rule: i.rule,
            api: i.$handle.api
          }].concat(u));
        }, r;
      }
      return e;
    });
  },
  check: function(t) {
    return this.vm === t.vm;
  },
  unwatch: function() {
    this.watch.forEach(function(t) {
      return t();
    }), this.watch = [], this.refRule = {};
  },
  unlink: function() {
    this.linkOn.forEach(function(t) {
      return t();
    }), this.linkOn = [];
  },
  link: function() {
    this.unlink(), this.$handle.appendLink(this);
  },
  watchTo: function() {
    this.$handle.watchCtx(this);
  },
  delete: function() {
    var t = void 0;
    this.unwatch(), this.unlink(), this.rmCtrl(), this.parent && this.parent.children.splice(this.parent.children.indexOf(this) >>> 0, 1), $(this, {
      deleted: !0,
      prop: b({}, this.rule),
      computed: {},
      el: t,
      $handle: t,
      $api: t,
      vm: t,
      vNode: t,
      parent: null,
      children: [],
      cacheConfig: null,
      none: !1
    });
  },
  rmCtrl: function() {
    this.ctrlRule.forEach(function(t) {
      return t.__fc__ && t.__fc__.rm();
    }), this.ctrlRule = [];
  },
  rm: function() {
    var t = this, e = function() {
      var i = t.root.indexOf(t.origin);
      i > -1 && (t.root.splice(i, 1), t.$handle && t.$handle.refresh());
    };
    if (this.deleted) {
      e();
      return;
    }
    this.$handle.noWatch(function() {
      t.$handle.deferSyncValue(function() {
        t.rmCtrl(), e(), t.$handle.rmCtx(t), $(t, {
          root: []
        });
      }, t.input);
    });
  },
  update: function(t, e) {
    $(this, {
      deleted: !1,
      $handle: t,
      $render: t.$render,
      $api: t.api,
      vm: t.vm,
      vNode: t.$render.vNode,
      updated: !1,
      cacheValue: this.rule.value
    }), !e && this.unwatch(), this.watchTo(), this.link(), this.updateType();
  }
});
function oi(n) {
  $(n.prototype, {
    nextRefresh: function(e) {
      var r = this, i = this.loadedId;
      Q(function() {
        i === r.loadedId && (e ? e() : r.refresh());
      });
    },
    parseRule: function(e) {
      var r = this, i = $t(e);
      return Object.defineProperties(i, {
        __origin__: Kt(e, !0)
      }), ui(i), this.appendValue(i), [i, i.prefix, i.suffix].forEach(function(a) {
        a && r.loadFn(a, i);
      }), this.loadCtrl(i), i.update && (i.update = oe(i.update)), i;
    },
    loadFn: function(e, r) {
      var i = this;
      ["on", "props", "deep"].forEach(function(a) {
        e[a] && i.parseInjectEvent(r, e[a]);
      });
    },
    loadCtrl: function(e) {
      e.control && e.control.forEach(function(r) {
        r.handle && (r.handle = oe(r.handle));
      });
    },
    syncProp: function(e) {
      var r = this, i = e.rule;
      g.trueArray(i.sync) && ue([{
        on: i.sync.reduce(function(a, o) {
          return a["update:".concat(o)] = function(u) {
            i.props[o] = u, r.vm.emit("sync", o, u, i, r.fapi);
          }, a;
        }, {})
      }], e.computed);
    },
    loadRule: function() {
      var e = this;
      this.cycleLoad = !1, this.loading = !0, this.pageEnd && this.bus.$emit("load-start"), this.deferSyncValue(function() {
        if (e._loadRule(e.rules), e.loading = !1, e.cycleLoad && e.pageEnd)
          return e.loadRule();
        e.syncForm(), e.pageEnd && e.bus.$emit("load-end"), e.vm.setupState.renderRule();
      });
    },
    loadChildren: function(e, r) {
      if (this.cycleLoad = !1, this.loading = !0, this.bus.$emit("load-start"), this._loadRule(e, r), this.loading = !1, this.cycleLoad)
        return this.loadRule();
      this.syncForm(), this.bus.$emit("load-end"), this.$render.clearCache(r);
    },
    _loadRule: function(e, r) {
      var i = this, a = function s(l) {
        var f = e[l - 1];
        if (!f || !f.__fc__)
          return l > 0 ? s(l - 1) : -1;
        var c = i.sort.indexOf(f.__fc__.id);
        return c > -1 ? c : s(l - 1);
      }, o = function(l, f) {
        g.trueArray(l) && i._loadRule(l, f);
      }, u = e.map(function(s, l) {
        if (!(r && !g.Object(s)) && !(!i.pageEnd && !r && l >= i.first)) {
          if (s.__fc__ && s.__fc__.root === e && i.ctxs[s.__fc__.id])
            return o(s.__fc__.loadChildrenPending(), s.__fc__), s.__fc__;
          var f = $t(s), c = function() {
            return !!(f.field && i.fieldCtx[f.field] && i.fieldCtx[f.field][0] !== s.__fc__);
          };
          i.ruleEffect(f, "init", {
            repeat: c()
          }), c() && i.vm.emit("repeat-field", s, i.api);
          var d, m = !1, v = !!s.__fc__, w = f.value;
          if (v) {
            d = s.__fc__, w = d.defaultValue;
            var V = !d.check(i);
            if (d.deleted) {
              if (V) {
                if (Rt(d))
                  return;
                d.update(i);
              }
            } else if (V) {
              if (Rt(d))
                return;
              e[l] = s = s._clone ? s._clone() : st(s), d = null, m = !0;
            }
          }
          if (d)
            d.originType !== d.rule.type && (d.updateType(), i.bindParser(d)), i.appendValue(d.rule), d.parent && d.parent !== r && i.rmSubRuleData(d);
          else {
            var D = i.parseRule(s);
            d = new an(i, D, w), i.bindParser(d);
          }
          i.parseEmit(d), i.syncProp(d), d.parent = r || null, d.root = e, i.setCtx(d), !m && !v && i.effect(d, "load"), i.effect(d, "created");
          var S = d.loadChildrenPending();
          if (d.parser.loadChildren === !1 || o(S, d), !r) {
            var A = a(l);
            A > -1 || !l ? i.sort.splice(A + 1, 0, d.id) : i.sort.push(d.id);
          }
          var k = d.rule;
          return d.updated || (d.updated = !0, g.Function(k.update) && i.bus.$once("load-end", function() {
            i.refreshUpdate(d, k.value, "init");
          }), i.effect(d, "loaded")), i.refreshControl(d) && (i.cycleLoad = !0), d;
        }
      }).filter(function(s) {
        return !!s;
      });
      r && (r.children = u);
    },
    refreshControl: function(e) {
      return e.input && e.rule.control && this.useCtrl(e);
    },
    useCtrl: function(e) {
      var r = this, i = si(e), a = [], o = this.api;
      if (!i.length) return !1;
      for (var u = function(m) {
        var v = i[m], w = v.handle || function(D) {
          return (pe[v.condition || "=="] || pe["=="])(D, v.value);
        };
        if (!g.trueArray(v.rule)) return "continue";
        var V = b(b({}, v), {}, {
          valid: M(function() {
            return w(e.rule.value, o);
          }),
          ctrl: li(e, v.rule),
          isHidden: g.String(v.rule[0])
        });
        if (V.valid && V.ctrl || !V.valid && !V.ctrl && !V.isHidden) return "continue";
        a.push(V);
      }, s = 0; s < i.length; s++)
        var l = u(s);
      if (!a.length) return !1;
      var f = [], c = !1;
      return this.deferSyncValue(function() {
        a.reverse().forEach(function(d) {
          var m = d.isHidden, v = d.valid, w = d.rule, V = d.prepend, D = d.append, S = d.child, A = d.ctrl, k = d.method;
          if (m) {
            v ? e.ctrlRule.push({
              __ctrl: !0,
              children: w,
              valid: v
            }) : e.ctrlRule.splice(e.ctrlRule.indexOf(A), 1), f[v ? "push" : "unshift"](function() {
              k === "disabled" ? r.api.disabled(!v, w) : k === "display" ? r.api.display(v, w) : k === "required" ? (w.forEach(function(j) {
                r.api.setEffect(j, "required", v);
              }), v || r.api.clearValidateState(w)) : r.api.hidden(!v, w);
            });
            return;
          }
          if (v) {
            c = !0;
            var E = {
              type: "fragment",
              native: !0,
              __ctrl: !0,
              children: w
            };
            e.ctrlRule.push(E), r.bus.$once("load-start", function() {
              V ? o.prepend(E, V, S) : D || S ? o.append(E, D || e.id, S) : e.root.splice(e.root.indexOf(e.origin) + 1, 0, E);
            });
          } else {
            e.ctrlRule.splice(e.ctrlRule.indexOf(A), 1);
            var O = be(A);
            O && O.rm();
          }
        });
      }), f.length && Q(function() {
        f.forEach(function(d) {
          return d();
        });
      }), this.vm.emit("control", e.origin, this.api), this.effect(e, "control"), c;
    },
    reloadRule: function(e) {
      return this._reloadRule(e);
    },
    _reloadRule: function(e) {
      var r = this;
      e || (e = this.rules);
      var i = b({}, this.ctxs);
      this.clearNextTick(), this.initData(e), this.fc.rules = e, this.deferSyncValue(function() {
        r.bus.$once("load-end", function() {
          Object.keys(i).filter(function(a) {
            return r.ctxs[a] === void 0;
          }).forEach(function(a) {
            return r.rmCtx(i[a]);
          }), r.$render.clearCacheAll();
        }), r.reloading = !0, r.loadRule(), r.reloading = !1, r.refresh(), r.bus.$emit("reloading", r.api);
      }), this.bus.$off("next-tick", this.nextReload), this.bus.$once("next-tick", this.nextReload), this.bus.$emit("update", this.api);
    },
    //todo 组件生成全部通过 alias
    refresh: function() {
      this.vm.setupState.refresh();
    }
  });
}
function ui(n) {
  var t = Zt();
  return Object.keys(t).forEach(function(e) {
    T(n, e) || (n[e] = t[e]);
  }), n;
}
function si(n) {
  var t = n.rule.control || [];
  return g.Object(t) ? [t] : t;
}
function li(n, t) {
  for (var e = 0; e < n.ctrlRule.length; e++) {
    var r = n.ctrlRule[e];
    if (r.children === t) return r;
  }
}
function Rt(n) {
  return !!n.rule.__ctrl;
}
function fi(n) {
  $(n.prototype, {
    setValue: function(e, r, i, a) {
      e.deleted || (e.rule.value = r, this.changeStatus = !0, this.nextRefresh(), this.$render.clearCache(e), this.setFormData(e, i), this.syncValue(), this.valueChange(e, r), this.vm.emit("change", e.field, r, e.origin, this.api, a || !1), this.effect(e, "value"), this.emitEvent("change", e.field, r, {
        rule: e.origin,
        api: this.api,
        setFlag: a || !1
      }));
    },
    onInput: function(e, r) {
      var i;
      e.input && (this.isQuote(e, i = e.parser.toValue(r, e)) || this.isChange(e, r)) && this.setValue(e, i, r);
    },
    onUpdateValue: function(e, r) {
      var i = this;
      this.deferSyncValue(function() {
        var a = e.getParentGroup(), o = a ? i.subRuleData[a.id] : null, u = {};
        Object.keys(r || {}).forEach(function(s) {
          o && T(o, s) ? u[s] = r[s] : T(i.api.form, s) ? i.api.form[s] = r[s] : i.api.top !== i.api && T(i.api.top.form, s) && (i.api.top.form[s] = r[s]);
        }), Object.keys(u).length && i.api.setChildrenFormData(a.rule, u);
      });
    },
    onBaseInput: function(e, r) {
      this.setFormData(e, r), e.modelValue = r, this.nextRefresh(), this.$render.clearCache(e);
    },
    setFormData: function(e, r) {
      e.modelValue = r;
      var i = e.getParentGroup();
      i && (this.subRuleData[i.id] || (this.subRuleData[i.id] = {}), this.subRuleData[i.id][e.field] = e.rule.value), W(this.formData, e.id, r);
    },
    rmSubRuleData: function(e) {
      var r = e.getParentGroup();
      r && this.subRuleData[r.id] && delete this.subRuleData[r.id][e.field];
    },
    getFormData: function(e) {
      return this.formData[e.id];
    },
    syncForm: function() {
      var e = this, r = ie({});
      this.fields().reduce(function(i, a) {
        var o = e.getCtx(a);
        return i[a] = q(o.rule, "value"), i;
      }, r), this.form = r, this.syncValue();
    },
    appendValue: function(e) {
      !e.field || !T(this.appendData, e.field) || (e.value = this.appendData[e.field], delete this.appendData[e.field]);
    },
    addSubForm: function(e, r) {
      this.subForm[e.id] = r;
    },
    deferSyncValue: function(e, r) {
      this.deferSyncFn || (this.deferSyncFn = e), this.deferSyncFn.sync || (this.deferSyncFn.sync = r), M(e), this.deferSyncFn === e && (this.deferSyncFn = null, e.sync && this.syncValue());
    },
    syncValue: function() {
      if (this.deferSyncFn)
        return this.deferSyncFn.sync = !0;
      this.vm.setupState.updateValue(b(b({}, this.options.appendValue !== !1 ? this.appendData : {}), this.form));
    },
    isChange: function(e, r) {
      return JSON.stringify(this.getFormData(e), Ft) !== JSON.stringify(r, Ft);
    },
    isQuote: function(e, r) {
      return (g.Object(r) || Array.isArray(r)) && r === e.rule.value;
    },
    refreshUpdate: function(e, r, i, a) {
      var o = this;
      if (g.Function(e.rule.update)) {
        var u = M(function() {
          return e.rule.update(r, e.origin, o.api, {
            origin: i || "change",
            linkField: a
          });
        });
        if (u === void 0) return;
        e.rule.hidden = u === !0;
      }
    },
    valueChange: function(e, r) {
      this.refreshRule(e, r), this.bus.$emit("change-" + e.field, r);
    },
    refreshRule: function(e, r, i, a) {
      this.refreshControl(e) && (this.$render.clearCacheAll(), this.loadRule(), this.bus.$emit("update", this.api), this.refresh()), this.refreshUpdate(e, r, i, a);
    },
    appendLink: function(e) {
      var r = this, i = e.rule.link;
      g.trueArray(i) && i.forEach(function(a) {
        var o = function() {
          return r.refreshRule(e, e.rule.value, "link", a);
        };
        r.bus.$on("change-" + a, o), e.linkOn.push(function() {
          return r.bus.$off("change-" + a, o);
        });
      });
    },
    fields: function() {
      return Object.keys(this.fieldCtx);
    }
  });
}
function Ft(n, t) {
  return typeof t == "function" ? "" + t : t;
}
var rt = {
  init: function(t) {
  },
  toFormValue: function(t, e) {
    return t;
  },
  toValue: function(t, e) {
    return t;
  },
  mounted: function(t) {
  },
  render: function(t, e) {
    return e.$render.defaultRender(e, t);
  },
  preview: function(t, e) {
    return this.render(t, e);
  },
  mergeProp: function(t) {
  }
}, ci = ["field", "value", "vm", "template", "name", "config", "control", "inject", "sync", "payload", "optionsTo", "update", "slotUpdate", "computed", "component", "cache"];
function di(n) {
  $(n.prototype, {
    getCtx: function(e) {
      return this.getFieldCtx(e) || this.getNameCtx(e)[0] || this.ctxs[e];
    },
    getCtxs: function(e) {
      return this.fieldCtx[e] || this.nameCtx[e] || (this.ctxs[e] ? [this.ctxs[e]] : []);
    },
    setIdCtx: function(e, r, i) {
      var a = "".concat(i, "Ctx");
      this[a][r] ? this[a][r].push(e) : this[a][r] = [e];
    },
    rmIdCtx: function(e, r, i) {
      var a = "".concat(i, "Ctx"), o = this[a][r];
      if (!o) return !1;
      var u = o.splice(o.indexOf(e) >>> 0, 1).length > 0;
      return o.length || delete this[a][r], u;
    },
    getFieldCtx: function(e) {
      return (this.fieldCtx[e] || [])[0];
    },
    getNameCtx: function(e) {
      return this.nameCtx[e] || [];
    },
    setCtx: function(e) {
      var r = e.id, i = e.field, a = e.name, o = e.rule;
      this.ctxs[r] = e, a && this.setIdCtx(e, a, "name"), e.input && (this.setIdCtx(e, i, "field"), this.setFormData(e, e.parser.toFormValue(o.value, e)), this.isMounted && !this.reloading && this.vm.emit("change", e.field, o.value, e.origin, this.api));
    },
    getParser: function(e) {
      var r = this.fc.parsers;
      return r[e.originType] || r[ae(e.type)] || r[e.trueType] || rt;
    },
    bindParser: function(e) {
      e.setParser(this.getParser(e));
    },
    getType: function(e) {
      var r = this.fc.CreateNode.aliasMap, i = r[e] || r[ae(e)] || e;
      return ae(i);
    },
    noWatch: function(e) {
      this.noWatchFn || (this.noWatchFn = e), M(e), this.noWatchFn === e && (this.noWatchFn = null);
    },
    watchCtx: function(e) {
      var r = this, i = qt();
      if (i.filter(function(o) {
        return o[0] !== "_" && o[0] !== "$" && ci.indexOf(o) === -1;
      }).forEach(function(o) {
        var u = q(e.rule, o), s = o === "children";
        e.refRule[o] = u, e.watch.push(G(s ? function() {
          return g.Function(u.value) ? u.value : R(u.value || []);
        } : function() {
          return u.value;
        }, function(l, f) {
          var c = u.value;
          if (!r.isBreakWatch()) {
            if (s && e.parser.loadChildren === !1) {
              r.$render.clearCache(e), r.nextRefresh();
              return;
            }
            if (r.watching = !0, o === "link") {
              e.link();
              return;
            } else ["props", "on", "deep"].indexOf(o) > -1 ? (r.parseInjectEvent(e.rule, c || {}), o === "props" && e.input && r.setFormData(e, e.parser.toFormValue(e.rule.value, e))) : o === "emit" ? r.parseEmit(e) : o === "hidden" && !!c != !!f ? r.$render.clearCacheAll() : ["prefix", "suffix"].indexOf(o) > -1 ? c && r.loadFn(c, e.rule) : o === "type" ? (e.updateType(), r.bindParser(e)) : s && (g.Function(f) && (f = e.getPending("children", [])), g.Function(c) && (c = e.loadChildrenPending()), r.updateChildren(e, c, f));
            r.$render.clearCache(e), r.refresh(), r.watching = !1;
          }
        }, {
          deep: !s,
          sync: s
        }));
      }), e.input) {
        var a = q(e.rule, "value");
        e.watch.push(G(function() {
          return a.value;
        }, function() {
          var o = e.parser.toFormValue(a.value, e);
          r.isChange(e, o) && r.setValue(e, a.value, o, !0);
        }));
      }
      this.bus.$once("load-end", function() {
        var o = e.rule.computed;
        o && (U(o) !== "object" && (o = {
          value: o
        }), Object.keys(o).forEach(function(u) {
          e.watch.push(G(function() {
            var s = o[u];
            if (s) {
              var l;
              if (U(s) === "object") {
                var f = e.getParentGroup(), c = function m(v) {
                  if (v = Array.isArray(v) ? {
                    mode: "AND",
                    group: v
                  } : v, !g.trueArray(v.group))
                    return !0;
                  for (var w = v.mode === "OR", V = !0, D = 0; D < v.group.length; D++) {
                    var S = v.group[D], A = void 0;
                    if (S.mode ? A = m(S) : pe[S.condition] ? A = new Function("_$", "_$val", "top", "group", "with(top){with(this){with(group){ return _$['".concat(S.condition, "'](").concat(S.field, ", ").concat(S.compare ? S.compare : "_$val", "); }}}")).call(r.api.form, pe, S.value, r.api.top.form, f ? r.subRuleData[f.id] || {} : {}) : A = !1, w && A)
                      return !0;
                    w || (V = V && A);
                  }
                  return w ? !1 : V;
                };
                return c(s);
              } else if (g.Function(s))
                l = function() {
                  return s(r.api.form, r.api);
                };
              else {
                var d = e.getParentGroup();
                l = function() {
                  return new Function("formulas", "top", "group", "$rule", "$api", "with(top){with(this){with(group){with(formulas){ return ".concat(s, " }}}}")).call(r.api.form, r.fc.formulas, r.api.top.form, d ? r.subRuleData[d.id] || {} : {}, e.rule, r.api);
                };
              }
              return M(l, void 0);
            }
          }, function(s) {
            setTimeout(function() {
              u === "value" ? r.onInput(e, s) : u[0] === "$" ? r.api.setEffect(e.id, u, s) : Oe(e.rule, u, s);
            });
          }, {
            immediate: !0
          }));
        }));
      }), this.watchEffect(e);
    },
    updateChildren: function(e, r, i) {
      var a = this;
      this.deferSyncValue(function() {
        i && i.forEach(function(o) {
          (r || []).indexOf(o) === -1 && o && !g.String(o) && o.__fc__ && o.__fc__.parent === e && o.__fc__.root !== r && a.rmCtx(o.__fc__);
        }), g.trueArray(r) && (a.loadChildren(r, e), a.bus.$emit("update", a.api));
      });
    },
    rmSub: function(e) {
      var r = this;
      g.trueArray(e) && e.forEach(function(i) {
        i && i.__fc__ && r.rmCtx(i.__fc__);
      });
    },
    rmCtx: function(e) {
      var r = this;
      if (!e.deleted) {
        var i = e.id, a = e.field, o = e.input, u = e.name;
        ce(this.ctxs, i), ce(this.formData, i), ce(this.subForm, i), ce(this.vm.setupState.ctxInject, i);
        var s = e.getParentGroup();
        s && this.subRuleData[s.id] && ce(this.subRuleData[s.id], a), e.group && ce(this.subRuleData, i), o && this.rmIdCtx(e, a, "field"), u && this.rmIdCtx(e, u, "name"), o && !T(this.fieldCtx, a) && ce(this.form, a), this.deferSyncValue(function() {
          if (!r.reloading) {
            if (e.parser.loadChildren !== !1) {
              var f = e.getPending("children", e.rule.children);
              g.trueArray(f) && f.forEach(function(c) {
                return c.__fc__ && r.rmCtx(c.__fc__);
              });
            }
            e.root === r.rules && r.vm.setupState.renderRule();
          }
        }, o);
        var l = this.sort.indexOf(i);
        return l > -1 && this.sort.splice(l, 1), this.$render.clearCache(e), e.delete(), this.effect(e, "deleted"), o && !this.fieldCtx[a] && this.vm.emit("remove-field", a, e.rule, this.api), e.rule.__ctrl || this.vm.emit("remove-rule", e.rule, this.api), e;
      }
    }
  });
}
function pi(n) {
  $(n.prototype, {
    mounted: function() {
      var e = this, r = function() {
        e.isMounted = !0, e.lifecycle("mounted");
      };
      this.pageEnd ? r() : this.bus.$once("page-end", r);
    },
    lifecycle: function(e) {
      this.vm.emit(e, this.api), this.emitEvent(e, this.api);
    },
    emitEvent: function(e) {
      for (var r, i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
        a[o - 1] = arguments[o];
      var u = this.options[e] || this.options[ae("on-" + e)];
      if (u) {
        var s = oe(u);
        g.Function(s) && M(function() {
          return s.apply(void 0, a);
        });
      }
      (r = this.bus).$emit.apply(r, [e].concat(a));
    }
  });
}
function hi(n) {
  $(n.prototype, {
    useProvider: function() {
      var e = this, r = this.fc.providers;
      Object.keys(r).forEach(function(i) {
        var a = r[i];
        g.Function(a) && (a = a(e.fc)), a._c = vi(a), e.onEffect(a), e.providers[i] = a;
      });
    },
    onEffect: function(e) {
      var r = this, i = [];
      (e._c || ["*"]).forEach(function(a) {
        var o = a === "*" ? "*" : r.getType(a);
        i.indexOf(o) > -1 || (i.push(o), r.bus.$on("p:".concat(e.name, ":").concat(o, ":").concat(e.input ? 1 : 0), function(u, s) {
          e[u] && e[u].apply(e, R(s));
        }));
      }), e._used = i;
    },
    watchEffect: function(e) {
      var r = this, i = {
        required: function() {
          var o, u;
          return (T(e.rule, "$required") ? e.rule.$required : (o = e.rule) === null || o === void 0 || (u = o.effect) === null || u === void 0 ? void 0 : u.required) || !1;
        }
      };
      Object.keys(e.rule.effect || {}).forEach(function(a) {
        i[a] = function() {
          return e.rule.effect[a];
        };
      }), Object.keys(e.rule).forEach(function(a) {
        a[0] === "$" && (i[a.substr(1)] = function() {
          return e.rule[a];
        });
      }), Object.keys(i).forEach(function(a) {
        e.watch.push(G(i[a], function(o) {
          r.effect(e, "watch", L({}, a, o));
        }, {
          deep: !0
        }));
      });
    },
    ruleEffect: function(e, r, i) {
      this.emitEffect({
        rule: e,
        input: !!e.field,
        type: this.getType(e.type)
      }, r, i);
    },
    effect: function(e, r, i) {
      this.emitEffect({
        rule: e.rule,
        input: e.input,
        type: e.trueType,
        ctx: e,
        custom: i
      }, r);
    },
    getEffect: function(e, r) {
      if (T(e, "$" + r))
        return e["$" + r];
      if (T(e, "effect") && T(e.effect, r)) return e.effect[r];
    },
    emitEffect: function(e, r, i) {
      var a = this, o = e.ctx, u = e.rule, s = e.input, l = e.type, f = e.custom;
      if (!(!l || ["fcFragment", "fragment"].indexOf(l) > -1)) {
        var c = f || Object.keys(u).reduce(function(d, m) {
          return m[0] === "$" && (d[m.substr(1)] = u[m]), d;
        }, b({}, u.effect || {}));
        Object.keys(c).forEach(function(d) {
          var m = a.providers[d];
          if (!(!m || m.input && !s)) {
            var v;
            if (!m._c)
              v = "*";
            else if (m._used.indexOf(l) > -1)
              v = l;
            else
              return;
            var w = b({
              value: c[d],
              getValue: function() {
                return a.getEffect(u, d);
              }
            }, i || {});
            o && (w.getProp = function() {
              return o.effectData(d);
            }, w.clearProp = function() {
              return o.clearEffectData(d);
            }, w.mergeProp = function(V) {
              return se(w.getProp(), [V]);
            }, w.id = o.id), a.bus.$emit("p:".concat(d, ":").concat(v, ":").concat(m.input ? 1 : 0), r, [w, u, a.api]);
          }
        });
      }
    }
  });
}
function mi(n) {
  return n.filter(function(t, e, r) {
    return r.indexOf(t, 0) === e;
  });
}
function vi(n) {
  var t = n.components;
  if (Array.isArray(t)) {
    var e = mi(t.filter(function(r) {
      return r !== "*";
    }));
    return e.length ? e : !1;
  } else return g.String(t) ? [t] : !1;
}
function te(n) {
  var t = this;
  Qt(this, {
    options: function() {
      return n.options.value || {};
    },
    bus: function() {
      return n.bus;
    }
  }), $(this, {
    fc: n,
    vm: n.vm,
    watching: !1,
    loading: !1,
    reloading: !1,
    noWatchFn: null,
    deferSyncFn: null,
    isMounted: !1,
    formData: ie({}),
    subRuleData: ie({}),
    subForm: {},
    form: ie({}),
    appendData: {},
    providers: {},
    cycleLoad: null,
    loadedId: 1,
    nextTick: null,
    changeStatus: !1,
    pageEnd: !0,
    nextReload: function() {
      t.lifecycle("reload");
    }
  }), this.initData(n.rules), this.$manager = new n.manager(this), this.$render = new ft(this), this.api = n.extendApiFn.reduce(function(e, r) {
    return $(e, M(function() {
      return r(e, t);
    }, {})), e;
  }, Kr(this));
}
$(te.prototype, {
  initData: function(t) {
    $(this, {
      ctxs: {},
      fieldCtx: {},
      nameCtx: {},
      sort: [],
      rules: t
    });
  },
  init: function() {
    this.appendData = b(b(b({}, this.options.formData || {}), this.fc.vm.props.modelValue || {}), this.appendData), this.useProvider(), this.usePage(), this.loadRule(), this.$manager.__init(), this.lifecycle("created");
  },
  isBreakWatch: function() {
    return this.loading || this.noWatchFn || this.reloading;
  },
  beforeFetch: function(t) {
    var e = this;
    return new Promise(function(r) {
      var i = e.options.beforeFetch && M(function() {
        return e.options.beforeFetch(t, {
          api: e.api
        });
      });
      i && g.Function(i.then) ? i.then(r) : r();
    });
  }
});
ti(te);
ni(te);
ii(te);
oi(te);
fi(te);
di(te);
pi(te);
hi(te);
var gi = "fcFragment", ze = ee({
  name: gi,
  inheritAttrs: !1,
  props: ["vnode"],
  render: function() {
    return this.vnode;
  }
});
function yi(n) {
  return Object.keys(n).map(function(t) {
    var e = n[t], r = Fn(t);
    if (r)
      return [r, e.value, e.arg, e.modifiers];
  }).filter(function(t) {
    return !!t;
  });
}
function Et(n, t) {
  var e = n.directives;
  return e ? (Array.isArray(e) || (e = [e]), Rn(t, e.reduce(function(r, i) {
    return r.concat(yi(i));
  }, []))) : t;
}
function bi() {
  var n = {};
  function t() {
  }
  return $(t.prototype, {
    make: function(r, i, a) {
      return Et(i, this.h(r, wt(i), a));
    },
    makeComponent: function(r, i, a) {
      try {
        return Et(i, _(r, wt(i), a));
      } catch (o) {
        return console.error(o), _("");
      }
    },
    h: function(r, i, a) {
      var o = Ke().appContext.config.isNativeTag(r);
      o && delete i.formCreateInject;
      try {
        return _(o ? r : I(r), i, a);
      } catch (u) {
        return console.error(u), _("");
      }
    },
    aliasMap: n
  }), $(t, {
    aliasMap: n,
    alias: function(r, i) {
      n[r] = i;
    },
    use: function(r) {
      Object.keys(r).forEach(function(i) {
        var a = Se(i), o = rn(i).toLocaleLowerCase(), u = r[i];
        [i, a, o].forEach(function(s) {
          t.alias(i, u), t.prototype[s] = function(l, f) {
            return this.make(u, l, f);
          };
        });
      });
    }
  }), t;
}
function _i(n) {
  var t = /* @__PURE__ */ function(e) {
    Pn(i, e);
    var r = xn(i);
    function i() {
      return Dn(this, i), r.apply(this, arguments);
    }
    return i;
  }(on);
  return Object.assign(t.prototype, n), t;
}
function on(n) {
  $(this, {
    $handle: n,
    vm: n.vm,
    options: {},
    ref: "fcForm",
    mergeOptionsRule: {
      normal: ["form", "row", "info", "submitBtn", "resetBtn"]
    }
  }), this.updateKey(), this.init();
}
$(on.prototype, {
  __init: function() {
    var t = this;
    this.$render = this.$handle.$render, this.$r = function() {
      var e;
      return (e = t.$render).renderRule.apply(e, arguments);
    };
  },
  updateKey: function() {
    this.key = ke();
  },
  //TODO interface
  init: function() {
  },
  update: function() {
  },
  beforeRender: function() {
  },
  form: function() {
    return this.vm.refs[this.ref];
  },
  getSlot: function(t) {
    var e = function r(i) {
      if (i) {
        var a = i.slots[t];
        return a || r(i.setupState.parent);
      }
    };
    return e(this.vm);
  },
  mergeOptions: function(t, e) {
    var r = this;
    return ue(t.map(function(i) {
      return r.tidyOptions(i);
    }), e, this.mergeOptionsRule);
  },
  updateOptions: function(t) {
    this.options = this.mergeOptions([t], this.getDefaultOptions()), this.update();
  },
  tidyOptions: function(t) {
    return t;
  },
  tidyRule: function(t) {
  },
  mergeProp: function(t) {
  },
  getDefaultOptions: function() {
    return {};
  },
  render: function(t) {
  }
});
var $i = function(t) {
  var e = {
    name: "loadData",
    _fn: [],
    mounted: function(i, a, o) {
      this.deleted(i);
      var u = Y(i.getValue()), s = [];
      u.forEach(function(l) {
        if (l && (l.attr || l.template)) {
          var f = t.watchLoadData(Ve(function(c) {
            var d;
            l.template ? d = t.$handle.loadStrVar(l.template, c) : d = c(l.attr, l.default), l.copy !== !1 && (d = Z(d)), Oe(i.getProp(), l.to || "options", d), o.sync(a);
          }, l.wait || 300));
          l.watch !== !1 ? s.push(f) : f();
        }
      }), this._fn[i.id] = s;
    },
    deleted: function(i) {
      this._fn[i.id] && this._fn[i.id].forEach(function(a) {
        a();
      }), i.clearProp();
    }
  };
  return e.watch = e.created, e;
}, it = {
  name: "componentValidate",
  load: function(t, e, r) {
    var i = t.getValue();
    i ? t.getProp().validate = [{
      validator: function() {
        var o = be(e);
        if (o) {
          for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++)
            s[l] = arguments[l];
          return r.exec.apply(r, [o.id, i === !0 ? "formCreateValidate" : i].concat(s, [{
            attr: t,
            rule: e,
            api: r
          }]));
        }
      }
    }] : (t.clearProp(), r.clearValidateState([e.field]));
  },
  watch: function() {
    it.load.apply(it, arguments);
  }
}, wi = function(t) {
  function e(a) {
    return g.String(a) && (a = {
      action: a,
      to: "options"
    }), a;
  }
  function r(a, o, u) {
    var s = a.value;
    i.deleted(a), g.Function(s) && (s = s(o, u)), s = e(s);
    var l = function(v) {
      v === void 0 ? a.clearProp() : Oe(a.getProp(), s.to || "options", v), u.sync(o);
    };
    if (!s || !s.action && !s.key) {
      l(void 0);
      return;
    }
    if (s = Z(s), s.to || (s.to = "options"), s.key) {
      var f = t.$handle.options.globalData[s.key];
      if (!f) {
        l(void 0);
        return;
      }
      if (f.type === "static") {
        l(f.data);
        return;
      } else
        s = b(b({}, s), f);
    }
    var c = s.onError, d = function() {
      if (!a.getValue())
        return a.clearProp(), u.sync(o), !0;
    };
    i._fn[a.id] = t.watchLoadData(Ve(function(m) {
      var v = t.$handle.loadFetchVar(Z(s), m), w = b(b({
        headers: {}
      }, v), {}, {
        onSuccess: function(D, S) {
          if (!d()) {
            var A = function(O) {
              return S ? O : T(O, "data") ? O.data : O;
            }, k = oe(v.parse);
            g.Function(k) ? A = k : k && g.String(k) && (A = function(O) {
              return de(O, k);
            }), l(A(D, o, u)), u.sync(o);
          }
        },
        onError: function(D) {
          l(void 0), !d() && (c || function(S) {
            return ut(S.message || "fetch fail " + v.action);
          })(D, o, u);
        }
      });
      t.$handle.beforeFetch(w, {
        rule: o,
        api: u
      }).then(function() {
        if (g.Function(v.action)) {
          v.action(o, u).then(function(V) {
            w.onSuccess(V, !0);
          }).catch(function(V) {
            w.onError(V);
          });
          return;
        }
        M(function() {
          return t.create.fetch(w, {
            inject: a,
            rule: o,
            api: u
          });
        });
      });
    }, s.wait || 1e3));
  }
  var i = {
    name: "fetch",
    _fn: [],
    mounted: function() {
      r.apply(void 0, arguments);
    },
    watch: function() {
      r.apply(void 0, arguments);
    },
    deleted: function(o) {
      this._fn[o.id] && this._fn[o.id](), o.clearProp();
    }
  };
  return i;
}, Ci = {
  fetch: wi,
  loadData: $i,
  componentValidate: it
}, Vi = "html", Si = {
  name: Vi,
  loadChildren: !1,
  render: function(t, e) {
    return e.prop.props.innerHTML = t.default(), e.vNode.make(e.prop.props.tag || "div", e.prop);
  },
  renderChildren: function(t) {
    return {
      default: function() {
        return t.filter(function(r) {
          return g.String(r);
        }).join("");
      }
    };
  }
};
function Oi(n) {
  n = n + "=";
  for (var t = decodeURIComponent(document.cookie), e = t.split(";"), r = 0; r < e.length; r++) {
    for (var i = e[r]; i.charAt(0) === " "; )
      i = i.substring(1);
    if (i.indexOf(n) === 0) {
      i = i.substring(n.length, i.length);
      try {
        return JSON.parse(i);
      } catch {
        return i;
      }
    }
  }
  return null;
}
function Ri(n) {
  var t = localStorage.getItem(n);
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  return null;
}
function un(n, t) {
  if (!t)
    return null;
  var e = t.split("."), r = n(e.shift());
  return e.length ? r == null ? null : de(r, e) : r;
}
function Fi(n) {
  return un(Oi, n);
}
function Ei(n) {
  return un(Ri, n);
}
function Ai(n, t) {
  var e;
  return arguments.length === 2 ? (e = arguments[1], t = e[n]) : e = arguments[2], {
    id: t,
    prop: e
  };
}
function Ge() {
  return Ai.apply(void 0, ["name"].concat(Array.prototype.slice.call(arguments)));
}
function Di(n) {
  var t = n.key || [], e = n.array || [], r = n.normal || [];
  et.push.apply(et, R(t)), De.push.apply(De, R(e)), Pe.push.apply(Pe, R(r)), en([].concat(R(t), R(e), R(r)));
}
var Pi = 1, J = {};
function sn(n) {
  var t = L({}, ze.name, ze), e = {}, r = {}, i = {}, a = [], o = [], u = [n.extendApi], s = b({}, Ci), l = qr(), f = {
    global: {}
  }, c = ie({}), d = bi(), m = {}, v = n.isMobile === !0;
  Di(n.attrs || {});
  function w(h) {
    var p = J[h];
    if (Array.isArray(p))
      return p.map(function(y) {
        return y.api();
      });
    if (p)
      return p.api();
  }
  function V(h) {
    a.push(h);
  }
  function D() {
    var h = Ge.apply(void 0, arguments);
    h.id && h.prop && (r[h.id] = h.prop);
  }
  function S() {
    var h = Ge.apply(void 0, arguments);
    h.id && h.prop && (s[h.id] = b(b({}, h.prop), {}, {
      name: h.id
    }));
  }
  function A(h) {
    d.use(h);
  }
  function k() {
    var h = Ge.apply(void 0, arguments);
    if (!h.id || !h.prop) return rt;
    var p = ae(h.id), y = h.prop, C = y.merge === !0 ? e[p] : void 0;
    e[p] = Ct(y, C || rt), l[p] = H(p), y.maker && $(l, y.maker);
  }
  function E(h, p) {
    var y;
    if (g.String(h)) {
      if (y = h, p === void 0)
        return t[y];
    } else
      y = h.displayName || h.name, p = h;
    if (!(!y || !p)) {
      var C = ae(y);
      t[y] = p, t[C] = p, delete d.aliasMap[y], delete d.aliasMap[C], delete e[y], delete e[C], p.formCreateParser && k(y, p.formCreateParser);
    }
  }
  function O() {
    return Mr(Ne, t, r);
  }
  function j(h, p) {
    var y = O();
    return En({
      data: function() {
        return ie({
          rule: h,
          option: p
        });
      },
      render: function() {
        return An(y, b({
          ref: "fc"
        }, this.$data));
      }
    });
  }
  function ne() {
    return ze;
  }
  function Fe(h, p) {
    return g.Function(h.install) ? h.install(K, p) : g.Function(h) && h(K, p), this;
  }
  function K(h, p) {
    var y = j(h, p || {});
    a.forEach(function(P) {
      M(function() {
        return P(K, y);
      });
    });
    var C = document.createElement("div");
    ((p == null ? void 0 : p.el) || document.body).appendChild(C);
    var F = y.mount(C);
    return F.$refs.fc.fapi;
  }
  function fn(h) {
    var p = b({}, n);
    return h ? p.inherit = {
      components: t,
      parsers: e,
      directives: r,
      modelFields: i,
      providers: s,
      useApps: a,
      maker: l,
      formulas: m,
      loadData: c
    } : delete p.inherit, sn(p);
  }
  function cn(h, p) {
    i[h] = p;
  }
  function dn(h, p) {
    m[h] = p;
  }
  function xe(h) {
    Object.keys(J).forEach(function(p) {
      var y = Array.isArray(J[p]) ? J[p] : [J[p]];
      y.forEach(function(C) {
        C.bus.$emit("$loadData." + h);
      });
    });
  }
  function Be(h, p) {
    c[h] = p, xe(h);
  }
  function Te(h, p) {
    var y = function() {
      for (var F = arguments.length, P = new Array(F), z = 0; z < F; z++)
        P[z] = arguments[z];
      return M(function() {
        return p.apply(void 0, P);
      });
    };
    y._driver = !0, Be(h, y);
  }
  function Me(h, p) {
    var y = (h || "").split(".");
    h = y.shift();
    var C = y.join(".");
    if (T(c, h)) {
      var F = c[h];
      return F && F._driver ? F = F(C) : y.length && (F = de(F, y)), F == null || F === "" ? p : F;
    } else
      return p;
  }
  function pn(h) {
    u.push(h);
  }
  function hn(h) {
    delete c[h], xe(h);
  }
  function mn(h, p) {
    o.push({
      name: h,
      callback: p
    });
  }
  function Ne(h) {
    var p = this;
    $(this, {
      id: Pi++,
      create: K,
      vm: h,
      manager: _i(n.manager),
      parsers: e,
      providers: s,
      modelFields: i,
      formulas: m,
      isMobile: v,
      rules: h.props.rule,
      name: h.props.name || ke(),
      inFor: h.props.inFor,
      prop: {
        components: t,
        directives: r
      },
      setData: Be,
      getData: Me,
      emitData: xe,
      loadData: c,
      CreateNode: d,
      bus: new xt(),
      unwatch: null,
      options: ot({}),
      extendApiFn: u,
      fetchCache: /* @__PURE__ */ new WeakMap()
    }), o.forEach(function(y) {
      p.bus.$on(y.name, y.callback);
    }), Q(function() {
      G(p.options, function() {
        p.$handle.$manager.updateOptions(p.options.value), p.api().refresh();
      }, {
        deep: !0
      });
    }), $(h.appContext.components, t), $(h.appContext.directives, r), this.$handle = new te(this), this.name && (this.inFor ? (J[this.name] || (J[this.name] = []), J[this.name].push(this)) : J[this.name] = this);
  }
  Ne.isMobile = v, $(Ne.prototype, {
    init: function() {
      var p = this;
      this.isSub() && (this.unwatch = G(function() {
        return p.vm.setupState.parent.setupState.fc.options.value;
      }, function() {
        p.initOptions(), p.$handle.api.refresh();
      }, {
        deep: !0
      })), this.initOptions(), this.$handle.init();
    },
    globalDataDriver: function(p) {
      var y = this, C = p.split("."), F = C.shift(), P = this.options.value.globalData && this.options.value.globalData[F];
      if (P) {
        if (P.type === "static")
          return de(P.data, C);
        var z, x = this.fetchCache.get(P);
        if (x) {
          if (x.status && (z = de(x.data, C)), !x.loading)
            return z;
          x.loading = !1, this.fetchCache.set(P, x);
        } else
          this.fetchCache.set(P, {
            status: !1
          });
        var ge = Ve(function() {
          $e();
          var fe = y.fetchCache.get(P);
          y.options.value.globalData && Object.values(y.options.value.globalData).indexOf(P) !== -1 ? (fe && (fe.loading = !0, y.fetchCache.set(P, fe)), y.bus.$emit("$loadData.$globalData")) : y.fetchCache.delete(P);
        }, P.wait || 1e3), ye = function(Ue, Ee) {
          if (Ee) {
            ge();
            return;
          }
          var gn = y.$handle.loadFetchVar(Ze(P), Ue);
          y.$handle.api.fetch(gn).then(function(yn) {
            y.fetchCache.set(P, {
              status: !0,
              data: yn
            }), y.bus.$emit("$loadData.$globalData");
          });
        }, $e = this.watchLoadData(ye);
        return z;
      }
    },
    getLoadData: function(p, y) {
      var C = null;
      if (p != null) {
        var F = p.split("."), P = F.shift();
        P === "$form" ? C = this.$handle.api.top.formData() : P === "$subForm" ? C = this.$handle.api.formData() : P === "$options" ? C = this.options.value : P === "$globalData" ? (C = this.globalDataDriver(F.join(".")), F = []) : (C = Me(p, y), F = []), F.length && (C = de(C, F));
      }
      return console.log(p, C), C == null || C === "" ? y : C;
    },
    watchLoadData: function(p) {
      var y = this, C = {}, F = function(x) {
        M(function() {
          p(P, x);
        });
      }, P = function(x, ge) {
        if (C[x])
          return C[x].val;
        var ye = y.getLoadData(x, ge), $e = x.split(".").shift(), fe = function() {
          if ($e !== x) {
            var Ee = y.getLoadData(x, ge);
            JSON.stringify(Ee) !== JSON.stringify(C[x].val) && (C[x].val = Ee, F(!0));
          } else
            F(!0);
        };
        return y.bus.$on("$loadData." + $e, fe), C[x] = {
          fn: function() {
            y.bus.$off("$loadData." + $e, fe);
          },
          val: ye
        }, ye;
      };
      return F(!1), function() {
        Object.keys(C).forEach(function(z) {
          return C[z].fn();
        }), C = {};
      };
    },
    isSub: function() {
      return this.vm.setupState.parent && this.vm.props.extendOption;
    },
    initOptions: function() {
      this.options.value = {};
      var p = b({
        formData: {},
        submitBtn: {},
        resetBtn: {},
        globalEvent: {},
        globalData: {}
      }, Z(f));
      this.isSub() && (p = this.mergeOptions(p, this.vm.setupState.parent.setupState.fc.options.value || {}, !0)), p = this.mergeOptions(p, this.vm.props.option), this.updateOptions(p);
    },
    mergeOptions: function(p, y, C) {
      return y = Z(y), C && ["page", "onSubmit", "mounted", "reload", "formData", "el", "globalClass", "style"].forEach(function(F) {
        delete y[F];
      }), y.global && (p.global = Hr(p.global, y.global), delete y.global), this.$handle.$manager.mergeOptions([y], p), p;
    },
    updateOptions: function(p) {
      this.options.value = this.mergeOptions(this.options.value, p), this.$handle.$manager.updateOptions(this.options.value), this.bus.$emit("$loadData.$options");
    },
    api: function() {
      return this.$handle.api;
    },
    render: function() {
      return this.$handle.render();
    },
    mounted: function() {
      this.$handle.mounted();
    },
    unmount: function() {
      var p = this;
      if (this.name)
        if (this.inFor) {
          var y = J[this.name].indexOf(this);
          J[this.name].splice(y, 1);
        } else
          delete J[this.name];
      o.forEach(function(C) {
        p.bus.$off(C.name, C.callback);
      }), this.unwatch && this.unwatch(), this.$handle.reloadRule([]);
    },
    updated: function() {
      var p = this;
      this.$handle.bindNextTick(function() {
        return p.bus.$emit("next-tick", p.$handle.api);
      });
    }
  });
  function ct(h) {
    $(h, {
      version: n.version,
      ui: n.ui,
      extendApi: pn,
      getData: Me,
      setDataDriver: Te,
      setData: Be,
      removeData: hn,
      maker: l,
      component: E,
      directive: D,
      setModelField: cn,
      setFormula: dn,
      register: S,
      $vnode: ne,
      parser: k,
      use: Fe,
      factory: fn,
      componentAlias: A,
      copyRule: st,
      copyRules: Xt,
      fetch: tn,
      $form: O,
      parseFn: oe,
      parseJson: Ur,
      toJson: Wt,
      useApp: V,
      getApi: w,
      on: mn
    });
  }
  function vn(h) {
    $(h, {
      create: K,
      isMobile: v,
      install: function(y, C) {
        f = b(b({}, f), C || {});
        var F = "_installedFormCreate_" + n.ui;
        if (y[F] !== !0) {
          y[F] = !0;
          var P = function(ge) {
            var ye = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return K(ge, ye);
          };
          ct(P), y.config.globalProperties.$formCreate = P;
          var z = O();
          y.component(z.name, z), a.forEach(function(x) {
            M(function() {
              return x(h, y);
            });
          });
        }
      }
    });
  }
  if (ct(K), vn(K), Te("$cookie", Fi), Te("$localStorage", Ei), d.use({
    fragment: "fcFragment"
  }), n.install && K.use(n), V(function(h, p) {
    p.mixin({
      props: ["formCreateInject"]
    });
  }), k(Si), n.inherit) {
    var N = n.inherit;
    N.components && $(t, N.components), N.parsers && $(e, N.parsers), N.directives && $(r, N.directives), N.modelFields && $(i, N.modelFields), N.providers && $(s, N.providers), N.useApps && $(a, N.useApps), N.maker && $(l, N.maker), N.loadData && $(c, N.loadData), N.formulas && $(m, N.formulas);
  }
  var Le = O();
  return Ct(Le, K), Le.util = K, Le;
}
var At = {
  date: "YYYY-MM-DD",
  month: "YYYY-MM",
  datetime: "YYYY-MM-DD HH:mm:ss",
  timerange: "HH:mm:ss",
  daterange: "YYYY-MM-DD",
  monthrange: "YYYY-MM",
  datetimerange: "YYYY-MM-DD HH:mm:ss",
  year: "YYYY"
}, Dt = "datePicker", Ii = {
  name: Dt,
  maker: function() {
    return ["year", "month", "date", "dates", "week", "datetime", "datetimeRange", "dateRange", "monthRange"].reduce(function(n, t) {
      return n[t] = H(Dt, {
        type: t.toLowerCase()
      }), n;
    }, {});
  }(),
  mergeProp: function(t) {
    var e = t.prop.props;
    e.valueFormat || (e.valueFormat = At[e.type] || At.date);
  }
}, Ye = "hidden", ji = {
  name: Ye,
  maker: L({}, Ye, function(n, t) {
    return H(Ye)("", n, t);
  }),
  render: function() {
    return [];
  }
}, qe = "input", ki = {
  name: qe,
  maker: function() {
    var n = ["password", "url", "email", "text", "textarea"].reduce(function(t, e) {
      return t[e] = H(qe, {
        type: e
      }), t;
    }, {});
    return n.idate = H(qe, {
      type: "date"
    }), n;
  }(),
  mergeProp: function(t) {
    var e = t.prop.props;
    e && e.autosize && e.autosize.minRows && (e.rows = e.autosize.minRows || 2);
  }
}, Pt = "slider", xi = {
  name: Pt,
  maker: {
    sliderRange: H(Pt, {
      range: !0
    })
  },
  toFormValue: function(t, e) {
    var r = Array.isArray(t), i = e.prop.props, a = i.min || 0, o;
    return i.range === !0 ? o = r ? t : [a, parseFloat(t) || a] : o = r ? parseFloat(t[0]) || a : parseFloat(t), o;
  }
}, Je = "timePicker", Bi = {
  name: Je,
  maker: {
    time: H(Je, function(n) {
      return n.props.isRange = !1;
    }),
    timeRange: H(Je, function(n) {
      return n.props.isRange = !0;
    })
  },
  mergeProp: function(t) {
    var e = t.prop.props;
    e.valueFormat || (e.valueFormat = "HH:mm:ss");
  }
}, Ti = {
  name: "FcRow",
  render: function(t, e) {
    return e.vNode.col({
      props: {
        span: 24
      }
    }, {
      default: function() {
        return [e.vNode.row(e.prop, t)];
      }
    });
  }
}, Mi = "select", Ni = {
  name: Mi,
  toFormValue: function(t, e) {
    return e.prop.props.multiple && !Array.isArray(t) ? Y(t) : t;
  }
}, Li = [Ii, ji, ki, xi, Bi, Ti, Ni], B = "el", Ui = {
  button: B + "-button",
  icon: B + "-icon",
  slider: B + "-slider",
  rate: B + "-rate",
  upload: "fc-upload",
  cascader: B + "-cascader",
  popover: B + "-popover",
  tooltip: B + "-tooltip",
  colorPicker: B + "-colorPicker",
  timePicker: B + "-time-picker",
  timeSelect: B + "-time-select",
  datePicker: B + "-date-picker",
  switch: B + "-switch",
  select: "fc-select",
  checkbox: "fc-checkbox",
  radio: "fc-radio",
  inputNumber: B + "-input-number",
  number: B + "-input-number",
  input: B + "-input",
  formItem: B + "-form-item",
  form: B + "-form",
  frame: "fc-frame",
  col: B + "-col",
  row: B + "-row",
  tree: "fc-tree",
  autoComplete: B + "-autocomplete",
  auto: B + "-autocomplete",
  group: "fc-group",
  object: "fc-sub-form",
  subForm: "fc-sub-form"
};
function Hi() {
  return {
    form: {
      inline: !1,
      labelPosition: "right",
      labelWidth: "125px",
      disabled: !1,
      size: void 0
    },
    row: {
      show: !0,
      gutter: 0
    },
    submitBtn: {
      type: "primary",
      loading: !1,
      disabled: !1,
      innerText: "提交",
      show: !0,
      col: void 0,
      click: void 0
    },
    resetBtn: {
      type: "default",
      loading: !1,
      disabled: !1,
      innerText: "重置",
      show: !1,
      col: void 0,
      click: void 0
    }
  };
}
function zi(n) {
  return n.type === "tooltip";
}
function It(n, t) {
  if (T(n, t) && g.String(n[t])) {
    var e;
    n[t] = (e = {}, L(e, t, n[t]), L(e, "show", !0), e);
  }
}
function re(n) {
  return n === !1;
}
function Gi(n, t) {
  T(n, t) && !g.Object(n[t]) && (n[t] = {
    show: !!n[t]
  });
}
function We(n) {
  var t = b({}, n);
  return delete t.children, t;
}
var Yi = {
  validate: function() {
    var t = this.form();
    return t ? t.validate() : new Promise(function(e) {
      return e();
    });
  },
  validateField: function(t) {
    var e = this;
    return new Promise(function(r, i) {
      var a = e.form();
      a ? a.validateField(t, function(o, u) {
        u ? i(u) : r(o);
      }) : r();
    });
  },
  clearValidateState: function(t) {
    var e = this.vm.refs[t.wrapRef];
    e && e.clearValidate();
  },
  tidyOptions: function(t) {
    return ["submitBtn", "resetBtn", "row", "info", "wrap", "col", "title"].forEach(function(e) {
      Gi(t, e);
    }), t;
  },
  tidyRule: function(t) {
    var e = t.prop;
    return It(e, "title"), It(e, "info"), e;
  },
  mergeProp: function(t) {
    t.prop = ue([{
      info: this.options.info || {},
      wrap: this.options.wrap || {},
      col: this.options.col || {},
      title: this.options.title || {}
    }, t.prop], {
      info: {
        trigger: "hover",
        placement: "top-start",
        icon: !0
      },
      title: {},
      col: {
        span: 24
      },
      wrap: {}
    }, {
      normal: ["title", "info", "col", "wrap"]
    });
  },
  getDefaultOptions: function() {
    return Hi();
  },
  update: function() {
    var t = this.options.form;
    this.rule = {
      props: b({}, t),
      on: {
        submit: function(r) {
          r.preventDefault();
        }
      },
      class: [t.className, t.class, "form-create", this.options.preview ? "is-preview" : ""],
      style: t.style,
      type: "form"
    };
  },
  beforeRender: function() {
    var t = this.key, e = this.ref, r = this.$handle;
    $(this.rule, {
      key: t,
      ref: e
    }), $(this.rule.props, {
      model: r.formData
    });
  },
  render: function(t) {
    var e = this;
    return t.slotLen() && !this.options.preview && t.setSlot(void 0, function() {
      return e.makeFormBtn();
    }), this.$r(this.rule, re(this.options.row.show) ? t.getSlots() : [this.makeRow(t)]);
  },
  makeWrap: function(t, e) {
    var r = this, i = t.prop, a = "".concat(this.key).concat(t.key), o = i.col, u = this.isTitle(i), s = !o.labelWidth && !u ? 0 : o.labelWidth, l = this.rule.props, f = l.inline, c = l.col, d = re(i.wrap.show) ? e : this.$r(ue([i.wrap, {
      props: b(b({
        labelWidth: s === void 0 ? s : rn(s),
        label: u ? i.title.title : void 0
      }, We(i.wrap || {})), {}, {
        prop: t.id,
        rules: t.injectValidate()
      }),
      class: i.className,
      key: "".concat(a, "fi"),
      ref: t.wrapRef,
      type: "formItem"
    }]), b({
      default: function() {
        return e;
      }
    }, u ? {
      label: function() {
        return r.makeInfo(i, a, t);
      }
    } : {}));
    return f === !0 || re(c) || re(o.show) ? d : this.makeCol(i, a, [d]);
  },
  isTitle: function(t) {
    if (this.options.form.title === !1) return !1;
    var e = t.title;
    return !(!e.title && !e.native || re(e.show));
  },
  makeInfo: function(t, e, r) {
    var i = this, a = b({}, t.title), o = b({}, t.info), u = zi(o), s = this.options.form, l = this.getSlot("title"), f = [l ? l({
      title: a.title || "",
      rule: r.rule,
      options: this.options
    }) : (a.title || "") + (s.labelSuffix || s["label-suffix"] || "")];
    if (!re(o.show) && (o.info || o.native) && !re(o.icon)) {
      var c = {
        type: o.type || "popover",
        props: We(o),
        key: "".concat(e, "pop")
      };
      delete c.props.icon, delete c.props.show, delete c.props.info, delete c.props.align, delete c.props.native;
      var d = "content";
      o.info && !T(c.props, d) && (c.props[d] = o.info), f[o.align !== "left" ? "unshift" : "push"](this.$r(ue([o, c]), L({}, a.slot || (u ? "default" : "reference"), function() {
        return i.$r({
          type: "ElIcon",
          style: "top:2px",
          key: "".concat(e, "i")
        }, {
          default: function() {
            return i.$r({
              type: o.icon === !0 ? "icon-warning" : o.icon
            });
          }
        }, !0);
      })));
    }
    var m = ue([a, {
      props: We(a),
      key: "".concat(e, "tit"),
      type: a.type || "span"
    }]);
    return delete m.props.show, delete m.props.title, delete m.props.native, this.$r(m, f);
  },
  makeCol: function(t, e, r) {
    var i = t.col;
    return this.$r({
      class: i.class,
      type: "col",
      props: i || {
        span: 24
      },
      key: "".concat(e, "col")
    }, r);
  },
  makeRow: function(t) {
    var e = this.options.row || {};
    return this.$r({
      type: "row",
      props: e,
      class: e.class,
      key: "".concat(this.key, "row")
    }, t);
  },
  makeFormBtn: function() {
    var t = [];
    if (re(this.options.submitBtn.show) || t.push(this.makeSubmitBtn()), re(this.options.resetBtn.show) || t.push(this.makeResetBtn()), !!t.length) {
      var e = this.$r({
        type: "formItem",
        key: "".concat(this.key, "fb")
      }, t);
      return this.rule.props.inline === !0 ? e : this.$r({
        type: "col",
        props: {
          span: 24
        },
        key: "".concat(this.key, "fc")
      }, [e]);
    }
  },
  makeResetBtn: function() {
    var t = this, e = b({}, this.options.resetBtn), r = e.innerText;
    return delete e.innerText, delete e.click, delete e.col, delete e.show, this.$r({
      type: "button",
      props: e,
      class: "_fc-reset-btn",
      style: {
        width: e.width
      },
      on: {
        click: function() {
          var a = t.$handle.api;
          t.options.resetBtn.click ? t.options.resetBtn.click(a) : a.resetFields();
        }
      },
      key: "".concat(this.key, "b2")
    }, [r]);
  },
  makeSubmitBtn: function() {
    var t = this, e = b({}, this.options.submitBtn), r = e.innerText;
    return delete e.innerText, delete e.click, delete e.col, delete e.show, this.$r({
      type: "button",
      props: e,
      class: "_fc-submit-btn",
      style: {
        width: e.width
      },
      on: {
        click: function() {
          var a = t.$handle.api;
          t.options.submitBtn.click ? t.options.submitBtn.click(a) : a.submit().catch(function() {
          });
        }
      },
      key: "".concat(this.key, "b1")
    }, [r]);
  }
}, he = {};
qi(he);
Ji(he);
Wi(he);
Ki(he);
Xi(he);
function qi(n) {
  ["group", "tree", "switch", "upload", "autoComplete", "checkbox", "cascader", "colorPicker", "datePicker", "frame", "inputNumber", "radio", "rate"].forEach(function(t) {
    n[t] = H(t);
  }), n.auto = n.autoComplete, n.number = n.inputNumber, n.color = n.colorPicker;
}
function Ji(n) {
  var t = "select", e = "multiple";
  n.selectMultiple = H(t, L({}, e, !0)), n.selectOne = H(t, L({}, e, !1));
}
function Wi(n) {
  var t = "tree", e = {
    treeSelected: "selected",
    treeChecked: "checked"
  };
  Object.keys(e).reduce(function(r, i) {
    return r[i] = H(t, {
      type: e[i]
    }), r;
  }, n);
}
function Ki(n) {
  var t = "upload", e = {
    image: ["image", 0],
    file: ["file", 0],
    uploadFileOne: ["file", 1],
    uploadImageOne: ["image", 1]
  };
  Object.keys(e).reduce(function(r, i) {
    return r[i] = H(t, function(a) {
      return a.props({
        uploadType: e[i][0],
        maxLength: e[i][1]
      });
    }), r;
  }, n), n.uploadImage = n.image, n.uploadFile = n.file;
}
function Xi(n) {
  var t = {
    frameInputs: ["input", 0],
    frameFiles: ["file", 0],
    frameImages: ["image", 0],
    frameInputOne: ["input", 1],
    frameFileOne: ["file", 1],
    frameImageOne: ["image", 1]
  };
  return Object.keys(t).reduce(function(e, r) {
    return e[r] = H("frame", function(i) {
      return i.props({
        type: t[r][0],
        maxLength: t[r][1]
      });
    }), e;
  }, n), n.frameInput = n.frameInputs, n.frameFile = n.frameFiles, n.frameImage = n.frameImages, n;
}
var Qi = ".form-create .form-create .el-form-item{margin-bottom:22px}.form-create{width:100%}.form-create .fc-none,.form-create.is-preview .el-form-item.is-required>.el-form-item__label-wrap>.el-form-item__label:before,.form-create.is-preview .el-form-item.is-required>.el-form-item__label:before,.form-create.is-preview .fc-clock{display:none!important}.fc-wrap-left .el-form-item__label{justify-content:flex-start;justify-content:flex-end}.fc-wrap-top.el-form-item{display:block}.fc-wrap-top.el-form-item .el-form-item__label{display:block;height:auto;line-height:22px;margin-bottom:8px;text-align:left}.el-form--large .fc-wrap-top.el-form-item .el-form-item__label{line-height:22px;margin-bottom:12px}.el-form--default .fc-wrap-top.el-form-item .el-form-item__label{line-height:22px;margin-bottom:8px}.el-form--small .fc-wrap-top.el-form-item .el-form-item__label{line-height:20px;margin-bottom:4px}";
je(Qi);
function jt(n, t) {
  return g.Boolean(n) ? n = {
    show: n
  } : !g.Undef(n) && !g.Object(n) && (n = {
    show: t
  }), n;
}
function Zi(n, t) {
  return {
    formEl: function() {
      return t.$manager.form();
    },
    wrapEl: function(r) {
      var i = t.getFieldCtx(r);
      if (i)
        return t.vm.refs[i.wrapRef];
    },
    validate: function(r) {
      return new Promise(function(i, a) {
        var o = n.children, u = [t.$manager.validate()];
        o.forEach(function(s) {
          u.push(s.validate());
        }), Promise.all(u).then(function() {
          i(!0), r && r(!0);
        }).catch(function(s) {
          a(s), r && r(s), t.vm.emit("validate-fail", s, {
            api: n
          });
        });
      });
    },
    validateField: function(r, i) {
      return new Promise(function(a, o) {
        var u = t.getFieldCtx(r);
        if (u) {
          var s = t.subForm[u.id], l = [t.$manager.validateField(u.id)];
          Y(s).forEach(function(f) {
            l.push(f.validate());
          }), Promise.all(l).then(function() {
            a(null), i && i(null);
          }).catch(function(f) {
            o(f), i && i(f), t.vm.emit("validate-field-fail", f, {
              field: r,
              api: n
            });
          });
        }
      });
    },
    clearValidateState: function(r) {
      var i = this, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      n.helper.tidyFields(r).forEach(function(o) {
        a && i.clearSubValidateState(o), t.getCtxs(o).forEach(function(u) {
          t.$manager.clearValidateState(u);
        });
      });
    },
    clearSubValidateState: function(r) {
      n.helper.tidyFields(r).forEach(function(i) {
        t.getCtxs(i).forEach(function(a) {
          var o = t.subForm[a.id];
          o && (Array.isArray(o) ? o.forEach(function(u) {
            u.clearValidateState();
          }) : o && o.clearValidateState());
        });
      });
    },
    btn: {
      loading: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.submitBtnProps({
          loading: !!r
        });
      },
      disabled: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.submitBtnProps({
          disabled: !!r
        });
      },
      show: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.submitBtnProps({
          show: !!r
        });
      }
    },
    resetBtn: {
      loading: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.resetBtnProps({
          loading: !!r
        });
      },
      disabled: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.resetBtnProps({
          disabled: !!r
        });
      },
      show: function() {
        var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
        n.resetBtnProps({
          show: !!r
        });
      }
    },
    submitBtnProps: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = jt(t.options.submitBtn, !0);
      $(i, r), t.options.submitBtn = i, n.refreshOptions();
    },
    resetBtnProps: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = jt(t.options.resetBtn, !1);
      $(i, r), t.options.resetBtn = i, n.refreshOptions();
    },
    submit: function(r, i) {
      return new Promise(function(a, o) {
        n.validate().then(function() {
          var u = n.formData();
          g.Function(r) && M(function() {
            return r(u, n);
          }), g.Function(t.options.onSubmit) && M(function() {
            return t.options.onSubmit(u, n);
          }), t.vm.emit("submit", u, n), a(u);
        }).catch(function() {
          for (var u = arguments.length, s = new Array(u), l = 0; l < u; l++)
            s[l] = arguments[l];
          g.Function(i) && M(function() {
            return i.apply(void 0, [n].concat(s));
          }), o.apply(void 0, s);
        });
      });
    }
  };
}
var at = {
  name: "required",
  load: function(t, e, r) {
    var i = ea(t.getValue());
    if (i.required === !1)
      t.clearProp(), r.clearValidateState([e.field]);
    else {
      var a = b({
        required: !0,
        validator: function(s, l, f) {
          g.empty(l) ? f(a.message) : f();
        }
      }, i);
      if (!a.message) {
        var o = e.title || "";
        a.message = ((U(o) === "object" ? o.title : o) || "") + "不能为空";
      }
      t.getProp().validate = [a];
    }
    r.sync(e);
  },
  watch: function() {
    at.load.apply(at, arguments);
  }
};
function ea(n) {
  return g.Boolean(n) ? {
    required: n
  } : g.String(n) ? {
    message: n
  } : g.Undef(n) ? {
    required: !1
  } : g.Function(n) ? {
    validator: n
  } : g.Object(n) ? n : {};
}
function ta(n) {
  n.componentAlias(Ui), Br.forEach(function(t) {
    n.component(t.name, t);
  }), n.register(at), Li.forEach(function(t) {
    n.parser(t);
  }), Object.keys(he).forEach(function(t) {
    n.maker[t] = he[t];
  }), typeof window < "u" && window.ElementPlus && n.useApp(function(t, e) {
    e.use(window.ElementPlus);
  });
}
function na() {
  return sn({
    ui: "element-ui",
    version: "3.2.1",
    manager: Yi,
    extendApi: Zi,
    install: ta,
    attrs: {
      normal: ["col", "wrap"],
      array: ["className"],
      key: ["title", "info"]
    }
  });
}
var ln = na();
typeof window < "u" && (window.formCreate = ln);
ln.maker;
export {
  ln as F
};
