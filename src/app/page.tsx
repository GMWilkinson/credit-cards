'use client'

import { useState } from 'react'
import ApplicantForm from '@/components/forms/ApplicantForm'
// import CardTable from '@/components/cards/CardTable'
import type { Card, UserProfile } from '@/lib/types'

type Step = 'form' | 'results'

export default function Page() {
  const [step, setStep] = useState<Step>('form')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [cards, setCards] = useState<Card[] | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (values: UserProfile) => {
    setError(null); setLoading(true)
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to fetch cards')
      setProfile(values)
      setCards(data.cards as Card[])
      setSelectedIds([])
      setStep('results')
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const backToForm = () => {
    setStep('form')
    setSelectedIds([])
    setCards(null)
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Credit Card Finder</h1>

      {step === 'form' && (
        <>
          <ApplicantForm submitting={loading} onSubmit={onSubmit} />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </>
      )}

      {step === 'results' && cards && (
        <>
          {profile && (
            <p className="text-sm text-gray-600">
              For {profile.name} · {profile.employment} · score {profile.creditScore ?? '—'}
            </p>
          )}

        </>
      )}
    </section>
  )
}
