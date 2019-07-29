// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
// 安装
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// 导出并挂载
export default router
