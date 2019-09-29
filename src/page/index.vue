<!-- 模型： DOM 结构 -->
<template>
    <div class="index">
        <div class="main">
            <div class="top maxW-box">
                <div class="left rect">
                    <div id="left-bar"></div>
                </div>
                <div id="map"></div>
                <div class="right rect">
                    <div id="right-pie"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'index', // 结构名称
    data() {
        return {
            // 数据模型
            companyZz:[
                {
                    name:'建筑施工',
                    value:174
                },{
                    name:'工程勘察',
                    value:48
                },{
                    name:'工程设计',
                    value:88
                },{
                    name:'建设部监理',
                    value:68
                },{
                    name:'交通监理',
                    value:33
                }
            ],
            map:'',
            left:'',
            right:''
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        let that=this;
        /*地图*/
        let map=this.$echarts.init(document.getElementById('map'));
        this.map=map;
        map.setOption({
            series:[{
                type:'map',
                map:'china',
                selectedMode:'single',
                itemStyle:{
                    areaColor:'#57c2de',
                    borderColor:'#666'
                },
                emphasis:{
                    itemStyle:{
                       areaColor:'#12cbc4' 
                    }
                }
            }]
        })
        map.on('mapselectchanged',function(p){//地区选择事件
            if(p.batch[0].name=='湖南'){
                that.companyZz=[
                    {
                        name:'建筑施工',
                        value:74
                    },{
                        name:'工程勘察',
                        value:8
                    },{
                        name:'工程设计',
                        value:18
                    },{
                        name:'建设部监理',
                        value:8
                    },{
                        name:'交通监理',
                        value:33
                    }
                ]
            }else if(p.batch[0].name=='重庆'){
                that.companyZz=[
                    {
                        name:'建筑施工',
                        value:800
                    },{
                        name:'工程勘察',
                        value:82
                    },{
                        name:'工程设计',
                        value:0
                    },{
                        name:'建设部监理',
                        value:43
                    },{
                        name:'交通监理',
                        value:13
                    }
                ]
            }
            that.barReady(p.batch[0].name)
            that.pieReady(p.batch[0].name)
        })
        this.left=this.$echarts.init(document.getElementById('left-bar'));
        this.right=this.$echarts.init(document.getElementById('right-pie'));
        this.barReady()
        this.pieReady()
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        barReady(tit='全国'){//柱状图set
            let nameArr=[],dataArr=[],dataMaxArr=[];
            for(let x of this.companyZz){
                nameArr.push(x.name);
                dataArr.push(x.value);
            }
            let a =Math.max.apply(null,dataArr);
            for(let x of this.companyZz){
                dataMaxArr.push(a)
            }        
            this.left.setOption({
                title:{
                    text:tit,
                    padding:20,
                    textStyle:{
                        color:'#fff',
                    }
                },
                series:[
                    {
                        type:'bar',
                        data:this.companyZz,
                        label:{
                            show:true,
                            color:'#fff',
                            position: 'insideLeft',
                            formatter:'{b}————{c}'
                        },
                        itemStyle:{
                            color:'#4ca1cb',
                        },
                        emphasis:{
                            itemStyle:{
                                color:'#b03a5b'
                            }
                        },
                        barMaxHeight:245,
                    },{
                        type:'bar',
                        data:dataMaxArr,
                        itemStyle:{
                            borderWidth:1,
                            borderColor:'#4ca1cb',
                            color:'transparent'
                        },
                        barGap:'-100%',
                        barMinHeight:245,
                    }
                ],
                xAxis: {
                    show:false
                },
                yAxis: {
                    show:false,
                    data:nameArr
                },
            })
        },
        pieReady(tit='全国'){
            let nameArr=[];
            for(let x of this.companyZz){
                nameArr.push(x.name);
            }
            this.right.setOption({
                title:{
                    text:tit+'业绩',
                    padding:20,
                    textStyle:{
                        color:'#fff',
                    }
                },
                tooltip:{
                    trigger:'item',
                    formatter:'{a} <br/>{b}:{c}({d}%)'
                },
                legend:{
                    data:nameArr,
                    x:'centenr',
                    y:'bottom',
                    textStyle:{
                        color:"#fff"
                    },
                    padding:20
                },
                series:[
                    {
                        type:'pie',
                        radius:[20,70],
                        roseType:'radius',
                        data:this.companyZz
                    }
                ],
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped>
.main{
    background: #002150;
}
.top{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
}
.top #left-bar{
    width: 275px;
    height: 450px;
}
.top #right-pie{
    width:315px;
    height: 400px;
}
.rect{
    background: linear-gradient(to left, #57c2de, #57c2de) left top no-repeat, 
        linear-gradient(to bottom, #57c2de, #57c2de) left top no-repeat, 
        linear-gradient(to left, #57c2de, #57c2de) right top no-repeat,
        linear-gradient(to bottom, #57c2de, #57c2de) right top no-repeat, 
        linear-gradient(to left, #57c2de, #57c2de) left bottom no-repeat,
        linear-gradient(to bottom, #57c2de, #57c2de) left bottom no-repeat,
        linear-gradient(to left, #57c2de, #57c2de) right bottom no-repeat,
        linear-gradient(to left, #57c2de, #57c2de) right bottom no-repeat;
    background-size: 2px 15px, 15px 2px, 2px 15px, 15px 2px;
}
#map{
    width:610px;
    height: 450px;
}
</style>
