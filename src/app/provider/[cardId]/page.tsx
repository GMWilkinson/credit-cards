'use client'

import { useSearchParams, useParams, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useMemo, useState } from 'react'

export default function ProviderPage() {
  const params = useParams<{ cardId: string }>()
  const sp = useSearchParams()
  const router = useRouter()

  const [form, setForm] = useState(() => ({
    name: sp.get('name') ?? '',
    postcode: sp.get('postcode') ?? '',
    employment: sp.get('employment') ?? '',
    income: sp.get('income') ?? '',
    score: sp.get('score') ?? '',
    age: sp.get('age') ?? '',
  }))

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const cardName = useMemo(() => params.cardId?.toString().replace(/-/g, ' '), [params.cardId])

  const submit = () => {
    console.log('Submitting to provider:', { cardId: params.cardId, ...form })
    alert(`Pretend we applied for "${cardName}" with these details.\n(See console for payload.)`)
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Apply with Provider · {cardName}</h1>
      <p className="text-gray-600 text-sm">
        Prefilled from previous step. Edit if needed, then continue.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input className="w-full rounded-md border p-2" value={form.name} onChange={onChange('name')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Postcode</label>
          <input className="w-full rounded-md border p-2" value={form.postcode} onChange={onChange('postcode')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Employment</label>
          <input className="w-full rounded-md border p-2" value={form.employment} onChange={onChange('employment')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Income</label>
          <input type="number" className="w-full rounded-md border p-2" value={form.income} onChange={onChange('income')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Credit score</label>
          <input type="number" className="w-full rounded-md border p-2" value={form.score} onChange={onChange('score')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Age</label>
          <input type="number" className="w-full rounded-md border p-2" value={form.age} onChange={onChange('age')} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={submit}>Apply now</Button>
        <Button variant="secondary" onClick={() => router.push('/')}>Back</Button>
      </div>
    </section>
  )
}
