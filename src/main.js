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
// import store from './store';
Vue.use(ElementUI);
// import cnJson from './cnJson'
echarts.registerMap('china',cnJson)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false


/*
*格式化时间  yyyy-mm-dd
*@param param 需要格式化的时间戳
*@param type 传值则为yyyy-mm-dd hh:mm:ss
**/
Vue.prototype.formatDate = function(param, type=null) {
  var a = new Date(param);
  var m = a.getMonth() + 1;
  if(m < 10) {
      m = '0' + m;
  }
  var d = a.getDate();
  if(d < 10) {
      d = '0' + d;
  }
  var b = a.getFullYear() + '-' + m + '-' + d;

  if(type != null) {
      var h = a.getHours();
      if(h < 10) {
          h = '0' + h;
      }
      var mm = a.getMinutes();
      if(mm < 10) {
          mm = '0' + mm;
      }
      var ss = a.getSeconds();
      if(ss < 10) {
          ss = '0' + ss;
      }
      b = b + ' ' + h + ':' + mm + ':' + ss;
  }
  return b;
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>',
  created() {
    //资质，地区筛选
    if(!sessionStorage.getItem('filter')){
      this.$http({
          method:'post',
          url:'/new/common/condition',
          data:{}
      }).then(res => {
          sessionStorage.setItem('filter',JSON.stringify(res.data.data));
          history.go(0)
      }).catch(req =>{
          console.log(req);
      })
    }
    if(!sessionStorage.getItem('people')){
      //人员筛选
      this.$http({
          method:'post',
          url:'/person/cate',
          data:{}
      }).then(res =>{
        sessionStorage.setItem('people',JSON.stringify(res.data.data));
        history.go(0)
      })
    }
    
  },
})
