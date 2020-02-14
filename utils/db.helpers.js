const { GraphQLClient } = require('graphql-request')

const addEventMutation = (obj) => {
    return `mutation MyMutation2 {
        __typename
        insert_events(objects: {user_id: "${obj.user_id}", available_days: "${obj.available_days}", daterange_days: "${obj.daterange_days}", duration_minutes: "${obj.duration_minutes}", end_hour: "${obj.end_hour}", event_description: "${obj.event_description}", event_location: "${obj.event_location}", event_name: "${obj.event_name}", start_hour: "${obj.start_hour}"}) {
          affected_rows
        }
      }`
}

const getEventsQuery = (userId) => {
    return `query MyQuery {
    events(where: {user_id: {_eq: ${userId}}}) {
      event_id
      event_name
      event_description
    }
  }`
}
const getEventsQuery2 = (eventId) => {
    return `query MyQuery {
    events(where: {event_id: {_eq: ${eventId}}}) {
      event_id
      event_name
      event_description
      event_location
      available_days
      duration_minutes
      daterange_days
      start_hour
      end_hour
    }
  }`
}
const addBookingMutation = (obj) => {
  return `mutation MyMutation3 {
    __typename
    insert_bookings(objects: {datetime: "${obj.datetime}", email: "${obj.email}", event_id: ${obj.event_id}, fullname: "${obj.fullname}"}) {
      affected_rows
    }
  }
  
  `;
}

  const client = new GraphQLClient(process.env.HASURA_ENDPOINT, {
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_SECRET,
    },
  })

  const dayDict = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
  }

  const addEvent = (req, res, next) => {
    const data = req.session.formdata

    const obj = {
        event_location: data.event_location,
        event_name: data.event_name,
        event_description: data.event_description,
        duration_minutes: +data.event_duration.split(" ")[0],
        daterange_days: +data.date_range.split(" ")[0],
        available_days: data.available_days_of_week.map(x => dayDict[x]).join(","),
        start_hour: +data.start_time.split(":")[0],
        end_hour: +data.end_time.split(":")[0],
        user_id: +req.session.profile.user_id,
    }

    client.request(addEventMutation(obj)).then(_data => {
    //   console.log(_data)
    })
    next()
  }

  const addBooking = (req, res, next) => {
    const obj = {
      datetime: req.session.formdata["date-time"],
      email: req.session.formdata["form.email"],
      event_id: req.session.eventData.event_id,
      fullname: req.session.formdata["form.fullname"],
    }

    client.request(addBookingMutation(obj)).then(_data => {
      console.log(_data)
    })
    next()
  }

module.exports = {
    addEvent: addEvent,
    client: client,
    getEventsQuery: getEventsQuery,
    getEventsQuery2: getEventsQuery2,
    addBooking: addBooking,
  }