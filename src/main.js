import { createApp } from 'vue';  // 使用 Vue 3 的 createApp
import App from './App.vue';       // 假设你有一个根组件
import Router from './router';     // 导入路由配置
import 'bootstrap/dist/css/bootstrap.min.css';


const app = createApp(App);       // 创建 Vue 应用实例
app.use(Router);                  // 使用 Vue Router 插件
app.mount('#app');                // 挂载 Vue 应用
