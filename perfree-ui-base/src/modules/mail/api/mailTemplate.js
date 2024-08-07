export function mailTemplatePageApi(data) {
    return axios.post('/api/auth/mailTemplate/page', data);
}

export function mailTemplateAddApi(data){
    return axios.post('/api/auth/mailTemplate/add', data);
}

export function mailTemplateUpdateApi(data){
    return axios.post('/api/auth/mailTemplate/update', data);
}

export function mailTemplateDelApi(id) {
    return axios.delete('/api/auth/mailTemplate/del?id=' + id);
}

export function mailTemplateGetApi(id) {
    return axios.get('/api/auth/mailTemplate/get?id=' + id);
}

export function mailTemplateListAllApi() {
    return axios.get('/api/auth/mailTemplate/listAll');
}

export function mailTemplateExportExcelApi(data) {
    return axios.post('/api/auth/mailTemplate/export', data, {responseType: 'blob'});
}