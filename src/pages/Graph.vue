<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <input type="text" v-model="ip">
        <textarea style="height:200px;" v-model="foundDevice"></textarea>
        <a class="button is-info is-focused level-item" @click="refreshNetGraph">拓扑图发现</a>
        <!-- 这里放置网络拓扑图 -->
        <div id="NetGraph" style="height:800px;"></div>
        </div>
      </div>
  </section>
</template>
<script>

  import { getNetGraph } from '../api/api'

  export default {
    name: 'Graph',
    // props: ['select'],
    data () {
      return {
        ip:'127.0.0.0',
        foundDevice:'',
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
    computed: {

    },
    methods: {
      initChart(){
        var echarts = require('echarts');
        var vm=this;
        this.chart1=echarts.init(document.getElementById("NetGraph"));
        this.chart1.showLoading();
        console.log(vm.option);

        getNetGraph(vm.ip).then((res) => {
          vm.chart1.hideLoading();
          var i=0;
          var t;
          console.log( res);
          for (var i in vm.option.series[0].data){
            if (vm.option.series[0].data[i].category==0)
            {
              //vm.option.series[0].data[i].prototype.symbol=null;
              vm.option.series[0].data[i].symbol = vm.categoryR;
            }
            else if(vm.option.series[0].data[i].category==1)
            {// vm.option.series[0].data[i].prototype.symbol=null;
              vm.option.series[0].data[i].symbol = vm.categoryS;}
          }
          vm.option.series[0].links=res.link;
          function f() {
            if(i<res.data.length)
            {
              i++;
              vm.option.series[0].data.push(res.data[i]);
              vm.foundDevice=vm.foundDevice+"拓扑发现了名为"+res.data[i].name+"的设备\n";
              vm.chart1.setOption(vm.option);
              t=setTimeout("f",1000);
            }
            else{
              clearTimeout(t);
            }
          };
          f();
          console.log( vm.option.series[0].data[0]);
          console.log(vm.option);
          console.log("graph right");
        })

      },
      refreshNetGraph(){
        var echarts = require('echarts');
        var vm=this;
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
