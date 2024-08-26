import { s as Z, r as R, p as ee, u as te, l as ne, d as le, a as oe } from "./lib/@element-plus.js";
const ae = window.Pinia.defineStore, ie = ae({
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
function se() {
  return axios.get("/api/auth/menuAdminList");
}
function ue(e, s) {
  if (arguments.length === 0 || !e)
    return null;
  const y = s || "{y}-{m}-{d} {h}:{i}:{s}";
  let i;
  typeof e == "object" ? i = e : (typeof e == "string" && /^[0-9]+$/.test(e) ? e = parseInt(e) : typeof e == "string" && (e = e.replace(new RegExp(/-/gm), "/").replace("T", " ").replace(new RegExp(/\.\d{3}/gm), "")), typeof e == "number" && e.toString().length === 10 && (e = e * 1e3), i = new Date(e));
  const _ = {
    y: i.getFullYear(),
    m: i.getMonth() + 1,
    d: i.getDate(),
    h: i.getHours(),
    i: i.getMinutes(),
    s: i.getSeconds(),
    a: i.getDay()
  };
  return y.replace(/{([ymdhisa])+}/g, (C, S) => {
    let v = _[S];
    return S === "a" ? ["日", "一", "二", "三", "四", "五", "六"][v] : (C.length > 0 && v < 10 && (v = "0" + v), v || 0);
  });
}
function re() {
  return new Promise((e, s) => {
    const y = ie();
    se().then((i) => {
      if (i.code === 200) {
        let _ = i.data;
        _.unshift(
          {
            name: "首页",
            url: "/admin",
            icon: "fa-solid fa-home",
            seq: 0,
            type: 1,
            target: 0,
            status: 0,
            pluginId: null,
            flag: null,
            component: "/view/Home",
            componentName: "home",
            moduleName: "home",
            menuType: 1,
            perms: "",
            isFrame: 1,
            id: "home",
            pid: "-1",
            children: []
          }
        ), y.setMenuList(_), e();
      }
    });
  });
}
function ce(e) {
  return axios.post("/api/auth/plugins/page", e);
}
function de(e) {
  return axios.post("/api/auth/plugins/disablePlugin?pluginId=" + e);
}
function pe(e) {
  return axios.post("/api/auth/plugins/enablePlugin?pluginId=" + e);
}
function me(e) {
  return axios.post("/api/auth/plugins/uninstallPlugin?pluginId=" + e);
}
const _e = {
  STORAGE_USER_INFO: "user_info",
  STORAGE_TOKEN: "token_info",
  STORAGE_LANGUAGE: "language"
}, ge = {
  // 默认请求的接口
  url: "/",
  // 服务器地址
  baseURL: "",
  // 设置超时时间 ms
  timeout: 60 * 1e3,
  // 是否跨站点访问控制请求
  withCredentials: !1
  // default
}, r = window.Vue.resolveComponent, t = window.Vue.createVNode, l = window.Vue.withCtx, u = window.Vue.unref, m = window.Vue.createTextVNode, z = window.Vue.resolveDirective, p = window.Vue.openBlock, f = window.Vue.createBlock, V = window.Vue.withDirectives, h = window.Vue.createElementVNode, A = window.Vue.createCommentVNode, L = window.Vue.toDisplayString, fe = window.Vue.isRef, he = window.Vue.createElementBlock, we = { class: "page" }, ve = { class: "search-box" }, be = { class: "right-tool" }, ye = { class: "table-box" }, Ve = ["href"], ke = /* @__PURE__ */ h("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ m(" 拖拽插件文件到此或"),
  /* @__PURE__ */ h("em", null, "点击上传插件文件")
], -1), xe = /* @__PURE__ */ h("div", { class: "el-upload__tip" }, " 插件文件为zip格式,若插件已存在,则会自动覆盖更新! ", -1), d = window.ElementPlus.ElMessage, N = window.ElementPlus.ElMessageBox, k = window.Vue.ref, Ce = {
  __name: "PluginView",
  setup(e) {
    const s = k({
      pageNo: 1,
      pageSize: 10,
      total: 0,
      name: ""
    }), y = k();
    let i = k([]), _ = k(!1), w = k(!1), C = localStorage.getItem(_e.STORAGE_TOKEN), S = ge.baseURL, v = {
      Authorization: "Bearer " + JSON.parse(C).accessToken
    }, E = k();
    function g() {
      _.value = !0, ce(s.value).then((a) => {
        i.value = a.data.list, s.value.total = a.data.total, _.value = !1;
      });
    }
    function U() {
      s.value = {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        name: ""
      }, y.value.resetFields(), g();
    }
    function M() {
      w.value = !0;
    }
    function D(a, n, T) {
      a.code === 200 ? (d.success("插件安装成功"), w.value = !1, E.value.clearFiles(), g()) : (d.error(a.msg), E.value.handleRemove(n));
    }
    function O(a) {
      d.error("插件上传失败,请检查网络是否通通畅");
    }
    function F(a) {
      N.confirm("确定要禁用[" + a.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        de(a.pluginId).then((n) => {
          n.code === 200 && n.data ? (re().then((T) => {
          }), d.success("插件禁用成功"), g()) : d.error(n.msg);
        });
      }).catch(() => {
      });
    }
    function G(a) {
      N.confirm("确定要启用[" + a.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        pe(a.pluginId).then((n) => {
          n.code === 200 && n.data ? (d.success("插件启用成功"), window.location.reload()) : d.error(n.msg);
        });
      }).catch(() => {
      });
    }
    function j(a) {
      N.confirm("确定要卸载[" + a.name + "]吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        me(a.pluginId).then((n) => {
          n.code === 200 ? n.data ? (d.success("插件卸载成功"), g()) : d.error("插件卸载失败") : d.error(n.msg);
        });
      }).catch(() => {
      });
    }
    return g(), (a, n) => {
      const T = r("el-input"), I = r("el-form-item"), b = r("el-button"), $ = r("el-form"), q = r("el-col"), H = r("el-row"), c = r("el-table-column"), P = r("el-tag"), K = r("el-table"), J = r("el-pagination"), Y = r("el-icon"), Q = r("el-upload"), W = r("el-dialog"), x = z("hasPermission"), X = z("loading");
      return p(), he("div", we, [
        h("div", ve, [
          t($, {
            inline: !0,
            model: s.value,
            class: "demo-form-inline",
            ref_key: "searchFormRef",
            ref: y
          }, {
            default: l(() => [
              t(I, { label: "插件名称" }, {
                default: l(() => [
                  t(T, {
                    modelValue: s.value.name,
                    "onUpdate:modelValue": n[0] || (n[0] = (o) => s.value.name = o),
                    placeholder: "请输入插件名称",
                    clearable: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              t(I, null, {
                default: l(() => [
                  V((p(), f(b, {
                    type: "primary",
                    onClick: g,
                    icon: u(Z)
                  }, {
                    default: l(() => [
                      m("查询")
                    ]),
                    _: 1
                  }, 8, ["icon"])), [
                    [x, ["admin:plugin:query"]]
                  ]),
                  t(b, {
                    icon: u(R),
                    onClick: U
                  }, {
                    default: l(() => [
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
        t(H, {
          gutter: 10,
          class: "mb8"
        }, {
          default: l(() => [
            t(q, { span: 1.5 }, {
              default: l(() => [
                V((p(), f(b, {
                  icon: u(ee),
                  type: "primary",
                  plain: "",
                  onClick: M
                }, {
                  default: l(() => [
                    m("安装插件")
                  ]),
                  _: 1
                }, 8, ["icon"])), [
                  [x, ["admin:plugin:install"]]
                ])
              ]),
              _: 1
            }),
            h("div", be, [
              t(b, {
                icon: u(R),
                circle: "",
                onClick: g
              }, null, 8, ["icon"])
            ])
          ]),
          _: 1
        }),
        h("div", ye, [
          V((p(), f(K, {
            data: u(i),
            style: { width: "100%", height: "100%" },
            "row-key": "id"
          }, {
            default: l(() => [
              t(c, {
                label: "序号",
                "min-width": "80",
                type: "index"
              }),
              t(c, {
                prop: "name",
                label: "插件名称",
                "min-width": "150"
              }),
              t(c, {
                prop: "desc",
                label: "描述信息",
                "min-width": "200"
              }),
              t(c, {
                prop: "version",
                label: "版本",
                "min-width": "80"
              }),
              t(c, {
                prop: "status",
                label: "状态",
                width: "100"
              }, {
                default: l((o) => [
                  o.row.status === 1 ? (p(), f(P, {
                    key: 0,
                    class: "ml-2",
                    type: "success"
                  }, {
                    default: l(() => [
                      m("已启用")
                    ]),
                    _: 1
                  })) : (p(), f(P, {
                    key: 1,
                    class: "ml-2",
                    type: "danger"
                  }, {
                    default: l(() => [
                      m("已禁用")
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              t(c, {
                prop: "author",
                label: "作者",
                "min-width": "150"
              }),
              t(c, {
                prop: "website",
                label: "作者网站",
                "min-width": "150"
              }, {
                default: l((o) => [
                  h("a", {
                    href: o.row.website,
                    target: "_blank"
                  }, L(o.row.website), 9, Ve)
                ]),
                _: 1
              }),
              t(c, {
                prop: "email",
                label: "联系方式",
                "min-width": "150"
              }),
              t(c, {
                prop: "createTime",
                label: "安装时间",
                "min-width": "150"
              }, {
                default: l((o) => [
                  h("span", null, L(u(ue)(o.row.createTime)), 1)
                ]),
                _: 1
              }),
              t(c, {
                label: "操作",
                width: "140",
                fixed: "right"
              }, {
                default: l((o) => [
                  o.row.status === 0 ? V((p(), f(b, {
                    key: 0,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(te),
                    onClick: (B) => G(o.row)
                  }, {
                    default: l(() => [
                      m("启用")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [x, ["admin:plugin:enable"]]
                  ]) : A("", !0),
                  o.row.status === 1 ? V((p(), f(b, {
                    key: 1,
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(ne),
                    onClick: (B) => F(o.row)
                  }, {
                    default: l(() => [
                      m("禁用")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [x, ["admin:plugin:disable"]]
                  ]) : A("", !0),
                  V((p(), f(b, {
                    size: "small",
                    type: "primary",
                    link: "",
                    icon: u(le),
                    onClick: (B) => j(o.row)
                  }, {
                    default: l(() => [
                      m("卸载")
                    ]),
                    _: 2
                  }, 1032, ["icon", "onClick"])), [
                    [x, ["admin:plugin:uninstall"]]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["data"])), [
            [X, u(_)]
          ]),
          t(J, {
            "current-page": s.value.pageNo,
            "onUpdate:currentPage": n[1] || (n[1] = (o) => s.value.pageNo = o),
            "page-size": s.value.pageSize,
            "onUpdate:pageSize": n[2] || (n[2] = (o) => s.value.pageSize = o),
            "page-sizes": [10, 20, 30, 50],
            layout: "total,sizes,prev, pager, next, jumper",
            background: "",
            small: "",
            onChange: g,
            total: s.value.total
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        t(W, {
          modelValue: u(w),
          "onUpdate:modelValue": n[3] || (n[3] = (o) => fe(w) ? w.value = o : w = o),
          title: "安装插件",
          width: "500px",
          draggable: ""
        }, {
          default: l(() => [
            t(Q, {
              class: "upload-demo",
              drag: "",
              ref_key: "uploadRef",
              ref: E,
              accept: "application/zip",
              "on-success": D,
              "on-error": O,
              headers: u(v),
              action: u(S) + "/api/auth/plugins/installPlugin"
            }, {
              tip: l(() => [
                xe
              ]),
              default: l(() => [
                t(Y, { class: "el-icon--upload" }, {
                  default: l(() => [
                    t(u(oe))
                  ]),
                  _: 1
                }),
                ke
              ]),
              _: 1
            }, 8, ["headers", "action"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
export {
  Ce as default
};
