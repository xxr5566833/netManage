<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="tabs menu-bar">
          <ul>
            <li :class="selectMenu[0].style" @click="select(0)"><router-link to="/">设备列表</router-link></li>
            <li :class="selectMenu[3].style" @click="select(3)"><router-link to="/system">系统信息</router-link></li>
            <li :class="selectMenu[1].style" @click="select(1)"><router-link to="/interface">端口列表</router-link></li>
            <li :class="selectMenu[2].style" @click="select(2)"><router-link to="/routingTable">路由表</router-link></li>
            <li :class="selectMenu[4].style" @click="select(4)"><router-link to="/trap">Trap</router-link></li>
          </ul>
        </div>
        <!-- select特性 -->
        <router-view :select="select"></router-view>
      </div>
    </section>
  </div>
</template>

<script>
  // 提供了很多工具
var firebase = require('firebase')
var config = {
  apiKey: 'AIzaSyBe7u9FtZ5ATGU69hfd9NBbHiGCGreSWIM',
  authDomain: 'snmp-monitor-fitm.firebaseapp.com',
  databaseURL: 'https://snmp-monitor-fitm.firebaseio.com',
  projectId: 'snmp-monitor-fitm',
  storageBucket: 'snmp-monitor-fitm.appspot.com',
  messagingSenderId: '992008104190'
}
firebase.initializeApp(config)
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      selectMenu: [{
        style: ''
      },
      {
        style: ''
      },
      {
        style: ''
      },
        {
          style: ''
        },
      {
        style: ''
      }],
      InFire: []
    }
  },
  methods: {
    ...mapActions(['getInfo', 'getInfoFire']),
    select (menu) {
      // 为了设置class，感觉有更好的设置方法吧，可以仅仅维护一个int变量，然后
      //在上面的:class后面加上 变量==特定值，根据true或false来决定是否设置这个class
      this.selectMenu[0].style = ''
      this.selectMenu[1].style = ''
      this.selectMenu[2].style = ''
      this.selectMenu[3].style = ''
      this.selectMenu[4].style = ''
      this.selectMenu[menu].style = 'is-active'
    }
  },
  mounted () {
    this.select(0)
    // var Info = firebase.database().ref('/info')
    // Info.on('child_changed', function (snapshot) {
    //   let indexInfo = vm.InFire.find(item => item.key === snapshot.key)
    //   let data = snapshot.val()
    //   data.key = snapshot.key
    //   if (indexInfo) {
    //     indexInfo.cpu = data.cpu
    //     indexInfo.temp = data.temp
    //     indexInfo.inbound = data.inbound
    //     indexInfo.outbound = data.outbound
    //     indexInfo.interface = data.interface
    //   }
    // })
    // Info.on('child_added', function (snapshot) {
    //   let indexInfo = vm.InFire.findIndex(item => item.key === snapshot.key)
    //   let data = snapshot.val()
    //   data.key = snapshot.key
    //   if (indexInfo === -1) {
    //     console.log('add')
    //     vm.InFire.push(data)
    //   }
    // })
  }
}
</script>

<style>
</style>
