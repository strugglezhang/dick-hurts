<template>
    <div class="countdown-container">
        <!-- 第一排: 左侧和右侧的倒计时 -->
        <div class="row">
            <!-- 左侧倒计时 -->
            <div class="countdown-card">
                <h1 class="title">下班倒计时</h1>
                <p class="time">{{ workTime }}</p>
            </div>

            <!-- 右侧倒计时 -->
            <div class="countdown-card">
                <h1 class="title">过年倒计时</h1>
                <p class="time">{{ newYearTime }}</p>
            </div>
        </div>

        <!-- 第二排: 吃饭倒计时和睡觉倒计时 -->
        <div class="row">
            <!-- 左侧倒计时 -->
            <div class="countdown-card">
                <h1 class="title">吃饭倒计时</h1>
                <p class="time">{{ lunchTime }}</p>
            </div>

            <!-- 右侧倒计时 -->
            <div class="countdown-card">
                <h1 class="title">睡觉倒计时</h1>
                <p class="time">{{ sleepTime }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CountDown',
    data() {
        return {
            workTime: '',  // 下班倒计时
            newYearTime: '',  // 过年倒计时
            lunchTime: '',  // 吃饭倒计时
            sleepTime: '',  // 睡觉倒计时
        }
    },
    mounted() {
        this.startWorkCountdown();
        this.startNewYearCountdown();
        this.startLunchCountdown();
        this.startSleepCountdown();
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
            const newYearTime = new Date('2025-01-29T00:00:00').getTime();  // 过年时间设置为 2025年2月10日 00:00
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
            const targetTime = new Date().setHours(17, 40, 0, 0);  // 假设吃饭时间是12:30
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
        }
    }
}
</script>

<style scoped>
/* Container - Full screen centering */
.countdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background: #f2f2f2;
    font-family: 'Arial', sans-serif;
}

/* Row Styling */
.row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 20px 0;
}

/* Countdown Card Styling */
.countdown-card {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
    width: 530px;
    max-width: 100%;
    margin: 20px;
    animation: fadeIn 1s ease-in;
}

/* Title Styling */
.title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
}

/* Time Styling */
.time {
    font-size: 36px;
    font-weight: bold;
    color: #ff5722;
    margin: 20px 0;
    letter-spacing: 2px;
    transition: color 0.3s ease;
}

/* Time Message - Color change when it's time to leave */
.time[data-state="leave"] {
    color: #4caf50;
}

/* Animation for fading in */
@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
</style>
