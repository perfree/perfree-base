export function attachPageApi(data) {
    return axios.post('/api/auth/attach/page', data);
}

export function getAllAttachGroupApi() {
    return axios.get('/api/auth/attach/getAllAttachGroup');
}

export function attachUpdateApi(data) {
    return axios.put('/api/auth/attach/update', data);
}

export function getAttachApi(id) {
    return axios.get('/api/auth/attach/get?id=' + id);
}

export function attachDelApi(id) {
    return axios.delete('/api/auth/attach/del?id=' + id);
}

export function attachDownloadApi(id) {
    return axios.delete('/api/auth/role/del?id=' + id);
}