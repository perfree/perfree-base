export function codegenGetTableList(data) {
    return axios.post('/api/auth/codegen/getTableList', data);
}

export function createCodegenList(data) {
    return axios.post('/api/auth/codegen/create-list', data);
}

export function codegenTablePage(data) {
    return axios.post('/api/auth/codegen/codegenTablePage', data);
}

export function getCodegenInfoByTableId(tableId) {
    return axios.get('/api/auth/codegen/getCodegenInfoByTableId?tableId=' + tableId);
}

export function saveConfig(data) {
    return axios.post('/api/auth/codegen/saveConfig', data);
}

export function getCodeFileList(id) {
    return axios.get('/api/auth/codegen/getCodeFileList?tableId=' + id);
}

export function getCodeFileContent(data) {
    return axios.post('/api/auth/codegen/getCodeFileContent', data);
}

export function delCodegenList(id) {
    return axios.delete('/api/auth/codegen/del?id=' + id);
}

export function downloadApi(id) {
    return axios.get('/api/auth/codegen/download?id=' + id, {responseType: 'blob'});
}
