import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  htmlFor: string
  children: ReactNode
  required?: boolean
}

export function Field({ label, htmlFor, children, required }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>
        {label}
        {required ? <span className="field-required">*</span> : null}
      </label>
      {children}
    </div>
  )
}
