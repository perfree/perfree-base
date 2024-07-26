import Axios from "axios";
import axios_config from "./axios_config";
import { ElMessage } from 'element-plus'
import {CONSTANTS} from "../utils/constants.js";
const axios = Axios.create(axios_config);

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
      let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
      if (token_info) {
          token_info = JSON.parse(token_info);
          config.headers["Authorization"] = "Bearer " + token_info.accessToken;
      }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  function(response) {
      if (response.status === 200) {
          if (response.data.code === 401) {
              ElMessage.error("登录状态已过期，请重新登陆")
              localStorage.removeItem(CONSTANTS.STORAGE_TOKEN);
              window.location.href = "/login";
          }
          if (response.data.code === 403) {
              ElMessage.error(response.data.msg)
              return Promise.reject(new Error(response.data.msg));
          }
          return response.data;
      }
      ElMessage.error('错误信息')
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
