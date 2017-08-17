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
          <div class="panel-content panel-chart-wrap" id="lineArea"></div>
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
  import genOption from '../service/genEchartOption';
  import scroll from '../assets/js/scroll';
  import { bindNumber } from '../assets/js/number';

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
        let realTimeTradeTotal = realTimeTrade.pop();
        let currentHour = this.Util.getCurrTime().hour;

        realTimeTrade = realTimeTrade.slice(currentHour * 2 - 16, currentHour * 2 + 2);
        this.number.todayVisitorNum = +realTimeTradeTotal.todayVisitorNum;
        this.number.todayIntentionOrder = +realTimeTradeTotal.todayIntentionOrder;
        this.number.todayIncreaseUser = +realTimeTradeTotal.todayIncreaseUser;
        this.realTimeTradeTotal = realTimeTradeTotal;

        // 图表
        let colors1 = ['#ff3274', '#0bff49', '#c6ecff'];
        let colors2 = ['#9932ff', '#f2ff00', '#c6ecff'];
        let colors3 = ['#ff3274', '#ff4d40', '#c6ecff'];
        let op1 = genOption(realTimeTrade, 'yestodayVisitorNum', 'todayVisitorNum', colors1);
        let op2 = genOption(realTimeTrade, 'yestodayIntentionOrder', 'todayIntentionOrder', colors2);
        let op3 = genOption(realTimeTrade, '', 'todayIncreaseUser', colors3, 'lineArea');

        this.lineX.setOption(op1);
        this.lineX2.setOption(op2);
        this.lineArea.setOption(op3);

        setInterval(() => {
          this.lineX.clear();
          this.lineX.setOption(op1);

          this.lineX2.clear();
          this.lineX2.setOption(op2);

          this.lineArea.clear();
          this.lineArea.setOption(op3);
        }, 4000);

      });

      this.Api.todayCustomsClearance().then((res) => {
        this.todayCustomsClearance = res.data.data.todayCustomsClearance;
      });

      this.Api.realTimeVisitor().then((res) => {
        let data = res.data.data
        this.realTimeVisitor = data.realTimeVisitor;
        this.todayIncreaseBusi = data.todayIncreaseBusi;
        this.number.todayIncreaseBusiTotal = +data.todayIncreaseBusiTotal;
        this.todayIncreaseBusiTotal = +data.todayIncreaseBusiTotal;

        this.$nextTick(function() {
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
      this.lineArea = echarts.init(document.getElementById('lineArea'));

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

</style>
