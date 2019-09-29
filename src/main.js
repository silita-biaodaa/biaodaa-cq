// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import cnJson from './china'
import ElementUI from 'element-ui';
import http from '@/base/http'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import cnJson from './cnJson'
echarts.registerMap('china',cnJson)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
    //资质，地区筛选
    this.$http({
        method:'post',
        url:'/new/common/condition',
        data:{}
    }).then(res => {
        sessionStorage.setItem('filter',JSON.stringify(res.data.data));
    }).catch(req =>{
        console.log(req);
    })
    //人员筛选
    this.$http({
        method:'post',
        url:'/person/cate',
        data:{}
    }).then(res =>{
      sessionStorage.setItem('people',JSON.stringify(res.data.data));
    })
  },
})
