<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
      	<navbar :selected = "4"></navbar>

        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              磁盘管理
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedName}}
            </h2>
          </div>
          <div class="column is-10 is-offset-1 " v-if="!(disks === '')">
            <!-- 如果interfaces是空，那就直接不显示表格 -->
            <table class="table-bordered table-condensed" style='width:90%' >
              <thead>
                <tr>
                  <th>Index</th>
                  <th>描述</th>
                  <th>磁盘空间单元/Byte</th>
                  <th>使用率</th>
                  <th>总大小</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in disks">
                  <!-- adminstatus -->
                  <td>{{index}}</td>
                  <td>{{i.storageDescr}}</td>
                  <td>{{i.storageUnits}}</td>
                  <td>{{i.usedRate}}</td>
                  <td>{{i.totalSize}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <h2>没有硬盘信息</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// 要用方法必须先import
import { getDisks} from '../api/api'
import navbar from "./Navbar.vue"
export default {
  name: 'disk',
  // props: ['select'],
  data() {
    return {
      disks: ["ok"],
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
    getDisks(para).then((res) => {
      // 直接更新interfaces
      this.disks = res
    })

  },
  computed: {

  },
  methods: {


  }
}

</script>

