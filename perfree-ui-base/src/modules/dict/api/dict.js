export function dictPageApi(data) {
    return axios.post('/api/auth/dict/page', data);
}

export function dictAddApi(data){
    return axios.post('/api/auth/dict/add', data);
}

export function dictUpdateApi(data){
    return axios.post('/api/auth/dict/update', data);
}

export function dictDelApi(id) {
    return axios.delete('/api/auth/dict/del?id=' + id);
}

export function dictGetApi(id) {
    return axios.get('/api/auth/dict/get?id=' + id);
}

export function queryListAllApi(dictType, dictName) {
    return axios.get('/api/auth/dict/queryListAll?dictType=' + dictType + '&dictName=' + dictName);
}

