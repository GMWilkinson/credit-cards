import { RuleContext } from '../types'

export const hasMinScore = (min: number) => (ctx: RuleContext) =>
  (ctx.user.creditScore ?? -Infinity) >= min

export const hasMinIncome = (min: number) => (ctx: RuleContext) =>
  (ctx.user.income ?? 0) >= min

export const employmentIs = (...roles: string[]) => (ctx: RuleContext) =>
  roles.includes(ctx.user.employment)

export const postcodeStartsWith = (prefixes: string[]) => (ctx: RuleContext) => {
  const pc = (ctx.user.postcode || '').toUpperCase().replace(/\s+/g, '')
  return prefixes.some((p) => pc.startsWith(p.toUpperCase()))
}

export const ageBetween = (min: number, max: number) => (ctx: RuleContext) => {
  const a = ctx.user.age ?? 0
  return a >= min && a <= max
}
