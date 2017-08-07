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
  import scroll from '../service/scroll';
  import Sectors from '../service/sectors';
  import Rings from '../service/ring';
  import {bindNumber} from '../service/number';

  export default {
    data() {
      return {
        platformUser: [],
        intentionOrder: {},

        realTimeTrade: {},
        realTimeTradeTotal: {},
        todayCustomsClearance: [],
        realTimeVisitor: [],
        todayIncreaseBusi: [],
        todayIncreaseBusiTotal: 0,
        sectors: null,
        // 字体跳动
        number: {
          platformUserNum: 0,
          goodsNum: 0,
          intentionOrder: 0,
        },
        barGradient: null,
        ring: null
      };
    },
    computed: {},
    components: {},
    created() {

      /*this.sectors.setData([
       {name:'矿产', value:0.04, radius:0.60, unit:'%'},
       {name:'农产品', value:0.10, radius:0.72, unit:'%'},
       {name:'消费品', value:0.20, radius:0.90, unit:'%'},
       {name:'机械', value:0.10, radius:0.72, unit:'%'},
       {name:'化工', value:0.15, radius:0.80, unit:'%'},
       {name:'食品', value:0.10, radius:0.90, unit:'%'},
       {name:'石油', value:0.02, radius:0.40, unit:'%'},
       {name:'钢', value:0.10, radius:0.5, unit:'%'},
       {name:'煤', value:0.05, radius:0.62, unit:'%'},
       {name:'有色', value:0.06, radius:0.85, unit:'%'},
       {name:'工业品', value:0.08, radius:0.75, unit:'%'}
       ]);*/
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
            top: 10,
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

        // fixme: 固定图表为达到视觉效果
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
  .top-bar {
    display: table;
    width: 100%;
    font-size: 20px;
    line-height: 38px;
    tr:nth-child(1) {
      color: #ff3274;
      b {
        background-color: #ff3274 !important;
      }
    }
    tr:nth-child(2) {
      color: #ffff33;
      b {
        background-color: #ffff33 !important;
      }
    }
    tr:nth-child(3) {
      color: #33ffff;
      b {
        background-color: #33ffff !important;
      }
    }
    .t-bar {
      display: table-cell;
      text-align: left;
      width: 178px;
      white-space: nowrap;
      &:first-child {
        width: 110px;
      }
      &:last-child {
        width: 100px;
        text-align: right;
      }
      .bar-wrap {
        position: relative;
        display: inline-block;
        width: 178px;
        height: 16px;
        margin: 0 10px;
        background-color: rgba(198, 236, 255, 0.16);
        vertical-align: middle;
        text-indent: 10000px;
        b {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          width: 0; // 根据数据计算 相对于
          height: 16px;
          background-color: #2788e8;
          transition: width cubic-bezier(0.22, 0.61, 0.36, 1) 2s;
        }
      }
    }
  }

  .situation-top {
    .panel-bar-wrap, .panel-chart-wrap {
      height: 358px;
      padding: 0 28px;
    }
  }

  .situation-middle {
    .panel-chart-wrap {
      height: 234px;
    }
  }

  .situation-bottom {
    .panel-content {
      height: 250px;
      padding: 28px;
    }
  }

  .panel-ring-wrap {
    position: relative;
    font-size: 22px;
    .ring-content {
      padding-top: 0;
    }
    .val2 {
      font-size: 30px;
    }
  }

  #ring li {
    top: 40px;
    width: 306px !important;
    margin-left: 20px;
    text-align: left;
    &:nth-child(1n+3) {
      top: 24px;
    }
  }

  .order-increase {
    position: absolute;
    width: 314px;
    right: 28px;
    bottom: 72px;
    font-size: 22px;
    text-align: left;
    i {
      position: relative;
      display: inline-block;
      left: 11px;
      top: -5px;
      margin-right: 16px;
      width: 14px;
      height: 8px;
      border: 3px solid #06F9FF;
      border-width: 0 0 3px 3px;
      transform: rotate(-45deg);
      &::before {
        position: absolute;
        content: '';
        left: -16px;
        top: 0;
        width: 16px;
        height: 3px;
        background-color: #06F9FF;

      }
      &::after {
        position: absolute;
        content: '';
        right: -10px;
        bottom: -8px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-left-color: #06F9FF;
        overflow: hidden;
      }
    }
    span {
      display: inline-block;
    }
    .text-primary {
      font-size: 30px;
    }
  }

  #test {
    margin-top: 60px;
  }
</style>
