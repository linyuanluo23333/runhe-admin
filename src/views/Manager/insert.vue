<template>
    <div class="manager-insert">
        <!-- 单独路由，小框放不下 -->
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="arrpanduan">立即创建</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        const validatorusername = (rule, value, callback) => {
            if (/\w{6,18}/.test(value)) {
                callback()
            } else {
                callback(Error('用户名最少6位,最多18位'))
            }
        }
        return {
            form: {
                username: '',

            },
            rules: {
                username: [
                    { validator: validatorusername, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let fromData = new FormData()
                    fromData.append('username', this.form.username)
                    this.$http({
                        method: 'POST',
                        url: 'api/createsuperuser',
                        data: fromData
                    }).then(response => {
                        console.log(response);
                        let res = response.data;
                        if (res.status == "error") {
                            this.$message.error('res.msg')
                        } else {
                            this.$alert(`用户名：${res.username}\n密码:${res.password}`, '新增账号提示\n只提醒一次，请尽快更改密码', {
                                confirmButtonText: '确定',
                            });
                            this.$router.push('/manager/index')
                            //justdelete_user
                        }
                    })
                } else {
                    return false
                }
            })
        },
        arrpanduan() {
            let arr = [];
            this.$http({
                url: 'api/superusers',
            }).then(response => {
                console.log(response.data.data);
                let res = response.data;
                console.log(res.data);
                res.data.forEach((item, index) => {
                    if (arr.indexOf(item.username) == -1) {
                        arr.push(item.username)
                    }
                });
                console.log(arr);
                console.log(this.form.username);
                console.log(arr.indexOf(this.form.username));
                if (arr.indexOf(this.form.username) != -1) {
                    this.$message.error('zzz')
                } else {
                    this.onSubmit()
                }

            })
         

        }
    }
}
</script>
<style scoped>
.manager-insert {
    background-color: #fff;
    height: 100%;
    padding: 20px;
    border-radius: 5px;
}
</style>