<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              路由表
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedIp}}
            </h2>
          </div>
          <div class="column is-10 is-offset-1 ">
            <table class="table is-bordered" v-if="!(routingTable === '')" style='width:90%'>
              <thead>
                <tr>
                  <th>目标IP</th>
                  <th>index</th>
                  <th>子网掩码</th>
                  <th>下一跳地址</th>
                  <th>路由类型</th>
                  <th>协议类型</th>
                  <th>METRIC1</th>
                  <th>Age</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="i in routingTable">
                  <td>{{i.ipRouteDest}}</td>
                  <td>{{i.ipRouteIfIndex}}</td>
                  <td>{{i.ipRouteMask}}</td>
                  <td>{{i.ipRouteNextHop}}</td>
                  <td>{{i.ipRouteType}}</td>
                  <td>{{i.ipRouteProto}}</td>
                  <td>{{i.ipRouteMetric1}}</td>
                  <td>{{i.ipRouteAge}}</td>
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

  import { getRoutingTable } from '../api/api'

  export default {
    name: 'routingTable',
    props: ['select'],
    data () {
      return {
        routingTable: ''
      }
    },
    mounted () {
      this.select(2)
      let para = {
        ip: this.$store.state.selectedIp,
        community: this.$store.state.selectedCommunity
      }
      getRoutingTable(para).then((res) => {
        this.routingTable = res
        console.log(this.routingTable)
      })
    },
    computed: {

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
