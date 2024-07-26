export function menuPageApi(data) {
    return axios.post('/api/auth/menu/page', data);
}