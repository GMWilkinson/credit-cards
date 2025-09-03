export type Employment = 'employed' | 'unemployed' | 'student' | 'self-employed' | 'retired'

export type UserProfile = {
  name: string
  age?: number | null
  postcode?: string
  income?: number | null
  employment: Employment | ''
  creditScore?: number | null
}

export type FilterAtom =
  | { type: 'minScore'; value: number }
  | { type: 'minIncome'; value: number }
  | { type: 'employmentIn'; values: Employment[] }
  | { type: 'notEmploymentIn'; values: Employment[] }
  | { type: 'ageBetween'; min: number; max: number }
  | { type: 'postcodePrefixAny'; values: string[] }

export type FilterNode =
  | FilterAtom
  | { type: 'allOf'; filters: FilterNode[] }
  | { type: 'anyOf'; filters: FilterNode[] }
  | { type: 'not'; filter: FilterNode }

export type Card = {
  id: string
  name: string
  apr: number
  creditLimit: number
  features?: string[]
  eligibility: FilterNode
}


export type RuleContext = {
  user: UserProfile
  card: Card
}
