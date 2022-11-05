<template>
    <div>
        <!-- 在模块化开发中只能有一个总标签 -->
        <el-table :data="list" style="width: 100%">
            <!-- :data是用于遍历渲染的数据 -->
            <el-table-column prop="id" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="gender" label="性别" :formatter="format">
            </el-table-column>
            <el-table-column prop="avator" label="头像">
                <template #default="{row}">
                    <!-- #default插槽 Table-column Scoped Slot -->
                    <el-avatar shape="square" size="small" :src="url+row.avator">

                    </el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间">
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template #default="{row}">
                    <el-button type="danger" size="small" @click="remove(row.id)"  v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
                </template>
            </el-table-column>


        </el-table>

    </div>
</template>
<script>
// OlqVi40KaA  LINYUANLUO2333 密码
import { url } from '@/axios/indedx'
export default {
    data() {
        return {
            list: [],
            url,

            fullscreenLoading:false
        }//一次请求发送一次数据
    },//渲染要用的数据
    created() {
        this.render()//渲染
    },//刷新页面
    methods: {
        render() {
            this.$http({
                url: 'api/superusers',
            }).then(response => {
                let res = response.data;
                if (res.status == 'error') {
                    this.$message.error(res.msg);//错误的弹窗消息
                } else {
                    res.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();
                        item.update_time = new Date(item.update_time).toLocaleString();
                    });
                    this.list = res.data//将数据传输到渲染的数组中
                }
                console.log(res.data);
            })
        },//渲染
        format(row,column,cellValue,index){
            if(cellValue==1){
                return "男"
            }else{
                return "女"
            }
        },//格式化文档方法
        remove(pk){
            this.fullscreenLoading = true
            this.$http({
                method:"DELETE",
                url:"api/removesuperuser",
                data:`pk=${pk}`,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }).then(response=>{
                this.fullscreenLoading = false
                let res = response.data;//从复出现，可以写到拦截器内，简化代码
                if (res.status == 'error') {
                    this.$message.error(res.msg);
                } else {

                    this.$message({
                        type:"suceess",
                        message:res.msg
                    });
                    this.render()
                }
           
            }).catch(error=>{
                this.$message.error(500,'接口错误')
                console.log(error);
            })
        }
    }
}
</script>
<style>

</style>