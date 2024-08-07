export function mailLogPageApi(data) {
    return axios.post('/api/auth/mailLog/page', data);
}

export function mailLogAddApi(data){
    return axios.post('/api/auth/mailLog/add', data);
}

export function mailLogUpdateApi(data){
    return axios.post('/api/auth/mailLog/update', data);
}

export function mailLogDelApi(id) {
    return axios.delete('/api/auth/mailLog/del?id=' + id);
}

export function mailLogGetApi(id) {
    return axios.get('/api/auth/mailLog/get?id=' + id);
}

export function mailLogListAllApi() {
    return axios.get('/api/auth/mailLog/listAll');
}

export function mailLogExportExcelApi(data) {
    return axios.post('/api/auth/mailLog/export', data, {responseType: 'blob'});
}