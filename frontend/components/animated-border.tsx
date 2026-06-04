'use client'

import { useEffect, useRef } from 'react'

interface AnimatedBorderProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedBorder({ children, className = '' }: AnimatedBorderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateGradient = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      element.style.setProperty('--border-x', `${x}px`)
      element.style.setProperty('--border-y', `${y}px`)
    }

    element.addEventListener('mousemove', updateGradient)
    return () => element.removeEventListener('mousemove', updateGradient)
  }, [])

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(#0a0e0e, #0a0e0e) padding-box, linear-gradient(135deg, #39ff14, #ffd700) border-box',
        border: '1px solid transparent',
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
