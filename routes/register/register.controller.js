const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

const registerUser = (req, res, next) => {
  // send data to db
  // req.session.formdata.fullname
  // req.session.formdata.email
  // req.session.formdata.password
  next()
}

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {

      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), registerUser, route.doRedirect())
}
