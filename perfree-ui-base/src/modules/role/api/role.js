export function rolePageApi(data) {
    return axios.post('/api/auth/role/page', data);
}

export function roleGetRoleApi(id) {
    return axios.get('/api/auth/role/get?id=' + id);
}

export function roleAddApi(data){
    return axios.post('/api/auth/role/add', data);
}

export function roleUpdateApi(data){
    return axios.post('/api/auth/role/update', data);
}

export function roleDelApi(id) {
    return axios.delete('/api/auth/role/del?id=' + id);
}