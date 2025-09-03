'use client'

import { useId, useState } from 'react'
import Button from '@/components/ui/Button'
import { MOCK_USERS } from '@/lib/data/mockUsers'
import type { UserProfile } from '@/lib/types'

type Props = { onPick: (user: UserProfile) => void }

export default function PresetPicker({ onPick }: Props) {
  const labels = Object.keys(MOCK_USERS)
  const [choice, setChoice] = useState(labels[0] ?? '')
  const selectId = useId()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="text-sm" htmlFor={selectId}>
        Load mock user:
      </label>
      <select
        id={selectId}
        aria-label="Load mock user"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        className="border rounded-md p-1 text-sm"
      >
        {labels.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      <Button size="sm" variant="secondary" onClick={() => onPick(MOCK_USERS[choice])}>
        Autofill
      </Button>
    </div>
  )
}
