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

interface HistoryItem
{
  filename: string

  prediction: string

  confidence: number

  timestamp: string
}

const COLORS = [
  '#22c55e',
  '#3b82f6',
  '#f97316',
]

export default function AnalyticsDashboardComponent()
{
  const [history, setHistory] =
    useState<HistoryItem[]>([])

  useEffect(() =>
  {
    fetch(
      'https://banana-backend-eqj6.onrender.com/history'
    )
      .then((res) => res.json())

      .then((data) =>
      {
        setHistory(data)
      })

      .catch((err) =>
        console.error(err)
      )
  }, [])

  const ripe = history.filter(
    (h) =>
      h.prediction === 'Ripe'
  ).length

  const unripe =
    history.filter(
      (h) =>
        h.prediction ===
        'Unripe'
    ).length

  const overripe =
    history.filter(
      (h) =>
        h.prediction ===
        'Overripe'
    ).length

  const averageConfidence =
    history.length > 0
      ? Math.round(
          history.reduce(
            (acc, curr) =>
              acc +
              curr.confidence,
            0
          ) / history.length
        )
      : 0

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

  const confidenceData =
    history
      .slice(0, 6)
      .reverse()
      .map((item, index) => ({
        name: `Scan ${index + 1}`,

        confidence: Math.round(
          item.confidence
        ),
      }))

  return (

    <section
      id="analytics"
      className="relative py-24 overflow-hidden"
    >

      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/5 blur-3xl rounded-full opacity-30" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/5 blur-3xl rounded-full opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <div className="inline-block mb-4 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full">

            <span className="text-yellow-400 text-sm font-semibold">

              AI Analytics Engine

            </span>

          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-5">

            Analytics Dashboard

          </h2>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">

            Real-time AI insights and banana
            ripeness detection analytics.

          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          {/* Total */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-zinc-500 mb-3 text-sm">

              Total Predictions

            </h3>

            <p className="text-4xl font-bold text-yellow-400">

              {history.length}

            </p>

          </div>

          {/* Average */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-zinc-500 mb-3 text-sm">

              Avg Confidence

            </h3>

            <p className="text-4xl font-bold text-green-400">

              {averageConfidence}%

            </p>

          </div>

          {/* Ripe */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-zinc-500 mb-3 text-sm">

              Ripe

            </h3>

            <p className="text-4xl font-bold text-green-400">

              {ripe}

            </p>

          </div>

          {/* Overripe */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-zinc-500 mb-3 text-sm">

              Overripe

            </h3>

            <p className="text-4xl font-bold text-orange-400">

              {overripe}

            </p>

          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Pie Chart */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-8">

              Ripeness Distribution

            </h3>

            <div className="h-[380px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >

                    {chartData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Bar Chart */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-8">

              Confidence Analytics

            </h3>

            <div className="h-[380px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={confidenceData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#27272a"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#71717a"
                  />

                  <YAxis
                    stroke="#71717a"
                  />

                  <Tooltip />

                  <Bar
                    dataKey="confidence"
                    fill="#eab308"
                    radius={[
                      10,
                      10,
                      0,
                      0,
                    ]}
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