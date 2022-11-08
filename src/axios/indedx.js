import axios from "axios"
import store from "@/store/indedx"

export const url = "http://81.68.121.52:8000/"

const http = axios.create ({
    baseURL: url,
    timeout:5000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // console.log(config);
    config.headers['authorization'] = `Bearer ${store.state.token}`;
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  export default http