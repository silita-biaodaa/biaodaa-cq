import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        queryData:{
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
                proCount:0,//符合业绩条件的数量
            },
            person:[]
        },
    },
    mutations:{
        changeQueryData(state,data){
            state.queryData=data
        }
    }
})

export default store