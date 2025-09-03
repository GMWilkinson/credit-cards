'use client'

import type { Card } from '@/lib/types'
import Button from '@/components/ui/Button'

type Props = {
  card: Card
  onSelect: (id: string) => void
}

export default function CardItem({ card, onSelect }: Props) {
  return (
    <li className="rounded-xl border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{card.name}</h3>
          <p className="text-sm text-gray-600">
            APR {card.apr}% · Limit £{card.creditLimit}
          </p>
          {card.features?.length ? (
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              {card.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <Button size="sm" onClick={() => onSelect(card.id)}>
            Select
          </Button>
        </div>
      </div>
    </li>
  )
}
