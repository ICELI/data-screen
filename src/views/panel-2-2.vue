<template>
  <div class="panel-1-2">
    <h1 class="page-title">覆盖中国各省、经营全品类</h1>
    <div class="china-map-wrap">
      <div class="china-map-bg" :class="'china-map-bg' + currentIndex"></div>
      <div id="chinaMap"></div>
      <div class="tips-list-wrap">
        <ul>
          <li v-for="(item,index) in mapData" :class="{active: currentIndex == index}">
            <div class="pure-g">
              <div class="pure-u-15-24">
                <span class="text-warning">{{item.region}}: </span> {{item.industries}}
              </div>
              <div class="pure-u-9-24">
                发布商机数 <span class="text-primary">{{item.goods}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-wrap" id="china-province">
      <h3 class="panel-title">北部区域优秀企业累计 <span class="title-number"><a num="provinceTotal">{{provinceTotal}}</a></span>
      </h3>
      <div class="panel-content panel-swiper-wrap">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in provinces[currentIndex]">
              <div style="text-align:center;">
                <div data-type="signleRing" style="width:100px; height:100px; margin:0 auto 35px auto;"></div>
                <img :src="'/mock/img/cn/province/' + mapSort[currentIndex]+ '/' + item.province + '.jpg'">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import SingleRing from '../service/ring2';
  import countryGeoCoordMap from '../assets/js/echarts/countryGeoCoordMap.json';
  import {bindNumber} from '../assets/js/number';

  export default {
    data() {
      return {
        currentIndex: 0,
        mapSort: ['东部', '南部', '西部', '北部', '中部'],
        mapData: [],
        provinces: [],
        provincesTotal: [],
        // 字体跳动
        number: {
          provinceTotal: 0,
        },
//        chinaMap: null,
//        swiper: null

      };
    },
    computed: {
      provinceTotal() {
        return this.provincesTotal[this.currentIndex] ? this.provincesTotal[this.currentIndex] : 0;
      },
    },
    components: {},
    created() {
      this.Api.chinaMap('cn').then((res) => {
        let mapData = [];
        let provinces = [];
        let provincesTotal = [];

        this.mapSort.forEach((v, i) => {
          mapData[i] = res.data.data.chinaMap.find(n => n.region === v);
          provinces[i] = res.data.data.regionCompanies.find(n => n.region === v).provinces;
          provincesTotal[i] = provinces[i].reduce(function (sum, value) {
            return sum + (+value.compNum);
          }, 0);
        });
        console.log(provincesTotal)
        this.mapData = mapData;
        this.provinces = provinces;
        this.provincesTotal = provincesTotal;
        this.changeMap(true);
      });
    },
    methods: {
      changeMap(first) {
        // 销毁swiper
        this.swiper && this.swiper.destroy(true, true);

        this.currentIndex = first ? this.currentIndex : (this.currentIndex === this.mapSort.length - 1) ? 0 : this.currentIndex + 1;
        const idx = this.currentIndex;
        const specIdx = false;
//        const specIdx = idx === 2 || idx === 3;  // TODO: 指定模块 指定停留时间
        const item = this.provinces[idx].length - 4;
        this.number.provinceTotal = +this.provincesTotal[idx];

        var colors = ['#FFBB17','#2788E7','#40FF85','#F90056']

        this.$nextTick(function () {
          this.swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            autoplay: 2000,
            speed: 800,
            spaceBetween: 32,
          });
        });

        window.setTimeout(function(){
          var objs = document.querySelectorAll('div[data-type]');
          objs && objs.forEach(function(ele, idx){
            var ring = new SingleRing({
              el: ele,
              size: 110
            });
            ring.setData({
              name: '地区名',
              value: Math.random() * 2,
              display: 2017,
              color: colors[idx % 4]
            });
          });
        }, 0);

        // fixme: 当swiper过渡动画时 切换大洲 跳动感明显 2的倍数
        this.timer = setTimeout(() => {
          this.changeMap();
        }, specIdx ? 16000 : (item < 4 ? 4 : item) * 2000);
      }
    },
    mounted() {
      document.querySelector('body').className = document.querySelector('body').className.replace('e4b-bg', '');

      // todo 动画从0开始
      bindNumber(this.number, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'china-province', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '36px'
      });


      this.chinaMap = echarts.init(document.getElementById('chinaMap'));

      var geoCoordMap = {
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [114.4551, 39.5539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [123.9688, 47.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [99.9199, 23.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '台湾': [122.4651, 25.3373],
        '韶关': [113.7964, 24.7028]
      };

      var HZData = [
        [{name: '杭州'}, {name: '北京', value: 90}],
        [{name: '杭州'}, {name: '上海', value: 95}],
        [{name: '杭州'}, {name: '广州', value: 80}],
        [{name: '杭州'}, {name: '重庆', value: 50}],
        [{name: '杭州'}, {name: '兰州', value: 90}],
        [{name: '杭州'}, {name: '哈尔滨', value: 90}],
        [{name: '杭州'}, {name: '南宁', value: 90}],
        [{name: '杭州'}, {name: '昆明', value: 90}],
        [{name: '杭州'}, {name: '乌鲁木齐', value: 90}],
        [{name: '杭州'}, {name: '拉萨', value: 90}],
        [{name: '杭州'}, {name: '台湾', value: 90}]
      ];

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord]
            });
          }
        }
        return res;
      };

      var color = ['#40ff84', '#f2ff00', '#ff4d40'];
      var series = [];
      [['杭州', HZData]].forEach(function (item, i) {
        series.push({
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            effect: {
              show: false, // TODO: 超级耗性能
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
              }
            },
            data: convertData(item[1])
          },
          {
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
              show: false,
              period: 6,
              trailLength: 0,
//              symbolSize: 15
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: convertData(item[1])
          },
          {
            name: item[0] + ' Top10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: false,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i]
              }
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              };
            })
          });
      });
      var chinaMapOption = {
        geo: {
          top: 98,
          left: 150,
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(221,221,221, 0)',
              borderColor: 'rgba(221,221,221, 0)'
            },
            emphasis: {
              areaColor: 'rgba(221,221,221, 0)'
            }
          }
        },
        series: series
      };
      this.chinaMap.setOption(chinaMapOption);
    },
    beforeDestroy() {
      clearTimeout(this.timer);
      this.chinaMap.dispose();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  $activeColor: #08ffa0 !default;
  .china-map-wrap {
    position: relative;
    height: 822px;
  }

  #chinaMap {
    width: 100%;
    height: 100%;
  }

  .china-map-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: url(../assets/img/chinaMap/东部.png) no-repeat center 98px;
  }

  /* TODO: 图片初次加载闪动 */
  .china-map-bg0 {
    background-image: url(../assets/img/chinaMap/东部.png);
  }

  .china-map-bg1 {
    background-image: url(../assets/img/chinaMap/南部.png);
  }

  .china-map-bg2 {
    background-image: url(../assets/img/chinaMap/西部.png);
  }

  .china-map-bg3 {
    background-image: url(../assets/img/chinaMap/北部.png);
  }

  .china-map-bg4 {
    background-image: url(../assets/img/chinaMap/中部.png);
  }

  .china-map-wrap .tips-list-wrap {
    position: absolute;
    top: 10px;
    left: 28px;
    width: 573px;
    height: 292px;
    padding: 13px 29px;
    border-radius: 7px;
    background-color: rgba(39, 136, 232, .24);
    li {
      font-size: 22px;
      line-height: 54px;
      [class*=pure-u] {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.active {
        border-color: $activeColor;
        color: $activeColor !important;
        [class^=text-] {
          color: $activeColor !important;
        }
      }
    }
  }

  .panel-swiper-wrap {
    height: 238px;
    margin: 20px 0 30px;
    padding: 0 28px;
    overflow: hidden;
  }

  #china-province {
    margin-top: -162px;
    background-color: transparent;
    box-shadow: none;
  }
</style>
