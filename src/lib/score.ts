import type { UserProfile } from '@/lib/types'

export function computeScore(u: UserProfile): number {
  let score = 300

  const income = Math.max(0, Math.min(u.income ?? 0, 120_000))
  score += Math.round((income / 120_000) * 300) // up to +300

  const age = u.age ?? 0
  if (age >= 18 && age <= 25) score += 40
  else if (age <= 35) score += 80
  else if (age <= 55) score += 100
  else score += 60

  switch (u.employment) {
    case 'employed':
    case 'self-employed':
      score += 120
      break
    case 'student':
      score += 40
      break
    case 'retired':
      score += 60
      break
    case 'unemployed':
      score += 0
      break
    default:
      break
  }

  const pc = (u.postcode || '').toUpperCase().replace(/\s+/g, '')
  if (['EC', 'E', 'W', 'WC', 'SW', 'SE', 'N', 'NW', 'NE'].some(p => pc.startsWith(p))) score += 40

  return Math.max(300, Math.min(900, score))
}
