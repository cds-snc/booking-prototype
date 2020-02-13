const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      const dateTime = new Date(req.session.formdata["date-time"])

      const data = {
        date: dateTime.toLocaleDateString("en-US", { dateStyle: "long" }),
        time: dateTime.toLocaleTimeString("en-US", { timeStyle: "full" }),
        fullname: req.session.formdata["form.fullname"],
        email: req.session.formdata["form.email"],
      }
      res.render(name, routeUtils.getViewData(req, { data: data, eventData: req.session.eventData }))
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
