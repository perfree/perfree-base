import { p as ll } from "./lib/perfree.js";
import { s as Ke, r as Me, u as ze, d as tl, p as al, b as ol, e as nl, a as ul } from "./lib/@element-plus.js";
import { f as il } from "./lib/mailServer.js";
import { X as rl } from "./lib/aieditor.js";
function sl(c) {
  return axios.post("/api/auth/mailTemplate/page", c);
}
function dl(c) {
  return axios.post("/api/auth/mailTemplate/add", c);
}
function cl(c) {
  return axios.post("/api/auth/mailTemplate/update", c);
}
function pl(c) {
  return axios.delete("/api/auth/mailTemplate/del?id=" + c);
}
function Ge(c) {
  return axios.get("/api/auth/mailTemplate/get?id=" + c);
}
function ml(c) {
  return axios.post("/api/auth/mailTemplate/export", c, { responseType: "blob" });
}
function fl(c) {
  return axios.post("/api/auth/mailTemplate/testMail", c);
}
function vl(c) {
  return axios.post("/api/auth/attach/page", c);
}
function _l() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function gl(c) {
  return axios.put("/apiv/attach/update", c);
}
function hl(c) {
  return axios.get("/api/auth/attach/get?id=" + c);
}
const Je = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, wl = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
};
function Vl() {
  return axios.get("/api/auth/attachConfig/getAll");
}
const bl = (c, P) => {
  const f = c.__vccOpts || c;
  for (const [o, w] of P)
    f[o] = w;
  return f;
}, V = window.Vue.resolveComponent, n = window.Vue.createVNode, i = window.Vue.withCtx, F = window.Vue.unref, ce = window.Vue.renderList, pe = window.Vue.Fragment, b = window.Vue.openBlock, H = window.Vue.createElementBlock, te = window.Vue.createBlock, J = window.Vue.createTextVNode, C = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const Ie = window.Vue.toDisplayString, Le = window.Vue.normalizeClass, yl = window.Vue.withModifiers, Fe = window.Vue.isRef, kl = window.Vue.pushScopeId, Cl = window.Vue.popScopeId, Xe = (c) => (kl("data-v-fe8136c6"), c = c(), Cl(), c), xl = { class: "page" }, Tl = { class: "search-box" }, Sl = { class: "table-box" }, Al = { class: "attach-preview" }, $l = { class: "image-slot" }, Fl = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Ul = ["src"], El = {
  key: 2,
  class: "attach-other"
}, Ml = { class: "attach-name" }, Nl = { class: "operate-btn-box" }, Rl = { style: { "padding-right": "15px" } }, zl = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, Gl = ["src"], Il = {
  key: 2,
  controls: "",
  preload: "none"
}, Ll = ["src"], Bl = { key: 3 }, Hl = { class: "showForm" }, Pl = { class: "dialog-footer" }, Ol = /* @__PURE__ */ Xe(() => /* @__PURE__ */ C("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ J(" 拖拽文件到此处或者"),
  /* @__PURE__ */ C("em", null, "点击上传")
], -1)), Dl = /* @__PURE__ */ Xe(() => /* @__PURE__ */ C("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1)), ql = window.Vue.computed, Zl = window.Vue.reactive, U = window.Vue.ref, ne = window.ElementPlus.ElMessage, jl = {
  __name: "attach-select-panel",
  props: ["attachType", "max"],
  emits: ["update:selectedAttach"],
  setup(c, { emit: P }) {
    const f = U(), o = U({
      pageNo: 1,
      pageSize: 8,
      total: 0,
      name: "",
      type: "",
      attachGroup: ""
    });
    let w = U([]), I = U(!1), S = U(/* @__PURE__ */ new Map());
    const E = P, v = c;
    let g = U(!1), q = U(""), R = U([]);
    const O = U(), s = U({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      desc: ""
    }), W = Zl({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), p = U();
    let m = U(), B = U(!1), X = U([]);
    const y = U({
      attachConfigId: "",
      attachGroup: "default",
      fileList: []
    });
    let be = localStorage.getItem(Je.STORAGE_TOKEN), ye = wl.baseURL, ke = {
      Authorization: "Bearer " + JSON.parse(be).accessToken
    };
    const D = ql(() => {
      switch (v.attachType) {
        case "img":
          return "image/*";
        case "video":
          return "video/*";
        case "audio":
          return "audio/*";
        default:
          return "*";
      }
    });
    function se() {
      s.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        desc: ""
      }, O.value && O.value.resetFields();
    }
    function L() {
      v.attachType && (o.value.type = v.attachType), I.value = !0, vl(o.value).then((d) => {
        d.data.list.forEach((a) => {
          a.selected = S.value.has(a.id);
        }), w.value = d.data.list, o.value.total = d.data.total, I.value = !1;
      });
    }
    function Ce() {
      o.value = {
        pageNo: 1,
        pageSize: 8,
        total: 0,
        name: "",
        type: "",
        attachGroup: ""
      }, f.value.resetFields(), L();
    }
    function xe(d) {
      if (!d.selected && S.value.size >= v.max) {
        ne.error(`最多选择${v.max}个`);
        return;
      }
      d.selected = !d.selected, d.selected ? S.value.set(d.id, d) : S.value.delete(d.id), E("update:selectedAttach", Array.from(S.value.values()));
    }
    function ae() {
      _l().then((d) => {
        R.value = d.data;
      });
    }
    function Te(d) {
      se(), ae(), hl(d.id).then((a) => {
        s.value = a.data, q.value = "详情", g.value = !0;
      });
    }
    function Se() {
      O.value.validate((d) => {
        d && gl(s.value).then((a) => {
          a.code === 200 ? (ne.success("修改成功"), g.value = !1, se(), L()) : ne.error(a.msg);
        });
      });
    }
    function _() {
      ae(), L();
    }
    function t(d, a, Z) {
      d.code === 200 ? ne.success(`[${a.name}]上传成功`) : (ne.error(d.msg), m.value.handleRemove(a));
    }
    function A() {
      x(), q.value = "上传附件", me(), ae(), B.value = !0;
    }
    function x() {
      y.value = {
        attachConfigId: "",
        attachGroup: "default",
        fileList: []
      }, p.value && p.value.resetFields();
    }
    function me() {
      Vl().then((d) => {
        X.value = d.data, d.data.forEach((a) => {
          a.master && (y.value.attachConfigId = a.id);
        });
      });
    }
    function fe(d) {
      ne.error("上传失败,请检查网络是否通通畅");
    }
    return ae(), L(), (d, a) => {
      const Z = V("el-input"), $ = V("el-form-item"), M = V("el-option"), Y = V("el-select"), ee = V("el-button"), de = V("el-form"), Ae = V("Loading"), le = V("el-icon"), j = V("el-image"), ve = V("el-text"), l = V("InfoFilled"), oe = V("SuccessFilled"), $e = V("el-col"), Ne = V("el-row"), Qe = V("el-pagination"), We = V("el-link"), Re = V("el-dialog"), Ye = V("el-upload");
      return b(), H("div", xl, [
        C("div", Tl, [
          n(de, {
            inline: !0,
            model: o.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: f
          }, {
            default: i(() => [
              n($, { label: "附件名称" }, {
                default: i(() => [
                  n(Z, {
                    modelValue: o.value.name,
                    "onUpdate:modelValue": a[0] || (a[0] = (e) => o.value.name = e),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n($, { label: "分组" }, {
                default: i(() => [
                  n(Y, {
                    modelValue: o.value.attachGroup,
                    "onUpdate:modelValue": a[1] || (a[1] = (e) => o.value.attachGroup = e),
                    placeholder: "请选择分组",
                    filterable: "",
                    "allow-create": "",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: i(() => [
                      (b(!0), H(pe, null, ce(F(R), (e) => (b(), te(M, {
                        key: e.attachGroup,
                        label: e.attachGroup,
                        value: e.attachGroup
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              n($, null, {
                default: i(() => [
                  n(ee, {
                    type: "primary",
                    onClick: L,
                    icon: F(Ke)
                  }, {
                    default: i(() => [
                      J("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  n(ee, {
                    icon: F(Me),
                    onClick: Ce
                  }, {
                    default: i(() => [
                      J("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              }),
              n($, null, {
                default: i(() => [
                  n(ee, {
                    icon: F(ze),
                    type: "primary",
                    plain: "",
                    onClick: A
                  }, {
                    default: i(() => [
                      J("上传附件")
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        C("div", Sl, [
          n(Ne, { gutter: 15 }, {
            default: i(() => [
              (b(!0), H(pe, null, ce(F(w), (e) => (b(), te($e, {
                span: 6,
                class: "attach-col",
                onClick: (el) => xe(e)
              }, {
                default: i(() => [
                  C("div", {
                    class: Le({ "attach-block": !0, selected: e.selected })
                  }, [
                    C("div", Al, [
                      e.type && e.type === "img" ? (b(), te(j, {
                        key: e.url,
                        src: e.url,
                        lazy: "",
                        class: "attach-img",
                        loading: "lazy"
                      }, {
                        placeholder: i(() => [
                          C("div", $l, [
                            n(le, { class: "is-loading" }, {
                              default: i(() => [
                                n(Ae)
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 2
                      }, 1032, ["src"])) : e.type && e.type === "video" ? (b(), H("video", Fl, [
                        C("source", {
                          src: e.url
                        }, null, 8, Ul)
                      ])) : (b(), H("div", El, Ie(e.path.split(".").pop()), 1))
                    ]),
                    C("div", Ml, [
                      n(ve, {
                        "line-clamp": "1",
                        style: { width: "100%" }
                      }, {
                        default: i(() => [
                          J(Ie(e.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    C("div", {
                      class: Le({ "operate-mask": !0, selected: e.selected })
                    }, null, 2),
                    C("div", Nl, [
                      n(le, {
                        class: "operate-btn",
                        onClick: yl((el) => Te(e), ["stop"])
                      }, {
                        default: i(() => [
                          n(l)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      n(le, { class: "operate-btn select-btn" }, {
                        default: i(() => [
                          n(oe)
                        ]),
                        _: 1
                      })
                    ])
                  ], 2)
                ]),
                _: 2
              }, 1032, ["onClick"]))), 256))
            ]),
            _: 1
          }),
          n(Qe, {
            "current-page": o.value.pageNo,
            "onUpdate:currentPage": a[2] || (a[2] = (e) => o.value.pageNo = e),
            "page-size": o.value.pageSize,
            "onUpdate:pageSize": a[3] || (a[3] = (e) => o.value.pageSize = e),
            "page-sizes": [8, 16, 24],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: L,
            total: o.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        n(Re, {
          modelValue: F(g),
          "onUpdate:modelValue": a[11] || (a[11] = (e) => Fe(g) ? g.value = e : g = e),
          title: F(q),
          width: "800px",
          draggable: ""
        }, {
          footer: i(() => [
            C("span", Pl, [
              n(ee, {
                type: "primary",
                onClick: Se
              }, {
                default: i(() => [
                  J("修 改")
                ]),
                _: 1
              }),
              n(ee, {
                onClick: a[10] || (a[10] = (e) => {
                  Fe(g) ? g.value = !1 : g = !1, se();
                })
              }, {
                default: i(() => [
                  J("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: i(() => [
            n(Ne, null, {
              default: i(() => [
                n($e, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: i(() => [
                    C("div", Rl, [
                      s.value.type && s.value.type === "img" ? (b(), te(j, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: s.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [s.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : s.value.type && s.value.type === "video" ? (b(), H("video", zl, [
                        C("source", {
                          src: s.value.url
                        }, null, 8, Gl)
                      ])) : s.value.type && s.value.type === "audio" ? (b(), H("audio", Il, [
                        C("source", {
                          src: s.value.url
                        }, null, 8, Ll)
                      ])) : (b(), H("i", Bl, [
                        J("无法预览，点击 "),
                        n(We, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + s.value.configId + "/get/" + s.value.path
                        }, {
                          default: i(() => [
                            J("下载 ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                n($e, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: i(() => [
                    C("div", Hl, [
                      n(de, {
                        ref_key: "showFormRef",
                        ref: O,
                        model: s.value,
                        "label-width": "auto",
                        rules: W,
                        "label-position": "top"
                      }, {
                        default: i(() => [
                          n($, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: i(() => [
                              n(Z, {
                                modelValue: s.value.name,
                                "onUpdate:modelValue": a[4] || (a[4] = (e) => s.value.name = e)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n($, { label: "附件类型" }, {
                            default: i(() => [
                              n(Z, {
                                modelValue: s.value.type,
                                "onUpdate:modelValue": a[5] || (a[5] = (e) => s.value.type = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n($, { label: "分组" }, {
                            default: i(() => [
                              n(Y, {
                                modelValue: s.value.attachGroup,
                                "onUpdate:modelValue": a[6] || (a[6] = (e) => s.value.attachGroup = e),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: i(() => [
                                  (b(!0), H(pe, null, ce(F(R), (e) => (b(), te(M, {
                                    key: e.attachGroup,
                                    label: e.attachGroup,
                                    value: e.attachGroup
                                  }, null, 8, ["label", "value"]))), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n($, { label: "存储路径" }, {
                            default: i(() => [
                              n(Z, {
                                modelValue: s.value.path,
                                "onUpdate:modelValue": a[7] || (a[7] = (e) => s.value.path = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n($, { label: "访问地址" }, {
                            default: i(() => [
                              n(Z, {
                                modelValue: s.value.url,
                                "onUpdate:modelValue": a[8] || (a[8] = (e) => s.value.url = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          n($, { label: "附件描述" }, {
                            default: i(() => [
                              n(Z, {
                                modelValue: s.value.desc,
                                "onUpdate:modelValue": a[9] || (a[9] = (e) => s.value.desc = e),
                                autosize: { minRows: 2, maxRows: 4 },
                                type: "textarea",
                                resize: "none",
                                placeholder: "请输入附件描述"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model", "rules"])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        n(Re, {
          modelValue: F(B),
          "onUpdate:modelValue": a[15] || (a[15] = (e) => Fe(B) ? B.value = e : B = e),
          title: F(q),
          width: "600px",
          draggable: "",
          onClose: _
        }, {
          default: i(() => [
            n(de, {
              ref_key: "addFormRef",
              ref: p,
              model: y.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: i(() => [
                n($, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: i(() => [
                    n(Y, {
                      modelValue: y.value.attachConfigId,
                      "onUpdate:modelValue": a[12] || (a[12] = (e) => y.value.attachConfigId = e),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: i(() => [
                        (b(!0), H(pe, null, ce(F(X), (e) => (b(), te(M, {
                          key: e.id,
                          label: e.name,
                          value: e.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                n($, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: i(() => [
                    n(Y, {
                      modelValue: y.value.attachGroup,
                      "onUpdate:modelValue": a[13] || (a[13] = (e) => y.value.attachGroup = e),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: i(() => [
                        (b(!0), H(pe, null, ce(F(R), (e) => (b(), te(M, {
                          key: e.attachGroup,
                          label: e.attachGroup,
                          value: e.attachGroup
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                n($, {
                  label: "附件描述",
                  prop: "name"
                }, {
                  default: i(() => [
                    n(Ye, {
                      class: "upload-demo",
                      drag: "",
                      headers: F(ke),
                      action: F(ye) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: m,
                      "file-list": y.value.fileList,
                      "onUpdate:fileList": a[14] || (a[14] = (e) => y.value.fileList = e),
                      data: { attachConfigId: y.value.attachConfigId, attachGroup: y.value.attachGroup },
                      "on-success": t,
                      "on-error": fe,
                      accept: D.value
                    }, {
                      tip: i(() => [
                        Dl
                      ]),
                      default: i(() => [
                        n(le, { class: "el-icon--upload" }, {
                          default: i(() => [
                            n(F(ze))
                          ]),
                          _: 1
                        }),
                        Ol
                      ]),
                      _: 1
                    }, 8, ["headers", "action", "file-list", "data", "accept"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}, Kl = /* @__PURE__ */ bl(jl, [["__scopeId", "data-v-fe8136c6"]]), Jl = window.Vue.normalizeStyle, Be = window.Vue.createElementVNode, ue = window.Vue.unref, _e = window.Vue.createVNode, Xl = window.Vue.toDisplayString, He = window.Vue.openBlock, Pe = window.Vue.createElementBlock, Ql = window.Vue.createCommentVNode, Oe = window.Vue.createTextVNode, De = window.Vue.resolveComponent, ge = window.Vue.withCtx, qe = window.Vue.isRef, Wl = window.Vue.Fragment, Yl = { class: "dialog-footer" }, et = { key: 0 }, lt = window.Vue.onMounted, tt = window.Vue.onUnmounted, ie = window.Vue.ref, at = window.Vue.watch, he = window.ElementPlus.ElMessage, ot = {
  __name: "ai-editor",
  props: ["initValue", "height"],
  setup(c, { expose: P }) {
    const f = ie();
    let o = null, w = ie(!1), I = ie(""), S = ie([]), E = ie(""), v = ie(0);
    const g = c;
    at(() => g.initValue, (p) => {
      o && o.setContent(p);
    }), lt(() => {
      o = new rl({
        element: f.value,
        placeholder: "写点什么?",
        content: g.initValue ? g.initValue : "",
        toolbarKeys: [
          "undo",
          "redo",
          "brush",
          "eraser",
          "|",
          "heading",
          "font-family",
          "font-size",
          "|",
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "code",
          "subscript",
          "superscript",
          "hr",
          "todo",
          "emoji",
          "|",
          "highlight",
          "font-color",
          "|",
          "align",
          "line-height",
          "|",
          "bullet-list",
          "ordered-list",
          "indent-decrease",
          "indent-increase",
          "break",
          "|",
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5ZM18 17L14 11L7 17H18Z"></path></svg>',
            onClick: (p, m) => {
              E.value = "img", v.value = 8, I.value = "选择图片", w.value = !0;
            },
            tip: "插入图片"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19V5H9.58579L11.5858 7H20V19H4ZM21 5H12.4142L10.4142 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V6C22 5.44772 21.5523 5 21 5ZM15.0008 12.667L10.1219 9.41435C10.0562 9.37054 9.979 9.34717 9.9 9.34717C9.6791 9.34717 9.5 9.52625 9.5 9.74717V16.2524C9.5 16.3314 9.5234 16.4086 9.5672 16.4743C9.6897 16.6581 9.9381 16.7078 10.1219 16.5852L15.0008 13.3326C15.0447 13.3033 15.0824 13.2656 15.1117 13.2217C15.2343 13.0379 15.1846 12.7895 15.0008 12.667Z"></path></svg>',
            onClick: (p, m) => {
              E.value = "video", v.value = 1, I.value = "选择视频", w.value = !0;
            },
            tip: "插入视频"
          },
          {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM11 12V9H13V12H16V14H13V17H11V14H8V12H11Z"></path></svg>',
            onClick: (p, m) => {
              E.value = "other", v.value = 1, I.value = "选择附件", w.value = !0;
            },
            tip: "插入附件"
          },
          "quote",
          "code-block",
          "table",
          "|",
          "printer",
          "fullscreen"
        ],
        image: {
          allowBase64: !1,
          uploadUrl: "/api/auth/attach/upload",
          uploadFormName: "file",
          uploadHeaders: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem(Je.STORAGE_TOKEN)).accessToken
          },
          uploaderEvent: {
            onFailed: (p, m) => {
              he.error("文件上传失败");
            },
            onError: (p, m) => {
              he.error("文件上传失败");
            },
            onSuccess: (p, m) => m.code === 200 ? (he.success("文件上传成功"), {
              errorCode: 0,
              data: {
                src: m.data.url,
                alt: m.data.name
              }
            }) : (he.error(m.msg), !1)
          }
        }
      });
    }), tt(() => {
      o && o.destroy();
    });
    function q(p) {
      S.value = p;
    }
    function R() {
      let p = "";
      S.value.forEach((m, B) => {
        E.value === "img" && (p += `![${m.name}](${m.url})`), E.value === "video" && (p += `<video src="${m.url}" controls="controls" width="100%"></video>`), E.value === "other" && (p += `[${m.name}](${m.url})`);
      }), o.insert(p), w.value = !1, S.value = [];
    }
    function O() {
      w.value = !1, S.value = [];
    }
    function s() {
      o.clear();
    }
    function W() {
      return {
        content: o.getMarkdown(),
        parseContent: o.getHtml()
      };
    }
    return P({
      resetContent: s,
      getValue: W
    }), (p, m) => {
      const B = De("el-button"), X = De("el-dialog");
      return He(), Pe(Wl, null, [
        Be("div", {
          ref_key: "divRef",
          ref: f,
          style: Jl({ height: g.height })
        }, null, 4),
        _e(X, {
          modelValue: ue(w),
          "onUpdate:modelValue": m[1] || (m[1] = (y) => qe(w) ? w.value = y : w = y),
          title: ue(I),
          width: "900px",
          draggable: "",
          "destroy-on-close": ""
        }, {
          footer: ge(() => [
            Be("span", Yl, [
              _e(B, {
                type: "primary",
                onClick: R
              }, {
                default: ge(() => [
                  Oe("确 定"),
                  ue(S).length > 0 ? (He(), Pe("span", et, "(已选" + Xl(ue(S).length) + "个)", 1)) : Ql("", !0)
                ]),
                _: 1
              }),
              _e(B, {
                onClick: m[0] || (m[0] = (y) => {
                  qe(w) ? w.value = !1 : w = !1, O();
                })
              }, {
                default: ge(() => [
                  Oe("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: ge(() => [
            _e(Kl, {
              "onUpdate:selectedAttach": q,
              max: ue(v),
              "attach-type": ue(E)
            }, null, 8, ["max", "attach-type"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ], 64);
    };
  }
}, N = window.Vue.resolveComponent, u = window.Vue.createVNode, r = window.Vue.withCtx, h = window.Vue.unref, Ue = window.Vue.renderList, Ee = window.Vue.Fragment, k = window.Vue.openBlock, we = window.Vue.createElementBlock, z = window.Vue.createBlock, G = window.Vue.createTextVNode, Ze = window.Vue.resolveDirective, Q = window.Vue.withDirectives, re = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const nt = window.Vue.toDisplayString, Ve = window.Vue.isRef, ut = { class: "page" }, it = { class: "search-box" }, rt = { class: "right-tool" }, st = { class: "table-box" }, dt = { class: "dialog-footer" }, ct = { class: "dialog-footer" }, K = window.ElementPlus.ElMessage, pt = window.ElementPlus.ElMessageBox, je = window.Vue.reactive, T = window.Vue.ref, gt = {
  __name: "MailTemplateView",
  setup(c) {
    let P = T("");
    const f = T({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      code: null,
      mailServerId: null
    }), o = T({
      id: null,
      name: null,
      code: null,
      mailServerId: null,
      nickname: null,
      mailTitle: null,
      mailContent: null,
      status: 0,
      remark: null
    }), w = je({
      name: [{ required: !0, message: "模板名称不能为空", trigger: "blur" }],
      code: [{ required: !0, message: "模板编码不能为空", trigger: "blur" }],
      mailServerId: [{ required: !0, message: "邮箱服务不能为空", trigger: "blur" }],
      nickname: [{ required: !0, message: "发送人名称不能为空", trigger: "blur" }],
      mailTitle: [{ required: !0, message: "邮件标题不能为空", trigger: "blur" }],
      mailContent: [{ required: !0, message: "邮件内容不能为空", trigger: "blur" }],
      status: [{ required: !0, message: "状态不能为空", trigger: "blur" }]
    }), I = T(), S = T(), E = T();
    let v = T(!1), g = T(""), q = T([]), R = T(!1), O = T([]), s = T(!1), W = T(!1);
    const p = T({
      mailTemplateId: "",
      receiveMail: "",
      mailParams: {}
    }), m = T(), B = je({
      receiveMail: [
        { required: !0, message: "收件邮箱不能为空", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
      ],
      mailParams: [{ required: !0, message: "参数不能为空", trigger: "blur" }]
    });
    let X = T([]);
    function y() {
      o.value.mailContent = I.value.getValue().parseContent, E.value.validate((_) => {
        _ && (o.value.id ? cl(o.value).then((t) => {
          t.code === 200 ? (K.success("操作成功"), v.value = !1, L(), D()) : K.error(t.msg);
        }) : dl(o.value).then((t) => {
          t.code === 200 ? (K.success("操作成功"), v.value = !1, L(), D()) : K.error(t.msg);
        }));
      });
    }
    function be() {
      L(), g.value = "添加邮件模板", v.value = !0;
    }
    function ye(_) {
      L(), g.value = "修改邮件模板", v.value = !0, Ge(_.id).then((t) => {
        o.value = t.data, P.value = o.value.mailContent;
      });
    }
    function ke(_) {
      let t = Object.keys(_);
      pt.confirm("确定要删除[" + _[t[0]] + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        pl(_.id).then((A) => {
          A.code === 200 && A.data ? (K.success("删除成功"), D()) : K.error(A.msg);
        });
      }).catch(() => {
      });
    }
    function D() {
      R.value = !0, sl(f.value).then((_) => {
        q.value = _.data.list, f.value.total = _.data.total, R.value = !1;
      });
    }
    function se() {
      f.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        code: null,
        mailServerId: null
      }, S.value.resetFields(), D();
    }
    function L() {
      P.value = "", I.value && I.value.resetContent(), o.value = {
        id: null,
        name: null,
        code: null,
        mailServerId: null,
        nickname: null,
        mailTitle: null,
        mailContent: null,
        status: 0,
        remark: null
      }, E.value && E.value.resetFields();
    }
    function Ce() {
      R.value = !0, ml(f.value).then((_) => {
        window.download.excel(_, "邮件模板数据.xlsx"), R.value = !1;
      }).catch((_) => {
        K.error("导出失败"), R.value = !1;
      });
    }
    function xe() {
      il().then((_) => {
        O.value = _.data;
      });
    }
    function ae(_) {
      g.value = "发送测试邮件", s.value = !0, X.value = [], Ge(_.id).then((t) => {
        p.value.mailTemplateId = t.data.id, P.value = t.data.mailContent, X.value = t.data.mailParams;
      });
    }
    function Te() {
      m.value.validate((_) => {
        _ && (W.value = !0, fl(p.value).then((t) => {
          t.code === 200 && t.data ? (K.success("发送成功"), s.value = !1) : K.error("发送失败,请检查邮箱服务配置"), W.value = !1;
        }));
      });
    }
    function Se() {
      p.value = {
        mailTemplateId: "",
        receiveMail: "",
        mailParams: {}
      }, m.value && m.value.resetFields();
    }
    return xe(), D(), (_, t) => {
      const A = N("el-input"), x = N("el-form-item"), me = N("el-option"), fe = N("el-select"), d = N("el-button"), a = N("el-form"), Z = N("el-col"), $ = N("el-row"), M = N("el-table-column"), Y = N("el-tag"), ee = N("el-table"), de = N("el-pagination"), Ae = N("el-switch"), le = N("el-dialog"), j = Ze("hasPermission"), ve = Ze("loading");
      return k(), we("div", ut, [
        re("div", it, [
          u(a, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: S
          }, {
            default: r(() => [
              u(x, { label: "模板名称" }, {
                default: r(() => [
                  u(A, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": t[0] || (t[0] = (l) => f.value.name = l),
                    placeholder: "请输入模板名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              u(x, { label: "模板编码" }, {
                default: r(() => [
                  u(A, {
                    modelValue: f.value.code,
                    "onUpdate:modelValue": t[1] || (t[1] = (l) => f.value.code = l),
                    placeholder: "请输入模板编码",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              u(x, { label: "邮箱服务" }, {
                default: r(() => [
                  u(fe, {
                    modelValue: f.value.mailServerId,
                    "onUpdate:modelValue": t[2] || (t[2] = (l) => f.value.mailServerId = l),
                    placeholder: "请选择邮箱服务",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: r(() => [
                      (k(!0), we(Ee, null, Ue(h(O), (l) => (k(), z(me, {
                        key: l.id,
                        label: l.name,
                        value: l.id
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              u(x, null, {
                default: r(() => [
                  Q((k(), z(d, {
                    type: "primary",
                    onClick: D,
                    icon: h(Ke)
                  }, {
                    default: r(() => [
                      G("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [j, ["admin:mailTemplate:query"]]
                  ]),
                  u(d, {
                    icon: h(Me),
                    onClick: se
                  }, {
                    default: r(() => [
                      G("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  Q((k(), z(d, {
                    icon: h(tl),
                    onClick: Ce
                  }, {
                    default: r(() => [
                      G("导出")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [j, ["admin:mailTemplate:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        u($, {
          gutter: 10,
          class: "mb8"
        }, {
          default: r(() => [
            u(Z, { span: 1.5 }, {
              default: r(() => [
                Q((k(), z(d, {
                  icon: h(al),
                  type: "primary",
                  plain: "",
                  onClick: be
                }, {
                  default: r(() => [
                    G("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [j, ["admin:mailTemplate:create"]]
                ])
              ]),
              _: 1
            }),
            re("div", rt, [
              u(d, {
                icon: h(Me),
                circle: "",
                onClick: D
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        re("div", st, [
          Q((k(), z(ee, {
            data: h(q),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: r(() => [
              u(M, {
                prop: "name",
                label: "模板名称",
                "min-width": "120"
              }),
              u(M, {
                prop: "code",
                label: "模板编码",
                "min-width": "120"
              }),
              u(M, {
                prop: "nickname",
                label: "发送人名称",
                "min-width": "120"
              }),
              u(M, {
                prop: "mailTitle",
                label: "邮件标题",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              u(M, {
                prop: "mailContent",
                label: "邮件内容",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              u(M, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: r((l) => [
                  l.row.status === 0 ? (k(), z(Y, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: r(() => [
                      G("启用")
                    ]),
                    _: 1
                  })) : (k(), z(Y, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: r(() => [
                      G("禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              u(M, {
                prop: "remark",
                label: "备注",
                "min-width": "150"
              }),
              u(M, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: r((l) => [
                  re("span", null, nt(h(ll)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              u(M, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: r((l) => [
                  Q((k(), z(d, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: h(ol),
                    onClick: (oe) => ae(l.row)
                  }, {
                    default: r(() => [
                      G("测试")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [j, ["admin:mailTemplate:testMail"]]
                  ]),
                  Q((k(), z(d, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: h(nl),
                    onClick: (oe) => ye(l.row)
                  }, {
                    default: r(() => [
                      G("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [j, ["admin:mailTemplate:update"]]
                  ]),
                  Q((k(), z(d, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: h(ul),
                    onClick: (oe) => ke(l.row)
                  }, {
                    default: r(() => [
                      G("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [j, ["admin:mailTemplate:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ve, h(R)]
          ]),
          u(de, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": t[3] || (t[3] = (l) => f.value.pageNo = l),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": t[4] || (t[4] = (l) => f.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: D,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        u(le, {
          modelValue: h(v),
          "onUpdate:modelValue": t[13] || (t[13] = (l) => Ve(v) ? v.value = l : v = l),
          title: h(g),
          width: "800px",
          draggable: ""
        }, {
          footer: r(() => [
            re("span", dt, [
              u(d, {
                type: "primary",
                onClick: y
              }, {
                default: r(() => [
                  G("确 定")
                ]),
                _: 1
              }),
              u(d, {
                onClick: t[12] || (t[12] = (l) => {
                  Ve(v) ? v.value = !1 : v = !1, L();
                })
              }, {
                default: r(() => [
                  G("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            u(a, {
              ref_key: "addFormRef",
              ref: E,
              model: o.value,
              "label-width": "100px",
              "status-icon": "",
              rules: w
            }, {
              default: r(() => [
                u(x, {
                  label: "模板名称",
                  prop: "name"
                }, {
                  default: r(() => [
                    u(A, {
                      modelValue: o.value.name,
                      "onUpdate:modelValue": t[5] || (t[5] = (l) => o.value.name = l),
                      placeholder: "请输入模板名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(x, {
                  label: "模板编码",
                  prop: "code"
                }, {
                  default: r(() => [
                    u(A, {
                      modelValue: o.value.code,
                      "onUpdate:modelValue": t[6] || (t[6] = (l) => o.value.code = l),
                      placeholder: "请输入模板编码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(x, {
                  label: "邮箱服务",
                  prop: "mailServerId"
                }, {
                  default: r(() => [
                    u(fe, {
                      modelValue: o.value.mailServerId,
                      "onUpdate:modelValue": t[7] || (t[7] = (l) => o.value.mailServerId = l),
                      placeholder: "请选择邮箱服务",
                      clearable: "",
                      style: { width: "200px" }
                    }, {
                      default: r(() => [
                        (k(!0), we(Ee, null, Ue(h(O), (l) => (k(), z(me, {
                          key: l.id,
                          label: l.name,
                          value: l.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(x, {
                  label: "发送人名称",
                  prop: "nickname"
                }, {
                  default: r(() => [
                    u(A, {
                      modelValue: o.value.nickname,
                      "onUpdate:modelValue": t[8] || (t[8] = (l) => o.value.nickname = l),
                      placeholder: "请输入发送人名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(x, {
                  label: "邮件标题",
                  prop: "mailTitle"
                }, {
                  default: r(() => [
                    u(A, {
                      modelValue: o.value.mailTitle,
                      "onUpdate:modelValue": t[9] || (t[9] = (l) => o.value.mailTitle = l),
                      placeholder: "请输入邮件标题"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(x, {
                  label: "邮件内容",
                  prop: "mailContent"
                }, {
                  default: r(() => [
                    u(ot, {
                      "init-value": h(P),
                      ref_key: "editorRef",
                      ref: I,
                      height: "400px"
                    }, null, 8, ["init-value"])
                  ]),
                  _: 1
                }),
                u(x, {
                  label: "状态",
                  prop: "status"
                }, {
                  default: r(() => [
                    u(Ae, {
                      modelValue: o.value.status,
                      "onUpdate:modelValue": t[10] || (t[10] = (l) => o.value.status = l),
                      "inline-prompt": "",
                      "active-text": "启用",
                      "inactive-text": "禁用",
                      "active-value": 0,
                      "inactive-value": 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                u(x, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: r(() => [
                    u(A, {
                      modelValue: o.value.remark,
                      "onUpdate:modelValue": t[11] || (t[11] = (l) => o.value.remark = l),
                      placeholder: "请输入备注",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        u(le, {
          modelValue: h(s),
          "onUpdate:modelValue": t[16] || (t[16] = (l) => Ve(s) ? s.value = l : s = l),
          title: h(g),
          width: "800px",
          draggable: ""
        }, {
          footer: r(() => [
            re("span", ct, [
              u(d, {
                type: "primary",
                onClick: Te
              }, {
                default: r(() => [
                  G("发 送")
                ]),
                _: 1
              }),
              u(d, {
                onClick: t[15] || (t[15] = (l) => {
                  Ve(s) ? s.value = !1 : s = !1, Se();
                })
              }, {
                default: r(() => [
                  G("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: r(() => [
            Q((k(), z(a, {
              ref_key: "testMailFormRef",
              ref: m,
              model: p.value,
              "label-width": "100px",
              "status-icon": "",
              rules: B
            }, {
              default: r(() => [
                u(x, {
                  label: "收件邮箱",
                  prop: "receiveMail"
                }, {
                  default: r(() => [
                    u(A, {
                      modelValue: p.value.receiveMail,
                      "onUpdate:modelValue": t[14] || (t[14] = (l) => p.value.receiveMail = l),
                      placeholder: "请输入收件邮箱"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                (k(!0), we(Ee, null, Ue(h(X), (l) => (k(), z(x, {
                  label: "参数 [" + l + "]",
                  prop: "mailParams"
                }, {
                  default: r(() => [
                    u(A, {
                      modelValue: p.value.mailParams[l],
                      "onUpdate:modelValue": (oe) => p.value.mailParams[l] = oe,
                      placeholder: "请输入参数 [" + l + "]"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  _: 2
                }, 1032, ["label"]))), 256))
              ]),
              _: 1
            }, 8, ["model", "rules"])), [
              [ve, h(W)]
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  gt as default
};
