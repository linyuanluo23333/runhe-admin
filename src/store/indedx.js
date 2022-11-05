import VueX from "vuex";
import Vue from "vue";
import axios from "@/axios/indedx"
import { url } from "@/axios/indedx"

Vue.use(VueX);

export default new VueX.Store({
    state: {
        msg: "hello Vuex",
        isCollapse: false,
        user: {
            username: "",
            avator: "",
            email:'',
            gender:'',
            phone:''
        },
        token: ""
    },
    mutations: {//用来修改state 只能写同步
        removeToken(state){
            state.token = ""
        },
        saveToken(state, token) {
            state.token = token
        },
        // changMsg(state, value) {
        //     state.msg = value;
        // },
        changeIsCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        saveUserProfile(state,payload){
            state.user.username = payload.username;
            state.user.avator = payload.avator;
            state.user.email = payload.email;
            if(payload.gender==1){
                state.user.gender = '男';
            }else{
                state.user.gender = '女';
            }
         
            state.user.phone = payload.phone;

        }
    },
    actions: {//用来修改state  发请求是异步操作 只可以使用actions
        getUserProfile({ commit }) {
            return new Promise((resolve,reject) => {
                axios({
                    url: "api/superprofile",
                }).then(res => {
                    if(!res.data.status){//成功了拿到信息了，接下来储存到VueX
                        res.data.avator = `${url}${res.data.avator}`
                        commit('saveUserProfile',res.data)
                        resolve(res.data);

                    }else{
                        reject(res.data);
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
})

//vuex 配置

//actions 存放异步操作， 需解构
//mutations 存放同步操作  无需解构  必须通过commit（）调用才能使用