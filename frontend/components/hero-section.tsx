'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { GradientText } from './gradient-text'

import { SectionReveal } from './section-reveal'

interface AnalyticsData
{
  total_predictions: number

  ripe: number

  unripe: number

  overripe: number
}

export function HeroSection()
{
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null)

  useEffect(() =>
  {
    fetch(
      'https://banana-backend-eqj6.onrender.com/analytics'
    )
      .then((res) => res.json())

      .then((data) =>
        setAnalytics(data)
      )

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

        {/* Background */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl opacity-40" />

        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-400/5 rounded-full blur-3xl opacity-30" />

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
            className="inline-block mb-6 px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-full"
          >

            <span className="text-yellow-400 text-sm font-semibold tracking-wide">

              Enterprise AI Detection Platform

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
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance"
          >

            Intelligent Banana
            <br />

            <GradientText>
              Ripeness Detection
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
            className="text-base sm:text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >

            AI-powered banana ripeness analysis using
            TensorFlow, Computer Vision, FastAPI and
            Next.js for real-time agricultural quality assessment.

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

            <button className="px-8 py-4 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all duration-300">

              Start Detection

            </button>

            <button className="px-8 py-4 rounded-xl border border-zinc-700 text-white hover:bg-zinc-900 transition-all duration-300">

              View Analytics

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
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-zinc-800"
          >

            {/* Total */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-400/20 transition-all duration-300">

              <div className="text-4xl font-bold text-yellow-400 mb-2">

                {analytics
                  ? analytics.total_predictions
                  : '...'}

              </div>

              <div className="text-zinc-500 text-sm">

                Total Scans

              </div>

            </div>

            {/* Ripe */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-green-400/20 transition-all duration-300">

              <div className="text-4xl font-bold text-green-400 mb-2">

                {analytics
                  ? analytics.ripe
                  : '...'}

              </div>

              <div className="text-zinc-500 text-sm">

                Ripe Bananas

              </div>

            </div>

            {/* Overripe */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-400/20 transition-all duration-300">

              <div className="text-4xl font-bold text-orange-400 mb-2">

                {analytics
                  ? analytics.overripe
                  : '...'}

              </div>

              <div className="text-zinc-500 text-sm">

                Overripe Bananas

              </div>

            </div>

          </motion.div>
        </div>
      </section>

    </SectionReveal>
  )
}