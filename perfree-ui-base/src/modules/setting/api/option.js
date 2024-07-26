export function saveOptionListApi(data) {
    return axios.post('/api/auth/option/saveOptionList', data);
}

export function getOptionByIdentificationApi(identification) {
    return axios.get('/api/auth/option/getOptionByIdentification?identification=' + identification);
}

