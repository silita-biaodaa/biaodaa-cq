<!-- 模型： DOM 结构 -->
<template>
    <div class="skyDetail">
        <h1>综合查询内测版</h1>
        <!-- 基本信息 -->
        <div class="basic maxW-box">
            <div class="title">
                <img src="../assets/company.png"/>
                {{basic.comName}}
                <span class="tag" v-for="(o,i) of basic.joinRegion" :key="i">{{o}}</span>
            </div>
            <div class="basic-box">
                <div>
                    <p class="bg">统一社会信用代码</p>
                    <p>{{basic.creditCode}}</p>
                    <!-- <template>
                        <p class="bg">在渝负责人</p>
                        <p>曹长卿</p>
                    </template> -->
                </div>
                <div>
                    <p class="bg">企业法定代表人</p>
                    <p>{{basic.legalPerson}}</p>
                    <p class="bg">企业登记注册类型</p>
                    <p>{{basic.economicType}}</p>
                </div>
                <div>
                    <p class="bg">企业注册属地</p>
                    <p>{{basic.regisAddress}}</p>
                </div>
                <div>
                    <p class="bg">企业经营地址</p>
                    <p>{{basic.comAddress}}</p>
                </div>
            </div>
        </div>
        <!--列表-->
        <div class="list maxW-box">
            <div class="tab">
                <template>
                    <ul>
                        <span @click="jumpCompanyAll" v-if="!$route.query.type">查看企业完整信息</span>
                        <li v-for="(o,i) of tabList" :key="i" :class="tabNum==i?'current':''" @click="tabFn(i)">{{o.name}}({{o.num}})</li>
                    </ul>
                </template>
            </div>
            <div class="list-box">
                <div class="condition">
                    <span v-for="(o,i) of conditionList" :key="i" :class="conditionName==o.name?'current':''" @click="conditionFn(o,i)">{{o.name}}({{o.num}})</span>
                </div>
                <table ref="table">
                    <thead>
                        <td>序号</td>
                        <td>资质类别</td>
                        <td>资质名称</td>
                        <td>发证机关</td>
                        <td>证书有效期</td>
                    </thead>
                    <tbody>
                        <tr v-for="(o,i) of list" :key="i">
                            <td>{{i+1}}</td>
                            <td>{{o.qualType}}</td>
                            <td>{{o.qualName}}</td>
                            <td>{{o.certOrg}}</td>
                            <td>{{o.validDate}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'skyDetail', // 结构名称
    data() {
        return {
            // 数据模型a
            tabList:[
                {
                    name:'符合要求资质',
                    num:0
                },{
                    name:'符合要求人员',
                    num:0
                },{
                    name:'符合要求项目',
                    num:0
                },
            ],
            tabNum:0,
            conditionList:[{
                name:'全部',
                num:0
            }],
            conditionName:'全部',
            basic:{},//基本信息
            list:[],//显现数组
            qualList:[],//资质承载数组
            allList:[],
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
        let id =this.$route.query.key*1;
        //根据ID查筛选条件
        this.$http({
            method:'post',
            url:'/query/zonghe/get/condition',
            data:{
                pkid:id
            }
        }).then(res =>{
            //基本信息
            let data=res.data.data
            data.comId=this.$route.query.id;
            data.type='detail'
            this.$http({
                method:'post',
                url:'/query/zonghe/detail/company',
                data:data
            }).then(res =>{
                this.basic=res.data.data;
            })
            //资质
            let qualCode=null;
            if(data.qualCode){
                qualCode=data.qualCode;
            }
            this.$http({
                method:'post',
                url:'/query/zonghe/detail/company',
                data:{
                    qualCode:qualCode,
                    joinRegion:data.joinRegion,
                    comId:data.comId,
                    type:'qual'
                }
            }).then(res =>{
                let arr=[],num=0;
                for(let x of res.data.data){
                    let obj={
                        name:x.qualType,
                        num:x.list.length
                    }
                    arr=arr.concat(x.list)
                    num+=x.list.length
                    this.conditionList.push(obj)
                }
                this.tabList[0].num=res.data.data.length
                this.conditionList[0].num=num
                this.list=arr;
                this.allList=arr;
                this.qualList=res.data.data;
            })
        })
    },
    created() {
        // console.group('创建完毕状态===============》created');
        
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
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
        mergeTd(tab,maxCol){//tab为table的DOM，maxcol为列数
            let  val, count, start;
            for(let col = maxCol-1; col >= 0 ; col--){
                count = 1;
                val = "";
                for(var i=0; i<tab.rows.length; i++){
                    if(val == tab.rows[i].cells[col].innerHTML){
                        count++;
                    }else{
                        if(count > 1){ //合并
                            start = i - count;
                            tab.rows[start].cells[col].rowSpan = count;
                            for(let j=start+1; j<i; j++){
                                tab.rows[j].cells[col].style.display = "none";
                            }
                            count = 1;
                        }
                        val = tab.rows[i].cells[col].innerHTML;
                    }
                }
                if(count > 1 ){ //合并，最后几行相同的情况下
                    start = i - count;
                    tab.rows[start].cells[col].rowSpan = count;
                    for(let j=start+1; j<i; j++){
                        tab.rows[j].cells[col].style.display = "none";
                    }
                }
            }
        },
        conditionFn(o,i){//列表tab切换
            this.conditionName=o.name;
            if(i==0){
                this.list=this.allList
            }else{
                this.list=this.qualList[i-1].list;
            }
        },
        jumpCompanyAll(){
            const {href} = this.$router.resolve({
                path: '/companyDetail',
                query: {
                    id:this.$route.query.id,
                }
            })
            window.open(href, '_blank', )
        },
        tabFn(i){
            this.tabNum=i;
            if(i==1){

            }else if(i==2){
                this.yjAjax();
            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.skyDetail{
    background: #f0f0f0;
    min-height: calc(100vh - 80px);
    padding-bottom: 80px;
    h1{
        text-align: center;
    }
}
.maxW-box{
    background: #fff;
    box-sizing: border-box;
}

.basic{
    padding: 20px;
    margin-bottom: 20px;
    .title{
        display: flex;
        font-size: 18px;
        color: #333;
        font-weight: bold;
        align-items: center;
        margin-bottom: 15px;
        img{
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 5px;
        }
        .tag{
            display: inline-block;
            font-size: 12px;
            margin-left: 10px;
            padding: 2px 5px;
            text-align: center;
            background: #E3E6FD;
            color: #3A76F0;
            font-weight: normal;
        }
    }
    .basic-box{
        border: 1px solid rgb(228, 228, 228);
        border-bottom: none;
        div{
            display: flex;
            color: #333;
            font-size: 14px;
            border-bottom: 1px solid rgb(228, 228, 228);
            p{
                line-height: 40px;
                text-align: center;
                min-width:25%;
                width: 100%;
            }
            .bg{
                background: rgb(242, 242, 242);
                font-weight: bold;
                width: 25%;
            }
        }
    }
}

.list{
    padding: 20px;
    .tab{
        margin-bottom: 20px;
        ul{
            display: flex;
            font-size: 14px;
            align-items: center;
            position: relative;
            .current{
                color: @color
            }
            li{
                padding: 0 20px;
                cursor: pointer;
                border-right: 1px solid #999;
            }
            li:last-child {
                border-right: none;
            }
            span{
                font-size: 12px;
                position: absolute;
                cursor: pointer;
                display: inline-block;
                right: 0;
                padding:8px;
                border: 1px solid  @color;
                color: @color;
                border-radius: 5px;
            }
        }
    }
    .list-box{
        font-size: 14px;
        border: 1px solid #f2f2f2;
        .condition{
            padding:10px 5px;
            span{
                display: inline-block;
                padding:0 10px;
                margin-right: 10px;
                cursor: pointer;
            }
            .current{
                background: @color;
                color: #fff;
            }
        }
        table{
            width: 100%;
            border-collapse: collapse;
            border-top: 1px solid #f2f2f2;
            tr{
                // border-top: 1px solid #f2f2f2;
            }
            td{
                text-align: center;
                line-height: 30px;
                border: 1px solid #f2f2f2;
            }
        }
    }
}
</style>
