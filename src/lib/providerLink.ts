// src/lib/providerLink.ts
import type { UserProfile } from '@/lib/types'

export function buildProviderHref(cardId: string, u: UserProfile) {
  const params = new URLSearchParams()

  // keep params short & stable; omit empties
  const add = (k: string, v: unknown) => {
    if (v === null || v === undefined || v === '') return
    params.set(k, String(v))
  }

  add('name', u.name)
  add('postcode', u.postcode)
  add('employment', u.employment)
  add('income', u.income)
  add('score', u.creditScore)
  add('age', u.age)

  return `/provider/${encodeURIComponent(cardId)}?${params.toString()}`
}
