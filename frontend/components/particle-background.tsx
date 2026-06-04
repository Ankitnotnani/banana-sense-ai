'use client'

import React, { useEffect, useRef } from 'react'

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.opacity += (Math.random() - 0.5) * 0.02

        if (particle.opacity > 0.8) particle.opacity = 0.8
        if (particle.opacity < 0.1) particle.opacity = 0.1

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 2
        )
        gradient.addColorStop(0, `rgba(57, 255, 20, ${particle.opacity})`)
        gradient.addColorStop(1, `rgba(57, 255, 20, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(
          particle.x - particle.radius * 2,
          particle.y - particle.radius * 2,
          particle.radius * 4,
          particle.radius * 4
        )
      })

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
