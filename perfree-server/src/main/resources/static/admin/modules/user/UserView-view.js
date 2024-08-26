import { s as we, r as Y, d as ve, p as _e, e as he, f as Ve, a as be, b as xe } from "./lib/@element-plus.js";
function ye(a) {
  return axios.post("/api/auth/user/page", a);
}
function ke(a) {
  return axios.get("/api/auth/user/get?id=" + a);
}
function Ne(a) {
  return axios.post("/api/auth/user/add", a);
}
function Ue(a) {
  return axios.post("/api/auth/user/update", a);
}
function Ce(a) {
  return axios.delete("/api/auth/user/del?id=" + a);
}
function Re(a) {
  return axios.post("/api/auth/user/updateUserRole", a);
}
function Le(a) {
  return axios.get("/api/auth/user/getUserRole?id=" + a);
}
function Se(a) {
  return axios.post("/api/auth/user/resetPassword", a);
}
function Ee(a) {
  return axios.post("/api/auth/user/export", a, { responseType: "blob" });
}
function Fe(a) {
  return axios.post("/api/auth/user/updateStatus", a);
}
function Ae() {
  return axios.get("/api/auth/role/listAll");
}
const De = window.Pinia.defineStore;
De({
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
    setMenuInit(a) {
      this.menuInit = a;
    },
    setMenuList(a) {
      this.menuList = a;
    },
    setCachedViews(a) {
      this.cachedViews = a;
    }
  },
  persist: {
    enabled: !1
  }
});
function Z(a, s) {
  if (arguments.length === 0 || !a)
    return null;
  const u = s || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof a == "object" ? i = a : (typeof a == "string" && /^[0-9]+$/.test(a) ? a = parseInt(a) : typeof a == "string" && (a = a.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof a == "number" && a.toString().length === 10 && (a = a * 1e3), i = new Date(a));
  const R = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return u.replace(/{([ymdhisa])+}/g, (L, N) => {
    let c = R[N];
    return N === "a" ? ["日", "一", "二", "三", "四", "五", "六"][c] : (L.length > 0 && c < 10 && (c = "0" + c), c || 0);
  });
}
const H = {
  SEX: "SEX"
};
function Te(a, s) {
  if (s === "" || s === null || s === void 0)
    return null;
  if (s = s.toString(), !window.pinia || !window.pinia.state._value.dictList)
    return console.error("pinia or pinia dictList not found"), null;
  let i = window.pinia.state._value.dictList.dictList.filter((R) => R.parentDictType === a && R.dictValue === s);
  return i.length > 0 ? i[0] : (console.error("未查询到数据字典", a, s), null);
}
function Be(a) {
  return !window.pinia || !window.pinia.state._value.dictList ? (console.error("pinia or pinia dictList not found"), null) : window.pinia.state._value.dictList.dictList.filter((u) => u.parentDictType === a);
}
const g = window.Vue.resolveComponent, l = window.Vue.createVNode, o = window.Vue.withCtx, r = window.Vue.unref, w = window.Vue.createTextVNode, G = window.Vue.resolveDirective, m = window.Vue.openBlock, h = window.Vue.createBlock, k = window.Vue.withDirectives, C = window.Vue.createElementVNode, P = window.Vue.toDisplayString, ze = window.Vue.withModifiers, J = window.Vue.renderList, K = window.Vue.Fragment, M = window.Vue.createElementBlock, A = window.Vue.isRef, Pe = window.Vue.createCommentVNode, Me = { class: "page" }, $e = { class: "search-box" }, Ie = { class: "right-tool" }, qe = { class: "table-box" }, Xe = { class: "dialog-footer" }, je = { class: "dialog-footer" }, v = window.ElementPlus.ElMessage, $ = window.ElementPlus.ElMessageBox, Q = window.Vue.h, Oe = window.Vue.reactive, _ = window.Vue.ref, Ze = {
  __name: "UserView",
  setup(a) {
    const s = _({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      userName: "",
      account: ""
    }), u = _({
      id: "",
      userName: "",
      account: "",
      password: "",
      email: "",
      website: "",
      sex: void 0,
      remark: "",
      mobile: ""
    }), i = _({
      id: "",
      userName: "",
      account: "",
      roles: ""
    }), R = Oe({
      userName: [
        { required: !0, message: "请输入昵称", trigger: "blur" },
        { min: 2, max: 20, message: "昵称必须在2-20字之间", trigger: "blur" }
      ],
      account: [
        { required: !0, message: "请输入账户", trigger: "blur" },
        { min: 5, max: 16, message: "账户必须在5-16字之间", trigger: "blur" }
      ],
      password: [
        { required: !0, message: "请输入密码", trigger: "blur" },
        { min: 5, max: 16, message: "密码必须在5-16字之间", trigger: "blur" }
      ],
      email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
      mobile: [{ pattern: /^1[3|456789][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
      website: [{
        pattern: /^(https?:\/\/)?((?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?$/,
        message: "请输入正确的网址",
        trigger: "blur"
      }]
    }), D = _(), L = _(), N = _();
    let c = _(!1), x = _(!1), E = _(""), I = _([]), S = _(!1), T = _(!1), q = _([]);
    function W(n) {
      let t = n.status === 0 ? "启用" : "禁用";
      $({
        title: "提示",
        message: Q("p", null, [
          `确定要修改[${n.userName}]为`,
          Q("font", { style: "color: var(--el-color-warning)" }, t),
          "吗?"
        ]),
        showCancelButton: !0,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let d = {
          id: n.id,
          status: n.status
        };
        Fe(d).then((p) => {
          p.code === 200 ? (V(), v.success("修改成功")) : (n.status = n.status === 0 ? 1 : 0, v.error("修改失败"));
        }).catch(() => {
          n.status = n.status === 0 ? 1 : 0;
        });
      }).catch(() => {
        n.status = n.status === 0 ? 1 : 0;
      });
    }
    function ee(n) {
      $.prompt("请输入[" + n.userName + "]的新密码", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputValidator: te,
        inputPlaceholder: "请输入新密码",
        inputErrorMessage: "密码必须在5-16字之间"
      }).then(({ value: t }) => {
        Se({ id: n.id, password: t }).then((d) => {
          d.code === 200 ? v.success("重置成功") : v.error(d.msg);
        });
      }).catch(() => {
      });
    }
    function te(n) {
      return !n || n.length < 4 ? !1 : n.length <= 16;
    }
    function le() {
      N.value.validate((n) => {
        n && Re(i.value).then((t) => {
          t.code === 200 ? (v.success("操作成功"), x.value = !1, B(), V()) : v.error(t.msg);
        });
      });
    }
    function B() {
      i.value = {
        id: "",
        userName: "",
        account: "",
        roles: ""
      }, N.value && N.value.resetFields();
    }
    function ae() {
      L.value.validate((n) => {
        n && (u.value.id ? (u.value.password = null, Ue(u.value).then((t) => {
          t.code === 200 ? (v.success("更新成功"), c.value = !1, F(), V()) : v.error(t.msg);
        })) : Ne(u.value).then((t) => {
          t.code === 200 ? (v.success("添加成功"), c.value = !1, F(), V()) : v.error(t.msg);
        }));
      });
    }
    function oe() {
      F(), E.value = "添加用户", c.value = !0, T.value = !1;
    }
    function ne(n) {
      F(), E.value = "修改用户", c.value = !0, T.value = !0, ke(n.id).then((t) => {
        u.value = t.data, u.value.sex = u.value.sex.toString(), u.value.password = "";
      });
    }
    function ue(n) {
      $.confirm("确定要删除[" + n.userName + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Ce(n.id).then((t) => {
          t.code === 200 && t.data ? (v.success("删除成功"), V()) : v.error(t.msg);
        });
      }).catch(() => {
      });
    }
    function V() {
      S.value = !0, ye(s.value).then((n) => {
        I.value = n.data.list, s.value.total = n.data.total, S.value = !1;
      });
    }
    function ie() {
      s.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        userName: "",
        account: ""
      }, D.value.resetFields(), V();
    }
    function F() {
      u.value = {
        id: "",
        userName: "",
        account: "",
        password: "",
        email: "",
        website: "",
        sex: void 0,
        remark: "",
        mobile: ""
      }, L.value && L.value.resetFields();
    }
    function se(n) {
      B(), i.value.id = n.id, i.value.userName = n.userName, i.value.account = n.account, Ae().then((t) => {
        q.value = t.data, Le(n.id).then((d) => {
          i.value.roles = d.data.roles;
        });
      }), E.value = "分配角色", x.value = !0;
    }
    function re() {
      S.value = !0, Ee(s.value).then((n) => {
        window.download.excel(n, "用户数据.xlsx"), S.value = !1;
      }).catch((n) => {
        v.error("导出失败"), S.value = !1;
      });
    }
    return V(), (n, t) => {
      const d = g("el-input"), p = g("el-form-item"), f = g("el-button"), z = g("el-form"), de = g("el-col"), ce = g("el-row"), b = g("el-table-column"), pe = g("el-switch"), me = g("el-table"), fe = g("el-pagination"), X = g("el-option"), j = g("el-select"), O = g("el-dialog"), U = G("hasPermission"), ge = G("loading");
      return m(), M("div", Me, [
        C("div", $e, [
          l(z, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: D
          }, {
            default: o(() => [
              l(p, { label: "昵称" }, {
                default: o(() => [
                  l(d, {
                    modelValue: s.value.userName,
                    "onUpdate:modelValue": t[0] || (t[0] = (e) => s.value.userName = e),
                    placeholder: "请输入昵称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(p, { label: "账户" }, {
                default: o(() => [
                  l(d, {
                    modelValue: s.value.account,
                    "onUpdate:modelValue": t[1] || (t[1] = (e) => s.value.account = e),
                    placeholder: "请输入账户",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              l(p, null, {
                default: o(() => [
                  k((m(), h(f, {
                    type: "primary",
                    onClick: V,
                    icon: r(we)
                  }, {
                    default: o(() => [
                      w("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [U, ["admin:user:query"]]
                  ]),
                  l(f, {
                    icon: r(Y),
                    onClick: ie
                  }, {
                    default: o(() => [
                      w("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  k((m(), h(f, {
                    icon: r(ve),
                    onClick: re
                  }, {
                    default: o(() => [
                      w("导出")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [U, ["admin:user:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        l(ce, {
          gutter: 10,
          class: "mb8"
        }, {
          default: o(() => [
            l(de, { span: 1.5 }, {
              default: o(() => [
                k((m(), h(f, {
                  icon: r(_e),
                  type: "primary",
                  plain: "",
                  onClick: oe
                }, {
                  default: o(() => [
                    w("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [U, ["admin:user:create"]]
                ])
              ]),
              _: 1
            }),
            C("div", Ie, [
              l(f, {
                icon: r(Y),
                circle: "",
                onClick: V
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        C("div", qe, [
          k((m(), h(me, {
            data: r(I),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: o(() => [
              l(b, {
                prop: "userName",
                label: "用户名称",
                "min-width": "100"
              }),
              l(b, {
                prop: "account",
                label: "账号",
                "min-width": "100"
              }),
              l(b, {
                prop: "sex",
                label: "性别",
                "min-width": "60"
              }, {
                default: o((e) => {
                  var y;
                  return [
                    w(P((y = r(Te)(r(H).SEX, e.row.sex)) == null ? void 0 : y.dictLabel), 1)
                  ];
                }),
                _: 1
              }),
              l(b, {
                prop: "email",
                label: "邮箱",
                "min-width": "120"
              }),
              l(b, {
                prop: "website",
                label: "网站",
                "min-width": "150"
              }),
              l(b, {
                prop: "loginIp",
                label: "最后登录ip",
                "min-width": "120"
              }),
              l(b, {
                prop: "loginDate",
                label: "最后登录时间",
                "min-width": "120"
              }, {
                default: o((e) => [
                  C("span", null, P(r(Z)(e.row.loginDate)), 1)
                ]),
                _: 1
              }),
              l(b, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: o((e) => [
                  l(pe, {
                    modelValue: e.row.status,
                    "onUpdate:modelValue": (y) => e.row.status = y,
                    "active-value": 0,
                    "inactive-value": 1,
                    "inline-prompt": "",
                    "active-text": "启用",
                    "inactive-text": "禁用",
                    onClick: ze((y) => W(e.row), ["prevent"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                ]),
                _: 1
              }),
              l(b, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: o((e) => [
                  C("span", null, P(r(Z)(e.row.createTime)), 1)
                ]),
                _: 1
              }),
              l(b, {
                label: "操作",
                width: "300",
                fixed: "right"
              }, {
                default: o((e) => [
                  k((m(), h(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(he),
                    onClick: (y) => ne(e.row)
                  }, {
                    default: o(() => [
                      w("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:update"]]
                  ]),
                  k((m(), h(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(Ve),
                    onClick: (y) => se(e.row)
                  }, {
                    default: o(() => [
                      w("分配角色")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:configRole"]]
                  ]),
                  k((m(), h(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(be),
                    onClick: (y) => ee(e.row)
                  }, {
                    default: o(() => [
                      w("重置密码")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:resetPassword"]]
                  ]),
                  k((m(), h(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: r(xe),
                    onClick: (y) => ue(e.row)
                  }, {
                    default: o(() => [
                      w("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [U, ["admin:user:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ge, r(S)]
          ]),
          l(fe, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": t[2] || (t[2] = (e) => s.value.pageNo = e),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": t[3] || (t[3] = (e) => s.value.pageSize = e),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: V,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        l(O, {
          modelValue: r(x),
          "onUpdate:modelValue": t[8] || (t[8] = (e) => A(x) ? x.value = e : x = e),
          title: r(E),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            C("span", Xe, [
              l(f, {
                type: "primary",
                onClick: le
              }, {
                default: o(() => [
                  w("确 定")
                ]),
                _: 1
              }),
              l(f, {
                onClick: t[7] || (t[7] = (e) => {
                  A(x) ? x.value = !1 : x = !1, B();
                })
              }, {
                default: o(() => [
                  w("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            l(z, {
              ref_key: "userRoleFormRef",
              ref: N,
              model: i.value,
              "label-width": "80px",
              "status-icon": ""
            }, {
              default: o(() => [
                l(p, {
                  label: "昵称",
                  prop: "userName"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.userName,
                      "onUpdate:modelValue": t[4] || (t[4] = (e) => i.value.userName = e),
                      disabled: "",
                      placeholder: "请输入昵称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "账户",
                  prop: "account"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: i.value.account,
                      "onUpdate:modelValue": t[5] || (t[5] = (e) => i.value.account = e),
                      disabled: "",
                      placeholder: "请输入账户"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "角色",
                  prop: "roles"
                }, {
                  default: o(() => [
                    l(j, {
                      modelValue: i.value.roles,
                      "onUpdate:modelValue": t[6] || (t[6] = (e) => i.value.roles = e),
                      clearable: "",
                      multiple: "",
                      placeholder: "请选择角色",
                      style: { width: "100%" }
                    }, {
                      default: o(() => [
                        (m(!0), M(K, null, J(r(q), (e) => (m(), h(X, {
                          key: e.id,
                          label: e.name,
                          value: e.id
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        l(O, {
          modelValue: r(c),
          "onUpdate:modelValue": t[18] || (t[18] = (e) => A(c) ? c.value = e : c = e),
          title: r(E),
          width: "600px",
          draggable: ""
        }, {
          footer: o(() => [
            C("span", je, [
              l(f, {
                type: "primary",
                onClick: ae
              }, {
                default: o(() => [
                  w("确 定")
                ]),
                _: 1
              }),
              l(f, {
                onClick: t[17] || (t[17] = (e) => {
                  A(c) ? c.value = !1 : c = !1, F();
                })
              }, {
                default: o(() => [
                  w("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: o(() => [
            l(z, {
              ref_key: "addFormRef",
              ref: L,
              model: u.value,
              "label-width": "60px",
              "status-icon": "",
              rules: R
            }, {
              default: o(() => [
                l(p, {
                  label: "昵称",
                  prop: "userName"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.userName,
                      "onUpdate:modelValue": t[9] || (t[9] = (e) => u.value.userName = e),
                      placeholder: "请输入昵称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "账户",
                  prop: "account"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.account,
                      "onUpdate:modelValue": t[10] || (t[10] = (e) => u.value.account = e),
                      placeholder: "请输入账户"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                r(T) ? Pe("", !0) : (m(), h(p, {
                  key: 0,
                  label: "密码",
                  prop: "password"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.password,
                      "onUpdate:modelValue": t[11] || (t[11] = (e) => u.value.password = e),
                      type: "password",
                      "show-password": "",
                      placeholder: "请输入密码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })),
                l(p, {
                  label: "性别",
                  prop: "sex"
                }, {
                  default: o(() => [
                    l(j, {
                      modelValue: u.value.sex,
                      "onUpdate:modelValue": t[12] || (t[12] = (e) => u.value.sex = e),
                      placeholder: "请选择性别",
                      clearable: "",
                      style: { width: "200px" }
                    }, {
                      default: o(() => [
                        (m(!0), M(K, null, J(r(Be)(r(H).SEX), (e) => (m(), h(X, {
                          key: e.dictValue,
                          label: e.dictLabel,
                          value: e.dictValue
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "手机号",
                  prop: "mobile"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.mobile,
                      "onUpdate:modelValue": t[13] || (t[13] = (e) => u.value.mobile = e),
                      placeholder: "请输入手机号"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "邮箱",
                  prop: "email"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.email,
                      "onUpdate:modelValue": t[14] || (t[14] = (e) => u.value.email = e),
                      placeholder: "请输入邮箱地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "网站",
                  prop: "website"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.website,
                      "onUpdate:modelValue": t[15] || (t[15] = (e) => u.value.website = e),
                      placeholder: "请输入网站地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                l(p, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: o(() => [
                    l(d, {
                      modelValue: u.value.remark,
                      "onUpdate:modelValue": t[16] || (t[16] = (e) => u.value.remark = e),
                      placeholder: "请输入备注",
                      autosize: { minRows: 3, maxRows: 5 },
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
  Ze as default
};
