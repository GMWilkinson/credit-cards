import { buildProviderHref } from './providerLink'
import type { UserProfile } from '@/lib/types'

function parse(href: string) {
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
    expect(params.get('income')).toBe('45000')
    expect(params.get('score')).toBe('720')
    expect(params.get('age')).toBe('29')
  })

  test('omits empty/null/undefined fields', () => {
    const href = buildProviderHref('anywhere', {
      name: 'Bob',
      employment: 'student',
      postcode: undefined,
      income: null,
      creditScore: null,
      age: undefined,
    })
    const { pathname, params } = parse(href)

    expect(pathname).toBe('/provider/anywhere')
    expect(params.get('name')).toBe('Bob')
    expect(params.get('employment')).toBe('student')
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
    const href = buildProviderHref('barclay plus', user)
    const { pathname, params } = parse(href)

    expect(pathname).toBe('/provider/barclay%20plus')
    expect(params.get('name')).toBe('Bert & Co.')
    expect(params.get('postcode')).toBe('W1A 4ZZ')
  })
})
