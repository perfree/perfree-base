import { p as Q } from "./lib/perfree.js";
import { m as W, a as X, b as Y, c as Z, d as ee, e as le } from "./lib/mailServer.js";
import { s as ae, r as M, d as te, p as oe, e as ne, a as ue } from "./lib/@element-plus.js";
const i = window.Vue.resolveComponent, e = window.Vue.createVNode, t = window.Vue.withCtx, s = window.Vue.unref, d = window.Vue.createTextVNode, L = window.Vue.resolveDirective, p = window.Vue.openBlock, v = window.Vue.createBlock, S = window.Vue.withDirectives, k = window.Vue.createElementVNode;
window.Vue.createCommentVNode;
const re = window.Vue.toDisplayString, z = window.Vue.isRef, ie = window.Vue.createElementBlock, se = { class: "page" }, de = { class: "search-box" }, me = { class: "right-tool" }, ce = { class: "table-box" }, pe = { class: "dialog-footer" }, V = window.ElementPlus.ElMessage, ve = window.ElementPlus.ElMessageBox, fe = window.Vue.reactive, w = window.Vue.ref, be = {
  __name: "MailServerView",
  setup(_e) {
    const n = w({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: null,
      account: null
    }), o = w({
      id: null,
      name: null,
      account: null,
      userName: null,
      password: null,
      address: null,
      port: null,
      status: 0,
      enableSSL: 0
    }), F = fe({
      name: [{ required: !0, message: "邮箱服务名称不能为空", trigger: "blur" }],
      account: [
        { required: !0, message: "邮箱服务账号不能为空", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
      ],
      userName: [{ required: !0, message: "邮箱服务用户名不能为空", trigger: "blur" }],
      password: [{ required: !0, message: "邮箱服务密码不能为空", trigger: "blur" }],
      address: [{ required: !0, message: "邮箱服务SMTP域名不能为空", trigger: "blur" }],
      port: [{ required: !0, message: "邮箱服务SMTP端口不能为空", trigger: "blur" }],
      status: [{ required: !0, message: "状态不能为空", trigger: "blur" }],
      enableSSL: [{ required: !0, message: "是否开启SSL不能为空", trigger: "blur" }]
    }), T = w(), x = w();
    let m = w(!1), C = w(""), U = w([]), b = w(!1);
    function A() {
      x.value.validate((u) => {
        u && (o.value.id ? W(o.value).then((l) => {
          l.code === 200 ? (V.success("操作成功"), m.value = !1, h(), g()) : V.error(l.msg);
        }) : X(o.value).then((l) => {
          l.code === 200 ? (V.success("操作成功"), m.value = !1, h(), g()) : V.error(l.msg);
        }));
      });
    }
    function B() {
      h(), C.value = "添加邮箱服务", m.value = !0;
    }
    function q(u) {
      h(), C.value = "修改邮箱服务", m.value = !0, Y(u.id).then((l) => {
        o.value = l.data;
      });
    }
    function D(u) {
      let l = Object.keys(u);
      ve.confirm("确定要删除[" + u[l[0]] + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Z(u.id).then((r) => {
          r.code === 200 && r.data ? (V.success("删除成功"), g()) : V.error(r.msg);
        });
      }).catch(() => {
      });
    }
    function g() {
      b.value = !0, ee(n.value).then((u) => {
        U.value = u.data.list, n.value.total = u.data.total, b.value = !1;
      });
    }
    function R() {
      n.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: null,
        account: null
      }, T.value.resetFields(), g();
    }
    function h() {
      o.value = {
        id: null,
        name: null,
        account: null,
        userName: null,
        password: null,
        address: null,
        port: null,
        status: 0,
        enableSSL: 0
      }, x.value && x.value.resetFields();
    }
    function j() {
      b.value = !0, le(n.value).then((u) => {
        window.download.excel(u, "邮箱服务数据.xlsx"), b.value = !1;
      }).catch((u) => {
        V.error("导出失败"), b.value = !1;
      });
    }
    return g(), (u, l) => {
      const r = i("el-input"), c = i("el-form-item"), f = i("el-button"), P = i("el-form"), $ = i("el-col"), G = i("el-row"), _ = i("el-table-column"), N = i("el-tag"), O = i("el-table"), H = i("el-pagination"), E = i("el-switch"), I = i("el-dialog"), y = L("hasPermission"), J = L("loading");
      return p(), ie("div", se, [
        k("div", de, [
          e(P, {
            inline: !0,
            model: n.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: T
          }, {
            default: t(() => [
              e(c, { label: "名称" }, {
                default: t(() => [
                  e(r, {
                    modelValue: n.value.name,
                    "onUpdate:modelValue": l[0] || (l[0] = (a) => n.value.name = a),
                    placeholder: "请输入邮箱服务名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(c, { label: "账号" }, {
                default: t(() => [
                  e(r, {
                    modelValue: n.value.account,
                    "onUpdate:modelValue": l[1] || (l[1] = (a) => n.value.account = a),
                    placeholder: "请输入邮箱服务账号",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(c, null, {
                default: t(() => [
                  S((p(), v(f, {
                    type: "primary",
                    onClick: g,
                    icon: s(ae)
                  }, {
                    default: t(() => [
                      d("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [y, ["admin:mailServer:query"]]
                  ]),
                  e(f, {
                    icon: s(M),
                    onClick: R
                  }, {
                    default: t(() => [
                      d("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  S((p(), v(f, {
                    icon: s(te),
                    onClick: j
                  }, {
                    default: t(() => [
                      d("导出")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [y, ["admin:mailServer:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        e(G, {
          gutter: 10,
          class: "mb8"
        }, {
          default: t(() => [
            e($, { span: 1.5 }, {
              default: t(() => [
                S((p(), v(f, {
                  icon: s(oe),
                  type: "primary",
                  plain: "",
                  onClick: B
                }, {
                  default: t(() => [
                    d("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [y, ["admin:mailServer:create"]]
                ])
              ]),
              _: 1
            }),
            k("div", me, [
              e(f, {
                icon: s(M),
                circle: "",
                onClick: g
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        k("div", ce, [
          S((p(), v(O, {
            data: s(U),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: t(() => [
              e(_, {
                prop: "name",
                label: "名称",
                "min-width": "150"
              }),
              e(_, {
                prop: "account",
                label: "账号",
                "min-width": "150"
              }),
              e(_, {
                prop: "userName",
                label: "用户名",
                "min-width": "150"
              }),
              e(_, {
                prop: "address",
                label: "SMTP域名",
                "min-width": "150"
              }),
              e(_, {
                prop: "port",
                label: "SMTP端口",
                "min-width": "80"
              }),
              e(_, {
                prop: "status",
                label: "状态",
                "min-width": "80"
              }, {
                default: t((a) => [
                  a.row.status === 0 ? (p(), v(N, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: t(() => [
                      d("启用")
                    ]),
                    _: 1
                  })) : (p(), v(N, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: t(() => [
                      d("禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              e(_, {
                prop: "enableSSL",
                label: "SSL",
                "min-width": "80"
              }, {
                default: t((a) => [
                  a.row.enableSSL === 0 ? (p(), v(N, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: t(() => [
                      d("启用")
                    ]),
                    _: 1
                  })) : (p(), v(N, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: t(() => [
                      d("禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              e(_, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: t((a) => [
                  k("span", null, re(s(Q)(a.row.createTime)), 1)
                ]),
                _: 1
              }),
              e(_, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: t((a) => [
                  S((p(), v(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: s(ne),
                    onClick: (K) => q(a.row)
                  }, {
                    default: t(() => [
                      d("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [y, ["admin:mailServer:update"]]
                  ]),
                  S((p(), v(f, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: s(ue),
                    onClick: (K) => D(a.row)
                  }, {
                    default: t(() => [
                      d("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [y, ["admin:mailServer:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [J, s(b)]
          ]),
          e(H, {
            "current-page": n.value.pageNo,
            "onUpdate:currentPage": l[2] || (l[2] = (a) => n.value.pageNo = a),
            "page-size": n.value.pageSize,
            "onUpdate:pageSize": l[3] || (l[3] = (a) => n.value.pageSize = a),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: g,
            total: n.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        e(I, {
          modelValue: s(m),
          "onUpdate:modelValue": l[13] || (l[13] = (a) => z(m) ? m.value = a : m = a),
          title: s(C),
          width: "600px",
          draggable: ""
        }, {
          footer: t(() => [
            k("span", pe, [
              e(f, {
                type: "primary",
                onClick: A
              }, {
                default: t(() => [
                  d("确 定")
                ]),
                _: 1
              }),
              e(f, {
                onClick: l[12] || (l[12] = (a) => {
                  z(m) ? m.value = !1 : m = !1, h();
                })
              }, {
                default: t(() => [
                  d("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            e(P, {
              ref_key: "addFormRef",
              ref: x,
              model: o.value,
              "label-width": "100px",
              "status-icon": "",
              rules: F
            }, {
              default: t(() => [
                e(c, {
                  label: "名称",
                  prop: "name"
                }, {
                  default: t(() => [
                    e(r, {
                      modelValue: o.value.name,
                      "onUpdate:modelValue": l[4] || (l[4] = (a) => o.value.name = a),
                      placeholder: "请输入邮箱服务名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(c, {
                  label: "账号",
                  prop: "account"
                }, {
                  default: t(() => [
                    e(r, {
                      modelValue: o.value.account,
                      "onUpdate:modelValue": l[5] || (l[5] = (a) => o.value.account = a),
                      placeholder: "请输入邮箱服务账号"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(c, {
                  label: "密码",
                  prop: "password"
                }, {
                  default: t(() => [
                    e(r, {
                      modelValue: o.value.password,
                      "onUpdate:modelValue": l[6] || (l[6] = (a) => o.value.password = a),
                      placeholder: "请输入邮箱服务密码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(c, {
                  label: "用户名",
                  prop: "userName"
                }, {
                  default: t(() => [
                    e(r, {
                      modelValue: o.value.userName,
                      "onUpdate:modelValue": l[7] || (l[7] = (a) => o.value.userName = a),
                      placeholder: "请输入邮箱服务用户名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(c, {
                  label: "SMTP域名",
                  prop: "address"
                }, {
                  default: t(() => [
                    e(r, {
                      modelValue: o.value.address,
                      "onUpdate:modelValue": l[8] || (l[8] = (a) => o.value.address = a),
                      placeholder: "请输入邮箱服务SMTP域名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(c, {
                  label: "SMTP端口",
                  prop: "port"
                }, {
                  default: t(() => [
                    e(r, {
                      modelValue: o.value.port,
                      "onUpdate:modelValue": l[9] || (l[9] = (a) => o.value.port = a),
                      placeholder: "请输入邮箱服务SMTP端口"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(c, {
                  label: "状态",
                  prop: "status"
                }, {
                  default: t(() => [
                    e(E, {
                      modelValue: o.value.status,
                      "onUpdate:modelValue": l[10] || (l[10] = (a) => o.value.status = a),
                      "inline-prompt": "",
                      "active-text": "启用",
                      "inactive-text": "禁用",
                      "active-value": 0,
                      "inactive-value": 1
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                e(c, {
                  label: "SSL",
                  prop: "enableSSL"
                }, {
                  default: t(() => [
                    e(E, {
                      modelValue: o.value.enableSSL,
                      "onUpdate:modelValue": l[11] || (l[11] = (a) => o.value.enableSSL = a),
                      "inline-prompt": "",
                      "active-text": "启用",
                      "inactive-text": "禁用",
                      "active-value": 0,
                      "inactive-value": 1
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
  be as default
};
