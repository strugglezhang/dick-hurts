import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Orders from './components/Orders.vue';

// 路由配置
const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  { path: '/orders', component: Orders, name: 'orders' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
