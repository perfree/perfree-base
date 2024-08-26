import { s as ue, r as q, p as de, e as ce, f as pe, d as me } from "./lib/@element-plus.js";
function fe(e) {
  return axios.get("/api/auth/role/getRoleMenus?id=" + e);
}
function he(e) {
  return axios.post("/api/auth/role/assignRoleMenu", e);
}
function ge(e) {
  return axios.post("/api/auth/menu/list", e);
}
const ve = window.Pinia.defineStore;
ve({
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
function _e(e, y) {
  if (arguments.length === 0 || !e)
    return null;
  const w = y || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof e == "object" ? i = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), i = new Date(e));
  const r = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return w.replace(/{([ymdhisa])+}/g, (A, s) => {
    let g = r[s];
    return s === "a" ? ["日", "一", "二", "三", "四", "五", "六"][g] : (A.length > 0 && g < 10 && (g = "0" + g), g || 0);
  });
}
function we(e, y, w, i, r) {
  y = y || "id", w = w || "parentId", r = r || Math.min.apply(Math, e.map((s) => s[w])) || 0;
  const u = JSON.parse(JSON.stringify(e)), A = u.filter((s) => {
    let g = u.filter((M) => s[y] === M[w]);
    return g.length > 0 && (s.children = g), s[w] === r;
  });
  return A !== "" ? A : e;
}
function be(e) {
  return axios.post("/api/auth/role/page", e);
}
function Ve(e) {
  return axios.get("/api/auth/role/get?id=" + e);
}
function ye(e) {
  return axios.post("/api/auth/role/add", e);
}
function ke(e) {
  return axios.post("/api/auth/role/update", e);
}
function xe(e) {
  return axios.delete("/api/auth/role/del?id=" + e);
}
const Ce = window.Pinia.defineStore;
Ce({
  id: "app",
  state: () => ({
    activeTab: null,
    // 主题
    theme: null,
    // 主题色
    primaryColor: null,
    // 顶栏通色
    headerUnified: null,
    // 是否开启tab栏
    tabOpen: null,
    // 刷新路由标识
    refreshRouteflag: !1,
    // 路由动画
    routeAnimation: null
  }),
  getters: {
    getActiveTab() {
      return this.activeTab;
    },
    getTheme() {
      return this.theme;
    },
    getPrimaryColor() {
      return this.primaryColor;
    },
    getHeaderUnified() {
      return this.headerUnified;
    },
    getTabOpen() {
      return this.tabOpen;
    },
    getRefreshRouteflag() {
      return this.refreshRouteflag;
    },
    getRouteAnimation() {
      return this.routeAnimation;
    }
  },
  actions: {
    setActiveTab(e) {
      this.activeTab = e;
    },
    setTheme(e) {
      this.theme = e;
    },
    setPrimaryColor(e) {
      this.primaryColor = e;
    },
    setHeaderUnified(e) {
      this.headerUnified = e;
    },
    setTabOpen(e) {
      this.tabOpen = e;
    },
    setRefreshRouteflag(e) {
      this.refreshRouteflag = e;
    },
    setRouteAnimation(e) {
      this.routeAnimation = e;
    }
  },
  persist: {
    enabled: !0
    //开启本地存储
  }
});
const h = window.Vue.resolveComponent, t = window.Vue.createVNode, o = window.Vue.withCtx, d = window.Vue.unref, _ = window.Vue.createTextVNode, J = window.Vue.resolveDirective, x = window.Vue.openBlock, T = window.Vue.createBlock, C = window.Vue.withDirectives, R = window.Vue.createElementVNode, Re = window.Vue.toDisplayString, D = window.Vue.isRef, Ae = window.Vue.createElementBlock, Me = { class: "page" }, Te = { class: "search-box" }, Fe = { class: "right-tool" }, Ue = { class: "table-box" }, Ee = { style: { width: "100%", border: "1px solid rgb(228 231 237)", padding: "5px" } }, Se = { class: "dialog-footer" }, De = { class: "dialog-footer" }, V = window.ElementPlus.ElMessage, ze = window.ElementPlus.ElMessageBox, Oe = window.Vue.reactive, p = window.Vue.ref, Pe = {
  __name: "RoleView",
  setup(e) {
    let y = p([]);
    const w = {
      children: "children",
      label: "name"
    }, i = p({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    }), r = p({
      id: "",
      name: "",
      code: "",
      expand: !1,
      selectAll: !1
    }), u = p({
      id: "",
      name: "",
      code: "",
      description: ""
    }), A = Oe({
      name: [{ required: !0, message: "请输入角色名称", trigger: "blur" }],
      code: [{ required: !0, message: "请输入角色编码", trigger: "blur" }]
    }), s = p(), g = p(), M = p(), z = p();
    let b = p(!1), v = p(!1), F = p(""), j = p([]), O = p(!1), N = p(!1);
    function G(a, l) {
      let c = l.checkedKeys.findIndex((m) => m === a.id), f = !1;
      c >= 0 && (f = !0), s.value.setChecked(a.id, f, !1), f ? P(a, !0) : P(a, !1);
    }
    function P(a, l) {
      a.children && a.children.length > 0 && a.children.forEach((c) => {
        s.value.setChecked(c.id, l, !1), c.children && c.children.length > 0 && P(c, l);
      });
    }
    function Y() {
      M.value.validate((a) => {
        a && (u.value.id ? ke(u.value).then((l) => {
          l.code === 200 ? (V.success("操作成功"), v.value = !1, U(), k()) : V.error(l.msg);
        }) : ye(u.value).then((l) => {
          l.code === 200 ? (V.success("操作成功"), v.value = !1, U(), k()) : V.error(l.msg);
        }));
      });
    }
    function Q() {
      U(), F.value = "添加角色", v.value = !0;
    }
    function W(a) {
      U(), F.value = "修改角色", v.value = !0, Ve(a.id).then((l) => {
        u.value = l.data;
      });
    }
    function X(a) {
      ze.confirm("确定要删除[" + a.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        xe(a.id).then((l) => {
          l.code === 200 && l.data ? (V.success("删除成功"), k()) : V.error(l.msg);
        });
      }).catch(() => {
      });
    }
    function k() {
      O.value = !0, be(i.value).then((a) => {
        j.value = a.data.list, i.value.total = a.data.total, O.value = !1;
      });
    }
    function Z() {
      i.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, g.value.resetFields(), k();
    }
    function U() {
      u.value = {
        id: "",
        name: "",
        code: "",
        description: ""
      }, M.value && M.value.resetFields();
    }
    function B() {
      r.value = {
        id: "",
        name: "",
        code: "",
        expand: !1,
        selectAll: !1
      }, z.value && z.value.resetFields();
    }
    function ee(a) {
      if (a.code === "admin") {
        V.warning("admin角色默认拥有所有权限,不可修改");
        return;
      }
      B(), b.value = !0, r.value.name = a.name, r.value.code = a.code, r.value.id = a.id, F.value = "菜单权限", N.value = !0, ge({}).then((l) => {
        y.value = we(l.data, "id", "pid", "children", "-1"), fe(a.id).then((c) => {
          s.value.setCheckedKeys(c.data), N.value = !1;
        });
      });
    }
    function le() {
      r.value.expand ? Object.values(s.value.store.nodesMap).forEach((a) => a.expand()) : Object.values(s.value.store.nodesMap).forEach((a) => a.collapse());
    }
    function te() {
      r.value.selectAll ? Object.values(s.value.store.nodesMap).forEach((a) => {
        a.checked = !0;
      }) : Object.values(s.value.store.nodesMap).forEach((a) => {
        a.checked = !1;
      });
    }
    function ae() {
      let a = {
        menuIds: [...s.value.getCheckedKeys(), ...s.value.getHalfCheckedKeys()],
        roleId: r.value.id
      };
      he(a).then((l) => {
        l.code === 200 && l.data ? (V.success("操作成功"), b.value = !1, B()) : V.error(l.msg);
      });
    }
    return k(), (a, l) => {
      const c = h("el-input"), f = h("el-form-item"), m = h("el-button"), L = h("el-form"), ne = h("el-col"), oe = h("el-row"), E = h("el-table-column"), ie = h("el-table"), re = h("el-pagination"), $ = h("el-checkbox"), se = h("el-tree"), H = h("el-dialog"), S = J("hasPermission"), I = J("loading");
      return x(), Ae("div", Me, [
        R("div", Te, [
          t(L, {
            inline: !0,
            model: i.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: g
          }, {
            default: o(() => [
              t(f, { label: "角色名称" }, {
                default: o(() => [
                  t(c, {
                    modelValue: i.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (n) => i.value.name = n),
                    placeholder: "请输入角色名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(f, null, {
                default: o(() => [
                  C((x(), T(m, {
                    type: "primary",
                    onClick: k,
                    icon: d(ue)
                  }, {
                    default: o(() => [
                      _("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [S, ["admin:role:query"]]
                  ]),
                  t(m, {
                    icon: d(q),
                    onClick: Z
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
        t(oe, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            t(ne, { span: 1.5 }, {
              default: o(() => [
                C((x(), T(m, {
                  icon: d(de),
                  type: "primary",
                  plain: "",
                  onClick: Q
                }, {
                  default: o(() => [
                    _("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [S, ["admin:role:create"]]
                ])
              ]),
              _: 1
            }),
            R("div", Fe, [
              t(m, {
                icon: d(q),
                circle: "",
                onClick: k
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        R("div", Ue, [
          C((x(), T(ie, {
            data: d(j),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              t(E, {
                prop: "name",
                label: "角色名称",
                "min-width": "150"
              }),
              t(E, {
                prop: "code",
                label: "角色编码",
                "min-width": "150"
              }),
              t(E, {
                prop: "description",
                label: "描述",
                "min-width": "240"
              }),
              t(E, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: o((n) => [
                  R("span", null, Re(d(_e)(n.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(E, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: o((n) => [
                  C((x(), T(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(ce),
                    onClick: (K) => W(n.row)
                  }, {
                    default: o(() => [
                      _("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [S, ["admin:role:update"]]
                  ]),
                  C((x(), T(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(pe),
                    onClick: (K) => ee(n.row)
                  }, {
                    default: o(() => [
                      _("菜单权限 ")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [S, ["admin:role:permission"]]
                  ]),
                  C((x(), T(m, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(me),
                    onClick: (K) => X(n.row)
                  }, {
                    default: o(() => [
                      _("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [S, ["admin:role:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [I, d(O)]
          ]),
          t(re, {
            "current-page": i.value.pageNo,
            "onUpdate:currentPage": l[1] || (l[1] = (n) => i.value.pageNo = n),
            "page-size": i.value.pageSize,
            "onUpdate:pageSize": l[2] || (l[2] = (n) => i.value.pageSize = n),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: k,
            total: i.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(H, {
          modelValue: d(b),
          "onUpdate:modelValue": l[8] || (l[8] = (n) => D(b) ? b.value = n : b = n),
          title: d(F),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            R("span", Se, [
              t(m, {
                type: "primary",
                onClick: ae
              }, {
                default: o(() => [
                  _("确 定")
                ]),
                _: 1
              }),
              t(m, {
                onClick: l[7] || (l[7] = (n) => {
                  D(b) ? b.value = !1 : b = !1, B();
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
            t(L, {
              ref_key: "menuFormRef",
              ref: z,
              model: r.value,
              "label-width": "80px",
              class: "demo-ruleForm",
              "status-icon": ""
            }, {
              default: o(() => [
                t(f, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: r.value.name,
                      "onUpdate:modelValue": l[3] || (l[3] = (n) => r.value.name = n),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(f, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: r.value.code,
                      "onUpdate:modelValue": l[4] || (l[4] = (n) => r.value.code = n),
                      disabled: ""
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(f, {
                  label: "菜单权限",
                  prop: "code"
                }, {
                  default: o(() => [
                    t($, {
                      modelValue: r.value.expand,
                      "onUpdate:modelValue": l[5] || (l[5] = (n) => r.value.expand = n),
                      label: "展开/折叠",
                      onChange: le
                    }, null, 8, ["modelValue"]),
                    t($, {
                      modelValue: r.value.selectAll,
                      "onUpdate:modelValue": l[6] || (l[6] = (n) => r.value.selectAll = n),
                      label: "全选/全不选",
                      onChange: te
                    }, null, 8, ["modelValue"]),
                    R("div", Ee, [
                      C(t(se, {
                        props: w,
                        data: d(y),
                        "node-key": "id",
                        "show-checkbox": "",
                        ref_key: "menuTree",
                        ref: s,
                        "check-strictly": !0,
                        onCheck: G
                      }, null, 8, ["data"]), [
                        [I, d(N)]
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        t(H, {
          modelValue: d(v),
          "onUpdate:modelValue": l[13] || (l[13] = (n) => D(v) ? v.value = n : v = n),
          title: d(F),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            R("span", De, [
              t(m, {
                type: "primary",
                onClick: Y
              }, {
                default: o(() => [
                  _("确 定")
                ]),
                _: 1
              }),
              t(m, {
                onClick: l[12] || (l[12] = (n) => {
                  D(v) ? v.value = !1 : v = !1, U();
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
            t(L, {
              ref_key: "addFormRef",
              ref: M,
              model: u.value,
              "label-width": "80px",
              "status-icon": "",
              rules: A
            }, {
              default: o(() => [
                t(f, {
                  label: "角色名称",
                  prop: "name"
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: u.value.name,
                      "onUpdate:modelValue": l[9] || (l[9] = (n) => u.value.name = n),
                      placeholder: "请输入角色名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(f, {
                  label: "角色编码",
                  prop: "code"
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: u.value.code,
                      "onUpdate:modelValue": l[10] || (l[10] = (n) => u.value.code = n),
                      placeholder: "请输入角色编码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                t(f, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: o(() => [
                    t(c, {
                      modelValue: u.value.description,
                      "onUpdate:modelValue": l[11] || (l[11] = (n) => u.value.description = n),
                      placeholder: "请输入角色描述",
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
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  Pe as default
};
