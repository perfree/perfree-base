export function menuGetApi(id) {
    return axios.get('/api/auth/menu/get?id=' + id);
}
