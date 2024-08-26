import { s as F, r as y, u as X, e as Y, f as P, d as Z } from "./lib/@element-plus.js";
import { p as ee, c as le, d as te, e as ae, f as oe, i as ne } from "./lib/codegen.js";
import { t as $ } from "./lib/tabs.js";
const c = window.Vue.resolveComponent, e = window.Vue.createVNode, l = window.Vue.withCtx, n = window.Vue.unref, d = window.Vue.createTextVNode, f = window.Vue.createElementVNode, ie = window.Vue.toDisplayString, de = window.Vue.resolveDirective, C = window.Vue.openBlock, L = window.Vue.createBlock, U = window.Vue.withDirectives, A = window.Vue.isRef, se = window.Vue.createElementBlock, re = { class: "page" }, ce = { class: "search-box" }, ue = { class: "right-tool" }, me = { class: "table-box" }, pe = { class: "dialog-footer" }, N = window.ElementPlus.ElMessage, fe = window.ElementPlus.ElMessageBox, s = window.Vue.ref, _e = window.VueRouter.useRouter, he = {
  __name: "CodegenView",
  setup(we) {
    const r = s({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableName: ""
    }), M = s(), _ = s({
      tableName: ""
    });
    _e();
    const g = s(), v = s();
    let x = s([]), z = s([]), b = s(!1), h = s(!1), u = s(!1), R = s("");
    function p() {
      h.value = !0, le(r.value).then((t) => {
        h.value = !1, x.value = t.data.list, r.value.total = t.data.total;
      });
    }
    function j() {
      k(), R.value = "导入表", u.value = !0, S();
    }
    function S() {
      b.value = !0, te(_.value).then((t) => {
        z.value = t.data, b.value = !1;
      });
    }
    function k() {
      _.value = {
        tableName: ""
      }, g.value && g.value.resetFields();
    }
    function G() {
      if (v.value.getSelectionRows().length <= 0) {
        N.error("至少选择一张表!");
        return;
      }
      let t = {
        tableNames: []
      };
      v.value.getSelectionRows().forEach((a) => {
        t.tableNames.push(a.name);
      }), ae(t).then((a) => {
        p(), u.value = !1;
      });
    }
    function I(t) {
      $(`代码生成-配置[${t.tableName}]`, "/admin/codegen/editConfig/" + t.id, "");
    }
    function q(t) {
      $(`代码生成-预览[${t.tableName}]`, "/admin/codegen/preview/" + t.id, "");
    }
    function H(t) {
      fe.confirm("确定要删除[" + t.tableName + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        oe(t.id).then((a) => {
          a.code === 200 && a.data ? (N.success("删除成功"), p()) : N.error(a.msg);
        });
      }).catch(() => {
      });
    }
    function J(t) {
      ne(t.id).then((a) => {
        window.download.zip(a, t.tableName + ".zip");
      });
    }
    return p(), (t, a) => {
      const T = c("el-input"), w = c("el-form-item"), i = c("el-button"), E = c("el-form"), K = c("el-col"), O = c("el-row"), m = c("el-table-column"), B = c("el-table"), Q = c("el-pagination"), W = c("el-dialog"), D = de("loading");
      return C(), se("div", re, [
        f("div", ce, [
          e(E, {
            inline: !0,
            model: r.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: M
          }, {
            default: l(() => [
              e(w, { label: "表名称" }, {
                default: l(() => [
                  e(T, {
                    modelValue: r.value.tableName,
                    "onUpdate:modelValue": a[0] || (a[0] = (o) => r.value.tableName = o),
                    placeholder: "请输入表名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              e(w, null, {
                default: l(() => [
                  e(i, {
                    type: "primary",
                    onClick: p,
                    icon: n(F)
                  }, {
                    default: l(() => [
                      d("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  e(i, {
                    icon: n(y),
                    onClick: t.resetSearchForm
                  }, {
                    default: l(() => [
                      d("重置")
                    ]),
                    _: 1
                  }, 8, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        e(O, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            e(K, { span: 1.5 }, {
              default: l(() => [
                e(i, {
                  icon: n(X),
                  type: "primary",
                  plain: "",
                  onClick: j
                }, {
                  default: l(() => [
                    d("导入表")
                  ]),
                  _: 1
                }, 8, ["icon"])
              ]),
              _: 1
            }),
            f("div", ue, [
              e(i, {
                icon: n(y),
                circle: "",
                onClick: p
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        f("div", me, [
          U((C(), L(B, {
            data: n(x),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              e(m, {
                prop: "tableName",
                label: "表名称",
                "min-width": "150"
              }),
              e(m, {
                prop: "tableComment",
                label: "表描述",
                "min-width": "150"
              }),
              e(m, {
                prop: "className",
                label: "类名称",
                "min-width": "150"
              }),
              e(m, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: l((o) => [
                  f("span", null, ie(n(ee)(o.row.createTime)), 1)
                ]),
                _: 1
              }),
              e(m, {
                label: "操作",
                width: "280",
                fixed: "right"
              }, {
                default: l((o) => [
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(Y),
                    onClick: (V) => q(o.row)
                  }, {
                    default: l(() => [
                      d("预览")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(P),
                    onClick: (V) => I(o.row)
                  }, {
                    default: l(() => [
                      d("配置")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(P),
                    onClick: (V) => J(o.row)
                  }, {
                    default: l(() => [
                      d("下载")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"]),
                  e(i, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: n(Z),
                    onClick: (V) => H(o.row)
                  }, {
                    default: l(() => [
                      d("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [D, n(h)]
          ]),
          e(Q, {
            "current-page": r.value.pageNo,
            "onUpdate:currentPage": a[1] || (a[1] = (o) => r.value.pageNo = o),
            "page-size": r.value.pageSize,
            "onUpdate:pageSize": a[2] || (a[2] = (o) => r.value.pageSize = o),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: p,
            total: r.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        e(W, {
          modelValue: n(u),
          "onUpdate:modelValue": a[5] || (a[5] = (o) => A(u) ? u.value = o : u = o),
          title: n(R),
          width: "600px",
          draggable: ""
        }, {
          footer: l(() => [
            f("span", pe, [
              e(i, {
                type: "primary",
                onClick: G
              }, {
                default: l(() => [
                  d("确 定")
                ]),
                _: 1
              }),
              e(i, {
                onClick: a[4] || (a[4] = (o) => {
                  A(u) ? u.value = !1 : u = !1, k();
                })
              }, {
                default: l(() => [
                  d("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: l(() => [
            f("div", null, [
              e(E, {
                inline: !0,
                model: _.value,
                class: "demo-form-inline",
                ref_key: "addSearchFormRef",
                ref: g
              }, {
                default: l(() => [
                  e(w, { label: "表名称" }, {
                    default: l(() => [
                      e(T, {
                        modelValue: _.value.tableName,
                        "onUpdate:modelValue": a[3] || (a[3] = (o) => _.value.tableName = o),
                        placeholder: "请输入表名称",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  e(w, null, {
                    default: l(() => [
                      e(i, {
                        type: "primary",
                        onClick: S,
                        icon: n(F)
                      }, {
                        default: l(() => [
                          d("查询")
                        ]),
                        _: 1
                      }, 8, ["icon"]),
                      e(i, {
                        icon: n(y),
                        onClick: k
                      }, {
                        default: l(() => [
                          d("重置")
                        ]),
                        _: 1
                      }, 8, ["icon"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              U((C(), L(B, {
                data: n(z),
                style: { width: "100%", height: "100%" },
                "row-key": "id",
                ref_key: "multipleTableRef",
                ref: v,
                "max-height": "260"
              }, {
                default: l(() => [
                  e(m, {
                    type: "selection",
                    width: "55"
                  }),
                  e(m, {
                    prop: "name",
                    label: "表名称",
                    "min-width": "150"
                  }),
                  e(m, {
                    prop: "comment",
                    label: "表描述",
                    "min-width": "150"
                  })
                ]),
                _: 1
              }, 8, ["data"])), [
                [D, n(b)]
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  he as default
};
