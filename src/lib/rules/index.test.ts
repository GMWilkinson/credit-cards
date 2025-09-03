import { availableCardsFor } from './index'
import type { UserProfile } from '@/lib/types'

describe('availableCardsFor', () => {
  test('student, age 20, low income → gets Student Life + Anywhere', () => {
    const user: UserProfile = {
      name: 'Bob',
      employment: 'student',
      age: 20,
      income: 0,
      creditScore: 500,
      postcode: 'SE1 1AA'
    }
    const cards = availableCardsFor(user).map(c => c.id)
    expect(cards).toContain('student-life')
    expect(cards).toContain('anywhere')
    expect(cards).not.toContain('barclay-plus')
    expect(cards).not.toContain('prime-platinum')
  })

  test('employed, score 720, income 50k → prime + barclay + anywhere', () => {
    const user: UserProfile = {
      name: 'Bobby',
      employment: 'employed',
      age: 35,
      income: 50000,
      creditScore: 720,
      postcode: 'N1 1AA'
    }
    const cards = availableCardsFor(user).map(c => c.id)
    expect(cards).toEqual(expect.arrayContaining(['prime-platinum', 'barclay-plus', 'anywhere']))
    expect(cards).not.toContain('student-life')
  })

  test('unemployed, high score/income → blocks prime-platinum via notEmploymentIn', () => {
    const user: UserProfile = {
      name: 'Robert',
      employment: 'unemployed',
      age: 40,
      income: 100000,
      creditScore: 800,
      postcode: 'SW1A 1AA'
    }
    const cards = availableCardsFor(user).map(c => c.id)
    expect(cards).not.toContain('prime-platinum')
  })

  test('postcode boost: London prefixes allow London card via anyOf, even if age < 18 fails', () => {
    const user: UserProfile = {
      name: 'Bobster',
      employment: 'student',
      age: 16,
      income: 0,
      creditScore: 300,
      postcode: 'EC1A 1BB'
    }
    const cards = availableCardsFor(user).map(c => c.id)
    expect(cards).toContain('london')
    expect(cards).not.toContain('anywhere')
  })
})
