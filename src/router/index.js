import Vue from 'vue'
import Router from 'vue-router'
// @是/src的别名，但是我还没找到在哪个文件中定义的
import Graph from '@/pages/Graph'
import Monitor from '@/pages/Monitor'
import Interface from '@/pages/Interface'
import RoutingTable from '@/pages/RoutingTable'
import System from '@/pages/System'
import Vlan from '@/pages/Vlan'
import Test from '@/pages/Test'
import Disk from '@/pages/Disk'
import Process from '@/pages/Process'
import TranslationTable from '@/pages/TranslationTable'
import TCPConnect from '@/pages/TCPConnect'
Vue.use(Router)

// 路由路径配置，主要是path和component的对应
export default new Router({
  // 加了这个就不会出现地址栏多/#
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/devList'
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/disk',
      name: 'Disk',
      component: Disk
    },
    {
      path: '/translationTable',
      name: 'translation',
      component: TranslationTable
    },
    {
      path: '/devList',
      name: 'Monitor',
      component: Monitor
    },
    {
      path: '/process',
      name: 'Process',
      component: Process
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
      path: '/vlan',
      name: 'Vlan',
      component: Vlan
    },
    {
      path: '/TCPConnect',
      name: 'TCPConnect',
      component: TCPConnect
    },
    {
      path: '/graph',
      name: 'Graph',
      component: Graph
    }
  ]
})
