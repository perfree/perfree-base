(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode(".panelBox[data-v-03afe36f]{background:var(--el-bg-color);padding:15px;border-radius:5px;margin-bottom:15px;width:calc(100% - 30px)}.shortcuts-item[data-v-03afe36f]{text-align:center;margin-top:15px}.shortcuts-item-name[data-v-03afe36f]{font-size:14px;margin-top:5px}.loginBoxRight[data-v-03afe36f]{padding-left:10px}.loginBoxRight[data-v-03afe36f] .title[data-v-03afe36f]{padding-top:5px;font-size:18px;font-weight:600;color:var(--el-text-color-primary)}.loginBoxRight[data-v-03afe36f] .welcome[data-v-03afe36f]{padding-top:5px}[data-v-03afe36f] .my-label{background:var(--el-bg-color)!important}.panelTitle[data-v-03afe36f]{font-size:14px;border-bottom:1px solid var(--el-border-color-light);padding-bottom:10px}.link-ul[data-v-03afe36f]{list-style:none;padding:0;margin:0}.link-ul[data-v-03afe36f] li[data-v-03afe36f]{line-height:30px}.link-ul[data-v-03afe36f] li[data-v-03afe36f] .el-link[data-v-03afe36f]{width:100%;justify-content:left}[data-v-03afe36f] .el-link__inner{padding-left:5px}")),document.head.appendChild(a)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
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
