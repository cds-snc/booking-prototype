const { routeUtils } = require('./../../utils')
const { Schema } = require('./schema.js')
// const bcrypt = require('bcrypt')
const passport = require("passport")
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });


const login = (req, res) => {
  console.log("signin 1")
  passport.authenticate('local', { failureRedirect: '/sign-in' })
  console.log("signin 2")
  res.redirect('admin');
}
module.exports = (app, route) => {
  const name = route.name

  route.draw(app)
    .get((req, res) => {
      res.render(name, routeUtils.getViewData(req, {}))
    })
    .post(route.applySchema(Schema), login)
}
