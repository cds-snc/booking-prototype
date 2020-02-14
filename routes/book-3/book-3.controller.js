const { routeUtils, addBooking, sendNotification } = require('./../../utils')

const sendConfirmationEmail = (req, res, next) => {
  const data = getData(req)
  const options = { 
    personalisation: {
      "first name": data.fullname,
      date: data.date,
      "start time": data.startTime,
      "end time": data.endTime,
      location: "a made up location",
  }}
  sendNotification({
    email: data.email, 
    templateId: process.env.ATTENDEE_CONFIRMATION_EMAIL_ID, 
    options: options,
  })
  next()
}

const getData = req => {
  const dateTime = new Date(req.session.formdata["date-time"])
  const eventData = req.session.eventData
  const eventDurationMS = eventData.duration_minutes*60*1000
  const endDateTime = new Date(dateTime.getTime() + eventDurationMS)

  return {
    date: dateTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: 'numeric', year: "numeric" }),
    startTime: dateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    endTime: endDateTime.toLocaleTimeString("en-US", {  hour: "numeric", minute: "2-digit" }),
    fullname: req.session.formdata["form.fullname"],
    email: req.session.formdata["form.email"],

  }
}

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, { data: getData(req), eventData: req.session.eventData }))
    })
    .post(
      addBooking, 
      sendConfirmationEmail,
      route.doRedirect(),
      )
}
