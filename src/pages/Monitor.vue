<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns  is-multiline">
          <div class="column is-8 is-offset-2">
            <div class="level">
              <div class="level-left">
                <p class="level-item"><strong>当前设备</strong></p>
                <a data-toggle="modal" data-target="#add-dev" href=""><span class="glyphicon glyphicon-log-in"></span>添加设备</a>
                <a class="button is-info is-focused level-item" @click="refreshNodeStatus">状态刷新</a>
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
                      <form class="form-group" action="">
                        <div class="form-group">
                          <label for="">设备名称</label>
                          <input class="form-control" type="text" placeholder="设备名称" v-model='dev.name'> </div>
                        <div class="form-group">
                          <label for="">设备ip地址</label>
                          <input class="form-control" type="text" placeholder="使用点分十进制表示" v-model='dev.ip'> </div>
                        <div class="form-group">
                          <label for="">设备Community</label>
                          <input class="form-control" type="text" placeholder="public" v-model='dev.community'> </div>
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
                  <th>类型</th>
                  <th>IP</th>
                  <th>Community</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in info">
                  <td>{{i.id}}</td>
                  <td>{{i.name}}</td>
                  <td>{{i.deviceType == 0 ? ("主机") : (i.deviceType == 1 ? "交换机" : "路由器")}}</td>
                  <td>{{i.ip}}</td>
                  <td>{{i.community}}</td>
                  <td>
                    <router-link to="/system"><a class="button is-info" @click="toDetail(i.ip, i.community)">详情</a></router-link>
                    <button class="btn btn-primary btn-lg" @click = "del(i)">
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
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                            </button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" @click = "remove()">
                              Delete
                            </button>
                          </div>
                        </div>
                        <!-- /.modal-content -->
                      </div>
                    </div>
                      <!-- /.modal -->
            </div>
            <!-- 这里放置网络拓扑图 -->
            <div id="network" class="column is-8 is-offset-2 is-hidden-mobile"></div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { updateStatus , getDeviceType } from '../api/api'
export default {
  props: ['select'],
  data() {
    return {
      selected: {},
      index: 3,
      dev: {
        name: '',
        ip: '',
        community: '',
        type : 0
      },
      currentIndex : 0,
    }
  },
  mounted() {
    this.select(0)
    this.networkReload()
  },
  created: function() {
    //按照需求，设置自动更新
    setInterval(this.refreshNodeStatus, 3000)
  },
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
    getCurrent(){
      var infos = this.info;
      for(var i in infos){
        var info = infos[i]
        if(info.id == this.currentIndex)
        {
          return infos[i];
        }

      }
      return {};
    },

    del(i){
      this.currentIndex = i.id;
      $('#deleteDev').modal('show')
    },
    addNode(device) {
      let _this = this
      let para = {
        ip: device.ip,
        community: device.community
      }
      // 检查有没有重复添加吧
      for (var i = 0; i < this.topoData.length; i++) {
        if (this.topoData[i].key === device.ip)
          return
      }
      // 根据这些信息添加设备
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
    },
    delNode(ip) {
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
    },
    addNodeStatus(device) {
      let para = {
        ip: device.ip,
        community: device.community
      }
      updateStatus(para).then((res) => {
        this.nodeStatus.push({ ip: device.ip, community: device.community, status: res })
        console.log(res)
      })
    },
    refreshNodeStatus() {
      var _this = this
      for (var index in this.nodeStatus) {
        let node = this.nodeStatus[index]
        let para = {
          ip: node.ip,
          community: node.community
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
    },
    // 这里改变了全局的ip和community
    toDetail(ip, community) {
      this.$store.state.selectedIp = ip
      this.$store.state.selectedCommunity = community
      console.log ("to detail")
    },
    remove() {

          for (var i in this.info) {
            if (this.info[i].id === this.currentIndex) {
              this.delNode(this.info[i].ip)
              this.info.splice(i, 1)
              this.nodeStatus.splice(i, 1)
              console.log(this.info)
            }
          }
    },
    prompt() {
      var vm = this
      /*this.$dialog.prompt({
        message: `设备名称`,
        placeholder: '',
        maxlength: 20,
        inputMaxlength: 20,
        confirmText: `下一步`,
        onConfirm: (value1) => {
          this.$dialog.prompt({
            message: `IP 地址`,
            maxlength: 20,
            confirmText: `下一步`,
            placeholder: '192.168.1.1',
            onConfirm: (value2) => {
              this.$dialog.prompt({
                message: `Community`,
                maxlength: 20,
                placeholder: 'public',
                onConfirm: (value3) => {
                  this.$toast.open({
                    message: '设备名称: ' + value1 + '     IP: ' + value2 + '     Community: ' + value3,
                    type: 'is-success',
                    duration: 3000
                  })
                  let newRow = {
                    id: vm.index,
                    name: value1,
                    ip: value2,
                    community: value3
                  }
                  vm.index++
                  vm.info.push(newRow)
                  vm.addNode(newRow)
                  vm.addNodeStatus(newRow)
                }
              })
            }
          })
        }
      })*/
      var newRow = {
        id: vm.index,
        name: vm.dev.name,
        ip: vm.dev.ip,
        community: vm.dev.community,
        deviceType : 0,
      }
      // 这里设置newRow的类型

      let para = {
          ip: vm.dev.ip,
          community: vm.dev.community
      }
      getDeviceType(para).then((res) => {
        newRow.deviceType = res
        console.log(newRow)  
      })
      console.log(newRow.deviceType)
      vm.index++
      vm.info.push(newRow)
      // 设置之前的输入为空
      vm.dev.name = ''
      vm.dev.ip = ''
      vm.dev.community = ''
      vm.addNode(newRow)
      vm.addNodeStatus(newRow)
    },
    networkReload() {
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
    }
  }
}

</script>
<style lang="css" scoped>
#network {
  height: 600px;
}

</style>
