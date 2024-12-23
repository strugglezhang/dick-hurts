<template>
    <div class="countdown-container">
        <div class="countdown-card">
            <h1 class="title">下班倒计时</h1>
            <p class="time">{{ time }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CountDown',
    data() {
        return {
            time: ''  // 初始化时不设置任何值，避免显示 00 或加载状态
        }
    },
    mounted() {
        this.startCountdown();  // 页面加载时开始倒计时
    },
    methods: {
        startCountdown() {
            const targetTime = new Date().setHours(17, 30, 0, 0);  // 假设下班时间是17:30
            const updateTime = () => {
                const currentTime = new Date().getTime();
                const remainingTime = targetTime - currentTime;

                if (remainingTime <= 0) {
                    this.time = '下班啦！';  // 如果时间到，显示下班信息
                } else {
                    const hours = Math.floor(remainingTime / (1000 * 60 * 60));  // 计算剩余小时数
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));  // 计算剩余分钟数
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);  // 计算剩余秒数

                    // 格式化时间显示
                    this.time = `${hours}小时 ${minutes}分钟 ${seconds}秒`;
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
    height: 100vh;
    background: #f2f2f2;
    font-family: 'Arial', sans-serif;
}

/* Countdown Card Styling */
.countdown-card {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
    width: 400px;
    max-width: 100%;
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
