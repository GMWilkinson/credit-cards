import { getCardsFor } from './handler'

test('throws on missing name', () => {
  // @ts-expect-error minimal bad sample
  expect(() => getCardsFor({ employment: 'student' })).toThrow(/missing/i)
})
