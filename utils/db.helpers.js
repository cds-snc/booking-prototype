const { GraphQLClient } = require('graphql-request')

const addEventMutation = (obj) => {
    return `mutation MyMutation2 {
        __typename
        insert_events(objects: {user_id: "${obj.user_id}", available_days: "${obj.available_days}", daterange_days: "${obj.daterange_days}", duration_minutes: "${obj.duration_minutes}", end_hour: "${obj.end_hour}", event_description: "${obj.event_description}", event_location: "${obj.event_location}", event_name: "${obj.event_name}", start_hour: "${obj.start_hour}"}) {
          affected_rows
        }
      }`
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

    // if(date.event_duration)
    // console.log("obj", obj)

    client.request(addEventMutation(obj)).then(_data => {
    //   console.log(_data)
    })
    next()
  }

module.exports = {
    addEvent: addEvent,
  }