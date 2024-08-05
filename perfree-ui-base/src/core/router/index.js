
// 创建一个路由器实例
import {createRouter, createWebHistory} from "vue-router";
import Layout from "../layout/Layout.vue";
import NProgress from 'nprogress'
import {CONSTANTS} from "@/core/utils/constants.js";
import LoginView from "@/core/views/login/LoginView.vue";
import {useCommonStore} from "@/core/stores/commonStore.js";
import {menus} from "@/core/data/menuData.js";
import _import from "@/core/utils/_import.js";
import {getAllRouter, initMenu} from "@/core/utils/perfree.js";
import RegisterView from "@/core/views/register/RegisterView.vue";
import {userInfo} from "@/core/api/system.js";
import {listAllCacheApi} from "@/core/api/dictData.js";
import {useDictStore} from "@/core/stores/dictStore.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: 'admin',
            children: [
                {
                    path: '/admin/user/profile',
                    name: 'userProfile',
                    component: () => import('../views/userProfile/UserProfile.vue'),
                    meta: {
                        title: '个人中心',
                        keepAlive: true
                    }
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register/RegisterView.vue')
        },
    ],
});

// router加载完毕
router.afterEach(() => {
    NProgress.done() // 进度条结束
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const commonStore = useCommonStore()
    NProgress.start();

    // 获取本地token,判断是否存在
    let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
    if (token_info) {
        token_info = JSON.parse(token_info);
    }
    if (!token_info || !token_info.accessToken || token_info.accessToken === '') {
        if (to.path === '/login' || to.path === '/register' ) {
            next();
            return;
        }
        next('/login');
        return;
    }
    // 如果已存在token,判断菜单是否已经初始化,如已初始化,进行路由跳转,反之初始化菜单
    if (commonStore.menuInit) {
        next();
        return;
    }
    initMenu().then(() => {
        let allRouter = [];
        getAllRouter(commonStore.menuList, allRouter);
        Promise.all([genRoute(allRouter)], initUserInfo(), initDict()).then(([r, s, d]) => {
            router.addRoute(  {
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: () => import('../views/404/404View.vue')
            })
            commonStore.setMenuInit(true);
            next({...to, replace: true});
        })
    });
});

function initDict() {
    const  useDict = useDictStore()
    return new Promise( (resolve, reject) => {
        listAllCacheApi().then(res => {
            useDict.setDictList(res.data);
            resolve();
        });
    });
}

function initUserInfo() {
    return new Promise( (resolve, reject) => {
        userInfo().then(r => {
            resolve()
            localStorage.setItem(CONSTANTS.STORAGE_USER_INFO, JSON.stringify(r.data))
        })
    });
}

// 生成路由
function genRoute(routes) {
    return new Promise(async (resolve, reject) => {
        const modules = routes.reduce((acc, menu) => {
            const componentPart = menu.moduleName;
            if (!acc[componentPart]) {
                acc[componentPart] = [];
            }
            acc[componentPart].push(menu);
            return acc;
        }, {});
        for (const moduleName in modules) {
            if (!moduleName) {
                continue
            }
            let moduleInfo = {
                moduleName: modules[moduleName][0].moduleName,
                pluginId: modules[moduleName][0].pluginId,
                pluginIsDev: modules[moduleName][0].pluginIsDev,
                pluginFrontDevAddress: modules[moduleName][0].pluginFrontDevAddress,
            }
            try{
                await _import(moduleInfo, moduleName).then(res => {
                    let moduleRouter = res.router(modules[moduleName], moduleName);
                    moduleRouter.forEach(r => {
                        router.addRoute("layout", r)
                    })
                })
            }catch (e){

            }
        }
        resolve()
    });
}


export default router;