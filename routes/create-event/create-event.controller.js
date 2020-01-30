const { routeUtils, addEvent } = require('./../../utils')
const { Schema } = require('./schema.js')

const stuff = (req, res, next) => {
  console.log("body",req.body)
  next()
}
module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(stuff, route.applySchema(Schema), addEvent, route.doRedirect("admin"))
}
