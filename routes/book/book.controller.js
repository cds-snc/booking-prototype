const { routeUtils, getEventsQuery2, client, getClientJs } = require('./../../utils')
const { Schema } = require('./schema.js')

const getBlockedDays = (availableDays) => {
  // availableDays like [1,2,5] 
  const blockedDays = [0,1,2,3,4,5,6]
  availableDays.split(",").forEach(x => {
    const i = blockedDays.indexOf(+x)
    if(i > -1) {
      blockedDays.splice(i, 1)
    }
  })
  return blockedDays
}
module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const js = getClientJs(req, route.name)

      const eventId = +req.query.id
      console.log("eventId", eventId)

      if (!eventId) {
        res.render(name, routeUtils.getViewData(req, {}))
      }
      client.request(getEventsQuery2(eventId)).then(_eventData => {
        const eventData = _eventData.events[0]
        // console.log("eventData", eventData)

        // eventData
        // const blockedDays = getBlockedDays("1,3,4")
        const blockedDays = getBlockedDays(eventData.available_days)
        res.render(name, routeUtils.getViewData(req, { eventData: eventData, blockedDays: blockedDays, jsFiles: js ? [js] : false }))
      })
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
