const { routeUtils, getEventsQuery2, client, getClientJs } = require('./../../utils')
const jsonDB = require('../../db/db.json')

const doAnotherThing = (req, res, next) => {
  next()
}
module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const js = getClientJs(req, route.name)

      const eventId = +req.query.id

      if (!eventId) {
        res.render(name, routeUtils.getViewData(req, {}))
        return
      }
      
      if (process.env.NODE_ENV === "test") {
        const eventData = jsonDB.events.filter((evt) => {
          return evt.eventId === eventId
        })
        req.session.eventData = eventData
        res.render(name, routeUtils.getViewData(req, { eventData: eventData, jsFiles: js ? [js] : false }))
        return;
      }
  
      client.request(getEventsQuery2(eventId)).then(_eventData => {
        const eventData = _eventData.events[0]
        req.session.eventData = eventData
        res.render(name, routeUtils.getViewData(req, { eventData: eventData, jsFiles: js ? [js] : false }))
      })
    })
    .post(route.applySchema({}), doAnotherThing, route.doRedirect("book-2"))
}
