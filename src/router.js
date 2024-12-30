import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Orders from './components/Orders.vue';
import Nongli from "@/components/Nongli.vue";

// 路由配置
const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  { path: '/products', component: Orders, name: 'products' },
  { path: '/orders/pending', component: Nongli, name: 'nongli' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
