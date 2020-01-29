const { routeUtils, login } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(
      route.applySchema(Schema), 
      login,
      (req, res) => {res.redirect('admin')},
      )
}
