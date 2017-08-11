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
          <div class="panel-content panel-chart-wrap" id="scatter"></div>
        </div>
      </div>
      <div class="pure-u-1-2">
        <div class="panel-wrap">
          <h4 class="panel-title color-blue">今日意向订单累计 <span class="title-number"><a
            num="todayIntentionOrder"></a></span></h4>
          <h4 class="panel-title color-purple">昨日意向订单 <span> {{realTimeTradeTotal.yestodayIntentionOrder}}</span></h4>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div class="panel-content panel-chart-wrap" id="barX"></div>
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
          <div class="panel-content panel-chart-wrap" id="lineX"></div>
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
          <h3 class="panel-title clearfix">今日新增商机累计 <span class="title-number"><a
            num="todayIncreaseBusiTotal"></a></span></h3>
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

      this.Api.realTimeTrade('cn').then((res) => {
        let realTimeTrade = res.data.data.realTimeTrade;
        let realTimeTradeTotal = realTimeTrade.pop();
        // TODO: 2小时更新
        realTimeTrade = realTimeTrade.slice(4, 13);
        // TODO: 对象合并 ES6 只合并存在的属性
        this.number.todayVisitorNum = +realTimeTradeTotal.todayVisitorNum;
        this.number.todayIntentionOrder = +realTimeTradeTotal.todayIntentionOrder;
        this.number.todayIncreaseUser = +realTimeTradeTotal.todayIncreaseUser;
        this.realTimeTradeTotal = realTimeTradeTotal;

        let colors = ['#ff3274', '#f2ff00', '#c6ecff'];
        let colors2 = ['#9932ff', '#33e2ff', '#c6ecff'];
        let colors3 = ['#ff3274', '#0bff49', '#c6ecff'];

        this.lineX.setOption(genOption(realTimeTrade, 'yestodayVisitorNum', 'todayVisitorNum', colors));
        // TODO: 只显示每2小时的柱状图
        this.barX.setOption(genOption(realTimeTrade, 'yestodayIntentionOrder', 'todayIntentionOrder', colors2, 'bar'));
        // TODO: 散点图数据密度不够
        this.scatter.setOption(genOption(realTimeTrade, 'yestodayVisitorNum', 'todayVisitorNum', colors3, 'scatter'));

      });

      function genOption(data, yesterday, today, colors, type = 'line') {

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
              type: type,
              data: type === 'line' ?
                [] : type === 'bar' ?
                  data.map((v, i) => {
                    return i % 2 !== 0 ? false : v[yesterday];
                  }) : data.map(v => v[yesterday]),
              symbolSize: function (data) {
                return type === 'scatter' ? Math.sqrt(data) / 4 : 0;
              },
              itemStyle: {
                normal: {
                  color: colors[0]

                }
              }
            },
            {
              type: type,
              data: type === 'bar' ?
                data.map((v, i) => {
                  return i % 2 !== 0 ? false : v[today];
                }) : data.map(v => v[today]),
              symbolSize: function (data) {
                return type === 'scatter' ? Math.sqrt(data) / 4 : 0;
              },
              itemStyle: {
                normal: {
                  color: colors[1]
                }
              }
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
        this.number.todayIncreaseBusiTotal = +res.data.data.todayIncreaseBusiTotal;

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
      this.barX = echarts.init(document.getElementById('barX'));
      this.scatter = echarts.init(document.getElementById('scatter'));
      bindNumber(this.number, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'transaction-data', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 1,    //动画时长
        size: '36px'
      });

    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
