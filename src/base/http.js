import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = axios
axios.defaults.retry = 4;//重复请求次数
axios.defaults.retryDelay = 1000;//重复请求间隔
axios.defaults.timeout =  6000;//6秒超时
axios.defaults.baseURL = process.env.API_HOST;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    if(!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if(config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function() {
        return axios(config);
    });
});