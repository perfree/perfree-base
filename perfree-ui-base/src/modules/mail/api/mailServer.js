export function mailServerPageApi(data) {
    return axios.post('/api/auth/mailServer/page', data);
}

export function mailServerAddApi(data){
    return axios.post('/api/auth/mailServer/add', data);
}

export function mailServerUpdateApi(data){
    return axios.post('/api/auth/mailServer/update', data);
}

export function mailServerDelApi(id) {
    return axios.delete('/api/auth/mailServer/del?id=' + id);
}

export function mailServerGetApi(id) {
    return axios.get('/api/auth/mailServer/get?id=' + id);
}

export function mailServerListAllApi() {
    return axios.get('/api/auth/mailServer/listAll');
}

export function mailServerExportExcelApi(data) {
    return axios.post('/api/auth/mailServer/export', data, {responseType: 'blob'});
}