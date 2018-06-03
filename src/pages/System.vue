<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">

            <h1 class="title is-bold">
              系统名称
            </h1>
            <h2 class="subtitle ">
              {{systemInfo.sysName}}
            </h2>
            <p></p>
            <h1 class="title is-bold">
              系统IP
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedIp}}
            </h2>
            <p></p>
            <h1 class="title is-bold">
              联系人
            </h1>
            <h2 class="subtitle ">
              {{systemInfo.contact}}
            </h2>
            <p></p>
            <h1 class="title is-bold">
              位置
            </h1>
            <h2 class="subtitle ">
              {{systemInfo.sysLocation}}
            </h2>
            <p></p>
            <h1 class="title is-bold">
              SysOID
            </h1>
            <h2 class="subtitle ">
              {{systemInfo.objectID}}
            </h2>
            <p></p>
            <h1 class="title is-bold">
              启动时间
            </h1>
            <h2 class="subtitle ">
              {{timestamp}}
            </h2>
            <p></p>
            <h1 class="title is-bold">
              系统描述
            </h1>
            <h2 class="subtitle ">
              {{systemInfo.describe}}
            </h2>
          </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>

  import { getInfo } from '../api/api'

  export default {
    name: 'routingTable',
    props: ['select'],
    data () {
      return {
        systemInfo: ''
      }
    },
    mounted () {
      this.select(3)
      let para = {
        ip: this.$store.state.selectedIp,
        community: this.$store.state.selectedCommunity
      }
      getInfo(para).then((res) => {
        this.systemInfo = res
        console.log(this.systemInfo)
      })
    },
    computed: {
      timestamp () {
        var date = new Date(this.systemInfo.upTime*10)
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
