<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              主机TCP连接状态
            </h1>
            <div>
              <button class="btn btn-primary" @click="startWatchCon">开始监控</button>
              <button  class="btn btn-danger"  @click = "stopWctchCon">停止监控</button>
            </div>        <div id="NetGraph" style="height:100px;"></div>
          </div>
          <div class="column is-10 is-offset-1 " style="overflow-x: auto; overflow-y: auto; height: 300px; width:90%;">
            <!-- 如果interfaces是空，那就直接不显示表格 -->
            <table class="table-bordered table-condensed">
              <thead>
              <tr>
                <th>主机名</th>
                <th v-for="i in PCs">{{i.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="i in PCs">
                <td>{{i.name}}</td>
                <td  v-bind:style="{'background-color': color(k)}" v-for="k in i.connection">{{(k==0)?'没有连接':'存在连接'}}</td>
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
  import { getTCP} from '../api/api'
    export default {
        name: "TCPConnect",
        data() {
          return {
            PCs:["ok"],
          }
        },
      mounted(){
      },
      beforeCreate:
        function(){
          window.intervalObh="";
        },
      methods:{
          color(k){
            if(k==0)return "blue";
            else return "red";
          },
          startWatchCon(){
            this.$nextTick(() => {
              this.startWatchTCP();
            })
          },
          stopWctchCon(){
            clearInterval(window.intervalObh)
          },
          startWatchTCP(){
            var echarts = require('echarts');
            this.chart1=echarts.init(document.getElementById("NetGraph"));
            this.chart1.showLoading();
            clearInterval(window.intervalObh);
            var vm=this;
            window.intervalObj=setInterval(() => {
              getTCP().then((res) => {
                vm.chart1.hideLoading();
                console.log(res);
                vm.PCs=res;
              })
            }, 10000);
          }
      }
    }
</script>

<style lang="css" scoped>
  .down {
    background-color: #FF3860;
    width: 10px;
  }

  .up {
    background-color: #23D160;
    width: 10px;
  }

</style>
