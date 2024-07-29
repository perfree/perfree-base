const modules = import.meta.glob('./view/*.vue');
export default module => {
    return {
        router: (menusRouter, moduleName) => {
            let router = [
                {
                    path: '/admin/codegen/editConfig/:id',
                    name: 'codeGenEditConfig',
                    component: modules[`./view/CodegenEditConfig.vue`],
                    meta: {
                        moduleName: moduleName,
                        title: "修改代码生成配置",
                        keepAlive: false
                    }
                },
                {
                    path: '/admin/codegen/preview/:id',
                    name: 'codeGenPreview',
                    component: modules[`./view/CodeGenPreview.vue`],
                    meta: {
                        moduleName: moduleName,
                        title: "预览代码",
                        keepAlive: false
                    }
                },
            ];
            // 动态路由
            for (let item of menusRouter){
                if (item.url && item.component) {
                    router.push({
                        name: item.componentName,
                        path: item.url,
                        component: modules[`.${item.component}.vue`],
                        meta: {
                            moduleName: moduleName,
                            title: item.name,
                            keepAlive: true
                        }
                    });
                }
            }
            return router;
        },
    };
};