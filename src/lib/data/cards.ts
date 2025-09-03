// src/lib/data/cards.ts
import type { Card } from '@/lib/types'

export const CARDS: Card[] = [
  {
    id: 'anywhere',
    name: 'Anywhere',
    apr: 29.9,
    creditLimit: 1200,
    features: ['No annual fee'],
    eligibility: {
      type: 'allOf',
      filters: [
        { type: 'ageBetween', min: 18, max: 120 },
      ],
    },
  },
  {
    id: 'barclay-plus',
    name: 'Barclay Plus',
    apr: 19.9,
    creditLimit: 3000,
    features: ['1% cashback'],
    eligibility: {
      type: 'allOf',
      filters: [
        { type: 'minScore', value: 600 },
        { type: 'minIncome', value: 20000 },
      ],
    },
  },
  {
    id: 'student-life',
    name: 'Student Life',
    apr: 18.9,
    creditLimit: 1000,
    features: ['For students 18–30'],
    eligibility: {
      type: 'allOf',
      filters: [
        { type: 'employmentIn', values: ['student'] },
        { type: 'ageBetween', min: 18, max: 30 },
      ],
    },
  },
  {
    id: 'prime-platinum',
    name: 'Prime Platinum',
    apr: 14.9,
    creditLimit: 6000,
    features: ['Travel insurance'],
    eligibility: {
      type: 'allOf',
      filters: [
        { type: 'minScore', value: 700 },
        { type: 'minIncome', value: 40000 },
        { type: 'notEmploymentIn', values: ['unemployed'] },
      ],
    },
  },
  {
    id: 'london',
    name: 'London Card',
    apr: 29.9,
    creditLimit: 9200,
    features: ['No annual fee'],
    eligibility: {
      type: 'anyOf',
      filters: [
        { type: 'ageBetween', min: 18, max: 120 },
        { type: 'postcodePrefixAny', values: ['EC', 'E', 'W', 'WC', 'SW', 'SE', 'N', 'NW', 'NE'] },
      ],
    },
  },
]
