const { routeUtils, getEventsQuery2, client } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const eventId = +req.query.id
      console.log("eventId", eventId)

      if (!eventId) {
        res.render(name, routeUtils.getViewData(req, {}))
      }
      client.request(getEventsQuery2(eventId)).then(eventData => {
        console.log("eventData", eventData)

        res.render(name, routeUtils.getViewData(req, { eventData: eventData.events[0] }))
      })
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
