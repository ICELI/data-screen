<template>
  <div class="panel-1-1">
    <div class="e4b-title">
      <img src="../assets/img/e4b-title-en.png" alt="聚贸E4B跨境电商全球体系">
    </div>
    <div id="carousel">
      <!--<div class="carousel-floor"></div>-->
    </div>
    <div id="e4b-content" class="e4b-content">
      <!-- 聚融通 start -->
      <div class="pure-g e4b-info" id="idx_0">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">服务企业数 <span class="title-number"><a num="financeTotal"></a></span>
            </h3>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div class="panel-content panel-chart-wrap" id="doughnut">
            </div>
            <div class="doughnut-legend-wrap">
              <ul class="doughnut-legend-list">
                <li class="pointer" v-for="item in finance.slice(0, -1)"><p>{{item.name}}</p>
                  <p class="text-primary">{{item.value}}</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">融资金额占比</h3>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div class="panel-content panel-chart-wrap panel-ring-wrap" id="barPolarStack2">
            </div>
          </div>
        </div>
      </div>
      <!-- 聚融通 end -->

      <!-- 聚咨询 start -->
      <div class="pure-g e4b-info" id="idx_1">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">{{currentYear}}增量 <span class="title-number"><a num="consultancyInquiriesIncrease"></a></span>
            </h3>
            <div class="panel-content panel-list-wrap">
              <div class="panel-dashboard">
                <h3 class="text-primary"><a num2="consultancyInquiriesNum">{{consultancyInquiriesNum}}</a></h3>
                <p class="text-default">主动咨询企业数</p>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">咨询服务 <span class="title-number"><a num="consultationServiceTotal"></a></span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（{{currentYear}}）</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g" v-for="item in consultationService">
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
      <div class="pure-g e4b-info" id="idx_2">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">热门运力 <span class="title-number"><a num="transProportionTotal"></a></span>
            </h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-14-24">跨境线路</div>
                <div class="pure-u-4-24">数量</div>
                <div class="pure-u-6-24">运输方式</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g" v-for="item in transProportion">
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

      <!-- 聚认证 start -->
      <div class="pure-g e4b-info" id="idx_3">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">覆盖品类数 <span class="title-number"><a num="certificationCoverItemNumTotal"></a></span>
            </h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-7-24">名称</div>
                <div class="pure-u-9-24">覆盖品类数</div>
                <div class="pure-u-8-24">认证企业数</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g" v-for="item in certification.coverItemNum.slice(0, -1)">
                    <div class="pure-u-7-24 pr20">{{item.industry}}</div>
                    <div class="pure-u-9-24 text-primary">{{item.itemNum}}</div>
                    <div class="pure-u-8-24 text-primary">{{item.companyNum}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">认证体系 <span class="title-number"><a
              num="certificationCoverCertifySysTotal"></a></span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（{{currentYear}}）</div>
              </div>
              <div class="panel-list-content">
                <div :class="certification.certifySys.length < 7 ? 'panel-list-line5' : 'panel-list-scroll'">
                  <div class="pure-g" v-for="item in certification.certifySys.slice(0, -1)">
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
      <!-- 聚认证 end -->

      <!-- 大数聚 start -->
      <div class="pure-g e4b-info" id="idx_4">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">聚贸大宗商品交易价格</h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">名称</div>
                <div class="pure-u-9-24">价格（月末）</div>
                <div class="pure-u-6-24">幅度</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g" v-for="item in spotFuturesPrice">
                    <div class="pure-u-9-24 pr20">{{item.commodity}}</div>
                    <div class="pure-u-9-24 text-primary">{{item.dayPrice}}</div>
                    <div class="pure-u-6-24 text-danger" v-if="item.change.indexOf('-') == -1">+{{item.change}}</div>
                    <div class="pure-u-6-24 text-success" v-else="">{{item.change}}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">聚贸行情指数</h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-9-24">数值</div>
                <div class="pure-u-6-24">幅度</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g" v-for="item in commodityPriceIndex">
                    <div class="pure-u-9-24 pr20">{{item.products}}</div>
                    <div class="pure-u-9-24 text-primary">{{item.index}}</div>
                    <div class="pure-u-6-24 text-danger" v-if="item.change.indexOf('-') == -1">+{{item.change}}</div>
                    <div class="pure-u-6-24 text-success" v-else="">{{item.change}}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 大数聚 end -->

      <!-- 聚智能 start -->
      <div class="pure-g e4b-info" id="idx_5">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">需求数</h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（{{currentYear}}）</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g" v-for="item in technology.demandNum.slice(0, -1)">
                    <div class="pure-u-9-24 pr20">{{item.type}}</div>
                    <div class="pure-u-6-24 text-primary">{{item.total}}</div>
                    <div class="pure-u-9-24 text-danger">+{{item.increase}}</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">解决方案数 <span class="title-number"><a num="technologySolutionNumTotal"></a></span>
            </h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（{{currentYear}}）</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g" v-for="item in technology.solutionNum.slice(0, -1)">
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
      <!-- 聚智能 end -->
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import carousel from '../assets/js/carousel';
  import scroll from '../assets/js/scroll';
  import Rings from '../assets/js/ring';
  import {bindNumber} from '../assets/js/number';

  export default {
    data() {
      return {
        // banner
        carousel: [],
        // 字体跳动
        number: {
          financeTotal: 0,
          consultancyInquiriesIncrease: 0,
          consultancyInquiriesNum: 0,
          consultationServiceTotal: 0,
          transProportionTotal: 0,
          certificationCoverItemNumTotal: 0,
          certificationCoverCertifySysTotal: 0,
          technologySolutionNumTotal: 0,
        },
        // 聚融通
        finance: [],
//        doughnut: null,
//        ring: null,
//        barPolarStack: null,
        // 聚咨询
        consultancy: {
          consultationService: [],
          inquiriesNum: [{
            total: 0,
            increase: 0
          }]
        },
        // 聚运通
        linesNum: [],
        // 聚认证
        certification: {
          coverItemNum: [],
          certifySys: []
        },
        // 大数聚
        timeEnd: '',
        spotFuturesPrice: [],
        commodityPriceIndex: [],
        // 聚智能
        technology: {
          demandNum: [],
          solutionNum: [],
        }

      };
    },
    computed: {
      financeTotal() {
        return this.finance.filter(v => v.name === '总计')[0] ? this.finance.filter(v => v.name === '总计')[0].value : ''
      },

      currentYear() {
        return this.consultancy.inquiriesNum[0].currentYear || 0
      },
      consultancyInquiriesIncrease() {
        return this.consultancy.inquiriesNum[0].increase || 0
      },
      consultancyInquiriesNum() {
        return this.consultancy.inquiriesNum[0].total || 0
      },
      consultationServiceTotal() {
        return this.consultancy.consultationService.filter(v => v.type === '总计')[0] ? this.consultancy.consultationService.filter(v => v.type === '总计')[0].total : ''
      },
      consultationService() {
        return this.consultancy.consultationService.filter(v => v.type !== '总计')
      },

      transProportionTotal() {
        return this.linesNum.filter(v => v.line === '总计')[0] ? this.linesNum.filter(v => v.line === '总计')[0].amount : ''
      },
      transProportion() {
        return this.linesNum.filter(v => v.line !== '总计')
      },

      certificationCoverItemNumTotal() {
        return this.certification.coverItemNum.filter(v => v.industry === '总计')[0] ? this.certification.coverItemNum.filter(v => v.industry === '总计')[0].itemNum : ''
      },
      certificationCoverCertifySysTotal() {
        return this.certification.certifySys.filter(v => v.type === '总计')[0] ? this.certification.certifySys.filter(v => v.type === '总计')[0].total : ''
      },

      technologyDemandNumTotal() {
        return this.technology.demandNum.filter(v => v.type === '总计')[0] ? this.technology.demandNum.filter(v => v.type === '总计')[0].itemNum : ''
      },
      technologySolutionNumTotal() {
        return this.technology.solutionNum.filter(v => v.type === '总计')[0] ? this.technology.solutionNum.filter(v => v.type === '总计')[0].total : ''
      },
    },
    components: {},
    created() {
      window.clearTimeout(window._t);
      window.queue = [];

      this.Api.Carousel().then((res) => {
        this.carousel = res.data;
        carousel(this.carousel);
      });

      this.Api.finance().then((res) => {
        let doughnutData = [];

        res.data.data.serviceCompNum.forEach((v, i) => {
          doughnutData[i == 1 ? 2 : i == 2 ? 1 : i] = {
            name: v.serviceType,
            value: v.num
          };
        });
        this.finance = doughnutData;
        doughnutData = doughnutData.slice(0, 4);

        const doughnutOption = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          legend: {
            show: false,
            orient: 'horizontal',
            itemWidth: 16,
            itemHeight: 16,
            padding: [
              10,  // 上
              10, // 右
              20,  // 下
              28, // 左
            ],
            itemGap: 200,
            x: 'left',
            data: doughnutData.keys('name'),
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold',
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: doughnutData,
            },
          ],
        };
        this.doughnut.setOption(doughnutOption);

        let ringData = [];
        res.data.data.financialProdNum.map(function (v, i) {
          ringData[i] = {
            name: v.financeType,
            value: +v.percent.replace('%', '') / 100,
            display: +v.percent.replace('%', ''),
            unit: '%',
          };
        });
        this.ring.setData(ringData);
        this.number.financeTotal = +this.financeTotal;
      });

      this.Api.consultancy().then((res) => {
        this.consultancy = res.data.data;

        this.number.consultancyInquiriesIncrease = +this.consultancyInquiriesIncrease;
        this.number.consultancyInquiriesNum = +this.consultancyInquiriesNum;
        this.number.consultationServiceTotal = +this.consultationServiceTotal;
      });

      this.Api.etransmore().then((res) => {
        this.linesNum = res.data.data.linesNum;
        let transProportion = [];

        res.data.data.transProportion.map(function (v, i) {
          transProportion[i] = {
            name: v.type,
            value: +v.percent.replace('%', '') / 100,
            display: +v.percent.replace('%', ''),
            unit: '%',
          };
        });
        this.barPolarStack.setData(transProportion);
        this.number.transProportionTotal = +this.transProportionTotal;
      });

      this.Api.certification().then((res) => {
        this.certification = res.data.data;

        this.number.certificationCoverItemNumTotal = +this.certificationCoverItemNumTotal;
        this.number.certificationCoverCertifySysTotal = +this.certificationCoverCertifySysTotal;
      });

      this.Api.technology().then((res) => {
        this.technology = res.data.data;

        this.number.technologySolutionNumTotal = +this.technologySolutionNumTotal;
      });

      this.Api.spotFuturesPrice().then((res) => {
        this.spotFuturesPrice = res.data.data.futuresPriceBeanList;
        this.timeEnd = res.data.data.timeEnd;
      });
      this.Api.commodityPriceIndex().then((res) => {
        this.commodityPriceIndex = res.data.data;

        this.$nextTick(function () {
          // '.panel-list-scroll' TODO: async data
          this.scrollTimers = scroll('.panel-list-scroll');
        });
      });
    },
    methods: {},
    mounted() {
      // carousel 背景光圈
      document.querySelector('body').className = document.querySelector('body').className.replace('e4b-bg', '') + ' e4b-bg';

      this.ring = new Rings({
        el: 'barPolarStack2',
        size: 127, //圆环最外层尺寸(肯定是正方形)
        colors: ['#2589e9', '#08f6ff', '#f3ff00', '#ff3273', '#fed267'], //颜色列表(必须等于数据数组长度)
        width: 8,  //每一个内环的宽度
        split: 3,   //内环与内环之间的间隔
        alph: 0.2,  //内环底色透明度
        duration: 1.0,  //数据动画过渡时长
        label: '<div><span class="pointer" style="background:{{color}}"></span><label class="lab">{{name}}</label></div><h4 class="val" number="{{value}}"></h4>',  //自定义标注的单元内容
        dir: ['RIGHT', 'RIGHT', 'RIGHT', 'LEFT', 'LEFT'],
        smooth: true
      }, document);

      this.barPolarStack = new Rings({
        el: 'barPolarStack',
        size: 127, //圆环最外层尺寸(肯定是正方形)
        colors: ['#2589e9', '#08f6ff', '#f3ff00', '#ff3273', '#fed267'], //颜色列表(必须等于数据数组长度)
        width: 8,  //每一个内环的宽度
        split: 3,   //内环与内环之间的间隔
        alph: 0.2,  //内环底色透明度
        duration: 1.0,  //数据动画过渡时长
        label: '<div><span class="pointer" style="background:{{color}}"></span><label class="lab">{{name}}</label></div><h4 class="val" number="{{value}}"></h4>',  //自定义标注的单元内容
        dir: ['RIGHT', 'RIGHT', 'RIGHT', 'LEFT', 'LEFT'],
        smooth: true
      }, document);

      window.queue.push({
        type: 'ring',
        el: this.ring
      });

      window.queue.push({
        type: 'ring',
        el: this.barPolarStack
      });

      bindNumber(this.number, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'e4b-content', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '36px'
      }, function (num) {
        window.queue.push({
          type: 'number',
          el: num
        });
      });

      bindNumber(this.number, {
        attr: 'num2',    //属性名称 <a num='100.0'></a>
        id: 'e4b-content', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '50px'
      });

      // 圆环
      this.doughnut = echarts.init(document.getElementById('doughnut'));
      window.onresize = () => {
        this.doughnut.resize();
      };
    },
    beforeDestroy() {
      this.scrollTimers();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
.carousel-wrap {
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(400px) rotateY(0deg) translateZ(0px);
}
</style>
