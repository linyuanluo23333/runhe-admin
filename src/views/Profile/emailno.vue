<template>
    <div class="onemail" v-if="state">
        <div class="title_form">
            <el-form label-position="center" label-width="auto">
                <el-form-item label='绑定邮箱'>
                    <el-input v-model="email" ></el-input>
                    <el-button @click="sendSMS">发送邮箱验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
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
            email: ''
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
        cancelForm() {
            this.$emit('cancel')
        },
        sendSMS() {
            console.log(this.email);
            let patt = /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,4})*$/;
            console.log(patt.test('${this.}'))
            // if (this.email=='') {
              
            //     if(patt.test(this.email)){
            //         console.log(1);
            //     }else{
            //         console.log(2);
            //     }
            //     this.$http({

            //     })
            // }else{
            //     Message({
            //         type:'error',
            //         message:'请输入邮箱'
            //     })
            // }

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

.onemail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 99;
}
</style>