<template>
  <div id="transaction-data" class="panel-1-3">
    <h1 class="page-title">实时交易数据</h1>

    <!-- transaction start -->
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
    <!-- transaction end -->

    <!-- transaction start -->
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
          <h3 class="panel-title clearfix"><span class="pull-right">进口省份</span>今日报关量</h3>
          <div class="panel-content panel-list-wrap">
            <div class="panel-list-content">
              <div class="panel-list-scroll">
                <div class="clearfix" v-for="item in todayCustomsClearance">
                  <span class="pull-right text-warning">{{item.area}}</span>
                  {{item.goods}}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- transaction end -->

    <!-- transaction start -->
    <div class="pure-g transaction-bottom">
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title clearfix">实时访客</h3>
          <div class="panel-content panel-list-wrap">
            <div class="panel-list-content">
              <div class="panel-list-scroll">
                <div class="clearfix" v-for="item in realTimeVisitor">
                  <span class="panel-list-time pull-right">{{item.time}}</span>
                  <span class="panel-list-label text-warning">访客</span>{{item.visitor}}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h3 class="panel-title clearfix">今日新增商机累计 <span class="title-number"><a num="todayIncreaseBusiTotal">{{todayIncreaseBusiTotal}}</a></span></h3>
          <div class="panel-content panel-list-wrap">
            <div class="panel-list-content">
              <div class="panel-list-scroll">
                <div class="clearfix" v-for="item in todayIncreaseBusi">
                  <span class="panel-list-label text-warning">{{item.type}}</span>{{item.business}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- transaction end -->
  </div>
</template>

<script>
  import echarts from 'echarts';
  import scroll from '../service/scroll';
  import {bindNumber} from '../service/number';

  export default {
    data() {
      return {
        realTimeTrade: {},
        realTimeTradeTotal: {},
        todayCustomsClearance: [],
        realTimeVisitor: [],
        todayIncreaseBusi: [],
        todayIncreaseBusiTotal: 0,
        // 字体跳动
        number: {
          todayVisitorNum: 0,
          todayIntentionOrder: 0,
          todayIncreaseUser: 0,
          todayIncreaseBusiTotal: 0
        },
      };
    },
    computed: {
    },
    components: {},
    created() {

      this.Api.realTimeTrade('cn').then((res) => {
        let realTimeTrade = res.data.data.realTimeTrade;
        let realTimeTradeTotal = realTimeTrade.pop();
        // TODO: 2小时更新
        realTimeTrade = realTimeTrade.slice(4,13);
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
            axisLabel: {
              interval: 1
            },
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
              minInterval: 2,
              splitNumber: 5,
              axisLabel: {
                interval: 1
              },
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
              minInterval: 2,
              splitNumber: 5,
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

      this.Api.todayCustomsClearance('cn').then((res) => {
        this.todayCustomsClearance = res.data.data.todayCustomsClearance;
      });

      this.Api.realTimeVisitor('cn').then((res) => {
        this.realTimeVisitor = res.data.data.realTimeVisitor;
        this.todayIncreaseBusi = res.data.data.todayIncreaseBusi;
        this.number.todayIncreaseBusiTotal = +res.data.todayIncreaseBusiTotal;
        this.todayIncreaseBusiTotal = res.data.todayIncreaseBusiTotal;


        this.$nextTick(function () {
          // '.panel-list-scroll' TODO: async data
          scroll('.panel-list-scroll');
        });
      });
    },
    methods: {},
    mounted() {
      document.querySelector('body').className = document.querySelector('body').className.replace('e4b-bg', '');

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
    .panel-list-content {
      height: 134px;
    }
  }

  .transaction-bottom {
    .panel-list-content {
      height: 216px;
    }
  }
  .panel-list-content {
    line-height: 36px;
    margin: 0 0 30px 0;
  }
  .panel-list-scroll {
    padding-right: 28px;
  }
  .panel-list-label {
    margin-right: 10px;
  }
  .panel-list-time {
    margin-left: 20px;
  }
</style>
