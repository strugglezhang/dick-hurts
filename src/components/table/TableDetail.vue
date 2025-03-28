<template>
    <div class="user-detail-container">
        <el-card class="user-card">
            <h2 class="title">👤 用户详情</h2>
            <el-divider></el-divider> <!-- 分割线 -->
            <div class="user-info">
                <p><span class="label">🆔 ID:</span> {{ user.id }}</p>
                <p><span class="label">📛 姓名:</span> {{ user.name }}</p>
                <p><span class="label">🎂 年龄:</span> {{ user.age }}</p>
                <p><span class="label">📍 地址:</span> {{ user.address }}</p>
            </div>
            <el-button type="primary" round @click="$router.push('/table')">⬅ 返回</el-button>
        </el-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const user = ref({}); // 用户信息

        // 模拟后端获取用户数据
        const fetchUserDetails = async (id) => {
            const users = [
                { id: 1, name: '张三', age: 25, address: '北京' },
                { id: 2, name: '李四', age: 30, address: '上海' },
                { id: 3, name: '王五', age: 28, address: '广州' }
            ];
            user.value = users.find(u => u.id == id) || {};
        };

        onMounted(() => {
            fetchUserDetails(route.params.id);
        });

        return { user };
    }
}
</script>

<style scoped>
/* 页面布局 */
.user-detail-container {
    display: flex;
    //justify-content: center;
    //align-items: center;
    //height: 100vh; /* 让内容居中 */
    background: #f4f6f8; /* 浅灰色背景 */
}

/* 卡片样式 */
.user-card {
    width: 400px;
    padding: 20px;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: #fff;
}

/* 标题样式 */
.title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
}

/* 信息区域 */
.user-info p {
    font-size: 16px;
    line-height: 1.8;
    color: #666;
    text-align: left;
}

/* 标签样式 */
.label {
    font-weight: bold;
    color: #333;
    display: inline-block;
    width: 80px; /* 让标签对齐 */
}

/* 按钮样式 */
.el-button {
    margin-top: 20px;
}
</style>
