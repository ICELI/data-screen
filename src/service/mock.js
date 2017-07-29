
export default {
  // 大数聚.txt
  // 聚贸大宗商品交易价格取 timeEnd , change 值取前六条
  '/dataserviceEN/v1/price/getSpotFuturesPrice/dataType/spot/timeType/monthly': require('../mock/data/en/getSpotFuturesPrice.json'),
  // 聚贸行情指数取products， index， change值取前六条
  '/dataserviceEN/v1/home/getCommodityPriceIndex': require('../mock/data/en/getCommodityPriceIndex.json'),
  // 聚贸大宗商品交易价格取name ， price2， dayRange 取前六条
  '/dataservice/v1/home/commodityPriceList.pad': require('../mock/data/cn/commodityPriceList.json'),
  // 聚贸行情指数取 name， unit ，price值取前六条
  '/dataservice/v1/industry/toTradePrice.pad': require('../mock/data/cn/toTradePrice.json'),
}
