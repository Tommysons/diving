import React from 'react'
import clsx from 'clsx'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonShape = 'rounded' | 'pill' | 'square'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: ButtonSize
  shape?: ButtonShape
  variant?: 'filled' | 'outlined'
  className?: string
}

export default function Button({
  children,
  size = 'md',
  shape = 'rounded',
  variant = 'filled',
  className = '',
  ...props
}: ButtonProps) {
  //Difine base styles (colors, focus, etc)
  const baseStyles =
    'font-semibold focus:outline-none focus:ring-2 focus:ring-ocean-dark transition'

  //Sizes
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  //Shapes
  const shapeClasses = {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded-none',
  }

  //Variants
  const variantClasses = {
    filled: 'bg-ocean text-white hover:bg-ocean-dark',
    outlined: 'border border-ocean text-ocean hover:bg-ocean hover:text-white',
  }

  return (
    <button
      {...props}
      className={clsx(
        baseStyles,
        sizeClasses[size],
        shapeClasses[shape],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  )
}
