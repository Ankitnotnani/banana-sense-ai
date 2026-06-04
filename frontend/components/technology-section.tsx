'use client'

import { useState } from 'react'
import { GlassCard } from './glass-card'
import { GradientText } from './gradient-text'
import { Zap, Brain, Eye, TrendingUp, Shield } from 'lucide-react'

const stages = [
  {
    number: 1,
    title: 'Image Capture',
    description: 'High-resolution input from cameras, phones, or drones',
    icon: Eye,
    color: 'from-blue-400 to-neon-green',
  },
  {
    number: 2,
    title: 'Preprocessing',
    description: 'Normalization and augmentation for optimal analysis',
    icon: Zap,
    color: 'from-neon-green to-emerald-accent',
  },
  {
    number: 3,
    title: 'CNN Analysis',
    description: 'ResNet-152 neural network processes visual features',
    icon: Brain,
    color: 'from-emerald-accent to-banana-yellow',
  },
  {
    number: 4,
    title: 'Classification',
    description: 'Multi-class ripeness prediction with confidence scores',
    icon: TrendingUp,
    color: 'from-banana-yellow to-orange-400',
  },
  {
    number: 5,
    title: 'Verification',
    description: 'Quality checks and anomaly detection systems',
    icon: Shield,
    color: 'from-orange-400 to-neon-green',
  },
]

export function TechnologySection() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <section id="technology" className="relative py-20 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-white/5 border border-neon-green/30 rounded-full">
            <span className="text-neon-green text-sm font-semibold">Advanced AI Pipeline</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Powered by <GradientText>Neural Networks</GradientText>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Our proprietary CNN pipeline processes bananas through 5 stages of intelligent analysis.
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {stages.map((stage, index) => {
            const Icon = stage.icon
            const isActive = index === activeStage
            return (
              <div key={index} className="flex flex-col gap-4">
                <button
                  onClick={() => setActiveStage(index)}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'scale-105'
                      : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  <GlassCard hover={true} className="p-6 text-center cursor-pointer">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${stage.color} mb-4 mx-auto`}>
                      <Icon size={24} className="text-banana-dark" />
                    </div>
                    <div className="text-sm font-display font-bold mb-2">Step {stage.number}</div>
                    <div className="text-xs font-semibold text-neon-green mb-1">{stage.title}</div>
                  </GlassCard>
                </button>

                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="hidden md:flex items-center justify-center -my-2 flex-1">
                    <div className={`w-1 h-full bg-gradient-to-b from-neon-green/50 to-transparent ${isActive ? 'bg-neon-green' : ''}`} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Active Stage Details */}
        <GlassCard className="p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${stages[activeStage].color} mb-6`}>
                {(() => {
                  const Icon = stages[activeStage].icon
                  return <Icon size={40} className="text-banana-dark" />
                })()}
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">{stages[activeStage].title}</h3>
              <p className="text-slate-400 mb-4">{stages[activeStage].description}</p>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <GlassCard className="p-4">
                  <div className="text-sm text-slate-400 mb-1">Processing Time</div>
                  <div className="text-2xl font-bold text-neon-green">10-15ms</div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="text-sm text-slate-400 mb-1">Accuracy Rate</div>
                  <div className="text-2xl font-bold text-neon-green">99.8%</div>
                </GlassCard>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-green mt-1.5" />
                  <p className="text-slate-300">Advanced feature extraction and spatial analysis</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-green mt-1.5" />
                  <p className="text-slate-300">Real-time processing with optimized inference</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-green mt-1.5" />
                  <p className="text-slate-300">Continuous learning and model improvements</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'ResNet-152', value: 'Deep Learning' },
            { label: '500K+', value: 'Training Images' },
            { label: 'TensorFlow', value: 'Framework' },
            { label: 'Real-Time', value: 'Inference' },
          ].map((item, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className="text-sm text-neon-green font-semibold mb-2">{item.label}</div>
              <div className="text-lg font-display font-bold">{item.value}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
