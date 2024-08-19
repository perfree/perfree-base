export function pluginsPageApi(data) {
    return axios.post('/api/auth/plugins/page', data);
}


export function disablePluginApi(pluginId) {
    return axios.post('/api/auth/plugins/disablePlugin?pluginId=' + pluginId);
}

export function enablePluginApi(pluginId) {
    return axios.post('/api/auth/plugins/enablePlugin?pluginId=' + pluginId);
}

export function uninstallPluginApi(pluginId) {
    return axios.post('/api/auth/plugins/uninstallPlugin?pluginId=' + pluginId);
}
