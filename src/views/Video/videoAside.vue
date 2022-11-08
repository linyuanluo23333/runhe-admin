<template>
    <div class="vvv">
        <d-player ref="player" id="player" :options="option"></d-player>
        <div>
            <button></button>
            
        </div>
    </div>
</template>
<script>
import DPlayer from 'dplayer';
export default {
    name: 'vvv',
    data() {
        return {
            option: {
                container: document.getElementById('dplayer'),
                video: {
                    url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                },
            }
        }
    },
    mounted() {
        const dp = new DPlayer(this.option);
    }
}
</script>
<style>
#player{
    width: 80%;
    margin: 20px auto;

    height: 500px;
}
</style>