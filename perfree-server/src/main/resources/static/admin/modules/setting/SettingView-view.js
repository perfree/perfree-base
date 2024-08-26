import { F as y } from "./lib/@form-create.js";
function x(s) {
  return axios.get("/api/auth/extra/getByKey?extraKey=" + s);
}
function B(s) {
  return axios.post("/api/auth/option/saveOptionList", s);
}
function k(s) {
  return axios.get("/api/auth/option/getOptionByIdentification?identification=" + s);
}
const h = window.Vue.unref, O = window.Vue.createVNode, S = window.Vue.resolveComponent, v = window.Vue.openBlock, D = window.Vue.createBlock, N = window.Vue.createCommentVNode, C = window.Vue.resolveDirective, E = window.Vue.createElementBlock, A = window.Vue.withDirectives, R = { class: "page" }, r = window.ElementPlus.ElMessage, l = window.Vue.ref, F = {
  __name: "SettingView",
  setup(s) {
    const u = l({}), p = l({}), d = l({}), f = l([]), m = l(!1), a = l(!0);
    function w() {
      x("system_setting").then((e) => {
        if (e.code === 200) {
          if (!e.data) {
            m.value = !0, a.value = !1;
            return;
          }
          d.value = JSON.parse(e.data.extraData).option, d.value.onSubmit = _, f.value = JSON.parse(e.data.extraData).rule, g();
        } else
          r.error(e.msg), a.value = !1;
      });
    }
    function g() {
      k("system_setting").then((e) => {
        e.code === 200 ? p.value = e.data.reduce((n, { key: i, value: t }) => {
          const o = u.value.getRule(i);
          return o && (o.type === "select" && o.props.multiple && t ? n[i] = t.split(",") : n[i] = t), n;
        }, {}) : r.success(e.msg), a.value = !1;
      });
    }
    function _(e) {
      a.value = !0;
      const n = Object.keys(e);
      let i = {
        options: []
      };
      for (let t of n) {
        let o = e[t];
        const c = u.value.getRule(t);
        if (!c)
          continue;
        c.type === "select" && c.props.multiple && o && (o = o.join(","));
        let V = {
          key: t,
          value: o,
          title: c.title,
          identification: "system_setting"
        };
        i.options.push(V);
      }
      B(i).then((t) => {
        t.code === 200 ? r.success("保存成功") : r.success(t.msg), a.value = !1;
      });
    }
    return w(), (e, n) => {
      const i = S("el-empty"), t = C("loading");
      return A((v(), E("div", R, [
        O(h(y), {
          modelValue: p.value,
          "onUpdate:modelValue": n[0] || (n[0] = (o) => p.value = o),
          api: u.value,
          "onUpdate:api": n[1] || (n[1] = (o) => u.value = o),
          rule: f.value,
          option: d.value
        }, null, 8, ["modelValue", "api", "rule", "option"]),
        m.value ? (v(), D(i, {
          key: 0,
          description: "当前主题无设置项"
        })) : N("", !0)
      ])), [
        [t, a.value]
      ]);
    };
  }
};
export {
  F as default
};
