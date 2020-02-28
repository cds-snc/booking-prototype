const request = require('supertest')
const app = require('../../app.js')
// const cheerio = require('cheerio')

test('Can send get request get-event route with params', async () => {
  const route = app.routes.get('get-event')
  const response = await request(app).get(route.path.en + "?eventId=10")
  expect(response.statusCode).toBe(200)
})