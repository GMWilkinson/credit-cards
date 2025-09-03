// cypress/e2e/happy_path.cy.ts
describe('Happy path: preset → submit → results → provider', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/cards', { fixture: 'cards_success.json' }).as('postCards')
  })

  it('fills with preset, submits, sorts/filters, follows provider link', () => {
    cy.visit('/')

    // Preset → Autofill
    cy.findByLabelText(/load mock user/i).select('Student – 20yo (London)')
    cy.findByRole('button', { name: /autofill/i }).click()

    // Quick assertions
    cy.findByLabelText(/^name$/i).should('have.value', 'Sam Student')
    cy.findByLabelText(/^age$/i).should('have.value', '20')

    // Submit form
    cy.findByRole('button', { name: /See eligible cards/i }).click()
    cy.wait('@postCards')

    // Sort toggle (asc ↔ desc)
    cy.findByRole('button', { name: /asc|desc/i }).click()

    // Category filter
    cy.findAllByRole('button', { name: /travel/i }).first().click()
    cy.findByText('JetSet Rewards').should('be.visible')
    cy.findByText('Prime Platinum').should('be.visible')

    // Reset to All cards
    cy.findAllByRole('button', { name: /all cards/i }).first().click()

    // Follow provider link from first card
    cy.get('ul li').first().within(() => {
      cy.findByRole('link', { name: /Select/i }).click()
    })

    // Land on provider page with params
    cy.location('pathname').should('match', /^\/provider\//)
    cy.location('search').then((search) => {
      const q = new URLSearchParams(search)
      expect(q.get('name')).to.eq('Sam Student')
      expect(q.get('postcode')).to.eq('EC1A 1BB')
      expect(q.get('employment')).to.eq('student')
      expect(q.get('income')).to.eq('6000')
      expect(q.get('score')).to.eq('720')
      expect(q.get('age')).to.eq('20')
    })
    cy.findByLabelText(/name/i).should('have.value', 'Sam Student')
  })
})
