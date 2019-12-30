const { contextMiddleware } = require('./context.helpers')

const req = {
}

// this is the usual setup, generated by `loadSchema` and `checkErrors`.
const res = {
  locals: {
    addresses: [
      { street: 'Maple St.',
        number: '',
        apt: 'B' },

      { street: 'Pine Ave.',
        number: 456,
        current: false },
    ],
    errors: {
      'addresses[0].number': { msg: 'blank' },
      'addresses[1].current': { msg: 'must be current' },
    },
    firstError: 'addresses[0].number',
  },
}

test('can pad an array', async () => {
  await new Promise(resolve => contextMiddleware(req, res, resolve))

  const pad = res.locals.pad

  expect(pad([], 3)).toEqual([{}, {}, {}])
  expect(pad([], 0)).toEqual([{}])
  expect(pad(undefined, 3)).toEqual([{}, {}, {}])

  expect(pad([1, 2, 3], 0)).toEqual([1, 2, 3])
  expect(pad([1, 2, 3], 3)).toEqual([1, 2, 3])
  expect(pad([1, 2, 3], 4)).toEqual([1, 2, 3, {}])

  expect(pad(undefined, undefined)).toEqual([{}])
})

test('can traverse a data structure with no context', async () => {
  await new Promise(resolve => contextMiddleware(req, res, resolve))

  const loc = res.locals

  expect(loc.getData()).toBe(loc)
  expect(loc.getData('addresses')).toBe(loc.addresses)
  expect(loc.getData('addresses', 0)).toBe(loc.addresses[0])

  expect(loc.getName('addresses')).toBe('addresses')
  expect(loc.getName('addresses', 0)).toBe('addresses[0]')
  expect(loc.getName('addresses', 0, 'street')).toBe('addresses[0][street]')

  expect(loc.getError('addresses', 0, 'number').msg).toBe('blank')
  expect(loc.getError('addresses', 1, 'current').msg).toBe('must be current')
  expect(loc.getError('addresses', 0, 'street')).toBeUndefined()

  expect(loc.isFirstError('addresses', 0, 'number')).toBe(true)
  expect(loc.isFirstError('addresses', 1, 'current')).toBe(false)
  expect(loc.isFirstError('addresses', 1, 'number')).toBe(false)

})

test('can traverse a data structure with context', async () => {
  await new Promise(resolve => contextMiddleware(req, res, resolve))

  const loc = res.locals

  loc.enterContext('addresses')
  expect(loc.getData()).toBe(loc.addresses)
  loc.enterContext(0)

  expect(loc.getData()).toBe(loc.addresses[0])
  expect(loc.getData('street')).toBe(loc.addresses[0].street)

  expect(loc.getName('apt')).toBe('addresses[0][apt]')

  expect(loc.getError('number').msg).toBe('blank')

  expect(loc.isFirstError('number')).toBe(true)
  expect(loc.isFirstError('apt')).toBe(false)

  loc.exitContext()

  expect(loc.getName()).toBe('addresses')
  loc.exitContext()
})
