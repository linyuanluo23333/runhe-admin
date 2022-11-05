<template>

    <div class="home">

        <div class="header">
            <div>
                <h1>Hello,欢迎访问</h1>
                <span>我的github：https://github.com/linyuanluo23333/runhe-admin.git</span>
            </div>
            <div>
                <p>姓名：xxx</p>
                <p>性别：x</p>
                <p>出生年月：xxxx</p>
            </div>
            <div class="jinitaimei">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in 6" :key="item">
                        <h3 class="medium">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="tubiao">

        </div>
    </div>

</template>
<script>



</script>
<style>
.header {
    display: flex;
    justify-content: space-between;
}

.header>div,.tubiao {
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 30px;
}

.jinitaimei {
    width: 50%;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>