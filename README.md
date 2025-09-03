# Crazy Cards

It simulates a credit-card comparison site:  
users enter their details, the app checks eligibility rules, and shows matching cards.  
Cards can be sorted, filtered by category, and “applied for” via a mock provider page.

## Getting Started

```bash
npm install
# or
yarn
# or
pnpm install
```


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Testing

### Unit
```bash
npm run test
# or
yarn test
```

### E2E
```bash
npm run e2e:ci
# or
yarn e2e:ci
```

## What it does
Form step: Users (or mock presets) enter profile info — name, age, postcode, employment, income.

Eligibility rules: Cards define their own filters (minScore, employmentIn, ageBetween, etc.).
Adding a new card = just add JSON config (no new code).

Results step: Shows all eligible cards.

Sort by APR, credit limit, or name.

Filter by categories (cashback, travel, balance-transfer, etc).

Always an “All cards” tab to reset filters.

Provider step: Clicking “Check eligibility” navigates to /provider/[cardId] with query params.
The form is prefilled; user can edit and “Apply now” (mocked).

## Bells and whistles

Mock users: Choose from preset profiles to autofill the form for quick testing.

Persisted state: Uses React Query’s cache (no backend DB required).

Category tabs: Multi-select pill controls, synced with ?categories= URL param.

Sort controls: Dropdown + asc/desc toggle.

E2E & unit tests:

RTL unit tests cover eligibility filters & form autofill.

Cypress E2E runs a full happy path (preset → submit → sort/filter → provider).

A11y: Labels correctly wired via htmlFor/id, accessible roles on buttons/links.

Provider page: Demonstrates pre-filling via URL query params (like TotallyMoney & others do).

Type-safe: All props and mock data typed with TypeScript.

## Tech stack

Next.js – App Router

React

Tailwind CSS v4 alpha

Formik – form handling

Yup – form validation

Jest + React Testing Library

Cypress + Testing Library Cypress

## Next steps (if this were production)

Replace mock API with real backend for credit score lookups.

Add auth (login) so results persist between sessions.

Improve UI polish (branding, responsive header, hero section).

Accessibility audit (ARIA roles, tab order, etc).

