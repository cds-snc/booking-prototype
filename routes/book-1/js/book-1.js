const fetch = window.fetch
const origin = window.location.origin

const fetchItems = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  const params = `?eventId=${eventId}`
  const response = await fetch(`${origin}/en/get-event${params}`)
  const result = await response.text()
  const _eventData = JSON.parse(result)
  const eventData = _eventData.events[0]
  console.log("eventData", eventData)
  setSchedulerOptions(eventData)
  window.renderCalendar("schedule-send-at")
}

fetchItems()

const getIsBlockedDay = (eventData) => {
  return (day, state) => {
    const today = new Date()
    const availableDays = eventData.available_days.split(",").map(x => +x)
    if (today > day) {
      return true;
    }
    if (availableDays && availableDays.indexOf(day.$W) === -1) {
      return true;
    }
    return false;
  }
}
const populateTimes = (startHour, endHour, durationMinutes) => {
  const midnight = new Date('2018-01-01 00:00:00') // date doesn't matter
  const apptDuration = durationMinutes*60*1000 // ms
  const times = []
  let iter = midnight
  while (iter.getDate() === midnight.getDate()) {
    if (iter.getHours() >= startHour && iter.getHours() < endHour) {
      times.push(iter)
    }
    iter = new Date(iter.getTime() + apptDuration);
  }
  const timeOptions = times.map(x => {
    return {
      val: x.toLocaleTimeString("en-US", {hour12: false}),
      label: x.toLocaleTimeString("en-US", {hour12: true, hour: "numeric", minute: "2-digit"}),
    }
  })
  return timeOptions;
};

const setSchedulerOptions = (eventData) => {
  window.schedulerOptions = {
    init: data => {
      const { dayjs, defaultState } = data;
      const { start_hour, end_hour, duration_minutes, daterange_days } = eventData
      const today = new Date()
      let firstDay = new Date()
      const isBlockedDay = getIsBlockedDay(eventData)
      const oneDay = 24*60*60*1000
      while (isBlockedDay(dayjs(firstDay), {})) {
        firstDay = new Date(firstDay.getTime() + oneDay)
      }
      const lastAvailableDate = dayjs(today).add(daterange_days, "days");
      return {
        today: dayjs(today),
        firstAvailableDate: dayjs(firstDay),
        lastAvailableDate: lastAvailableDate,
        date: dayjs(firstDay).format("YYYY-MM-DD"),
        time: "",
        time_values: populateTimes(start_hour, end_hour, duration_minutes),
        isBlockedDay: isBlockedDay,
        selected: [dayjs(firstDay).format("YYYY-MM-DD")],
        focusedDayNum: dayjs(firstDay).format("D"),
        updateMessage: "",
        _24hr: "en",
        errors: "",
        hiddenValueRef: document.getElementById("hidden-value"),
      };
    },
  };
}


