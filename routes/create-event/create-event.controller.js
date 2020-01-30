const { routeUtils, addEvent, checkAuth } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get(checkAuth,
      (req, res) => {
        res.render(name, routeUtils.getViewData(req, {email: req.session.profile.email}))
      })
    .post(route.applySchema(Schema), addEvent, route.doRedirect("admin"))
}
