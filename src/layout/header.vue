<template>
    <div id=header>
        <div class="left">
            <span :class="className" @click="change"></span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">{{ msg }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="rigth">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-image style="width: 35px; height: 35px" :src="user.avator" class="avator"></el-image>
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userContent">
                        {{ user.username }}
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-image style="width: 35px; height: 35px" :src="url" :preview-src-list="srcList"></el-image>
                    </el-dropdown-item>
                    <el-dropdown-item command="logout"> 退出登录</el-dropdown-item>

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
                "el-icon-s-unfold": false,
                "el-icon-s-fold": true,
                switch: true
            },
            state: true,
            srcList: [
                'https://gd-hbimg.huaban.com/31d4ecf35a14b1269b987e1326d1369534b6f6cc4f757-oAIvsv_fw658',
            ],
            msg: '首页'
        }
    },
    created() {
        this.className['el-icon-s-unfold'] = this.isCollapse
        this.className['el-icon-s-fold'] = !this.isCollapse
        document.title = this.$route.meta.title;
        this.msg = this.$route.meta.title;
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        },
        user() {
            return this.$store.state.user;
        }

    },
    watch: {
        isCollapse(newValue) {
            this.className['el-icon-s-unfold'] = newValue
            this.className['el-icon-s-fold'] = !newValue
        },
        $route(newValue) {
            console.log(newValue);
            document.title = newValue.meta.title;
            this.msg = newValue.meta.title;
        }
    },
    methods: {
        change() {
            // this.$EventBus.$emit("changeCollapse");//1e 无需获取isCollapse 无法判断默认开关的闭合状态
            // this.className['el-icon-s-unfold'] = !this.className['el-icon-s-unfold']
            // this.className['el-icon-s-fold'] = !this.className['el-icon-s-fold']

            //vuex
            this.$store.commit('changeIsCollapse')
        },
        handleCommand(command) {
            console.log(command);
            if (command === 'logout') {
                this.$store.commit('removeToken');
                this.$cookie.remove('rh_id');
                this.$router.push('/login')
            }
            if(command === 'userContent'){
                this.$router.push("/profile")
            }
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