import router from "@/router"
import cookie from "js-cookie"
import store from '@/store/indedx'
import { Message } from 'element-ui'
//保安系统
router.beforeEach(async (to, from, next) => {
  
    if(to.path=='profile'&&to.path!='lohin'){
        if(!store.state.user.email){
            Message({
                type:'warning',
                message:'请绑定邮箱'
            })
        }
    }
    let token = store.state.token
    if(!token){
        //用户刷新了 VueX中没有tokrn了 将cookie中的token再次存放到VueX中
        token = cookie.get("rh_id");
        if(!token){
            //cookie内没有，代表压根没登录
            if(to.path =="/login"){
                return next()
            }else{
                return next('/login')
            }
        
        }
        store.commit("saveToken",token)

    }
    let userProfilre ;
    if(store.state.user.username){//vueX有数据
        userProfilre = store.state.user
    }else{
         //去获取个人信息   
        try{
            userProfilre = await store.dispatch("getUserProfile")//async 的await让store.dispatch("getUserProfile")先执行 返回数据  用于判断
        } catch(error){ 
            console.log(error);
        }
    }
   
   
    console.log(userProfilre);//有东西真的。没有假的错误token，没登陆
    //检查token，再去检查个人信息
    // if(userProfilre){
 
    // }
    // const token = cookie.get("rh_id")


    if (!userProfilre) {//上面代码反复查token，于是判断有无数据//没有登陆

        if (to.path == "/login") {
            next()
        } else {
            cookie.remove('rh_id')
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