import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glowEffect?: boolean
}

export function GlassCard({ children, className = '', hover = false, glowEffect = false }: GlassCardProps) {
  const baseClasses = 'glass-card'
  const hoverClasses = hover ? 'hover:bg-white/8 hover:border-white/20 transition-all duration-300' : ''
  const glowClasses = glowEffect ? 'neon-glow' : ''
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${glowClasses} ${className}`}>
      {children}
    </div>
  )
}
