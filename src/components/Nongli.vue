<template>
    <div>
        <h1>{{ year }} 年的农历节日倒计时</h1>
        <ul class="festivals-list">
            <li v-for="(festival, index) in lunarFestivals" :key="index" class="festival-item">
                <strong>{{ festival.name }}:</strong> {{ festival.countdown }}
            </li>
        </ul>
    </div>
</template>

<script>
const getCountdown = (targetDate) => {
    const now = new Date(); // 当前时间
    const festivalDate = new Date(targetDate); // 目标日期（2025年春节）

    // 计算倒计时
    const timeDiff = festivalDate - now;

    // 如果目标日期已经过去，则返回一个已过期的标记
    if (timeDiff < 0) {
        return "已过期";
    }

    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); // 剩余天数
    const hoursLeft = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)); // 剩余小时
    const minutesLeft = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60)); // 剩余分钟
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000); // 剩余秒数

    return `${daysLeft}天 ${hoursLeft}小时 ${minutesLeft}分钟 ${secondsLeft}秒`;
};

// 设置2025年春节的日期
const targetDate = "2025-02-29T00:00:00"; // 2025年春节：2月29日（假设2025年为闰年）
const countdown = getCountdown(targetDate);

console.log(countdown); // 输出倒计时

};

</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

ul.festivals-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
}

li.festival-item {
    width: 20%;
    padding: 10px;
    margin: 5px;
    background-color: #f0f0f0;
    b
