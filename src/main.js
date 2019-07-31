import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
// 全局引入axios
import axios from 'axios'
// 设置基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 设置axios到Vue的原型上，解决每次使用axios需要引用的问题
Vue.prototype.$axios = axios
// 设置拦截器，解决每次请求需要携带令牌的问题
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
