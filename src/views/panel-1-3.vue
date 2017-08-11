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
          <h3 class="panel-title clearfix"><span class="pull-right">出口国家</span>今日报关量</h3>
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
          <h3 class="panel-title clearfix">今日新增商机累计 <span class="title-number"><a num="todayIncreaseBusiTotal">{{todayIncreaseBusiTotal}}</a></span>
          </h3>
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
  import util from '../assets/js/util';
  import scroll from '../assets/js/scroll';
  import {bindNumber} from '../assets/js/number';

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
    computed: {},
    components: {},
    created() {

      this.Api.realTimeTrade().then((res) => {
        let realTimeTrade = res.data.data.realTimeTrade;
        realTimeTrade && realTimeTrade.map(function(ele){
          ele.todayVisitorNum = (parseFloat(ele.todayVisitorNum) * 0.0001).toFixed(1);
          ele.yestodayVisitorNum = (parseFloat(ele.yestodayVisitorNum) * 0.0001).toFixed(1);
          return ele;
        });
        let realTimeTradeTotal = realTimeTrade.pop();

        let hour = util.getCurrTime().hour % 2 == 0 ? util.getCurrTime().hour : util.getCurrTime().hour - 1;

        //console.log(realTimeTradeTotal)
        // TODO: 2小时更新
        realTimeTrade = realTimeTrade.slice(hour, hour + 14);
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
            axisLabel: {
              textStyle: {
                fontSize: 20
              }
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
            splitNumber: 2,
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
          xAxis: [{
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
            axisLabel: {
              textStyle: {
                fontSize: 20
              }
            },
            splitArea: {
              show: false
            },
            nameLocation: 'middle',
            nameGap: 100,
            data: data.map(v => v.hour)
          }
          ],
          yAxis: [{
            type: 'value',
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
              symbolSize: function (data) {
                return 0;
              },
              data: data.map(v => v[today]),
              label: {
                normal: {
                  show: true,
                  formatter: '12'
                }
              }
            },
            {
              type: 'line',
              symbolSize: function (data) {
                return 0;
              },
              data: data.map(v => v[yesterday]),
              label: {
                normal: {
                  show: true,
                    formatter: '12'
                }
              }
            }
          ]
        };
      }

      this.Api.todayCustomsClearance().then((res) => {
        this.todayCustomsClearance = res.data.data.todayCustomsClearance;
      });

      this.Api.realTimeVisitor().then((res) => {
        let data = res.data.data
        this.realTimeVisitor = data.realTimeVisitor;
        this.todayIncreaseBusi = data.todayIncreaseBusi;
        this.number.todayIncreaseBusiTotal = +data.todayIncreaseBusiTotal;
        this.todayIncreaseBusiTotal = +data.todayIncreaseBusiTotal;


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

      console.dir(this.lineX2.getOption())

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
center {
  color: #c6ecff;
}
</style>
