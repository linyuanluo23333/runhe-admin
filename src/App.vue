<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { Button } from "element-ui"
export default {
    components: {
        Button// 3.局部注册
    }
}
</script>

<style>
    html,body,#app{
        height: 100%;
    }
</style>
