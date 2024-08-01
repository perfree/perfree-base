export function dictDataPageApi(data) {
    return axios.post('/api/auth/dictData/page', data);
}

export function dictDataAddApi(data){
    return axios.post('/api/auth/dictData/add', data);
}

export function dictDataUpdateApi(data){
    return axios.post('/api/auth/dictData/update', data);
}

export function dictDataDelApi(id) {
    return axios.delete('/api/auth/dictData/del?id=' + id);
}

export function dictDataGetApi(id) {
    return axios.get('/api/auth/dictData/get?id=' + id);
}