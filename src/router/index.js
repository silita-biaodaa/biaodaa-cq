import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import ZHquery from '@/page/ZHquery'
import skyDetail from '@/page/skyDetail'
import companyDetail from '@/page/companyDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path:'/sky-query',
      name:'ZHquery',
      component:ZHquery
    },{
      path:'/skyDetail',
      name:'skyDetail',
      component:skyDetail
    },{
      path:'/companyDetail',
      name:'companyDetail',
      component:companyDetail
    }
  ]
})
