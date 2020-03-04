const request = require('supertest')
const app = require('../../app.js')

test('It redirects to the login screen if user is not logged in', async () => {
  const route = app.routes.get('admin')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(302)
  expect(response.headers.location).toEqual('/en/sign-in')

})