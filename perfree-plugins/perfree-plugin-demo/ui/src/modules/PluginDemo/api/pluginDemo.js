export function pluginDemoPageApi(data) {
    return axios.post('/api/auth/pluginDemo/page', data);
}

export function pluginDemoAddApi(data){
    return axios.post('/api/auth/pluginDemo/add', data);
}

export function pluginDemoUpdateApi(data){
    return axios.post('/api/auth/pluginDemo/update', data);
}

export function pluginDemoDelApi(id) {
    return axios.delete('/api/auth/pluginDemo/del?id=' + id);
}

export function pluginDemoGetApi(id) {
    return axios.get('/api/auth/pluginDemo/get?id=' + id);
}

export function pluginDemoListAllApi() {
    return axios.get('/api/auth/pluginDemo/listAll');
}

export async function pluginDemoExportExcelApi(data) {
    try {
        const response = await axios.post('/api/auth/pluginDemo/export', data, {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '测试数据.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('下载 Excel 文件失败', error);
    }
}