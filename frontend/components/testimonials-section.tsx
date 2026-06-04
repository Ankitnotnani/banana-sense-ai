'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GlassmorphismCard } from './glassmorphism-card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria González',
    role: 'Farm Manager, Verde Farms',
    content: 'BananaSense AI has transformed our harvest process. We reduced waste by 40% in just three months.',
    rating: 5,
  },
  {
    name: 'Ahmed Hassan',
    role: 'Supply Chain Director, Tropical Harvest',
    content: 'The accuracy is incredible. We now have real-time visibility across our entire banana network.',
    rating: 5,
  },
  {
    name: 'Emma Weber',
    role: 'Operations Lead, Eco Plantations',
    content: 'The integration was seamless, and the ROI came faster than expected. Highly recommended!',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="about" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Hear from farms and companies transforming their operations
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassmorphismCard className="h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-neon-yellow text-neon-yellow"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/80 mb-6 flex-1">&quot;{testimonial.content}&quot;</p>

                {/* Author */}
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
