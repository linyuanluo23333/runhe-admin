import Vue from 'vue'
import App from './App.vue'
import router from '@/permission'
import ElementUI from 'element-ui';// 
import 'element-ui/lib/theme-chalk/index.css';//3种引入方式  1.全局
import "normalize.css"
import axios from "@/axios/indedx"
import Cookie from "js-cookie"
import store from "@/store/indedx"//vuex

Vue.use(ElementUI);//2. 按需加载
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$cookie = Cookie;
Vue.prototype.$EventBus  = new Vue()//1e+



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
