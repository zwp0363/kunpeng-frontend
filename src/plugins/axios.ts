// Add a request interceptor
import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    // 请求发送前的处理
    return config;
  },
  function (error) {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("响应", response);
    // 2xx 状态码范围内的响应处理
    return response;
  },
  function (error) {
    // 非 2xx 状态码范围内的响应错误处理
    return Promise.reject(error);
  }
);
