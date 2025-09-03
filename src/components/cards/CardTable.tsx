'use client'

import { useMemo, useState } from 'react'
import type { Card, UserProfile } from '@/lib/types'
import CardItem from './CardItem'
import Button from '@/components/ui/Button'
import { buildProviderHref } from '@/lib/providerLink'
import CategoryFilter from './CategoryFilter'

type Props = {
  cards: Card[]
  profile: UserProfile
  onBack: () => void
}

type SortKey = 'apr' | 'limit' | 'name'

export default function CardTable({ cards, profile, onBack }: Props) {
  const allCategories = useMemo(
    () => ['all', ...Array.from(new Set(cards.flatMap(c => c.categories))).sort()],
    [cards]
  )

  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('apr')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filteredSorted = useMemo(() => {
    const filtered = selectedCats.length
      ? cards.filter(c => c.categories.some(cat => selectedCats.includes(cat)))
      : cards

    const arr = [...filtered]
    arr.sort((a, b) => {
      if (sortKey === 'name') {
        const va = a.name.toLowerCase()
        const vb = b.name.toLowerCase()
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
      }
      const va = sortKey === 'limit' ? a.creditLimit : a.apr
      const vb = sortKey === 'limit' ? b.creditLimit : b.apr
      return sortDir === 'asc' ? va - vb : vb - va
    })
    return arr
  }, [cards, selectedCats, sortKey, sortDir])

  if (!cards.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold">No eligible cards found</h3>
        <p className="mt-1 text-sm text-gray-600">Try adjusting your details.</p>
        <Button className="mt-4" variant="secondary" onClick={onBack}>
          Back to form
        </Button>
      </div>
    )
  }

  return (
    <>
      <CategoryFilter
        categoriesFromCards={allCategories}
        onChange={setSelectedCats}
      />

      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm">
          Sort by:{' '}
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="border rounded-md p-1 text-sm"
          >
            <option value="apr">APR</option>
            <option value="limit">Credit limit</option>
            <option value="name">Name</option>
          </select>
        </label>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
        >
          {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
        </Button>
      </div>

      <ul className="flex flex-col gap-6">
        {filteredSorted.map((card) => (
          <CardItem key={card.id} card={card} href={buildProviderHref(card.id, profile)} />
        ))}
      </ul>

      <div className="mt-4 flex justify-end">
        <Button variant="secondary" onClick={onBack}>Back to form</Button>
      </div>
    </>
  )
}
