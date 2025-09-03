'use client'

import type { Card } from '@/lib/types'
import CardItem from './CardItem'
import Button from '@/components/ui/Button'

type Props = {
  cards: Card[]
  onSelect: (id: string) => void
  onBack: () => void
}

export default function CardTable({ cards, onSelect, onBack }: Props) {
  if (!cards.length) {
    return (
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-semibold">No eligible cards found</h3>
        <p className="mt-1 text-sm text-gray-600">Try adjusting your details.</p>
        <Button className="mt-3" variant="secondary" onClick={onBack}>
          Back to form
        </Button>
      </div>
    )
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onSelect={onSelect} />
        ))}
      </ul>

      <div className="mt-4 flex justify-end">
        <Button variant="secondary" onClick={onBack}>
          Back to form
        </Button>
      </div>
    </>
  )
}
