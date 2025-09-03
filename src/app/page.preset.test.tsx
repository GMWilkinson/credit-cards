import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page from './page'

describe('PresetPicker → ApplicantForm integration', () => {
  test('choosing a mock user autofills the form fields', async () => {
    const user = userEvent.setup()
    render(<Page />)

    const selector = screen.getByLabelText(/load mock user/i)
    await user.selectOptions(selector, 'Student – 20yo (London)')
    await user.click(screen.getByRole('button', { name: /autofill/i }))

    expect(screen.getByLabelText(/^name$/i)).toHaveValue('Sam Student')
    expect(screen.getByLabelText(/^age$/i)).toHaveValue(20)
    expect(screen.getByLabelText(/postcode/i)).toHaveValue('EC1A 1BB')
    expect(screen.getByLabelText(/annual income/i)).toHaveValue(6000)
    expect(screen.getByLabelText(/employment status/i)).toHaveValue('student')
  })
})
