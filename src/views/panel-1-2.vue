<template>
  <div class="panel-1-2">
    <h1 class="page-title">覆盖全球各国、经营全品类</h1>
    <div class="world-map-wrap">
      <div id="worldMap"></div>
    </div>
    <div class="panel-wrap" id="world-country">
      <h3 class="panel-title">入驻国家馆国家数累计 <span class="title-number"><a num="countryTotal">{{countryTotal}}</a></span>
      </h3>
      <div class="panel-content panel-list-wrap">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import countryGeoCoordMap from '../assets/js/echarts/countryGeoCoordMap.json';
  import {bindNumber} from '../service/number';

  export default {
    data() {
      return {
        currentIndex: 0,
        worldMap: [],
        nationalPavilion: [],
        // 字体跳动
        number: {
          countryTotal: 0,
        },

      };
    },
    computed: {
      countryTotal() {
        return this.worldMap[this.currentIndex] ? this.worldMap[this.currentIndex].countryNum : 0;
      }
    },
    components: {},
    created() {
      this.Api.worldMap().then((res) => {
        this.worldMap = res.data.data.worldMap;
        this.nationalPavilion = res.data.data.nationalPavilion;

        this.number.countryTotal = +this.worldMap[this.currentIndex].countryNum;
      });
    },
    methods: {
      changeCountryTotal(i) {
        this.currentIndex = i;
      }
    },
    mounted() {

      bindNumber(this.number, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'world-country', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '36px'
      });

      var geoCoordMap = countryGeoCoordMap;

      geoCoordMap['HangZhou'] = [120.2, 30.3];

      var JMDATA = [
        [{name: 'HangZhou'}, {name: 'Afghanistan', value: 95}],
        [{name: 'HangZhou'}, {name: 'Angola', value: 90}],
        [{name: 'HangZhou'}, {name: 'Albania', value: 80}],
        [{name: 'HangZhou'}, {name: 'Argentina', value: 70}],
        [{name: 'HangZhou'}, {name: 'Armenia', value: 60}],
        [{name: 'HangZhou'}, {name: 'Australia', value: 50}],
        [{name: 'HangZhou'}, {name: 'Benin', value: 40}],
        [{name: 'HangZhou'}, {name: 'Cuba', value: 30}],
        [{name: 'HangZhou'}, {name: 'Guinea', value: 20}],
        [{name: 'HangZhou'}, {name: 'Libya', value: 10}]
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

      console.log('convertData',convertData(JMDATA));
      var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
      // 基于准备好的dom，初始化echarts实例
      var worldMap = echarts.init(document.getElementById('worldMap'));
      // 指定图表的配置项和数据
      var worldMapOption = {
        geo: [
          {
            name: '世界地图',
            type: 'map',
            map: 'world',
            roam: true,
            selectedMode : 'single',
            label:{
              normal: {
                show:false,
              },
              emphasis: {
                label:{
                  show:true
                }
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
//                color: color[i],
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
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15
            },
            lineStyle: {
              normal: {
//                color: color[i],
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
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
//                color: color[i]
              }
            },
            data: JMDATA.map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              };
            })
          }
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      worldMap.setOption(worldMapOption);
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .world-map-wrap {
    height: 806px;
  }

  #worldMap {
    width: 100%;
    height: 100%;
  }
</style>
