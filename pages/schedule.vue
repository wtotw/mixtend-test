<script setup lang="ts">
import fs from 'fs';
import { reactive } from 'vue';
import dayjs from 'dayjs';

import ScheduleView from '~/components/ScheduleView.vue';
import { Meeting, ScheduleResponse } from '~/types/schedule';

const state = reactive({
  workingHours: [] as number[],
  meetings: {} as { [key: string]: Meeting[] },
});

// APIリクエスト
const response = await useFetch<ScheduleResponse>('/api/schedule');
const { data } = response;

if (data.value) {
  // workingHours
  const workingHours = data.value.working_hours;
  const startTime = dayjs().hour(parseInt(workingHours.start.split(':')[0])).minute(parseInt(workingHours.start.split(':')[1]));
  const endTime = dayjs().hour(parseInt(workingHours.end.split(':')[0])).minute(parseInt(workingHours.end.split(':')[1]));
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