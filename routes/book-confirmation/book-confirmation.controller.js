const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      console.log("formdata", req.session.formdata)
      console.log("session", req.session)
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
