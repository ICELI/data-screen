<template>
  <div class="panel-1-2 lang-en">
    <h1 class="page-title">GLOBAL REACH ＆ FULL-LINE</h1>
    <div class="world-map-wrap">
      <div class="world-map-bg" :class="'world-map-bg' + currentIndex"></div>
      <div id="worldMap"></div>
      <div class="tips-list-wrap">
        <ul>
          <li v-for="(item,index) in worldMapData" :class="{active: currentIndex == index}">
            <h3>Categories <span class="text-primary">{{item.typeNum}}</span></h3>
            <p>{{item.detailType}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-wrap" id="world-country">
      <h3 class="panel-title">Countries in JUMORE National Pavilion <span class="title-number"><a num="countryTotal">{{countryTotal}}</a></span>
      </h3>
      <div class="panel-content panel-swiper-wrap">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in nationalPavilion[currentIndex]">
              <img
                :src="item.logo || ('/mock/img/en/country/' + worldENSort[currentIndex]+ '/' + item.country + '.jpg')"
                :alt="item.country"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import countryGeoCoordMap from '../assets/js/echarts/countryGeoCoordMap.json';
  import { bindNumber } from '../assets/js/number';

  export default {
    data() {
      return {
        currentIndex: 0,
        worldSort: ['北美洲', '欧洲', '亚洲', '南美洲', '非洲', '大洋洲'],
        worldENSort: ['NorthAmerica', 'Europe', 'Asian', 'SouthAmerica', 'Africa', 'Oceania'],
        worldMapData: [],
        nationalPavilion: [],
        // 字体跳动
        number: {
          countryTotal: 0,
        },
//        worldMap: null,
//        swiper: null

      };
    },
    computed: {
      countryTotal() {
        return this.worldMapData[this.currentIndex] ? this.worldMapData[this.currentIndex].countryNum : 0;
      },
    },
    components: {},
    created() {
      this.Api.worldMap().then((res) => {
        let worldMapData = [];
        let nationalPavilion = [];

        this.worldSort.forEach((v, i) => {
          worldMapData[i] = res.data.data.worldMap.find(n => n.continent === v);
          nationalPavilion[i] = res.data.data.nationalPavilion.find(n => n.continentInfo.continent === v).countryInfo;
        });
        this.worldMapData = worldMapData;
        this.nationalPavilion = nationalPavilion;
        this.changeMap(true);
      });
    },
    methods: {
      changeMap(first) {
        // 销毁swiper
        this.swiper && this.swiper.destroy(true, true);

        this.currentIndex = first
          ? this.currentIndex
          : (this.currentIndex === this.worldSort.length - 1)
            ? 0
            : this.currentIndex + 1;
        const idx = this.currentIndex;
        const specIdx = false;
//        const specIdx = idx === 2 || idx === 3;  // TODO: 指定模块 指定停留时间
        const item = this.nationalPavilion[idx].length - 4;

        this.number.countryTotal = +this.worldMapData[idx].countryNum;

        console.log(this.swiper, idx, item);

        this.$nextTick(function() {
          this.swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            autoplay: 2000,
            speed: 800,
            spaceBetween: 32,
            loop: true
          });
        });
        // todo: 当swiper过渡动画时 切换大洲 跳动感明显 2的倍数
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
        id: 'world-country', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '36px'
      });

      var geoCoordMap = countryGeoCoordMap;

      geoCoordMap['HangZhou'] = [122.2, 30.3];

      var JMDATA = [
        [{ name: 'HangZhou' }, { name: 'United States of America', value: 100 }],
        [{ name: 'HangZhou' }, { name: 'Canada', value: 100 }],

        [{ name: 'HangZhou' }, { name: 'Brazil', value: 100 }],
        [{ name: 'HangZhou' }, { name: 'Chile', value: 100 }],

        [{ name: 'HangZhou' }, { name: 'Australia', value: 100 }],

        [{ name: 'HangZhou' }, { name: 'United Kingdom', value: 100 }],
        [{ name: 'HangZhou' }, { name: 'Germany', value: 100 }],

        [{ name: 'HangZhou' }, { name: 'South Africa', value: 100 }],
        [{ name: 'HangZhou' }, { name: 'Egypt', value: 100 }],

        [{ name: 'HangZhou' }, { name: 'Japan', value: 100 }],
        [{ name: 'HangZhou' }, { name: 'Kazakhstan', value: 100 }]
      ];
      var convertData = function(data) {
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

      // 基于准备好的dom，初始化echarts实例
      this.worldMap = echarts.init(document.getElementById('worldMap'));
      // 指定图表的配置项和数据
      var worldMapOption = {
        geo: [
          {
            name: '世界地图',
            type: 'map',
            map: 'world',
            roam: false,
            zoom: 1.25,
            left: 80,
            top: 260,
//            aspectScale: 0.7,
            selectedMode: 'single',
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(221,221,221, 0)',
                color: 'rgba(221,221,221, 0)'
//                color: '#2788e8'
              }
            }
          }
        ],
        series: [
          {
            name: 'Top10',
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
              normal: {
                color: '#08ffa0',
                width: 0,
                curveness: 0.2
              }
            },
            data: convertData(JMDATA)
          }, {
            name: 'Top10',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
              constantSpeed: 20,
              show: true,
              trailLength: 0.1,
              symbolSize: 1
            },
            lineStyle: {
              normal: {
                color: '#08ffa0',
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: convertData(JMDATA)
          }, {
            name: 'Top10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              scale: 20,
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: false,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: function(val) {
              return 2;
            },
            itemStyle: {
              normal: {
                color: '#08ffa0',
              }
            },
            data: JMDATA.map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              };
            }),
            markPoint: {
              symbol: 'circle',
              symbolSize: 6,
              label: {
                normal: {
                  show: false
                }
              },
              data: [
                {
                  name: 'HangZhou',
                  coord: geoCoordMap['HangZhou']
                }]
            }
          }
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.worldMap.setOption(worldMapOption);
    },
    beforeDestroy() {
      clearTimeout(this.timer);
      this.worldMap.dispose();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  $activeColor: #08ffa0 !default;
  .world-map-wrap {
    position: relative;
    width: 940px;
    height: 806px;
    margin: 0 auto;
    background: url(../assets/img/map-bg-world.png) no-repeat -100px -165px;
  }

  #worldMap {
    width: 940px;
    margin: 0 auto;
    height: 100%;
  }

  .world-map-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-position: -100px -165px;
    background-repeat: no-repeat;
  }

  .world-map-bg0 {
    background-image: url(../assets/img/worldMap/北美-交互.png);
  }

  .world-map-bg1 {
    background-image: url(../assets/img/worldMap/欧洲-交互.png);
  }

  .world-map-bg2 {
    background-image: url(../assets/img/worldMap/亚洲-交互.png);
  }

  .world-map-bg3 {
    background-image: url(../assets/img/worldMap/南美-交互.png);
  }

  .world-map-bg4 {
    background-image: url(../assets/img/worldMap/非洲-交互.png);
  }

  .world-map-bg5 {
    background-image: url(../assets/img/worldMap/大洋洲-交互.png);
  }

  .world-map-wrap .tips-list-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    li {
      position: absolute;
      display: inline-block;
      width: 198px;
      height: 112px;
      padding: 12px 8px 12px 12px;
      border: 2px solid #2788e8;
      border-radius: 16px;
      h3 {
        margin: 0 0 6px;
        font-size: 24px;
        font-weight: normal;
      }
      p {
        font-size: 18px;
        line-height: 18px;
      }
      &.active {
        border-color: $activeColor;
        color: $activeColor !important;
        .text-primary {
          color: $activeColor !important;
        }
        &::before, &::after {
          background: $activeColor;
        }
      }
      &::before, &::after {
        position: absolute;
        top: 100%;
        left: 50%;
        content: '';
        width: 1px;
        height: 80px;
        overflow: hidden;
        background: #2788e8;
      }
      &::after {
        margin-top: 80px;
        transform: rotate(-45deg);
        transform-origin: 0 0;
      }
      &:nth-child(1) {
        top: 10px;
        left: 50px;
      }
      &:nth-child(2) {
        top: 10px;
        left: 50%;
        margin-left: -91px;
      }
      &:nth-child(3) {
        top: 10px;
        right: 35px;
        &::after {
          transform: rotate(45deg);
        }
      }
      &:nth-child(1n+4) {
        bottom: 20px;
        &::before, &::after {
          top: auto;
          bottom: 100%;
          left: 50%;
        }
        &::after {
          margin-bottom: 80px;
          transform: rotate(45deg);
          transform-origin: 100% 100%;
        }
      }
      &:nth-child(4) {
        left: 50px;
        &::after {
          height: 150px;
          transform: rotate(60deg);
        }
      }
      &:nth-child(5) {
        left: 50%;
        margin-left: -91px;
      }
      &:nth-child(6) {
        right: 35px;
        &::after {
          height: 30px;
          transform: rotate(0deg);
        }
      }
    }
  }

  .panel-swiper-wrap {
    height: 108px;
    margin: 20px 0 30px;
    padding: 0 28px;
    overflow: hidden;
  }
</style>
