<template>
  <div class="panel-1-1">
    <div class="e4b-title">
      <img src="../assets/img/e4b-title-en.png" alt="聚贸E4B跨境电商全球体系">
    </div>
    <div id="carousel">
      <!--<div class="carousel-floor"></div>-->
    </div>
    <div id="e4b-content" class="e4b-content">
      <!-- 聚融通 start -->
      <div class="pure-g e4b-info">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">服务企业数 <span class="title-number"><a num="e4b1">{{financeTotal}}</a></span></h3>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div class="panel-content panel-chart-wrap" id="doughnut">
            </div>
            <div class="doughnut-legend-wrap">
              <ul class="doughnut-legend-list">
                <li class="pointer" v-for="item in finance"><p>{{item.name}}</p>
                  <p class="text-primary">{{item.value}}</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">融资金额占比</h3>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div class="panel-content panel-chart-wrap panel-ring-wrap" id="barPolarStack2">
            </div>
          </div>
        </div>
      </div>
      <!-- 聚融通 end -->

      <!-- 聚咨询 start -->
      <div class="pure-g e4b-info">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">2017增量 <span class="title-number">666</span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="panel-dashboard">
                <h3 class="text-primary">26593</h3>
                <p class="text-default">企业咨询次数</p>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">咨询服务 <span class="title-number">666</span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（2017）</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 聚咨询 end -->

      <!-- 聚运通 start -->
      <div class="pure-g e4b-info">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">热门运力 <span class="title-number">223</span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-14-24">跨境线路</div>
                <div class="pure-u-4-24">数量</div>
                <div class="pure-u-6-24">运输方式</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-14-24 pr20">SHANGHAI-LOS ANGELES ANGELES ANGELES</div>
                    <div class="pure-u-4-24 text-primary">21</div>
                    <div class="pure-u-6-24">海运/铁路</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">运输方式</h3>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div class="panel-content panel-chart-wrap" id="barPolarStack"></div>
          </div>
        </div>
      </div>
      <!-- 聚运通 end -->

      <!-- 聚认证 start -->
      <div class="pure-g e4b-info">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">覆盖品类数 <span class="title-number">2223</span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-7-24">名称</div>
                <div class="pure-u-9-24">覆盖品类数</div>
                <div class="pure-u-8-24">认证企业数</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-7-24 pr20">食品</div>
                    <div class="pure-u-9-24 text-primary">121</div>
                    <div class="pure-u-8-24 text-primary">123213</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">认证体系 <span class="title-number">666</span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（2017）</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-line5">
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">体系认证</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">征信服务</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">产品认证</div>
                    <div class="pure-u-6-24 text-primary">44</div>
                    <div class="pure-u-9-24 text-danger">+13</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">大宗检测</div>
                    <div class="pure-u-6-24 text-primary">35</div>
                    <div class="pure-u-9-24 text-danger">+15</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">其他服务</div>
                    <div class="pure-u-6-24 text-primary">23</div>
                    <div class="pure-u-9-24 text-danger">+4</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 聚认证 end -->

      <!-- 大数聚 start -->
      <div class="pure-g e4b-info">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">聚贸大宗商品交易价格</h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">名称</div>
                <div class="pure-u-9-24">06/30（RMB）</div>
                <div class="pure-u-6-24">幅度</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+111.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+111.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">聚贸行情指数</h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-9-24">06/30（RMB）</div>
                <div class="pure-u-6-24">幅度</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+111.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-danger">+111.48%</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">Dried cocoons</div>
                    <div class="pure-u-9-24 text-primary">133500</div>
                    <div class="pure-u-6-24 text-success">-11.48%</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 大数聚 end -->

      <!-- 聚智能 start -->
      <div class="pure-g e4b-info">
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">需求数</h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（2017）</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">工厂类</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">生产类</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">工厂类</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">生产类</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">工厂类</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">生产类</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">工厂类</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">生产类</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">工厂类</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">生产类</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pure-u-1-2">
          <div class="panel-wrap">
            <h3 class="panel-title">解决方案数 <span class="title-number">666</span></h3>
            <div class="panel-content panel-list-wrap">
              <div class="pure-g panel-list-header">
                <div class="pure-u-9-24">种类</div>
                <div class="pure-u-6-24">数量</div>
                <div class="pure-u-9-24">增量（2017）</div>
              </div>
              <div class="panel-list-content">
                <div class="panel-list-scroll">
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能生产</div>
                    <div class="pure-u-6-24 text-primary">80</div>
                    <div class="pure-u-9-24 text-danger">+2</div>
                  </div>
                  <div class="pure-g">
                    <div class="pure-u-9-24 pr20">智能管理</div>
                    <div class="pure-u-6-24 text-primary">53</div>
                    <div class="pure-u-9-24 text-danger">+1</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 聚智能 end -->
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import carousel from '../service/carousel';
  import scroll from '../service/scroll';
  import Rings from '../service/ring';
  import {bindNumber} from '../service/number';

  export default {
    data() {
      return {
        doughnut: null,
        barPolarStack: null,
        ring: null,
        number: {
            e4b1: 0
        },
        finance: [],
        carousel: []
      };
    },
    computed: {
      financeTotal() {
        return this.finance.filter(v => v.name === '总计')[0] ? this.finance.filter(v => v.name === '总计')[0].value : ''
      }
    },
    components: {},
    created() {
      this.Api.enCarousel().then((res) => {
        this.carousel = res.data;
        carousel(this.carousel, this.barPolarStack);
      });

      this.Api.finance().then((res) => {
        let doughnutData = [];

        res.data.data.serviceCompNum.forEach((v, i) => {
          doughnutData[i == 1 ? 2 : i == 2 ? 1 : i] = {
            name: v.serviceType,
            value: v.num
          };
        });
        this.finance = doughnutData;
        doughnutData = doughnutData.slice(0, 4);

        const doughnutOption = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          legend: {
            show: false,
            orient: 'horizontal',
            itemWidth: 16,
            itemHeight: 16,
            padding: [
              10,  // 上
              10, // 右
              20,  // 下
              28, // 左
            ],
            itemGap: 200,
            x: 'left',
            formatter(name) {
              console.log(arguments); // TODO
              return `${name}\n\n${doughnutData.filter(v => v.name === name)[0].value}`;
            },
            data: doughnutData.keys('name'),
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['35%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold',
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: doughnutData,
            },
          ],
        };
        this.doughnut.setOption(doughnutOption);

        let ringData = [];
        res.data.data.financialProdNum.map(function (v, i) {
          ringData[i] = {
            name: v.financeType,
            value: +v.percent.replace('%', '') / 100,
            display: +v.percent.replace('%', ''),
            unit: '%',
          };
        });
        this.ring.setData(ringData);
        this.number.e4b1 = +this.financeTotal;
      });
    },
    methods: {},
    mounted() {
      // carousel 背景光圈
      document.querySelector('body').className += ' e4b-bg';
      this.ring = new Rings({
        el: 'barPolarStack2',
        size: 127, //圆环最外层尺寸(肯定是正方形)
        colors: ['#2589e9', '#08f6ff', '#f3ff00', '#ff3273', '#fed267'], //颜色列表(必须等于数据数组长度)
        width: 8,  //每一个内环的宽度
        split: 3,   //内环与内环之间的间隔
        alph: 0.2,  //内环底色透明度
        duration: 1.0,  //数据动画过渡时长
        label: '<div><span class="pointer" style="background:{{color}}"></span><label class="lab">{{name}}</label></div><h4 class="val" number="{{value}}"></h4>',  //自定义标注的单元内容
        dir: ['RIGHT', 'RIGHT', 'RIGHT', 'LEFT', 'LEFT'],
        smooth: true
      }, document);

      bindNumber(this.number, {
        attr: 'num',    //属性名称 <a num='100.0'></a>
        id: 'e4b-content', //外层容器#id
        decimals: 0,    //小数点个数
        duration: 2,    //动画时长
        size: '36px'
      });
      // 图表
      this.barPolarStack = echarts.init(document.getElementById('barPolarStack'));
      const barPolarStackOption = {
        angleAxis: {},
        radiusAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四'],
          z: 10,
        },
        polar: {},
        series: [{
          type: 'bar',
          data: [1, 2, 3, 4],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a',
        }, {
          type: 'bar',
          data: [2, 4, 6, 8],
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a',
        }, {
          type: 'bar',
          data: [1, 2, 3, 4],
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a',
        }],
        legend: {
          show: true,
          data: ['A', 'B', 'C'],
        },
      };
      this.barPolarStack.setOption(barPolarStackOption);

      // 圆环
      this.doughnut = echarts.init(document.getElementById('doughnut'));

      // '.panel-list-scroll'
      scroll('.panel-list-scroll')
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
