import { createRouter, createWebHashHistory } from 'vue-router';
//--slot--start--
import Router from '@/router/home'; //首页路由
//--slot--end--

// 所有的路由地址 便于在线开发时候的页面跳转
const routeArr = [Router];

let routes = [];
routeArr.forEach((item) => {
  routes = routes.concat(item.getRoutes());
});
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
