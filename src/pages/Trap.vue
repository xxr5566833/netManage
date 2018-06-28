<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              Trap列表
            </h1>
            <a class="button is-primary" @click="refresh()">刷新</a>
          </div>
          <div class="column is-10 is-offset-1 ">
            <table class="table is-bordered" v-if="!(routingTable === '')">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>接收时间</th>
                  <th>企业号</th>
                  <th>代理地址</th>
                  <th>OID</th>
                  <th>详情</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="i in traps.result">
                  <td>{{i.index}}</td>
                  <td>{{i.time}}</td>
                  <td>{{i.data.enterprise}}</td>
                  <td>{{i.data.agent_addr}}</td>
                  <td>{{i.data.varbinds[0].oid}}</td>
                  <td>{{i.data.varbinds[0].string_value}}</td>

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

  import { getTraps } from '../api/api'

  export default {
    name: 'Trap',
    props: ['select'],
    data () {
      return {
        traps: ''
      }
    },
    mounted () {
      this.select(4)
      getTraps().then((res) => {
        this.traps = res
        console.log(this.traps)
      })
    },
    computed: {

    },
    methods: {
      goDetail (index) {
        this.$dialog.confirm({
          title: '查看详情',
          message: `${this.traps.result[index].data.varbinds}`,
          confirmText: '确认',
          type: 'is-primary',
          onConfirm: () => {}
        })
      },
      refresh () {
        getTraps().then((res) => {
          this.traps = res
          console.log(this.traps)
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
