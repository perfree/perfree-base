import axios_config from "@/core/api/axios_config.js";

/**
 * 导入开发环境模块
 * @param moduleInfo 模块信息
 * @param name 模块名称
 * @returns {Promise<*>}
 */
export default (moduleInfo, name) => {
    const timeout = 3000; // 超时时间，单位为毫秒

    // 创建一个超时 Promise
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Import timed out')), timeout)
    );

    let importPromise;
    if (moduleInfo.pluginId && moduleInfo.pluginIsDev) {
        importPromise = import(/* @vite-ignore */`${moduleInfo.pluginFrontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index.js`)
    } else if (moduleInfo.pluginId) {
        importPromise = import(/* @vite-ignore */`/plugin-dev/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js`)
    } else {
        importPromise =import(/* @vite-ignore */`../../modules/${name}/index.js`)
    }
    return Promise.race([importPromise, timeoutPromise]);
};
