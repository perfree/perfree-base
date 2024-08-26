import { p as ae, a as le, b as te, c as oe, d as ne, g as ue, e as se } from "./lib/perfree.js";
import { s as re, r as T, p as ie, e as de, d as ce, a as me } from "./lib/@element-plus.js";
const i = window.Vue.resolveComponent, o = window.Vue.createVNode, t = window.Vue.withCtx, d = window.Vue.unref, m = window.Vue.createTextVNode, q = window.Vue.resolveDirective, n = window.Vue.openBlock, s = window.Vue.createBlock, k = window.Vue.withDirectives, C = window.Vue.createElementVNode, P = window.Vue.createElementBlock, g = window.Vue.createCommentVNode, pe = window.Vue.toDisplayString, R = window.Vue.isRef, fe = { class: "page" }, ge = { class: "search-box" }, _e = { class: "right-tool" }, ve = { class: "table-box" }, be = { key: 0 }, Ve = { key: 1 }, we = { class: "dialog-footer" }, V = window.ElementPlus.ElMessage, M = window.ElementPlus.ElMessageBox, ke = window.Vue.reactive, b = window.Vue.ref, xe = {
  __name: "AttachConfigView",
  setup(ye) {
    let z = b([]), U = b(!1);
    const A = b();
    let p = b(!1), x = b(!1), D = b("");
    const S = b(), e = b({
      id: "",
      name: "",
      remark: "",
      storage: void 0,
      basePath: "",
      endpoint: "",
      bucket: "",
      accessKey: "",
      accessSecret: "",
      domain: "",
      uploadDir: ""
    }), O = ke({
      name: [{ required: !0, message: "请输入配置名称", trigger: "blur" }],
      storage: [{ required: !0, message: "请选择存储器类型", trigger: "blur" }],
      basePath: [{ required: !0, message: "请输入存储路径", trigger: "blur" }],
      endpoint: [{ required: !0, message: "请输入节点地址", trigger: "blur" }],
      bucket: [{ required: !0, message: "请输入存储bucket", trigger: "blur" }],
      accessKey: [{ required: !0, message: "请输入accessKey", trigger: "blur" }],
      accessSecret: [{ required: !0, message: "请输入accessSecret", trigger: "blur" }]
    }), f = b({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    });
    function _() {
      U.value = !0, le(f.value).then((r) => {
        z.value = r.data.list, f.value.total = r.data.total, U.value = !1;
      });
    }
    function $() {
      f.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, A.value.resetFields(), _();
    }
    function j() {
      x.value = !1, D.value = "新增配置", y(), p.value = !0;
    }
    function y() {
      e.value = {
        id: "",
        name: "",
        remark: "",
        storage: void 0,
        basePath: "",
        endpoint: "",
        bucket: "",
        accessKey: "",
        accessSecret: "",
        domain: "",
        uploadDir: ""
      }, S.value && S.value.resetFields();
    }
    function J() {
      S.value.validate((r) => {
        if (r) {
          let a;
          e.value.storage === 0 ? a = {
            basePath: e.value.basePath
          } : a = {
            endpoint: e.value.endpoint,
            bucket: e.value.bucket,
            accessKey: e.value.accessKey,
            accessSecret: e.value.accessSecret,
            domain: e.value.domain,
            uploadDir: e.value.uploadDir
          };
          const c = {
            id: e.value.id,
            name: e.value.name,
            remark: e.value.remark,
            storage: e.value.storage,
            config: JSON.stringify(a)
          };
          e.value.id ? te(c).then((u) => {
            u.code === 200 ? (V.success("修改成功"), p.value = !1, y(), _()) : V.error(u.msg);
          }) : oe(c).then((u) => {
            u.code === 200 ? (V.success("添加成功"), p.value = !1, y(), _()) : V.error(u.msg);
          });
        }
      });
    }
    function L(r) {
      if (r.master) {
        V.error("默认配置不允许删除!");
        return;
      }
      M.confirm("确定要删除[" + r.name + "]吗？删除后该配置内上传的文件将无法展示!", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ne(r.id).then((a) => {
          a.code === 200 && a.data ? (V.success("删除成功"), _()) : V.error(a.msg);
        });
      }).catch(() => {
      });
    }
    function G(r) {
      x.value = !0, D.value = "修改配置", y(), p.value = !0, ue(r.id).then((a) => {
        e.value = Object.assign(a.data, JSON.parse(a.data.config));
      });
    }
    function H(r) {
      M.confirm("确定要将除[" + r.name + "]设置为主配置吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        se({ id: r.id }).then((a) => {
          V.success("修改成功"), _();
        });
      }).catch(() => {
      });
    }
    return _(), (r, a) => {
      const c = i("el-input"), u = i("el-form-item"), v = i("el-button"), B = i("el-form"), I = i("el-col"), Q = i("el-row"), w = i("el-table-column"), F = i("el-tag"), W = i("el-table"), X = i("el-pagination"), K = i("el-option"), Y = i("el-select"), N = i("el-text"), Z = i("el-dialog"), h = q("hasPermission"), ee = q("loading");
      return n(), P("div", fe, [
        C("div", ge, [
          o(B, {
            inline: !0,
            model: f.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: A
          }, {
            default: t(() => [
              o(u, { label: "配置名称" }, {
                default: t(() => [
                  o(c, {
                    modelValue: f.value.name,
                    "onUpdate:modelValue": a[0] || (a[0] = (l) => f.value.name = l),
                    placeholder: "请输入配置名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              o(u, null, {
                default: t(() => [
                  k((n(), s(v, {
                    type: "primary",
                    onClick: _,
                    icon: d(re)
                  }, {
                    default: t(() => [
                      m("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [h, ["admin:attachConfig:query"]]
                  ]),
                  o(v, {
                    icon: d(T),
                    onClick: $
                  }, {
                    default: t(() => [
                      m("重置")
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
        o(Q, {
          gutter: 10,
          class: "mb8"
        }, {
          default: t(() => [
            o(I, { span: 1.5 }, {
              default: t(() => [
                k((n(), s(v, {
                  icon: d(ie),
                  type: "primary",
                  plain: "",
                  onClick: j
                }, {
                  default: t(() => [
                    m("新增")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [h, ["admin:attachConfig:create"]]
                ])
              ]),
              _: 1
            }),
            C("div", _e, [
              o(v, {
                icon: d(T),
                circle: "",
                onClick: _
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        C("div", ve, [
          k((n(), s(W, {
            data: d(z),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: t(() => [
              o(w, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              o(w, {
                prop: "name",
                label: "配置名称",
                "min-width": "240"
              }),
              o(w, {
                prop: "storage",
                label: "存储器类型",
                "min-width": "240"
              }, {
                default: t((l) => [
                  l.row.storage === 0 ? (n(), P("span", be, "本地磁盘")) : g("", !0),
                  l.row.storage === 1 ? (n(), P("span", Ve, "S3对象存储")) : g("", !0)
                ]),
                _: 1
              }),
              o(w, {
                prop: "remark",
                label: "备注",
                "min-width": "240"
              }),
              o(w, {
                prop: "master",
                label: "默认配置",
                "min-width": "100"
              }, {
                default: t((l) => [
                  l.row.master ? (n(), s(F, {
                    key: 0,
                    type: "success"
                  }, {
                    default: t(() => [
                      m("是")
                    ]),
                    _: 1
                  })) : (n(), s(F, {
                    key: 1,
                    type: "danger"
                  }, {
                    default: t(() => [
                      m("否")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              o(w, {
                prop: "createTime",
                label: "创建时间",
                "min-width": "120"
              }, {
                default: t((l) => [
                  C("span", null, pe(d(ae)(l.row.createTime)), 1)
                ]),
                _: 1
              }),
              o(w, {
                label: "操作",
                width: "240",
                fixed: "right"
              }, {
                default: t((l) => [
                  k((n(), s(v, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(de),
                    onClick: (E) => G(l.row)
                  }, {
                    default: t(() => [
                      m("修改")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [h, ["admin:attachConfig:update"]]
                  ]),
                  k((n(), s(v, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(ce),
                    onClick: (E) => H(l.row)
                  }, {
                    default: t(() => [
                      m("默认配置")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [h, ["admin:attachConfig:master"]]
                  ]),
                  k((n(), s(v, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: d(me),
                    onClick: (E) => L(l.row)
                  }, {
                    default: t(() => [
                      m("删除")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [h, ["admin:attachConfig:delete"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [ee, d(U)]
          ]),
          o(X, {
            "current-page": f.value.pageNo,
            "onUpdate:currentPage": a[1] || (a[1] = (l) => f.value.pageNo = l),
            "page-size": f.value.pageSize,
            "onUpdate:pageSize": a[2] || (a[2] = (l) => f.value.pageSize = l),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: _,
            total: f.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        o(Z, {
          modelValue: d(p),
          "onUpdate:modelValue": a[14] || (a[14] = (l) => R(p) ? p.value = l : p = l),
          title: d(D),
          width: "600px",
          draggable: ""
        }, {
          footer: t(() => [
            C("span", we, [
              o(v, {
                type: "primary",
                onClick: J
              }, {
                default: t(() => [
                  m("确 定")
                ]),
                _: 1
              }),
              o(v, {
                onClick: a[13] || (a[13] = (l) => {
                  R(p) ? p.value = !1 : p = !1, y();
                })
              }, {
                default: t(() => [
                  m("取 消")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            o(B, {
              ref_key: "addFormRef",
              ref: S,
              model: e.value,
              "label-width": "120px",
              "status-icon": "",
              rules: O
            }, {
              default: t(() => [
                o(u, {
                  label: "配置名称",
                  prop: "name"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.name,
                      "onUpdate:modelValue": a[3] || (a[3] = (l) => e.value.name = l),
                      placeholder: "请输入配置名称"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(u, {
                  label: "备注",
                  prop: "remark"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.remark,
                      "onUpdate:modelValue": a[4] || (a[4] = (l) => e.value.remark = l),
                      placeholder: "请输入备注"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                o(u, {
                  label: "存储器类型",
                  prop: "storage"
                }, {
                  default: t(() => [
                    o(Y, {
                      modelValue: e.value.storage,
                      "onUpdate:modelValue": a[5] || (a[5] = (l) => e.value.storage = l),
                      placeholder: "请选择存储器类型",
                      disabled: d(x)
                    }, {
                      default: t(() => [
                        (n(), s(K, {
                          key: 0,
                          label: "本地磁盘",
                          value: 0
                        })),
                        (n(), s(K, {
                          key: 1,
                          label: "S3对象存储",
                          value: 1
                        }))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "disabled"])
                  ]),
                  _: 1
                }),
                e.value.storage === 0 ? (n(), s(u, {
                  key: 0,
                  label: "存储路径",
                  prop: "basePath"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.basePath,
                      "onUpdate:modelValue": a[6] || (a[6] = (l) => e.value.basePath = l),
                      placeholder: "请输入存储路径"
                    }, null, 8, ["modelValue"]),
                    d(x) ? (n(), s(N, {
                      key: 0,
                      class: "mx-1",
                      type: "danger"
                    }, {
                      default: t(() => [
                        m("提示: 修改存储路径将会造成原有上传图片不能访问,建议新增存储策略")
                      ]),
                      _: 1
                    })) : g("", !0)
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (n(), s(u, {
                  key: 1,
                  label: "节点地址",
                  prop: "endpoint"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.endpoint,
                      "onUpdate:modelValue": a[7] || (a[7] = (l) => e.value.endpoint = l),
                      placeholder: "请输入节点地址"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (n(), s(u, {
                  key: 2,
                  label: "存储bucket",
                  prop: "bucket"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.bucket,
                      "onUpdate:modelValue": a[8] || (a[8] = (l) => e.value.bucket = l),
                      placeholder: "请输入存储bucket"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (n(), s(u, {
                  key: 3,
                  label: "accessKey",
                  prop: "accessKey"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.accessKey,
                      "onUpdate:modelValue": a[9] || (a[9] = (l) => e.value.accessKey = l),
                      placeholder: "请输入accessKey"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (n(), s(u, {
                  key: 4,
                  label: "accessSecret",
                  prop: "accessSecret"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.accessSecret,
                      "onUpdate:modelValue": a[10] || (a[10] = (l) => e.value.accessSecret = l),
                      placeholder: "请输入accessSecret"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (n(), s(u, {
                  key: 5,
                  label: "上传目录",
                  prop: "uploadDir"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.uploadDir,
                      "onUpdate:modelValue": a[11] || (a[11] = (l) => e.value.uploadDir = l),
                      placeholder: "请输入上传目录"
                    }, null, 8, ["modelValue"]),
                    o(N, {
                      class: "mx-1",
                      type: "info"
                    }, {
                      default: t(() => [
                        m("支持{year},{month}, {day}占位符,不填写则上传至根目录")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : g("", !0),
                e.value.storage === 1 ? (n(), s(u, {
                  key: 6,
                  label: "访问域名",
                  prop: "domain"
                }, {
                  default: t(() => [
                    o(c, {
                      modelValue: e.value.domain,
                      "onUpdate:modelValue": a[12] || (a[12] = (l) => e.value.domain = l),
                      placeholder: "请输入访问域名"
                    }, null, 8, ["modelValue"]),
                    o(N, {
                      class: "mx-1",
                      type: "info"
                    }, {
                      default: t(() => [
                        m("如未配置访问域名,将采用节点地址 + 存储bucket的形式作为访问域名")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : g("", !0)
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
  xe as default
};
