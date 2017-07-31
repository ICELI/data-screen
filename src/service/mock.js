
export default {
  // 大数聚.txt
  // 聚贸大宗商品交易价格取 timeEnd , change 值取前六条
  '/dataserviceEN/v1/price/getSpotFuturesPrice/dataType/spot/timeType/monthly': require('../mock/data/en/getSpotFuturesPrice.json'),
  // 聚贸行情指数取products， index， change值取前六条
  '/dataserviceEN/v1/home/getCommodityPriceIndex': require('../mock/data/en/getCommodityPriceIndex.json'),
  '/mock/data/en/certification（认证）.json': require('../mock/data/en/certification（认证）.json'),
  '/mock/data/en/consultancy(咨询)': require('../mock/data/en/consultancy(咨询).json'),
  '/mock/data/en/customsDeclaration(通关).json': require('../mock/data/en/customsDeclaration(通关).json'),
  '/mock/data/en/etransmore(物流).json': require('../mock/data/en/etransmore(物流).json'),
  '/mock/data/en/finance(金融).json': require('../mock/data/en/finance(金融).json'),
  '/mock/data/en/goods(商品累计数).json': require('../mock/data/en/goods(商品累计数).json'),
  '/mock/data/en/industryPercent(行业交易占比).json': require('../mock/data/en/industryPercent(行业交易占比).json'),
  '/mock/data/en/intentionOrder(意向单累计).json': require('../mock/data/en/intentionOrder(意向单累计).json'),
  '/mock/data/en/platformUser(平台用户累计数).json': require('../mock/data/en/platformUser(平台用户累计数).json'),
  '/mock/data/en/realTimeTrade(实时交易数据).json': require('../mock/data/en/realTimeTrade(实时交易数据).json'),
  '/mock/data/en/realTimeVisitor(实时访客和今日新增商机).json': require('../mock/data/en/realTimeVisitor(实时访客和今日新增商机).json'),
  '/mock/data/en/technology(智能).json': require('../mock/data/en/technology(智能).json'),
  '/mock/data/en/todayClearance(今日报关量).json': require('../mock/data/en/todayClearance(今日报关量).json'),
  '/mock/data/en/worldMap(世界地图).json': require('../mock/data/en/worldMap(世界地图).json'),


  // todo: cn
  // 聚贸大宗商品交易价格取name ， price2， dayRange 取前六条
  '/dataservice/v1/home/commodityPriceList.pad': require('../mock/data/cn/commodityPriceList.json'),
  // 聚贸行情指数取 name， unit ，price值取前六条
  '/dataservice/v1/industry/toTradePrice.pad': require('../mock/data/cn/toTradePrice.json'),
  '/mock/data/cn/certification（认证）.json': require('../mock/data/cn/certification（认证）.json'),
  '/mock/data/cn/consultancy(咨询)': require('../mock/data/cn/consultancy(咨询).json'),
  '/mock/data/cn/customsDeclaration(通关).json': require('../mock/data/cn/customsDeclaration(通关).json'),
  '/mock/data/cn/etransmore(物流).json': require('../mock/data/cn/etransmore(物流).json'),
  '/mock/data/cn/finance(金融).json': require('../mock/data/cn/finance(金融).json'),
  '/mock/data/cn/goods(商品累计数).json': require('../mock/data/cn/goods(商品累计数).json'),
  '/mock/data/cn/industryPercent(行业交易占比).json': require('../mock/data/cn/industryPercent(行业交易占比).json'),
  '/mock/data/cn/intentionOrder(意向单累计).json': require('../mock/data/cn/intentionOrder(意向单累计).json'),
  '/mock/data/cn/platformUser(平台用户累计数).json': require('../mock/data/cn/platformUser(平台用户累计数).json'),
  '/mock/data/cn/realTimeTrade(实时交易数据).json': require('../mock/data/cn/realTimeTrade(实时交易数据).json'),
  '/mock/data/cn/realTimeVisitor(实时访客和今日新增商机).json': require('../mock/data/cn/realTimeVisitor(实时访客和今日新增商机).json'),
  '/mock/data/cn/technology(智能).json': require('../mock/data/cn/technology(智能).json'),
  '/mock/data/cn/todayClearance(今日报关量).json': require('../mock/data/cn/todayClearance(今日报关量).json'),
  '/mock/data/cn/chianMap(中国地图).json': require('../mock/data/cn/chianMap(中国地图).json'),
};
