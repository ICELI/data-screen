import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 引入路由视图，懒加载处理
const home = () => import(/* webpackChunkName: "home" */ 'views/panel-1-1');
const page2 = () => import(/* webpackChunkName: "page2" */ 'views/panel-1-2');
const page3 = () => import(/* webpackChunkName: "page3" */ 'views/panel-1-3');
const page404 = () => import(/* webpackChunkName: "page404" */ 'views/page404');

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {x: 0, y: 0};
  },
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2,
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3,
    },
    {
      path: '*',
      component: page404,
    },
  ],
});

export default router;
