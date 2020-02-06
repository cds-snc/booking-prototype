// docs: https://helmetjs.github.io/docs/csp/

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  'cdnjs.cloudflare.com',
  '*.herokuapp.com',
  'unpkg.com',
  'dreamy-swirles-5330b3.netlify.com',
]

let upgradeInsecureRequests = true

if (process.env.NODE_ENV === 'development') {
  scriptSrc.push("'unsafe-eval'")
  upgradeInsecureRequests = false
}

module.exports = {
  defaultSrc: ["'self'"],
  scriptSrc: scriptSrc,
  baseUri: ["'none'"],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  imgSrc: ["'self'", 'data:'],
  styleSrc: ["'self'", 'https://fonts.googleapis.com','unpkg.com', 'dreamy-swirles-5330b3.netlify.com'],
  upgradeInsecureRequests,
}
