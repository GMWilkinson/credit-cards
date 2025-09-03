import type { UserProfile } from '@/lib/types'

export const MOCK_USERS: Record<string, UserProfile> = {
  'Student – 20yo (London)': {
    name: 'Sam Student',
    employment: 'student',
    age: 20,
    income: 6000,
    postcode: 'EC1A 1BB',
  },
  'Everyday – 30yo (cashback)': {
    name: 'Casey Everyday',
    employment: 'employed',
    age: 30,
    income: 28000,
    postcode: 'SE1 2AA',
  },
  'Premium – 40yo (high income)': {
    name: 'Pat Premium',
    employment: 'employed',
    age: 40,
    income: 65000,
    postcode: 'N1 1AA',
  },
  'Unemployed – 35yo': {
    name: 'Una Employed',
    employment: 'unemployed',
    age: 35,
    income: 0,
    postcode: 'W1A 4ZZ',
  },
  'Retired – 67yo': {
    name: 'Rita Retired',
    employment: 'retired',
    age: 67,
    income: 18000,
    postcode: 'SW1A 2HQ',
  },
}
