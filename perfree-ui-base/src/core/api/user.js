export function getUserApi(id) {
    return axios.get('/api/auth/user/get?id=' + id);
}

export function updateProfileApi(data){
    return axios.post('/api/auth/user/updateProfile', data);
}

export function updatePasswordApi(data){
    return axios.post('/api/auth/user/updatePassword', data);
}
