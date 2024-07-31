export function userPageApi(data) {
    return axios.post('/api/auth/user/page', data);
}

export function getUserApi(id) {
    return axios.get('/api/auth/user/get?id=' + id);
}

export function addUserApi(data){
    return axios.post('/api/auth/user/add', data);
}

export function updateUserApi(data){
    return axios.post('/api/auth/user/update', data);
}
export function delUserApi(id) {
    return axios.delete('/api/auth/user/del?id=' + id);
}


export function updateUserRoleApi(data) {
    return axios.post('/api/auth/user/updateUserRole', data);
}

export function getUserRoleApi(id) {
    return axios.get('/api/auth/user/getUserRole?id=' + id);
}


export function resetPasswordApi(data) {
    return axios.post('/api/auth/user/resetPassword', data);
}

export async function exportExcelApi(data) {
    try {
        const response = await axios.post('/api/auth/user/export', data, {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '用户数据.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('下载 Excel 文件失败', error);
    }
}
