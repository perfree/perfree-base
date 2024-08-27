import { F as B } from "./lib/@fortawesome.js";
import { u as j, p as q, l as z, c as K, a as C } from "./lib/@element-plus.js";
import { i as L } from "./lib/echarts.js";
function R() {
  return axios.get("/api/auth/adminHome/getServerInfo");
}
function W() {
  return axios.get("/api/auth/adminHome/getHomeStatistic");
}
const X = (h, p) => {
  const g = h.__vccOpts || h;
  for (const [r, f] of p)
    g[r] = f;
  return g;
}, _ = window.Vue.resolveComponent, e = window.Vue.createVNode, n = window.Vue.toDisplayString, a = window.Vue.createElementVNode, t = window.Vue.withCtx, l = window.Vue.unref, o = window.Vue.createTextVNode, Q = window.Vue.resolveDirective, v = window.Vue.openBlock, P = window.Vue.createElementBlock, I = window.Vue.withDirectives, A = window.Vue.createBlock, Y = window.Vue.pushScopeId, Z = window.Vue.popScopeId, c = (h) => (Y("data-v-03afe36f"), h = h(), Z(), h), ee = { class: "panelBox" }, te = { style: { display: "flex" } }, le = { class: "loginBoxRight" }, ae = { class: "title" }, oe = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "welcome" }, "工欲善其事，必先利其器。 -- 论语", -1)), se = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { style: { "margin-left": "auto" } }, [
  /* @__PURE__ */ a("iframe", {
    scrolling: "no",
    src: "https://widget.tianqiapi.com/?style=tg&skin=pitaya",
    frameborder: "0",
    width: "470",
    height: "60",
    allowtransparency: "true"
  })
], -1)), ne = { class: "panelBox" }, ie = { class: "panelBox" }, ce = { class: "panelBox" }, de = { class: "panelBox" }, ue = { class: "panelBox" }, re = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "panelTitle" }, "服务器CPU使用率", -1)), _e = { style: { "text-align": "center", "margin-top": "10px" } }, pe = { class: "panelBox" }, fe = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "panelTitle" }, "服务器内存使用率", -1)), me = { style: { "text-align": "center", "margin-top": "10px" } }, he = { class: "panelBox" }, ve = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "panelTitle" }, "服务器JVM使用率", -1)), ge = { style: { "text-align": "center", "margin-top": "10px" } }, we = { class: "panelBox" }, be = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "panelTitle" }, "服务器信息", -1)), ye = { class: "panelBox" }, xe = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "panelTitle" }, "快捷功能", -1)), Ve = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "shortcuts-item-name" }, "菜单管理", -1)), ke = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "shortcuts-item-name" }, "用户管理", -1)), Be = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "shortcuts-item-name" }, "角色管理", -1)), Ce = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "shortcuts-item-name" }, "系统设置", -1)), Ie = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "shortcuts-item-name" }, "字典管理", -1)), Se = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "shortcuts-item-name" }, "插件管理", -1)), Te = { class: "panelBox" }, Pe = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "panelTitle" }, "相关文档", -1)), Ne = { class: "link-ul" }, Ee = { class: "panelBox" }, De = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", { class: "panelTitle" }, "附件统计", -1)), He = /* @__PURE__ */ c(() => /* @__PURE__ */ a("div", {
  class: "echartsBox",
  id: "attachEcharts",
  style: { height: "130px" }
}, null, -1)), Me = [
  De,
  He
], J = window.ElementPlus.ElMessage, Ge = window.Vue.onMounted, m = window.Vue.ref, $e = {
  __name: "Home",
  setup(h) {
    let p = m(!0), g = m(!0), r = m({}), f = m({
      cpuNum: 0,
      free: 0,
      ioWait: 0,
      sys: 0,
      total: 0,
      used: 0
    }), w = m({}), b = m({}), N = m({});
    const $ = m(window.pinia.state._value.userStore.userInfo), M = [
      { color: getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim(), percentage: 70 },
      { color: "#e6a23c", percentage: 90 },
      { color: "#f56c6c", percentage: 100 }
    ];
    function U() {
      g.value = !0, R().then((d) => {
        d.code === 200 ? (f.value = d.data.cpuInfo, w.value = d.data.jvmInfo, b.value = d.data.memInfo, N.value = d.data.sysInfo) : J.error(d.msg), g.value = !1;
      });
    }
    function F() {
      p.value = !0, W().then((d) => {
        d.code === 200 ? (r.value = d.data, L(document.getElementById("attachEcharts")).setOption({
          tooltip: {
            trigger: "item"
          },
          series: [
            {
              name: "附件统计",
              type: "pie",
              radius: "50%",
              data: [
                { value: r.value.attachImageTotal, name: "图片" },
                { value: r.value.attachVideoTotal, name: "视频" },
                { value: r.value.attachAudioTotal, name: "音频" },
                { value: r.value.attachOtherTotal, name: "其他" }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        })) : J.error(d.msg), p.value = !1;
      });
    }
    function y(d) {
      router.replace(d);
    }
    return Ge(() => {
      F();
    }), U(), (d, u) => {
      const O = _("el-avatar"), s = _("el-col"), E = _("el-icon"), D = _("el-statistic"), G = _("el-progress"), i = _("el-descriptions-item"), H = _("el-descriptions"), S = _("el-row"), x = _("el-button"), V = _("el-link"), k = Q("loading");
      return v(), A(S, {
        gutter: 15,
        style: { height: "100%" }
      }, {
        default: t(() => [
          e(s, { span: 24 }, {
            default: t(() => [
              a("div", ee, [
                a("div", te, [
                  e(O, {
                    size: 65,
                    src: $.value.avatar
                  }, null, 8, ["src"]),
                  a("div", le, [
                    a("div", ae, "欢迎登录, " + n($.value.userName), 1),
                    oe
                  ]),
                  se
                ])
              ])
            ]),
            _: 1
          }),
          e(s, { span: 20 }, {
            default: t(() => [
              e(S, { gutter: 15 }, {
                default: t(() => [
                  e(s, { span: 6 }, {
                    default: t(() => [
                      I((v(), P("div", ne, [
                        e(D, {
                          value: l(r).userTotal
                        }, {
                          title: t(() => [
                            a("span", null, [
                              e(E, null, {
                                default: t(() => [
                                  e(l(j))
                                ]),
                                _: 1
                              }),
                              o(" 用户数量")
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [k, l(p)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(s, { span: 6 }, {
                    default: t(() => [
                      I((v(), P("div", ie, [
                        e(D, {
                          value: l(r).attachTotal
                        }, {
                          title: t(() => [
                            a("span", null, [
                              e(E, null, {
                                default: t(() => [
                                  e(l(q))
                                ]),
                                _: 1
                              }),
                              o(" 附件数量")
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [k, l(p)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(s, { span: 6 }, {
                    default: t(() => [
                      I((v(), P("div", ce, [
                        e(D, {
                          value: l(r).installPluginTotal
                        }, {
                          title: t(() => [
                            a("span", null, [
                              e(E, null, {
                                default: t(() => [
                                  e(l(z))
                                ]),
                                _: 1
                              }),
                              o(" 已安装插件数量")
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [k, l(p)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(s, { span: 6 }, {
                    default: t(() => [
                      I((v(), P("div", de, [
                        e(D, {
                          value: l(r).runningPluginTotal
                        }, {
                          title: t(() => [
                            a("span", null, [
                              e(E, null, {
                                default: t(() => [
                                  e(l(K))
                                ]),
                                _: 1
                              }),
                              o(" 已运行插件数量")
                            ])
                          ]),
                          _: 1
                        }, 8, ["value"])
                      ])), [
                        [k, l(p)]
                      ])
                    ]),
                    _: 1
                  }),
                  e(s, { span: 24 }, {
                    default: t(() => [
                      I((v(), A(S, { gutter: 15 }, {
                        default: t(() => [
                          e(s, { span: 8 }, {
                            default: t(() => [
                              a("div", ue, [
                                re,
                                a("div", _e, [
                                  e(G, {
                                    type: "dashboard",
                                    percentage: l(f).used,
                                    color: M
                                  }, null, 8, ["percentage"]),
                                  e(H, {
                                    column: 1,
                                    border: ""
                                  }, {
                                    default: t(() => [
                                      e(i, {
                                        label: "CPU主频",
                                        "label-class-name": "my-label"
                                      }, {
                                        default: t(() => [
                                          o(n(l(f).maxFrequency) + "GHz", 1)
                                        ]),
                                        _: 1
                                      }),
                                      e(i, {
                                        label: "核心数",
                                        "label-class-name": "my-label"
                                      }, {
                                        default: t(() => [
                                          o(n(l(f).cpuNum), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          e(s, { span: 8 }, {
                            default: t(() => [
                              a("div", pe, [
                                fe,
                                a("div", me, [
                                  e(G, {
                                    type: "dashboard",
                                    percentage: l(b).usage,
                                    color: M
                                  }, null, 8, ["percentage"]),
                                  e(H, {
                                    column: 1,
                                    border: ""
                                  }, {
                                    default: t(() => [
                                      e(i, {
                                        label: "总内存",
                                        "label-class-name": "my-label"
                                      }, {
                                        default: t(() => [
                                          o(n(l(b).total) + "G", 1)
                                        ]),
                                        _: 1
                                      }),
                                      e(i, {
                                        label: "已用内存",
                                        "label-class-name": "my-label"
                                      }, {
                                        default: t(() => [
                                          o(n(l(b).used) + "G", 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          e(s, { span: 8 }, {
                            default: t(() => [
                              a("div", he, [
                                ve,
                                a("div", ge, [
                                  e(G, {
                                    type: "dashboard",
                                    percentage: l(w).usage,
                                    color: M
                                  }, null, 8, ["percentage"]),
                                  e(H, {
                                    column: 1,
                                    border: ""
                                  }, {
                                    default: t(() => [
                                      e(i, {
                                        label: "JVM大小",
                                        "label-class-name": "my-label"
                                      }, {
                                        default: t(() => [
                                          o(n(l(w).total) + "M", 1)
                                        ]),
                                        _: 1
                                      }),
                                      e(i, {
                                        label: "已用JVM",
                                        "label-class-name": "my-label"
                                      }, {
                                        default: t(() => [
                                          o(n(l(w).used) + "M", 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          e(s, { span: 24 }, {
                            default: t(() => [
                              a("div", we, [
                                be,
                                e(H, {
                                  column: 2,
                                  border: "",
                                  style: { "margin-top": "15px" }
                                }, {
                                  default: t(() => [
                                    e(i, { label: "服务器名称" }, {
                                      default: t(() => [
                                        o(n(l(N).computerName), 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "操作系统" }, {
                                      default: t(() => [
                                        o(n(l(N).osName), 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "系统架构" }, {
                                      default: t(() => [
                                        o(n(l(N).osArch), 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "CPU" }, {
                                      default: t(() => [
                                        o(n(l(f).cpuName), 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "CPU核心数" }, {
                                      default: t(() => [
                                        o(n(l(f).cpuNum), 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "CPU主频" }, {
                                      default: t(() => [
                                        o(n(l(f).maxFrequency) + "GHz", 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "总内存" }, {
                                      default: t(() => [
                                        o(n(l(b).total) + "G", 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "可用内存" }, {
                                      default: t(() => [
                                        o(n(l(b).free) + "G", 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "JDK版本" }, {
                                      default: t(() => [
                                        o(n(l(w).version), 1)
                                      ]),
                                      _: 1
                                    }),
                                    e(i, { label: "JDK路径" }, {
                                      default: t(() => [
                                        o(n(l(w).home), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })), [
                        [k, l(g)]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          e(s, { span: 4 }, {
            default: t(() => [
              e(S, { gutter: 10 }, {
                default: t(() => [
                  e(s, { span: 24 }, {
                    default: t(() => [
                      a("div", ye, [
                        xe,
                        e(S, null, {
                          default: t(() => [
                            e(s, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: t(() => [
                                e(x, {
                                  plain: "",
                                  onClick: u[0] || (u[0] = (T) => y("/admin/menu"))
                                }, {
                                  default: t(() => [
                                    e(l(B), { icon: "fa-solid fa-list-numeric" })
                                  ]),
                                  _: 1
                                }),
                                Ve
                              ]),
                              _: 1
                            }),
                            e(s, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: t(() => [
                                e(x, {
                                  plain: "",
                                  onClick: u[1] || (u[1] = (T) => y("/admin/user"))
                                }, {
                                  default: t(() => [
                                    e(l(B), { icon: "fa-solid fa-user" })
                                  ]),
                                  _: 1
                                }),
                                ke
                              ]),
                              _: 1
                            }),
                            e(s, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: t(() => [
                                e(x, {
                                  plain: "",
                                  onClick: u[2] || (u[2] = (T) => y("/admin/role"))
                                }, {
                                  default: t(() => [
                                    e(l(B), { icon: "fa-solid fa-male" })
                                  ]),
                                  _: 1
                                }),
                                Be
                              ]),
                              _: 1
                            }),
                            e(s, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: t(() => [
                                e(x, {
                                  plain: "",
                                  onClick: u[3] || (u[3] = (T) => y("/admin/setting"))
                                }, {
                                  default: t(() => [
                                    e(l(B), { icon: "fa-solid fa-tools" })
                                  ]),
                                  _: 1
                                }),
                                Ce
                              ]),
                              _: 1
                            }),
                            e(s, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: t(() => [
                                e(x, {
                                  plain: "",
                                  onClick: u[4] || (u[4] = (T) => y("/admin/dict"))
                                }, {
                                  default: t(() => [
                                    e(l(B), { icon: "fa-solid fa-clipboard" })
                                  ]),
                                  _: 1
                                }),
                                Ie
                              ]),
                              _: 1
                            }),
                            e(s, {
                              span: 8,
                              class: "shortcuts-item"
                            }, {
                              default: t(() => [
                                e(x, {
                                  plain: "",
                                  onClick: u[5] || (u[5] = (T) => y("/admin/plugin"))
                                }, {
                                  default: t(() => [
                                    e(l(B), { icon: "fa-solid fa-swatchbook" })
                                  ]),
                                  _: 1
                                }),
                                Se
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  e(s, { span: 24 }, {
                    default: t(() => [
                      a("div", Te, [
                        Pe,
                        a("ul", Ne, [
                          a("li", null, [
                            e(V, {
                              icon: l(C),
                              href: "https://cn.vuejs.org",
                              target: "_blank"
                            }, {
                              default: t(() => [
                                o("Vue 官方文档")
                              ]),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          a("li", null, [
                            e(V, {
                              icon: l(C),
                              href: "https://element-plus.org",
                              target: "_blank"
                            }, {
                              default: t(() => [
                                o("Element Plus 官方文档")
                              ]),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          a("li", null, [
                            e(V, {
                              icon: l(C),
                              href: "https://base.perfree.org.cn",
                              target: "_blank"
                            }, {
                              default: t(() => [
                                o("PerfreeBase 官网")
                              ]),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          a("li", null, [
                            e(V, {
                              icon: l(C),
                              href: "https://base.perfree.org.cn/useDoc",
                              target: "_blank"
                            }, {
                              default: t(() => [
                                o("PerfreeBase 使用文档")
                              ]),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          a("li", null, [
                            e(V, {
                              icon: l(C),
                              href: "https://base.perfree.org.cn/devDoc",
                              target: "_blank"
                            }, {
                              default: t(() => [
                                o("PerfreeBase 开发文档")
                              ]),
                              _: 1
                            }, 8, ["icon"])
                          ]),
                          a("li", null, [
                            e(V, {
                              icon: l(C),
                              href: "https://base.perfree.org.cn/pluginDoc",
                              target: "_blank"
                            }, {
                              default: t(() => [
                                o("PerfreeBase 插件开发文档")
                              ]),
                              _: 1
                            }, 8, ["icon"])
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  e(s, { span: 24 }, {
                    default: t(() => [
                      I((v(), P("div", Ee, Me)), [
                        [k, l(p)]
                      ])
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
      });
    };
  }
}, Oe = /* @__PURE__ */ X($e, [["__scopeId", "data-v-03afe36f"]]);
export {
  Oe as default
};
