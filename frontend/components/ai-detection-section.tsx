'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassmorphismCard } from './glassmorphism-card'

type RipenessLevel = 'unripe' | 'ripening' | 'ripe' | 'overripe' | null

const ripenessMeta = {
  unripe: { label: 'Unripe', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  ripening: { label: 'Ripening', color: 'text-neon-yellow', bgColor: 'bg-neon-yellow/20' },
  ripe: { label: 'Ripe', color: 'text-neon-green', bgColor: 'bg-neon-green/20' },
  overripe: { label: 'Overripe', color: 'text-red-400', bgColor: 'bg-red-500/20' },
}

export function AIDetectionSection() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [ripeness, setRipeness] = useState<RipenessLevel>(null)
  const [confidence, setConfidence] = useState(0)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
      // Simulate ML prediction
      setLoading(true)
      setTimeout(() => {
        const ripenessOptions: RipenessLevel[] = ['unripe', 'ripening', 'ripe', 'overripe']
        const randomRipeness = ripenessOptions[
          Math.floor(Math.random() * ripenessOptions.length)
        ] as RipenessLevel
        setRipeness(randomRipeness)
        setConfidence(85 + Math.random() * 14)
        setLoading(false)
      }, 2000)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files[0]) {
      const input = fileInputRef.current
      if (input) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(files[0])
        input.files = dataTransfer.files
        const event = new Event('change', { bubbles: true })
        input.dispatchEvent(event)
      }
    }
  }

  return (
    <section id="features" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">
              Real-Time Detection
            </span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Upload an image and let our AI analyze the ripeness level instantly with high precision
          </p>
        </motion.div>

        {/* Main Detection Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <GlassmorphismCard>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="h-96 border-2 border-dashed border-neon-green/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-neon-green/60 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Uploaded banana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <Upload size={32} className="text-neon-green" />
                    </div>
                    <div className="text-center">
                      <p className="text-foreground font-semibold">Drag and drop or click</p>
                      <p className="text-foreground/60 text-sm">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </GlassmorphismCard>
          </motion.div>

          {/* Results Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {loading && (
              <GlassmorphismCard className="flex-1 flex flex-col items-center justify-center gap-6">
                <div className="relative w-24 h-24">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, linear: true }}
                    className="absolute inset-0 border-4 border-transparent border-t-neon-green border-r-neon-yellow rounded-full"
                  />
                  <div className="absolute inset-2 border-2 border-neon-green/20 rounded-full" />
                </div>
                <p className="text-foreground text-center">Analyzing ripeness...</p>
              </GlassmorphismCard>
            )}

            {ripeness && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Ripeness Status */}
                <GlassmorphismCard>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Ripeness Level</span>
                      <Check size={20} className="text-neon-green" />
                    </div>
                    <div
                      className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                        ripenessMeta[ripeness].bgColor
                      } ${ripenessMeta[ripeness].color}`}
                    >
                      {ripenessMeta[ripeness].label}
                    </div>
                  </div>
                </GlassmorphismCard>

                {/* Confidence Meter */}
                <GlassmorphismCard>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/60">Confidence</span>
                      <span className="text-neon-green font-bold">{confidence.toFixed(1)}%</span>
                    </div>
                    <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-neon-green to-neon-yellow"
                      />
                    </div>
                  </div>
                </GlassmorphismCard>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-neon-green text-black hover:bg-neon-yellow"
                    onClick={() => {
                      setImagePreview(null)
                      setRipeness(null)
                      setConfidence(0)
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-neon-green/30 text-neon-green hover:bg-neon-green/10"
                  >
                    Export Report
                  </Button>
                </div>
              </motion.div>
            )}

            {!ripeness && !loading && (
              <GlassmorphismCard className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <AlertCircle size={32} className="text-foreground/40" />
                <p className="text-foreground/60">Upload an image to get started</p>
              </GlassmorphismCard>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
