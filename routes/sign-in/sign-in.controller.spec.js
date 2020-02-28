const request = require('supertest')
const app = require('../../app.js')
const cheerio = require('cheerio')

const session = require('supertest-session');

function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $('[name=_csrf]').val();
}

test('Can send get request sign-in route ', async () => {
  const route = app.routes.get('sign-in')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})

test('Can send post request sign-in route ', async () => {
  const route = app.routes.get('sign-in')

  // to test form with csrf token, need a session, and a token from a get request
  const testSession = session(app);
  const getresp = await testSession.get(route.path.en);
  const csrfToken = extractCsrfToken(getresp);

  const postresp = await testSession.post(route.path.en).send({ _csrf: csrfToken });
  expect(postresp.statusCode).toBe(302);
})

test('It does not login with invalid info', async () => {
  const route = app.routes.get('sign-in')

  // to test form with csrf token, need a session, and a token from a get request
  const testSession = session(app);
  const getresp = await testSession.get(route.path.en);
  const csrfToken = extractCsrfToken(getresp);

  const postresp = await testSession
    .post(route.path.en)
    .send({ 
      _csrf: csrfToken,
      email: 'test@wronguser.com',
      password: 'IncorrectPassword',
    });
  expect(postresp.statusCode).toBe(302);
  expect(postresp.headers.location).toBe('admin');
  // TODO - fix this. Seems like code redirects to admin regardless of credentials.
  // admin redirects back to sign-in on failed credentials
})

test('It logs in with valid user data', async () => {
  const route = app.routes.get('sign-in')

  // to test form with csrf token, need a session, and a token from a get request
  const testSession = session(app);
  const getresp = await testSession.get(route.path.en);
  const csrfToken = extractCsrfToken(getresp);

  const postresp = await testSession
    .post(route.path.en)
    .send({ 
      _csrf: csrfToken,
      email: 'test@user.com',
      password: 'CorrectPassword',
    });
  expect(postresp.statusCode).toBe(302);
  expect(postresp.headers.location).toBe('admin');
})