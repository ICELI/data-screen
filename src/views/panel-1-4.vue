<template>
  <div id="situation-data" class="panel-1-4 lang-en">
    <h1 class="page-title">OPERATIONS OVERVIEW</h1>

    <!-- situation start -->
    <div class="pure-g situation-top">
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title">Total Users <span class="title-number"><a num="platformUserNum"></a></span>
          </h3>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-bar-wrap">
            <table class="top-bar">
              <tr v-for="(item, index) in platformUser">
                <td class="t-bar">Top{{ index + 1 }} {{item.area}}</td>
                <td class="t-bar">
                  <div class="bar-wrap"><b :style="{width: 150 * item.percent + 'px'}">178</b></div>
                </td>
                <td class="t-bar">{{item.userNum | formatNumber}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h4 class="panel-title">Transaction% of 11 Platforms</h4>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap" id="sectors"></div>
        </div>
      </div>
    </div>
    <!-- situation end -->

    <!-- situation start -->
    <div class="pure-g situation-middle">
      <div class="pure-u-1-1">
        <div class="panel-wrap" style="position:relative;">
          <h3 class="panel-title">Total Amount of Goods <span class="title-number"><a num="goodsNum"></a></span></h3>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap" id="bar-gradient"></div>
        </div>
      </div>
    </div>
    <!-- situation end -->

    <!-- situation start -->
    <div class="pure-g situation-bottom">
      <div class="pure-u-1-1">
        <div class="panel-wrap">
          <div class="panel-content panel-ring-wrap">
            <div id="ring"></div>
            <div class="order-increase"><i></i> <span>Up from Yesterday</span> <span class="text-primary"><a
              num="intentionOrder"></a>%</span></div>
          </div>

        </div>
      </div>
    </div>
    <!-- situation end -->
  </div>
</template>

<script>
  import echarts from 'echarts';
  import scroll from '../assets/js/scroll';
  import Sectors from '../assets/js/sectors';
  import Rings from '../assets/js/ring';
  import {bindNumber} from '../assets/js/number';

  export default {
    data() {
      return {
        platformUser: [],
        intentionOrder: {},

        // 字体跳动
        number: {
          platformUserNum: 0,
          goodsNum: 0,
          intentionOrder: 0,
        },
//        sectors: null,
//        barGradient: null,
//        ring: null
      };
    },
    computed: {},
    components: {},
    created() {
      const industryPercent = ['0.6', '0.72', '0.9', '0.62', '0.8', '0.9', '0.6', '0.5', '0.62', '0.85', '0.75'];

      this.Api.industryPercent().then((res) => {
        let data = res.data.data.slice(0, 11).map(function (v, i) {
          return {
            industry: v.industry,
            percent: v.percent / 100,
            radius: v.radius > 0.5 ? v.radius : (0.4 + 0.1 * v.radius), // 保证所有扇区可见又能用老数据（0.4 开始可见），小于0.5的按比例控制在0.4~0.5范围内
          }
        });

        this.sectors.setData(data);
      });

      this.Api.platformUser().then((res) => {
        let platformUserNum = res.data.data
        this.platformUser = platformUserNum.slice(0, 8);

        setTimeout(() => {
          this.platformUser = this.platformUser.map((v, i) => {

            return {
              area: v.area,
              userNum: v.userNum,
              percent: v.userNum / this.platformUser[0].userNum
            }
          });
        }, 50);

        this.number.platformUserNum = +platformUserNum.slice(-1)[0].userNum.replace('万', '');
      });

      this.Api.goods().then((res) => {
        let goodsNum = res.data.data
        this.goods = goodsNum.slice(0, -1);
        let totalNumber = goodsNum.slice(-1)[0].num.replace('万','')
        this.number.goodsNum = +totalNumber;
        var markArrs = [];
        goodsNum && goodsNum.forEach(ele => {
          markArrs.push({
            xAxis: ele.industry,
            yAxis: ele.num
          })
        });

        var dataAxis = this.goods.map(v => v.industry);
        var data = this.goods.map(v => v.num);
        var dataShadow = [];
        var yMax = Math.max.apply(null, data);
        var len = Math.pow(10, ('' + yMax).length - 1);
        var intY =  ~~(yMax / len);
        yMax = (intY % 2 === 0 ? intY + 2 : intY + 1) * len;

        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }

        window.w_dataAxis = dataAxis;
        let colors = ['#0bff49', '#ff3274', '#c6ecff'];
        let option = {
          grid: {
            top: 50,
            right: 28,
            bottom: 72,
          },
          xAxis: {
            data: dataAxis,
            type: 'category',
            axisLine: {
              show: false,
              lineStyle: {
                color: colors[2]
              }
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              margin: 16,
              textStyle: {
                fontSize: 18 // todo: 20
              }
            },
            z: 10
          },
          yAxis: {
            max: yMax,
            splitNumber: 2,
            axisLine: {
              show: false,
              lineStyle: {
                color: colors[2]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
//                align: 'right',
                fontSize: 20
              }
            },
            splitArea: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(198,236,255,0.5)'
              }
            },
          },
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(198,236,255,0.16)'}
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: dataShadow,
              animation: false,
              markPoint:{},
              animationEasing: 'cubicOut',
              symbolPosition: 'end',
              symbol: 'path://M0,24.7c10.9-32.94,74.51-32.94,85.41,0Z',
            },
            {
              type: 'bar',
              barMinHeight: 20,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#00ffe6'},
                      {offset: 0.87, color: '#2788e8'},
                      {offset: 1, color: '#2788e8'}
                    ]
                  )
                }
              },
              animationEasing: 'cubicOut',
              data: data
            }
          ]
        };

        this.barGradient.setOption(option);
        var self = this;

        var xArrs = option.xAxis.data;

      (function __repeatAnimation(){
          for(let i=0; i<xArrs.length; i++){
            window.setTimeout(function(){
              option.series[0].markPoint = {
                data: [markArrs[i]],
                symbolSize: [55, 60],
                symbolOffset: [0, -5],
                itemStyle: {
                  normal: {
                    color: '#FF3273',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,0.7)',
                    shadowOffsetX: 5,
                    shadowOffsetY: 5
                  }
                },
                label:{
                  normal:{
                    textStyle: {
                      color: '#fff',
                      fontSize: 14
                    },
                    offset: [0, -2]
                  }
                },
                animationEasing: 'cubicOut',
                animationDelayUpdate: function(){
                  console.log(arguments)
                }
              };
              self.barGradient.setOption(option);
              if(i == xArrs.length - 1){
                window.setTimeout(function(){
                  __repeatAnimation();
                }, 2000);
              }
            }, 2000 * i);
          }
        })();

      });

      this.Api.intentionOrder().then((res) => {

        this.intentionOrder = res.data.data

        // fixme: 固定图表为达到视觉效果
        let totalOrder = +this.intentionOrder.totalOrder.replace('万', '');
        let convertRatio = this.intentionOrder.convertRatio.replace('%', '');
        let yesterdayOrder = this.intentionOrder.yesterdayOrder;

        this.ring.setData([
          {name: 'Total Orders', value: 0.75, display: totalOrder, unit: '+'},
          {name: 'Yesterday’s Orders', value: 0.25, display: yesterdayOrder, unit: ''},
          {name: 'Conversion Rate', value: convertRatio / 100, display: convertRatio, unit: '%'}
        ]);

        this.number.intentionOrder = +this.intentionOrder.upgrateRatio.replace('%', '');
        console.log(+this.intentionOrder.upgrateRatio.replace('%', ''))
      });
    },
    methods: {},
    beforeDestroy() {
      window.clearInterval(window._ringTimer);
      window.clearTimeout(window._time0);
      window.clearTimeout(window._time6);
      window.clearTimeout(window._time7);
      window.clearTimeout(window._time02);
      window.clearInterval(window._time);
      window.clearTimeout(window._time2);
      window.clearTimeout(window._time21);
      window.clearTimeout(window._time3);
      window.clearTimeout(window._time8);

    },
    mounted() {
      document.querySelector('body').className = document.querySelector('body').className.replace('e4b-bg', '')

      this.barGradient = echarts.init(document.getElementById('bar-gradient'));
      window.onresize = () => {
        this.barGradient.resize();
      };

      bindNumber(this.number, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'situation-data', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '36px'
      });

      this.sectors = new Sectors({
        el: 'sectors',
        title: {
          name: '融资金额占比',
          className: 'title'
        },
        size: 112,
        colors: ['#bf64ff', '#ff6a66', '#ff8b66', '#ffaf66', '#ffd366', '#ffff67', '#7eff66', '#66ffe3', '#66deff', '#5f5ceb', '#8766ff'],
        innerSize: 35,
        split: 20,
        offset: 200
      }, document);

      this.ring = new Rings({
        el: 'ring',
        size: 194,
        colors: ['#06f9ff', '#f2ff00', '#ff3273'],
        width: 14,
        split: 4,
        alph: 0.2,
        duration: 2.0,
        label: '<span class="pointer" style="background:{{color}}"></span><label class="lab">{{name}}</label><h4 class="val2" number="{{value}}"></h4>',
        dir: ['RIGHT', 'RIGHT', 'RIGHT', 'RIGHT', 'RIGHT'],
        smooth: true,
        rotate: true
      }, document);
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #ring li {
    top: 40px;
    width: 322px !important;
    margin-left: 20px;
    text-align: left;
    &:nth-child(1n+3) {
      top: 24px;
    }
    .lab {
      margin-right: 10px;
    }
  }
</style>
