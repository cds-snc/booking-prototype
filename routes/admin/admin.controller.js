const { routeUtils, checkAuth, getEventsQuery, client } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get(
      checkAuth, 
      (req, res) => {
        client.request(getEventsQuery(req.session.profile.user_id)).then(eventData => {
          res.render(name, routeUtils.getViewData(req, {email: req.session.formdata.email, eventData: eventData.events}))
        })
      })
    .post(route.applySchema(Schema), route.doRedirect())
}
