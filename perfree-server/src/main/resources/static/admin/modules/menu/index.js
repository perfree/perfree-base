(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".el-icon-picker[data-v-39069776]{height:300px;overflow:hidden}.icon-panel[data-v-39069776]{height:256px;overflow-y:scroll;display:flex;justify-content:space-around;flex-wrap:wrap}.icon[data-v-39069776]{display:inline-block;width:20px;height:20px;color:var(--el-text-color-regular);font-size:20px;border-radius:4px;cursor:pointer;text-align:center;line-height:45px;margin:5px}.icon[data-v-39069776]:hover,.icon-active[data-v-39069776]{color:var(--el-color-primary)}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
const u = /* @__PURE__ */ Object.assign({ "./view/MenuView.vue": () => import("./MenuView-view.js") }), r = (m) => ({
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
