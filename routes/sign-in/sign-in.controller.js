const { routeUtils, login } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name
  
  // redirect from "/" → "/start"
  app.get('/', (req, res) => res.redirect(route.path[req.locale]))

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
