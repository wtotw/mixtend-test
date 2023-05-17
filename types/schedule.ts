interface WorkingHours {
  start: string,
  end: string,
}

interface Meeting {
  summary: string,
  start: string,
  end: string,
  timezone: string,
}

interface ScheduleResponse {
  working_hours: WorkingHours,
  meetings: {
    [key: string]: Meeting[]
  }
}

export {
  WorkingHours,
  Meeting,
  ScheduleResponse,
}