<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号" sortable width="180">

            </el-table-column>
            <el-table-column prop="username" sortable label="用户名">
            </el-table-column>
            <el-table-column prop="create_time" sortable label="登陆时间">
            </el-table-column>
            <el-table-column prop="ip" sortable label="ip">
            </el-table-column>

        </el-table>
        <div class="fenye">
            <el-pagination :page-count="allye" layout="prev, pager, next" :hide-on-single-page='true' :total="total"
                @prev-click=ppp @next-click="nnn" @current-change="handleCurrentChange">
            </el-pagination>
        </div>

    </div>

</template>

<script>




export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,  //默认第一页
            page: 1,
            allye: 0,
            total:0
        }

    },
    created() {
        this.$http({
            url: `api/supersigninlogs?page=${this.page}`,
        }).then(res => {
            let response = res.data;
            this.$http({
                url: `api/supersigninlogs?page=${res.data.count}`,
            }).then(res => {
                this.total=(response.count - 1) * response.data.length+res.data.data.length;
            })

        })

        this.render()
    },
    methods: {
        render() {
            this.$http({
                url: `api/supersigninlogs?page=${this.page}`,
            }).then(res => {
                let response = res.data;
                if (response.status == 'success') {
                    this.allye = response.count
                    response.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();
                        item.update_time = new Date(item.update_time).toLocaleString();
                    })
                    this.tableData = response.data;
                } else {
                    this.$message.error(response.msg)
                }
            })
        },
        ppp() {
            this.page = this.page - 1
            this.render()
        },
        nnn() {
            this.page = this.page + 1
            this.render()
        },
        handleCurrentChange(val) {
            this.page = val
            this.render()
        }



    },

}

</script>

<style>
.fenye {

    margin: 0 auto;
}
</style>