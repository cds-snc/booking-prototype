const { routeUtils, checkAuth } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get(
      checkAuth, 
      (req, res) => {
        res.render(name, routeUtils.getViewData(req, {}))
      })
    .post(route.applySchema(Schema), route.doRedirect())
}
