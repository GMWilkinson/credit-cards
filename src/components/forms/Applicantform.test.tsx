import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApplicantForm from './ApplicantForm'

test('submits normalized payload (numbers, nulls)', async () => {
  const user = userEvent.setup()
  const onSubmit = jest.fn()

  render(<ApplicantForm onSubmit={onSubmit} submitting={false} />)

  await user.type(screen.getByLabelText(/name/i), 'Bert')
  await user.type(screen.getByLabelText(/^age$/i), '25')
  await user.type(screen.getByLabelText(/postcode/i), 'SE8 5EB')
  await user.type(screen.getByLabelText(/annual income/i), '60000')
  await user.selectOptions(screen.getByLabelText(/employment status/i), 'employed')

  await user.click(screen.getByRole('button', { name: /see eligible cards/i }))

  expect(onSubmit).toHaveBeenCalledTimes(1)
  const payload = onSubmit.mock.calls[0][0]

  expect(payload).toMatchObject({
    name: 'Bert',
    age: 25,
    postcode: 'SE8 5EB',
    income: 60000,
    employment: 'employed',
  })
})
