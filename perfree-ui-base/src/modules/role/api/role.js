export function rolePageApi(data) {
    return axios.post('/api/auth/role/page', data);
}

export function roleGetRoleApi(id) {
    return axios.get('/api/auth/role/get?id=' + id);
}

export function roleAddOrUpdateApi(data){
    return axios.post('/api/auth/role/addOrUpdate', data);
}

export function roleDelApi(id) {
    return axios.delete('/api/auth/role/del?id=' + id);
}