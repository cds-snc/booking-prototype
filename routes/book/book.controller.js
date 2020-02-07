const { routeUtils, getEventsQuery2, client, getClientJs } = require('./../../utils')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const js = getClientJs(req, route.name)

      const eventId = +req.query.id

      if (!eventId) {
        res.render(name, routeUtils.getViewData(req, {}))
      }
      client.request(getEventsQuery2(eventId)).then(_eventData => {
        const eventData = _eventData.events[0]
        res.render(name, routeUtils.getViewData(req, { eventData: eventData, jsFiles: js ? [js] : false }))
      })
    })
    .post(route.applySchema({}), route.doRedirect("book-2"))
}
