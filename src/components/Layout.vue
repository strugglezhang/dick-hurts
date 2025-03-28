<template>
    <div class="app">
        <!-- 头部 -->
        <header class="app-header">
            <div class="logo">狂躁倒计时系统</div>
            <div class="user-info" @click="toggleUserMenu">
                <div class="avatar" :style="{ backgroundImage: `url(${require('@/assets/test.jpeg')})` }"></div>
                <span>{{ user.name }}</span>
            </div>
            <div v-if="userMenuVisible" class="user-dropdown">
                <p class="dropdown-item">{{ user.name }}</p>
                <p class="dropdown-item">{{ user.email }}</p>
                <hr class="divider">
                <button class="dropdown-button">退出登录</button>
            </div>
        </header>

        <!-- 主体部分 -->
        <div class="app-body">
            <!-- 左侧菜单 -->
            <aside class="sidebar">
                <ul class="menu">
                    <li class="menu-item" v-for="item in menuItems" :key="item.name">
                        <div
                                class="menu-link"
                                :class="{ active: isActive(item), expanded: item.open }"
                                @click="handleMenuClick(item)"
                        >
                            <span>{{ item.name }}</span>
                            <span v-if="item.children" class="arrow" :class="{ rotated: item.open }">▼</span>
                        </div>
                        <ul v-if="item.children && item.open" class="submenu">
                            <li
                                    class="submenu-item"
                                    v-for="subItem in item.children"
                                    :key="subItem.name"
                                    @click="navigate(subItem)"
                            >
                                {{ subItem.name }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>

            <!-- 右侧内容 -->
            <main class="content">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // userAvatar: require('@/assets/1.jpg'),
            user: {
                name: '超级狂暴倒计时',
                email: 'admin@qq.com',
            },
            userMenuVisible: false,
            activePath: '/dashboard',
            menuItems: [
                { name: '超级牛逼倒计时', path: '/dashboard', open: false },
                { name: '统计图', path: '/products' },
                { name: '表格', path: '/table' },
                { name: '设置', path: '/settings' },
                {
                    name: '其他的',
                    path: '/orders',
                    open: false,
                    children: [
                        { name: '大牛逼', path: '/orders/pending' },
                        { name: '二秃驴', path: '/orders/completed' },
                    ],
                },
            ],
        };
    },
    methods: {
        toggleUserMenu() {
            this.userMenuVisible = !this.userMenuVisible;
        },
        handleMenuClick(item) {
            if (item.children) {
                item.open = !item.open; // Toggle submenu visibility
            } else {
                this.navigate(item);
            }
        },
        navigate(item) {
            this.activePath = item.path;
            this.$router.push(item.path);
        },
        isActive(item) {
            return this.activePath === item.path;
        },
    },
};
</script>
<style scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    margin-right: 10px;
}

.user-dropdown {
    position: absolute;
    top: 100%; /* 放置在 header 下方 */
    right: 20px; /* 靠右对齐 */
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    z-index: 1000;
    min-width: 200px;
    overflow: hidden;
}

.dropdown-item {
    margin: 0;
    padding: 8px 16px;
    font-size: 14px;
    color: #333;
    cursor: default;
    /* 移除了 transition 和 hover 效果 */
}

.divider {
    border: none;
    border-top: 1px solid #eee;
    margin: 8px 0;
}

.dropdown-item:hover {
    color: #333 !important; /* 强制颜色不变 */
    background-color: transparent !important; /* 强制背景不变 */
}

.dropdown-button:hover {
    color: #e74c3c !important; /* 强制颜色不变 */
    background-color: transparent !important; /* 强制背景不变 */
}
.dropdown-button {
    display: block;
    width: 100%;
    padding: 8px 16px;
    font-size: 14px;
    color: #e74c3c; /* 退出按钮的红色文字 */
    background-color: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
}
</style>
<style scoped>
/* 全局布局 */
.app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Arial', sans-serif;
    background-color: #f5f7fa;
}

.logo {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

/* 头部样式 */
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2d3e50;
    color: white;
    padding: 0 20px;
    height: 60px; /* 确保头部高度固定 */
    min-height: 60px; /* 确保最小高度 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
}

.logo {
    font-size: 36px;
    font-weight: bold;
    background: linear-gradient(45deg, #3498db, #8e44ad); /* 更亮的蓝色渐变 */
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    background-size: cover; /* 覆盖整个容器 */
    background-position: center; /* 居中显示 */
    border-radius: 50%; /* 圆形头像 */
}


/* 主体样式 */
.app-body {
    display: flex;
    flex: 1;
}

/* 侧边栏样式 */
.sidebar {
    width: 250px;
    background-color: #2d3e50;
    color: white;
    overflow-y: auto;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    border-bottom: 1px solid #394a5a;
}

.menu-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.menu-link:hover {
    background-color: #1b2836;
}

.menu-link.active {
    background-color: #1b2836;
    font-weight: bold;
}

.arrow {
    transition: transform 0.3s ease;
}

.arrow.rotated {
    transform: rotate(180deg);
}

.submenu {
    list-style: none;
    padding-left: 20px;
    margin: 0;
    background-color: #394a5a;
}

.submenu-item {
    padding: 10px 15px;
    color: #dcdcdc;
    cursor: pointer;
    transition: color 0.3s ease;
}

.submenu-item:hover {
    color: white;
}

/* 内容区样式 */
.content {
    flex: 1;
    padding: 20px;
    background-color: #f5f7fa;
    overflow-y: auto;
    min-height: calc(100vh - 60px); /* 确保内容区不影响头部 */
}
</style>
