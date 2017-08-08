// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'assets/js/echarts';
// import 'assets/js/element-ui';
import 'assets/css/index.scss';

import App from './App';
import Api from './service/api';
import Util from './service/util';
import store from './store';
import router from './router';
import lazyLoad from './assets/js/lazyload';
import * as filters from './filter';

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 将过滤器挂载到vue原型上，方便在实例中使用
Vue.prototype.$filter = filters;

Vue.use(Api);
Vue.use(Util);
Vue.use(lazyLoad);

const app = new Vue({
  el: '#app',
  data() {
    return {};
  },
  router,
  store,
  template: '<App/>',
  components: { App },
});

// 设置路由钩子
router.beforeEach((to, from, next) => {
  const userIsLogin = store.state.User.isLogin;

  app.Api.apiRequsetCancel();
  // 限制访问 releaseReasearch 路由
  if (userIsLogin !== 'true' && '/releaseResearch/'.match(`/${to.name}/`)) {
    app.$emit('showLoginDialog');
    if (!from.name) {
      app.$router.push({ path: '/' });
    }
  } else {
    app.showFooter = false;
    next();
  }
  // for SEO
  window.prerenderReady = false;
});

router.afterEach((to) => {
  // 修改标题
  document.title = to.meta.title || '数据大屏';
});
