// 1) add your route(s) here ⬇️
const routes = [
  { name: 'personal', path: { en: '/personal', fr: '/personnel' } },
  { name: 'book-1', path: '/book-1' },
  { name: 'book-2', path: '/book-2' },
  { name: 'book-3', path: '/book-3' },
  { name: 'book-confirmation', path: '/book-confirmation' },
  { name: 'sign-in', path: '/sign-in' },
  { name: 'register', path: '/register' },
  { name: 'admin', path: '/admin' },
  { name: 'new-account', path: '/new-account' },
  { name: 'create-event', path: '/create-event' },
  { name: 'get-event', path: '/get-event' },
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
