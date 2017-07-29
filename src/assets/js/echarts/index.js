/**
 * Created by ICELI on 2017/7/25.
 */

import echarts from 'echarts';
window.echarts = echarts;
import './macarons';
import './world';
import './china';

let initEcharts = echarts.init;
echarts.init = function (initDom, theme, options) {
  return initEcharts.call(null, initDom, theme || 'macarons', options);
};
