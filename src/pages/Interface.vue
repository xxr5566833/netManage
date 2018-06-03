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
                    <a class="button is-success" @click="setStatus(i.indexOID, 1, i.name)" v-if="i.adminstatus === 'DOWN'">启用</a>
                    <a class="button is-danger" @click="setStatus(i.indexOID, 2, i.name)" v-if="i.adminstatus === 'UP'">禁用</a>
                  </td>
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

  import { getInterface, setAdminStatus } from '../api/api'

  export default {
    name: 'interface',
    props: ['select'],
    data () {
      return {
        interfaces: ''
      }
    },
    mounted () {
      this.select(1)
      let para = {
        ip: this.$store.state.selectedIp,
        community: this.$store.state.selectedCommunity
      }
      getInterface(para).then((res) => {
        this.interfaces = res
        console.log(this.interfaces)
      })
    },
    computed: {

    },
    methods: {
      setStatus (index, status, name) {
        let vm = this
        this.$dialog.confirm({
          title: '设置端口状态',
          message: `您确定要<strong>${status === 1 ? '启用' : '禁用'}</strong>端口${name}吗？`,
          confirmText: '确认',
          type: 'is-danger',
          onConfirm: () => {
            let para = {
              ip: vm.$store.state.selectedIp,
              community: vm.$store.state.selectedCommunity,
              index,
              status,
            }
            setAdminStatus(para).then((res) => {
              console.log(res)
              if (res.status === 1) {
                vm.$toast.open({
                  message: '端口' + name + `${status === 1 ? '启用' : '禁用'}成功`
                })
                let para = {
                  ip: vm.$store.state.selectedIp,
                  community: vm.$store.state.selectedCommunity
                }
                getInterface(para).then((res) => {
                  vm.interfaces = res
                  console.log(this.interfaces)
                })
              }
              else {
                vm.$toast.open({
                  message: '操作失败'
                })
              }
            })
          }
        })
      }

    }
}
</script>

<style lang="css">
.down {
  background-color: #FF3860;
  width: 10px;
}
.up {
  background-color: #23D160;
  width: 10px;
}
</style>
