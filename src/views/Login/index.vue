<template>
    <div class="loginview">
        <div class="login-form">
            <h1 class="login-title">系统登陆</h1>
            <el-input v-model="login.username" placeholder="请输入内容" class="login-input" prefix-icon="el-icon-user"
                clearable></el-input>
            <el-input placeholder="请输入密码" v-model="login.password" show-password class="login-input"
                prefix-icon="el-icon-lock" clearable></el-input>
            <div class="v-code">
                <el-input v-model="login.text" class="login-input v-input" prefix-icon="el-icon-key"
                    placeholder="请输入验证码"></el-input>
                <img :src="imgsrc" alt="" class="v-img" @click="changevcode">
            </div>
            <el-button type="primary" class="login-submit" @click="loging">登录</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            login: {
                username: "",
                password: "",
                text: "",
                uuid: ""
            },
            imgsrc: "",
            time: ""
        }
    },
    created() {
        this.reRender()
        this.intervalRerender()
    },
    methods: {
        reRender() {
            let uuid = this.uuid();
            this.login.uuid = uuid;
            this.imgsrc += `http://81.68.121.52:8000/api/generateimagecode?uuid=${uuid}`
        },
        uuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            })
        },
        intervalRerender() {
            clearInterval(this.time)
            this.time = setInterval(() => {
                this.reRender()
            }, 1000 * 60)
        },
        changevcode() {
            this.reRender()
            this.intervalRerender()
        },
        loging() {
            this.$http({
                url: "api/supersignin",
                method: "POST",
                data: `username=${this.login.username}&password=${this.login.password}&text=${this.login.text}&uuid=${this.login.uuid}`, //其中之一的转换方法  自己写form 
            }).then(res => {
                console.log(res.data);
                if (res.data.status === "error") {
                    this.$message.error(res.data.msg)
                } else {
                    let date = new Date();
                    date.setHours(date.getHours()+10);//设置token存在事件
                    //要将后端给的Token 存起来方便后期使用（cookie），  保存vip卡
                    this.$cookie.set("rh_id",res.data.token,{expires:date})

                    this.$message({
                        message: `${res.data.username}-${res.data.msg}`,
                        type: 'success'
                    });
                    this.$router.push("/")
                }
                this.login.username = "";
                this.login.password = "";
                this.login.text = "";
                this.reRender()
                this.intervalRerender()


            }).catch(error => {
                this.$message.error(" 登陆异常,请稍后重试")
              
            })
        }
    }

}
</script>

<style>
.login-input input:foucs {
    border: 1px solid hsla(0, 0%, 100%, .1);
}

.login-input input {
    color: aliceblue;
    outline: none;
    background-color: transparent;
    border: 1px solid hsla(0, 0%, 100%, .1);
}

.v-input {
    margin: 0;
}
</style>

<style scoped>
.v-img {
    height: 40px;
    cursor: pointer;
}

.v-code {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.login-submit {
    width: 100%;
}

.login-input {
    margin-bottom: 30px;
}

.login-form {
    width: 450px;
    margin: 0 auto;
    padding: 160px 35px 0;
}

.loginview {
    height: inherit;
    background-color: #2d3a4b;
}

.login-title {
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
}

.v-input {
    width: 50%;
    margin: 0;
}
</style>