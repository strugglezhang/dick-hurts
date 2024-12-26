<template>
    <div class="app">
        <!-- 头部 -->
        <header class="app-header">
            <div class="logo">My Admin</div>
            <div class="user-info" @click="toggleUserMenu">
                <img class="user-avatar" src="https://via.placeholder.com/40" alt="User Avatar" />
                <span>{{ user.name }}</span>
            </div>
            <div v-if="userMenuVisible" class="user-dropdown">
                <p>{{ user.name }}</p>
                <p>{{ user.email }}</p>
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
            user: {
                name: 'Admin User',
                email: 'admin@example.com',
            },
            userMenuVisible: false,
            activePath: '/dashboard',
            menuItems: [
                { name: 'Dashboard', path: '/dashboard', open: false },
                {
                    name: 'Orders',
                    path: '/orders',
                    open: false,
                    children: [
                        { name: 'Pending Orders', path: '/orders/pending' },
                        { name: 'Completed Orders', path: '/orders/completed' },
                    ],
                },
                { name: 'Products', path: '/products' },
                { name: 'Settings', path: '/settings' },
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
/* 全局布局 */
.app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Arial', sans-serif;
    background-color: #f5f7fa;
}

/* 头部样式 */
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2d3e50;
    color: white;
    padding: 0 20px;
    height: 60px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
    font-size: 18px;
    font-weight: bold;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.user-avatar {
    border-radius: 50%;
    margin-right: 10px;
}

.user-dropdown {
    position: absolute;
    top: 60px;
    right: 20px;
    background: white;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    z-index: 10;
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
}
</style>
