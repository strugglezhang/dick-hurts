<!-- src/views/Home.vue -->
<template>
    <div>
        <h1>欢迎来到首页</h1>
        <router-link to="/countdown">去倒计时页面</router-link>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>
