/**
 * 导入生产环境js
 * @param moduleInfo
 * @param name
 * @returns {Promise<unknown>}
 */

export default (moduleInfo, name) => {
    if (moduleInfo.pluginId && moduleInfo.pluginIsDev) {
        return import(/* @vite-ignore */`${moduleInfo.pluginFrontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index.js`)
    } else if (moduleInfo.pluginId) {
        return import(/* @vite-ignore */`/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js`)
    }
    return  import(/* @vite-ignore */`/modules/${name}/index.js`)
}
