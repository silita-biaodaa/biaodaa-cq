<!-- 模型： DOM 结构 -->
<template>
    <div class="ZHquery">
        <h1>综合查询内测版</h1>
        <!-- 筛选 -->
        <div class="select maxW-box">
            <el-row>
                <el-col :span="2">企业地区：</el-col>
                <el-col :span="22"  class="condition">
                    <div v-for="(el,i) in addressList" :key='i' :class="el.code==data.regisAddress?'current':''" @click='addressFn(el)'>{{el.name}}</div>
                </el-col>
            </el-row>
            <el-row v-if="data.regisAddress=='重庆市'">
                <el-col :span="2">备案地区：</el-col>
                <el-col :span="22" class="condition">
                    <div v-for="(el,i) in recordList" :key='i' :class="el.code==data.joinRegion?'current':''" @click='isBeiFn(el)'>{{el.name}}</div>
                </el-col>
            </el-row>
            <!-- 资质 -->
			<v-screenzz :qualList='companyQuals' @contentChange='screenzzFn' :zztype='data.qualCode' ></v-screenzz>
            <!-- 人员 -->
            <v-screenry :qualList='peopleList' @contentChange='screenryFn'></v-screenry>
            <!-- 业绩要求 -->
            <el-row class="yj">
                <el-col :span="2">业绩要求：</el-col>
                <el-col :span="22">
                    <!-- 项目关键字 -->
                    <el-row>
                        <el-col :span="3">项目关键字：</el-col>
                        <el-input placeholder="请输入内容,多个关键字用空格隔开"  v-model="data.project.keywords"></el-input>
                        <el-radio-group v-model="data.project.opt">
                            <el-radio label="title">根据标题搜索</el-radio>
                            <el-radio label="scope">根据规模搜索</el-radio>
                            <el-radio label="title_and_scope">根据标题和规模搜索</el-radio>
                        </el-radio-group>
                    </el-row>
                    <!-- 业绩所含子项 -->
                    <el-row>
                        <el-col :span="3">业绩所含子项:</el-col>
                        <div class="condition">
                            <div class='item' v-for="(el,i) in itemList" :key='i' :class="el.istap?'current':''" @click="itemFn(el)">{{el.name}}</div>
                        </div>
                    </el-row>
                    <!-- 项目属地 -->
                    <el-row>
                        <el-col :span="3">项目属地：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of areasList" :key="'a'+i" :class="el.istap?'current':''" @click="areaTap(el)">{{el.name}}</div>
                        </div>
                    </el-row>
                    <!-- 工程用途 -->
                    <el-row>
                        <el-col :span="3">工程用途：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of purposeList" :key="'a'+i" :class="el.istap?'current':''" @click="purposeTap(el)">{{el.name}}</div>
                        </div>
                    </el-row>
                    <!-- 业绩类型 -->
                    <el-row>
                        <el-col :span="3">业绩类型：</el-col>
                        <div class="condition">
                            <div class="areas" v-for="(el,i) of typeList" :key="'a'+i" :class="el.istap?'current':''" @click="typeTap(el)">{{el.name}}</div>
                        </div>
                    </el-row>
                    <!-- 中标金额/合同金额 -->
                    <el-row>
                        <el-col :span="5">中标金额/合同金额：</el-col>
                        <el-input placeholder="最低价（万元）" v-model="data.project.amountStart" class="inputW" @keyup.native="data.project.amountStart=data.project.amountStart.replace(/\D/g,'')"></el-input>
                        ——
                        <el-input placeholder="最高价（万元）" v-model="data.project.amountEnd" class="inputW r" @keyup.native="data.project.amountEnd=data.project.amountEnd.replace(/\D/g,'')"></el-input>
                    </el-row>
                    <!-- 中标日期/合同签订日期 -->
                    <el-row>
                        <el-col :span="5">中标日期/合同签订日期：</el-col>
                        <el-date-picker v-model="data.project.contractStart" type="date" placeholder="起始日期" class="inputW"></el-date-picker>
                        ——
                        <el-date-picker v-model="data.project.contractEnd" type="date" placeholder="结束日期" class="inputW r"></el-date-picker>
                    </el-row>
                    <!-- 竣工验收日期 -->
                    <el-row>
                        <el-col :span="5">竣工验收日期：</el-col>
                        <el-date-picker v-model="data.project.completeStart" type="date" placeholder="起始日期" class="inputW"></el-date-picker>
                        ——
                        <el-date-picker v-model="data.project.completeEnd" type="date" placeholder="结束日期" class="inputW r"></el-date-picker>
                    </el-row>
                    <!-- 面积 -->
                    <el-row>
                        <el-col :span="5">面积（平方米）：</el-col>
                        <el-input placeholder="最小面积（㎡）" v-model="data.project.areaStart" class="inputW" @keyup.native="data.project.areaStart=data.project.areaStart.replace(/\D/g,'')"></el-input>
                        ——
                        <el-input placeholder="最大面积（㎡）" v-model="data.project.areaEnd" class="inputW r" @keyup.native="data.project.areaEnd=data.project.areaEnd.replace(/\D/g,'')"></el-input>
                    </el-row>
                    <!-- 符合业绩条件的数量 -->
                    <el-row>
                        <el-col :span="5">符合业绩条件的数量：</el-col>
                        <el-input-number v-model="data.project.proCount" :min="1" size="mini"></el-input-number>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- 承上启下 -->
        <div class="totalBox  maxW-box">
            <p>共为您找到符合企业<span>{{total?total:0}}</span>条</p>
        </div>
        <!-- 列表 -->
        <div class="list  maxW-box">
            <!-- 判断是否加载中 -->
            <template v-if="isajax">
                <!-- 有数据 -->
                <template v-if="list&&list.length>0">
                    <ul>
                        <li v-for="(o,i) of list" :key="'list'+i">
                            <div class="top">
                                <h5 class="title">{{o.comName}}</h5>
                                <span class="label" :class="o.joinRegion=='入渝'?'ry':'yn'" v-if="o.joinRegion">{{o.joinRegion}}</span>
                            </div>
                            <div class="bottom">
                                <p>注册地：<font>{{o.regisAddress}}</font></p>
                                <p>符合要求资质：<font>{{o.qualCount}}</font></p>
                                <!-- <font>符合要求人员：<font>1</font></p> -->
                                <p>符合要求业绩：<font>{{o.projectCount}}</font></p>
                            </div>
                        </li>
                    </ul>
                    <v-page :all='total' :currents='data.pageNo' :pageSize='data.pageSize' @skip='Goto'></v-page>
                </template>
                <!-- 无数据  -->
                <template v-else-if="list&&list.length==0">
                    <div class="no-toast">
                        <img src="../assets/bank_card @2x.png" alt="">
                        <span>Sorry，没有找到符合条件的企业信息</span>
                    </div>
                </template>
                <!-- 加载失败 -->
                <template v-else-if="!list">
                    <div class="ajax-erroe">
                        <img src="../assets/pic-zoudiu.png" />
                        <span @click="recoldFn">刷新</span>
                    </div>
                </template>
            </template>
            <template v-else>
                <div style="min-height:240px" v-loading="loading" element-loading-text="拼命加载中"></div>
            </template>
            <!-- <ul>
                
                <li>
                    <div class="top">
                        <h5 class="title">湖南耀邦建设有限公司</h5>
                        <span class="label yn">渝内</span>
                    </div>
                    <div class="bottom">
                        <p>注册地：<font>湖南省</font></p>
                        <p>符合要求资质：<font>1</font></p>
                        <p>符合要求人员：<font>1</font></p>
                        <p>符合要求业绩：<font>1</font></p>
                    </div>
                </li>
            </ul> -->
            
        </div>
    </div>
