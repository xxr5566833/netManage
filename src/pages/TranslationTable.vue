<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <navbar :selected = "6"></navbar>

        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              地址转换表查看
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedIp}}
            </h2>
          </div>
          <div class="column is-10 is-offset-1 " v-if="!(tables === '')">
            <!-- 如果interfaces是空，那就直接不显示表格 -->
            <table class="table-bordered table-condensed" style='width:90%' >
              <thead>
              <tr>
                <th>Index</th>
                <th>对应的端口index</th>
                <th>物理地址</th>
                <th>IP地址</th>
                <th>类型</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(i, index) in tables">
                <!-- adminstatus -->
                <td>{{index}}</td>
                <td>{{i.ifIndex}}</td>
                <td>{{i.phyAddress}}</td>
                <td>{{i.netAddress}}</td>
                <td>{{i.translationType}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <h2>没有地址转换表信息</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  // 要用方法必须先import
  import { getTranslationTable } from '../api/api'
  import navbar from "./Navbar.vue"
  export default {
    name: 'translationTable',
    // props: ['select'],
    data() {
      return {
        tables: ["ok"],
        currentIndex : 0
      }
    },
    components:{
      navbar
    },
    mounted() {
      // prop特性也可以是一个方法，这样就不用通过事件传递了？？
      // 还可以这样？？
      // this.select(1)
      let para = {
        ip: this.$store.state.selectedIp,
        readcommunity: this.$store.state.selectedreadCommunity,
        writecommunity: this.$store.state.selectedwriteCommunity
      }
      getTranslationTable(para).then((res) => {
        // 直接更新interfaces
        this.tables = res
      })

    },
    computed: {

    },
    methods: {


    }
  }

</script>

