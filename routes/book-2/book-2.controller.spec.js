const request = require('supertest')
const app = require('../../app.js')
const session = require('supertest-session');
const { extractCsrfToken } = require('../../utils/testUtils.spec')

test('Can send get request book-2 route ', async () => {
  const route = app.routes.get('book-2')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})

test('Can send post request book-2 route ', async () => {
  const route = app.routes.get('book-2')

  // to test form with csrf token, need a session, and a token from a get request
  const testSession = session(app);
  const getresp = await testSession.get(route.path.en);
  const csrfToken = extractCsrfToken(getresp);

  const postresp = await testSession.post(route.path.en).send({ _csrf: csrfToken });
  expect(postresp.statusCode).toBe(302); // should redirect back with errors on an incomplete form
})