</template>
<script>
import screenZZ from '@/components/screenZZ'
import screenRY from '@/components/screenRY'
import paging from '@/components/paging'
export default {
    name: 'ZHquery', // 结构名称
    data() {
        return {
            // 数据模型
            recordList:[//备案地区
                {
                    name:'渝内企业',
                    code:'in',
                },{
                    name:'入渝企业',
                    code:'enter',
                },{
                    name:'入渝+渝内企业',
                    code:'all_in',
                },
            ],
            itemList:[//业绩所含子项
                {
                    name:'招投标',
                    istap:false,
                },{
                    name:'施工图审查',
                    istap:false,
                },{
                    name:'合同备案',
                    istap:false,
                },{
                    name:'施工许可证',
                    istap:false,
                },{
                    name:'竣工验收',
                    istap:false,
                }
            ],
            purposeList:[//工程用途
                {
                    name:'不限',
                    istap:true,
                },{
                    name:'公共建筑',
                    istap:false,
                },{
                    name:'公共建筑配套工程',
                    istap:false,
                },{
                    name:'办公建筑',
                    istap:false,
                },{
                    name:'居住建筑',
                    istap:false,
                },{
                    name:'居住建筑配套工程',
                    istap:false,
                },{
                    name:'工业建筑',
                    istap:false,
                },{
                    name:'工业建筑配套工程',
                    istap:false,
                },{
                    name:'商业建筑',
                    istap:false,
                },{
                    name:'商住楼',
                    istap:false,
                },{
                    name:'农业建筑',
                    istap:false,
                },{
                    name:'农业建筑配套工程',
                    istap:false,
                },{
                    name:'交通运输类',
                    istap:false,
                },{
                    name:'公共交通',
                    istap:false,
                },{
                    name:'旅游建筑',
                    istap:false,
                },{
                    name:'科教文卫建筑',
                    istap:false,
                },{
                    name:'给水',
                    istap:false,
                },{
                    name:'排水',
                    istap:false,
                },{
                    name:'道路',
                    istap:false,
                },{
                    name:'桥隧',
                    istap:false,
                },{
                    name:'环境园林',
                    istap:false,
                },{
                    name:'风景园林',
                    istap:false,
                },{
                    name:'热力',
                    istap:false,
                },{
                    name:'燃气',
                    istap:false,
                },{
                    name:'通信建筑',
                    istap:false,
                }
            ],
            typeList:[//业绩类型
                {
                    name:'不限',
                    istap:true,
                },{
                    name:'施工',
                    istap:false,
                },{
                    name:'设计',
                    istap:false,
                },{
                    name:'勘察',
                    istap:false,
                },{
                    name:'监理',
                    istap:false,
                },{
                    name:'施工设计一体化',
                    istap:false,
                },{
                    name:'劳务',
                    istap:false,
                },{
                    name:'项目管理',
                    istap:false,
                }
            ],
            addressList:[
                {
                    name:'全国',
                    code:''
                },{
                    name:'重庆市',
                    code:'重庆市'
                }
            ],
            companyQuals:[],
            areasList:[],
            peopleList:[],
            data:{
                joinRegion:'all_in',//备案地区
                qualCode:null,//资质
                pageNo:1,
                pageSize:10,
                regisAddress:'',
                project:{
                    opt:'title',//搜索类型
                    keywords:'',//搜索关键字
                    childProject:null,//业务所含子项
                    proWhere:null,//项目属地
                    proUse:null,//工程用途
                    proType:null,//业绩类型
                    amountStart:null,//最低价
                    amountEnd:null,//最高价
                    contractStart:null,//起始日期
                    contractEnd:null,//结束日期
                    completeStart:null,//竣工起始日期
                    completeEnd:null,//竣工结束日期
                    areaStart:null,//最小面积
                    areaEnd:null,//最大面积
                    proCount:1,//符合业绩条件的数量
                },
                person:[]
                
            },
            list:[],
            total:0,
            loading:true,
            isajax:false
        }
    },
    watch: {
        // 监控集合
        // 'data.project.keywords'(newVal,oldVal){
        //     this.ajax()
        // },
        data:{
            deep:true,
            handler(newVal,oldVal){
                this.ajax()
            }
        }
    },
    inject: ['reload'],
    components:{
        'v-screenzz':screenZZ,
        'v-screenry':screenRY,
        'v-page':paging
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let data = JSON.parse(sessionStorage.getItem('filter'));
        this.companyQuals = data.comQua;
        for(let x of data.area){
            x.istap=false
        }
        this.areasList= data.area;
        this.areasList.unshift({
            name:'不限',
            istap:true,
        })
        let ryData=JSON.parse(sessionStorage.getItem('people'));
        this.peopleList=ryData
        this.ajax()
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
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
        addressFn(el){
            this.data.regisAddress=el.code;
            // this.ajax()
        },
        isBeiFn(el){//备案地区
            this.data.joinRegion=el.code;
            // this.ajax()
        },
        screenzzFn(val){//接受资质变化抛出的值
            this.data.qualCode=val.str;
            // this.ajax()
        },
        screenryFn(val){//接受人员变化抛出的值
            this.data.person=val;
            // this.ajax()
        },
        forArrStr(arr){//从数组中取出对应值
            let a=[];
            let str=''
            for(let x of arr){
                if(x.istap){
                    if(x.name=='不限'){
                        return str
                    }
                    a.push(x.name)
                }
            }
            str=a.join(',')
            return str
        },
        forInLength(arr){//其他都没选，自动选不限
            let a=[];
            for(let x of arr){
                if(x.istap){
                    a.push(x.name)
                }
            }
            if(a.length==0){
                return true
            }else{
                return false
            }
        },
        backSelect(arr){//选不限时，其他取消选择
            for(let x of arr){
                if(x.name!='不限'){
                    x.istap=false
                }
            }
        },
        selectFn(el,arr){//选择
            if(el.name=='不限'){
                el.istap=true
                this.backSelect(arr)
            }else{
                el.istap=!el.istap
                if(this.forInLength(arr)){
                    arr[0].istap=true
                }else{
                    arr[0].istap=false
                }
            }
        },
        itemFn(el){//业绩所含子项
            el.istap=!el.istap;
            this.data.project.childProject=this.forArrStr(this.itemList);
            // this.ajax()
        },
        areaTap(el){//项目属地
            this.selectFn(el,this.areasList)
            this.data.project.proWhere=this.forArrStr(this.areasList);
            // this.ajax()
        },
        typeTap(el){//业绩类型
            this.selectFn(el,this.typeList)
            this.data.project.proType=this.forArrStr(this.typeList);
            // this.ajax()
        },
        purposeTap(el){//工程用途
            this.selectFn(el,this.purposeList)
            this.data.project.proUse=this.forArrStr(this.purposeList);
            // this.ajax()
        },
        Goto(val){
            this.data.pageNo = val.cur;
            // this.ajax()
        },
        ajax(){//查询
            this.list=[];
            this.isajax=false;
            let data=this.data
            data.project.keywords=data.project.keywords.replace(/ /g,',');
            // let data={
            //     regisAddress:"湖南省",
            //     pageNo:1,
            //     pageSize:10
            // }
            let that=this;
            this.$http({
                method:'post',
                url:'query/zonghe/list/company',
                data:data
            }).then(res =>{
                that.isajax=true;
                that.list=res.data.data;
                that.total=res.data.total;
            }).catch(req =>{
                that.list=null
            })
        },
        //刷新
        recoldFn() {
            this.reload();
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.ZHquery{
    background: #f0f0f0;
    padding-bottom: 80px;
    h1{
        text-align: center;
    }
}
.el-row{
    margin-bottom: 10px;
    .flex{
        display: flex;
        align-items: center;
    }
}
.select{
    padding: 15px 10px 10px;
    background-color: #fff;
    font-size: 16px;
    box-sizing: border-box;
    margin: 20px auto;
    .yj{
        .el-input{
            width:250px;
            margin-right: 15px;
        }
        .inputW{
            width: 150px;
        }
        .inputW.r{
            margin-left: 15px;
            margin-right: 0
        }
    }
}
.totalBox{
    background: #fff;
    margin-bottom: 20px;
    padding-left: 10px;
    box-sizing: border-box;
    p{
        line-height: 40px;
        font-size: 16px;
        color: #999;
    }
    span{
        color: @color
    }
}
.list{
    padding: 10px;
    background-color: #fff;
    box-sizing: border-box;
    li{
        height: 80px;
        border-bottom: 1px solid #f0f0f0;
        padding: 15px;
    }
    // li:last-of-type{
    //     border: none;
    // }
    .top{
        position: relative;
        h5{
            font-size: 20px;
        }
        .label{
            position: absolute;
            display: inline-block;
            padding: 5px 7px 5px 22px;
            color: #fff;
            right: 0;
            top: 0;
            text-align: center
        }
        .label:after{
            content: '';
            position: absolute;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            border-left: 15px solid #fff;
            top: 0;
            left: 0;
        }
        .ry{
            background: #f49c17;
        }
        .yn{
            background: #f1ce32;
        }
    }
    .bottom{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        font{
            color: @color
        }
    }
}
</style>
