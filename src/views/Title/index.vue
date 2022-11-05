<template>
    <div>
        <header class="title_header">
            <el-button type="primary" @click="showAdd">新增标题</el-button>
        </header>
        <Add :state="state" @cancel='cancel' @success='success' />
        <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">

            <el-table-column prop="id" label="编号" sortable width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" sortable width="180">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
            <el-table-column prop="update_time" label="修改日期">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Add from './Add.vue'
export default {
    name:'Title',
    components: {
        Add
    },
    data() {
        return {
            tableData: [],
            state: false,
            fullscreenLoading:false
        }
    },
    created() {
        this.rerenderTableData()
    },
    methods: {
        rerenderTableData() {
            this.$http({
                url: '/api/classify'
            }).then(res => {
                let response = res.data;
                if (response.status == 'success') {
                    this.tableData = response.data
                    response.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();
                        item.update_time = new Date(item.update_time).toLocaleString();
                    });
                    this.tableData = response.data
                } else {
                    this.$message.error(response.msg)
                }
                console.log(res.data);
            })
        },
        handleEdit(index, row) {
            console.log(index, row);
            let name = prompt('修改名称')
            if(!name==''){
                this.$http({
                    url: '/api/classify',
                    method: 'PUT',
                    data: `pk=${row.id}&name=${name}`,
                }).then(res=>{
                    this.rerenderTableData()
                }).catch(err=>{
                    console.log(err);
                })
            }else{
                alert('情输入名称')
            }
          
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.fullscreenLoading = true
                this.$http({
                    url: '/api/classify',
                    method: 'DELETE',
                    data: `pk=${row.id}`,
                    headers: {
                        " Content-Type": 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    this.fullscreenLoading = false
                    let response = res.data
                    if (response == 'success') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } else {
                        this.$message.error(response.msg)
                    }
                    this.rerenderTableData()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            console.log(index, row);
        },
        showAdd() {
            this.state = true  
        },
        cancel() {//父传子 emit
            this.state = false
            this.rerenderTableData()
        },
        success() {//子传父
            this.rerenderTableData()
        }
    }
}
</script>
<style scoped>
.title_header {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
</style>