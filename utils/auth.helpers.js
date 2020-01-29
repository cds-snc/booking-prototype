// const bcrypt = require('bcrypt')
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });
const { GraphQLClient } = require('graphql-request')

const queryEmail = (email) => {
  return `{
  users(where: {email: {_eq: "${email}"}}) {
    email
    fullname
    password
  }
}`
}

const client = new GraphQLClient(process.env.HASURA_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_SECRET,
  },
})

const login = (req, res, next) => {
  const { email, password } = req.session.formdata
  
  client.request(queryEmail(email)).then(data => {
    console.log(data)
    data.users.forEach(x => {
      if (email === x.email && password === x.password) {
        req.session.token = true
        req.session.profile = { email: email }
      }
    })
    next()
  })
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