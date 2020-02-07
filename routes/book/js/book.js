const fetch = window.fetch
const origin = window.location.origin
let isBlockedDay;

const fetchItems = async () => {
  const eventId = 3
  const params = `?eventId=${eventId}`
  const response = await fetch(`${origin}/en/get-event${params}`)
  const result = await response.text()
  const _eventData = JSON.parse(result)
  const eventData = _eventData.events[0]
  console.log("eventData", eventData)

  isBlockedDay = (day, state) => {
    const availableDays = eventData.available_days.split(",").map(x => +x)
    if (state.firstAvailableDate > day) {
      return true;
    }
    if (availableDays && availableDays.indexOf(day.$W) === -1) {
      return true;
    }
  }
  setSchedulerOptions()
  window.renderCalendar("schedule-send-at")

}

fetchItems()

const populateTimes = (startHour, endHour, durationMinutes) => {
  const midnight = new Date('2018-01-01 00:00:00')
  const apptDuration = durationMinutes*60*1000 // ms
  const times = []
  let iter = midnight
  while (iter.getDate() === midnight.getDate()) {
    if (iter.getHours() >= startHour && iter.getHours() < endHour) {
      times.push(iter)
    }
    iter = new Date(iter.getTime() + apptDuration);
  }
  console.log(times)
  const timeOptions = times.map(x => {
    return {
      val: x.toLocaleTimeString("en-US", {hour12: false}),
      label: x.toLocaleTimeString("en-US", {hour12: true, hour: "numeric", minute: "2-digit"}),
    }
  })
  return timeOptions;
};

const setSchedulerOptions = () => {
  window.schedulerOptions = {
    init: data => {
      const { dayjs, defaultState } = data;

      const firstDay = dayjs("2020-02-15");
      const lastAvailableDate = dayjs(firstDay).add(3, "months");

      return {
        today: firstDay,
        firstAvailableDate: firstDay,
        lastAvailableDate: lastAvailableDate,
        date: dayjs(firstDay).format("YYYY-MM-DD"),
        time: "",
        time_values: populateTimes(9, 12, 30),
        isBlockedDay: isBlockedDay,
        selected: [dayjs(firstDay).format("YYYY-MM-DD")],
        focusedDayNum: dayjs(firstDay).format("D"),
        updateMessage: "",
        _24hr: "en",
        errors: "",
      };
    },
  };
}


