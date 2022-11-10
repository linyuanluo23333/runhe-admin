<template>
    <div>
        <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick">
        </el-tree>
    </div>
</template>
<script>
export default {
    name: 'Video',
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            videobut:[],
        };
    },
    created() {
        this.$http({
            url: 'api/classify'
        }).then(res => {
            let datas = res.data.data;
            let newArr = []
            datas.forEach(item => {
                newArr.push(this.$http({
                    url: 'api/chapter',
                    params: {
                        pk: item.id
                    }
                }))
            })

            Promise.all(newArr).then(res => {
                res.forEach((item, index) => {
                    let arr = [];
                    item.data.data.forEach(item1 => {
                        arr.push({
                            id: item1.id,
                            label: item1.name
                        })
                    })
                    this.data.push({
                        id: datas[index].id,
                        label: datas[index].name,
                        children: arr
                    })
                })
            })
        });
    },
    methods: {
        handleNodeClick(data) {
            if (!data.children) {
                this.$http({
                    url: `/api/chapter_video?pk=${data.id}`
                }).then(res => {
                  let datass =res.data.data
                  this.videobut = datass
                  this.butxuan()
                //   datass.forEach(item=>{
                //     console.log(item);
                //   })

                })
            }else{
                console.log('标题');
            }

        },
        butxuan(){
            this.$emit("getbuttname",this.videobut)
        }

    }
}
</script>
<style>
.el-tree {
    padding: 10px 5px;
}

.custom-tree-node {
    padding: 0 5% 0 0;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    width: 90%;
    align-items: baseline;
}
</style>