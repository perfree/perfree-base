import { s as Ve, r as ae, p as ue, e as we, d as ge } from "./lib/@element-plus.js";
function ve(u) {
  return axios.post("/api/auth/menu/page", u);
}
function be(u) {
  return axios.get("/api/auth/menu/get?id=" + u);
}
function he(u) {
  return axios.post("/api/auth/menu/add", u);
}
function ye(u) {
  return axios.post("/api/auth/menu/update", u);
}
function ke(u) {
  return axios.delete("/api/auth/menu/del?id=" + u);
}
const xe = window.Pinia.defineStore;
xe({
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
    setMenuInit(u) {
      this.menuInit = u;
    },
    setMenuList(u) {
      this.menuList = u;
    },
    setCachedViews(u) {
      this.cachedViews = u;
    }
  },
  persist: {
    enabled: !1
  }
});
function Ce(u, h, c, v, V) {
  h = h || "id", c = c || "parentId", V = V || Math.min.apply(Math, u.map((d) => d[c])) || 0;
  const b = JSON.parse(JSON.stringify(u)), E = b.filter((d) => {
    let y = b.filter((w) => d[h] === w[c]);
    return y.length > 0 && (d.children = y), d[c] === V;
  });
  return E !== "" ? E : u;
}
const Ne = (u, h) => {
  const c = u.__vccOpts || u;
  for (const [v, V] of h)
    c[v] = V;
  return c;
}, R = window.Vue.resolveComponent, $ = window.Vue.openBlock, I = window.Vue.createBlock, Te = window.Vue.createCommentVNode, B = window.Vue.withCtx, P = window.Vue.createVNode, J = window.Vue.unref, W = window.Vue.renderList, X = window.Vue.Fragment, Y = window.Vue.createElementBlock, Z = window.Vue.normalizeClass, G = window.Vue.createElementVNode, Fe = window.Vue.isRef;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const $e = { class: "el-icon-picker" }, Ee = { class: "icon-panel" }, Ue = { class: "icon-panel" }, Be = { class: "icon-panel" }, ee = window["fontawesome-svg-core"].library, H = window.Vue.ref, qe = {
  __name: "el-icon-picker",
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(u, { emit: h }) {
    let c = H([]);
    Object.keys(ee.definitions.fas).forEach((w) => {
      c.value.push("fa-solid fa-" + w);
    });
    let v = H([]);
    Object.keys(ee.definitions.far).forEach((w) => {
      v.value.push("fa-regular fa-" + w);
    });
    let V = H([]);
    Object.keys(ee.definitions.fab).forEach((w) => {
      V.value.push("fa-brands fa-" + w);
    });
    let b = "fas";
    const E = h, d = H();
    function y(w) {
      E("update:modelValue", w), d.value.hide();
    }
    return (w, t) => {
      const q = R("font-awesome-icon"), k = R("el-input"), S = R("el-tab-pane"), Q = R("el-tabs"), O = R("el-popover");
      return $(), I(O, {
        trigger: "click",
        width: "500",
        placement: "bottom-start",
        ref_key: "iconSelect",
        ref: d
      }, {
        reference: B(() => [
          P(k, {
            modelValue: u.modelValue,
            class: "w-50 m-2",
            placeholder: "请选择图标"
          }, {
            prefix: B(() => [
              u.modelValue ? ($(), I(q, {
                key: 0,
                icon: u.modelValue
              }, null, 8, ["icon"])) : Te("", !0)
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        default: B(() => [
          G("div", $e, [
            P(Q, {
              modelValue: J(b),
              "onUpdate:modelValue": t[0] || (t[0] = (i) => Fe(b) ? b.value = i : b = i)
            }, {
              default: B(() => [
                P(S, {
                  label: "实心图标",
                  name: "fas"
                }, {
                  default: B(() => [
                    G("div", Ee, [
                      ($(!0), Y(X, null, W(J(c), (i) => ($(), I(q, {
                        class: Z([i, "icon", { "icon-active": i === u.modelValue }]),
                        icon: i,
                        key: i,
                        onClick: (z) => y(i)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                }),
                P(S, {
                  label: "常规图标",
                  name: "far"
                }, {
                  default: B(() => [
                    G("div", Ue, [
                      ($(!0), Y(X, null, W(J(v), (i) => ($(), I(q, {
                        class: Z([i, "icon", { "icon-active": i === u.modelValue }]),
                        icon: i,
                        key: i,
                        onClick: (z) => y(i)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                }),
                P(S, {
                  label: "品牌图标",
                  name: "fab"
                }, {
                  default: B(() => [
                    G("div", Be, [
                      ($(!0), Y(X, null, W(J(V), (i) => ($(), I(q, {
                        class: Z([i, "icon", { "icon-active": i === u.modelValue }]),
                        icon: i,
                        key: i,
                        onClick: (z) => y(i)
                      }, null, 8, ["class", "icon", "onClick"]))), 128))
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ])
        ]),
        _: 1
      }, 512);
    };
  }
}, Le = /* @__PURE__ */ Ne(qe, [["__scopeId", "data-v-39069776"]]), f = window.Vue.resolveComponent, l = window.Vue.createVNode, e = window.Vue.withCtx, o = window.Vue.unref, s = window.Vue.createTextVNode, ie = window.Vue.resolveDirective, r = window.Vue.openBlock, m = window.Vue.createBlock, L = window.Vue.withDirectives, K = window.Vue.createElementVNode, N = window.Vue.createCommentVNode, Me = window.Vue.isRef, Se = window.Vue.createElementBlock, De = { class: "page" }, Ae = { class: "search-box" }, Re = { class: "right-tool" }, Ie = { class: "table-box" }, Pe = { class: "dialog-footer" }, M = window.ElementPlus.ElMessage, Oe = window.ElementPlus.ElMessageBox, se = window.Vue.reactive, T = window.Vue.ref, je = {
  __name: "MenuView",
  setup(u) {
    const h = T(), c = T(), v = T({
      name: ""
    });
    let V = T(!1), b = T([]), E = T([]), d = T(!1), y = T("");
    const w = se({
      children: "children",
      label: "name",
      value: "id"
    });
    let t = T({
      seq: 0,
      icon: "",
      pid: "-1",
      name: "",
      url: "",
      componentName: "",
      moduleName: "",
      component: "",
      perms: "",
      target: 0,
      isFrame: 1,
      status: 0,
      menuType: 0
    });
    const q = se({
      name: [{ required: !0, message: "请输入菜单名称", trigger: "blur" }],
      seq: [{ required: !0, message: "请输入排序", trigger: "blur" }],
      menuType: [{ required: !0, message: "请选择菜单分类", trigger: "blur" }],
      status: [{ required: !0, message: "请选择菜单状态", trigger: "blur" }],
      target: [{ required: !0, message: "请选择菜单打开方式", trigger: "blur" }],
      isFrame: [{ required: !0, message: "请选择菜单是否为外链", trigger: "blur" }],
      url: [{ required: !0, message: "请输入菜单地址", trigger: "blur" }]
    });
    function k() {
      V.value = !0, ve(v.value).then((_) => {
        b.value = Ce(_.data, "id", "pid", "children", "-1"), E.value = [{ id: "-1", name: "主类目", children: b.value }], V.value = !1;
      });
    }
    function S() {
      v.value = {
        name: ""
      }, h.value.resetFields(), k();
    }
    function Q(_) {
      Oe.confirm("确定要删除[" + _.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ke(_.id).then((n) => {
          n.code === 200 && n.data ? (M.success("删除成功"), k()) : M.error(n.msg);
        });
      }).catch(() => {
      });
    }
    function O(_) {
      y.value = "添加菜单", D(), d.value = !0, _ && _.id && (t.value.pid = _.id, t.value.type = _.type);
    }
    function i() {
      d.value = !1, D();
    }
    function z(_) {
      D(), be(_.id).then((n) => {
        t.value = n.data, y.value = "修改菜单", d.value = !0;
      });
    }
    function de() {
      c.value.validate((_) => {
        _ && (t.value.pid || (t.value.pid = "-1"), t.value.id ? ye(t.value).then((n) => {
          n.code === 200 ? (M.success("修改成功"), d.value = !1, D(), k()) : M.error(n.msg);
        }) : he(t.value).then((n) => {
          n.code === 200 ? (M.success("添加成功"), d.value = !1, D(), k()) : M.error(n.msg);
        }));
      });
    }
    function D() {
      t.value = {
        seq: 0,
        icon: "",
        pid: "-1",
        name: "",
        url: "",
        componentName: "",
        moduleName: "",
        component: "",
        perms: "",
        target: 0,
        isFrame: 1,
        status: 0,
        menuType: 0
      }, c.value && c.value.resetFields();
    }
    return k(), (_, n) => {
      const U = f("el-input"), p = f("el-form-item"), x = f("el-button"), le = f("el-form"), g = f("el-col"), te = f("el-row"), F = f("el-table-column"), re = f("font-awesome-icon"), oe = f("el-tag"), me = f("el-table"), ce = f("el-tree-select"), C = f("el-radio"), j = f("el-radio-group"), pe = f("el-input-number"), fe = f("el-dialog"), A = ie("hasPermission"), _e = ie("loading");
      return r(), Se("div", De, [
        K("div", Ae, [
          l(le, {
            inline: !0,
            model: v.value,
            ref_key: "searchFormRef",
            ref: h
          }, {
            default: e(() => [
              l(p, { label: "菜单名称" }, {
                default: e(() => [
                  l(U, {
                    modelValue: v.value.name,
                    "onUpdate:modelValue": n[0] || (n[0] = (a) => v.value.name = a),
                    placeholder: "请输入菜单名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(p, null, {
                default: e(() => [
                  L((r(), m(x, {
                    type: "primary",
                    onClick: k,
                    icon: o(Ve)
                  }, {
                    default: e(() => [
                      s("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [A, ["admin:menu:query"]]
                  ]),
                  l(x, {
                    icon: o(ae),
                    onClick: S
                  }, {
                    default: e(() => [
                      s("重置")
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
        l(te, {
          gutter: 10,
          class: "mb8"
        }, {
          default: e(() => [
            l(g, { span: 1.5 }, {
              default: e(() => [
                L((r(), m(x, {
                  icon: o(ue),
                  type: "primary",
                  plain: "",
                  onClick: O
                }, {
                  default: e(() => [
                    s("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [A, ["admin:menu:create"]]
                ])
              ]),
              _: 1
            }),
            K("div", Re, [
              l(x, {
                icon: o(ae),
                circle: "",
                onClick: k
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        K("div", Ie, [
          L((r(), m(me, {
            data: o(b),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: e(() => [
              l(F, {
                prop: "name",
                label: "菜单名称",
                width: "240"
              }),
              l(F, {
                prop: "icon",
                label: "图标",
                width: "100"
              }, {
                default: e((a) => [
                  a.row.icon ? (r(), m(re, {
                    key: 0,
                    icon: a.row.icon
                  }, null, 8, ["icon"])) : N("", !0)
                ]),
                _: 1
              }),
              l(F, {
                prop: "seq",
                label: "排序",
                width: "80"
              }),
              l(F, {
                prop: "url",
                label: "菜单地址",
                "min-width": "150"
              }),
              l(F, {
                prop: "component",
                label: "组件路径",
                "min-width": "150"
              }),
              l(F, {
                prop: "perms",
                label: "权限标识",
                "min-width": "150"
              }),
              l(F, {
                prop: "status",
                label: "状态",
                width: "80"
              }, {
                default: e((a) => [
                  a.row.status === 0 ? (r(), m(oe, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: e(() => [
                      s("开启")
                    ]),
                    _: 1
                  })) : (r(), m(oe, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: e(() => [
                      s("关闭")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              l(F, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: e((a) => [
                  L((r(), m(x, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(we),
                    onClick: (ne) => z(a.row)
                  }, {
                    default: e(() => [
                      s("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [A, ["admin:menu:update"]]
                  ]),
                  L((r(), m(x, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(ue),
                    onClick: (ne) => O(a.row)
                  }, {
                    default: e(() => [
                      s("新增")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [A, ["admin:menu:create"]]
                  ]),
                  L((r(), m(x, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: o(ge),
                    onClick: (ne) => Q(a.row)
                  }, {
                    default: e(() => [
                      s("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [A, ["admin:menu:del"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [_e, o(V)]
          ])
        ]),
        l(fe, {
          modelValue: o(d),
          "onUpdate:modelValue": n[14] || (n[14] = (a) => Me(d) ? d.value = a : d = a),
          title: o(y),
          width: "800px",
          draggable: ""
        }, {
          footer: e(() => [
            K("span", Pe, [
              l(x, {
                type: "primary",
                onClick: de
              }, {
                default: e(() => [
                  s("确 定")
                ]),
                _: 1
              }),
              l(x, { onClick: i }, {
                default: e(() => [
                  s("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: e(() => [
            l(le, {
              ref_key: "ruleFormRef",
              ref: c,
              model: o(t),
              rules: q,
              "label-width": "100px",
              class: "demo-ruleForm",
              "status-icon": ""
            }, {
              default: e(() => [
                l(p, {
                  label: "父级菜单",
                  prop: "pid"
                }, {
                  default: e(() => [
                    l(ce, {
                      modelValue: o(t).pid,
                      "onUpdate:modelValue": n[1] || (n[1] = (a) => o(t).pid = a),
                      data: o(E),
                      props: w,
                      "check-strictly": "",
                      "render-after-expand": !1,
                      style: { width: "100%" },
                      clearable: ""
                    }, null, 8, ["modelValue", "data", "props"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "菜单类型",
                  prop: "menuType"
                }, {
                  default: e(() => [
                    l(j, {
                      modelValue: o(t).menuType,
                      "onUpdate:modelValue": n[2] || (n[2] = (a) => o(t).menuType = a)
                    }, {
                      default: e(() => [
                        l(C, {
                          label: 0,
                          value: 0
                        }, {
                          default: e(() => [
                            s("目录")
                          ]),
                          _: 1
                        }),
                        l(C, {
                          label: 1,
                          value: 1
                        }, {
                          default: e(() => [
                            s("菜单")
                          ]),
                          _: 1
                        }),
                        l(C, {
                          label: 2,
                          value: 2
                        }, {
                          default: e(() => [
                            s("按钮")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(te, null, {
                  default: e(() => [
                    l(g, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "菜单名称",
                          prop: "name"
                        }, {
                          default: e(() => [
                            l(U, {
                              modelValue: o(t).name,
                              "onUpdate:modelValue": n[3] || (n[3] = (a) => o(t).name = a),
                              placeholder: "请输入菜单名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    o(t).menuType === 0 || o(t).menuType === 1 ? (r(), m(g, {
                      key: 0,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "菜单图标",
                          prop: "icon"
                        }, {
                          default: e(() => [
                            l(Le, {
                              modelValue: o(t).icon,
                              "onUpdate:modelValue": n[4] || (n[4] = (a) => o(t).icon = a)
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    l(g, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "菜单排序",
                          prop: "seq"
                        }, {
                          default: e(() => [
                            l(pe, {
                              modelValue: o(t).seq,
                              "onUpdate:modelValue": n[5] || (n[5] = (a) => o(t).seq = a),
                              min: 0,
                              max: 9999,
                              "controls-position": "right",
                              placeholder: "菜单排序"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    o(t).menuType === 1 ? (r(), m(g, {
                      key: 1,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "菜单地址",
                          prop: "url"
                        }, {
                          default: e(() => [
                            l(U, {
                              modelValue: o(t).url,
                              "onUpdate:modelValue": n[6] || (n[6] = (a) => o(t).url = a),
                              placeholder: "请输入菜单地址"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 ? (r(), m(g, {
                      key: 2,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "组件名称",
                          prop: "componentName"
                        }, {
                          default: e(() => [
                            l(U, {
                              modelValue: o(t).componentName,
                              "onUpdate:modelValue": n[7] || (n[7] = (a) => o(t).componentName = a),
                              placeholder: "请输入组件名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 ? (r(), m(g, {
                      key: 3,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "模块名称",
                          prop: "moduleName"
                        }, {
                          default: e(() => [
                            l(U, {
                              modelValue: o(t).moduleName,
                              "onUpdate:modelValue": n[8] || (n[8] = (a) => o(t).moduleName = a),
                              placeholder: "请输入模块名称"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 ? (r(), m(g, {
                      key: 4,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "组件路径",
                          prop: "component"
                        }, {
                          default: e(() => [
                            l(U, {
                              modelValue: o(t).component,
                              "onUpdate:modelValue": n[9] || (n[9] = (a) => o(t).component = a),
                              placeholder: "请输入组件路径"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 2 ? (r(), m(g, {
                      key: 5,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "权限标识",
                          prop: "perms"
                        }, {
                          default: e(() => [
                            l(U, {
                              modelValue: o(t).perms,
                              "onUpdate:modelValue": n[10] || (n[10] = (a) => o(t).perms = a),
                              placeholder: "请输入权限标识"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 ? (r(), m(g, {
                      key: 6,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "打开方式",
                          prop: "target"
                        }, {
                          default: e(() => [
                            l(j, {
                              modelValue: o(t).target,
                              "onUpdate:modelValue": n[11] || (n[11] = (a) => o(t).target = a)
                            }, {
                              default: e(() => [
                                l(C, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: e(() => [
                                    s("本页")
                                  ]),
                                  _: 1
                                }),
                                l(C, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: e(() => [
                                    s("新窗口")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    o(t).menuType === 1 ? (r(), m(g, {
                      key: 7,
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "是否外链",
                          prop: "isFrame"
                        }, {
                          default: e(() => [
                            l(j, {
                              modelValue: o(t).isFrame,
                              "onUpdate:modelValue": n[12] || (n[12] = (a) => o(t).isFrame = a)
                            }, {
                              default: e(() => [
                                l(C, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: e(() => [
                                    s("是")
                                  ]),
                                  _: 1
                                }),
                                l(C, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: e(() => [
                                    s("否")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : N("", !0),
                    l(g, {
                      xs: 24,
                      sm: 24,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }, {
                      default: e(() => [
                        l(p, {
                          label: "菜单状态",
                          prop: "status"
                        }, {
                          default: e(() => [
                            l(j, {
                              modelValue: o(t).status,
                              "onUpdate:modelValue": n[13] || (n[13] = (a) => o(t).status = a)
                            }, {
                              default: e(() => [
                                l(C, {
                                  label: 0,
                                  value: 0
                                }, {
                                  default: e(() => [
                                    s("开启")
                                  ]),
                                  _: 1
                                }),
                                l(C, {
                                  label: 1,
                                  value: 1
                                }, {
                                  default: e(() => [
                                    s("关闭")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
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
  je as default
};
