'use client'

import { Field, ErrorMessage } from 'formik'

type BaseProps = {
  name: string
  label: string
  helpText?: string
  className?: string
}

type Option = {
  value: string
  label: string

}
type SelectProps = BaseProps & { options: Option[] }

export function TextField({ name, label, helpText, className = '' }: BaseProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>{label}</label>
      <Field id={name} name={name} className="w-full rounded-md border p-2" />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      <ErrorMessage name={name} component="p" className="text-sm text-red-600" />
    </div>
  )
}

export function NumberField({ name, label, helpText, className = '' }: BaseProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>{label}</label>
      <Field id={name} name={name} type="number" className="w-full rounded-md border p-2" />
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      <ErrorMessage name={name} component="p" className="text-sm text-red-600" />
    </div>
  )
}

export function SelectField({ name, label, options, helpText, className = '' }: SelectProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} className="w-full rounded-md border p-2">
        <option value="">Select…</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </Field>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      <ErrorMessage name={name} component="p" className="text-sm text-red-600" />
    </div>
  )
}
