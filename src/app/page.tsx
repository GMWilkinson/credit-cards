'use client'
import { useState } from 'react'
import ApplicantForm from '@/components/forms/ApplicantForm'
import PresetPicker from '@/components/forms/PresetPicker'
import CardTable from '@/components/cards/CardTable'
import type { Card, UserProfile } from '@/lib/types'

type Step = 'form' | 'results'

export default function Page() {
  const [step, setStep] = useState<Step>('form')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [initial, setInitial] = useState<Partial<UserProfile> | undefined>(undefined)
  const [score, setScore] = useState<number | null>(null)
  const [cards, setCards] = useState<Card[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (values: UserProfile) => {
    setError(null); setLoading(true)
    try {
      const res = await fetch('/api/cards', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to fetch cards')
      setProfile(values)
      setScore(data.score as number)
      setCards(data.cards as Card[])
      setStep('results')
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const backToForm = () => {
    setStep('form')
    setCards(null)
    setScore(null)
    if (profile) setInitial(profile)
  }

  return (
    <section className="space-y-6">

      <div className="p-6">

        {step === 'form' && (
          <>
            <PresetPicker onPick={(u) => setInitial(u)} />

            <ApplicantForm submitting={loading} onSubmit={onSubmit} initial={initial} />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </>
        )}

        {step === 'results' && cards && profile && (
          <>
            <p className="text-sm text-gray-600 py-2">
              For {profile.name} · {profile.employment} · score {score ?? '—'}
            </p>
            <CardTable
              cards={cards}
              profile={{ ...profile, creditScore: score ?? undefined }}
              onBack={backToForm}
            />
          </>
        )}
      </div>
    </section>
  )
}
