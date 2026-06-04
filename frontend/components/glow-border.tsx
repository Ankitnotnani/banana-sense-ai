'use client'

import React from 'react'

export function GlowBorder({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        borderImage: 'linear-gradient(135deg, rgba(57, 255, 20, 0.5), rgba(255, 255, 0, 0.5)) 1',
      }}
    >
      {children}
    </div>
  )
}
