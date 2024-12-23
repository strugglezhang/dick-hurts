// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入你要使用的组件
import HomePage from '../views/HomePage.vue'
import CountDown from '../views/Countdown.vue'
import NewYear from "../views/NewYear.vue";

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/countdown',
    name: 'Countdown',
    component: CountDown
  },
  {
    path: '/newyear',
    name: 'NewYear',
    component: NewYear
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
