<template>
    <div class="onemail" v-if="state">
        <div class="title_form">
            <el-form label-position="center" label-width="auto">
                <el-form-item label='绑定邮箱'>
                    <el-input v-model="email"></el-input>

                    <el-input type="text" class="verification" v-model="texts"></el-input>
                    <el-button @click="sendSMS">发送邮箱验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sendvi">绑定邮箱</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { Message } from 'element-ui'

export default {
    data() {
        return {
            email: '',
            texts: '',
            jieliu: true
        }
    },
    props: {
        state: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    methods: {
        sendSMS() {
            let time = null
            clearTimeout(time)
            let patt = /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4})*$/;
            if (this.email != '') {
                if (patt.test(`${this.email}`) == true) {
                    if (this.jieliu == true) {
                        this.jieliu = false
                        time = setTimeout(function () {
                            this.jieliu = true
                            time = null
                        }, 6000)
                        let formdata = new FormData
                        formdata.append('email', this.email)
                        this.$http({
                            method: 'POST',
                            url: "api/superbindemail",
                            data: formdata
                        }).then(response => {
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
                Message({
                    type: 'error',
                    message: '请输入邮箱'
                })

            }




        },
        sendvi() {
            if (this.texts == '') {
                this.$message.error('请输入验证码')
            } else {
                this.$http({
                    url: 'api/superbindemail',
                    method: 'PUT',
                    data:`text=${this.texts}`,
                }).then(res => {
                    console.log(res.data);
                    this.state = false;
                    location.reload()
                }).catch(error => {
                    this.$message.error(res.msg);
                })
            }
        }
    }
}
</script>
<style scoped>
.title_form {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    user-select: none;
    padding-top: 40px;
}
</style>
<style>
.el-form .el-form-item__content {
    margin-left: 0 !important;
}

.el-input__inner {
    margin-bottom: 10px;
}

.onemail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 99;
}

.verification {
    width: 150px;
    height: 34px;
    margin-left: 20px;
    margin-right: 50px;
}
</style>

<!-- <template>
    <div class="mark" v-if="state">
        <el-form label-width="100px" class="demo-dynamic onemail"
            v-if="state">
            <el-descriptions-item ladel="邮箱" >
                <el-input v-model="email"></el-input>
            </el-descriptions-item>
            <el-form-item class="dsibeten">
                <input type="text" class="verification">
                <el-button @click="sendSMS">发送邮箱验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email:''
        };
    },
    props: {
        state: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        sendSMS() {
            console.log(this.dynamicValidateForm.email);
            let patt = /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4})*$/;
            console.log()
            if (this.email != '') {
                if (patt.test(`${this.email}`) == true) {
                    this.$http({
                        method:'POST',
                        url:"api/superbindemail?email="+`${this.email}`
                    })
                }

            } else {
                Message({
                    type: 'error',
                    message: '请输入邮箱'
                })
            }

        }
    }
}
</script>
<style scoped>
.onemail {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    user-select: none;
    padding-top: 40px;
    padding-right: 50px;
}

.dsibeten {
    display: flex;
    justify-content: space-between;
}
</style>
<style>
.mark {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 99;
}

.verification {
    width: 150px;
    height: 34px;
}
</style> -->