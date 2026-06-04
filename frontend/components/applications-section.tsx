'use client'

import { GlassCard } from './glass-card'
import { GradientText } from './gradient-text'
import { Tractor, Truck, Shield, BarChart3, Zap, Leaf } from 'lucide-react'

const applications = [
  {
    title: 'Smart Farming',
    description: 'Automate harvest timing decisions based on real-time ripeness data',
    icon: Tractor,
  },
  {
    title: 'Supply Chain',
    description: 'Optimize logistics and storage based on ripeness predictions',
    icon: Truck,
  },
  {
    title: 'Quality Control',
    description: 'Eliminate manual inspection and ensure consistent quality',
    icon: Shield,
  },
  {
    title: 'Yield Analytics',
    description: 'Predict yields and optimize farm planning with historical data',
    icon: BarChart3,
  },
  {
    title: 'Energy Efficiency',
    description: 'Reduce cooling costs by targeting ripeness stages precisely',
    icon: Zap,
  },
  {
    title: 'Sustainability',
    description: 'Minimize waste by predicting shelf life and rotation needs',
    icon: Leaf,
  },
]

export function ApplicationsSection() {
  return (
    <section id="applications" className="relative py-20 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-banana-yellow/5 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-emerald-accent/5 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-white/5 border border-neon-green/30 rounded-full">
            <span className="text-neon-green text-sm font-semibold">Real-World Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Transform <GradientText>Your Operations</GradientText>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            From farm to consumer, BananaSense AI optimizes every stage of the banana supply chain.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => {
            const Icon = app.icon
            return (
              <GlassCard key={index} hover={true} className="p-8 flex flex-col group">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-r from-neon-green to-emerald-accent group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all duration-300">
                  <Icon size={28} className="text-banana-dark" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{app.title}</h3>
                <p className="text-slate-400 text-sm flex-grow">{app.description}</p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-neon-green text-xs font-semibold">Learn more →</p>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
