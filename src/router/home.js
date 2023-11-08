import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/one-code/index')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
