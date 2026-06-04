'use client'

import React from 'react'

export function GlassmorphismCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`glassmorphism rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  )
}
