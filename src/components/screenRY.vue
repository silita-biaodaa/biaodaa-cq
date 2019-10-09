<template>
    <div class="screenRY">
        <div class="search-b">
            <el-col :span="2">人员要求:</el-col>
        </div>
        <!-- 人员 -->
        <div v-for="(el,i) of lengthList" :key="i" class="screen padding-l">
            <template v-if="el.type==0">
                <el-select placeholder="请选择证书类别" clearable v-model="el.one.cateName"  @change="oneChangeFn(el,i)">
                    <el-option v-for="item in el.one.list" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
                </el-select>
                <el-select placeholder="请选择证书等级/专业" clearable v-model="el.two.cateName"  v-if="el.two.list&&el.two.list.length>0"   @change="twoChangeFn(el,i)">
                    <el-option v-for="item in el.two.list" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
                </el-select>
                <el-select placeholder="请选择证书专业" clearable multiple collapse-tags v-model="el.three.cateName" @change="threeChangeFn(el,i)" v-if="el.three.list&&el.three.list.length>0">
                    <el-option v-for="item in el.three.list" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
                </el-select>
                人员数量：
                <el-input-number v-model="el.num" :min="1" size="mini" @change="returnStr"></el-input-number>
                <span class='del-btn' v-if="i!=0" @click="delFn(i)">删除</span>
            </template>
            <!-- 一人多证 -->
            <template v-else>
                <div class="box">
                    <!-- 条件 -->
                    <el-row v-for="(x,y) of el.list" :key="'a'+y">
                        <el-select placeholder="请选择证书类别" clearable v-model="x.one.cateName"  @change="oneChangeFn(x,y)">
                            <el-option v-for="item in x.one.list" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
                        </el-select>
                        <el-select placeholder="请选择证书等级/专业" clearable v-model="x.two.cateName" v-if="x.two.list&&x.two.list.length>0"   @change="twoChangeFn(x,y,el)">
                            <el-option v-for="item in x.two.list" :key="item.code" :label="item.cateName" :value="item.cateName"></el-option>
                        </el-select>
                        <el-select placeholder="请选择证书专业" multiple collapse-tags clearable v-model="x.three.cateName" @change="threeChangeFn(x,y,el)" v-if="x.three.list&&x.three.list.length>0">
                            <el-option v-for="item in x.three.list" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
                        </el-select>
                        <span class='del-btn' v-if="y!=0&&y!=1" @click="delFn(y,el)">删除</span>
                    </el-row>
                    <div class="btn" @click="addFn(el)">
                        <i class='el-icon-plus'></i>增加条件
                    </div>
                    <div class="people-num">
                        人员数量：
                        <el-input-number v-model="el.num" :min="1" size="mini" @change="returnStr"></el-input-number>
                    </div>
                    <div class="close" @click="delFn(i)">
                        <i class="el-icon-error"></i>
                    </div>
                </div>
            </template>
        </div>
        <!-- 增加条件 -->
        <div class="spacing-box">
            <div class="btn" @click="addFn()">
                <i class='el-icon-plus'></i>增加条件
            </div>
            <div class="btn" @click="addtoFn">
                <i class='el-icon-plus'></i>增加一人多证
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'screenRY',    
    data () {
        return {
            lengthList:[
                {
                    one:{
                        list:[],//用作显示
                        cateName:'',//code值
                    },
                    two:{
                        list:[],//用作显示
                        cateName:'',
                    },
                    three:{
                        list:[],//用作显示
                        cateName:'',
                    },
                    num:1,//人员数量
                    type:0,//是否一人多证 0为不是，1为是
                    str:''
                }
            ]
        }
    },
    props:{
        qualList:{
            type:Array
        }
    },
    watch:{
    },
    methods: {
        forInList(arr){
            for(let x of arr){
                if(x.str==''){
                    return
                }
            }
        },
        addFn(o=null){//添加条件
            if(o){//一人多证内
                let data={
                    one:{
                        list:this.qualList,//用作显示
                        cateName:'',
                    },
                    two:{
                        list:[],//用作显示
                        cateName:'',
                    },
                    three:{
                        list:[],//用作显示
                        cateName:'',
                    },
                    str:'',
                }
                for(let x of o.list){//判断是否空选
                    if(x.str==''){
                        return this.$confirm('请将上一级填写完毕，再添加条件', '提示', {
                            type: 'warning',
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                    }
                }
                o.list.push(data)
            }else{//非一人多证内
                let data={
                    one:{
                        list:this.qualList,//用作显示
                        cateName:'',
                    },
                    two:{
                        list:[],//用作显示
                        cateName:'',
                    },
                    three:{
                        list:[],//用作显示
                        cateName:'',
                    },
                    num:1,
                    type:0,
                    str:'',
                }
                for(let x of this.lengthList){//判断是否空选
                    if(x.str==''){
                        return this.$confirm('请将前面的条件填写完毕，再添加条件', '提示', {
                            type: 'warning',
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                    }
                }
                this.lengthList.push(data)
            }
            
        },
        delFn(i,el=null){//删除条件
            if(el){
                el.list.splice(i,1);
                return
            }
            this.lengthList.splice(i,1);
            this.returnStr();
        },
        addtoFn(){//添加一人多证
            let data={
                list:[
                    {
                        one:{
                            list:this.qualList,//用作显示
                            cateName:'',
                        },
                        two:{
                            list:[],//用作显示
                            cateName:'',
                        },
                        three:{
                            list:[],//用作显示
                            cateName:'',
                        },
                        str:'',
                    },{
                        one:{
                            list:this.qualList,//用作显示
                            cateName:'',
                        },
                        two:{
                            list:[],//用作显示
                            cateName:'',
                        },
                        three:{
                            list:[],//用作显示
                            cateName:'',
                        },
                        str:'',
                    }
                ],
                num:1,
                type:1,
            }
            for(let x of this.lengthList){
                if(x.list){
                    for(let o in x.list){
                        if(x.list[o].str==''){
                            return this.$confirm('请将前面的条件填写完毕，再添加条件', '提示', {
                                type: 'warning',
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                        }
                    }
                }
            }
            this.lengthList.push(data)
        },
        forinFn(){//匹配是否重复
            if(this.lengthList.length>1){
                for(let x of this.lengthList){
                    if(x.type==1){//一人多证
                        let many=[],many1;
                        for(let o of x.list){
                            if(o.str==''){
                                return false
                            }
                            many.push(o.two.cateName)
                        }
                        many1=new Set(many);
                        if(many.length!=many1.size){
                            return true
                        }
                    }
                }
            }
        },
        oneChangeFn(o,i){
            o.two.list=[];
            o.three.list=[];
            o.two.cateName='';
            o.three.cateName='';
            o.str=''
            for(let x of o.one.list){
                if(x.cateName==o.one.cateName){
                    if(x.list){
                        o.two.list=x.list
                    }else{
                        o.str=o.one.cateName
                        this.returnStr();
                        break
                    }
                }
            }
        },
        twoChangeFn(o,i,el=null){
            o.three.cateName='';
            o.three.list=[];
            o.str=o.two.cateName;
            for(let x of o.two.list){
                if(x.cateName==o.two.cateName){
                    o.three.list=x.list
                }
            }
            if(this.forinFn()){
                o.two.cateName='';
                this.$confirm('条件重复，请重新选择', '提示', {
                    type: 'warning',
                    showCancelButton: false,
                    showConfirmButton: false
                })
                return
            }
            if(el){//单个条件
                for(let x of el.list){
                    if(x.str==''){
                        return
                    }
                }
                this.returnStr();
            }else{
                this.returnStr();
            }
        },
        threeChangeFn(o,i,el=null){
            let arr=[];
            arr[0]=o.two.cateName;
            arr[1]=o.three.cateName;
            o.str=arr.join('/');
            if(this.forinFn()){
                o.three.cateName='';
                this.$confirm('条件重复，请重新选择', '提示', {
                    type: 'warning',
                    showCancelButton: false,
                    showConfirmButton: false
                })
                return
            }
            if(el){//单个条件
                for(let x of el.list){
                    if(x.str==''){
                        return
                    }
                }
                this.returnStr();
            }else{
                this.returnStr();
            }
            
        },
        returnStr(){//抛回父组件参数
            let arr=[]
            for(let x of this.lengthList){
                let obj
                if(x.type==0){
                    obj={
                        perType:"not",
                        num:x.num,
                        data:[x.str]
                    }
                }else{
                    obj={
                        perType:"yes",
                        num:x.num,
                        data:[]
                    }
                    for(let y of x.list){
                        obj.data.push(y.str)
                    }
                }
                arr.push(obj)
            }
            this.$emit('contentChange',arr)
        },
    },
    created(){
        this.lengthList[0].one.list=this.qualList;
    }
}
</script>
<style lang="less" scoped>
.screenRY{
    .screen{
        margin-bottom: 10px
    }
    .el-select{
        margin-right: 10px;
        width: 225px;
    }
    .padding-l{
        padding-left: 98px;
        .del-btn{
            color: @color;
            cursor: pointer;
            margin-left: 15px;
        }
    }
    .spacing-box{
        display: flex;

        padding-left: 98px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .btn{
        margin-right: 15px;
        color: @color;
        height: 28px;
        line-height: 28px;
        // background: @color;
        border: 1px solid @color;
        border-radius: 5px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        padding: 0 10px;
    }
    .search-b{
        margin-bottom: 10px;
        position: relative;
        .search-list{
            position: absolute;
            left: 98px;
            z-index: 999;
            top: 40px;
            border: 1px solid #f2f2f2;
            background: #fff;
            max-height: 196px;
            width: 470px;
                // border-radius: 5px;
            box-shadow: 1px 2px 5px #cccc;
            border-radius: 0 0 5px 5px;
            overflow-y: auto;
            li{
                padding: 10px;
                font-size: 14px;
                cursor: pointer;
            }
            li:hover{
                background-color: @color;
                color: #fff;
            }
        }
        .search-tips{
            font-size: 14px;
            color: @color;
            margin-left: 30px;
        }
    }
    .box{
        border: 1px solid #f2f2f2;
        padding: 20px;
        position: relative;
        .el-row{
            margin-bottom: 10px;
        }
        .btn{
            position: absolute;
            top: 20px;
            right: 60px;
            margin-right: 0;
        }
        .people-num{
            position: absolute;
            bottom: 20px;
            right: 60px;
        }
        .close{
            position: absolute;
            right: 5px;
            top: 5px;
            font-size: 24px;
            color: red;
            cursor: pointer;
        }
    }
}
</style>