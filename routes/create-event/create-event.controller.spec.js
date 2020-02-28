const request = require('supertest')
const app = require('../../app.js')
const cheerio = require('cheerio')

const session = require('supertest-session');

function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $('[name=_csrf]').val();
}

test('It redirects to the login screen if user is not logged in', async () => {
  const route = app.routes.get('create-event')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(302)
  expect(response.headers.location).toEqual('/en/sign-in')

})

describe('for authenticated /create-event', () => {
  let authSession;
  const route = app.routes.get('create-event')

  beforeEach(async() => {
    authSession = session(app)
    const authRoute = app.routes.get('sign-in')
    const getresp = await authSession.get(authRoute.path.en)
    const csrfToken = extractCsrfToken(getresp);

    const postresp = await authSession
      .post(authRoute.path.en)
      .send({ 
        _csrf: csrfToken,
        email: 'test@user.com',
        password: 'CorrectPassword',
      });
    expect(postresp.statusCode).toBe(302);
  })

  test('Can send get request create-event route ', async () => {
    // console.log(authSession)
    const response = await authSession.get(route.path.en)
    expect(response.statusCode).toBe(200)
  })
})

/*
test('Can send get request create-event route ', async () => {
  const route = app.routes.get('create-event')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})

test('Can send post request create-event route ', async () => {
  const route = app.routes.get('create-event')

  // to test form with csrf token, need a session, and a token from a get request
  const testSession = session(app);
  const getresp = await testSession.get(route.path.en);
  const csrfToken = extractCsrfToken(getresp);

  const postresp = await testSession.post(route.path.en).send({ _csrf: csrfToken });
  expect(postresp.statusCode).toBe(302); // should redirect back with errors on an incomplete form
})
*/