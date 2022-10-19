import router from "@/router"
import cookie from "js-cookie"
//保安系统
router.beforeEach((to, from, next) => {
    const token = cookie.get("rh_id")
    if (!token) {

        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    } else {
        if (to.path == "/login") {
            next(from)
        } else {
            next()
        }
    }
    //如果去登陆页面||白名单页面，不用拦截
    // if (to.path == "/login") {
    //     next()
    // } else {//去非登陆页面，要验证有无vip卡，是否为真  否则，送到登陆页面
    //     const token = cookie.get("rh_id")//获取token

    //     if (!cookie) {
    //         next("/login")//没有token 打回登陆页面
    //     } else {
    //         next()
    //     }
    //     //有token，去后端验证，token相同不
    //     //验证：有token获取个人信息，能拿到信息就可放行
    //     //此操作不能写在这，需要放在vuex中
    // }

})

export default router