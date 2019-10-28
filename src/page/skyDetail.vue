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
                        <span @click="jumpCompanyAll">查看企业完整信息</span>
                        <li v-for="(o,i) of tabList" :key="i" :class="tabNum==o.name?'current':''" @click="tabFn(o,i)" v-if="o.num>0">{{o.name}}({{o.num}})</li>
                    </ul>
                </template>
            </div>
            <div class="list-box">
                <!-- 资质 -->
                <template v-if="tabNum=='符合要求资质'">
                    <div class="condition">
                        <span v-for="(o,i) of conditionList" :key="i" :class="conditionName==o.name?'current':''" @click="conditionFn(o,i)">{{o.name}}({{o.num}})</span>
                    </div>
                    <table>
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
                <template v-else-if="tabNum=='符合要求人员'">
                    <div class="condition">
                        <span v-for="(o,i) of ryConditionList" :key="i" :class="ryTabName==o.cate?'current':''" @click="ryTabFn(o,i)">{{o.cate}}({{o.count}})</span>
                    </div>
                    <!-- 加载中 -->
                    <template v-if="ryIsajax">
                        <template v-if="ryList&&ryList.length>0">
                            <table>
                                <thead>
                                    <td>序号</td>
                                    <td>姓名</td>
                                    <td>身份证号</td>
                                    <td>证书数量</td>
                                    <td>注册类别</td>
                                    <td>注册专业</td>
                                </thead>
                                <tbody>
                                    <tr v-for="(o,i) of ryList" :key="i">
                                        <td>{{(ryData.pageNo-1)*20+i+1}}</td>
                                        <td>{{o.name}}</td>
                                        <td>{{o.idCard}}</td>
                                        <td>{{o.num}}</td>
                                        <td class="cate">
                                            <p v-for="(x,y) of o.categorys" :key="y" :style="{lineHeight:(x.cateList.length==0?1:x.cateList.length)*30+'px'}">{{x.cateKey}}</p>
                                        </td>
                                        <td class="cate-key">
                                            <div v-for="(x,y) of o.categorys" :key="y">
                                                <p v-for="(a,b) of x.cateList" :key="b">{{a}}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <v-page :all='ryTotal' :currents='ryData.pageNo' :pageSize='ryData.pageSize' @skip='ryGoto'></v-page>
                        </template>
                        <!-- 无数据  -->
                        <template v-else-if="ryList&&ryList.length==0">
                            <div class="no-toast">
                                <img src="../assets/bank_card @2x.png" alt="">
                                <span>Sorry，没有找到符合条件的项目信息</span>
                            </div>
                        </template>
                        <!-- 加载失败 -->
                        <template v-else-if="!ryList">
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
                                        <td>{{o.type}}</td>
                                        <td>{{o.amount}}</td>
                                        <td>{{o.buildEnd?formatDate(o.buildEnd):''}}</td>
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
    name: 'skyDetail', // 结构名称
    data() {
        return {
            // 数据模型a
            loading:true,
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
            tabNum:'符合要求资质',
            conditionList:[{
                name:'全部',
                num:0
            }],
            ryConditionList:[{
                cate:'全部',
                count:0
            }],
            conditionName:'全部',
            ryTabName:'全部',
            basic:{},//基本信息
            list:[],//显现数组
            qualList:[],//资质承载数组
            allList:[],
            yjData:{
                pageNo:1,
                pageSize:20,
                type:'project'
            },
            yjTotal:0,
            yjList:[],
            yjIsajax:false,
            ryData:{
                type:'person',
                pageNo:1,
                pageSize:20
            },
            ryTotal:0,
            ryList:[],
            ryIsajax:false,
            data:{}

        }
    },
    inject: ['reload'],
    watch: {
        // 监控集合
    },
    components:{
        'v-page':paging
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
        const loading=this.$loading({
            lock:true,
            text:'稍等，稍等一哈子',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,.7)'
        })
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
            let data=JSON.parse(JSON.stringify(res.data.data))
            this.data=JSON.parse(JSON.stringify(data))
            data.comId=this.$route.query.id;
            data.type='detail'
            this.$http({
                method:'post',
                url:'/query/zonghe/detail/company',
                data:data
            }).then(res =>{
                this.basic=res.data.data;
                this.tabList[0].num=res.data.data.qualCount;
                this.tabList[1].num=res.data.data.personCount;
                this.tabList[2].num=res.data.data.projectCount;
                if(this.tabList[0].num>0){
                    this.tabNum='符合要求资质'
                    this.zzAjax(data);
                }else if(this.tabList[1].num>0){
                    this.tabNum='符合要求人员'
                    this.ryData.regisAddress=res.data.data.regisAddress;
                    this.ryData.person=JSON.parse(JSON.stringify(this.data.person));
                    this.ryData.comId=this.$route.query.id;
                    this.ryAjax();
                }else{
                    this.tabNum='符合要求项目'
                    this.yjData.project=JSON.parse(JSON.stringify(this.data.project));
                    this.yjData.comId=this.$route.query.id;
                    this.yjAjax();
                }
                loading.close();
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
        conditionFn(o,i){//列表tab切换
            this.conditionName=o.name;
            if(i==0){
                this.list=this.allList
            }else{
                this.list=this.qualList[i-1].list;
            }
        },
        //刷新
        recoldFn() {
            this.reload();
        },
        jumpCompanyAll(){//跳到企业完整信息
            const {href} = this.$router.resolve({
                path: '/companyDetail',
                query: {
                    id:this.$route.query.id,
                }
            })
            window.open(href, '_blank', )
        },
        tabFn(o,i){//tab切换
            this.tabNum=o.name;
            if(o.name=='符合要求人员'){//人员
                this.ryData.regisAddress=this.basic.regisAddress;
                this.ryData.person=JSON.parse(JSON.stringify(this.data.person));
                this.ryData.comId=this.$route.query.id;
                this.ryAjax();
            }else if(o.name=='符合要求项目'){//业绩
                this.yjData.project=JSON.parse(JSON.stringify(this.data.project));
                this.yjData.comId=this.$route.query.id;
                this.yjAjax();
            }
        },
        /**资质 */
        zzAjax(data){
            let that=this;
            this.$http({
                method:'post',
                url:'/query/zonghe/detail/company',
                data:{
                    qualCode:data.qualCode,
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
        },
        /*业绩 start*/
        yjGoto(val){
            this.yjData.pageNo = val.cur
            this.yjAjax()
        },
        yjAjax(){
            let that=this;
            this.yjIsajax=false;
            this.yjList=[];
            this.$http({
                method:'post',
                url:"/query/zonghe/detail/company",
                data:this.yjData
            }).then(res => {
                this.yjList=res.data.data;
                this.yjTotal=res.data.total;
                this.yjIsajax=true;
            }).catch(req =>{
                that.yjList=null
                that.yjIsajax=true
            })
        },
        /*业绩 end*/
        /** 人员   start**/
        ryGoto(val){
            this.ryData.pageNo = val.cur
            this.ryAjax()
        },
        ryAjax(){
            let that=this;
            this.ryIsajax=false;
            this.ryList=[];
            this.$http({
                method:'post',
                url:"/query/zonghe/detail/company",
                data:this.ryData
            }).then(res => {
                if(res.data.data.categorys){
                    that.ryConditionList=res.data.data.categorys;
                    that.ryConditionList.unshift({cate:'全部',count:this.basic.personCount});
                    let num=0
                    for(let x of res.data.data.categorys){
                        num+=x.count
                    }
                    that.ryConditionList[0].num=num;
                }
                that.ryList=res.data.data.persons.list;
                that.ryTotal=res.data.data.persons.total;
                that.ryIsajax=true
            }).catch(req =>{
                that.ryList=null
                that.ryIsajax=true
            })
        },
        ryTabFn(o,i){
            this.ryTabName=o.cate
            if(o.cate=='全部'){
                this.ryData.category=null
            }else{
                this.ryData.category=o.cate;
            }
            this.ryTotal=0;
            this.ryAjax();
        }
        /** 人员  end**/
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
                min-width:25%;
                width: 100%;
                padding: 0 30px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
            }
            .bg{
                background: rgb(242, 242, 242);
                font-weight: bold;
                width: 25%;
                justify-content: center;
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
                margin-bottom: 20px;
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
            td{
                text-align: center;
                line-height: 30px;
                border: 1px solid #ccc;
                p{
                    min-height: 30px;
                }
                div{
                    min-height: 30px;
                }
            }
            .cate p{
                border-bottom: 1px solid #ccc;
            }
            .cate p:last-child{
                border-bottom: none
            }
            .cate-key div{
                border-bottom: 1px solid #ccc;
            }
            .cate-key div:last-child{
                border-bottom: none
            }
        }
    }
}
</style>
