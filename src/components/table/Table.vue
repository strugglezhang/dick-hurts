<template>
    <div class="content-container">
        <!-- 筛选表单 -->
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="filterForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="filterForm.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
            <el-form-item label="城市">
                <el-select v-model="filterForm.address" placeholder="请选择城市" style="width: 200px">
                    <el-option v-for="city in addressOptions" :key="city" :label="city" :value="city" style="max-height: 300px;"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleFilter">筛选</el-button>
            </el-form-item>
        </el-form>
        <!-- 统计数据区域 -->
        <div class="table-container">
        <div class="statistics">
            <span>总人数: {{ filteredData.length }}</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <span>平均年龄: {{ averageAge }}</span>
        </div>
        <div class="button-group">
            <el-button :disabled="selectedRows?.length === 0" @click="handleBatchDelete" type="danger">
                批量删除
            </el-button>
            <el-button :disabled="selectedRows?.length === 0" @click="handleBatchDelete" type="primary">
                批量删除
            </el-button>
            <el-button :disabled="selectedRows?.length === 0" @click="handleBatchDelete" type="success">
                批量删除
            </el-button>
            <el-button :disabled="selectedRows?.length === 0" @click="handleBatchDelete" type="warning">
                批量删除
            </el-button>
            <el-button :disabled="selectedRows?.length === 0" @click="handleBatchDelete" type="info">
                批量删除
            </el-button>
         </div>

        <el-table
                :data="paginatedData"
                border
                stripe
                :row-class-name="tableRowClassName"
                @sort-change="handleSortChange"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="80"
                    align="center"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    header-align="center"
                    align="center"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    header-align="center"
                    align="center"
                    sortable="custom">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    header-align="center"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="eat"
                    label="吃饭"
                    header-align="center"
                    align="center">
            </el-table-column >
            <el-table-column label="操作"
                     header-align="center"
                     align="center">
                <template #default="scope">
                    <el-button size="small" @click="handleView(scope.row)">查看</el-button>
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :total="filteredData.length"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handlePageChange"
                style="margin-top: 20px; text-align: center;"
        >
        </el-pagination>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage,ElMessageBox } from 'element-plus';
