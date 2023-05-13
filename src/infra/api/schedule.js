class ScheduleApi {
  get() {
    return fetch('https://mixtend.github.io/schedule.json', {
      headers: {
        'User-Agent': 'Mixtend Coding Test',
      },
    });
  }
}

export default ScheduleApi;