'use client'

import { useSearchParams, useParams, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useMemo, useState, useId } from 'react'

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

  const onChange =
    (k: keyof typeof form) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }))

  const cardName = useMemo(
    () => params.cardId?.toString().replace(/-/g, ' '),
    [params.cardId]
  )

  // Unique, stable ids for a11y
  const baseId = useId()
  const ids = {
    name: `${baseId}-name`,
    postcode: `${baseId}-postcode`,
    employment: `${baseId}-employment`,
    income: `${baseId}-income`,
    score: `${baseId}-score`,
    age: `${baseId}-age`,
  }

  const submit = () => {
    console.log('Submitting to provider:', { cardId: params.cardId, ...form })
    alert(
      `Pretend we applied for "${cardName}" with these details.\n(See console for payload.)`
    )
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Apply with Provider · {cardName}</h1>
      <p className="text-gray-600 text-sm">
        Prefilled from previous step. Edit if needed, then continue.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor={ids.name} className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id={ids.name}
            className="w-full rounded-md border p-2"
            value={form.name}
            onChange={onChange('name')}
          />
        </div>

        <div>
          <label htmlFor={ids.postcode} className="mb-1 block text-sm font-medium">
            Postcode
          </label>
          <input
            id={ids.postcode}
            className="w-full rounded-md border p-2"
            value={form.postcode}
            onChange={onChange('postcode')}
          />
        </div>

        <div>
          <label htmlFor={ids.employment} className="mb-1 block text-sm font-medium">
            Employment
          </label>
          <input
            id={ids.employment}
            className="w-full rounded-md border p-2"
            value={form.employment}
            onChange={onChange('employment')}
          />
        </div>

        <div>
          <label htmlFor={ids.income} className="mb-1 block text-sm font-medium">
            Income
          </label>
          <input
            id={ids.income}
            type="number"
            className="w-full rounded-md border p-2"
            value={form.income}
            onChange={onChange('income')}
          />
        </div>

        <div>
          <label htmlFor={ids.score} className="mb-1 block text-sm font-medium">
            Credit score
          </label>
          <input
            id={ids.score}
            type="number"
            className="w-full rounded-md border p-2"
            value={form.score}
            onChange={onChange('score')}
          />
        </div>

        <div>
          <label htmlFor={ids.age} className="mb-1 block text-sm font-medium">
            Age
          </label>
          <input
            id={ids.age}
            type="number"
            className="w-full rounded-md border p-2"
            value={form.age}
            onChange={onChange('age')}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={submit}>Apply now</Button>
        <Button variant="secondary" onClick={() => router.push('/')}>
          Back
        </Button>
      </div>
    </section>
  )
}
