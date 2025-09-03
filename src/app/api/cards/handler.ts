import { availableCardsFor } from '@/lib/rules'
import type { UserProfile } from '@/lib/types'

export function getCardsFor(user: UserProfile) {
  if (!user?.name) {
    throw new Error('Missing name')
  }
  return availableCardsFor(user)
}
