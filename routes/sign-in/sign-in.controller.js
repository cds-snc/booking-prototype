const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')
// const bcrypt = require('bcrypt')
const passport = require("passport")
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });


const login = (req, res) => {
  passport.authenticate('local', { failureRedirect: '/sign-in' })
  res.redirect('/');
}
module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), login)
}
