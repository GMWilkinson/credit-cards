import { NextResponse } from 'next/server'
import { availableCardsFor } from '@/lib/rules'
import type { UserProfile } from '@/lib/types'
import { computeScore } from '@/lib/score'

export async function POST(req: Request) {
  const user = (await req.json()) as UserProfile
  if (!user?.name) {
    return NextResponse.json({ ok: false, error: 'Missing name' }, { status: 400 })
  }

  const score = computeScore(user)
  const userWithScore = { ...user, creditScore: score }

  const cards = availableCardsFor(userWithScore)
  return NextResponse.json({ ok: true, cards, score })
}
