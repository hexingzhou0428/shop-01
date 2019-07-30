// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'
import Users from './components/users/Users.vue'
import Roles from './components/roles/Roles.vue'
import Rights from './components/rights/Rights.vue'
// 安装
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }

  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // 判断是不是登录页
  if (to.path === '/login') {
    next()
  } else {
    // 判断是否已经登陆
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
// 导出并挂载
export default router
