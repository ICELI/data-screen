
export default {
  // 大数聚.txt
  // 聚贸大宗商品交易价格取 timeEnd , change 值取前六条
  '/dataserviceEN/v1/price/getSpotFuturesPrice/dataType/spot/timeType/monthly': require('../mock/data/en/getSpotFuturesPrice.json'),
  // 聚贸行情指数取products， index， change值取前六条
  '/dataserviceEN/v1/home/getCommodityPriceIndex': require('../mock/data/en/getCommodityPriceIndex.json'),
  'webapi/v1/certification/en': require('../mock/data/en/certification（认证）.json'),
  '/webapi/v1/consultancy/en': require('../mock/data/en/consultancy(咨询).json'),
  '/webapi/v1/declaration/en': require('../mock/data/en/customsDeclaration(通关).json'),
  '/webapi/v1/logistics/en': require('../mock/data/en/etransmore(物流).json'),
  '/webapi/v1/finance/en': require('../mock/data/en/finance(金融).json'),
  '/webapi/v1/operation/goods/en': require('../mock/data/en/goods(商品累计数).json'),
  '/webapi/v1/operation/trade/en': require('../mock/data/en/industryPercent(行业交易占比).json'),
  '/webapi/v1/operation/order/en': require('../mock/data/en/intentionOrder(意向单累计).json'),
  '/webapi/v1/operation/user/en': require('../mock/data/en/platformUser(平台用户累计数).json'),
  '/webapi/v1/realTimeTrade/en': require('../mock/data/en/realTimeTrade(实时交易数据).json'),
  '/webapi/v1/realTimeVisitor/en': require('../mock/data/en/realTimeVisitor(实时访客和今日新增商机).json'),
  '/webapi/v1/technology/en': require('../mock/data/en/technology(智能).json'),
  '/webapi/v1/todayClearance/en': require('../mock/data/en/todayClearance(今日报关量).json'),
  '/webapi/v1/worldMap': require('../mock/data/en/worldMap(世界地图).json'),

  // todo: 更新json数据
  // 聚贸大宗商品交易价格取name ， price2， dayRange 取前六条
  '/dataservice/v1/home/commodityPriceList.pad': require('../mock/data/cn/commodityPriceList.json'),
  // 聚贸行情指数取 name， unit ，price值取前六条
  '/dataservice/v1/industry/toTradePrice.pad': require('../mock/data/cn/toTradePrice.json'),
  'webapi/v1/certification/cn': require('../mock/data/cn/certification（认证）.json'),
  '/webapi/v1/consultancy/cn': require('../mock/data/cn/consultancy(咨询).json'),
  '/webapi/v1/declaration/cn': require('../mock/data/cn/customsDeclaration(通关).json'),
  '/webapi/v1/logistics/cn': require('../mock/data/cn/etransmore(物流).json'),
  '/webapi/v1/finance/cn': require('../mock/data/cn/finance(金融).json'),
  '/webapi/v1/operation/goods/cn': require('../mock/data/cn/goods(商品累计数).json'),
  '/webapi/v1/operation/trade/cn': require('../mock/data/cn/industryPercent(行业交易占比).json'),
  '/webapi/v1/operation/order/cn': require('../mock/data/cn/intentionOrder(意向单累计).json'),
  '/webapi/v1/operation/user/cn': require('../mock/data/cn/platformUser(平台用户累计数).json'),
  '/webapi/v1/realTimeTrade/cn': require('../mock/data/cn/realTimeTrade(实时交易数据).json'),
  '/webapi/v1/realTimeVisitor/cn': require('../mock/data/cn/realTimeVisitor(实时访客和今日新增商机).json'),
  '/webapi/v1/technology/cn': require('../mock/data/cn/technology(智能).json'),
  '/webapi/v1/todayClearance/cn': require('../mock/data/cn/todayClearance(今日报关量).json'),
  '/webapi/v1/chinaMap': require('../mock/data/cn/chianMap(中国地图).json'),
};
