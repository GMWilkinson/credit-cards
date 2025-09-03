import { CARDS } from '../data/cards'
import type { Card, UserProfile, RuleContext } from '../types'
import { hasMinScore, hasMinIncome, employmentIs, postcodeStartsWith, ageBetween } from './predicates'

const RULES = [
  (ctx: RuleContext) => ctx.card.id === 'anywhere' && ageBetween(18, 120)(ctx),
  (ctx: RuleContext) => ctx.card.id === 'anywhere' && postcodeStartsWith(['EC', 'W', 'SW'])(ctx),

  (ctx: RuleContext) => ctx.card.id === 'barclay-plus' && hasMinScore(600)(ctx) && hasMinIncome(20000)(ctx),

  (ctx: RuleContext) => ctx.card.id === 'student-life' && employmentIs('student')(ctx) && ageBetween(18, 30)(ctx),

  (ctx: RuleContext) =>
    ctx.card.id === 'prime-platinum' &&
    hasMinScore(700)(ctx) &&
    hasMinIncome(40000)(ctx) &&
    !employmentIs('unemployed')(ctx),
]

export function availableCardsFor(user: UserProfile): Card[] {
  const ctx = (card: Card): RuleContext => ({ user, card })
  return CARDS.filter((card) => RULES.some((r) => r(ctx(card))))
}
