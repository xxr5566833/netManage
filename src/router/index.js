import Vue from 'vue'
import Router from 'vue-router'
// @是/src的别名，但是我还没找到在哪个文件中定义的
import Monitor from '@/pages/Monitor'
import Interface from '@/pages/Interface'
import RoutingTable from '@/pages/RoutingTable'
import System from '@/pages/System'
import Trap from '@/pages/Trap'

Vue.use(Router)

// 路由路径配置，主要是path和component的对应
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Monitor',
      component: Monitor
    },
    {
      path: '/interface',
      name: 'Interface',
      component: Interface
    },
    {
      path: '/routingTable',
      name: 'RoutingTable',
      component: RoutingTable
    },
    {
      path: '/system',
      name: 'System',
      component: System
    },
    {
      path: '/trap',
      name: 'Trap',
      component: Trap
    }
  ]
})
