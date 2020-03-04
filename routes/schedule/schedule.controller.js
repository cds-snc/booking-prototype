const { routeUtils, checkAuth, client, getBookingsQuery } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get(
      checkAuth, 
      (req, res) => {
      const eventId = +req.query.id

      if (!eventId) {
        res.render(name, routeUtils.getViewData(req, {}))
        return
      }

      client.request(getBookingsQuery(eventId)).then(data => {
        const bookingsData = data.bookings
        const eventData = data.events_by_pk
        req.session.bookingsData = bookingsData
        bookingsData.forEach(x => {
          x.datetime_formatted = new Date(x.datetime).toLocaleString()
        })
        res.render(name, routeUtils.getViewData(req, { bookingsData: bookingsData, eventData: eventData }))
      })

    })
    .post(route.applySchema(Schema), route.doRedirect())
}
