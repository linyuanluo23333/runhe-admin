<template>
    <div id=header>
        <div class="left">
            <span :class="className" @click="change"></span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="rigth">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <el-image style="width: 35px; height: 35px" :src="url" class="avator"></el-image>
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-image style="width: 35px; height: 35px" :src="url" :preview-src-list="srcList"></el-image>
                    </el-dropdown-item>
                    <el-dropdown-item > 退出登录</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: 'https://gd-hbimg.huaban.com/31d4ecf35a14b1269b987e1326d1369534b6f6cc4f757-oAIvsv_fw658',
            className: {
                "el-icon-s-unfold":false,
                "el-icon-s-fold": true,
                switch: true
            },
            state: true,
            srcList: [
          'https://gd-hbimg.huaban.com/31d4ecf35a14b1269b987e1326d1369534b6f6cc4f757-oAIvsv_fw658',

        ]
        }
    },
    created(){
        this.className['el-icon-s-unfold'] = this.isCollapse
            this.className['el-icon-s-fold'] = !this.isCollapse
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        }

    },
    watch:{
        isCollapse(newValue) {
            this.className['el-icon-s-unfold'] = newValue
            this.className['el-icon-s-fold'] = !newValue
        } 
    },
    methods: {
        change() {
            // this.$EventBus.$emit("changeCollapse");//1e 无需获取isCollapse 无法判断默认开关的闭合状态
            // this.className['el-icon-s-unfold'] = !this.className['el-icon-s-unfold']
            // this.className['el-icon-s-fold'] = !this.className['el-icon-s-fold']

            //vuex
            this.$store.commit('changeIsCollapse')
        }

    }
}
</script>
<style scoped>
#header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
}

#header .el-dropdown {
    margin-right: 40px;

}

#header .el-dropdown:hover {
    background-color: rgba(0, 0, 0, 0.025);

}

.left,
.rigth {
    display: flex;
    align-items: center;
    height: inherit;
}

.switch {
    padding: 0 20px 0 10px;
    font-size: 30px;
    line-height: 60px;
    cursor: pointer;
    transition: all 300ms;
}

.avator {
    cursor: pointer;
    padding: 15px;
}
.switch:hover {
    background-color: rgba(0, 0, 0, 0.025);
}
</style>