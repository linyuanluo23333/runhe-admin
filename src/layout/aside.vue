<template>

    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
        :collapse="isCollapse" background-color="rgb(48,65,86)" text-color="rgb(191,203,217)">
        
        <el-menu-item index="2" class="submenu-title-noDropdown">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled class="submenu-title-noDropdown">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4" class="submenu-title-noDropdown">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
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
    computed:{
        isCollapse(){
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
    created(){//1e
        this.$EventBus.$on('changeCollapse',()=>{
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
.submenu-title-noDropdown:hover {
    background-color: #263445!important;
}

.submenu-title-noDropdown:focus {
    background-color: #263445!important;
}
.el-menu{
    height: inherit;
}
</style>