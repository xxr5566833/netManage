import Vue from 'vue'
import Router from 'vue-router'
import Monitor from '@/pages/Monitor'
import Interface from '@/pages/Interface'
import RoutingTable from '@/pages/RoutingTable'
import System from '@/pages/System'
import Trap from '@/pages/Trap'

Vue.use(Router)

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
