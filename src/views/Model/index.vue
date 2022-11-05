<template>
    <div>
        <h1>模块管理</h1>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
            <el-table-column prop="update_time" label="修改日期">
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <div slot-scope="scope">
                    <el-button @click="SetModel(scope.$index, scope.row)">获取模块</el-button>
                    <el-button @click="addModel(scope.$index, scope.row)">新增模块</el-button>
                    <el-button @click="upvModel(scope.$index, scope.row)">修改模块信息</el-button>
                    <el-button @click="delModel(scope.$index, scope.row)">删除模块</el-button>
                </div>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
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
        SetModel(index, row) {
            this.$http({
                url: `/api/course?pk=${row.id}`
            }).then(res => {
                console.log(res.data);
            })


        },
        addModel(index, row) {
            let cname = prompt('请输入新模块名称')
            var data1 = new FormData();
            data1.append('name', `${cname}`);
            data1.append('classify', `${row.id}`);
            this.$http({
                url: "api/course",
                method: "POST",
                data: data1
            }).then(res => {
                console.log(res.data);
            })
        },
        upvModel(index, row) {
            let name = prompt('新名字')
            this.$http({
                url: "/api/course",
                method: "PUT",
                data: `name=${name}&pk=${row.id}`
            }).then(res => {
                console.log(res.data);
            })
        },
        delModel(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.fullscreenLoading = true
                this.$http({
                    url: '/api/course',
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
                        this.rerenderTableData();
                    } else {
                        this.$message.error(response.msg)
                    }
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>
<style>

</style>