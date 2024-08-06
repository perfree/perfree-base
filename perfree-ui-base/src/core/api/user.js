export function getUserApi(id) {
    return axios.get('/api/auth/user/get?id=' + id);
}