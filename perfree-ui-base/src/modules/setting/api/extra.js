export function extraGetByKeyApi(extraKey) {
    return axios.get('/api/auth/extra/getByKey?extraKey=' + extraKey);
}
