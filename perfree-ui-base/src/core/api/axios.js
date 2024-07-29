import Axios from "axios";
import axios_config from "./axios_config";
import {ElMessage, ElMessageBox} from 'element-plus'
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
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  function(response) {
      if (response.status === 200) {
          if (response.data.code === 401) {
              ElMessageBox.confirm('登录状态已过期，是否重新登陆?', '提示', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
              }).then(() => {
                  localStorage.removeItem(CONSTANTS.STORAGE_TOKEN);
                  window.location.href = "/login";
              }).catch(() => {})
          }
          if (response.data.code === 403) {
              ElMessage.error(response.data.msg)
              return Promise.reject(new Error(response.data.msg));
          }
          if (response.data.code === 500) {
              ElMessage.error(response.data.msg)
              return Promise.reject(new Error(response.data.msg));
          }
          return response.data;
      }
      ElMessage.error('错误信息')
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default axios;
