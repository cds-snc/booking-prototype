const { routeUtils, getClientJs } = require('./../../utils')
const { Schema } = require('./schema.js')

module.exports = (app, route) => {
  const name = route.name

  route
    .draw(app)
    .get((req, res) => {
      //const js = getClientJs(req, name)
      //console.log('js', js)
      res.render(
        name,
        routeUtils.getViewData(req, { jsFiles: ["/dist/book.bundle.js"] }),
      )
    })
    .post(route.applySchema(Schema), route.doRedirect())
}
