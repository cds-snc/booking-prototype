// const bcrypt = require('bcrypt')
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });

const allUsers = [
    {email: "bob", password: "bob"},
    {email: "ted", password: "ted"},
]

const login = (req, res, next) => {
  const { email, password } = req.session.formdata
  allUsers.forEach(x => {
    if (email === x.email && password === x.password) {
      req.session.token = true
      req.session.profile = { email: email }
    }
  })
  next()
};

const checkAuth = (req, res, next) => {
    if (!req.session.token) {
        return res.redirect(res.locals.route.get("sign-in").url(req.locale))
    }
    next()
}

module.exports = {
  login: login,
  checkAuth: checkAuth,
}