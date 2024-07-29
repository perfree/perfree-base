export function extraPageApi(data) {
    return axios.post('/api/auth/extra/page', data);
}

export function extraGetApi(id) {
    return axios.get('/api/auth/extra/get?id=' + id);
}

export function extraAddApi(data){
    return axios.post('/api/auth/extra/add', data);
}

export function extraUpdateApi(data){
    return axios.post('/api/auth/extra/update', data);
}

export function extraDelApi(id) {
    return axios.delete('/api/auth/extra/del?id=' + id);
}