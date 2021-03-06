const request = require('supertest')
const app = require('../../app.js')
const session = require('supertest-session');
const { extractCsrfToken } = require('../../utils/testUtils.spec')

test('Can send get request book-1 route ', async () => {
  const route = app.routes.get('book-1')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})

test('Can send post request book-1 route ', async () => {
  const route = app.routes.get('book-1')

  // to test form with csrf token, need a session, and a token from a get request
  const testSession = session(app);
  const getresp = await testSession.get(route.path.en);
  const csrfToken = extractCsrfToken(getresp);

  const postresp = await testSession.post(route.path.en).send({ _csrf: csrfToken });
  expect(postresp.statusCode).toBe(302);
})

test('It loads event data when given a valid event id', async() => {
  const route = app.routes.get('book-1')
  const response = await request(app).get(route.path.en + "?id=1")
  expect(response.statusCode).toBe(200)
  // can't actually really test this yet since the page doesn't behave any differently if the id doesn't exist
})