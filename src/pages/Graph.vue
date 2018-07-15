<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h2>
          请输入拓扑种子节点IP（温馨提示：本拓扑发现不支持没有路由器的系统）
        <input type="text" v-model="ip">
          <button class="btn btn-primary" @click="refreshNetGraph">开始拓扑发现</button>
        </h2>
        </div>
      <div><textarea style="width:80%;height:200px;" v-model="foundDevice"></textarea></div>
      <div>
        <!-- 这里放置网络拓扑图 -->
        <div id="NetGraph" style="height:800px;"></div></div>
      </div>
  </section>
</template>
<script>

  import { getNetGraph,getInfo } from '../api/api'

  export default {
    name: 'Graph',
    // props: ['select'],
    data () {
      return {
        ip:'127.0.0.1',
        foundDevice:'',
        i:0,
        systemInfo:' ',
        dataIn:[],
        categoryR:'image://../../static/R.png',
        categoryS:'image://../../static/S.jpg',
        option : {
          title: {
            left: "center",
            text: '网络拓扑图'
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              type: 'graph',
              layout: 'force',
              draggable: 'true',
              symbolSize: 50,
              roam: true,
              force:{
                repulsion:400,
                edgeLength:200,
              },
              label: {
                normal: {
                  show: true
                }
              },
              edgeSymbol: ['circle', 'circle'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              categories:[{
                name:"R",
                symbol:'image://../../static/R.png'
              },{
                name:"S",
                symbol:'image://../../static/S.jpg'
              },
                {
                  name:"PC"
                }
              ],
              lineStyle:{
                type:'dotted'
              },
              data: [],
              // links: [],
              links: [ {
                source: '节点2',
                target: '节点1',
              },{
                source: '节点1',
                target: '节点2',
              },
                {
                  source: '节点1',
                  target: '节点3'
                }, {
                  source: '节点2',
                  target: '节点3'
                }, {
                  source: '节点2',
                  target: '节点4'
                }, {
                  source: '节点1',
                  target: '节点4'
                }],
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 2,
                  curveness: 0
                }
              }
            }
          ]
        },
      }
    },
    mounted() {
    },
    beforeCreate:
      function(){
        window.intervalObc="";
      },
    computed: {
      info() {
        return this.$store.state.info
      }
    },
    methods: {
      initChart(){
        var echarts = require('echarts');
        var vm=this;
        this.chart1=echarts.init(document.getElementById("NetGraph"));
        this.chart1.showLoading();
        let para = {
          ip: this.ip,
          readcommunity: "public",
          writecommunity: "private"
        }
        getInfo(para).then((res) => {
          vm.systemInfo = res
        })
        getNetGraph(vm.ip).then((res) => {
          // 直接更新interfaces
          vm.chart1.hideLoading();
          vm.foundDevice="";
          vm.i=0;
          vm.dataIn=res.data;
          console.log(res);
          let theFirst={
            name:vm.systemInfo.sysName,
          };
          for(var ks=0;ks<vm.dataIn.length;ks++){
            if (vm.dataIn[ks].category == 0) {
              //vm.option.series[0].data[i].prototype.symbol=null;
              vm.dataIn[ks].symbol = vm.categoryR;
            }
            else if (vm.dataIn[ks].category == 1) {// vm.option.series[0].data[i].prototype.symbol=null;
              vm.dataIn[ks].symbol = vm.categoryS;
            }
            if(vm.dataIn[ks].name==theFirst.name)theFirst=vm.dataIn[ks];
          }
          vm.info.splice(0, vm.info.length);
          for(var devi=0;devi<res.devs.length;devi++){
            vm.info.push(res.devs[devi]);
          }
          vm.option.series[0].data.push(theFirst);
          vm.foundDevice = vm.foundDevice + "拓扑发现了名为" + theFirst.name + "的设备\n";
          vm.chart1.setOption(vm.option);
          vm.option.series[0].links=res.link;
          console.log(vm.dataIn);
          window.intervalObc= setInterval(() => {
            {
              if(vm.i<vm.dataIn.length)
              {
                if(vm.dataIn[vm.i].name!=theFirst.name) {
                  vm.option.series[0].data.push(vm.dataIn[vm.i]);
                  console.log(vm.option.series[0].data);
                  vm.foundDevice = vm.foundDevice + "拓扑发现了名为" + vm.dataIn[vm.i].name + "的设备\n";
                  vm.chart1.setOption(vm.option);
                }
                vm.i++;
              }else
                clearInterval(window.intervalObc);
            }
          }, 1000);
        });
          console.log("graph right");
      },
      refreshNetGraph(){
        var echarts = require('echarts');
        var vm=this;
        vm.option.series[0].data=[];
        /*this.chart1=echarts.init(document.getElementById("NetGraph"));
        console.log(vm.option);
        vm.chart1.setOption(vm.option);*/
        this.$nextTick(() => {
          this.initChart()
        })
      },
    }
  }
</script>

<style lang="css" scoped>
  #network {
    height: 600px;
  }

</style>
