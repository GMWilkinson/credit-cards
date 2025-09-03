'use client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '@/components/ui/Button'
import type { UserProfile } from '@/lib/types'
import { TextField, NumberField, SelectField } from './FormFields'

type Props = {
  submitting?: boolean
  onSubmit: (values: UserProfile) => void | Promise<void>
  initial?: Partial<UserProfile>
}

const Schema = Yup.object({
  name: Yup.string().required('Required'),
  age: Yup.number().transform((v, o) => (o === '' ? undefined : v)).min(18, '18+'),
  postcode: Yup.string().max(10),
  income: Yup.number().transform((v, o) => (o === '' ? undefined : v)).min(0),
  employment: Yup.string()
    .oneOf(['employed', 'unemployed', 'student', 'self-employed', 'retired'])
    .required('Required'),
  creditScore: Yup.number().transform((v, o) => (o === '' ? undefined : v)).min(0),
})

export default function ApplicantForm({ submitting, onSubmit, initial }: Props) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: initial?.name ?? '',
        age: initial?.age ?? '',
        postcode: initial?.postcode ?? '',
        income: initial?.income ?? '',
        employment: initial?.employment ?? '',
        creditScore: initial?.creditScore ?? '',
      }}
      validationSchema={Schema}
      onSubmit={(vals) => {
        const payload: UserProfile = {
          name: vals.name,
          age: vals.age === '' ? null : Number(vals.age),
          postcode: vals.postcode || undefined,
          income: vals.income === '' ? null : Number(vals.income),
          employment: vals.employment as UserProfile['employment'],
          creditScore: vals.creditScore === '' ? null : Number(vals.creditScore),
        }
        onSubmit(payload)
      }}
    >
      {() => (
        <Form className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField name="name" label="Name" />
          <NumberField name="age" label="Age" />
          <TextField name="postcode" label="Postcode" />
          <NumberField name="income" label="Annual Income (£)" />
          <SelectField
            name="employment"
            label="Employment status"
            options={[
              { value: 'employed', label: 'Employed' },
              { value: 'self-employed', label: 'Self-employed' },
              { value: 'student', label: 'Student' },
              { value: 'retired', label: 'Retired' },
              { value: 'unemployed', label: 'Unemployed' },
            ]}
          />
          <div className="md:col-span-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Checking…' : 'See eligible cards'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
