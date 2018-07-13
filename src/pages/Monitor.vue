<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns  is-multiline">
          <div class="column is-8 is-offset-2">
            <div class="level">
              <div class="level-left">
                <h2 class="level-item"><strong>当前设备</strong></h2>
                <a data-toggle="modal" data-target="#add-dev" href=""><span class="glyphicon glyphicon-plus"></span>添加设备</a>
                <!--<a class="button is-info is-focused level-item" @click="refreshNodeStatus">状态刷新</a>-->

              </div>
              <div id="add-dev" class="modal fade">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body">
                      <button class="close" data-dismiss="modal"> <span>&times;</span> </button>
                    </div>
                    <div class="modal-title">
                      <h1 class="text-center">添加设备</h1> </div>
                    <div class="modal-body">
                      <form class="form-group">
                        <div class="form-group">
                          <label for="">设备名称</label>
                          <input class="form-control" type="text" placeholder="设备名称" v-model='dev.name'> </div>
                        <div class="form-group">
                          <label for="">设备ip地址</label>
                          <input class="form-control" type="text" placeholder="请使用点分十进制表示" v-model='dev.ip'> </div>
                        <div class="form-group">
                          <label for="">readCommunity</label>
                          <input class="form-control" type="text" placeholder="public" v-model='dev.readcommunity'> </div>
                        <div class="form-group">
                          <label for="">writeCommunity</label>
                          <input class="form-control" type="text" placeholder="public" v-model='dev.writecommunity'> </div>
                        <div class="text-right">
                          <button class="btn btn-primary" type="submit" @click='prompt()' data-dismiss="modal">添加</button>
                          <button class="btn btn-danger" data-dismiss="modal">取消</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-8 is-offset-2 is-hidden-mobile">
            <table class="table is-bordered" v-if="!(info === '')">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>名称</th>
                  <th>IP</th>
                  <th>readCommunity</th>
                  <th>writeCommunity</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in info">
                  <td>{{index}}</td>
                  <td>{{i.name}}</td>
                  <td>{{i.ip}}</td>
                  <td>{{i.readcommunity}}</td>
                  <td>{{i.writecommunity}}</td>
                  <td>
                    <router-link to="/system"><a class="btn btn-default" @click="toDetail(index)">管理</a></router-link>
                    <button class="btn btn-danger" @click = "showRemove(index)">
                      删除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="modal fade" id="deleteDev" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                              &times;
                            </button>
                            <h4 class="modal-title" id="myModalLabel">
          Are you sure?
        </h4>
                          </div>
                          <div class="modal-body">
                            确定要取消对名称为{{getCurrent().name}}的设备的监控吗？
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消
                            </button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" @click = "remove()">
                              确定删除
                            </button>
                          </div>
                        </div>
                        <!-- /.modal-content -->
                      </div>
                    </div>
                      <!-- /.modal -->
            </div>
          <a class="button is-info is-focused level-item" @click="refreshNetGraph">状态刷新</a>
            <!-- 这里放置网络拓扑图 -->
          <div id="NetGraph" style="height:400px;"></div>
          </div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'

import { updateStatus, getDeviceType, getNetGraph} from '../api/api'

