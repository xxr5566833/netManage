<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h3>
          请输入拓扑发现种子节点IP（温馨提示：本拓扑发现不支持没有路由器和三层交换机的系统）
        <input type="text" v-model="ip">
          <button class="btn btn-primary" @click="refreshNetGraph">开始拓扑发现</button>
        </h3>
        </div>
      <div><textarea style="width:50%;height:200px;" v-model="foundDevice"></textarea>
        <div><span style="color: #2aabd2;font-size: 30px; ">蓝色</span>代表正常</div>
        <div><span style="color: yellow;font-size: 30px;">黄色</span>代表相连的不正常</div>
        <div><span style="color: red;font-size: 30px;">红色</span>代表连接中断</div>
      </div>
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
        dataNewIn: [],
        linkNewIn: [],
        FailDataIn:[],
        PCData: [],
        Rblue:'image://../../static/Rblue.png',
        Rred:'image://../../static/Rred.png',
        Ryellow:'image://../../static/Ryellow.png',
        Sblue:'image://../../static/Sblue.png',
        Sred:'image://../../static/Sred.png',
        Syellow:'image://../../static/Syellow.png',
        PCblue:'image://../../static/PCblue.png',
        PCred:'image://../../static/PCred.png',
        PCyellow:'image://../../static/PCyellow.png',
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
      var echarts = require('echarts');
      this.chart1=echarts.init(document.getElementById("NetGraph"));
      this.option.series[0].data=this.dataIn;
      this.option.series[0].links=this.linkIn;
      this.chart1.setOption(this.option);
    },
    beforeCreate:
      function(){
        window.intervalObc="";
      },
    computed: {
      info() {
        return this.$store.state.info
      },
      dataIn() {
        return this.$store.state.dataIn
      },
      linkIn() {
        return this.$store.state.linkIn
      }
    },
    methods: {
      beBlue(ks){
        var vm=this;
        if (vm.dataIn[ks].category == 0) {
          vm.dataIn[ks].symbol = vm.Rblue;
        }
        else if (vm.dataIn[ks].category == 1) {
          vm.dataIn[ks].symbol = vm.Sblue;
        }
        else if (vm.dataIn[ks].category == 2) {
          vm.dataIn[ks].symbol = vm.PCblue;
        }
      },
      beRed(ks){
        var vm=this;
        if (vm.dataIn[ks].category == 0) {
          vm.dataIn[ks].symbol = vm.Rred;
        }
        else if (vm.dataIn[ks].category == 1) {
          vm.dataIn[ks].symbol = vm.Sred;
        }
        else if (vm.dataIn[ks].category == 2) {
          vm.dataIn[ks].symbol = vm.PCred;
        }
      },
      beYellow(ks){
        var vm=this;
        if (vm.dataIn[ks].category == 0) {
          vm.dataIn[ks].symbol = vm.Ryellow;
        }
        else if (vm.dataIn[ks].category == 1) {
          vm.dataIn[ks].symbol = vm.Syellow;
        }
        else if (vm.dataIn[ks].category == 2) {
          vm.dataIn[ks].symbol = vm.PCyellow;
        }
      },
      initChart(){
        var echarts = require('echarts');
        var vm=this;
        this.chart1=echarts.init(document.getElementById("NetGraph"));
        vm.FailDataIn=[];
        this.chart1.showLoading();
        let para = {
          ip: this.ip,
          readcommunity: "public",
          writecommunity: "private"
        };
        getInfo(para).then((res) => {
          vm.systemInfo = res
        });
        getNetGraph(vm.ip).then((res) => {
          // 直接更新interfaces
          vm.chart1.hideLoading();
          vm.foundDevice="";
          vm.i=0;
          vm.dataNewIn=res.data;
          vm.linkNewIn=res.link;
          console.log(vm.dataNewIn);
          let theFirst={
            name:vm.systemInfo.sysName,
          };
          for(var ks=0;ks<vm.dataNewIn.length;ks++){
            if (vm.dataNewIn[ks].category == 0) {
              vm.dataNewIn[ks].symbol = vm.Rblue;
            }
            else if (vm.dataNewIn[ks].category == 1) {
              vm.dataNewIn[ks].symbol = vm.Sblue;
            }
            else if (vm.dataNewIn[ks].category == 2) {
              vm.dataNewIn[ks].symbol = vm.PCblue;
            }
            if(vm.dataNewIn[ks].name==theFirst.name)
              theFirst=vm.dataNewIn[ks];
          }
          for(var ks=0;ks<vm.dataIn.length;ks++){
            var isExist=0;
            for(var kc=0;kc<vm.dataNewIn.length;kc++) {
              if (vm.dataIn[ks].name == vm.dataNewIn[kc].name) {
                isExist = 1;
                break;
              }
            }
            if(isExist==1)
              vm.beBlue(ks);
          }
          for(var ks=0;ks<vm.dataIn.length;ks++){
            var isExist=0;
            for(var kc=0;kc<vm.dataNewIn.length;kc++) {
              if (vm.dataIn[ks].name == vm.dataNewIn[kc].name) {
                isExist = 1;
                break;
              }
            }
            if(isExist==0)
            {
              console.log("断了一个"+vm.dataIn[ks].name);
              vm.FailDataIn.push(vm.dataIn[ks].name);
              console.log(vm.linkIn);
              vm.beRed(ks);
              for(var linka=0;linka<vm.linkIn.length;linka++){
                if(vm.linkIn[linka].source==vm.dataIn[ks].name){
                  var linkIsExist=0;
                  for(var linkb=0;linkb<vm.dataNewIn.length;linkb++){
                    if(vm.linkIn[linka].target==vm.dataNewIn[linkb].name){
                      console.log("存在连接");
                      linkIsExist=1;
                      break;
                    }
                  }
                  if(linkIsExist==1){
                    console.log("寻找dataIN");
                    for(var linkc=0;linkc<vm.dataIn.length;linkc++){
                      if(vm.dataIn[linkc].name==vm.linkIn[linka].target){
                        vm.beYellow(linkc);
                        console.log("找到了dataIn"+linkc);
                        console.log(vm.dataIn);
                      }
                    }
                  }
                }
                else if(vm.linkIn[linka].target==vm.dataIn[ks].name){
                  var linkIsExist=0;
                  console.log("target");
                  for(var linkb=0;linkb<vm.dataNewIn.length;linkb++){
                    if(vm.linkIn[linka].source==vm.dataNewIn[linkb].name){
                      linkIsExist=1;
                      console.log("存在连接");
                      break;
                    }
                  }
                  if(linkIsExist==1){
                    for(var linkc=0;linkc<vm.dataIn.length;linkc++){
                      if(vm.dataIn[linkc].name==vm.linkIn[linka].source){
                        vm.beYellow(linkc);
                        console.log("找到了dataIn"+linkc);
                        console.log(vm.dataIn);
                      }
                    }
                  }
                }
              }
            }
          }
          console.log("2");
          for(var dataa=0;dataa<vm.dataNewIn.length;dataa++){
            var isNewExist=0;
            for(var datab=0;datab<vm.dataIn.length;datab++){
              if(vm.dataNewIn[dataa].name==vm.dataIn[datab].name){
                isNewExist=1;
                break;
              }
            }
            if(isNewExist==0){
              console.log("加了一个");
              vm.dataIn.push(vm.dataNewIn[dataa]);
              for(var datac=0;datac<vm.linkNewIn.length;datac++){
                if(vm.linkNewIn[datac].source==vm.dataNewIn[dataa].name||vm.linkNewIn[datac].target==vm.dataNewIn[dataa].name)
                  vm.linkIn.push(vm.linkNewIn[datac]);
              }
            }
          }
          vm.info.splice(0, vm.info.length);
          for(var devi=0;devi<res.devs.length;devi++){
            vm.info.push(res.devs[devi]);
          }
          vm.option.series[0].data=[];
          vm.option.series[0].data.push(theFirst);
          vm.foundDevice = vm.foundDevice + "拓扑发现了名为" + theFirst.name + "的设备\n";
          vm.chart1.setOption(vm.option);
          vm.option.series[0].links=vm.linkIn;
          window.intervalObc= setInterval(() => {
            {
              if(vm.i<vm.dataIn.length)
              {
                if(vm.dataIn[vm.i].name!=theFirst.name) {
                  if(vm.dataIn[vm.i].category==2){
                    vm.PCData.push(vm.dataIn[vm.i]);
                  }
                  else {
                    vm.option.series[0].data.push(vm.dataIn[vm.i]);
                    vm.foundDevice = vm.foundDevice + "拓扑发现了名为" + vm.dataIn[vm.i].name + "的设备\n";
                    for(var PCnum=0;PCnum<vm.PCData.length;PCnum++){
                      vm.option.series[0].data.push(vm.PCData[PCnum]);
                      vm.foundDevice = vm.foundDevice + "拓扑发现了名为" + vm.PCData[PCnum].name + "的设备\n";
                    }
                    vm.PCData=[];
                    vm.chart1.setOption(vm.option);
                  }
                }
                vm.i++;
              }else {
                if(vm.PCData!=[]){
                  for(var PCnum=0;PCnum<vm.PCData.length;PCnum++){
                    vm.option.series[0].data.push(vm.PCData[PCnum]);
                    vm.foundDevice = vm.foundDevice + "拓扑发现了名为" + vm.PCData[PCnum].name + "的设备\n";
                  }
                  vm.PCData=[];
                  vm.chart1.setOption(vm.option);
                }
                for(var failData=0;failData<vm.FailDataIn.length;failData++){
                  vm.foundDevice = vm.foundDevice + vm.FailDataIn[failData] + "的连接中断\n";
                }
                clearInterval(window.intervalObc);
              }
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
