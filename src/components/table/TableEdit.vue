<template>
    <div class="user-edit-container">
        <el-card class="edit-card">
            <h2 class="title">编辑用户</h2>
            <el-divider></el-divider>

            <el-form :model="user" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>

                <el-form-item label="年龄">
                    <el-input-number v-model="user.age" :min="1" :max="100"></el-input-number>
                </el-form-item>

                <el-form-item label="地址">
                    <el-select v-model="user.address" placeholder="请选择地址">
                        <el-option v-for="city in addressOptions" :key="city" :label="city" :value="city"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="saveUser">保存</el-button>
                    <el-button @click="$router.push('/table')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const user = ref({});

        const addressOptions = ref(['北京', '上海', '广州', '深圳', '杭州']);

        const fetchUserDetails = async (id) => {
            const users = [
                { id: 1, name: '张三', age: 25, address: '北京' },
                { id: 2, name: '李四', age: 30, address: '上海' },
                { id: 3, name: '王五', age: 28, address: '广州' }
            ];
            user.value = users.find(u => u.id == id) || {};
        };

        const saveUser = () => {
            console.log('用户信息已更新：', user.value);
            alert('用户信息已保存！');
            router.push('/');
        };

        onMounted(() => {
            fetchUserDetails(route.params.id);
        });

        return { user, addressOptions, saveUser };
    }
}
</script>

<style scoped>
.user-edit-container {
    padding: 20px;
}

.edit-card {
    max-width: 600px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: #fff;
}

.title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}
</style>
