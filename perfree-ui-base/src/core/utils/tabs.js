import {useAppStore} from "@/core/stores/appStore.js";

export let tabsData = [{ name: '首页', hasClose: false, path: '/admin', currActive: true }]

/**
 * 前往某个页面
 * @param name
 * @param path
 * @param params
 */
export function toPage(name, path, params) {
    if (name) {
        let index = tabsData.findIndex((tab) => tab.path === path)
        if (index < 0) {
            tabsData.push({
                name: name, hasClose: true, path: path, currActive: false
            });
        }
    }
    router.push({
        path: path,
        params: params
    })
}

/**
 * 关闭tab
 * @param path
 */
export function closeTab(path) {
    let index = tabsData.findIndex((tab) => tab.path === path)
    if (index >= 0) {
        tabsData.splice(index, 1)
    }
}

/**
 * 清除tab
 */
export function clearTabs() {
    const appStore = useAppStore()
    appStore.setActiveTab(null);
    tabsData = [{ name: '首页', hasClose: false, path: '/admin', currActive: true }]
}