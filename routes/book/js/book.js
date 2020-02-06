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