<template>
  <div id="transaction-data" class="panel-1-3">
    <h1 class="page-title">实时交易数据</h1>

    <!-- 聚融通 start -->
    <div class="pure-g transaction-top">
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h4 class="panel-title color-green">今日访客累计 <span class="title-number"><a num="todayVisitorNum"></a></span>
          </h4>
          <h4 class="panel-title color-pink">昨日访客 <span> {{realTimeTradeTotal.yestodayVisitorNum}}</span></h4>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap" id="lineX"></div>
        </div>
      </div>
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h4 class="panel-title color-yellow">今日意向订单累计 <span class="title-number"><a
            num="todayIntentionOrder"></a></span></h4>
          <h4 class="panel-title color-purple">昨日意向订单 <span> {{realTimeTradeTotal.yestodayIntentionOrder}}</span></h4>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap" id="lineX2"></div>
        </div>
      </div>
    </div>
    <!-- 聚融通 end -->

    <!-- 聚咨询 start -->
    <div class="pure-g transaction-middle">
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title">今日新增用户累计 <span class="title-number"><a num="todayIncreaseUser"></a></span></h3>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap" id="scatter"></div>
        </div>
      </div>
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title">咨询服务</h3>
          <div class="panel-content panel-list-wrap">
            <div class="pure-g panel-list-header">
              <div class="pure-u-9-24">种类</div>
              <div class="pure-u-6-24">数量</div>
              <div class="pure-u-9-24">增量（2017）</div>
            </div>
            <div class="panel-list-content">
              <div class="panel-list-scroll">
                <div class="pure-g" v-for="item in []">
                  <div class="pure-u-9-24 pr20">{{item.type}}</div>
                  <div class="pure-u-6-24 text-primary">{{item.total}}</div>
                  <div class="pure-u-9-24 text-danger">+{{item.increase}}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 聚咨询 end -->

    <!-- 聚运通 start -->
    <div class="pure-g transaction-bottom">
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title">热门运力</h3>
          <div class="panel-content panel-list-wrap">
            <div class="pure-g panel-list-header">
              <div class="pure-u-14-24">跨境线路</div>
              <div class="pure-u-4-24">数量</div>
              <div class="pure-u-6-24">运输方式</div>
            </div>
            <div class="panel-list-content">
              <div class="panel-list-scroll">
                <div class="pure-g" v-for="item in []">
                  <div class="pure-u-14-24 pr20">{{item.line}}</div>
                  <div class="pure-u-4-24 text-primary">{{item.amount}}</div>
                  <div class="pure-u-6-24">{{item.transMode}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title">运输方式</h3>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap panel-ring-wrap" id="barPolarStack"></div>
        </div>
      </div>
    </div>
    <!-- 聚运通 end -->
  </div>
</template>

<script>
  import echarts from 'echarts';
  import carousel from '../service/carousel';
  import scroll from '../service/scroll';
  import Rings from '../service/ring';
  import {bindNumber} from '../service/number';

  export default {
    data() {
      return {
        realTimeTrade: {},
        realTimeTradeTotal: {},
      };
    },
    computed: {
      // 字体跳动
      number() {
        return {
          todayVisitorNum: +this.realTimeTradeTotal.todayVisitorNum,
          todayIntentionOrder: +this.realTimeTradeTotal.todayIntentionOrder,
          todayIncreaseUser: +this.realTimeTradeTotal.todayIncreaseUser
        }
      },
    },
    components: {},
    created() {

      this.Api.realTimeTrade().then((res) => {
        let realTimeTrade = res.data.data.realTimeTrade;
        let realTimeTradeTotal = realTimeTrade.pop();

        // TODO: 对象合并 ES6 只合并存在的属性
        this.number.todayVisitorNum = +realTimeTradeTotal.todayVisitorNum;
        this.number.todayIntentionOrder = +realTimeTradeTotal.todayIntentionOrder;
        this.number.todayIncreaseUser = +realTimeTradeTotal.todayIncreaseUser;
        this.realTimeTradeTotal = realTimeTradeTotal;

        let colors = ['#0bff49', '#ff3274', '#c6ecff'];
        let colors2 = ['#f2ff00', '#9932ff', '#c6ecff'];

        this.lineX.setOption(genOption(realTimeTrade, 'yestodayVisitorNum', 'todayVisitorNum', colors));
        this.lineX2.setOption(genOption(realTimeTrade, 'yestodayIntentionOrder', 'todayIntentionOrder', colors2));

        let option = {
          grid: {
            top: 10,
            bottom: 50,
          },
          xAxis: {
            axisLine: {
              show: false,
              onZero: false,
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
              show: false
            },
            data: realTimeTrade.map(v => v.hour)
          },
          yAxis: {
            axisLine: {
              show: false,
              onZero: false,
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
            }
          },
          series: [{
            data: realTimeTrade.map(v => v.todayIncreaseUser),
            type: 'scatter',
            symbolSize: function (data) {
              console.log(data, 'symbolSize')
              return Math.sqrt(data) / 2;
            },
            itemStyle: {
              normal: {
                color: '#ff4d40'

              }
            }
          }]
        };

        this.scatter.setOption(option);

      });

      function genOption(data, yesterday, today, colors) {

        return {
          color: colors,
          grid: {
            top: 30,
            bottom: 50,
          },
          xAxis: [
            {
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
              nameGap: 100,
              data: data.map(v => v.hour)
            }
          ],
          yAxis: [
            {
              type: 'value',
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
            }
          ],
          series: [
            {
              type: 'line',
              data: data.map(v => v[today])
            },
            {
              type: 'line',
              data: data.map(v => v[yesterday])
            }
          ]
        };
      }
    },
    methods: {},
    mounted() {
      this.lineX = echarts.init(document.getElementById('lineX'));
      this.lineX2 = echarts.init(document.getElementById('lineX2'));
      this.scatter = echarts.init(document.getElementById('scatter'));
      bindNumber(this.number, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'transaction-data', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '36px'
      });

    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .transaction-top {
    .panel-title {
      position: relative;
      padding-left: 46px;
      height: 36px;
      line-height: 36px;
      &:first-child {
        margin-top: 20px;
      }
      &::before {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        top: 15px;
        left: 28px;
        border-radius: 50%;
        background-color: #fff;
        overflow: hidden;
      }
    }

    .color-green {
      &::before {
        background-color: #0bff49;
      }
    }

    .color-pink {
      &::before {
        background-color: #ff3274;
      }
    }

    .color-yellow {
      &::before {
        background-color: #f2ff00;
      }
    }

    .color-purple {
      &::before {
        background-color: #9932ff;
      }
    }

    .panel-chart-wrap {
      height: 338px;
    }
  }

  .transaction-middle {
    .panel-chart-wrap {
      height: 164px;
    }
  }
</style>
