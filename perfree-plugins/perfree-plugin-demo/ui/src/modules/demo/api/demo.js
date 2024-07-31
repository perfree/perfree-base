export function demoPageApi(data) {
    return axios.post('/api/auth/plugin-demo/demo/page', data);
}

export function addDemoApi(data){
    return axios.post('/api/auth/plugin-demo/demo/add', data);
}

export function updateDemoApi(data){
    return axios.put('/api/auth/plugin-demo/demo/update', data);
}

export function delDemoApi(id) {
    return axios.delete('/api/auth/plugin-demo/demo/del?id=' + id);
}

export function getDemoApi(id) {
    return axios.get('/api/auth/plugin-demo/demo/get?id=' + id);
}