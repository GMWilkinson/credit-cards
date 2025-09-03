import { computeScore } from './score'
import type { UserProfile } from '@/lib/types'

test('returns a number between 300 and 900', () => {
  const u: UserProfile = { name: 'A', employment: 'employed', income: 50000, age: 30, postcode: 'EC1A 1BB' }
  const s = computeScore(u)
  expect(typeof s).toBe('number')
  expect(s).toBeGreaterThanOrEqual(300)
  expect(s).toBeLessThanOrEqual(900)
})

test('higher income generally yields higher scores', () => {
  const low: UserProfile = { name: 'L', employment: 'employed', income: 10_000, age: 30 }
  const high: UserProfile = { name: 'H', employment: 'employed', income: 100_000, age: 30 }
  expect(computeScore(high)).toBeGreaterThan(computeScore(low))
})
