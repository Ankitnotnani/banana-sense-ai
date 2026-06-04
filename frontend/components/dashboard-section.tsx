'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassmorphismCard } from './glassmorphism-card'

interface AnalyticsData {
  total_scans: number
  ripe: number
  unripe: number
  overripe: number
  average_confidence: number
}

export function DashboardSection() {

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchAnalytics()

  }, [])

  const fetchAnalytics = async () => {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/analytics'
      )

      const data = await response.json()

      setAnalytics(data)

    } catch (error) {

      console.error('Analytics Fetch Error:', error)

    } finally {

      setLoading(false)
    }
  }

  if (loading) {

    return (

      <section className="relative py-20">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-neon-green mb-4">

              Loading Analytics...

            </h2>

          </div>

        </div>

      </section>
    )
  }

  if (!analytics) return null

  const metrics = [

    {
      label: 'Total Scans',
      value: analytics.total_scans,
      color: 'text-neon-green',
    },

    {
      label: 'Average Confidence',
      value: `${analytics.average_confidence}%`,
      color: 'text-banana-yellow',
    },

    {
      label: 'Ripe Bananas',
      value: analytics.ripe,
      color: 'text-neon-green',
    },

    {
      label: 'Overripe Bananas',
      value: analytics.overripe,
      color: 'text-orange-400',
    },
  ]

  const total =
    analytics.ripe +
    analytics.unripe +
    analytics.overripe

  const ripePercent =
    total > 0
      ? Math.round((analytics.ripe / total) * 100)
      : 0

  const unripePercent =
    total > 0
      ? Math.round((analytics.unripe / total) * 100)
      : 0

  const overripePercent =
    total > 0
      ? Math.round((analytics.overripe / total) * 100)
      : 0

  return (

    <section id="dashboard" className="relative py-20 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-green/5 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-banana-yellow/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold mb-4">

            <span className="bg-gradient-to-r from-neon-green to-banana-yellow bg-clip-text text-transparent">

              AI Analytics Dashboard

            </span>

          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">

            Live banana ripeness detection analytics powered by TensorFlow and FastAPI.

          </p>

        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {metrics.map((metric, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >

              <GlassmorphismCard>

                <div className="space-y-3">

                  <p className="text-slate-400 text-sm">

                    {metric.label}

                  </p>

                  <p className={`text-3xl font-bold ${metric.color}`}>

                    {metric.value}

                  </p>

                </div>

              </GlassmorphismCard>

            </motion.div>
          ))}

        </div>

        {/* Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <GlassmorphismCard>

            <div className="space-y-6">

              <h3 className="text-2xl font-bold text-white">

                Ripeness Distribution

              </h3>

              {/* Ripe */}
              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-slate-300">
                    Ripe
                  </span>

                  <span className="text-neon-green font-semibold">
                    {ripePercent}%
                  </span>

                </div>

                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${ripePercent}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-neon-green to-emerald-400"
                  />

                </div>

              </div>

              {/* Unripe */}
              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-slate-300">
                    Unripe
                  </span>

                  <span className="text-blue-400 font-semibold">
                    {unripePercent}%
                  </span>

                </div>

                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${unripePercent}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />

                </div>

              </div>

              {/* Overripe */}
              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-slate-300">
                    Overripe
                  </span>

                  <span className="text-orange-400 font-semibold">
                    {overripePercent}%
                  </span>

                </div>

                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${overripePercent}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  />

                </div>

              </div>

            </div>

          </GlassmorphismCard>

          {/* Live System Status */}
          <GlassmorphismCard>

            <div className="space-y-6">

              <h3 className="text-2xl font-bold text-white">

                System Status

              </h3>

              <div className="space-y-4">

                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">

                  <span className="text-slate-300">
                    AI Model
                  </span>

                  <span className="text-neon-green font-semibold">
                    Online
                  </span>

                </div>

                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">

                  <span className="text-slate-300">
                    Backend API
                  </span>

                  <span className="text-neon-green font-semibold">
                    Connected
                  </span>

                </div>

                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">

                  <span className="text-slate-300">
                    Database
                  </span>

                  <span className="text-neon-green font-semibold">
                    Active
                  </span>

                </div>

                <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">

                  <span className="text-slate-300">
                    TensorFlow Engine
                  </span>

                  <span className="text-neon-green font-semibold">
                    Running
                  </span>

                </div>

              </div>

            </div>

          </GlassmorphismCard>

        </div>

      </div>

    </section>
  )
}