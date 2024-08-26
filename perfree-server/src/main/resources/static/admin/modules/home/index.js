(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".panelBox[data-v-f72b23e6]{background:var(--el-bg-color);padding:15px;border-radius:5px;margin-bottom:15px;width:calc(100% - 30px)}.shortcuts-item[data-v-f72b23e6]{text-align:center;margin-top:15px}.shortcuts-item-name[data-v-f72b23e6]{font-size:14px;margin-top:5px}.loginBoxRight[data-v-f72b23e6]{padding-left:10px}.loginBoxRight[data-v-f72b23e6] .title[data-v-f72b23e6]{padding-top:5px;font-size:18px;font-weight:600;color:var(--el-text-color-primary)}.loginBoxRight[data-v-f72b23e6] .welcome[data-v-f72b23e6]{padding-top:5px}[data-v-f72b23e6] .my-label{background:var(--el-bg-color)!important}.panelTitle[data-v-f72b23e6]{font-size:14px;border-bottom:1px solid var(--el-border-color-light);padding-bottom:10px}.link-ul[data-v-f72b23e6]{list-style:none;padding:0;margin:0}.link-ul[data-v-f72b23e6] li[data-v-f72b23e6]{line-height:30px}.link-ul[data-v-f72b23e6] li[data-v-f72b23e6] .el-link[data-v-f72b23e6]{width:100%;justify-content:left}[data-v-f72b23e6] .el-link__inner{padding-left:5px}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
const m = /* @__PURE__ */ Object.assign({ "./view/Home.vue": () => import("./Home-view.js") }), u = (r) => ({
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
