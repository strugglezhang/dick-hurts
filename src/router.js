import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Orders from './components/Orders.vue';
import Nongli from "@/components/Nongli.vue";
import Table from "@/components/table/Table.vue"
import TableDetail from "@/components/table/TableDetail.vue";
import TableEdit from "@/components/table/TableEdit.vue";

// 路由配置
const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  { path: '/products', component: Orders, name: 'products' },
  { path: '/orders/pending', component: Nongli, name: 'nongli' },
  { path :'/table',component : Table, name :'table'},
  { path :'/table/detail/:id',component : TableDetail, name :'tableDetail'},
  { path :'/table/edit/:id',component : TableEdit, name :'tableEdit'}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
