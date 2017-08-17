/**
 * 获取窗口3、7的图表配置
 * @param array
 * @param yesterday
 * @param today
 * @param colors
 * @param type
 * @returns {{color: *, grid: {top: number, right: number, bottom: number, left: number}, xAxis: [*], yAxis: [*], series: [*,*]}}
 */
export default function genOption(
  array, yesterday, today, colors, type = 'line') {
  let currentHour = new Date().getHours();
  let data = type === 'bar' ? array.filter((v, i) => {
    return i % 4 === 0;
  }) : array;
  let hourData = data.map(v => (type === 'bar'
    ? v.hour // fix 柱状图不能加
    : currentHour < 11
      ? ' ' + v.hour + ' '
      : v.hour.replace(/\s*$/ig, ' ')));

  let todayData = data.map(v => v[today]);
  let yesterdayData = type === 'lineArea' ? [] : data.map(v => v[yesterday]);
  let maxLabel = '' + Math.max.apply(null, todayData.concat(yesterdayData));
  let fixNum = type === 'lineArea' ? 1 : 2;
  let y = +(maxLabel).substr(0, fixNum); // 取前2位向上取5的倍数
  let yMax = (type === 'lineArea' ? y + 2 - y % 2 : y + 4 - y % 4) *
    Math.pow(10, maxLabel.length - fixNum);

  return {
    color: colors,
    grid: {
      top: type === 'lineArea' ? 10 : 30,
      right: 28,
      bottom: 50,
      left: type === 'lineArea' ? 56 : 86
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
            fontSize: 18
          }
        },
        splitArea: {
          show: false
        },
        nameLocation: 'middle',
        nameGap: 100,
        boundaryGap: type === 'bar',
        data: hourData
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: yMax,
        interval: yMax / (type === 'lineArea' ? 2 : 4),
        splitNumber: type === 'lineArea' ? 2 : 4,
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
          /*   formatter: function(val) {
           return val / 10000 + '万';
           },*/
          textStyle: {
            fontSize: 18
          }
        },
        splitArea: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(198,236,255,0.25)'
          }
        }
      }
    ],
    series: [
      {
        type: type === 'lineArea' ? 'line' : type,
        data: yesterdayData,
        symbol: 'none',
        smooth: true,
        sampling: 'average',
        barMaxWidth: 19,
        itemStyle: {
          normal: {
            color: colors[0]

          }
        }
      },
      {
        type: type === 'lineArea' ? 'line' : type,
        data: todayData,
        symbol: 'none',
        smooth: true,
        sampling: 'average',
        barMaxWidth: 19,
        itemStyle: {
          normal: {
            color: colors[1]
          }
        },
        areaStyle: {
          normal: {
            color: type === 'lineArea' ? colors[1] : 'rgba(0,0,0,0)'
          }
        }
      }
    ]
  };
}
