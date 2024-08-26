import { p as C } from "./lib/perfree.js";
import { s as R, r as D, d as j } from "./lib/@element-plus.js";
function q(v) {
  return axios.post("/api/auth/mailLog/page", v);
}
function G(v) {
  return axios.post("/api/auth/mailLog/export", v, { responseType: "blob" });
}
const n = window.Vue.resolveComponent, e = window.Vue.createVNode, a = window.Vue.withCtx, d = window.Vue.openBlock, r = window.Vue.createBlock, s = window.Vue.unref, _ = window.Vue.createTextVNode, M = window.Vue.resolveDirective, b = window.Vue.withDirectives, w = window.Vue.createElementVNode, S = window.Vue.toDisplayString;
window.Vue.createCommentVNode;
const H = window.Vue.createElementBlock, I = { class: "page" }, J = { class: "search-box" }, K = { class: "right-tool" }, O = { class: "table-box" }, Q = window.ElementPlus.ElMessage;
window.ElementPlus.ElMessageBox;
window.Vue.reactive;
const V = window.Vue.ref, Y = {
  __name: "MailLogView",
  setup(v) {
    const l = V({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      mailTemplateCode: null,
      sendDate: [],
      receiveMail: null,
      mailTitle: null,
      sendStatus: null,
      sendMail: null
    }), h = V();
    let x = V([]), c = V(!1);
    function m() {
      c.value = !0, q(l.value).then((p) => {
        x.value = p.data.list, l.value.total = p.data.total, c.value = !1;
      });
    }
    function E() {
      l.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        mailTemplateCode: null,
        sendDate: [],
        receiveMail: null,
        mailTitle: null,
        sendStatus: null,
        sendMail: null
      }, h.value.resetFields(), m();
    }
    function N() {
      c.value = !0, G(l.value).then((p) => {
        window.download.excel(p, "邮件日志数据.xlsx"), c.value = !1;
      }).catch((p) => {
        Q.error("导出失败"), c.value = !1;
      });
    }
    return m(), (p, o) => {
      const f = n("el-input"), u = n("el-form-item"), z = n("el-date-picker"), k = n("el-option"), L = n("el-select"), g = n("el-button"), U = n("el-form"), B = n("el-row"), i = n("el-table-column"), y = n("el-tag"), P = n("el-table"), F = n("el-pagination"), T = M("hasPermission"), A = M("loading");
      return d(), H("div", I, [
        w("div", J, [
          e(U, {
            inline: !0,
            model: l.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: h
          }, {
            default: a(() => [
              e(u, { label: "模板编号" }, {
                default: a(() => [
                  e(f, {
                    modelValue: l.value.mailTemplateCode,
                    "onUpdate:modelValue": o[0] || (o[0] = (t) => l.value.mailTemplateCode = t),
                    placeholder: "请输入模板编号",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(u, { label: "发送时间" }, {
                default: a(() => [
                  e(z, {
                    modelValue: l.value.sendDate,
                    "onUpdate:modelValue": o[1] || (o[1] = (t) => l.value.sendDate = t),
                    type: "datetimerange",
                    "start-placeholder": "请选择开始时间",
                    "end-placeholder": "请选择结束时间",
                    "default-time": [/* @__PURE__ */ new Date("1 00:00:00"), /* @__PURE__ */ new Date("1 23:59:59")]
                  }, null, 8, ["modelValue", "default-time"])
                ]),
                _: 1
              }),
              e(u, { label: "接收邮箱" }, {
                default: a(() => [
                  e(f, {
                    modelValue: l.value.receiveMail,
                    "onUpdate:modelValue": o[2] || (o[2] = (t) => l.value.receiveMail = t),
                    placeholder: "请输入接收邮箱",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(u, { label: "邮件标题" }, {
                default: a(() => [
                  e(f, {
                    modelValue: l.value.mailTitle,
                    "onUpdate:modelValue": o[3] || (o[3] = (t) => l.value.mailTitle = t),
                    placeholder: "请输入邮件标题",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(u, { label: "发送状态" }, {
                default: a(() => [
                  e(L, {
                    modelValue: l.value.sendStatus,
                    "onUpdate:modelValue": o[4] || (o[4] = (t) => l.value.sendStatus = t),
                    placeholder: "请选择发送状态",
                    clearable: "",
                    style: { width: "200px" }
                  }, {
                    default: a(() => [
                      (d(), r(k, {
                        key: 0,
                        label: "发送成功",
                        value: 0
                      })),
                      (d(), r(k, {
                        key: 1,
                        label: "发送失败",
                        value: 1
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(u, { label: "发件邮箱" }, {
                default: a(() => [
                  e(f, {
                    modelValue: l.value.sendMail,
                    "onUpdate:modelValue": o[5] || (o[5] = (t) => l.value.sendMail = t),
                    placeholder: "请输入发件邮箱",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(u, null, {
                default: a(() => [
                  b((d(), r(g, {
                    type: "primary",
                    onClick: m,
                    icon: s(R)
                  }, {
                    default: a(() => [
                      _("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [T, ["admin:mailLog:query"]]
                  ]),
                  e(g, {
                    icon: s(D),
                    onClick: E
                  }, {
                    default: a(() => [
                      _("重置")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  b((d(), r(g, {
                    icon: s(j),
                    onClick: N
                  }, {
                    default: a(() => [
                      _("导出")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [T, ["admin:mailLog:export"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        e(B, {
          gutter: 10,
          class: "mb8"
        }, {
          default: a(() => [
            w("div", K, [
              e(g, {
                icon: s(D),
                circle: "",
                onClick: m
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        w("div", O, [
          b((d(), r(P, {
            data: s(x),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: a(() => [
              e(i, {
                prop: "mailTemplateCode",
                label: "模板编号",
                "min-width": "150"
              }),
              e(i, {
                prop: "sendDate",
                label: "发送时间",
                "min-width": "120"
              }, {
                default: a((t) => [
                  w("span", null, S(s(C)(t.row.sendDate)), 1)
                ]),
                _: 1
              }),
              e(i, {
                prop: "receiveMail",
                label: "接收邮箱",
                "min-width": "120"
              }),
              e(i, {
                prop: "mailTitle",
                label: "邮件标题",
                "min-width": "120",
                "show-overflow-tooltip": ""
              }),
              e(i, {
                prop: "sendStatus",
                label: "发送状态",
                "min-width": "80"
              }, {
                default: a((t) => [
                  t.row.sendStatus === 0 ? (d(), r(y, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: a(() => [
                      _("发送成功")
                    ]),
                    _: 1
                  })) : (d(), r(y, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: a(() => [
                      _("发送失败")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              e(i, {
                prop: "sendMail",
                label: "发件邮箱",
                "min-width": "120"
              }),
              e(i, {
                prop: "content",
                label: "邮件内容",
                "min-width": "150",
                "show-overflow-tooltip": ""
              }),
              e(i, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: a((t) => [
                  w("span", null, S(s(C)(t.row.createTime)), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [A, s(c)]
          ]),
          e(F, {
            "current-page": l.value.pageNo,
            "onUpdate:currentPage": o[6] || (o[6] = (t) => l.value.pageNo = t),
            "page-size": l.value.pageSize,
            "onUpdate:pageSize": o[7] || (o[7] = (t) => l.value.pageSize = t),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: m,
            total: l.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
};
export {
  Y as default
};
