import { s as O, r as S, p as Y, e as J, d as Q } from "./lib/@element-plus.js";
const W = window.Pinia.defineStore;
W({
  id: "common",
  state: () => ({
    menuInit: !1,
    menuList: [],
    cachedViews: []
  }),
  getters: {
    getMenuInit() {
      return this.menuInit;
    },
    getMenuList() {
      return this.menuList;
    },
    getCachedViews() {
      return this.cachedViews;
    }
  },
  actions: {
    setMenuInit(e) {
      this.menuInit = e;
    },
    setMenuList(e) {
      this.menuList = e;
    },
    setCachedViews(e) {
      this.cachedViews = e;
    }
  },
  persist: {
    enabled: !1
  }
});
function X(e, i) {
  if (arguments.length === 0 || !e)
    return null;
  const n = i || "{y}-{m}-{d} {h}:{i}:{s}";
  let s;
  typeof e == "object" ? s = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), s = new Date(e));
  const z = {
    y: s.getFullYear(),
    m: s.getMonth() + 1,
    d: s.getDate(),
    h: s.getHours(),
    i: s.getMinutes(),
    s: s.getSeconds(),
    a: s.getDay()
  };
  return n.replace(/{([ymdhisa])+}/g, (r, x) => {
    let p = z[x];
    return x === "a" ? ["日", "一", "二", "三", "四", "五", "六"][p] : (r.length > 0 && p < 10 && (p = "0" + p), p || 0);
  });
}
function Z(e) {
  return axios.post("/api/auth/extra/page", e);
}
function ee(e) {
  return axios.get("/api/auth/extra/get?id=" + e);
}
function te(e) {
  return axios.post("/api/auth/extra/add", e);
}
function ae(e) {
  return axios.post("/api/auth/extra/update", e);
}
function le(e) {
  return axios.delete("/api/auth/extra/del?id=" + e);
}
const c = window.Vue.resolveComponent, a = window.Vue.createVNode, o = window.Vue.withCtx, u = window.Vue.unref, _ = window.Vue.createTextVNode, B = window.Vue.resolveDirective, v = window.Vue.openBlock, D = window.Vue.createBlock, N = window.Vue.withDirectives, C = window.Vue.createElementVNode, oe = window.Vue.toDisplayString, M = window.Vue.isRef, ne = window.Vue.createElementBlock, ie = { class: "page" }, re = { class: "search-box" }, se = { class: "right-tool" }, ue = { class: "table-box" }, de = { class: "dialog-footer" }, h = window.ElementPlus.ElMessage, ce = window.ElementPlus.ElMessageBox, pe = window.Vue.reactive, g = window.Vue.ref, fe = {
  __name: "ExtraView",
  setup(e) {
    const i = g({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      extraName: ""
    }), n = g({
      id: "",
      extraName: "",
      extraDescription: "",
      extraKey: "",
      extraData: ""
    }), s = pe({
      extraName: [{ required: !0, message: "请输入名称", trigger: "blur" }],
      extraKey: [{ required: !0, message: "请输入key", trigger: "blur" }],
      extraData: [{ required: !0, message: "请输入附加数据值", trigger: "blur" }]
    }), z = g(), V = g();
    let r = g(!1), x = g(""), p = g([]), R = g(!1);
    function U() {
      V.value.validate((d) => {
        d && (n.value.id ? ae(n.value).then((t) => {
          t.code === 200 ? (h.success("操作成功"), r.value = !1, y(), m()) : h.error(t.msg);
        }) : te(n.value).then((t) => {
          t.code === 200 ? (h.success("操作成功"), r.value = !1, y(), m()) : h.error(t.msg);
        }));
      });
    }
    function A() {
      y(), x.value = "添加附加数据", r.value = !0;
    }
    function T(d) {
      y(), x.value = "修改附加数据", r.value = !0, ee(d.id).then((t) => {
        n.value = t.data;
      });
    }
    function K(d) {
      ce.confirm("确定要删除[" + d.extraName + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        le(d.id).then((t) => {
          t.code === 200 && t.data ? (h.success("删除成功"), m()) : h.error(t.msg);
        });
      }).catch(() => {
      });
    }
    function m() {
      R.value = !0, Z(i.value).then((d) => {
        p.value = d.data.list, i.value.total = d.data.total, R.value = !1;
      });
    }
    function P() {
      i.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        extraName: ""
      }, z.value.resetFields(), m();
    }
    function y() {
      n.value = {
        id: "",
        extraName: "",
        extraDescription: "",
        extraKey: "",
        extraData: ""
      }, V.value && V.value.resetFields();
    }
    return m(), (d, t) => {
      const b = c("el-input"), w = c("el-form-item"), f = c("el-button"), F = c("el-form"), I = c("el-col"), L = c("el-row"), k = c("el-table-column"), q = c("el-table"), j = c("el-pagination"), $ = c("el-dialog"), E = B("hasPermission"), G = B("loading");
      return v(), ne("div", ie, [
        C("div", re, [
          a(F, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: z
          }, {
            default: o(() => [
              a(w, { label: "附加数据名称" }, {
                default: o(() => [
                  a(b, {
                    modelValue: i.value.extraName,
                    "onUpdate:modelValue": t[0] || (t[0] = (l) => i.value.extraName = l),
                    placeholder: "请输入附加数据名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              a(w, null, {
                default: o(() => [
                  N((v(), D(f, {
                    type: "primary",
                    onClick: m,
                    icon: u(O)
                  }, {
                    default: o(() => [
                      _("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [E, ["admin:extra:query"]]
                  ]),
                  a(f, {
                    icon: u(S),
                    onClick: P
                  }, {
                    default: o(() => [
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
        a(L, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            a(I, { span: 1.5 }, {
              default: o(() => [
                N((v(), D(f, {
                  icon: u(Y),
                  type: "primary",
                  plain: "",
                  onClick: A
                }, {
                  default: o(() => [
                    _("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [E, ["admin:extra:create"]]
                ])
              ]),
              _: 1
            }),
            C("div", se, [
              a(f, {
                icon: u(S),
                circle: "",
                onClick: m
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        C("div", ue, [
          N((v(), D(q, {
            data: u(p),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              a(k, {
                prop: "extraName",
                label: "名称",
                "min-width": "150"
              }),
              a(k, {
                prop: "extraKey",
                label: "key",
                "min-width": "150"
              }),
              a(k, {
                prop: "extraDescription",
                label: "描述",
                "min-width": "240"
              }),
              a(k, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: o((l) => [
                  C("span", null, oe(u(X)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              a(k, {
                label: "操作",
                width: "160",
                fixed: "right"
              }, {
                default: o((l) => [
                  N((v(), D(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(J),
                    onClick: (H) => T(l.row)
                  }, {
                    default: o(() => [
                      _("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [E, ["admin:extra:update"]]
                  ]),
                  N((v(), D(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(Q),
                    onClick: (H) => K(l.row)
                  }, {
                    default: o(() => [
                      _("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [E, ["admin:extra:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [G, u(R)]
          ]),
          a(j, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": t[1] || (t[1] = (l) => i.value.pageNo = l),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": t[2] || (t[2] = (l) => i.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: m,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        a($, {
          modelValue: u(r),
          "onUpdate:modelValue": t[8] || (t[8] = (l) => M(r) ? r.value = l : r = l),
          title: u(x),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            C("span", de, [
              a(f, {
                type: "primary",
                onClick: U
              }, {
                default: o(() => [
                  _("确 定")
                ]),
                _: 1
              }),
              a(f, {
                onClick: t[7] || (t[7] = (l) => {
                  M(r) ? r.value = !1 : r = !1, y();
                })
              }, {
                default: o(() => [
                  _("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            a(F, {
              ref_key: "addFormRef",
              ref: V,
              model: n.value,
              "label-width": "80px",
              "status-icon": "",
              rules: s
            }, {
              default: o(() => [
                a(w, {
                  label: "名称",
                  prop: "extraName"
                }, {
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraName,
                      "onUpdate:modelValue": t[3] || (t[3] = (l) => n.value.extraName = l),
                      placeholder: "请输入名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(w, {
                  label: "key",
                  prop: "extraKey"
                }, {
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraKey,
                      "onUpdate:modelValue": t[4] || (t[4] = (l) => n.value.extraKey = l),
                      placeholder: "请输入key"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(w, {
                  label: "描述",
                  prop: "extraDescription"
                }, {
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraDescription,
                      "onUpdate:modelValue": t[5] || (t[5] = (l) => n.value.extraDescription = l),
                      placeholder: "请输入描述",
                      autosize: { minRows: 3, maxRows: 6 },
                      type: "textarea"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                a(w, {
                  label: "附加值",
                  prop: "extraData"
                }, {
                  default: o(() => [
                    a(b, {
                      modelValue: n.value.extraData,
                      "onUpdate:modelValue": t[6] || (t[6] = (l) => n.value.extraData = l),
                      placeholder: "请输入附加数据值",
                      autosize: { minRows: 5, maxRows: 10 },
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
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  fe as default
};
