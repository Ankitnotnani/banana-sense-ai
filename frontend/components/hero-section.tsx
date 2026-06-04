'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { GradientText } from './gradient-text'

import { SectionReveal } from './section-reveal'

interface AnalyticsData {

  total_scans: number

  ripe: number

  unripe: number

  overripe: number

  average_confidence: number
}

export function HeroSection() {

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null)

  useEffect(() => {

    fetch('http://127.0.0.1:8000/analytics')

      .then((res) => res.json())

      .then((data) => setAnalytics(data))

      .catch((err) =>
        console.error(
          'Analytics Error:',
          err
        )
      )

  }, [])

  return (

    <SectionReveal>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20">

        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl opacity-50 animate-float" />

        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-banana-yellow/5 rounded-full blur-3xl opacity-40 animate-float"
          style={{ animationDelay: '2s' }}
        />

        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-emerald-accent/5 rounded-full blur-3xl opacity-30 animate-float"
          style={{ animationDelay: '4s' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

          {/* Badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            className="inline-block mb-6 px-5 py-2 bg-white/5 border border-neon-green/30 rounded-full backdrop-blur-xl"
          >

            <span className="text-neon-green text-sm font-semibold tracking-wide">

              Enterprise AI Detection

            </span>

          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-balance"
          >

            Banana Ripeness{' '}

            <GradientText>

              Detection Perfected

            </GradientText>

          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >

            Enterprise-grade AI analysis with
            real-time ripeness classification,
            intelligent batch processing,
            and advanced analytics for
            farms, warehouses, and supply chains.

          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >

            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold hover:scale-105 hover:shadow-[0_0_35px_rgba(57,255,20,0.45)] transition-all duration-300">

              Try Detection Now

            </button>

            <button className="px-8 py-4 rounded-xl border border-neon-green/40 text-neon-green font-semibold hover:bg-neon-green/10 hover:border-neon-green transition-all duration-300">

              View Documentation

            </button>

          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.8,
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-white/10"
          >

            {/* Accuracy */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-neon-green/30 transition-all duration-300">

              <div className="text-3xl md:text-4xl font-display font-bold text-neon-green mb-2">

                {analytics
                  ? `${analytics.average_confidence}%`
                  : '...'}

              </div>

              <div className="text-slate-400 text-sm">

                Average Confidence

              </div>

            </div>

            {/* Total */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-neon-green/30 transition-all duration-300">

              <div className="text-3xl md:text-4xl font-display font-bold text-neon-green mb-2">

                {analytics
                  ? analytics.total_scans
                  : '...'}

              </div>

              <div className="text-slate-400 text-sm">

                Total Scans

              </div>

            </div>

            {/* Ripe */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-neon-green/30 transition-all duration-300">

              <div className="text-3xl md:text-4xl font-display font-bold text-neon-green mb-2">

                {analytics
                  ? analytics.ripe
                  : '...'}

              </div>

              <div className="text-slate-400 text-sm">

                Ripe Bananas

              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </SectionReveal>
  )
}