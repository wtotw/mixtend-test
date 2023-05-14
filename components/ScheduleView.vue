<script setup>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

const SCHEDULE_HEIGHT = 80; // 1時間の高さ

const props = defineProps({
  workingHours: {
    type: Array,
    required: true,
  },
  meetings: {
    type: Object,
    required: true,
  },
});

const format = (date, format) => {
  return dayjs(date).format(format);
};

onMounted(() => {
  document.querySelectorAll('.meeting').forEach((meeting) => {
    // 横方向
    const index = meeting.dataset.index;
    const dayElement = document.querySelector(`.day--${index}`);
    meeting.style.left = `${dayElement.offsetLeft}px`;

    // 縦方向
    const item = JSON.parse(meeting.dataset.item);
    const startTime = dayjs().hour(item.start.split(':')[0]).minute(item.start.split(':')[1]);
    const endTime = dayjs().hour(item.end.split(':')[0]).minute(item.end.split(':')[1]);

    const startElement = document.querySelector(`.hour--${item.start.split(':')[0]}`);
    const startMinOffset = startTime.minute() === 0 ? 0 : SCHEDULE_HEIGHT * startTime.minute() / 60;
    meeting.style.top = `${startElement.offsetTop + startMinOffset}px`;

    // 高さ
    const diff = endTime.diff(startTime, 'minute');
    meeting.style.height = `${SCHEDULE_HEIGHT * diff / 60}px`;

    // 表示
    meeting.style.display = 'block';
  })
});
</script>

<template>
  <div class="contents">
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="day" :class="`day--${index}`" v-for="(_meeting, index) in meetings" :key="index">
            {{ format(index, 'M/D（dd）') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :class="`hour--${hour}`" v-for="hour of workingHours" :key="hour">
          <th class="hour" > {{ hour }}:00 </th>
          <td v-for="(_meeting, index) in meetings" :key="index"></td>
        </tr>
      </tbody>
    </table>

    <template v-for="(meeting, index) in meetings" :key="index">
      <div class="meeting" v-for="item of meeting" :key="item" :data-index="index" :data-item="JSON.stringify(item)">
        {{ item.summary }}
      </div>
    </template>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

table, th, td {
  border: 1px solid #d4d4d4;
  border-collapse: collapse;
}

.day {
  width: 200px;
  height: 50px;
}

.hour {
  width: 100px;
  height: 80px;
  vertical-align: top;
}

.contents {
  position: relative;
}

.meeting {
  display: none;
  position: absolute;
  padding: 5px;
  width: 200px;
  min-height: fit-content;
  background-color: #49b5a9;
  color: #fff;
  text-align: left;
}
</style>