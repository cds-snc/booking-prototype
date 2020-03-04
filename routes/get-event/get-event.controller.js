const { client, getEventsQuery2 } = require('./../../utils')

module.exports = (app, route) => {

  route.draw(app)
    .get((req, res) => {
      let eventId
      if(req.query.eventId) {
        eventId = req.query.eventId
        // do the query
        client.request(getEventsQuery2(eventId)).then(data => {
          res.json(data)
        })
      } else {
        res.json({})
      }
    })
}
