/* istanbul ignore file */

const Schema = {
  email: {
    isLength: {
      errorMessage: 'errors.email.length',
      options: { min: 3, max: 200 },
    },
  },
}

module.exports = {
  Schema,
}
