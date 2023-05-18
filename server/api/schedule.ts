import fs from 'fs';
import { ScheduleResponse } from "~/types/schedule";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const response = await $fetch<ScheduleResponse>('https://mixtend.github.io/schedule.json', {
    method: 'GET',
    query: query,
    headers: {
      'User-Agent': 'Mixtend Coding Test',
    },
  });

  // ログ出力
  console.log(response);
  fs.writeFile('logs/api.log', JSON.stringify(response, null, '  '), (err) => {
    if (err) {
      console.error(err);
    }
  });

  return response;
})
