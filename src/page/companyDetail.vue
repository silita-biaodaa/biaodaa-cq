<!-- 模型： DOM 结构 -->
<template>
    <div class="companyDetail">
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
                        <span @click="jump">查看数据源</span>
                        <li v-for="(o,i) of tabList" :key="i" :class="tabNum==i?'current':''" @click="tabFn(i)">{{o.name}}</li>
                    </ul>
                </template>
            </div>
            <div class="list-box">
                <!-- 资质 -->
                <template v-if="tabNum==0">
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
                </template>
                <!-- 人员 -->
                <template v-else-if="tabNum==1">
                    <!-- 加载中 -->
                    <template v-if="peopleIsajax">
                        <template v-if="peopleList&&peopleList.length>0">
                            <table ref="people">
                                <thead>
                                    <td>序号</td>
                                    <td>姓名</td>
                                    <td>身份证号</td>
                                    <td>证书编号</td>
                                    <td>注册类别</td>
                                    <td>注册专业</td>
                                </thead>
                                <tbody>
                                    <tr v-for="(o,i) of peopleList" :key="i">
                                        <td>{{(peopleData.pageNo-1)*20+i+1}}</td>
                                        <td>{{o.name}}</td>
                                        <td>{{o.idCard}}</td>
                                        <td>{{o.certNo}}</td>
                                        <td>{{o.major}}</td>
                                        <td>{{o.category}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <v-page :all='peopleTotal' :currents='peopleData.pageNo' :pageSize='peopleData.pageSize' @skip='peopleGoto'></v-page>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="peopleList&&peopleList.length==0">
                            <div class="no-toast">
                                <img src="../assets/bank_card @2x.png" alt="">
                                <span>Sorry，没有找到符合条件的项目信息</span>
                            </div>
                        </template>
                        <!-- 加载失败 -->
                        <template v-else-if="!peopleList">
                            <div class="ajax-erroe">
                                <img src="../assets/pic-zoudiu.png" />
                                <span @click="recoldFn">刷新</span>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
                    </template>
                </template>
                <!-- 业绩 -->
                <template v-else>
                    <!-- 加载中 -->
                    <template v-if="yjIsajax">
                        <template v-if="yjList&&yjList.length>0">
                            <table ref="yj">
                                <thead>
                                    <td style="width:32px">序号</td>
                                    <td style="width:calc(100% - 300px)">项目名称</td>
                                    <td style="width:92px">业绩类型</td>
                                    <td style="width:90px">中标金额/合同金额（万元）</td>
                                    <td style="width:82px">竣工时间</td>
                                </thead>
                                <tbody>
                                    <tr v-for="(o,i) of yjList" :key="i">
                                        <td>{{(yjData.pageNo-1)*20+i+1}}</td>
                                        <td>{{o.proName}}</td>
                                        <td>{{o.proType}}</td>
                                        <td>{{o.amount}}</td>
                                        <td>{{o.buildEnd}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <v-page :all='yjTotal' :currents='yjData.pageNo' :pageSize='yjData.pageSize' @skip='yjGoto'></v-page>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="yjList&&yjList.length==0">
                            <div class="no-toast">
                                <img src="../assets/bank_card @2x.png" alt="">
                                <span>Sorry，没有找到符合条件的项目信息</span>
                            </div>
                        </template>
                        <!-- 加载失败 -->
                        <template v-else-if="!yjList">
                            <div class="ajax-erroe">
                                <img src="../assets/pic-zoudiu.png" />
                                <span @click="recoldFn">刷新</span>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import paging from '@/components/paging'
export default {
    name: 'companyDetail', // 结构名称
    data() {
        return {
            // 数据模型a
            loading:true,
            tabList:[
                {
                    name:'企业资质',
                    num:0
                },{
                    name:'注册人员',
                    num:0
                },{
                    name:'工程项目',
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
            allList:[],//资质全部
            peopleData:{//人员请参
                province: '',
                pageNo:1,
                pageSize:20,
                comId:'',
                keyWord:"",
                category:""
            },
            peopleList:[],//人员数组
            peopleTotal:0,
            yjData:{
                comId:'',
                type: 'page',
                comName:'',
                pageNo:1,
                tabType: 'project',
                pageSize: 20,
            },
            yjList:[],
            yjTotal:0,
            yjIsajax:false,
            peopleIsajax:false,
        }
    },
    watch: {
        // 监控集合
    },
    components:{
        'v-page':paging
    },
    props: {
        // 集成父级参数
    },
    inject: ['reload'],
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        //loading
        const loading=this.$loading({
            lock:true,
            text:'稍等，稍等一下子',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,.7)'
        })
        let id=this.$route.query.id
        this.$http({//基本信息
            method:'post',
            url:'/query/zonghe/detail/company',
            data:{
                comId:id,
                type:'detail'
            }
        }).then(res =>{
            this.basic = res.data.data
            loading.close();
        })
        this.$http({//资质
            method:'post',
            url:'/company/qual/'+id,
            data:{}
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
        jump(){
            window.open(this.basic.url, '_blank')
        },
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
        tabFn(i){//tab切换
            this.tabNum=i;
            if(i==1){
                this.peopleData.pageNo=1;
                this.peopleData.province=this.basic.regisAddress;
                this.peopleData.comId=this.$route.query.id;
                this.peopleAjax();
            }else if(i==2){
                this.yjData.pageNo=1;
                this.yjData.comId=this.$route.query.id;
                this.yjData.comName=this.basic.comName;
                this.yjAjax();
            }
        },
        peopleAjax(){
            this.peopleList=[];
            this.peopleIsajax=false;
            let that=this;
            this.$http({
                method:'post',
                url:'company/person',
                data:this.peopleData
            }).then(res =>{
                this.peopleList=res.data.data
                this.peopleTotal = res.data.total
                this.peopleIsajax=true
            }).catch(req =>{
                that.peopleList=null
                that.peopleIsajax=true
            })
        },
        peopleGoto(val){
            this.peopleData.pageNo = val.cur
            this.peopleAjax()
        },
        yjAjax(){
            this.yjList=[];
            this.yjIsajax=false;
            let that=this;
            this.$http({
                method:'post',
                url:'project/company/list',
                data:this.yjData
            }).then(res =>{
                this.yjList=res.data.data
                this.yjTotal = res.data.total
                this.yjIsajax=true
            }).catch(req =>{
                that.yjList=null
                that.yjIsajax=true
            })
        },
        yjGoto(val){
            this.yjData.pageNo = val.cur
            this.yjAjax()
        },
        //刷新
        recoldFn() {
            this.reload();
        },   
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.companyDetail{
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
