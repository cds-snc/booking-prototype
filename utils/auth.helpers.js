const bcrypt = require('bcrypt')
const { GraphQLClient } = require('graphql-request')

const queryEmail = (email) => {
  return `{
  users(where: {email: {_eq: "${email}"}}) {
    user_id
    email
    fullname
    password
  }
}`
}

const addUserMutation = (email, fullname, password) => {
  return `mutation addUser {
    __typename
    insert_users(objects: {email: "${email}", fullname: "${fullname}", password: "${password}"}) {
      affected_rows
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

  if (process.env.NODE_ENV === "test") {
    // mock login for local testing
    const testUser = {
      email: "test@user.com",
      password: "CorrectPassword",
    }
    if (email === testUser.email && password === testUser.password) {
      req.session.token = true
      req.session.profile = {
        user_id: 1,
        fullname: "Test User",
        email: email,
      }
      next()
    }
  } else {
    client.request(queryEmail(email)).then(data => {
      data.users.forEach(x => {
        if (email === x.email && bcrypt.compareSync(password, x.password)) {
          req.session.token = true
          req.session.profile = { 
            user_id: x.user_id, 
            fullname: x.fullname,
            email: x.email,
          }
        }
      })
      next()
    })
  }
};

const addUser = (req, res, next) => {
  const { email, password, fullname } = req.session.formdata
  const hash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
  client.request(addUserMutation(email, fullname, hash)).then(data => {
    next()
  })
}

const checkAuth = (req, res, next) => {
    if (!req.session.token) {
      return res.redirect(res.locals.route.get("sign-in").url(req.locale))
    }
    next()
}

module.exports = {
  login: login,
  addUser: addUser,
  checkAuth: checkAuth,
}