<template>
    <div id="Home">
        <!-- <h1>{{user.username}}</h1>
        <img :src="user.avator" alt="">
        <el-button @click="logout">退出登录</el-button> -->

        <el-container>
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>
                    <!-- {{$store.state.msg}}vuex -->
                    {{msg}}
                    <router-view></router-view> <!-- 二级路由的渲染 -->
                    <el-button @click="cd">修改store内的值</el-button>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>
<script>
import Aside from "./aside.vue"
import Header from "./header.vue"
import { url } from "@/axios/indedx";
export default {
    components: {
        Aside,
        Header
    },
    data() {
        return {
            user: {
                username: "",
                avator: ""
            }
        }
    },
    computed:{//vue 使用 
        msg(){
            return this.$store.state.msg;
        }
    },
    created() {
        let token = this.$cookie.get("rh_id");
        console.log(token);
        if (!token) {//token判断，，非常不安全  纸视判断本地有无token  可以被添加cookie
            this.$message.error("请先登录")
            return this.$router.push("/login")
        }
        this.$http({
            url: "api/superprofile",
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.status) {
                this.$message.error(res.data.errmsg)
            } else {
                this.user.username = res.data.username;
                this.user.avator = `${url}${res.data.avator}`;
            }
            console.log(token);
            console.log(res.data);
            console.log(res);

        }).catch(error => {
            this.$message.error("接口错误")
        })
    },
    methods: {
        logout() {
            this.$cookie.remove("rh_id")
            this.$router.push("/login")
        },
        cd(){
         //   this.$store.state.msg = 1000//不允许这样使用

         //通过mutations 修改state的值
         this.$store.commit("changMsg",2000000)
        }
    }
}
</script>
<style scoped>
#Home {
    height: inherit;
    background-color: #f0f2f5;
}
</style>
<style>
.el-container,
.el-aside {
    height: inherit;
}
.el-header {
    padding: 0;
    background-color: #fff;
}
</style>