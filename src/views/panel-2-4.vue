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
                <td class="t-bar">{{item.area}}</td>
                <td class="t-bar">{{item.userNum}}</td>
                <td class="t-bar" style="text-align:left;">
                  <span class="arrow-up">Top{{index + 1}}</span>
                  <span class="arrow-scroll" v-show="index == 0" style="display:inline-block; height:38px; overflow:hidden;">
                    <div>↑↑↑</div>
                  </span>
                </td>
              </tr>
            </table>
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
    <div class="pure-g situation-bottom" id="orderNumber">
      <div class="pure-u-1-1">
        <div class="panel-wrap">
          <div class="panel-content panel-ring-wrap">
            <section class="order-number-wrap ani-300" style="transform: translateY(250px); transition: all 1s ease-out; opacity:0;">
              累计意向订单数
              <span class="title-number"><a num="orderNumber"></a></span>
            </section>
            <section class="order-number-part1 ani-300" style="transform: translateY(250px); transition: all 0.45s ease-out; opacity:0;"></section>
            <section class="order-number-part2 ani-300" style="transform: translateY(250px); transition: all 0.65s ease-out; opacity:0;"></section>
            <ul class="order-increase">
              <li>昨日意向订单 <span class="text-primary"><a num="yesterdayOrderNumber"></a></span></li>
              <li>订单转化 <span class="text-primary"><a num="orderChangeNumber"></a>%</span></li>
              <li><i></i> <span>较前一日上升</span> <span class="text-primary"><a num="intentionOrder"></a>%</span></li>
            </ul>
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
        },
        orderNumber: {
          orderNumber: 0,
          yesterdayOrderNumber: 0,
          orderChangeNumber: 0,
          intentionOrder: 0,
        },
//        sectors: null,
//        barGradient: null,
      };
    },
    computed: {},
    components: {},
    created() {
      this.Api.industryPercent('cn').then((res) => {
        this.sectors.setData(res.data.data.industryPercent);
      });

      this.Api.platformUser('cn').then((res) => {
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

        window.setTimeout(function(){
          scroll('.arrow-scroll');
        }, 1000);
      });

      this.Api.goods('cn').then((res) => {
        this.goods = res.data.data.goodsNum.slice(0, -1);
        this.number.goodsNum = +res.data.data.goodsNum.slice(-1)[0].num.replace('万', '');

        var barColors = ['#9b33ff', '#8233ff', '#5a33ff', '#3333ff', '#3263ff', '#3390ff', '#33c1ff', '#33ecff', '#33ffdd', '#33ffbb', '#33ff99'];
        var dataAxis = this.goods.map(v => v.industry);
        var data = this.goods.map((v, i) => {
          return {
            value: v.num,
            itemStyle: {
              normal: {
                color: barColors[i]
              }
            }
          }
        });
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
            top: 30,
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
            {
              type: 'pictorialBar',
              barCategoryGap: '-20%',
              symbolPosition: 'end',
              symbol: 'path://M0,24.7c10.9-32.94,74.51-32.94,85.41,0Z',
              itemStyle: {
                normal: {
                  opacity: 0.9
                },
                emphasis: {
                  opacity: 1
                }
              },
              data: data
            }
          ]
        };

        this.barGradient.setOption(option);
      });

      this.Api.intentionOrder('cn').then((res) => {
        this.intentionOrder = res.data.data.intentionOrder;

        this.orderNumber.orderNumber = +this.intentionOrder[0].num.replace('万+', '');
        this.orderNumber.orderChangeNumber = +this.intentionOrder[1].num.replace('%', '');
        this.orderNumber.yesterdayOrderNumber = +this.intentionOrder[2].num;
        this.orderNumber.intentionOrder = +this.intentionOrder[3].num.replace('%', '');
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

      bindNumber(this.orderNumber, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'orderNumber', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '30px'
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

      var circles = document.querySelectorAll('section');
      circles.forEach(function(ele, idx){
        if(idx == 0){
          ele.style.transform = 'translateY(0px)';
          ele.style.opacity = 1;
          window.setTimeout(function(){
            ele.className = ele.className + ' ani-1';
          }, 1000);
        }else if(idx == 1){
          ele.style.transform = 'translateY(0px)';
          ele.style.opacity = 1;
          window.setTimeout(function(){
            ele.className = ele.className + ' ani-1';
          }, 450);
        }else if(idx == 2){
          ele.style.transform = 'translateY(0px)';
          ele.style.opacity = 1;
          window.setTimeout(function(){
            ele.className = ele.className + ' ani-1';
          }, 650);
        }
      });
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .top-bar {
    display: table;
    width: 100%;
    font-size: 20px;
    line-height: 38px;

    .t-bar {
      display: table-cell;
      text-align: left;
      width: 260px;
      white-space: nowrap;
      &:first-child {
        width: 60px;
        padding-right: 24px;
        text-align: right;
      }
      &:nth-child(2) {
        font-size: 24px;
      }
      &:last-child {
        width: 90px;
        text-align: right;
      }
    }
  }

  .order-increase {
    position: absolute;
    width: 392px;
    right: 28px;
    bottom: 40px;
    font-size: 22px;
    text-align: left;
    li {
      position: relative;
      padding-left: 30px;
      line-height: 56px;
      &::before {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        left: 0;
        top: 22px;
        border-radius: 50%;
        background-color: transparent;
      }
      &:nth-child(1) {
        &::before {
          background-color: #3263ff;
        }
      }
      &:nth-child(2) {
        &::before {
          background-color: #2788e8;
        }
      }
    }
    i {
      position: absolute;
      display: inline-block;
      left: 0;
      top: 24px;
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
        overflow: hidden;

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

  .order-number-part1{
    position: absolute;
    content: '';
    top: 60px;
    left: 379px;
    width: 75px;
    height: 75px;
    border-radius: 100%;
    background-color: #2788e8;
  }

  .order-number-part2{
    position: absolute;
    content: '';
    top: 135px;
    left: 375px;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background-color: #4cadfc;
  }

  .order-number-wrap {
    position: absolute;
    width: 196px;
    height: 196px;
    transform: translateY(30px);
    left: 174px;
    padding: 60px 0;
    border-radius: 100%;
    background-color: #3263ff;
    line-height: 38px;
    overflow: visible !important;
    /*&::before, &::after {
      position: absolute;
      content: '';
      top: 60px;
      right: -79px;
      width: 75px;
      height: 75px;
      border-radius: 100%;
      background-color: #2788e8;

    }
    &::after {
      top: 127px;
      right: -27px;
      width: 35px;
      height: 35px;
      background-color: #4cadfc;
    }*/
  }

  @keyframes ani_1{
    0%{
      transform: translateY(0px);
    }
    50%{
      transform: translateY(-20px);
    }
    100%{
      transform: translateY(0px);
    }
  }

  @keyframes ani_2{
    0%{
      top: 40px;
      opacity: 0.8
    }
    100%{
      top: 75px;
      opacity: 1.0
    }
  }

  @keyframes ani_3{
    0%{
      top: 120px;
      opacity: 0.8
    }
    100%{
      top: 145px;
      opacity: 1.0
    }
  }

  .ani-1{animation:ani_1 3s infinite;}
  .ani-2{animation:ani_1 2.5s infinite;}
  .ani-3{animation:ani_1 3s infinite;}
</style>
