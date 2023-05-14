<script setup>
import fs from 'fs';
import { reactive } from 'vue';
import dayjs from 'dayjs';

import ScheduleView from '~/components/ScheduleView.vue';

const { $log } = useNuxtApp();

const state = reactive({
  workingHours: [],
  meetings: {},
});

const response = await useFetch('https://mixtend.github.io/schedule.json', {
  headers: {
    'User-Agent': 'Mixtend Coding Test',
  },
});
$log.debug(response)

const { data } = response;

if (data) {
  // workingHours
  const workingHours = data.value.working_hours;
  const startTime = dayjs().hour(workingHours.start.split(':')[0]).minute(workingHours.start.split(':')[1])
  const endTime = dayjs().hour(workingHours.end.split(':')[0]).minute(workingHours.end.split(':')[1])
  state.workingHours = [...Array(endTime.diff(startTime, 'hour') + 1).keys()].map(i => i + startTime.hour());

  // meetings
  state.meetings = data.value.meetings;
}

</script>

<template>
  <div>
    <ScheduleView :working-hours="state.workingHours" :meetings="state.meetings"></ScheduleView>
  </div>
</template>