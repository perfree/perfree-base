import { g as I, h as B, a as P } from "./lib/codegen.js";
import { F as r } from "./lib/@fortawesome.js";
import { T as R } from "./lib/vue-codemirror.js";
import { F as L, G as S } from "./lib/@codemirror.js";
import { _ as G } from "./lib/_plugin-vue_export-helper.js";
const t = window.Vue.unref, o = window.Vue.openBlock, i = window.Vue.createBlock;
window.Vue.createCommentVNode;
const q = window.Vue.toDisplayString, x = window.Vue.createElementVNode, _ = window.Vue.resolveComponent, d = window.Vue.withCtx, h = window.Vue.createVNode, M = window.Vue.resolveDirective, C = window.Vue.withDirectives, z = window.Vue.createElementBlock;
window.Vue.pushScopeId;
window.Vue.popScopeId;
const A = { class: "page" }, K = { class: "custom-tree-node" }, a = window.Vue.ref, T = window.ElementPlus.ElMessage, O = window.VueRouter.useRoute, U = {
  __name: "CodeGenPreview",
  setup(H) {
    const v = O();
    let y = a([]), u = a(!0), f = a(!0);
    const F = {
      children: "children",
      label: "fileName"
    };
    let p = a([]), b = a({});
    const V = a(), w = a(""), E = [L(), S], N = ["java", "js", "css", "html", "json", "yaml", "less", "scss", "txt", "md", "vue", "xml", "sql"];
    function j() {
      u.value = !0, I(v.params.id).then((e) => {
        if (e.code === 200) {
          let n = null;
          e.data.forEach((s) => {
            s.fileType !== "dir" && n === null && (n = s, p.value = [s.id]);
          }), y.value = B(e.data, "id", "pid", "children", "-1"), k(n);
        } else
          T.error(e.msg);
        u.value = !1;
      });
    }
    function k(e) {
      if (e.fileType === "dir" || N.findIndex((l) => l === e.fileType) < 0)
        return;
      let s = {
        tableId: v.params.id,
        path: e.filePath
      };
      f.value = !0, P(s).then((l) => {
        l.code === 200 ? (p.value = [e.id], w.value = l.data, b.value = e, V.value.setCheckedKeys([e.id], !0)) : T.error(l.msg), f.value = !1;
      });
    }
    return j(), (e, n) => {
      const s = _("el-tree"), l = _("el-col"), D = _("el-row"), g = M("loading");
      return o(), z("div", A, [
        h(D, { gutter: 20 }, {
          default: d(() => [
            C((o(), i(l, { span: 6 }, {
              default: d(() => [
                h(s, {
                  style: { width: "100%", "max-height": "700px", overflow: "auto" },
                  data: t(y),
                  props: F,
                  onNodeClick: k,
                  "node-key": "id",
                  "default-checked-keys": t(p),
                  "default-expand-all": "",
                  ref_key: "treeRef",
                  ref: V
                }, {
                  default: d(({ node: m, data: c }) => [
                    x("span", K, [
                      c.fileType === "dir" ? (o(), i(t(r), {
                        key: 0,
                        icon: "fa-regular fa-folder-open ",
                        class: "file-list-icon folder"
                      })) : c.fileType === "js" ? (o(), i(t(r), {
                        key: 1,
                        icon: "fa-brands fa-js-square",
                        class: "file-list-icon js"
                      })) : c.fileType === "html" ? (o(), i(t(r), {
                        key: 2,
                        icon: "fa-brands fa-html5 ",
                        class: "file-list-icon html"
                      })) : c.fileType === "css" || c.fileType === "less" || c.fileType === "scss" ? (o(), i(t(r), {
                        key: 3,
                        icon: "fa-brands fa-css3 ",
                        class: "file-list-icon css"
                      })) : c.fileType === "txt" ? (o(), i(t(r), {
                        key: 4,
                        icon: "fa-solid fa-text-height ",
                        class: "file-list-icon txt"
                      })) : (o(), i(t(r), {
                        key: 5,
                        icon: "fa-regular fa-file ",
                        class: "file-list-icon"
                      })),
                      x("span", null, q(m.label), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["data", "default-checked-keys"])
              ]),
              _: 1
            })), [
              [g, t(u)]
            ]),
            C((o(), i(l, { span: 18 }, {
              default: d(() => [
                h(t(R), {
                  modelValue: w.value,
                  "onUpdate:modelValue": n[0] || (n[0] = (m) => w.value = m),
                  placeholder: "请选择左侧要编辑的文件...",
                  style: { height: "700px" },
                  autofocus: !0,
                  "indent-with-tab": !0,
                  "tab-size": 2,
                  extensions: E
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            })), [
              [g, t(f)]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
}, Z = /* @__PURE__ */ G(U, [["__scopeId", "data-v-c5b497c7"]]);
export {
  Z as default
};
