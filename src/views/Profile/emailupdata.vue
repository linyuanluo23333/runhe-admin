<template>
    <div id=emll v-if="states">
        <div>
            <el-input placeholder="请输入旧邮箱" v-model="email1"></el-input>
            <el-button type="success" plain @click="getsubfir">获取验证码</el-button>
        </div>
        <div>
            <el-input placeholder="请输验证码" v-model="email2"></el-input>
            <el-button type="primary" plain @click="submitfir">提交验证码</el-button>
        </div>
        <div>
            <el-input placeholder="请输入新邮箱" v-model="email3"></el-input>
            <el-button type="success" plain @click="getsublas">获取验证码</el-button>
        </div>
        <div>
            <el-input placeholder="请输入验证码" v-model="email4"></el-input>
            <el-button type="primary" plain @click="submitlas">提交验证码 </el-button>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        let patt = /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4})*$/;
        return {
            email1: '',
            email2: '',
            email3: '',
            email4: '',
            jieliu: true
        }
    },
    props: {
        states: {
            type: Boolean,
            default() {
                return true
            }
        },
        active:{
            type:Number,
            default(){
                return 0
            }
        }
    },
    methods: {
        getsubfir() {
            let time = null
            clearTimeout(time)
            if (this.email1 != '') {
                if (patt.test(`${this.email1}`) == true) {
                    if (this.jieliu == true) {
                        time = setTimeout(function () {
                            this.jieliu = true
                            time = null
                        }, 6000)
                        let formdata = new FormData
                        formdata.append('email', this.email1)
                        this.$http({
                            method: 'POST',
                            url: "api/superbindemail",
                            data: formdata
                        }).then(response => {
                            this.$emit('nnn')
                            let res = response;
                            if (res.status == 'error') {
                                this.$message.error(res.msg)
                            }
                        })
                    } else {
                        this.$message.error('请等待1分钟');
                    }

                }
            } else {
                this.jieliu = true
                this.$message.error('请输入邮箱');
        
            }
        },
        submitfir() {
            if (this.email2 == '') {
                this.$message.error('请输入验证码')
            } else {
                this.$http({
                    url: 'api/superbindemail',
                    method: 'PUT',
                    data:`text=${this.email2}`,
                }).then(res => {
                    this.$emit('nnn')
                }).catch(error => {
                    this.$message.error(res.msg);
                })
            }
        },

        getsublas() {
            let time = null
            clearTimeout(time)
            if (this.email3 != '') {
                if (this.patt.test(`${this.email3}`) == true) {
                    if (this.jieliu == true) {
                        time = setTimeout(function () {
                            this.jieliu = true
                            time = null
                        }, 6000)
                        let formdata = new FormData
                        formdata.append('email', this.email3)
                        this.$http({
                            method: 'POST',
                            url: "api/superbindemail",
                            data: formdata
                        }).then(response => {
                            this.$emit('nnn')
                            let res = response;
                            if (res.status == 'error') {
                                this.$message.error(res.msg)
                            }
                        })
                    } else {
                        this.$message.error('请等待1分钟');
                    }

                }
            } else {
                this.jieliu = true
                this.$message.error('请输入邮箱');
            }
        },
        submitlas() {
            if (this.email4 == '') {
                this.$message.error('请输入验证码')
            } else {
                this.$http({
                    url: 'api/superbindemail',
                    method: 'PUT',
                    data:`text=${this.email4}`,
                }).then(res => {
                    this.$emit('nnn')
                }).catch(error => {
                    this.$message.error(res.msg);
                })
            }
        }


    }
}
</script>
<style scoped>

</style>
<style>
#emll {
    padding-top: 40px;
}

#emll>div {
    width: 40%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

#emll>div>.el-button {
    margin-left: 20px;
    height: 80%;
}
</style>