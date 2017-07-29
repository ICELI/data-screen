import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 引入路由视图，懒加载处理
const home = () => import(/* webpackChunkName: "home" */ 'views/home');
const page404 = () => import(/* webpackChunkName: "page404" */ 'views/page404');

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
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
      path: '*',
      component: page404,
    },
  ],
});

export default router;
