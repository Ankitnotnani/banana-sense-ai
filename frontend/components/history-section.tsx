'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface HistoryItem {
  id: number
  filename: string
  prediction: string
  confidence: number
  timestamp: string
}

export function HistorySection() {

  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {

    fetch('https://banana-backend-eqj6.onrender.com/history')

      .then((res) => res.json())

      .then((data) => {

        const reversed = [...data].reverse()

        setHistory(reversed)

      })

      .catch((err) =>
        console.error(err)
      )

  }, [])

  const getLabel = (prediction: string) => {

    if (prediction === 'Class 0') {

      return {
        label: 'Overripe',
        color: 'text-orange-400',
        border: 'border-orange-400/30',
        bg: 'bg-orange-500/10',
      }
    }

    if (prediction === 'Class 1') {

      return {
        label: 'Ripe',
        color: 'text-neon-green',
        border: 'border-neon-green/30',
        bg: 'bg-neon-green/10',
      }
    }

    return {
      label: 'Unripe',
      color: 'text-blue-400',
      border: 'border-blue-400/30',
      bg: 'bg-blue-500/10',
    }
  }

  return (

    <section className="relative py-20 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >

          <h2 className="text-4xl md:text-5xl font-bold mb-4">

            Detection History

          </h2>

          <p className="text-slate-400 text-lg">

            Live prediction logs stored in database

          </p>

          {/* Download Button */}
          <div className="mt-6">

            <a
              href="https://banana-backend-eqj6.onrender.com/export-csv"
              target="_blank"
            >

              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold hover:scale-105 transition-all duration-300">

                Download CSV Report

              </button>

            </a>

          </div>

        </motion.div>

        {/* History Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {history.slice(0, 3).map((item, index) => {

            const status = getLabel(item.prediction)

            return (

              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border ${status.border} ${status.bg} p-6 backdrop-blur-xl`}
              >

                <div className="space-y-4">

                  {/* File */}
                  <div>

                    <p className="text-slate-400 text-sm mb-1">

                      File

                    </p>

                    <p className="text-white font-semibold truncate">

                      {item.filename}

                    </p>

                  </div>

                  {/* Prediction */}
                  <div>

                    <p className="text-slate-400 text-sm mb-1">

                      Prediction

                    </p>

                    <p className={`font-bold ${status.color}`}>

                      {status.label}

                    </p>

                  </div>

                  {/* Confidence */}
                  <div>

                    <p className="text-slate-400 text-sm mb-1">

                      Confidence

                    </p>

                    <p className="text-white font-semibold">

                      {Math.round(item.confidence)}%

                    </p>

                  </div>

                  {/* Timestamp */}
                  <div>

                    <p className="text-slate-400 text-sm mb-1">

                      Timestamp

                    </p>

                    <p className="text-slate-300 text-sm">

                      {new Date(item.timestamp).toLocaleString()}

                    </p>

                  </div>

                </div>

              </motion.div>
            )
          })}

        </div>

      </div>

    </section>
  )
}