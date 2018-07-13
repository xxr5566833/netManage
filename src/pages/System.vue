<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <navbar :selected = "0"></navbar>
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <table class="table is-bordered" v-if="!(systemInfo === '')">
              <tbody>
                <tr >
                  <td>系统名称</td>
                  <td>{{systemInfo.sysName}}</td>
                </tr>
                <tr >
                  <td>系统IP</td>
                  <td>{{$store.state.selectedIp}}</td>
                </tr>
                <tr >
                  <td>联系人</td>
                  <td>{{systemInfo.sysContact}}</td>
                </tr>
                <tr >
                  <td>位置</td>
                  <td>{{systemInfo.sysLocation}}</td>
                </tr>
                <tr >
                  <td>SysOID</td>
                  <td>{{systemInfo.sysObjectId}}</td>
                </tr>
                <tr >
                  <td>启动时间</td>
                  <td>{{timestamp}}</td>
                </tr>
                <tr >
                  <td>系统描述</td>
                  <td>{{systemInfo.sysDescr}}</td>
                </tr>
                <tr>
                  <td>CPU利用率</td>
                  <td>{{systemInfo.sysCpuUsedRate}}%</td>
                </tr>
                <tr>
                  <td>内存利用率</td>
                  <td>{{systemInfo.sysRomUsedRate}}%</td>
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

  import { getInfo } from '../api/api'
  import  navbar  from './Navbar.vue'
  export default {
    name: 'system',
    // 使用组件①写好vue文件②import③在components里注册④使用
    components:{
      navbar
    },
    data () {
      return {
        systemInfo: ''
      }
    },
    mounted () {
      let para = {
        ip: this.$store.state.selectedIp,
        readcommunity: this.$store.state.selectedreadCommunity,
        writecommunity: this.$store.state.selectedwriteCommunity
      }
      getInfo(para).then((res) => {
        this.systemInfo = res
        // 为什么sysUpTime要用value?
        this.systemInfo.sysUpTime = this.systemInfo.sysUpTime.value
      })
      // 时间过长可能导致console出错，这里应该需要异步加载
    },
    methods : {

    },
    computed: {
      timestamp () {
        var date = new Date(this.systemInfo.sysUpTime*10);
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var seconds = '0' + date.getSeconds();
        return day-1 + ' days ' + hours + ' hours ' + minutes.substr(-2) + ' minutes ' + seconds.substr(-2) + ' seconds';
      }

    },
    methods: {

    }
}
</script>

