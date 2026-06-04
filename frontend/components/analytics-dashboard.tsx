'use client'

import { useEffect, useState } from 'react'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

interface HistoryItem {

  id: number

  filename: string

  prediction: string

  confidence: number

  timestamp: string
}

const COLORS = [
  '#39ff14',
  '#60a5fa',
  '#facc15',
  '#fb923c',
]

export function AnalyticsDashboard() {

  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {

    fetch('http://127.0.0.1:8000/history')

      .then((res) => res.json())

      .then((data) => {

        setHistory(data)

      })

      .catch((err) =>
        console.error(err)
      )

  }, [])

  const ripe = history.filter(
    (h) => h.prediction === 'Class 1'
  ).length

  const overripe = history.filter(
    (h) => h.prediction === 'Class 0'
  ).length

  const unripe = history.filter(
    (h) => h.prediction === 'Class 2'
  ).length

  const chartData = [

    {
      name: 'Ripe',
      value: ripe,
    },

    {
      name: 'Unripe',
      value: unripe,
    },

    {
      name: 'Overripe',
      value: overripe,
    },
  ]

  const confidenceData = history
    .slice(-6)
    .map((item) => ({

      name: item.filename.slice(0, 6),

      confidence: Math.round(item.confidence),
    }))

  return (

    <section className="relative py-20 md:py-24 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-green/5 blur-3xl rounded-full opacity-30" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-banana-yellow/5 blur-3xl rounded-full opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">

            AI Analytics Dashboard

          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">

            Real-time insights from banana ripeness detection

          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">

          {/* Total */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl hover:border-neon-green/30 transition-all duration-300">

            <h3 className="text-slate-400 mb-2 text-sm md:text-base">

              Total Predictions

            </h3>

            <p className="text-3xl md:text-4xl font-bold text-neon-green">

              {history.length}

            </p>

          </div>

          {/* Ripe */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl hover:border-neon-green/30 transition-all duration-300">

            <h3 className="text-slate-400 mb-2 text-sm md:text-base">

              Ripe

            </h3>

            <p className="text-3xl md:text-4xl font-bold text-neon-green">

              {ripe}

            </p>

          </div>

          {/* Unripe */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl hover:border-blue-400/30 transition-all duration-300">

            <h3 className="text-slate-400 mb-2 text-sm md:text-base">

              Unripe

            </h3>

            <p className="text-3xl md:text-4xl font-bold text-blue-400">

              {unripe}

            </p>

          </div>

          {/* Overripe */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl hover:border-orange-400/30 transition-all duration-300">

            <h3 className="text-slate-400 mb-2 text-sm md:text-base">

              Overripe

            </h3>

            <p className="text-3xl md:text-4xl font-bold text-orange-400">

              {overripe}

            </p>

          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">

          {/* Pie Chart */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl">

            <h3 className="text-xl md:text-2xl font-bold mb-6">

              Ripeness Distribution

            </h3>

            <div className="h-[320px] sm:h-[380px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={window.innerWidth < 640 ? 90 : 120}
                    label
                  >

                    {chartData.map((entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Bar Chart */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl">

            <h3 className="text-xl md:text-2xl font-bold mb-6">

              Confidence Analytics

            </h3>

            <div className="h-[320px] sm:h-[380px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={confidenceData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#888"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    stroke="#888"
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="confidence"
                    fill="#39ff14"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}