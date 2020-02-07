// your js code here
// eventData.availableDaysParsed = eventData.available_days.split(",").map(x => +x)

// window.scheduleData = { 
//     "blockedDays": [1,3,4], 
//     "dateRange": 80, 
//     "availableTimes": [
//       {val: "16:00", label: "4:00 PM"},
//       {val: "17:00", label: "5:00 PM"},
//     ],
//   }

const fetch = window.fetch
const origin = window.location.origin

const fetchItems = async () => {
  const eventId = 3
  const params = `?eventId=${eventId}`
  const response = await fetch(`${origin}/en/get-event${params}`)
  const result = await response.text()
  console.log(result)
}

fetchItems()

const populateTimes = () => {
  return [
    { val: "1:00", label: "1:00 AM" },
    { val: "2:00", label: "2:00 AM" },
    { val: "3:00", label: "3:00 AM" },
  ];
};
window.isBlockedDay = day => {
  const data = {
    blockedDays: [1, 3, 4],
    dateRange: 80,
    availableTimes: [
      { val: "16:00", label: "4:00 PM" },
      { val: "17:00", label: "5:00 PM" }
    ],
  };

  if (data.blockedDays && data.blockedDays.indexOf(day.$W) > -1) {
    return true;
  }
}


window.schedulerOptions = {
  init: data => {
    const { dayjs, defaultState } = data;

    const firstDay = dayjs("2020-02-15");
    lastAvailableDate = dayjs(firstDay).add(3, "months");

    return {
      today: firstDay,
      firstAvailableDate: firstDay,
      lastAvailableDate: lastAvailableDate,
      date: dayjs(firstDay).format("YYYY-MM-DD"),
      time: "",
      time_values: populateTimes(),
      selected: [dayjs(firstDay).format("YYYY-MM-DD")],
      focusedDayNum: dayjs(firstDay).format("D"),
      updateMessage: "",
      _24hr: "en",
      errors: ""
    };
  },
  isBlockedDay: day => {
    return window.isBlockedDay()
  },
};

window.renderCalendar("schedule-send-at")
