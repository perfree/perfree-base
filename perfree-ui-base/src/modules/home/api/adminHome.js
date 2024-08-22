
export function getServerInfoApi() {
    return axios.get('/api/auth/adminHome/getServerInfo');
}

export function getHomeStatisticApi() {
    return axios.get('/api/auth/adminHome/getHomeStatistic');
}

