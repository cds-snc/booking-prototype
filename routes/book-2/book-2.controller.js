const { routeUtils } = require('./../../utils')

const saveData = (req, res, next) => {
  // console.log("req.session.formdata", req.session.formdata)
  // save to db

  next()
}
module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema({}), saveData, route.doRedirect())
}
