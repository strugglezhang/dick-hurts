<template>
    <div class="countdown-container">
        <!-- 第一排: 显示倒计时 -->
        <div class="row">
            <div class="countdown-card" v-for="item in data" :key="item.id">
                <h1 class="title">{{ item.name }}</h1>
                <p class="time">{{ item.countdown }}</p>
                <p class="time">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.countdown-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background: #f2f2f2;
    font-family: 'Arial', sans-serif;
    min-height: 100vh;
    overflow: hidden;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    max-width: 1200px;
    gap: 10px;
    margin: 5px 0;
}

.countdown-card {
    background: #ffffff;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-align: center;
    width: calc(25% - 10px);
    min-width: 160px;
    min-height: 90px;
    animation: fadeIn 1s ease-in;
    overflow: hidden;
}

.title {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
    font-weight: bold;
}

.time {
    font-size: 18px;
    font-weight: bold;
    color: #ff5722;
    margin: 8px 0;
    letter-spacing: 0.5px;
}

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
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    name: 'CountDown',
    setup() {
        const data = ref([]); // 存储倒计时的数据
        const error = ref(null);

        // 格式化时间为“天:小时:分钟:秒”格式
        const formatTime = (timeInSeconds) => {
            const days = Math.floor(timeInSeconds / (24 * 3600)); // 计算天数
            const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600); // 计算小时
            const minutes = Math.floor((timeInSeconds % 3600) / 60); // 计算分钟
            const seconds = timeInSeconds % 60; // 计算秒数

            let timeString = '';
            if (days > 0) {
                timeString += `${days}天 `;
            }
            if (hours > 0) {
                timeString += `${hours}小时 `;
            }
            if (minutes > 0) {
                timeString += `${minutes}分钟 `;
            }
            timeString += `${seconds}秒`; // 秒数一定要显示

            return timeString;
        };

        // 计算从当前时间到每天指定的目标时间的倒计时
        const updateCountdown = (targetTime, item) => {
            const interval = setInterval(() => {
                const now = new Date();
                const targetDate = new Date(targetTime); // 转换目标时间为 Date 对象

                // 如果目标时间已经过去，则设定为第二天的目标时间
                if (now > targetDate) {
                    targetDate.setDate(targetDate.getDate() + 1); // 设置为第二天
                }

                const diff = targetDate - now; // 计算剩余时间

                if (diff <= 0) {
                    clearInterval(interval); // 倒计时结束，清除定时器
                    item.countdown = '倒计时结束'; // 显示倒计时结束
                    // 获取下一个倒计时目标时间并启动倒计时
                    startCountdown(item); // 重新启动倒计时
                } else {
                    item.countdown = formatTime(Math.floor(diff / 1000)); // 毫秒转换为秒并格式化
                }
            }, 1000); // 每秒更新一次
        };

        const startCountdown = (item) => {
            if (item.is_recurring === 0) {
                // is_recurring == 0: 直接以 target_time 作为结束时间
                const targetTime = item.target_time;
                updateCountdown(targetTime, item);
            } else if (item.is_recurring === 1) {
                // is_recurring == 1: 将一天平均分成 n 份
                const n = item.recurrence_interval; // 获取 n
                const currentTimeSlotStart = getCurrentTimeSlotStart(n); // 获取当前时间段的开始时间

                // 判断当前时间段是否已经过去，如果过去了则进入下一个时间段
                const now = new Date();
                if (currentTimeSlotStart <= now) {
                    // 当前时间段已过，跳转到下一个时间段
                    currentTimeSlotStart.setMinutes(currentTimeSlotStart.getMinutes() + (24 * 60 / n));
                }

                updateCountdown(currentTimeSlotStart, item); // 从当前时间段开始倒计时
            } else if (item.is_recurring === 2) {
                // is_recurring == 2: 每天固定时间倒计时
                const targetTime = new Date();
                const targetParts = item.target_time.split(":"); // 假设 target_time 是 "HH:mm" 格式
                targetTime.setHours(targetParts[0], targetParts[1], 0, 0); // 设置为目标时间（不指定日期）

                updateCountdown(targetTime, item); // 启动倒计时
            } else if (item.is_recurring === 3) {
                // is_recurring == 3: 每周固定时间倒计时
                const targetParts = item.target_time.split("_"); // "5_18:00" -> ["5", "18:00"]
                const targetDayOfWeek = parseInt(targetParts[0]); // 获取星期几（1-7，1为周一，7为周日）
                const targetTimeString = targetParts[1]; // 获取时间 "18:00"
                const timeParts = targetTimeString.split(":"); // 分割时间为小时和分钟

                const targetHour = parseInt(timeParts[0]);
                const targetMinute = parseInt(timeParts[1]);

                // 获取当前时间并计算距离下一个目标时间的倒计时
                const now = new Date();
                let targetDate = new Date(now);

                // 计算目标日期：首先判断目标星期几的时间是否已经过去，如果过去了则设置为下周的同一时间
                const daysUntilTarget = (targetDayOfWeek - now.getDay() + 7) % 7;
                targetDate.setDate(now.getDate() + daysUntilTarget); // 设置为目标星期几
                targetDate.setHours(targetHour, targetMinute, 0, 0); // 设置为目标时间

                // 如果目标时间已经过去（例如今天的目标时间已经过了），则将目标时间设为下周
                if (now > targetDate) {
                    targetDate.setDate(targetDate.getDate() + 7); // 设置为下周同一时间
                }

                updateCountdown(targetDate, item); // 启动倒计时
            } else if (item.is_recurring === 4) {
                // is_recurring == 4: 每月指定日期和时间倒计时 (例如每月20日18:00)
                const targetParts = item.target_time.split("_");
                const targetDayOfMonth = parseInt(targetParts[0]); // 获取每月的日期
                const targetTimeString = targetParts[1]; // 获取时间 "18:00"
                const timeParts = targetTimeString.split(":"); // 分割时间为小时和分钟

                const targetHour = parseInt(timeParts[0]);
                const targetMinute = parseInt(timeParts[1]);

                // 获取当前时间并计算下一个目标时间（每月指定日期和时间）
                const now = new Date();
                let targetDate = new Date(now);

                // 如果目标日期是31号，并且当前月份没有31号，则将目标日期设置为本月的最后一天
                if (targetDayOfMonth === 31) {
                    targetDate.setMonth(targetDate.getMonth(), 1); // 将目标日期调整为本月的1号
                    const lastDayOfCurrentMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0); // 获取本月最后一天
                    targetDate.setDate(lastDayOfCurrentMonth.getDate()); // 设置为本月最后一天
                } else {
                    targetDate.setDate(targetDayOfMonth); // 设置为目标日期
                }

                // 设置目标时间
                targetDate.setHours(targetHour, targetMinute, 0, 0); // 设置目标时间（时：分：秒）

                // 如果目标时间已经过去（例如今天的目标时间已经过了），则将目标时间设为下个月
                if (now > targetDate) {
                    targetDate.setMonth(targetDate.getMonth() + 1); // 设置为下个月同一时间
                }

                updateCountdown(targetDate, item); // 启动倒计时
        } else if (item.is_recurring === 5) {
                // is_recurring == 5: 每年固定日期和时间倒计时
                const targetParts = item.target_time.split("_"); // "1-21_18:40" -> ["1-21", "18:40"]
                const targetDateString = targetParts[0]; // 获取每年的目标日期 "1-21"
                const targetTimeString = targetParts[1]; // 获取时间 "18:40"
                const timeParts = targetTimeString.split(":"); // 分割时间为小时和分钟

                const timeTarget = targetDateString.split("-"); // 分割为月日
                const targetMonth = parseInt(timeTarget[0]); // 获取目标月份
                const targetDay = parseInt(timeTarget[1]); // 获取目标日期

                const targetHour = parseInt(timeParts[0]);
                const targetMinute = parseInt(timeParts[1]);

                const now = new Date();
                let targetDate = new Date(now);

                // 设置目标时间为每年的指定日期和时间
                targetDate.setMonth(targetMonth - 1, targetDay); // 设置为目标月份和日期（月份从0开始）
                targetDate.setHours(targetHour, targetMinute, 0, 0); // 设置为目标时间

                // 如果目标时间已经过去（例如今年的目标时间已经过了），则将目标时间设为明年
                if (now > targetDate) {
                    targetDate.setFullYear(targetDate.getFullYear() + 1); // 设置为明年
                }

                updateCountdown(targetDate, item); // 启动倒计时
            }else if (item.is_recurring === 6) {
                // is_recurring == 6: 每月第一天的指定时间倒计时
                const targetTimeString = item.target_time; // 假设 target_time 是 "HH:mm" 格式
                const timeParts = targetTimeString.split(":"); // 分割时间为小时和分钟
                const targetHour = parseInt(timeParts[0]);
                const targetMinute = parseInt(timeParts[1]);

                // 获取当前时间并计算下一个目标时间（每月的第一天）
                const now = new Date();
                let targetDate = new Date(now);

                // 设置为每月第一天
                targetDate.setDate(1); // 设置为每月的第一天
                targetDate.setHours(targetHour, targetMinute, 0, 0); // 设置目标时间

                // 如果当前日期已经过了该时间，则设置为下个月的同一时间
                if (now > targetDate) {
                    targetDate.setMonth(targetDate.getMonth() + 1); // 设置为下个月
                }

                updateCountdown(targetDate, item); // 启动倒计时
            }else if (item.is_recurring === 7) {
                // is_recurring == 7: 每月最后一天倒计时
                const targetTimeString = item.target_time; // 获取时间 "18:40"
                const timeParts = targetTimeString.split(":"); // 分割时间为小时和分钟

                const targetHour = parseInt(timeParts[0]);
                const targetMinute = parseInt(timeParts[1]);

                const now = new Date();
                let targetDate = new Date(now);

                // 设置目标日期为当前月的最后一天
                targetDate.setMonth(now.getMonth() + 1, 0); // 设置为下个月的最后一天
                targetDate.setHours(targetHour, targetMinute, 0, 0); // 设置为目标时间

                // 如果目标时间已经过去（例如今天的目标时间已经过了），则将目标时间设为下个月
                if (now > targetDate) {
                    targetDate.setMonth(targetDate.getMonth() + 1); // 设置为下个月同一时间
                    targetDate.setDate(0); // 设置为下个月的最后一天
                }

                updateCountdown(targetDate, item); // 启动倒计时
            }
        };


        // 计算当前时间属于哪一份时间段
        const getCurrentTimeSlotStart = (n) => {
            const currentTime = new Date();
            const totalMinutesInDay = 24 * 60; // 一天的总分钟数
            const slotDuration = totalMinutesInDay / n; // 每个时间段的持续时间，单位为分钟

            const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes(); // 当前时间的分钟数
            const slotIndex = Math.floor(totalMinutes / slotDuration); // 计算当前时间属于哪一份
            const slotStartMinutes = slotIndex * slotDuration; // 当前时间段的开始时间

            const slotStartHour = Math.floor(slotStartMinutes / 60);
            const slotStartMinute = slotStartMinutes % 60;

            const slotStartDate = new Date();
            slotStartDate.setHours(slotStartHour, slotStartMinute, 0, 0); // 设置时间段的开始时间
            return slotStartDate;
        };

        // 获取数据并根据规则启动倒计时
        onMounted(async () => {
            try {
                const response = await axios.get('http://127.0.0.1:10086/countdown/list');
                data.value = response.data.data; // 获取接口返回的结果

                // 为每个倒计时项启动倒计时
                data.value.forEach((item) => {
                    item.countdown = ''; // 初始化倒计时显示为空
                    startCountdown(item); // 启动倒计时
                });
            } catch (err) {
                error.value = err.message;
            }
        });

        return {
            data,
            error
        };
    }
};

</script>
