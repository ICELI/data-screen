import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import {Message} from 'element-ui';
import mock from './mock';
let address = require('../../config/address.config').address

Vue.use(VueAxios, axios);

// 引入api地址配置
const API_ADDRESS = '/webapi/v2';
// eslint-disable-next-line
const API_ADDRESS2 = `${__webpack_require__.p}mock/data`;
const Api = {};

function bigDataBaseUrl(language = 'en') {
  let baseUrl = ''

  if (language === 'en') {
        baseUrl = address.API_BIGDATA_EN_ADDRESS
      } else {
        baseUrl = address.API_BIGDATA_ADDRESS
  }

  return baseUrl;
}

Api.install = (language = 'en') => {
  let apiCancelTokens = []; // 存放请求cancelToken

  // request请求拦截处理
  Vue.axios.interceptors.request.use((config) => {
    // 添加取消请求用的cancelToken
    config.cancelToken = new Vue.axios.CancelToken((c) => {
      apiCancelTokens.push(c);
    });
    return config;
  }, error => Promise.reject(error));

  // response响应拦截处理
  Vue.axios.interceptors.response.use((res) => {
    // 请求成功，但是操作不成功时显示后端返回的错误信息
    if (res.status !== 200) {
      // const msg = Message(res.data.desc || `${res.config.apiName || '获取数据'}失败`);
      // console.error(msg.message);
    }
    return res;
  }, (err) => {
    // TODO: 接口404走mock数据
    if (mock[err.config.url]) {
      return Promise.resolve({data: mock[err.config.url]});
    }
    // 判断请求是否被取消
    if (Vue.axios.isCancel(err)) {
      console.log('Request canceled', err.message);
    } else {
      // 如果请求未被取消，则处理错误信息
      // const msg = Message(`${err.config.apiName || '获取数据'}失败`);
      // console.error(msg.message);
    }
    return Promise.reject(err);
  });

  /* eslint-disable */
  // 接口列表
  Vue.prototype.Api = {
    // 取消页面当前请求
    apiRequsetCancel() {
      // 依次取消请求
      apiCancelTokens.forEach((cancel) => {
        cancel('请求被取消');
      });
      // 清空cancelToken
      apiCancelTokens = [];
    },

    Carousel(language = 'en') {
      return Vue.axios.get(`${API_ADDRESS2}/${language}/banner.json`, {
        apiName: '获取首页顶部banner',
      });
    },

    finance(language = 'en') {
      return Vue.axios.get(`/webapi/v1/finance/${language}`, {
        apiName: 'finance(金融)',
      });
    },

    consultancy(language = 'en') {
      return Vue.axios.get(`/webapi/v1/consultancy/${language}`, {
        apiName: 'consultancy(咨询)',
      });
    },

    etransmore(language = 'en') {
      return Vue.axios.get(`/webapi/v1/logistics/${language}`, {
        apiName: 'etransmore(物流)',
      });
    },

    certification(language = 'en') {
      return Vue.axios.get(`/webapi/v1/certification/${language}`, {
        apiName: 'certification（认证）',
      });
    },

    spotFuturesPrice(language = 'en') {
      return Vue.axios.get(`/dataserviceEN/v1/price/getSpotFuturesPrice/dataType/spot/timeType/monthly`, {
        apiName: '大数聚',
      });
    },
    commodityPriceIndex(language = 'en') {
      return Vue.axios.get(`/dataserviceEN/v1/home/getCommodityPriceIndex`, {
        apiName: '大数聚commodityPriceIndex',
      });
    },
    commodityPriceList(language = 'en') {
      return Vue.axios.get(`/dataservice/v1/home/commodityPriceList.pad`, {
        apiName: '大数聚',
      });
    },
    toTradePrice(language = 'en') {
      return Vue.axios.get(`/dataservice/v1/industry/toTradePrice.pad`, {
        apiName: '大数聚commodityPriceIndex',
      });
    },

    technology(language = 'en') {
      return Vue.axios.get(`/webapi/v1/technology/${language}`, {
        apiName: 'technology(智能)',
      });
    },

    // page2
    worldMap(language = 'en') {
      return Vue.axios.get(`/webapi/v1/worldMap`, {
        apiName: 'worldMap(世界地图)',
      });
    },

    // page6
    chinaMap(language = 'en') {
      return Vue.axios.get(`/webapi/v1/chinaMap`, {
        apiName: 'chianMap(中国地图)',
      });
    },

    // page3
    realTimeTrade(language = 'en') {
      return Vue.axios.get(`/webapi/v1/realTimeTrade/${language}`, {
        apiName: 'realTimeTrade(实时交易数据)',
      });
    },
    todayCustomsClearance(language = 'en') {
      return Vue.axios.get(`/webapi/v1/todayClearance/${language}`, {
        apiName: 'todayClearance(今日报关量)',
      });
    },
    realTimeVisitor(language = 'en') {
      return Vue.axios.get(`/webapi/v1/realTimeVisitor/${language}`, {
        apiName: 'realTimeVisitor(实时访客和今日新增商机)',
      });
    },

    // page4
    platformUser(language = 'en') {
      return Vue.axios.get(`/webapi/v1/operation/user/${language}`, {
        apiName: 'platformUser(平台用户累计数)',
      });
    },
    goods(language = 'en') {
      return Vue.axios.get(`/webapi/v1/operation/goods/${language}`, {
        apiName: 'goods(商品累计数)',
      });
    },
    intentionOrder(language = 'en') {
      return Vue.axios.get(`/webapi/v1/operation/order/${language}`, {
        apiName: 'intentionOrder(意向单累计)',
      });
    },
    industryPercent(language = 'en') {
      return Vue.axios.get(`/webapi/v1/operation/trade/${language}`, {
        apiName: 'industryPercent(行业交易占比)',
      });
    },

    // page5
    customsDeclaration(language = 'en') {
      return Vue.axios.get(`/webapi/v1/declaration/${language}`, {
        apiName: 'customsDeclaration(通关)',
      });
    },
  };
};

export default Api;

