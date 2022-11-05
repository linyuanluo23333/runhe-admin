<template>
    <div class="buju">
        <div class="headerup">
            <h3>用户信息</h3>
            <Add :state="state" @cancel='cancel' @success='success' />
            <el-upload :headers="header" :show-file-list="false" ref="upload" class="avatar-uploader"
                :auto-upload="false" action="http://81.68.121.52:8000/api/changesuperavator" name="avator"
                :on-change="change" :on-success="success">
                <img v-if="user.avator" :src="user.avator" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- <input type="file" id="file" @change="a" /> -->
            <span @click="submitUpload" class="uphdata">确认更改</span>
            <!-- <img :src="src" alt=""> -->
            <div class="usercontent">
                <div>用户名 : {{ user.username }}</div>
                <div>性别 : {{ user.gender }}</div>
                <div>手机号 : {{ user.phone }}</div>
                <div>邮箱 : {{ user.email }}</div>
            </div>
        </div>
        <div class="upmsg">
            <div>修改用户信息</div>
            <div>
                <el-steps :active="active" finish-status="success">
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                    <el-step title="步骤 3"></el-step>
                </el-steps>
                <el-button style="margin-top: 12px;" @click="getemail">获取邮箱</el-button>
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Add from './emailno.vue'
import { mapState } from 'vuex'
export default {
    components: {
        Add
    },
    computed: {//计算属性
        ...mapState(['user'])
    },

    data() {
        return {
            //    src:'' 
            // imageUrl: '',
            header: {
                authorization: `Bearer ${this.$store.state.token}`
            },
            state: false,
            active: 0
        };
    },
    created() {
        // this.imageUrl = this.$store.state.user.avator;
    },


    methods: {
        change(file) {
            let reader = new FileReader()//base 64
            reader.onload = (e) => {
                this.user.avator = e.target.result
            }
            reader.readAsDataURL(file.raw)
            // let result = URL.createObjectURL(file.raw);bold 在线地址
            // this.imageUrl = result
        },
        success() {
            this.$message({
                type: 'success',
                message: '用户头像更改成功'
            })
        },
        submitUpload() {
            this.$refs.upload.submit();
            location.reload()
        },
        a(e) {
            let file = e.target.files[0]
            var reader = new FileReader();
            reader.onload = (e) => {
                this.src = e.target.result
            }
            reader.readAsDataURL(file);
        },
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        getemail() {
            if(!this.$store.state.user.email){
                this.state = true
            }
            
        },
        cancel() {//父传子 emit
            this.state = false
        },

    },
};
</script>

<style  scoped>
.avatar-uploader {
    margin: 0 auto;
}

.avatar-uploader .el-upload {
    width: 200px;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
}

.avatar-uploader .el-upload img {
    border-radius: 50%;
    display: block;
    padding: 10%;
    margin: 0 auto;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.buju {
    display: flex;
    justify-content: space-between;
}

.usermsg {
    width: 80%;
}
</style>  
<style>
.el-descriptions__body {
    padding: 20px;
}

.uphdata {
    padding-top: 10px;
    display: block;
    text-align: center;
    color: cornflowerblue;
}

h3 {
    margin: 0;
    color: #fff;
    margin-bottom: 20px;
}

.headerup {
    width: 20%;
    background: -webkit-linear-gradient(top, rgb(68, 75, 59), rgb(255, 255, 255));
    padding: 20px;
}

.usercontent>div {
    font-size: 15px;
    padding: 5px 0;
}

.upmsg {
    width: 75%;
    height: 100px;
    background-color: aliceblue;
}

.upmsg>:first-child {
    background-color: rgb(43, 50, 61);
    color: #fff;
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    padding: 5px 0;
}

.el-upload--text {
    margin: 0 20%;
    width: 60%;
}
</style>