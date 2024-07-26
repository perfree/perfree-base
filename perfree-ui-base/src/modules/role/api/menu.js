export function getRoleMenusApi(id) {
    return axios.get('/api/auth/role/getRoleMenus?id=' + id);
}

export function assignRoleMenuApi(data) {
    return axios.post('/api/auth/role/assignRoleMenu', data);
}

export function menuListApi(data) {
    return axios.post('/api/auth/menu/list', data);
}