import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 引入组件 用懒加载形式
const Login = () => import("@/views/Login/index.vue")//懒加载 优
const LayOut = () => import("@/layout/index.vue")//懒加载 优

//Home
const Home = () => import("@/views/Home")
//Title
const Title = () => import("@/views/Title")
//Chapter
const Chapter = () => import("@/views/Chapter")
//Video
const Video = () => import("@/views/Video")
//Module
const Module = () => import("@/views/Model")
//Membership
// const Membership = () => import("@/views/Vip")
//Alipay
const Alipay = () => import("@/views/zfbOrder")
//WeChat
const WeChat = () => import("@/views/WxOrder")
//Logs
const Logs = () => import("@/views/Logs")
//User
const Profile = () => import("@/views/Profile")
//Manager
const Manager = () => import("@/views/Manager")
const ManagerInsert = () => import("@/views/Manager/insert")


const routes = [
    {
        path: "/",
        redirect:'/home',
        component: LayOut,
        children: [
            {
                path: "home",
                component: Home,
                meta:{
                    title:'首页'
                }
            }
        ]
    },
    {
        path: "/title",
        component: LayOut,
        children: [
            {
                path: "",
                component: Title,
                meta:{
                    title:'大标题管理'
                }
            }
        ]
    },
    {
        path: "/chapter",
        component: LayOut,
        children: [
            {
                path: "",
                component: Chapter,
                meta:{
                    title:'章节管理'
                }
            },
        ]
    },
    {
        path: "/video",
        component: LayOut,
        children: [
            {
                path: "",
                component: Video,
                meta:{
                    title:'视频管理'
                }
            }
        ]
    },
    {
        path: "/module",
        component: LayOut,
        children: [
            {
                path: "",
                component: Module,
                meta:{
                    title:'模块管理'
                }
            }
        ]
    },
    // {
    //     path: "/membership",
    //     component: LayOut,
    //     children: [
    //         {
    //             path: "",
    //             component: Membership,
    //             meta:{
    //                 title:'会员管理'
    //             }
    //         }
    //     ]
    // },
    {
        path: "/alipay",
        component: LayOut,
        children: [
            {
                path: "",
                component: Alipay,
                meta:{
                    title:'支付宝订单'
                }
            }
        ]
    },
    {
        path: "/weChat",
        component: LayOut,
        children: [
            {
                path: "",
                component: WeChat,
                meta:{
                    title:'微信订单'
                }
            }
        ]
    },
    {
        path: "/logs",
        component: LayOut,
        children: [
            {
                path: "",
                component: Logs,
                meta:{
                    title:'登录日志'
                }
            }
        ]
    },
    {
        path: "/profile",
        component: LayOut,
        children: [
            {
                path: "",
                component: Profile,
                meta:{
                    title:'个人页面'
                }
            }
        ]
    },
    {
        path: "/manager",
        component: LayOut,
        redirect:'/manager/index',
        children: [
            {
                path: "index",
                component: Manager,
                meta:{
                    title:'查询管理员'
                }
            },
            {
                path: "insert",
                component: ManagerInsert,
                meta:{
                    title:'新增管理员'
                }
            }
        ]
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
