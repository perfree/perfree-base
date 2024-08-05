export function pluginDemoPageApi(data) {
    return axios.post('/api/auth/pluginDemo/page', data);
}

export function pluginDemoAddApi(data){
    return axios.post('/api/auth/pluginDemo/add', data);
}

export function pluginDemoUpdateApi(data){
    return axios.post('/api/auth/pluginDemo/update', data);
}

export function pluginDemoDelApi(id) {
    return axios.delete('/api/auth/pluginDemo/del?id=' + id);
}

export function pluginDemoGetApi(id) {
    return axios.get('/api/auth/pluginDemo/get?id=' + id);
}

export function pluginDemoListAllApi() {
    return axios.get('/api/auth/pluginDemo/listAll');
}

export function pluginDemoExportExcelApi(data) {
    return axios.post('/api/auth/pluginDemo/export', data, {responseType: 'blob'});
}