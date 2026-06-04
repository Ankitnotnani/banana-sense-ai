'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Upload,
  CheckCircle,
  Loader,
  Sparkles,
} from 'lucide-react'

import { GlassCard } from './glass-card'
import { GradientText } from './gradient-text'

interface PredictionResult {
  id: string
  name: string
  file: File
  preview: string
  ripeness: 'unripe' | 'ripening' | 'ripe' | 'overripe'
  confidence: number
  processing: boolean
}

const ripenessColors = {

  unripe: {
    bg: 'bg-blue-900/30',
    border: 'border-blue-500/50',
    text: 'text-blue-300',
    label: 'Unripe',
  },

  ripening: {
    bg: 'bg-yellow-900/30',
    border: 'border-yellow-400/50',
    text: 'text-yellow-300',
    label: 'Ripening',
  },

  ripe: {
    bg: 'bg-neon-green/30',
    border: 'border-neon-green/50',
    text: 'text-neon-green',
    label: 'Ripe',
  },

  overripe: {
    bg: 'bg-orange-900/30',
    border: 'border-orange-500/50',
    text: 'text-orange-300',
    label: 'Overripe',
  },
}

const loadingStages = [

  'Uploading image...',
  'Initializing AI engine...',
  'Scanning banana surface...',
  'Analyzing ripeness...',
  'Generating prediction...',
]

