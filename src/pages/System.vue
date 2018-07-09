<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <navbar :selected = "0"></navbar>
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h2 class="title is-bold">
              系统名称
            </h2>
            <h3 class="subtitle ">
              {{systemInfo.sysName}}
            </h3>
            <p></p>
            <h2 class="title is-bold">
              系统IP
            </h2>
            <h3 class="subtitle ">
              {{$store.state.selectedIp}}
            </h3>
            <p></p>
            <h2 class="title is-bold">
              联系人
            </h2>
            <h3 class="subtitle ">
              {{systemInfo.sysContact}}
            </h3>
            <p></p>
            <h2 class="title is-bold">
              位置
            </h2>
            <h3 class="subtitle ">
              {{systemInfo.sysLocation}}
            </h3>
            <p></p>
            <h2 class="title is-bold">
              SysOID
            </h2>
            <h3 class="subtitle ">
              {{systemInfo.sysObjectId}}
            </h3>
            <p></p>
            <h2 class="title is-bold">
              启动时间
            </h2>
            <h3 class="subtitle ">
              {{timestamp}}
            </h3>
            <p></p>
            <h2 class="title is-bold">
              系统描述
            </h2>
            <h3 class="subtitle ">
              {{systemInfo.sysDescr}}
            </h3>
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
        community: this.$store.state.selectedCommunity
      }
      getInfo(para).then((res) => {
        this.systemInfo = res
        // 为什么sysUpTime要用value?
        this.systemInfo.sysUpTime = this.systemInfo.sysUpTime.value
      })
      // 时间过长可能导致console出错，这里应该需要异步加载
    },
    computed: {
      timestamp () {
        var date = new Date(this.systemInfo.sysUpTime*10)
        var day = date.getDate()
        var hours = date.getHours()
        var minutes = '0' + date.getMinutes()
        var seconds = '0' + date.getSeconds()
        return day-1 + ' days ' + hours + ' hours ' + minutes.substr(-2) + ' minutes ' + seconds.substr(-2) + ' seconds'
      }

    },
    methods: {

    }
}
</script>

