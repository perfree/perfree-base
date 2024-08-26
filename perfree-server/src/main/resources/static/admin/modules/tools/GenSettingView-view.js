import { a as M, l as B } from "./lib/@element-plus.js";
import { H as b, j as D } from "./lib/highlight.js.js";
import { u as U } from "./lib/@form-create.js";
import { _ as A } from "./lib/_plugin-vue_export-helper.js";
const T = {
  //插入菜单位置
  menu: "main",
  //图标
  icon: "icon-upload",
  //名称
  label: "附件选择输入",
  //id,唯一!
  name: "AttachSelectInput",
  //是否可以操作, 除了容器类组件建议为true !
  mask: !0,
  //支持组件验证, 值的类型
  validate: ["string"],
  //定义组件的事件
  event: ["change"],
  //定义组件的渲染规则
  rule({ t: v }) {
    return {
      type: "AttachSelectInput",
      //field不能重复!!!
      field: U(),
      title: "附件选择输入",
      info: "",
      $required: !1,
      props: {}
    };
  },
  //组件的属性配置
  props(v, { t: V }) {
    return [
      {
        type: "select",
        title: "文件类型",
        field: "attachType",
        options: [
          { label: "图片", value: "img" },
          { label: "视频", value: "video" },
          { label: "音频", value: "audio" },
          { label: "其他", value: "other" }
        ]
      },
      {
        type: "switch",
        title: "是否允许输入",
        field: "enableInput"
      },
      {
        type: "input",
        title: "提示内容",
        field: "placeholder"
      }
    ];
  }
}, r = window.Vue.unref, e = window.Vue.createVNode, d = window.Vue.resolveComponent, t = window.Vue.withCtx, c = window.Vue.createTextVNode, _ = window.Vue.isRef, m = window.Vue.createElementVNode, q = window.Vue.resolveDirective, z = window.Vue.withDirectives, G = window.Vue.openBlock, H = window.Vue.createElementBlock;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const L = { class: "page" }, P = { class: "dialog-footer" }, F = { class: "hljs" }, K = { class: "dialog-footer" }, Q = window.VueUse.useClipboard, w = window.ElementPlus.ElMessage, W = window.Vue.onMounted, p = window.Vue.ref, X = {
  __name: "GenSettingView",
  setup(v) {
    const { copy: V, isSupported: C } = Q({ legacy: !0 }), a = p();
    let s = p(!1), n = p(!1), g = p(""), f = p("");
    const J = p({
      //控制字段ID输入框能否输入
      fieldReadonly: !1,
      //隐藏所有子表单组件
      hiddenMenu: ["subform"]
      //隐藏输入框和密码输入框
      //hiddenItem: ['input','pasasword'],
    });
    function k() {
      s.value = !0, g.value = {
        option: a.value.getOption(),
        rule: a.value.getRule()
      };
    }
    function S() {
      n.value = !0;
    }
    function x() {
      const i = JSON.parse(f.value);
      a.value.setOption(i.option), a.value.setRule(i.rule), w.success("导入成功"), n.value = !1;
    }
    W(async () => {
      a.value.addComponent(T), b.registerLanguage("json", D);
    });
    const I = (i) => (i = JSON.stringify(i, null, 2), b.highlight("json", i, !0).value || "&nbsp;"), N = async () => {
      try {
        if (!C.value) {
          w.error("复制失败,可能浏览器不支持,请手动复制");
          return;
        }
        await V(JSON.stringify(g.value, null, 2) || ""), w.success("复制成功");
      } catch {
        w.error("复制失败,可能浏览器不支持,请手动复制");
      }
    };
    return (i, o) => {
      const h = d("el-icon"), u = d("el-button"), j = d("fc-designer"), E = d("el-input"), y = d("el-dialog"), O = d("el-scrollbar"), R = q("dompurify-html");
      return G(), H("div", L, [
        e(j, {
          ref_key: "designer",
          ref: a,
          height: "100%",
          config: J.value
        }, {
          handle: t(() => [
            e(u, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: S
            }, {
              default: t(() => [
                e(h, null, {
                  default: t(() => [
                    e(r(M))
                  ]),
                  _: 1
                }),
                c(" 导入 Json")
              ]),
              _: 1
            }),
            e(u, {
              size: "small",
              type: "primary",
              plain: "",
              onClick: k
            }, {
              default: t(() => [
                e(h, null, {
                  default: t(() => [
                    e(r(B))
                  ]),
                  _: 1
                }),
                c(" 生成 Json")
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["config"]),
        e(y, {
          modelValue: r(n),
          "onUpdate:modelValue": o[2] || (o[2] = (l) => _(n) ? n.value = l : n = l),
          title: "导入Json",
          width: "800px",
          draggable: ""
        }, {
          footer: t(() => [
            m("span", P, [
              e(u, {
                type: "primary",
                onClick: x
              }, {
                default: t(() => [
                  c("确 定")
                ]),
                _: 1
              }),
              e(u, {
                onClick: o[1] || (o[1] = (l) => _(n) ? n.value = !1 : n = !1)
              }, {
                default: t(() => [
                  c("关 闭")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            e(E, {
              modelValue: r(f),
              "onUpdate:modelValue": o[0] || (o[0] = (l) => _(f) ? f.value = l : f = l),
              style: { width: "100%" },
              rows: 10,
              type: "textarea",
              placeholder: "请输入或复制json内容"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        e(y, {
          modelValue: r(s),
          "onUpdate:modelValue": o[4] || (o[4] = (l) => _(s) ? s.value = l : s = l),
          title: "生成Json",
          width: "800px",
          draggable: ""
        }, {
          footer: t(() => [
            m("span", K, [
              e(u, {
                type: "primary",
                onClick: N
              }, {
                default: t(() => [
                  c("复制Json")
                ]),
                _: 1
              }),
              e(u, {
                onClick: o[3] || (o[3] = (l) => _(s) ? s.value = !1 : s = !1)
              }, {
                default: t(() => [
                  c("关 闭")
                ]),
                _: 1
              })
            ])
          ]),
          default: t(() => [
            e(O, { height: "580" }, {
              default: t(() => [
                m("div", null, [
                  m("pre", null, [
                    z(m("code", F, null, 512), [
                      [R, I(r(g))]
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
}, te = /* @__PURE__ */ A(X, [["__scopeId", "data-v-94f4c217"]]);
export {
  te as default
};
