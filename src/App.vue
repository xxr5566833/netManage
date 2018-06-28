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
                    <div class="panel panel-default menu-first menu-first-active">
                        <a data-toggle="collapse" data-parent="#accordion" href="index.html" aria-expanded="true"
                           aria-controls="collapseOne">
                            <i class="icon-home icon-large"></i> 主页
                        </a>
                    </div>
                    <div class="panel panel-default menu-first">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
                           aria-controls="collapseOne">
                            <i class="icon-user-md icon-large"></i> 设备管理</a>
                        </a>

                        <div id="collapseOne" class="panel-collapse collapse " >
                            <ul class="nav nav-list menu-second">
                                <li :class="selectMenu[0].style" @click="select(3)"><router-link to = '/devList'><i class="icon-user"></i>设备增删 </router-link></li>
                                <li :class = "selectMenu[3].style" @click="select(3)"><router-link to = '/system'><i class="icon-edit"></i> 设备信息</router-link></li>
                                <li :class = "selectMenu[1].style" @click = "select(1)"><router-link to = '/interface'><i class="icon-edit"></i> 端口列表</router-link></li>
                                <li :class = "selectMenu[2].style" @click = "select(2)"><router-link to = "/routingTable"><i class="icon-list"></i> 路由表</router-link></li>
                                <li :class = "selectMenu[4].style" @click = "select(4)"><router-link to = "/trap"><i class="icon-list"></i> Trap</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="panel panel-default menu-first">
                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"
                           aria-expanded="false" aria-controls="collapseTwo">
                            <i class="icon-book icon-large"></i> 用户管理</a>
                        </a>
                        <div id="collapseTwo" class="panel-collapse collapse">
                            <ul class="nav nav-list menu-second">
                                <li><a href="#"><i class="icon-user"></i> 子选项1</a></li>
                                <li><a href="#"><i class="icon-edit"></i> 子选项2</a></li>
                                <li><a href="#"><i class="icon-trash"></i> 子选项3</a></li>
                                <li><a href="#"><i class="icon-list"></i> 子选项4</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="panel panel-default menu-first">
                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"
                           aria-expanded="false" aria-controls="collapseThree">
                            <i class="icon-book icon-large"></i> 其他管理</a>
                        </a>

                        <div id="collapseThree" class="panel-collapse collapse">
                            <ul class="nav nav-list menu-second">
                                <li><a href="#"><i class="icon-user"></i> 子选项1</a></li>
                                <li><a href="#"><i class="icon-edit"></i> 子选项2</a></li>
                                <li><a href="#"><i class="icon-trash"></i> 子选项3</a></li>
                                <li><a href="#"><i class="icon-list"></i> 子选项4</a></li>
                            </ul>
                        </div>
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
                  <router-view> </router-view>
                </div>
                
            </div>
            <!--右侧内容结束-->
        </div>
    </div>
</section>
</header>

<!--
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
        <router-view :select="select"></router-view>
      </div>
    </section>
  -->
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
