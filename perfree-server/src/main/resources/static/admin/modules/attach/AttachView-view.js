import { p as be, f as Ve } from "./lib/perfree.js";
import { s as ke, r as Y, u as Z, v as xe, b as Ge, a as Ce } from "./lib/@element-plus.js";
const Ae = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
}, Ue = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
};
function Re(w) {
  return axios.post("/api/auth/attach/page", w);
}
function Se() {
  return axios.get("/api/auth/attach/getAllAttachGroup");
}
function Te(w) {
  return axios.put("/api/auth/attach/update", w);
}
function Ee(w) {
  return axios.get("/api/auth/attach/get?id=" + w);
}
function Fe(w) {
  return axios.delete("/api/auth/attach/del?id=" + w);
}
const u = window.Vue.unref, R = window.Vue.renderList, S = window.Vue.Fragment, n = window.Vue.openBlock, c = window.Vue.createElementBlock, r = window.Vue.resolveComponent, p = window.Vue.createBlock, t = window.Vue.withCtx, l = window.Vue.createVNode, _ = window.Vue.createTextVNode, ee = window.Vue.resolveDirective, C = window.Vue.withDirectives, m = window.Vue.createElementVNode, N = window.Vue.createCommentVNode, K = window.Vue.toDisplayString, $ = window.Vue.isRef, ze = { class: "page" }, Ne = { class: "search-box" }, Ie = { class: "right-tool" }, Be = { class: "table-box" }, Le = { class: "block" }, Oe = {
  key: 1,
  controls: "",
  preload: "none",
  style: { height: "50px" }
}, De = ["src"], Pe = { key: 2 }, Me = { key: 0 }, qe = { key: 1 }, Ke = { key: 2 }, $e = { key: 3 }, je = /* @__PURE__ */ m("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ _(" 拖拽文件到此处或者"),
  /* @__PURE__ */ m("em", null, "点击上传")
], -1), Je = /* @__PURE__ */ m("div", { class: "el-upload__tip" }, " 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ", -1), He = { style: { "padding-right": "15px" } }, Qe = {
  key: 1,
  preload: "none",
  controls: "",
  style: { width: "100%", "max-height": "100%" }
}, We = ["src"], Xe = {
  key: 2,
  controls: "",
  preload: "none"
}, Ye = ["src"], Ze = { key: 3 }, el = { class: "showForm" }, ll = { class: "dialog-footer" }, x = window.ElementPlus.ElMessage, tl = window.ElementPlus.ElMessageBox, al = window.Vue.reactive, f = window.Vue.ref, ul = {
  __name: "AttachView",
  setup(w) {
    let le = localStorage.getItem(Ue.STORAGE_TOKEN), te = Ae.baseURL, j = f([]), I = f(!1);
    const J = f();
    let A = f(!1), v = f(!1), T = f(""), E = f([]), B = f([]), L = f(null), ae = {
      Authorization: "Bearer " + JSON.parse(le).accessToken
    };
    const O = f(), F = f();
    let H = f();
    const h = f({
      attachConfigId: L.value,
      attachGroup: "default",
      fileList: []
    }), oe = al({
      name: [{ required: !0, message: "请输入附件名称", trigger: "blur" }]
    }), d = f({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: "",
      attachConfigId: void 0,
      storage: void 0,
      attachGroup: void 0
    }), o = f({
      name: "",
      type: "",
      attachGroup: "default",
      path: "",
      url: "",
      remark: "",
      mineType: ""
    });
    function g() {
      I.value = !0, Re(d.value).then((i) => {
        j.value = i.data.list, d.value.total = i.data.total, I.value = !1;
      });
    }
    function ne() {
      D(), g();
    }
    function ue() {
      d.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: "",
        attachConfigId: void 0,
        storage: void 0,
        attachGroup: void 0
      }, J.value.resetFields(), g();
    }
    function ie() {
      h.value = {
        attachConfigId: L.value,
        attachGroup: "default",
        fileList: []
      }, O.value && O.value.resetFields();
    }
    function de() {
      ie(), T.value = "上传附件", D(), A.value = !0;
    }
    function D() {
      Se().then((i) => {
        E.value = i.data;
      });
    }
    function re() {
      Ve().then((i) => {
        B.value = i.data, i.data.forEach((a) => {
          a.master && (L.value = a.id);
        });
      });
    }
    function se(i) {
      P(), Ee(i.id).then((a) => {
        o.value = a.data, T.value = "详情", v.value = !0;
      });
    }
    function P() {
      o.value = {
        name: "",
        type: "",
        attachGroup: "default",
        path: "",
        url: "",
        remark: "",
        mineType: ""
      }, F.value && F.value.resetFields();
    }
    function ce() {
      F.value.validate((i) => {
        i && Te(o.value).then((a) => {
          a.code === 200 ? (x.success("修改成功"), v.value = !1, P(), g()) : x.error(a.msg);
        });
      });
    }
    function pe(i) {
      tl.confirm("确定要删除[" + i.name + "]吗？删除后该文件将无法找回!", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Fe(i.id).then((a) => {
          a.code === 200 && a.data ? (x.success("删除成功"), g()) : x.error("删除失败");
        });
      }).catch(() => {
      });
    }
    function fe(i, a, y) {
      i.code === 200 ? x.success(`[${a.name}]上传成功`) : (x.error(i.msg), H.value.handleRemove(a));
    }
    function me(i) {
      x.error("上传失败,请检查网络是否通通畅");
    }
    return D(), re(), g(), (i, a) => {
      const y = r("el-option"), G = r("el-select"), s = r("el-form-item"), k = r("el-input"), b = r("el-button"), M = r("el-form"), q = r("el-col"), Q = r("el-row"), V = r("el-table-column"), W = r("el-image"), z = r("el-link"), _e = r("el-table"), he = r("el-pagination"), ve = r("el-icon"), we = r("el-upload"), X = r("el-dialog"), U = ee("hasPermission"), ge = ee("loading");
      return n(), c("div", ze, [
        m("div", Ne, [
          l(M, {
            inline: !0,
            model: d.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: J
          }, {
            default: t(() => [
              l(s, { label: "分组" }, {
                default: t(() => [
                  l(G, {
                    modelValue: d.value.attachGroup,
                    "onUpdate:modelValue": a[0] || (a[0] = (e) => d.value.attachGroup = e),
                    placeholder: "请选择分组",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: t(() => [
                      (n(!0), c(S, null, R(u(E), (e) => (n(), p(y, {
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
              l(s, { label: "附件名称" }, {
                default: t(() => [
                  l(k, {
                    modelValue: d.value.name,
                    "onUpdate:modelValue": a[1] || (a[1] = (e) => d.value.name = e),
                    placeholder: "请输入附件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "存储器类型" }, {
                default: t(() => [
                  l(G, {
                    modelValue: d.value.storage,
                    "onUpdate:modelValue": a[2] || (a[2] = (e) => d.value.storage = e),
                    placeholder: "请选择存储器类型",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: t(() => [
                      (n(), p(y, {
                        key: 0,
                        label: "本地磁盘",
                        value: 0
                      })),
                      (n(), p(y, {
                        key: 1,
                        label: "S3对象存储",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(s, { label: "存储策略" }, {
                default: t(() => [
                  l(G, {
                    modelValue: d.value.attachConfigId,
                    "onUpdate:modelValue": a[3] || (a[3] = (e) => d.value.attachConfigId = e),
                    placeholder: "请选择存储策略",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: t(() => [
                      (n(!0), c(S, null, R(u(B), (e) => (n(), p(y, {
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
              l(s, null, {
                default: t(() => [
                  C((n(), p(b, {
                    type: "primary",
                    onClick: g,
                    icon: u(ke)
                  }, {
                    default: t(() => [
                      _("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [U, ["admin:attach:query"]]
                  ]),
                  l(b, {
                    icon: u(Y),
                    onClick: ue
                  }, {
                    default: t(() => [
                      _("重置")
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
        l(Q, {
          gutter: 10,
          class: "mb8"
        }, {
          default: t(() => [
            l(q, { span: 1.5 }, {
              default: t(() => [
                C((n(), p(b, {
                  icon: u(Z),
                  type: "primary",
                  plain: "",
                  onClick: de
                }, {
                  default: t(() => [
                    _("上传附件")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [U, ["admin:attach:upload"]]
                ])
              ]),
              _: 1
            }),
            m("div", Ie, [
              l(b, {
                icon: u(Y),
                circle: "",
                onClick: g
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        m("div", Be, [
          C((n(), p(_e, {
            data: u(j),
            style: { width: "100%", height: "100%" },
            "row-key": "id",
            "show-overflow-tooltip": !0
          }, {
            default: t(() => [
              l(V, {
                label: "序号",
                "min-width": "50",
                type: "index"
              }),
              l(V, {
                prop: "name",
                label: "附件名称",
                "min-width": "130"
              }),
              l(V, {
                prop: "attachGroup",
                label: "预览",
                "min-width": "80"
              }, {
                default: t((e) => [
                  m("div", Le, [
                    e.row.type && e.row.type === "img" ? (n(), p(W, {
                      key: 0,
                      style: { height: "50px" },
                      src: e.row.url,
                      "zoom-rate": 1.2,
                      "max-scale": 7,
                      "min-scale": 0.2,
                      "preview-src-list": [e.row.url],
                      "initial-index": 4,
                      "append-to-body": "",
                      fit: "cover",
                      "preview-teleported": ""
                    }, null, 8, ["src", "preview-src-list"])) : e.row.type && e.row.type === "video" ? (n(), c("video", Oe, [
                      m("source", {
                        src: e.row.url
                      }, null, 8, De)
                    ])) : (n(), c("i", Pe, [
                      _("无法预览，点击 "),
                      l(z, {
                        type: "primary",
                        underline: !1,
                        style: { "font-size": "12px", "vertical-align": "baseline" },
                        target: "_blank",
                        href: "/api/attach/file/" + e.row.configId + "/get/" + e.row.path
                      }, {
                        default: t(() => [
                          _("下载 ")
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ]))
                  ])
                ]),
                _: 1
              }),
              l(V, {
                prop: "url",
                label: "访问地址",
                "min-width": "280"
              }, {
                default: t((e) => [
                  l(z, {
                    href: e.row.url,
                    target: "_blank",
                    underline: !1
                  }, {
                    default: t(() => [
                      _(K(e.row.url), 1)
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }),
              l(V, {
                prop: "type",
                label: "附件类型",
                "min-width": "60"
              }, {
                default: t((e) => [
                  e.row.type === "img" ? (n(), c("span", Me, "图片")) : N("", !0),
                  e.row.type === "video" ? (n(), c("span", qe, "视频")) : N("", !0),
                  e.row.type === "audio" ? (n(), c("span", Ke, "音频")) : N("", !0),
                  e.row.type === "other" ? (n(), c("span", $e, "其他")) : N("", !0)
                ]),
                _: 1
              }),
              l(V, {
                prop: "attachGroup",
                label: "分组",
                "min-width": "80"
              }, {
                default: t((e) => [
                  m("span", null, K(e.row.attachGroup), 1)
                ]),
                _: 1
              }),
              l(V, {
                prop: "createTime",
                label: "上传时间",
                "min-width": "100"
              }, {
                default: t((e) => [
                  m("span", null, K(u(be)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(V, {
                label: "操作",
                width: "180",
                fixed: "right"
              }, {
                default: t((e) => [
                  C((n(), p(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(xe),
                    onClick: (ye) => se(e.row)
                  }, {
                    default: t(() => [
                      _("详情")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:attach:desc"]]
                  ]),
                  C((n(), p(z, {
                    type: "primary",
                    underline: !1,
                    target: "_blank",
                    icon: u(Ge),
                    style: { "font-size": "12px" },
                    href: "/api/attach/file/" + e.row.configId + "/get/" + e.row.path
                  }, {
                    default: t(() => [
                      _("下载 ")
                    ]),
                    _: 2
                  }, 1032, ["icon", "href"])), [
                    [U, ["admin:attach:download"]]
                  ]),
                  C((n(), p(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Ce),
                    onClick: (ye) => pe(e.row)
                  }, {
                    default: t(() => [
                      _("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:attach:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ge, u(I)]
          ]),
          l(he, {
            "current-page": d.value.pageNo,
            "onUpdate:currentPage": a[4] || (a[4] = (e) => d.value.pageNo = e),
            "page-size": d.value.pageSize,
            "onUpdate:pageSize": a[5] || (a[5] = (e) => d.value.pageSize = e),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: g,
            total: d.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(X, {
          modelValue: u(A),
          "onUpdate:modelValue": a[9] || (a[9] = (e) => $(A) ? A.value = e : A = e),
          title: u(T),
          width: "600px",
          draggable: "",
          onClose: ne
        }, {
          default: t(() => [
            l(M, {
              ref_key: "addFormRef",
              ref: O,
              model: h.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: t(() => [
                l(s, {
                  label: "存储策略",
                  prop: "name"
                }, {
                  default: t(() => [
                    l(G, {
                      modelValue: h.value.attachConfigId,
                      "onUpdate:modelValue": a[6] || (a[6] = (e) => h.value.attachConfigId = e),
                      placeholder: "请选择存储策略",
                      clearable: ""
                    }, {
                      default: t(() => [
                        (n(!0), c(S, null, R(u(B), (e) => (n(), p(y, {
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
                l(s, {
                  label: "分组",
                  prop: "attachGroup"
                }, {
                  default: t(() => [
                    l(G, {
                      modelValue: h.value.attachGroup,
                      "onUpdate:modelValue": a[7] || (a[7] = (e) => h.value.attachGroup = e),
                      placeholder: "请选择分组",
                      filterable: "",
                      "allow-create": ""
                    }, {
                      default: t(() => [
                        (n(!0), c(S, null, R(u(E), (e) => (n(), p(y, {
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
                l(s, {
                  label: "附件",
                  prop: "name"
                }, {
                  default: t(() => [
                    l(we, {
                      class: "upload-demo",
                      drag: "",
                      headers: u(ae),
                      action: u(te) + "/api/auth/attach/upload",
                      multiple: "",
                      style: { width: "100%" },
                      ref_key: "uploadRef",
                      ref: H,
                      "file-list": h.value.fileList,
                      "onUpdate:fileList": a[8] || (a[8] = (e) => h.value.fileList = e),
                      data: { attachConfigId: h.value.attachConfigId, attachGroup: h.value.attachGroup },
                      "on-success": fe,
                      "on-error": me
                    }, {
                      tip: t(() => [
                        Je
                      ]),
                      default: t(() => [
                        l(ve, { class: "el-icon--upload" }, {
                          default: t(() => [
                            l(u(Z))
                          ]),
                          _: 1
                        }),
                        je
                      ]),
                      _: 1
                    }, 8, ["headers", "action", "file-list", "data"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        l(X, {
          modelValue: u(v),
          "onUpdate:modelValue": a[18] || (a[18] = (e) => $(v) ? v.value = e : v = e),
          title: u(T),
          width: "800px",
          draggable: ""
        }, {
          footer: t(() => [
            m("span", ll, [
              l(b, {
                type: "primary",
                onClick: ce
              }, {
                default: t(() => [
                  _("修 改")
                ]),
                _: 1
              }),
              l(b, {
                onClick: a[17] || (a[17] = (e) => {
                  $(v) ? v.value = !1 : v = !1, P();
                })
              }, {
                default: t(() => [
                  _("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            l(Q, null, {
              default: t(() => [
                l(q, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: t(() => [
                    m("div", He, [
                      o.value.type && o.value.type === "img" ? (n(), p(W, {
                        key: 0,
                        style: { width: "100%", "max-height": "100%" },
                        src: o.value.url,
                        "zoom-rate": 1.2,
                        "max-scale": 7,
                        "min-scale": 0.2,
                        "preview-src-list": [o.value.url],
                        "initial-index": 4,
                        fit: "cover"
                      }, null, 8, ["src", "preview-src-list"])) : o.value.type && o.value.type === "video" ? (n(), c("video", Qe, [
                        m("source", {
                          src: o.value.url
                        }, null, 8, We)
                      ])) : o.value.type && o.value.type === "audio" ? (n(), c("audio", Xe, [
                        m("source", {
                          src: o.value.url
                        }, null, 8, Ye)
                      ])) : (n(), c("i", Ze, [
                        _("无法预览，点击 "),
                        l(z, {
                          type: "primary",
                          underline: !1,
                          style: { "font-size": "12px", "vertical-align": "baseline" },
                          target: "_blank",
                          href: "/api/attach/file/" + o.value.configId + "/get/" + o.value.path
                        }, {
                          default: t(() => [
                            _("下载 ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]))
                    ])
                  ]),
                  _: 1
                }),
                l(q, {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 12,
                  xl: 12
                }, {
                  default: t(() => [
                    m("div", el, [
                      l(M, {
                        ref_key: "showFormRef",
                        ref: F,
                        model: o.value,
                        "label-width": "auto",
                        rules: oe,
                        "label-position": "top"
                      }, {
                        default: t(() => [
                          l(s, {
                            label: "附件名称",
                            prop: "name"
                          }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.name,
                                "onUpdate:modelValue": a[10] || (a[10] = (e) => o.value.name = e)
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "附件mineType" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.mineType,
                                "onUpdate:modelValue": a[11] || (a[11] = (e) => o.value.mineType = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "附件类型" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.type,
                                "onUpdate:modelValue": a[12] || (a[12] = (e) => o.value.type = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "分组" }, {
                            default: t(() => [
                              l(G, {
                                modelValue: o.value.attachGroup,
                                "onUpdate:modelValue": a[13] || (a[13] = (e) => o.value.attachGroup = e),
                                placeholder: "请选择分组",
                                filterable: "",
                                style: { width: "100%" },
                                "allow-create": ""
                              }, {
                                default: t(() => [
                                  (n(!0), c(S, null, R(u(E), (e) => (n(), p(y, {
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
                          l(s, { label: "存储路径" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.path,
                                "onUpdate:modelValue": a[14] || (a[14] = (e) => o.value.path = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "访问地址" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.url,
                                "onUpdate:modelValue": a[15] || (a[15] = (e) => o.value.url = e),
                                disabled: ""
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          l(s, { label: "附件描述" }, {
                            default: t(() => [
                              l(k, {
                                modelValue: o.value.remark,
                                "onUpdate:modelValue": a[16] || (a[16] = (e) => o.value.remark = e),
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
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  ul as default
};
