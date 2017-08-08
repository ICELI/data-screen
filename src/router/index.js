import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 引入路由视图，懒加载处理
const home = () => import(/* webpackChunkName: "home" */ 'views/home');

const page1 = () => import(/* webpackChunkName: "page1" */ 'views/panel-1-1');
const page2 = () => import(/* webpackChunkName: "page2" */ 'views/panel-1-2');
const page3 = () => import(/* webpackChunkName: "page3" */ 'views/panel-1-3');
const page4 = () => import(/* webpackChunkName: "page4" */ 'views/panel-1-4');
const page5 = () => import(/* webpackChunkName: "page5" */ 'views/panel-2-1');
const page6 = () => import(/* webpackChunkName: "page6" */ 'views/panel-2-2');
const page7 = () => import(/* webpackChunkName: "page7" */ 'views/panel-2-3');
const page8 = () => import(/* webpackChunkName: "page8" */ 'views/panel-2-4');
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
      meta: {
        title: 'home'
      }
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1,
      meta: {
        title: 'page1'
      }
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2,
      meta: {
        title: 'page2'
      }
    },
    {
      path: '/page3',
      name: 'page3',
      component: page3,
      meta: {
        title: 'page3'
      }
    },
    {
      path: '/page4',
      name: 'page4',
      component: page4,
      meta: {
        title: 'page4'
      }
    },
    {
      path: '/page5',
      name: 'page5',
      component: page5,
      meta: {
        title: 'page5'
      }
    },
    {
      path: '/page6',
      name: 'page6',
      component: page6,
      meta: {
        title: 'page6'
      }
    },
    {
      path: '/page7',
      name: 'page7',
      component: page7,
      meta: {
        title: 'page7'
      }
    },
    {
      path: '/page8',
      name: 'page8',
      component: page8,
      meta: {
        title: 'page8'
      }
    },
    {
      path: '*',
      component: page404,
    },
  ],
});

export default router;