export function UploadDetectionSection() {

  const [predictions, setPredictions] = useState<PredictionResult[]>([])

  const [isProcessing, setIsProcessing] = useState(false)

  const [loadingText, setLoadingText] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {

    const newPredictions: PredictionResult[] = acceptedFiles.map((file) => {

      const preview = URL.createObjectURL(file)

      return {

        id: Math.random().toString(),

        name: file.name,

        file,

        preview,

        ripeness: 'unripe',

        confidence: 0,

        processing: true,
      }
    })

    setPredictions((prev) => [...prev, ...newPredictions])

    setIsProcessing(true)

    let stage = 0

    const loadingInterval = setInterval(() => {

      setLoadingText(
        loadingStages[stage % loadingStages.length]
      )

      stage++

    }, 1000)

    for (const pred of newPredictions) {

      const formData = new FormData()

      formData.append('file', pred.file)

      try {

        const response = await fetch(
          'http://127.0.0.1:8000/predict',
          {
            method: 'POST',
            body: formData,
          }
        )

        const data = await response.json()

await new Promise((resolve) =>
  setTimeout(resolve, 400)
)

        let ripeness:
          | 'unripe'
          | 'ripening'
          | 'ripe'
          | 'overripe'

        if (data.prediction === 'Class 0') {

          ripeness = 'overripe'

        } else if (data.prediction === 'Class 1') {

          ripeness = 'ripe'

        } else {

          ripeness = 'unripe'
        }

        setPredictions((prev) =>
          prev.map((p) =>
            p.id === pred.id
              ? {
                  ...p,
                  processing: false,
                  ripeness,
                  confidence: Number(data.confidence),
                }
              : p
          )
        )

      } catch (error) {

        console.error('Prediction Error:', error)
      }
    }

    clearInterval(loadingInterval)

    setLoadingText('')

    setIsProcessing(false)

  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({

    onDrop,

    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
  })

  const stats = {

    total: predictions.length,

    ripe: predictions.filter((p) => p.ripeness === 'ripe').length,

    unripe: predictions.filter((p) => p.ripeness === 'unripe').length,

    overripe: predictions.filter((p) => p.ripeness === 'overripe').length,
  }

  return (

    <section
      id="detection"
      className="relative py-20 px-6 overflow-hidden"
    >

      {/* Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl opacity-30" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-banana-yellow/5 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">

          <div className="inline-block mb-4 px-4 py-2 bg-white/5 border border-neon-green/30 rounded-full">

            <span className="text-neon-green text-sm font-semibold">

              Real-Time Detection

            </span>

          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">

            Upload & <GradientText>Analyze Instantly</GradientText>

          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">

            Drag and drop banana images for instant ripeness classification.

          </p>

        </div>

        {/* Upload Box */}
        <div className="mb-12">

          <GlassCard>

            <div
              {...getRootProps()}
              className={`relative p-12 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                isDragActive
                  ? 'border-neon-green bg-neon-green/10'
                  : 'border-neon-green/30 hover:border-neon-green/50'
              }`}
            >

              <input {...getInputProps()} />

              {/* Animated Scan Line */}
              {isProcessing && (

                <div className="absolute inset-0 overflow-hidden">

                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-pulse" />

                  <div className="absolute inset-0 bg-neon-green/5 animate-pulse" />

                </div>
              )}

              <div className="relative z-10 flex flex-col items-center justify-center space-y-4">

                {isProcessing ? (

                  <div className="relative">

                    <Loader
                      size={60}
                      className="text-neon-green animate-spin"
                    />

                    <Sparkles
                      size={28}
                      className="absolute -top-2 -right-2 text-banana-yellow animate-pulse"
                    />

                  </div>

                ) : (

                  <Upload
                    size={48}
                    className="text-neon-green"
                  />
                )}

                <div className="text-center">

                  <p className="text-2xl font-semibold mb-2">

                    {isProcessing
                      ? 'AI Processing'
                      : isDragActive
                      ? 'Drop images here'
                      : 'Drag & Drop Banana Images'}

                  </p>

                  <p className="text-slate-400">

                    {isProcessing
                      ? loadingText
                      : 'or click to select files'}

                  </p>

                </div>

                {/* Progress Bar */}
                {isProcessing && (

                  <div className="w-full max-w-md mt-6">

                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">

                      <div className="h-full bg-gradient-to-r from-neon-green via-emerald-400 to-banana-yellow animate-pulse w-full" />

                    </div>

                  </div>
                )}

              </div>

            </div>

          </GlassCard>

        </div>

        {/* Stats */}
        {predictions.length > 0 && (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

            <GlassCard className="p-4 text-center">

              <div className="text-2xl font-bold text-neon-green">
                {stats.total}
              </div>

              <div className="text-sm text-slate-400">
                Total Scanned
              </div>

            </GlassCard>

            <GlassCard className="p-4 text-center">

              <div className="text-2xl font-bold text-neon-green">
                {stats.ripe}
              </div>

              <div className="text-sm text-slate-400">
                Ripe
              </div>

            </GlassCard>

            <GlassCard className="p-4 text-center">

              <div className="text-2xl font-bold text-blue-300">
                {stats.unripe}
              </div>

              <div className="text-sm text-slate-400">
                Unripe
              </div>

            </GlassCard>

            <GlassCard className="p-4 text-center">

              <div className="text-2xl font-bold text-orange-300">
                {stats.overripe}
              </div>

              <div className="text-sm text-slate-400">
                Overripe
              </div>

            </GlassCard>

          </div>
        )}

        {/* Results */}
        {predictions.length > 0 && (

          <div className="space-y-6">

            <h3 className="text-2xl font-display font-bold">

              Detection Results

            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {predictions.map((pred) => {

                const colors = ripenessColors[pred.ripeness]

                return (

                  <GlassCard
                    key={pred.id}
                    className="overflow-hidden hover:scale-105 transition-all duration-500"
                  >

                    <div className="relative">

                      {/* Image */}
                      <div className="relative h-48 bg-banana-darker overflow-hidden">

                        <img
                          src={pred.preview}
                          alt={pred.name}
                          className="w-full h-full object-cover"
                        />

                        {pred.processing && (

                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">

                            <Loader
                              size={40}
                              className="text-neon-green animate-spin mb-4"
                            />

                            <p className="text-white font-medium">

                              AI Scanning...

                            </p>

                          </div>
                        )}

                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-4">

                        <p className="text-sm font-medium truncate text-slate-300">

                          {pred.name}

                        </p>

                        {!pred.processing && (

                          <>
                            <div
                              className={`px-4 py-3 rounded-xl border ${colors.bg} ${colors.border} flex items-center justify-between`}
                            >

                              <span className={`font-semibold ${colors.text}`}>

                                {colors.label}

                              </span>

                              <CheckCircle
                                size={18}
                                className={colors.text}
                              />

                            </div>

                            <div className="space-y-2">

                              <div className="flex items-center justify-between text-sm">

                                <span className="text-slate-400">

                                  Confidence

                                </span>

                                <span className="text-neon-green font-semibold">

                                  {Math.round(pred.confidence)}%

                                </span>

                              </div>

                              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">

                                <div
                                  className="h-full bg-gradient-to-r from-neon-green to-emerald-accent transition-all duration-700"
                                  style={{ width: `${pred.confidence}%` }}
                                />

                              </div>

                            </div>
                          </>
                        )}

                      </div>

                    </div>

                  </GlassCard>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {predictions.length === 0 && !isProcessing && (

          <div className="text-center py-12">

            <p className="text-slate-400 text-lg">

              No images uploaded yet.

            </p>

          </div>
        )}

      </div>

    </section>
  )
}