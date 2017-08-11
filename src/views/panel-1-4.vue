<template>
  <div id="situation-data" class="panel-1-4">
    <h1 class="page-title">运营概况</h1>

    <!-- situation start -->
    <div class="pure-g situation-top">
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title">平台用户数累计 <span class="title-number"><a num="platformUserNum"></a>万</span>
          </h3>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-bar-wrap">
            <table class="top-bar">
              <tr v-for="(item, index) in platformUser">
                <td class="t-bar">Top{{ index + 1 }} {{item.area}}</td>
                <td class="t-bar">
                  <div class="bar-wrap"><b :style="{width: 150 * item.percent + 'px'}">178</b></div>
                </td>
                <td class="t-bar">{{item.userNum}}</td>
              </tr>
            </table>
            <!--<div class="top-bar" v-for="(item, index) in platformUser">-->
            <!--<span class="t-bar">Top{{ index + 1 }} {{item.area}}</span>-->
            <!--<span class="t-bar bar-wrap"><b :style="{width: 150 * item.percent + 'px'}">178</b></span>-->
            <!--<span class="t-bar">{{item.userNum}}</span>-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h4 class="panel-title">行业交易占比</h4>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap" id="sectors"></div>
        </div>
      </div>
    </div>
    <!-- situation end -->

    <!-- situation start -->
    <div class="pure-g situation-middle">
      <div class="pure-u-1-1">
        <div class="panel-wrap">
          <h3 class="panel-title">商品数累计 <span class="title-number"><a num="goodsNum"></a>万</span></h3>
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
            <div class="order-increase"><i></i> <span>较前一日上升</span> <span class="text-primary"><a
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
      this.Api.industryPercent().then((res) => {
        this.sectors.setData(res.data.data.industryPercent);
      });

      this.Api.platformUser().then((res) => {
        this.platformUser = res.data.data.platformUserNum.slice(0, -3);

        setTimeout(() => {
          this.platformUser = this.platformUser.map((v, i) => {

            return {
              area: v.area,
              userNum: v.userNum,
              percent: v.userNum / this.platformUser[0].userNum
            }
          });
        }, 50);

        this.number.platformUserNum = +res.data.data.platformUserNum.slice(-1)[0].userNum.replace('万', '');
      });

      this.Api.goods().then((res) => {
        this.goods = res.data.data.goodsNum.slice(0, -1);
        this.number.goodsNum = +res.data.data.goodsNum.slice(-1)[0].num;

        var dataAxis = this.goods.map(v => v.industry);
        var data = this.goods.map(v => v.num);
        var dataShadow = [];
        var yMax = Math.max.apply(null, data);
        var len = Math.pow(10, ('' + yMax).length - 1);
        yMax = (~~(yMax / len) + 1) * len; // TODO: 柱状图阴影

        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }
        let colors = ['#0bff49', '#ff3274', '#c6ecff'];
        let option = {
          grid: {
            top: 37,
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
            nameLocation: 'middle',
            axisLabel: {
              margin: 16,
              textStyle: {
                fontSize: 19 // todo: 20
              }
            },
            z: 10
          },
          yAxis: {
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
              formatter: '{value}万',
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
              animation: false
            },
            {
              type: 'bar',
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
              data: data
            }
          ]
        };

        this.barGradient.setOption(option);
      });

      this.Api.intentionOrder().then((res) => {
        this.intentionOrder = res.data.data.intentionOrder;

        // todo: 固定图表为达到视觉效果
        let num0 = this.intentionOrder[0].num.replace('万+', '');
        let num1 = this.intentionOrder[1].num.replace('%', '');
        let num2 = this.intentionOrder[2].num;

        this.ring.setData([
          {name: '累计意向订单数', value: 0.75, display: num0, unit: '万+'},
          {name: '昨日意向订单', value: 0.25, display: num2, unit: ''},
          {name: '订单转化', value: num1 / 100, display: num1, unit: '%'}
        ]);

        this.number.intentionOrder = +this.intentionOrder[3].num.replace('%', '');
      });
    },
    methods: {},
    mounted() {
      document.querySelector('body').className = document.querySelector('body').className.replace('e4b-bg', '')

      this.barGradient = echarts.init(document.getElementById('bar-gradient'));

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
        size: 115,
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
        smooth: true
      }, document);
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #ring li {
    top: 40px;
    width: 306px !important;
    margin-left: 20px;
    text-align: left;
    &:nth-child(1n+3) {
      top: 24px;
    }
  }
</style>
