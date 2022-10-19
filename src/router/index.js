import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

// 引入组件 用懒加载形式
const Login = () => import("@/views/Login/index.vue")//懒加载 优
const LayOut = () => import("@/layout/index.vue")//懒加载 优

const routes = [
    {
        path: "/",
        component: LayOut
    },
    {
        path: "/login",
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
