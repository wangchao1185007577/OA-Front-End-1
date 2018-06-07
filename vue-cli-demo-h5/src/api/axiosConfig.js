import axios from 'axios';
import * as config from '../common/js/config'
import Vue from 'vue'
import router from '../routes'

let http = axios.create({
    baseURL: config.default.ApiUrl,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});
// 添加一个请求拦截器
http.interceptors.request.use(function(reconfig) {
    return reconfig;
}, function(error) {
    return Promise.reject(error);
});

// 添加一个响应拦截器
http.interceptors.response.use(function(response) {
    if (response.status != "200") {} else {
        return response.data;
    }
    return response;
}, function(error) {
    return Promise.reject(error);
});


export default http;