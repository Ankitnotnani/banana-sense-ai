import React from 'react'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`text-gradient ${className}`}>
      {children}
    </span>
  )
}
