import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import ZHquery from '@/page/ZHquery'

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
    }
  ]
})
