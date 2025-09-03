import { buildProviderHref } from './providerLink'
import type { UserProfile } from '@/lib/types'

function parse(href: string) {
  // Add a dummy origin so URL can parse relative paths
  const url = new URL(`http://localhost${href}`)
  return { pathname: url.pathname, params: url.searchParams }
}

describe('buildProviderHref', () => {
  const baseUser: UserProfile = {
    name: 'Alice Example',
    postcode: 'EC1A 1BB',
    employment: 'employed',
    income: 45000,
    creditScore: 720,
    age: 29,
  }

  test('builds provider path with encoded cardId and all non-empty params', () => {
    const href = buildProviderHref('prime-platinum', baseUser)
    const { pathname, params } = parse(href)

    expect(pathname).toBe('/provider/prime-platinum')
    expect(params.get('name')).toBe('Alice Example')
    expect(params.get('postcode')).toBe('EC1A 1BB')
    expect(params.get('employment')).toBe('employed')
    // numbers should be stringified
    expect(params.get('income')).toBe('45000')
    expect(params.get('score')).toBe('720')
    expect(params.get('age')).toBe('29')
  })

  test('omits empty/null/undefined fields', () => {
    const href = buildProviderHref('anywhere', {
      name: 'Bob',
      employment: 'student',
      // omit postcode
      postcode: undefined,
      // explicit nulls / empties
      income: null,
      creditScore: null,
      age: undefined,
    })
    const { pathname, params } = parse(href)

    expect(pathname).toBe('/provider/anywhere')
    expect(params.get('name')).toBe('Bob')
    expect(params.get('employment')).toBe('student')

    // omitted ones should be null (not present)
    expect(params.get('postcode')).toBeNull()
    expect(params.get('income')).toBeNull()
    expect(params.get('score')).toBeNull()
    expect(params.get('age')).toBeNull()
  })

  test('encodes special characters safely (spaces, symbols) in query and path', () => {
    const user: UserProfile = {
      name: 'Bert & Co.',
      employment: 'self-employed',
      postcode: 'W1A 4ZZ',
      income: 123456,
      creditScore: 650,
      age: 41,
    }
    // cardId with a space to ensure path encoding (even though your IDs are hyphenated)
    const href = buildProviderHref('barclay plus', user)
    const { pathname, params } = parse(href)

    // space in card id should be percent-encoded in the path
    expect(pathname).toBe('/provider/barclay%20plus')

    // query params are URL-encoded, but URLSearchParams returns decoded values
    expect(params.get('name')).toBe('Bert & Co.')
    expect(params.get('postcode')).toBe('W1A 4ZZ')
  })
})
