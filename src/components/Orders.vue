<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default {
    name: 'ECharts',
    setup() {
        const chart = ref(null);

        const initChart = () => {
            const myChart = echarts.init(chart.value);

            // 配置图表的选项
            const option = {
                title: {
                    text: '倒计时统计图'
                },
                tooltip: {},
                legend: {
                    data: ['每天倒计时数']
                },
                xAxis: {
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {},
                series: [
                    {
                        name: '倒计时',
                        type: 'bar',  // 使用条形图
                        data: [5, 20, 36, 10, 10, 20, 30]
                    }
                ]
            };

            // 使用指定的配置项和数据显示图表
            myChart.setOption(option);
        };

        onMounted(() => {
            initChart();
        });

        return {
            chart
        };
    }
};
</script>

<style scoped>
/* 可以在这里自定义样式 */
</style>
