// src/lib/rules/index.ts
import type { Card, FilterAtom, FilterNode, UserProfile } from '@/lib/types'
import { CARDS } from '@/lib/data/cards'

function normPostcode(pc?: string) {
  return (pc || '').toUpperCase().replace(/\s+/g, '')
}

function evalAtom(user: UserProfile, atom: FilterAtom): boolean {
  const score = user.creditScore ?? -Infinity
  const income = user.income ?? 0
  const age = user.age ?? 0
  const pc = normPostcode(user.postcode)

  switch (atom.type) {
    case 'minScore':
      return score >= atom.value
    case 'minIncome':
      return income >= atom.value
    case 'employmentIn':
      return atom.values.includes(user.employment as any)
    case 'notEmploymentIn':
      return !atom.values.includes(user.employment as any)
    case 'ageBetween':
      return age >= atom.min && age <= atom.max
    case 'postcodePrefixAny':
      return atom.values.some((p) => pc.startsWith(p.toUpperCase()))
    default:
      return false
  }
}

function evalNode(user: UserProfile, node: FilterNode): boolean {
  switch (node.type) {
    case 'allOf':
      return node.filters.every((f) => evalNode(user, f))
    case 'anyOf':
      return node.filters.some((f) => evalNode(user, f))
    case 'not':
      return !evalNode(user, node.filter)
    default:
      return evalAtom(user, node as FilterAtom)
  }
}

export function availableCardsFor(user: UserProfile): Card[] {
  return CARDS.filter((card) => evalNode(user, card.eligibility))
}
