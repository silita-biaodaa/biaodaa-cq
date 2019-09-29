import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = axios
axios.defaults.retry = 4;//重复请求次数
axios.defaults.retryDelay = 1000;//重复请求间隔
axios.defaults.baseURL = process.env.API_HOST;