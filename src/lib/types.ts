export type Employment = 'employed' | 'unemployed' | 'student' | 'self-employed' | 'retired'

export type UserProfile = {
  name: string
  email: string
  age?: number | null
  postcode?: string
  income?: number | null
  employment: Employment | ''
  creditScore?: number | null
}

export type Card = {
  id: string
  name: string
  apr: number
  creditLimit: number
  features?: string[]
}

export type RuleContext = {
  user: UserProfile
  card: Card
}
