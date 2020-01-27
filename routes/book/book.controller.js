const { routeUtils, getClientJs } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const js = getClientJs(req, name)
      res.render(name, routeUtils.getViewData(req, { jsFiles: js ? [js] : false }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