export default {
  data() {
    return {
      categoryR:'image://../../static/R.png',
      categoryS:'image://../../static/S.jpg',
      selected: {},
      // index 默认从1开始
      dev: {
        name: '',
        ip: '',
        readcommunity: '',
        writecommunity: '',
        deviceType : ''
      },
      option : {
        title: {
          text: '网络拓扑图'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
          {
            type: 'graph',
            layout: 'force',
            draggable: 'true',
            symbolSize: 50,
            roam: true,
            force:{
              repulsion:400,
              edgeLength:200,
            },
            label: {
              normal: {
                show: true
              }
            },
            edgeSymbol: ['circle', 'circle'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            categories:[{
              name:"R",
              symbol:'image://../../static/R.png'
            },{
              name:"S",
              symbol:'image://../../static/S.jpg'
            },
              {
                name:"PC"
              }
            ],
            lineStyle:{
              type:'dotted'
            },
            data: [{
              name: '节点1',
              symbol:"",
            }, {
              name: '节点2',
              category:1,
              symbol:"",
            }, {
              name: '节点3',
              category:2,
              symbol:"",
            }, {
              name: '节点4',
              category:0,
              symbol:"",
            }],
            // links: [],
            links: [ {
              source: '节点2',
              target: '节点1',
            },{
              source: '节点1',
              target: '节点2',
            },
              {
              source: '节点1',
              target: '节点3'
            }, {
              source: '节点2',
              target: '节点3'
            }, {
              source: '节点2',
              target: '节点4'
            }, {
              source: '节点1',
              target: '节点4'
            }],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      },
      // 存储当前选中的设备的下标（不管是删除还是查看详情）
      currentIndex : 0,
    }
  },
  mounted() {
  },
  /*created: function() {
    //按照需求，设置自动更新
    setInterval(this.refreshNodeStatus, 3000)
  },*/
  computed: {
    info() {
      return this.$store.state.info
    },
    topoData() {
      return this.$store.state.topoData
    },
    nodeStatus() {
      return this.$store.state.nodeStatus
    }
  },
  methods: {
    initChart(){
        var echarts = require('echarts');
        var vm=this;
        this.chart1=echarts.init(document.getElementById("NetGraph"));
        this.chart1.showLoading();
        console.log(vm.option);
        getNetGraph().then((res) => {
          vm.chart1.hideLoading();
          vm.option.series[0].data=res.data;
          console.log( vm.option.series[0].data[0]);
          for (var i in vm.option.series[0].data){
            if (vm.option.series[0].data[i].category==0)
            {
              //vm.option.series[0].data[i].prototype.symbol=null;
              vm.option.series[0].data[i].symbol = vm.categoryR;
            }
            else if(vm.option.series[0].data[i].category==1)
            {// vm.option.series[0].data[i].prototype.symbol=null;
              vm.option.series[0].data[i].symbol = vm.categoryS;}
          }
          vm.option.series[0].links=res.link;
          console.log( vm.option.series[0].data[0]);
          console.log(vm.option);
          console.log("graph right");
          vm.chart1.setOption(vm.option)
      })

    },
    refreshNetGraph(){
      var echarts = require('echarts');
      var vm=this;
      /*this.chart1=echarts.init(document.getElementById("NetGraph"));
      console.log(vm.option);
      vm.chart1.setOption(vm.option);*/
      this.$nextTick(() => {
       this.initChart()
      })
    },
    getCurrent(){
      var infos = this.info;
      for(var i in infos){
        if(i == this.currentIndex)
        {
          return infos[i];
        }

      }
      return {};
    },
    showRemove(index){
      this.currentIndex = index;
      $('#deleteDev').modal('show')
    },
    /*addNode(device) {
      let _this = this
      let para = {
        ip: device.ip,
        readcommunity: device.readcommunity,
        writecommunity: device.writecommunity
      }
      // 检查有没有重复添加吧
      for (var i = 0; i < this.topoData.length; i++) {
        if (this.topoData[i].key === device.ip)
          return
      }
      // 根据这些信息添加设备,经过测试发现，1.3.6.1.2.1.4.20.1.1获得的地址还是不太懂而且目前判断它不是构成拓扑图的关键
      axios.post('http://localhost:3777/getNetwork', para).then(function(res) {
        // 这里是获得除了本机地址以外的其他机器的地址
        console.log(res)
        let outgoing = []
        for (var k = 1; k < res.data.length; k++) {
          let ip = res.data[k].ipAddress
          outgoing.push(ip)
          let i = -1
          for (var j = 0; j < _this.topoData.length; j++) {
            let node = _this.topoData[j]
            if (ip === node.key) {
              i = 1
              _this.topoData[j].outgoing.push(device.ip)
              break
            }
          }
          if (i === -1) {
            _this.topoData.push({ key: ip, name: ip, type: "network", outgoing: [device.ip] })
          }
        }
        _this.topoData.push({ key: device.ip, name: device.name, type: "device_up", outgoing })
        _this.networkReload()
      })
    },*/
    /*delNode(ip) {
      let _topoData = this.topoData
      console.log(_topoData)
      for (var i = 0; i < _topoData.length; i++) {
        if (_topoData[i].key === ip) {
          let outgoing = _topoData[i].outgoing
          _topoData.splice(i, 1)
          for (var j = 0; j < outgoing.length; j++) {
            for (var k = 0; k < _topoData.length; k++) {
              if (_topoData[k].key === outgoing[j]) {
                let index = _topoData[k].outgoing.indexOf(ip)
                if (index !== -1) {
                  _topoData[k].outgoing.splice(index, 1)
                  if (_topoData[k].outgoing.length === 0)
                    _topoData.splice(k, 1)
                }
              }
            }
          }
        }


      }
      this.topoData = _topoData
      console.log(this.topoData)
      this.networkReload()
    },*/
    /*addNodeStatus(device) {
      let para = {
        ip: device.ip,
        readcommunity: device.readcommunity,
        writecommunity: device.writecommunity
      }
      updateStatus(para).then((res) => {
        this.nodeStatus.push({ ip: device.ip, readcommunity: device.readcommunity,writecommunity: device.writecommunity, status: res })
        console.log(res)
      })
    },*/
    /*refreshNodeStatus() {
      var _this = this
      for (var index in this.nodeStatus) {
        let node = this.nodeStatus[index]
        let para = {
          ip: node.ip,
          readcommunity: node.readcommunity,
          writecommunity: node.writecommunity
        }
        updateStatus(para).then((res) => {
          // console.log(node.status)
          // console.log(res)
          for (var index2 in res) {
            if (node.status[index2] === 'UP' && res[index2] === 'DOWN') {
              for (var index3 in _this.topoData) {
                if (_this.topoData[index3].key === node.ip) {
                  _this.topoData[index3].type = 'device_down'
                  break
                }
              }
              break
            } else if (parseInt(index2) === node.status.length - 1) {
              // console.log('in')
              for (var index3 in _this.topoData) {
                if (_this.topoData[index3].key === node.ip) {
                  _this.topoData[index3].type = 'device_up'
                  break
                }
              }
            }
          }
        })
      }
      this.networkReload()
    },*/
    // 这里改变了全局的ip和community
    toDetail(index) {
      var ip = this.info[index].ip
      var readcommunity = this.info[index].readcommunity
      var writecommunity = this.info[index].writecommunity
      this.$store.state.selectedIp = ip
      this.$store.state.selectedreadCommunity = readcommunity
      this.$store.state.selectedwriteCommunity = writecommunity
    },
    remove() {
      this.info.splice(this.currentIndex, 1);
    },
    prompt() {
      var vm = this
      // 注意在定义newRow时尽可能吧所有的属性都初始化
      var newRow = {
        name: vm.dev.name,
        ip: vm.dev.ip,
        readcommunity: vm.dev.readcommunity,
        writecommunity: vm.dev.writecommunity,
        deviceType : -1,
      }
      let para = {
        ip: vm.dev.ip,
        readcommunity: vm.dev.readcommunity,
        writecommunity: vm.dev.writecommunity
      }

      getDeviceType(para).then((res) => {
        this,refreshNetGraph();
        newRow.deviceType = res;
        console.log(res);
      })
      vm.info.push(newRow)
      // 设置之前的输入为空
      vm.dev.name = ''
      vm.dev.ip = ''
      vm.dev.readcommunity = ''
      vm.dev.writecommunity = ''
      // vm.addNode(newRow)
      // vm.addNodeStatus(newRow)
    },
    /*networkReload() {
      // 这里是实现网络拓扑的函数，之后再看
      // 应该是chart.js
      var chart = jui.include("chart.builder")
      // empty删除#network内所有内容
      $('#network').empty()
      chart('#network', {
        padding: 5,
        axis: {
          c: {
            type: "topologytable"
          },
          data: this.topoData
        },
        brush: {
          type: "topologynode",
          nodeText: function(data) {
            if (data.type === "device_up") {
              return data.name;
            } else if (data.type === "device_down") {
              return '!';
            } else {
              return 'N';
            }
          },
          nodeTitle: function(data) {
            if (data.type == "device_up") {
              return `${data.key}(在线)`;
            } else if (data.type == "device_down") {
              return `${data.key}(离线)`;
            } else {
              return data.name;
            }
          }
        },
        widget: {
          type: "topologyctrl",
          zoom: true,
          move: true
        },
        style: {
          topologyNodeRadius: 30,
          topologyNodeFontSize: 40,
          topologyNodeFontColor: "#fff",
          topologyNodeTitleFontSize: 8,
          topologyNodeTitleFontColor: "#333",
        }
      })
    }*/
  }
}

</script>

