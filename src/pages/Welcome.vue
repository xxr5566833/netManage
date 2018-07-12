<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
          <div class="column is-10 is-offset-1 ">
            <div id="mychart" style="width: 600px;height:400px;"></div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>

  import { getTraps } from '../api/api'

  export default {
    name: 'Welcome',
    // props: ['select'],
    data () {
      return {
        option : {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
      }
    },
    mounted() {this.$nextTick(() => {
      this.initChart()
    })
    },
    computed: {

    },
    methods: {
      initChart(){
        var echarts = require('echarts');
        this.chart1=echarts.init(document.getElementById('mychart'));
        this.chart1.setOption(this.option)
      },
    }
  }
</script>

<style lang="css" scoped>
  #network {
    height: 600px;
  }

</style>
