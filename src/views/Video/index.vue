<template>
    <div>
        <h1>视频管理</h1>
        <Add :state="state" @cancel='cancel' @success='success' />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
            <el-table-column prop="update_time" label="修改日期">
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <div slot-scope="scope">
                    <el-button @click="SetVideo(scope.$index, scope.row)">获取所有视屏</el-button>
                    <el-button @click="addVideo(scope.$index, scope.row)">新增视频</el-button>
                    <el-button @click="upvVdeo(scope.$index, scope.row)">修改视频信息</el-button>
                    <el-button @click="delVideo(scope.$index, scope.row)">删除视频</el-button>
                </div>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

import Add from './AddVideo.vue'
export default {
    name: 'Video',
    components: {
        Add
    },
    data() {
        return {
            tableData: [],
            state: false,
            fullscreenLoading: false
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
        SetVideo(index, row) {
            this.$http({
                url: `/api/chapter_video?pk=${row.id}`
            }).then(res => {
                console.log(res.data);
            })


        },
        addVideo(index, row) {
            console.log(1);
            this.state = true
            // let cname = prompt('请输入新视频名称')
            // var datav = new FormData();
            // this.$http({
            //     url: `api/chapter?pk=${row.id}`,
            // }).then(res => {
            //     datav.append('chapter_id', `${row.id}`);
            //     datav.append('video', 'https://www.bilibili.com/video/BV1vd4y1k7Ms?t=5.5');
            //     datav.append('name', `${cname}`);
            //     datav.append('video_permission', `1`);

            //     this.$http({
            //         url: "api/chapter_video",
            //         method: "POST",
            //         data: datav
            //     }).then(res => {
            //         console.log(res.data);

            //     })


            // })

        },
        upvVdeo(index, row) {
            let name = prompt('新名字')
            let videe = 'file://C:\Users\Administrator\Desktop\TM-20220802092654-8015835683-recording-1.mp4'
            this.$http({
                url: "api/chapter_video",
                method: "PUT",
                data: `video=${videe}&name=${name}&chapter_id=${row.id}`
            }).then(res => {
                console.log(res.data);
            })
        },
        delVideo(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger'
            }).then(() => {
                this.fullscreenLoading = true
                this.$http({
                    url: '/api/chapter_video',
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
        },

        cancel() {//父传子 emit
            this.state = false
        },
        success() {//子传父
            this.rerenderTableData()
        }
    }
}
</script>
<style>

</style>