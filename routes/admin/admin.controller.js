const { routeUtils, checkAuth } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get(
      checkAuth, 
      (req, res) => {
        console.log(req.session.profile)
        res.render(name, routeUtils.getViewData(req, {email: req.session.formdata.email}))
      })
    .post(route.applySchema(Schema), route.doRedirect())
}
