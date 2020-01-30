/* istanbul ignore file */

const Schema = {
  event_name: {
    isLength: {
      errorMessage: 'errors.event_name.length',
      options: { min: 3, max: 200 },
    },
  },
  event_duration: {
    isLength: {
      errorMessage: 'errors.event_duration.length',
      options: { min: 1, max: 200 },
    },
  },
  date_range: {
    isLength: {
      errorMessage: 'errors.date_range.length',
      options: { min: 1, max: 200 },
    },
  },
  available_days_of_week: {
    isLength: {
      errorMessage: 'errors.available_days_of_week.length',
      options: { min: 1, max: 200 },
    },
  },
}

module.exports = {
  Schema,
}
