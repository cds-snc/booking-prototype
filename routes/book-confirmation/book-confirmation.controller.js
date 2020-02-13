const { routeUtils } = require('./../../utils')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      // console.log("formdata", req.session.formdata)
      // console.log("session", req.session)
      res.render(name, routeUtils.getViewData(req, {}))
    })
}
