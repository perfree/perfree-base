const m = /* @__PURE__ */ Object.assign({ "./view/SettingView.vue": () => import("./SettingView-view.js") }), u = (r) => ({
  router: (o, n) => {
    let t = [];
    for (let e of o)
      e.url && e.component && t.push({
        name: e.componentName,
        path: e.url,
        component: m[`.${e.component}.vue`],
        meta: {
          moduleName: n,
          title: e.name,
          keepAlive: !0
        }
      });
    return t;
  }
});
export {
  u as default
};
