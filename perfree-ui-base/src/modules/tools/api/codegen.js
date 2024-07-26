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
