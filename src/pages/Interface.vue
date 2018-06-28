<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              端口列表
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedIp}}
            </h2>
            <div class="columns is-multiline">
              <div class="column is-2" v-for="i in interfaces">
                <img src="../assets/icons8-EthernetOn.png" v-if="i.status === 'UP'">
                <img src="../assets/icons8-EthernetOff.png" v-if="i.status === 'DOWN'">
                <div class="tag is-success is-medium" v-if="i.status === 'UP'">{{i.name}}</div>
                <div class="tag is-danger is-medium" v-if="i.status === 'DOWN'">{{i.name}}</div>
              </div>
            </div>
          </div>
          <div class="column is-10 is-offset-1 ">
            <!-- 如果interfaces是空，那就直接不显示表格 -->
            <table class="table is-bordered" v-if="!(interfaces === '')">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>端口名</th>
                  <th>IP</th>
                  <th>子网掩码</th>
                  <th>状态</th>
                  <th>入流量</th>
                  <th>出流量</th>
                  <th>MTU</th>
                  <th>接口速度</th>
                  <th>物理地址</th>
                  <th>设置管理状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in interfaces">
                  <td>{{i.indexOID}}</td>
                  <td>{{i.name}}</td>
                  <td>{{i.ip}}</td>
                  <td>{{i.netmask}}</td>
                  <td>{{i.status}}</td>
                  <td>{{`${i.inbound}M`}}</td>
                  <td>{{`${i.outbound}M`}}</td>
                  <td>{{i.mtu}}</td>
                  <td>{{`${i.speed}M`}}</td>
                  <td>{{i.physAddress}}</td>
                  <td>
                    <!-- 这里我把adminstatus改成了status与1或者2的比较，不知道对不对 -->
                    <button  v-if="i.status === 2" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#change">启用</button>
                    <button   v-if="i.status === 1" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#change">禁用</button>
                  </td>
                  <div class="modal fade" id="change" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                          </button>
                          <h4 class="modal-title" id="myModalLabel">
          端口状态更改
        </h4>
                        </div>
                        <div class="modal-body">
                          您确定要<strong>${i.status === 1 ? '启用' : '禁用'}</strong>端口${i.name}吗？
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                          </button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="setStatus(i.indexOID, i.status, i.name)">
                            更改
                          </button>
                        </div>
                      </div>
                      <!-- /.modal-content -->
                    </div>
                    <!-- /.modal -->
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// 要用方法必须先import
import { getInterface, setAdminStatus } from '../api/api'

export default {
  name: 'interface',
  props: ['select'],
  data() {
    return {
      interfaces: ''
    }
  },
  mounted() {
    // prop特性也可以是一个方法，这样就不用通过事件传递了？？
    // 还可以这样？？
    this.select(1)
    let para = {
      ip: this.$store.state.selectedIp,
      community: this.$store.state.selectedCommunity
    }
    getInterface(para).then((res) => {
      // 直接更新interfaces
      this.interfaces = res
      console.log(this.interfaces)
    })
  },
  computed: {

  },
  methods: {
    setStatus(index, status, name) {
      let vm = this
          status = status == 1 ? 2 : 1
          let para = {
            ip: vm.$store.state.selectedIp,
            community: vm.$store.state.selectedCommunity,
            index,
            status,
          }
          setAdminStatus(para).then((res) => {
            console.log(res)
            if (res.status === 1) {
              console.log ("成功改变！");
              // 这里需要继续完善，还没学bootstrap如何实现类似于之前的$toast
              /*vm.$toast.open({
                message: '端口' + name + `${status === 1 ? '启用' : '禁用'}成功`
              })*/
              let para = {
                ip: vm.$store.state.selectedIp,
                community: vm.$store.state.selectedCommunity
              }
              // 这里需要自己手动重新获取一次数据
              getInterface(para).then((res) => {
                vm.interfaces = res
                console.log(this.interfaces)
              })
            } else {
              /*
              vm.$toast.open({
                message: '操作失败'
              })
              */
              console.log ("失败");
            }
          })
    }

  }
}

</script>
<style lang="css" scoped>
.down {
  background-color: #FF3860;
  width: 10px;
}

.up {
  background-color: #23D160;
  width: 10px;
}

</style>
