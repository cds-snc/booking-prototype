const request = require('supertest')
const app = require('../../app.js')
// const cheerio = require('cheerio')

/* function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $('[name=_csrf]').val();
} */

test('It redirects to the login screen if user is not logged in', async () => {
  const route = app.routes.get('admin')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(302)
  expect(response.headers.location).toEqual('/en/sign-in')

})