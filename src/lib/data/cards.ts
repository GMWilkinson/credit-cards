// src/lib/data/cards.ts
import type { Card } from '@/lib/types'

export const CARDS: Card[] = [
  {
    id: 'anywhere',
    name: 'Anywhere',
    apr: 29.9,
    creditLimit: 1200,
    features: ['No annual fee'],
    categories: ['everyday'],
    eligibility: {
      type: 'anyOf', filters: [
        { type: 'ageBetween', min: 18, max: 120 },
        { type: 'postcodePrefixAny', values: ['EC', 'W', 'SW'] },
      ]
    },
  },
  {
    id: 'barclay-plus',
    name: 'Barclay Plus',
    apr: 19.9,
    creditLimit: 3000,
    features: ['1% cashback'],
    categories: ['cashback', 'everyday'],
    eligibility: {
      type: 'allOf', filters: [
        { type: 'minScore', value: 600 },
        { type: 'minIncome', value: 20000 },
      ]
    },
  },
  {
    id: 'student-life',
    name: 'Student Life',
    apr: 18.9,
    creditLimit: 1000,
    features: ['For students 18–30'],
    categories: ['student', 'starter'],
    eligibility: {
      type: 'allOf', filters: [
        { type: 'employmentIn', values: ['student'] },
        { type: 'ageBetween', min: 18, max: 30 },
      ]
    },
  },
  {
    id: 'prime-platinum',
    name: 'Prime Platinum',
    apr: 14.9,
    creditLimit: 6000,
    features: ['Travel insurance', 'Airport lounge passes'],
    categories: ['premium', 'travel', 'low-apr'],
    eligibility: {
      type: 'allOf', filters: [
        { type: 'minScore', value: 700 },
        { type: 'minIncome', value: 40000 },
        { type: 'notEmploymentIn', values: ['unemployed'] },
      ]
    },
  },
  {
    id: 'jetset-rewards',
    name: 'JetSet Rewards',
    apr: 24.9,
    creditLimit: 3500,
    features: ['Air miles', '0% FX fees'],
    categories: ['travel', 'rewards'],
    eligibility: {
      type: 'allOf', filters: [
        { type: 'minScore', value: 650 },
        { type: 'minIncome', value: 18000 },
      ]
    },
  },
  {
    id: 'balance-saver',
    name: 'Balance Saver',
    apr: 22.9,
    creditLimit: 4000,
    features: ['0% balance transfer for 18 months'],
    categories: ['balance-transfer', 'low-apr'],
    eligibility: {
      type: 'allOf', filters: [
        { type: 'minScore', value: 620 },
        { type: 'minIncome', value: 15000 },
      ]
    },
  },
  {
    id: 'cash-pro',
    name: 'Cash Pro',
    apr: 21.9,
    creditLimit: 5000,
    features: ['2% cashback on groceries'],
    categories: ['cashback', 'everyday', 'rewards'],
    eligibility: {
      type: 'allOf', filters: [
        { type: 'minScore', value: 680 },
        { type: 'minIncome', value: 25000 },
      ]
    },
  },
]
