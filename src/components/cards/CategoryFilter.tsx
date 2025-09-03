'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  categoriesFromCards: string[]
  onChange: (selected: string[]) => void
}

export default function CategoryFilter({ categoriesFromCards, onChange }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initial = useMemo(() => {
    const raw = searchParams.get('categories')
    return raw ? raw.split(',').map(s => s.trim()).filter(Boolean) : []
  }, [searchParams])

  const [selected, setSelected] = useState<string[]>(initial)

  useEffect(() => { onChange(selected) }, [selected, onChange])

  useEffect(() => {
    const sp = new URLSearchParams(searchParams)
    if (selected.length) sp.set('categories', selected.join(','))
    else sp.delete('categories')
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const toggle = (cat: string) => {
    if (cat === 'all') {
      setSelected([])
      return
    }
    setSelected(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    )
  }

  const clear = () => setSelected([])

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {categoriesFromCards.map(cat => {
        const active =
          cat === 'all' ? selected.length === 0 : selected.includes(cat)
        return (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={
              active
                ? 'rounded-full px-3 py-1 text-xs font-medium bg-blue-600 text-white'
                : 'rounded-full px-3 py-1 text-xs font-medium bg-gray-200 text-gray-800 hover:bg-gray-300'
            }
          >
            {cat === 'all' ? 'All cards' : cat}
          </button>
        )
      })}
      {selected.length > 0 && (
        <button
          onClick={clear}
          className="ml-2 text-xs underline text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
      )}
    </div>
  )
}
