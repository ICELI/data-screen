import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Message } from 'element-ui';
import mock from './mock';

Vue.use(VueAxios, axios);

// 引入api地址配置
const API_ADDRESS = '/webapi/v2';
// eslint-disable-next-line
const API_ADDRESS2 = `${__webpack_require__.p}mock/data`;
const Api = {};

Api.install = () => {
  let apiCancelTokens = []; // 存放请求cancelToken

  // request请求拦截处理
  Vue.axios.interceptors.request.use((config) => {
    console.log(config);
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
      const msg = Message(res.data.desc || `${res.config.apiName || '获取数据'}失败`);
      console.error(msg.message);
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
      const msg = Message(`${err.config.apiName || '获取数据'}失败`);
      console.error(msg.message);
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

    enCarousel() {
      return Vue.axios.get(`${API_ADDRESS2}/en/banner.json`, {
        apiName: '获取首页顶部banner',
      });
    },

    finance() {
      return Vue.axios.get(`${API_ADDRESS2}/en/finance(金融).json`, {
        apiName: 'finance(金融)',
      });
    },

    consultancy() {
      return Vue.axios.get(`${API_ADDRESS2}/en/consultancy(咨询).json`, {
        apiName: 'consultancy(咨询)',
      });
    },

    etransmore() {
      return Vue.axios.get(`${API_ADDRESS2}/en/etransmore(物流).json`, {
        apiName: 'etransmore(物流)',
      });
    },

    certification() {
      return Vue.axios.get(`${API_ADDRESS2}/en/certification（认证）.json`, {
        apiName: 'certification（认证）',
      });
    },

    spotFuturesPrice() {
      return Vue.axios.get(`/dataserviceEN/v1/price/getSpotFuturesPrice/dataType/spot/timeType/monthly`, {
        apiName: '大数聚',
      });
    },
    commodityPriceIndex() {
      return Vue.axios.get(`/dataserviceEN/v1/home/getCommodityPriceIndex`, {
        apiName: '大数聚commodityPriceIndex',
      });
    },

    technology() {
      return Vue.axios.get(`${API_ADDRESS2}/en/technology(智能).json`, {
        apiName: 'technology(智能)',
      });
    },

    // page2
    worldMap() {
      return Vue.axios.get(`${API_ADDRESS2}/en/worldMap(世界地图).json`, {
        apiName: 'worldMap(世界地图)',
      });
    },

    // page3
    realTimeTrade() {
      return Vue.axios.get(`${API_ADDRESS2}/en/realTimeTrade(实时交易数据).json`, {
        apiName: 'realTimeTrade(实时交易数据)',
      });
    },
    todayCustomsClearance() {
      return Vue.axios.get(`${API_ADDRESS2}/en/todayClearance(今日报关量).json`, {
        apiName: 'todayClearance(今日报关量)',
      });
    },
    realTimeVisitor() {
      return Vue.axios.get(`${API_ADDRESS2}/en/realTimeVisitor(实时访客和今日新增商机).json`, {
        apiName: 'realTimeVisitor(实时访客和今日新增商机)',
      });
    },

    // page4
    platformUser() {
      return Vue.axios.get(`${API_ADDRESS2}/en/platformUser(平台用户累计数).json`, {
        apiName: 'platformUser(平台用户累计数)',
      });
    },
    goods() {
      return Vue.axios.get(`${API_ADDRESS2}/en/goods(商品累计数).json`, {
        apiName: 'goods(商品累计数)',
      });
    },
    intentionOrder() {
      return Vue.axios.get(`${API_ADDRESS2}/en/intentionOrder(意向单累计).json`, {
        apiName: 'intentionOrder(意向单累计)',
      });
    },
  };
};

export default Api;

