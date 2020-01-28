/* istanbul ignore file */

const Schema = {
  fullname: {
    isLength: {
      errorMessage: 'errors.fullname.length',
      options: { min: 3, max: 200 },
    },
  },
  password: {
    isLength: {
      errorMessage: 'errors.password.length',
      options: { min: 8, max: 200 },
    },
  },
}

module.exports = {
  Schema,
}
