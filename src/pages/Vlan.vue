<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
      	<navbar :selected = "3 "></navbar>

        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              vlan列表
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedIp}}
            </h2>
          </div>
          <div class="column is-10 is-offset-1 " v-if="!(vlans === '')">
            <!-- 如果interfaces是空，那就直接不显示表格 -->
            <table class="table-bordered table-condensed" style='width:90%' >
              <thead>
                <tr>
                  <th>Index</th>
                  <th>VLAN名</th>
                  <th>VLAN状态</th>
                  <th>包含端口号</th>
                  <!--<th>IP</th> 以后加，需要实现一些逻辑-->
                  <!--<th>子网掩码</th>-->
                  <th>入流量</th>
                  <th>出流量</th>
                  <th>MTU</th>
                  <th>物理地址</th>
                  <th>距离上次改变的时间</th>
                  <th>设置管理状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in vlans">
                  <!-- adminstatus -->
                  <td>{{i.index}}</td>
                  <td>{{i.ifDescr}}</td>
                  <td>{{i.ifOperStatus}}</td>
                  <td>{{i.port}}</td>
                  <!--<td>{{i.ip}}</td>
                  <td>{{i.netmask}}</td>-->
                  <td>{{i.inBound}}</td>
                  <td>{{i.outBound}}</td>
                  <td>{{i.ifMtu}}</td>
                  <td>{{i.ifPhysAddress}}</td>
                  <td>{{i.ifLastChange}}</td>
                  <td>
                    <!-- 这里我把adminstatus改成了status与1或者2的比较，不知道对不对 -->
                    <button  v-if="i.ifOperStatus === 'DOWN'"  class="btn btn-primary" @click = "open(index)">启用</button>
                    <button     v-if="i.ifOperStatus === 'UP'"  class="btn btn-danger"  @click = "open(index)">禁用</button>
                  </td>


                </tr>
              </tbody>
            </table>
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
                          您确定要{{ vlans[currentIndex].ifOperStatus === 'UP' ? '禁用' : '启用'}}名字为{{vlans[currentIndex].ifDescr}}的端口吗？
                        </div>
                        <div class="modal-footer">
                          <button type="button"  class="btn btn-default" data-dismiss="modal">关闭
                          </button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal" @click = setStatus()>
                            更改
                          </button>
                        </div>
                      </div>
                      <!-- /.modal-content -->
                    </div>
                    <!-- /.modal -->
                  </div>
          </div>
          <div v-else>
            <h2>没有VLAN信息</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// 要用方法必须先import
import { getVlan, setAdminStatus } from '../api/api'
import navbar from "./Navbar.vue"
export default {
  name: 'vlan',
  // props: ['select'],
  data() {
    return {
      vlans: '',
      // 表示当前被选中的vlan的在数组中的下标与vlan自身的index区分开
      currentIndex : 0
    }
  },
  components:{
  	navbar
  },
  mounted() {
    // prop特性也可以是一个方法，这样就不用通过事件传递了？？
    // this.select(1)
    console.log(this.vlans);
    let para = {
      ip: this.$store.state.selectedIp,
      readcommunity: this.$store.state.selectedreadCommunity,
      writecommunity: this.$store.state.selectedwriteCommunity
    }
    getVlan(para).then((res) => {
      if(res.length != 0)
        this.vlans = res
      console.log(this.vlans)
      console.log(this.vlans === '');
    })

  },
  computed: {

  },
  methods: {
    open( index){
        this.currentIndex = index
        $('#change').modal('show')
    },

    setStatus() {
      //参数status表示之前的状态
      // status 表示启用后的状态
      let vm = this
      var vlan = this.vlans[this.currentIndex]
      var status = vlan.ifOperStatus === 'UP' ? 2 : 1
      var name = vlan.ifDescr
      var index = vlan.index


      let para = {
            ip: vm.$store.state.selectedIp,
            readcommunity: vm.$store.state.selectedreadCommunity,
            writecommunity: vm.$store.state.selectedwriteCommunity,
            index,
            status,
          }
          setAdminStatus(para).then((res) => {
            console.log(res)
            if (res === true) {
              console.log ("成功改变！");
              // 这里需要继续完善，还没学bootstrap如何实现类似于之前的$toast
              /*vm.$toast.open({
                message: '端口' + name + `${status === 1 ? '启用' : '禁用'}成功`
              })*/
              let para = {
                ip: vm.$store.state.selectedIp,
                readcommunity: vm.$store.state.selectedreadCommunity,
                writecommunity: vm.$store.state.selectedwriteCommunity
              }
              // 这里需要自己手动重新获取一次数据
              getVlan(para).then((res) => {
                vm.vlans = res

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
