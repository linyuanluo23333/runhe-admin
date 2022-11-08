<template>
    <div class="uppass" v-if="stat">
        <el-button type="success" plain @click="getsubfir">获取验证码</el-button>
        <el-input placeholder="请输入邮箱验证码" v-model="emailCode"></el-input>
        <el-input placeholder="请输入新密码" v-model="newpass"></el-input>
        <el-input placeholder="请再次输入新密码" v-model="newpasstow"></el-input>
        <el-button type="primary" plain @click="uppassdata">提交</el-button>
    </div>
</template>
<script>
import store from '@/store/indedx'

export default {
    data() {
        return {
            emailCode: '',
            newpass: '',
            newpasstow: '',
            jieliu: true
        }
    },
    props: {
        stat: {
            type: Boolean,
            default() {
                return true
            }
        },
        active1: {
            type: Number,
            default() {
                return 0
            }
        }
    },
    methods: {
        getsubfir() {
            let time = null
            clearTimeout(time)
            if (this.jieliu == true) {
                time = setTimeout(function () {
                    this.jieliu = true
                    time = null
                }, 6000)
                // let formdata = new FormData
                // formdata.append('email', store.state.user.email)
                this.$http({
                    method: 'POST',
                    url: "api/superchangepwd",
                    // data: formdata
                }).then(response => {
                    this.$emit('nnn1')
                    let res = response;
                    if (res.status == 'error') {
                        this.$message.error(res.msg)
                    }
                }).catch(error => {
                    console.log(error);
                })
            } else {
                this.$message.error('请等待1分钟');
            }
        },
        uppassdata() {
            if (!this.emailCode && !this.newpass && !this.newpasstow) {
                this.$message.error('请填完表单')
            } else {
                this.$http({
                    method: 'PUT',
                    url: 'api/superchangepwd',
                    data: `text=${this.emailCode}&pwd1=${this.newpass}&pwd2=${this.newpasstow}`,
                }).then(res => {
                    this.$emit('nnn1')
                    this.emailCode = '',
                        this.newpass = '',
                        this.newpasstow = '',
                        this.$message.success(res.msg)
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }
}
</script>
<style>
.uppass {
    width: 40%;
    margin: 0 auto;
}

.el-button {
    margin-bottom: 20px;
}
</style>