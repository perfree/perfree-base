export function attachPageApi(data) {
    return axios.post('/api/auth/attach/page', data);
}

export function getAllAttachGroupApi() {
    return axios.get('/api/auth/attach/getAllAttachGroup');
}

export function attachUpdateApi(data) {
    return axios.put('/apiv/attach/update', data);
}

export function getAttachApi(id) {
    return axios.get('/api/auth/attach/get?id=' + id);
}