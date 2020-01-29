// 1) add your route(s) here ⬇️
const routes = [
  { name: 'personal', path: { en: '/personal', fr: '/personnel' } },
  { name: 'book', path: '/book' },
  { name: 'sign-in', path: '/sign-in' },
  { name: 'register', path: '/register' },
  { name: 'admin', path: '/admin' },
  { name: 'new-account', path: '/new-account' },
]

const locales = ['en', 'fr']

// note: you can define and export a custom configRoutes function here
// see route.helpers.js which is where the default one is defined
// if configRoutes is defined here it will be used in pacle of the default

module.exports = {
  routes,
  locales,
}
