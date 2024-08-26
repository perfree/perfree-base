(function(){"use strict";try{if(typeof document<"u"){var l=document.createElement("style");l.appendChild(document.createTextNode(`pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-keyword,.hljs-formula{color:#a626a4}.hljs-section,.hljs-name,.hljs-selector-tag,.hljs-deletion,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-string,.hljs-regexp,.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string{color:#50a14f}.hljs-attr,.hljs-variable,.hljs-template-variable,.hljs-type,.hljs-selector-class,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-number{color:#986801}.hljs-symbol,.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-title{color:#4078f2}.hljs-built_in,.hljs-title.class_,.hljs-class .hljs-title{color:#c18401}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
.file-list-icon[data-v-c5b497c7]{margin-right:5px}.file-list-icon.folder[data-v-c5b497c7],.file-list-icon.js[data-v-c5b497c7]{color:#ebd109}.file-list-icon.css[data-v-c5b497c7]{color:#eb6909}.file-list-icon.html[data-v-c5b497c7],.file-list-icon.txt[data-v-c5b497c7]{color:#09eb46}[data-v-c5b497c7] .ͼ1.cm-focused{outline:none!important}[data-v-c5b497c7] .ͼ1 .cm-scroller{font-family:Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,serif;font-size:14px}[data-v-c5b497c7] .el-tree-node.is-checked{background-color:var(--el-fill-color-darker)!important}.theme-editor-title[data-v-c5b497c7]{font-size:17px;margin:0;color:var(--el-text-color-regular)}.el-divider--horizontal[data-v-c5b497c7]{margin:15px 0}.theme-header-box[data-v-c5b497c7]{display:flex}
.page[data-v-94f4c217]{height:100%}pre[data-v-94f4c217],code[data-v-94f4c217]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}`)),document.head.appendChild(l)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
const i = /* @__PURE__ */ Object.assign({ "./view/CodeGenPreview.vue": () => import("./CodeGenPreview-view.js"), "./view/CodegenEditConfig.vue": () => import("./CodegenEditConfig-view.js"), "./view/CodegenView.vue": () => import("./CodegenView-view.js"), "./view/GenSettingView.vue": () => import("./GenSettingView-view.js") }), d = (m) => ({
  router: (o, t) => {
    let n = [
      {
        path: "/admin/codegen/editConfig/:id",
        name: "codeGenEditConfig",
        component: i["./view/CodegenEditConfig.vue"],
        meta: {
          moduleName: t,
          title: "修改代码生成配置",
          keepAlive: !1
        }
      },
      {
        path: "/admin/codegen/preview/:id",
        name: "codeGenPreview",
        component: i["./view/CodeGenPreview.vue"],
        meta: {
          moduleName: t,
          title: "预览代码",
          keepAlive: !1
        }
      }
    ];
    for (let e of o)
      e.url && e.component && n.push({
        name: e.componentName,
        path: e.url,
        component: i[`.${e.component}.vue`],
        meta: {
          moduleName: t,
          title: e.name,
          keepAlive: !0
        }
      });
    return n;
  }
});
export {
  d as default
};
