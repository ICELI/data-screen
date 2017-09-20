/**
 * @title address.config
 * @desc 配置依赖服务器地址
 * @type {{SERVER_ADDRESS: string, CENTER_ADDRESS: string, USERCENTER_ADDRESS: string, CDN_ADDRESS: string}}
 */
var address = {
  // 静态资源CDN服务器
  CDN_ADDRESS: '',

  // api服务器
  API_ADDRESS: 'http://webapi.jumorebigscreen.test',

  // 大数据国际api服务器
  API_BIGDATA_EN_ADDRESS: 'http://www.jumoredata.com',

};

module.exports = {
  address: address,
  // 跨域设置
  api_proxy: {
    '/webapi/**': address.API_ADDRESS,
    '/dataserviceEN/**': address.API_BIGDATA_EN_ADDRESS,
  },
};
