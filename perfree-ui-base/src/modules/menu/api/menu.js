export function menuPageApi(data) {
    return axios.post('/api/auth/menu/page', data);
}


export function menuGetApi(id) {
    return axios.get('/api/auth/menu/get?id=' + id);
}

export function menuAddApi(data) {
    return axios.post('/api/auth/menu/add', data);
}

export function menuUpdateApi(data) {
    return axios.post('/api/auth/menu/update', data);
}

export function menuDelApi(id) {
    return axios.delete('/api/auth/menu/del?id=' + id);
}

export function getRoleMenusApi(id) {
    return axios.get('/api/auth/role/getRoleMenus?id=' + id);
}

export function assignRoleMenuApi(data) {
    return axios.post('/api/auth/role/assignRoleMenu', data);
}

export function menuListApi(data) {
    return axios.post('/api/auth/menu/list', data);
}