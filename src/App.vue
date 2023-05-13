<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import ScheduleApi from './infra/api/schedule';
import Schedule from './components/Schedule.vue';

dayjs.locale('ja');

export default {
  data() {
    return {
      workingHours: [],
      meetings: {},
    }
  },
  components: {
    Schedule,
  },
  async created() {
    const api = new ScheduleApi();
    const res = await api.get();

    if (res.status !== 200) {
      return;
    }

    const data = await res.json();

    // workingHours
    const workingHours = data.working_hours;
    const startTime = dayjs().hour(workingHours.start.split(':')[0]).minute(workingHours.start.split(':')[1])
    const endTime = dayjs().hour(workingHours.end.split(':')[0]).minute(workingHours.end.split(':')[1])
    this.workingHours = [...Array(endTime.diff(startTime, 'hour') + 1).keys()].map(i => i + startTime.hour());

    // meetings
    this.meetings = data.meetings;
  },
}
</script>

<template>
  <Schedule :working-hours="workingHours" :meetings="meetings"></Schedule>
</template>