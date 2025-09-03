'use client'
import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
  const variantStyles =
    variant === 'secondary'
      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      : variant === 'danger'
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-black text-white hover:bg-gray-800'
  const sizeStyles = size === 'sm' ? 'px-3 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'

  return (
    <button className={`${base} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}
