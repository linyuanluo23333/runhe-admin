import VueX from "vuex";
import Vue from "vue";

Vue.use(VueX);

export default new VueX.Store({
    state:{
        msg:"hello Vuex",
        isCollapse:false
    },
    mutations:{//用来修改state
        changMsg( state ,value){
            state.msg = value;
        },
        changeIsCollapse(state){
            state.isCollapse = !state.isCollapse;
        }
    },
    actions:{//用来修改state

    }
})

//vuex 配置

//actions 存放异步操作， 需解构
//mutations 存放同步操作  无需解构  必须通过commit（）调用才能使用