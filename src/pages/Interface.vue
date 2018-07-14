<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
      	<navbar :selected = "1"></navbar>
        <div class="columns  is-multiline">
          <div class="column is-10 is-offset-1">
            <h1 class="title is-bold">
              端口列表
            </h1>
            <h2 class="subtitle ">
              {{$store.state.selectedIp}}
            </h2>
            <div class="columns is-multiline">
              <div class="column is-2" v-for="i in interfaces">
                <img src="../assets/icons8-EthernetOn.png" v-if="i.status === 'UP'">
                <img src="../assets/icons8-EthernetOff.png" v-if="i.status === 'DOWN'">
                <div class="tag is-success is-medium" v-if="i.status === 'UP'">{{i.ifDescr}}</div>
                <div class="tag is-danger is-medium" v-if="i.status === 'DOWN'">{{i.ifDescr}}</div>
              </div>
            </div>
          </div>
          <div class="column is-10 is-offset-1 " style="overflow-x: auto; overflow-y: auto; height: 300px; width:90%;">
            <!-- 如果interfaces是空，那就直接不显示表格 -->
            <table class="table-bordered table-condensed"  v-if="!(interfaces === '')">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>端口名</th>
                  <th>端口状态</th>
                  <!--<th>IP</th> 以后加，需要实现一些逻辑-->
                  <!--<th>子网掩码</th>-->
                  <th>入流量</th>
                  <th>出流量</th>
                  <th>物理地址</th>
                  <th>MTU</th>
                  <th>设置管理状态</th>
                  <th>流量监控</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in interfaces">
                  <!-- adminstatus -->
                  <td>{{i.index}}</td>
                  <td>{{i.ifDescr}}</td>
                  <td>{{i.ifOperStatus}}</td>
                  <!--<td>{{i.ip}}</td>
                  <td>{{i.netmask}}</td>-->
                  <td>{{i.inBound}}</td>
                  <td>{{i.outBound}}</td>
                  <td>{{i.ifPhysAddress}}</td>
                  <td>{{i.ifMtu}}</td>
                  <td>
                    <!-- 这里我把adminstatus改成了status与1或者2的比较，不知道对不对 -->
                    <button  v-if="i.ifOperStatus === 'DOWN'"  class="btn btn-primary" @click = "open(index)">启用</button>
                    <button     v-if="i.ifOperStatus === 'UP'"  class="btn btn-danger"  @click = "open(index)">禁用</button>
                  </td>
                  <td>
                    <!-- 这里我把adminstatus改成了status与1或者2的比较，不知道对不对 -->
                    <button  class="btn btn-primary" @click = "startFlowInterface(index)">开始监控</button>
                    <button  class="btn btn-danger"  @click = "stopFlow">停止监控</button>
                  </td>


                </tr>
              </tbody>
            </table>
            <div class="modal fade" id="change" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                          </button>
                          <h4 class="modal-title" id="myModalLabel">
                              端口状态更改
                          </h4>
                        </div>
                        <div class="modal-body">
                          您确定要{{ interfaces[currentIndex].ifOperStatus === 'UP' ? '禁用' : '启用'}}名字为{{interfaces[currentIndex].ifDescr}}的端口吗？
                        </div>
                        <div class="modal-footer">
                          <button type="button"  class="btn btn-default" data-dismiss="modal">关闭
                          </button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal" @click = setStatus()>
                            更改
                          </button>
                        </div>
                      </div>
                      <!-- /.modal-content -->
                    </div>
                    <!-- /.modal -->
                  </div>
          </div>
          <div>
            <a class="button is-info is-focused level-item" @click="startAllFlow">开始整体流量监控</a>
            <a class="button is-info is-focused level-item" @click="stopFlow">停止流量监控</a>
            <div id="InterfaceFlowAll" style="height:600px;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// 要用方法必须先import
import { getInterface, setAdminStatus, updateStatus,getFlow} from '../api/api'
import navbar from "./Navbar.vue"
export default {
  name: 'interface',
  // props: ['select'],
  data() {
    return {
      t:'',
      inFlow:0,
      outFlow:0,
      interfaces: ["ok"],
      flowIndex:-1,
      currentIndex : 0,
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
    getInterface(para).then((res) => {
      // 直接更新interfaces
      this.interfaces = res
    })

  },
  computed: {

  },
  beforeCreate:
    function(){
      window.intervalObj="";
    },
  methods: {
    startFlow(){
      let vm=this;
      var echarts = require('echarts');
      var charts=echarts.init(document.getElementById("InterfaceFlowAll"));
      var option = {
        title: {
          text: '流量图',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['入流量']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          axisLabel: {
            formatter: '{value} 0s'
          }
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            formatter: '{value} MB'
          }
        },
        series: [
          {
            name:'入流量',
            type:'line',
            data:[],
          },
         /* {
            name:'出流量',
            type:'line',
            data:[],
          }*/
        ]
      };
      charts.setOption(option);
      clearInterval(window.intervalObj);
      console.log("获取了流量ing");
      var timetime=0;
      window.intervalObj=setInterval(() => {
        let para = {
          ip: vm.$store.state.selectedIp,
          readcommunity: vm.$store.state.selectedreadCommunity,
          writecommunity: vm.$store.state.selectedwriteCommunity,
          index:vm.flowIndex,
        };
        getFlow(para).then((res) => {
          vm.inFlow=[timetime,res.inBound.toFixed(0)];
          /*vm.outFlow=[timetime,res.outBound.toFixed(2)];*/
          console.log("获取了一次");
          console.log(res);
          timetime++;
          option.series[0].data.push(vm.inFlow);
         /* option.series[1].data.push(vm.outFlow);*/
          charts.setOption(option);
        })
      }, 10000);
    },
    stopFlow(){
      this.$nextTick(() => {
        clearInterval(window.intervalObj)
      })
    },
    startAllFlow(){
      this.flowIndex=-1;
      this.$nextTick(() => {
        this.startFlow();
      })
    },
    startFlowInterface(index){
      this.flowIndex=index;
      this.$nextTick(() => {
        this.startFlow();
      })
    },
    open( index){
        this.currentIndex = index;
        $('#change').modal('show')

    },

    setStatus() {
      //参数status表示之前的状态
      // status 表示启用后的状态
      	let vm = this;
      	var inter = this.interfaces[this.currentIndex];
      	console.log(inter);
      	var status = inter.ifOperStatus === 'UP' ? 2 : 1;
      	var name = inter.ifDescr;
      	var index = inter.index;
      	console.log("change interfaces");

      	let para = {
            ip: vm.$store.state.selectedIp,
            readcommunity: vm.$store.state.selectedreadCommunity,
            writecommunity: vm.$store.state.selectedwriteCommunity,
            index,
            status,
      	};
        setAdminStatus(para).then((res) => {
            console.log(res);
            //this.$toast("change interfaces  in it")
            if (res === true) {
              console.log ("成功改变！");
              // 这里需要继续完善，还没学bootstrap如何实现类似于之前的$toast
              //this.$toast('端口' + name + `${status === 1 ? '启用' : '禁用'}成功`)
              let para = {
                ip: vm.$store.state.selectedIp,
                readcommunity: vm.$store.state.selectedreadCommunity,
                writecommunity: vm.$store.state.selectedwriteCommunity
              };
              // 这里需要自己手动重新获取一次数据
              updateStatus(para).then((res) => {
                vm.interfaces[vm.currentIndex].ifOperStatus = res[vm.currentIndex]
              })
            } else {
              //this.$toast( '操作失败')
              console.log ("失败");
            }
         })
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