export default {
    setup() {
        // 示例数据
        const selectedRows = ref([]);
        const users = ref([
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 2, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 3, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 4, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 5, name: '张三', age: 25, address: '法国' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '意大利' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
            { id: 1, name: '张三', age: 25, address: '北京' , 'eat' : "米饭" },
        ]);

        const router = useRouter();

        // 筛选表单数据
        const filterForm = ref({
            name: '',
            age: '',
        });

        // 当前页码和每页显示数量
        const currentPage = ref(1);
        const pageSize = ref(10);

        // 排序状态
        const sortOptions = ref({
            prop: '', // 排序字段
            order: '', // 排序顺序
        });

        // 筛选后的数据
        const filteredData = computed(() => {
            let data = users.value.filter((user) => {
                return (
                    (!filterForm.value.name || user.name.includes(filterForm.value.name)) &&
                    (!filterForm.value.age || user.age == filterForm.value.age) &&
                    (filterForm.value.address === "全部" || !filterForm.value.address || user.address === filterForm.value.address)
                );
            });

            // 如果有排序条件，则对数据进行排序
            if (sortOptions.value.prop && sortOptions.value.order) {
                const isAscending = sortOptions.value.order === 'ascending';
                data = [...data].sort((a, b) => {
                    return isAscending
                        ? a[sortOptions.value.prop] - b[sortOptions.value.prop]
                        : b[sortOptions.value.prop] - a[sortOptions.value.prop];
                });
            }

            return data;
        });

        // 分页后的数据
        const paginatedData = computed(() => {
            const start = (currentPage.value - 1) * pageSize.value;
            const end = start + pageSize.value;
            return filteredData.value.slice(start, end);
        });

        // 筛选按钮点击事件
        const handleFilter = () => {
            currentPage.value = 1; // 筛选后重置到第一页
        };

        // 分页切换事件
        const handlePageChange = (page) => {
            currentPage.value = page;
        };

        // 排序事件
        const handleSortChange = ({ prop, order }) => {
            sortOptions.value.prop = prop; // 更新排序字段
            sortOptions.value.order = order; // 更新排序顺序

            // 触发 Vue 响应式更新
            users.value = [...users.value];
        };

        // 操作方法
        const handleView = (row) => {
            router.push(`/table/detail/${row.id}`);
        };

        const handleEdit = (row) => {
            router.push(`/table/edit/${row.id}`);
        };

        const handleDelete = (row) => {
            ElMessageBox.confirm(
                '确定要删除此用户吗？', // 提示消息
                '删除确认', // 标题
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning', // 警告框类型
                }
            )
                .then(() => {
                    // 用户点击 "确定" 后执行删除操作
                    users.value = users.value.filter(u => u.id !== row.id); // 根据 ID 删除用户
                    ElMessage.success('删除成功'); // 显示删除成功提示
                })
                .catch(() => {
                    // 用户点击 "取消" 后的处理，默认不做任何操作
                    ElMessage.info('取消删除');
                });
        };

        const handleSelectionChange = (rows) => {
            selectedRows.value = rows; // 选中行数据
        };

        const handleBatchDelete = () => {
            if (selectedRows.value.length === 0) {
                ElMessage.warning("请选择要删除的用户");
                return;
            }

            ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 个用户吗？`, "批量删除确认", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    users.value = users.value.filter(user =>
                        !selectedRows.value.some(selected => selected === user)
                    );
                    selectedRows.value = []; // 清空选中项
                    ElMessage.success("批量删除成功");
                })
                .catch(() => {
                    ElMessage.info("取消删除");
                });
        };

        const addressOptions = computed(() => {
            const uniqueAddresses = [...new Set(users.value
                .map(user => user.address?.trim()) // 去除空格
                .filter(address => address) // 过滤掉无效值
            )];
            return ["全部", ...uniqueAddresses]; // 手动添加 "全部"
        });

        const tableRowClassName = ({ rowIndex }) => rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
        // 计算平均年龄
        const averageAge = computed(() => {
            if (filteredData.value.length === 0) return 0;
            const totalAge = filteredData.value.reduce((sum, user) => sum + user.age, 0);
            return (totalAge / filteredData.value.length).toFixed(1);
        });

        return {
            filterForm,
            currentPage,
            pageSize,
            filteredData,
            paginatedData,
            addressOptions,
            averageAge,
            handleFilter,
            handlePageChange,
            handleSortChange,
            handleView,
            handleEdit,
            handleDelete,
            tableRowClassName,
            handleBatchDelete,
            handleSelectionChange,
        };
    },
};
</script>

<style scoped>
.content-container {
    flex : 1;
    border-radius: 20px; /* 设置圆角 */
    border: 1px solid #ddd; /* 可选，增加边框 */
    padding: 20px; /* 内边距 */
    background: #fff; /* 背景色 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 可选，增加阴影 */
}
.demo-form-inline {
    margin-bottom: 20px;
}

.even-row {
    background-color: #f9f9f9 !important;
}
.odd-row {
    background-color: #ffffff !important;
}

.el-table {
    border-radius: 10px;
    border: none; /* 避免内部边框影响视觉效果 */
}


.el-table {
    width: 100%; /* 表格宽度填充 */
    border-radius: 10px; /* 圆角 */
    overflow: hidden; /* 防止溢出 */
}

.el-table th, .el-table td {
    text-align: center; /* 文字居中 */
    vertical-align: middle; /* 让内容上下居中 */
    padding: 12px; /* 统一内边距 */
}

/* 让单数行和双数行背景颜色相间 */
.el-table .el-table__row:nth-child(odd) {
    background-color: #f9f9f9; /* 浅灰色 */
}

.el-table .el-table__row:nth-child(even) {
    background-color: #ffffff; /* 白色 */
}

/* 让列宽平均分配 */
.el-table-column {
    width: auto !important;
}

.statistics {
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
}

.table-container {
    display: flex;
    flex-direction: column;
    gap: 10px; /* 表格和按钮之间的间距 */
}

.button-group {
    display: flex;
    justify-content: flex-start; /* 按钮右对齐 */
    padding: 10px 0; /* 按钮与表格的间距 */
}
</style>
