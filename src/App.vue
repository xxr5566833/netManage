<template>
  <div id="app">
    <header>
    <div class="container-fluid navbar-fixed-top bg-primary">
        <!-- 上面的蓝色标题 -->
        <ul class="nav navbar-nav  left">
            <li class="text-white h4">
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-leaf"></span>&nbsp;&nbsp;<b>snmp网管系统</b>
            </li>
        </ul>
        <ul class="nav navbar-nav nav-pills right ">
            <!-- 是右上角的四个按钮 -->
            <li class="bg-warning ">
                <a href="#"><span class="glyphicon glyphicon-tasks"></span><span class="badge">1</span></a>
            </li>
            <li class="bg-success">
                <a href="#"><span class="glyphicon glyphicon-envelope"></span><span class="badge">2</span></a>
            </li>
            <li class="bg-danger">
                <a href="#"><span class="glyphicon glyphicon-bell"></span></a>
            </li>
            <li class="bg-info dropdown">
                <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                    <span class="glyphicon glyphicon-user"></span>&nbsp;<span>系统管理员</span><span class="caret"></span>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                    <li class="text-center"><a href="#"><span class="text-primary">账号设置</span></a></li>
                    <li class="text-center"><a href="#"><span class="text-primary">消息设置</span></a></li>
                    <li class="text-center"><a href="#"><span class="text-primary">帮助中心</span></a></li>
                    <li class="divider"><a href="#"></a></li>
                    <!-- 登录界面跳转 -->
                    <li class="text-center"><a href="login.html"><span class="text-primary">退出</span></a></li>
                </ul>
            </li>
        </ul>
    </div>
<section>
    <div class="container-fluid">
        <div class="row ">
            <!--左侧导航开始-->
            <div class="col-xs-2 bg-blue">
                <br/>
                <div class="panel-group sidebar-menu" id="accordion" aria-multiselectable="true">
                    <div class="panel panel-default menu-first">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
                           aria-controls="collapseOne">
                          <router-link to = '/devList'><i class="icon-user-md icon-large"></i> 设备管理</router-link></a>
                    </div>
                    <div class="panel panel-default menu-first">
                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"
                           aria-expanded="false" aria-controls="collapseTwo">
                          <router-link to = '/graph'><i class="icon-book icon-large"></i> 网络拓扑</router-link></a>
                    </div>
                    <div class="panel panel-default menu-first">
                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"
                           aria-expanded="false" aria-controls="collapseThree">
                          <router-link to = '/TCPConnect'><i class="icon-book icon-large"></i> TCP管理</router-link></a>
                    </div>
                </div>
            </div>
            <!--左侧导航结束-->
            <!--右侧内容开始-->
            <div class="col-xs-10">
                <br/>
                <ol class="breadcrumb">
                    <li class="active"><span class="glyphicon glyphicon-home"></span>&nbsp;后台首页</li>
                </ol>
                <div style="background-color: white">
                  <router-view > </router-view>
                </div>

            </div>
            <!--右侧内容结束-->
        </div>
    </div>
</section>
</header>
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
      InFire: []
    }
  },
  methods: {
    ...mapActions(['getInfo', 'getInfoFire']),
  },
  /*mounted () {
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
  }*/
}
</script>

<style>

</style>
