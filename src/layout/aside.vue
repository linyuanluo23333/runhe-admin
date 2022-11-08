<template>

    <el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse"
        background-color="rgb(48,65,86)" text-color="rgb(191,203,217)" router>
        <!-- this.$route.math数组  面包屑 -->
        <el-menu-item index="/home" class="submenu-title-noDropdown">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/title" class="submenu-title-noDropdown">
            <i class="el-icon-reading"></i>
            <span slot="title">大标题管理</span>
        </el-menu-item>
        <el-menu-item index="/chapter" class="submenu-title-noDropdown">
            <i class="el-icon-document"></i>
            <span slot="title">章节管理</span>
        </el-menu-item>
        <el-menu-item index="/video" class="submenu-title-noDropdown">
            <i class="el-icon-edit"></i>
            <span slot="title">视频管理</span>
        </el-menu-item>
        <el-menu-item index="/module" class="submenu-title-noDropdown">
            <i class="el-icon-files"></i>
            <span slot="title">模块管理</span>
        </el-menu-item>
        <el-submenu index="/manager" class="submenu-title-noDropdown">
            <template slot="title">
                <i class="el-icon-s-custom" ></i>
                <span slot="title">管理员</span>
            </template>
            <el-menu-item index="/manager/insert" class="submenu-title-noDropdown">新增管理员</el-menu-item>
            <el-menu-item index="/manager/index" class="submenu-title-noDropdown">查询管理员信息</el-menu-item>
           
        </el-submenu>
        <!-- <el-menu-item index="/manager/index" class="submenu-title-noDropdown">
            <i class="el-icon-s-custom"></i>
            <span slot="title">管理员</span>
        </el-menu-item> -->
        <el-menu-item index="/alipay" class="submenu-title-noDropdown">
            <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">支付宝订单</span>
        </el-menu-item>
        <el-menu-item index="/weChat" class="submenu-title-noDropdown">
            <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">微信订单</span>
        </el-menu-item>
        <el-menu-item index="/logs" class="submenu-title-noDropdown">
            <i class="el-icon-setting"></i>
            <span slot="title">登录日志</span>
        </el-menu-item>
    </el-menu>

</template>
<script>
export default {
    // data() {
    //     return {

    //          isCollapse: false//控制收缩   
    //     };
    // },

    data() {
        return {
            active:this.$route.path
        }
    },
    watch:{
        $router(newValue){
            this.active = newValue.path;
        }
    },
    // watch:{
    //     $router(newValue){
    //         console.log(newValue);
    //     }
    // },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        }
    },
    // methods: {
    //     handleOpen(key, keyPath) {
    //         console.log(key, keyPath);
    //     },
    //     handleClose(key, keyPath) {
    //         console.log(key, keyPath);
    //     }
    // }
    created() {//1e
        this.$EventBus.$on('changeCollapse', () => {
            this.isCollapse = !this.isCollapse;
        });
    }
}
</script>
<style>
/*目的 ： 动态路由表  侧边栏数量为 router 的地址个数*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.submenu-title-noDropdown:hover ,.el-submenu__title:hover{
    background-color: #263445 !important;
}

.submenu-title-noDropdown:focus {
    background-color: #263445 !important;
}

.el-menu {
    height: inherit;
}
</style>