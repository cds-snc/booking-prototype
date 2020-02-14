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
      }

      client.request(getBookingsQuery(eventId)).then(_bookingsData => {
        const bookingsData = _bookingsData.bookings
        req.session.bookingsData = bookingsData
        bookingsData.forEach(x => {
          x.datetime_formatted = new Date(x.datetime).toLocaleString()
        })
        res.render(name, routeUtils.getViewData(req, { bookingsData: bookingsData }))
      })

    })
    .post(route.applySchema(Schema), route.doRedirect())
}
