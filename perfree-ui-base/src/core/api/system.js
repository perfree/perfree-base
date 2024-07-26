export function getCodeImg() {
    return axios.post('/api/captchaImage', {});
}

export function login(data) {
    return axios.post('/api/login', data);
}

export function menuAdminList() {
    return axios.get('/api/auth/menuAdminList');
}

export function userInfo() {
    return axios.get('/api/auth/userInfo');
}

export function getOptionByNoAuth() {
    return axios.get('/api/getOptionByNoAuth');
}

