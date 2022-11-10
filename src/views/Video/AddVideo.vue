<template>
    <div class="mark" v-if="state">
        <div class="title_form">
            <el-form :rules="rules" label-position="center" label-width="auto" :model="formLabelAlign" ref="ruleForm">
                <el-form-item label='新增视频名称' props='name'>

                    <el-input v-model="formLabelAlign.name"></el-input>
                    <el-upload class="upload-demo" ref="upload" action="http://81.68.121.52:8000/api/chapter_video"
                        :on-preview="handlePreview" :on-remove="handleRemove" 
                        :on-change='change'
                        :file-list="fileList"
                        :auto-upload="false"
                        name="video"
                      >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                        </el-button>
                    </el-upload>
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
export default {
    data() {
        const validateName = (rule, value, callback) => {
            if (value == "") {
                callback(new Error('请输入标题名称'))
            } else {
                callback()
            }
        }
        return {
            formLabelAlign: {
                name: ""
            },
            rules: {
                name: [
                    { validator: validateName, trigger: 'blur' }
                ]
            },
            fileList:[],
            
        }
    },
    props: {
        state: {
            type: Boolean,
            default() {
                return false
            }
        },


    },

    methods: {
        change(file){
            // let reader = new FileReader();
            // reader.onload = (e)=>{
                
            // }
            // reader.readAsDataURL(file.raw)
            let result = URL.createObjectURL(file.raw)
            console.log(file,result);
        },
        submitUpload() {
        
        // this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
        submitForm() {
            // if(){

            // }
            let formData = new FormData
            formData.append('video',)
            formData.append('name',this.formLabelAlign.name)
            formData.append('chapter_id',)
            formData.append('video_permission', '1')
            this.$http({
                url: 'api/chapter_video',
                method: "POST",
                heaeder: {
                    'Content-Type': 'multipart/form-data'
                },

            })
        },
        // submitForm(name){
        //     this.$refs[name].validate((state)=>{
        //         if(state){
        //             let name = this.formLabelAlign.name;
        //             let formData = new FormData()
        //             formData.append("name",name)
        //             this.$http({
        //                 url:"/api/classify",
        //                 method:'POST',
        //                 data:formData
        //             }).then(res=>{
        //                 let response = res.data;
        //                 if(response.status == 'success'){
        //                     this.formLabelAlign.name = ''
        //                     this.$emit('cancel')
        //                     this.$message({
        //                         type:'success',
        //                         message:`${response.msg}:${response.title}`
        //                     })
        //                     this.$emit('sucess')//实时加载
        //                 }else{
        //                     this.$message.error(response.msg)
        //                 }
        //             }).catch(error=>{
        //                 this.$message.error("接口错误")
        //             })
        //         }else{
        //             return false
        //         }
        //     })
        // },
        cancelForm() {
            this.formLabelAlign.name = ''
            this.$emit('cancel')
        },

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

.mark {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 99;
}
</style>