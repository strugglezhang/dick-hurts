<template>
    <div id="app">
        <Layout /> <!-- 使用 Layout 组件 -->
    </div>
</template>

<script>
import Layout from './components/Layout.vue';  // 导入 Layout 组件

export default {
    name: 'App',
    components: {
        Layout
    }
};
</script>
