import { h as z, b as G, s as H } from "./lib/codegen.js";
import { c as J, t as K } from "./lib/tabs.js";
function W(h) {
  return axios.post("/api/auth/menu/page", h);
}
function Y() {
  return axios.get("/api/auth/dict/listAll");
}
const f = window.Vue.unref, m = window.Vue.resolveComponent, o = window.Vue.openBlock, n = window.Vue.createBlock, a = window.Vue.withCtx, e = window.Vue.createVNode, Z = window.Vue.createCommentVNode, $ = window.Vue.renderList, ee = window.Vue.Fragment, D = window.Vue.createElementBlock, le = window.Vue.resolveDirective, ae = window.Vue.withDirectives, B = window.Vue.createTextVNode, oe = window.Vue.createElementVNode, te = window.Vue.isRef, ne = { class: "page" }, ue = { style: { "text-align": "center", "margin-top": "15px" } }, de = window.ElementPlus.ElMessage, M = window.Vue.reactive, _ = window.Vue.ref, re = window.VueRouter.useRoute, pe = {
  __name: "CodegenEditConfig",
  setup(h) {
    let v = _("base");
    const k = re(), d = _({
      id: "",
      scene: 0,
      moduleName: "",
      frontModuleName: "",
      className: "",
      classComment: "",
      author: "",
      parentMenuId: "-1",
      packageName: "",
      mapperLocation: "mapper"
    }), O = M({
      scene: [{ required: !0, message: "请选择生成场景", trigger: "blur" }],
      moduleName: [{ required: !0, message: "请输入模块名称或插件id", trigger: "blur" }],
      frontModuleName: [{ required: !0, message: "请输入前端模块名称", trigger: "blur" }],
      className: [{ required: !0, message: "请输入类名称", trigger: "blur" }],
      packageName: [{ required: !0, message: "请输入包名称", trigger: "blur" }]
    }), U = _();
    let y = _([]), N = _([]), g = _(!1), T = _([]);
    const I = M({
      children: "children",
      label: "name",
      value: "id"
    });
    function j() {
      W({ type: 1 }).then((p) => {
        N.value = [{ id: "-1", name: "主类目", children: z(p.data, "id", "pid", "children", "-1") }];
      });
    }
    function q() {
      g.value = !0, G(k.params.id).then((p) => {
        p.code === 200 && (d.value = p.data.codegenTable, y.value = p.data.codegenColumnList, g.value = !1);
      });
    }
    function E() {
      U.value.validate((p) => {
        if (p) {
          let r = {
            codegenTable: d.value,
            codegenColumnList: y.value
          };
          H(r).then((t) => {
            t.code === 200 && (de.success("配置成功"), x());
          });
        }
      });
    }
    function F() {
      Y().then((p) => {
        T.value = p.data;
      });
    }
    function x() {
      J(k.fullPath), K("", "/admin/codegen", "");
    }
    return F(), j(), q(), (p, r) => {
      const t = m("el-option"), b = m("el-select"), s = m("el-form-item"), c = m("el-col"), R = m("el-tree-select"), V = m("el-input"), P = m("el-row"), A = m("el-form"), C = m("el-tab-pane"), i = m("el-table-column"), w = m("el-checkbox"), Q = m("el-table"), L = m("el-button"), S = m("el-tabs"), X = le("loading");
      return o(), D("div", ne, [
        e(S, {
          modelValue: f(v),
          "onUpdate:modelValue": r[9] || (r[9] = (l) => te(v) ? v.value = l : v = l)
        }, {
          default: a(() => [
            e(C, {
              label: "基础信息",
              name: "base"
            }, {
              default: a(() => [
                e(A, {
                  ref_key: "baseFormRef",
                  ref: U,
                  model: d.value,
                  "label-width": "120px",
                  "status-icon": "",
                  rules: O
                }, {
                  default: a(() => [
                    e(P, { gutter: 24 }, {
                      default: a(() => [
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: "生成场景",
                              prop: "scene"
                            }, {
                              default: a(() => [
                                e(b, {
                                  modelValue: d.value.scene,
                                  "onUpdate:modelValue": r[0] || (r[0] = (l) => d.value.scene = l),
                                  placeholder: "请选择生成场景",
                                  style: { width: "240px" }
                                }, {
                                  default: a(() => [
                                    (o(), n(t, {
                                      key: 0,
                                      label: "后台代码",
                                      value: 0
                                    })),
                                    (o(), n(t, {
                                      key: 1,
                                      label: "插件代码",
                                      value: 1
                                    }))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: "父级菜单",
                              prop: "parentMenuId"
                            }, {
                              default: a(() => [
                                e(R, {
                                  modelValue: d.value.parentMenuId,
                                  "onUpdate:modelValue": r[1] || (r[1] = (l) => d.value.parentMenuId = l),
                                  data: f(N),
                                  props: I,
                                  "check-strictly": "",
                                  "render-after-expand": !1,
                                  style: { width: "240px" },
                                  clearable: ""
                                }, null, 8, ["modelValue", "data", "props"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: d.value.scene === 0 ? "后端模块名称" : "插件ID",
                              prop: "moduleName"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: d.value.moduleName,
                                  "onUpdate:modelValue": r[2] || (r[2] = (l) => d.value.moduleName = l),
                                  placeholder: d.value.scene === 0 ? "请输入模块名称" : "请输入插件ID"
                                }, null, 8, ["modelValue", "placeholder"])
                              ]),
                              _: 1
                            }, 8, ["label"])
                          ]),
                          _: 1
                        }),
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: "包名称",
                              prop: "packageName"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: d.value.packageName,
                                  "onUpdate:modelValue": r[3] || (r[3] = (l) => d.value.packageName = l),
                                  placeholder: "请输入包名称"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: "类注释",
                              prop: "classComment"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: d.value.classComment,
                                  "onUpdate:modelValue": r[4] || (r[4] = (l) => d.value.classComment = l),
                                  placeholder: "请输入类注释"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: "前端模块名称",
                              prop: "moduleName"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: d.value.frontModuleName,
                                  "onUpdate:modelValue": r[5] || (r[5] = (l) => d.value.frontModuleName = l),
                                  placeholder: "请输入模块名称"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: "类名称",
                              prop: "className"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: d.value.className,
                                  "onUpdate:modelValue": r[6] || (r[6] = (l) => d.value.className = l),
                                  placeholder: "请输入类名称"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        d.value.scene === 1 ? (o(), n(c, {
                          key: 0,
                          span: 12
                        }, {
                          default: a(() => [
                            e(s, {
                              label: "mapperXml路径",
                              prop: "mapperLocation"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: d.value.mapperLocation,
                                  "onUpdate:modelValue": r[7] || (r[7] = (l) => d.value.mapperLocation = l),
                                  placeholder: "MapperXml存放路径(从resources目录开始)"
                                }, null, 8, ["modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })) : Z("", !0),
                        e(c, { span: 12 }, {
                          default: a(() => [
                            e(s, {
                              label: "作者",
                              prop: "author"
                            }, {
                              default: a(() => [
                                e(V, {
                                  modelValue: d.value.author,
                                  "onUpdate:modelValue": r[8] || (r[8] = (l) => d.value.author = l),
                                  placeholder: "请输入作者"
                                }, null, 8, ["modelValue"])
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
            }),
            e(C, {
              label: "字段配置",
              name: "column"
            }, {
              default: a(() => [
                ae((o(), n(Q, {
                  data: f(y),
                  style: { width: "100%", height: "100%" },
                  "row-key": "id",
                  "max-height": "600px"
                }, {
                  default: a(() => [
                    e(i, {
                      prop: "columnName",
                      label: "字段名称",
                      "min-width": "100"
                    }),
                    e(i, {
                      prop: "dataType",
                      label: "字段类型",
                      "min-width": "100"
                    }),
                    e(i, {
                      prop: "columnComment",
                      label: "字段描述",
                      "min-width": "120"
                    }, {
                      default: a((l) => [
                        e(V, {
                          modelValue: l.row.columnComment,
                          "onUpdate:modelValue": (u) => l.row.columnComment = u,
                          placeholder: "字段描述"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "javaType",
                      label: "java类型",
                      "min-width": "160"
                    }, {
                      default: a((l) => [
                        e(b, {
                          modelValue: l.row.javaType,
                          "onUpdate:modelValue": (u) => l.row.javaType = u,
                          placeholder: "java类型",
                          style: { width: "160px" }
                        }, {
                          default: a(() => [
                            (o(), n(t, {
                              key: 0,
                              label: "Long",
                              value: "Long"
                            })),
                            (o(), n(t, {
                              key: 1,
                              label: "String",
                              value: "String"
                            })),
                            (o(), n(t, {
                              key: 2,
                              label: "Integer",
                              value: "Integer"
                            })),
                            (o(), n(t, {
                              key: 3,
                              label: "Double",
                              value: "Double"
                            })),
                            (o(), n(t, {
                              key: 4,
                              label: "BigDecimal",
                              value: "BigDecimal"
                            })),
                            (o(), n(t, {
                              key: 5,
                              label: "LocalDateTime",
                              value: "LocalDateTime"
                            })),
                            (o(), n(t, {
                              key: 6,
                              label: "Boolean",
                              value: "Boolean"
                            }))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "javaField",
                      label: "java字段名",
                      "min-width": "100"
                    }, {
                      default: a((l) => [
                        e(V, {
                          modelValue: l.row.javaField,
                          "onUpdate:modelValue": (u) => l.row.javaField = u,
                          placeholder: "java字段名"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "insertOperation",
                      label: "插入",
                      "min-width": "50"
                    }, {
                      default: a((l) => [
                        e(w, {
                          modelValue: l.row.insertOperation,
                          "onUpdate:modelValue": (u) => l.row.insertOperation = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "updateOperation",
                      label: "编辑",
                      "min-width": "50"
                    }, {
                      default: a((l) => [
                        e(w, {
                          modelValue: l.row.updateOperation,
                          "onUpdate:modelValue": (u) => l.row.updateOperation = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "listOperation",
                      label: "列表",
                      "min-width": "50"
                    }, {
                      default: a((l) => [
                        e(w, {
                          modelValue: l.row.listOperation,
                          "onUpdate:modelValue": (u) => l.row.listOperation = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "listQueryOperation",
                      label: "查询",
                      "min-width": "50"
                    }, {
                      default: a((l) => [
                        e(w, {
                          modelValue: l.row.listQueryOperation,
                          "onUpdate:modelValue": (u) => l.row.listQueryOperation = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "nullable",
                      label: "允许空",
                      "min-width": "70"
                    }, {
                      default: a((l) => [
                        e(w, {
                          modelValue: l.row.nullable,
                          "onUpdate:modelValue": (u) => l.row.nullable = u
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "formType",
                      label: "表单类型",
                      "min-width": "120"
                    }, {
                      default: a((l) => [
                        e(b, {
                          modelValue: l.row.formType,
                          "onUpdate:modelValue": (u) => l.row.formType = u,
                          placeholder: "表单类型",
                          style: { width: "120px" }
                        }, {
                          default: a(() => [
                            (o(), n(t, {
                              key: 0,
                              label: "文本框",
                              value: 0
                            })),
                            (o(), n(t, {
                              key: 1,
                              label: "文本域",
                              value: 1
                            })),
                            (o(), n(t, {
                              key: 2,
                              label: "单选框",
                              value: 2
                            })),
                            (o(), n(t, {
                              key: 3,
                              label: "下拉框",
                              value: 3
                            })),
                            (o(), n(t, {
                              key: 4,
                              label: "日期框",
                              value: 4
                            })),
                            (o(), n(t, {
                              key: 5,
                              label: "数字输入框",
                              value: 5
                            }))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "queryType",
                      label: "查询方式",
                      "min-width": "120"
                    }, {
                      default: a((l) => [
                        e(b, {
                          modelValue: l.row.queryType,
                          "onUpdate:modelValue": (u) => l.row.queryType = u,
                          placeholder: "查询方式",
                          style: { width: "120px" }
                        }, {
                          default: a(() => [
                            (o(), n(t, {
                              key: 0,
                              label: "=",
                              value: 0
                            })),
                            (o(), n(t, {
                              key: 1,
                              label: "!=",
                              value: 1
                            })),
                            (o(), n(t, {
                              key: 2,
                              label: ">",
                              value: 2
                            })),
                            (o(), n(t, {
                              key: 3,
                              label: ">=",
                              value: 3
                            })),
                            (o(), n(t, {
                              key: 4,
                              label: "<",
                              value: 4
                            })),
                            (o(), n(t, {
                              key: 5,
                              label: "<=",
                              value: 5
                            })),
                            (o(), n(t, {
                              key: 6,
                              label: "Like",
                              value: 6
                            })),
                            (o(), n(t, {
                              key: 7,
                              label: "Between",
                              value: 7
                            }))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    e(i, {
                      prop: "dictType",
                      label: "数据字典",
                      "min-width": "120"
                    }, {
                      default: a((l) => [
                        e(b, {
                          modelValue: l.row.dictType,
                          "onUpdate:modelValue": (u) => l.row.dictType = u,
                          placeholder: "数据字典",
                          style: { width: "120px" }
                        }, {
                          default: a(() => [
                            (o(!0), D(ee, null, $(f(T), (u) => (o(), n(t, {
                              key: u.id,
                              label: u.dictName,
                              value: u.dictType
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 2
                        }, 1032, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["data"])), [
                  [X, f(g)]
                ])
              ]),
              _: 1
            }),
            oe("div", ue, [
              e(L, {
                type: "primary",
                onClick: E
              }, {
                default: a(() => [
                  B("提交")
                ]),
                _: 1
              }),
              e(L, { onClick: x }, {
                default: a(() => [
                  B("返回")
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
export {
  pe as default
};
