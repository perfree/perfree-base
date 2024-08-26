const u = /* @__PURE__ */ Object.assign({ "./view/PluginView.vue": () => import("./PluginView-view.js") }), r = (m) => ({
  router: (o, n) => {
    let t = [];
    for (let e of o)
      e.url && e.component && t.push({
        name: e.componentName,
        path: e.url,
        component: u[`.${e.component}.vue`],
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
  r as default
};
