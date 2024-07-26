export function attachConfigPageApi(data) {
    return axios.post('/api/auth/attachConfig/page', data);
}


export function attachConfigAddApi(data) {
    return axios.post('/api/auth/attachConfig/add', data);
}

export function attachConfigUpdateApi(data) {
    return axios.put('/api/auth/attachConfig/update', data);
}

export function getAttachConfigApi(id) {
    return axios.get('/api/auth/attachConfig/get?id=' + id);
}

export function attachConfigUpdateMasterApi(data){
    return axios.put('/api/auth/attachConfig/updateMaster', data);
}

export function attachConfigDelApi(id) {
    return axios.delete('/api/auth/attachConfig/del?id=' + id);
}

export function getAllAttachConfigApi() {
    return axios.get('/api/auth/attachConfig/getAll');
}