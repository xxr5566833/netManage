<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
      	<navbar :selected = "5"></navbar>

        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              进程查看
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedIp}}
            </h2>
          </div>
          <div class="column is-10 is-offset-1 " v-if="!(processes === '')">
            <!-- 如果interfaces是空，那就直接不显示表格 -->
            <table class="table-bordered table-condensed" style='width:90%' >
              <thead>
                <tr>
                  <th>Index</th>
                  <th>名称</th>
                  <th>进程类型</th>
                  <th>进程运行状态</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in processes">
                  <!-- adminstatus -->
                  <td>{{i.index}}</td>
                  <td>{{i.name}}</td>
                  <td>{{i.type}}</td>
                  <td>{{i.status}}</td>

                </tr>
              </tbody>
            </table>

          </div>
          <div v-else>
              <h2>没有进程信息</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// 要用方法必须先import
import { getProcesses} from '../api/api'
import navbar from "./Navbar.vue"
export default {
  name: 'process',
  // props: ['select'],
  data() {
    return {
      processes: ["ok"],
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
    getProcesses(para).then((res) => {
      // 直接更新interfaces
      this.processes = res
    })

  },
  computed: {

  },
  methods: {


  }
}

</script>

