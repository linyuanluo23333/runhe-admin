<template>
    <div class="vvv">
        <d-player ref="player" id="player" :options="options"></d-player>
        <Add :state="state" :arrid="arrid"  @cancel='cancel' @success='success' />
        <div class="caozuo">
            <span>选集</span>
            <div>
            <el-button @click="addde" v-if="showw">添加</el-button>
            <el-button  v-if="showw">修改</el-button>
            <el-button  v-if="showw">删除</el-button>
            </div>
        </div>
        <hr>
        <el-button @click="playVideo(item)" v-for="item in shoplistarr" :key="item.id">{{ item.name }}</el-button>

    </div>
</template>
<script>

import DPlayer from 'dplayer';
import Add from './AddVideo.vue'
export default {
    components: {
        Add,
    },
    name: 'vvv',
    data() {
        return {
            options: {
                container: document.getElementById('dplayer'),
                video: {
                    url: ``,
                },
            },
            state: false,
            arrid:[],
            showw:true
        }
    },
    props: {
        shoplistarr: Array
    },
    mounted() {
        // const dp = new DPlayer(this.options);
        if(this.shoplistarr.length == 0){
            this.showw = false
          }else{
            this.showw = true
          }
    },
    created(){
    },
    methods: {
        playVideo(a) {
            console.log(a);
            let namem = a.mp4_url.substring('0',a.mp4_url.indexOf('.'))
            this.options.video.url = `http://81.68.121.52:9000/api/videoplay?path=${namem}`
            const dp = new DPlayer(this.options);
            dp.play()
            namem = ''
            // this.arrid=
        },
        addde() {
            this.state = true
        },
        cancel() {//父传子 emit
            this.state = false
        },
        success() {//子传父
           
        }
    }
}
</script>
<style>
#player {
    width: 80%;
    margin: 20px auto;
    height: 100%;
}

.vvv {
    padding: 5% 10%;
    width: 80%;
}
.caozuo{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
</style>