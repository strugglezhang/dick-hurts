<template>
    <div class="countdown-container">
        <!-- 第一排: 显示四个倒计时 -->
        <div class="row">
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">午饭倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">晚饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
        <div class="row">
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">午饭倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">晚饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
        <div class="row">
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">午饭倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">晚饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
        <div class="row">
            <div class="countdown-card">
                <h1 class="title">下班倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">吃饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
        <div class="row">
            <div class="countdown-card">
                <h1 class="title">下班倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">吃饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
        <div class="row">
            <div class="countdown-card">
                <h1 class="title">下班倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">吃饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
        <div class="row">
            <div class="countdown-card">
                <h1 class="title">下班倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">吃饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 容器样式 - 确保动态扩展 */
.countdown-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px; /* 减少内边距 */
    background: #f2f2f2;
    font-family: 'Arial', sans-serif;
    min-height: 100vh; /* 确保容器占满视窗 */
    overflow: hidden; /* 禁用滚动条 */
}

/* 每排样式 */
.row {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    justify-content: flex-start; /* 卡片靠左对齐 */
    width: 100%;
    max-width: 1200px;
    gap: 10px; /* 减少卡片间距 */
    margin: 5px 0;
}

/* 倒计时卡片样式 */
.countdown-card {
    background: #ffffff;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 减少阴影的视觉占比 */
    padding: 15px; /* 减少卡片内边距 */
    text-align: center;
    width: calc(25% - 10px); /* 确保每排最多显示四个卡片 */
    min-width: 160px; /* 调整卡片宽度 */
    min-height: 90px; /* 减小卡片高度 */
    animation: fadeIn 1s ease-in;
    overflow: hidden; /* 防止内容溢出 */
}

/* 标题样式 */
.title {
    font-size: 16px; /* 缩小字体 */
    color: #333;
    margin-bottom: 8px;
    font-weight: bold;
    white-space: nowrap; /* 防止标题换行 */
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 时间样式 */
.time {
    font-size: 18px; /* 缩小字体 */
    font-weight: bold;
    color: #ff5722;
    margin: 8px 0;
    letter-spacing: 0.5px; /* 缩小字符间距 */
}

/* 动画效果 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>

<script>
export default {
    name: 'CountDown',
    data() {
        return {
            workTime: '',  // 下班倒计时
            newYearTime: '',  // 过年倒计时
            lunchTime: '',  // 吃饭倒计时
            sleepTime: '',  // 睡觉倒计时
            weather: '',  // 天气预报
            formattedTime: '',  // 拉屎倒计时
            countdownTime: 7200000,  // 2小时的倒计时（以毫秒为单位）
        }
    },
    mounted() {
        this.startWorkCountdown();
        this.startNewYearCountdown();
        this.startLunchCountdown();
        this.startSleepCountdown();
        this.startPoopCountdown();  // 初始化拉屎倒计时
    },
    methods: {
        // 下班倒计时
        startWorkCountdown() {
            const targetTime = new Date().setHours(17, 30, 0, 0);  // 假设下班时间是17:30
            const updateTime = () => {
                const currentTime = new Date().getTime();
                const remainingTime = targetTime - currentTime;

                if (remainingTime <= 0) {
                    this.workTime = '下班啦！';  // 如果时间到，显示下班信息
                } else {
                    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    this.workTime = `${hours}小时 ${minutes}分钟 ${seconds}秒`;
                }
            };

            updateTime();  // 立即计算并显示初始时间
            setInterval(updateTime, 1000);  // 每秒更新倒计时
        },

        // 过年倒计时
        startNewYearCountdown() {
            const newYearTime = new Date('2025-01-29T00:00:00').getTime();  // 过年时间设置为 2025年1月29日
            const updateNewYearTime = () => {
                const currentTime = new Date().getTime();
                const remainingTime = newYearTime - currentTime;

                if (remainingTime <= 0) {
                    this.newYearTime = '过年啦！';
                } else {
                    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    this.newYearTime = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
                }
            };

            updateNewYearTime();  // 立即计算并显示初始时间
            setInterval(updateNewYearTime, 1000);  // 每秒更新倒计时
        },

        // 吃饭倒计时
        startLunchCountdown() {
            const targetTime = new Date().setHours(12, 30, 0, 0);  // 假设吃饭时间是12:30
            const updateTime = () => {
                const currentTime = new Date().getTime();
                const remainingTime = targetTime - currentTime;

                if (remainingTime <= 0) {
                    this.lunchTime = '吃饭啦！';  // 如果时间到，显示吃饭信息
                } else {
                    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    this.lunchTime = `${hours}小时 ${minutes}分钟 ${seconds}秒`;
                }
            };

            updateTime();  // 立即计算并显示初始时间
            setInterval(updateTime, 1000);  // 每秒更新倒计时
        },

        // 睡觉倒计时
        startSleepCountdown() {
            const targetTime = new Date().setHours(22, 30, 0, 0);  // 假设睡觉时间是22:30
            const updateTime = () => {
                const currentTime = new Date().getTime();
                const remainingTime = targetTime - currentTime;

                if (remainingTime <= 0) {
                    this.sleepTime = '睡觉啦！';  // 如果时间到，显示睡觉信息
                } else {
                    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    this.sleepTime = `${hours}小时 ${minutes}分钟 ${seconds}秒`;
                }
            };

            updateTime();  // 立即计算并显示初始时间
            setInterval(updateTime, 1000);  // 每秒更新倒计时
        },

        getNextPoopTime() {
            const now = new Date();
            const currentHour = now.getHours();
            const nextHour = Math.ceil(currentHour / 2) * 2;  // 找到下一个2小时区间的开始时间

            // 如果当前已经在2小时区间内，设置为当前时间
            let nextTime = new Date();
            if (nextHour <= currentHour) {
                nextTime.setHours(nextHour + 2, 0, 0, 0);  // 设置为下一个区间的开始时间
            } else {
                nextTime.setHours(nextHour, 0, 0, 0);  // 设置为下一个2小时区间的开始时间
            }

            // 计算到达下一个2小时点的时间差
            const timeDiff = nextTime.getTime() - now.getTime();
            return timeDiff;  // 返回时间差
        },
        // 更新倒计时
        startPoopCountdown() {
            this.countdownTime = this.getNextPoopTime();  // 获取下一个2小时区间的倒计时

            // 每秒更新倒计时
            const updatePoopTime = () => {
                if (this.countdownTime > 0) {
                    const hours = Math.floor(this.countdownTime / (1000 * 60 * 60));
                    const minutes = Math.floor((this.countdownTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((this.countdownTime % (1000 * 60)) / 1000);
                    this.formattedTime = `${hours}小时 ${minutes}分钟 ${seconds}秒`;

                    this.countdownTime -= 1000;  // 每秒递减
                } else {
                    this.formattedTime = "该拉屎啦！";  // 倒计时结束
                }
            };

            updatePoopTime();  // 立即计算并显示初始时间
            setInterval(updatePoopTime, 1000);  // 每秒更新倒计时
        },
    }
}
</script>
