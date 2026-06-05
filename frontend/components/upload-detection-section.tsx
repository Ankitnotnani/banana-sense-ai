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

interface PredictionResult
{
  id: string

  name: string

  file: File

  preview: string

  ripeness:
    | 'unripe'
    | 'ripening'
    | 'ripe'
    | 'overripe'

  confidence: number

  quality_score?: number

  shelf_life?: string

  risk_level?: string

  storage?: string

  recommendation?: string

  summary?: string

  processing: boolean
}

const ripenessColors = {

  unripe: {
    bg: 'bg-blue-900/30',
    border: 'border-blue-500/40',
    text: 'text-blue-300',
    label: 'Unripe',
  },

  ripening: {
    bg: 'bg-yellow-900/30',
    border: 'border-yellow-400/40',
    text: 'text-yellow-300',
    label: 'Ripening',
  },

  ripe: {
    bg: 'bg-green-900/30',
    border: 'border-green-500/40',
    text: 'text-green-300',
    label: 'Ripe',
  },

  overripe: {
    bg: 'bg-orange-900/30',
    border: 'border-orange-500/40',
    text: 'text-orange-300',
    label: 'Overripe',
  },
}

const loadingStages = [

  'Uploading image...',

  'Initializing AI engine...',

  'Scanning banana texture...',

  'Running CNN inference...',

  'Generating AI insights...',
]

export function UploadDetectionSection()
{
  const [predictions, setPredictions] =
    useState<PredictionResult[]>([])

  const [isProcessing, setIsProcessing] =
    useState(false)

  const [loadingText, setLoadingText] =
    useState('')

  const onDrop = useCallback(
    async (acceptedFiles: File[]) =>
    {
      const newPredictions:
        PredictionResult[] =
        acceptedFiles.map((file) =>
        {
          const preview =
            URL.createObjectURL(file)

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

      setPredictions((prev) => [
        ...prev,
        ...newPredictions,
      ])

      setIsProcessing(true)

      let stage = 0

      const loadingInterval =
        setInterval(() =>
        {
          setLoadingText(
            loadingStages[
              stage %
                loadingStages.length
            ]
          )

          stage++
        }, 1000)

      for (const pred of newPredictions)
      {
        const formData =
          new FormData()

        formData.append(
          'file',
          pred.file
        )

        try
        {
          const response =
            await fetch(
              'https://banana-backend-eqj6.onrender.com/predict',
              {
                method: 'POST',

                body: formData,
              }
            )

          const data =
            await response.json()

          await new Promise(
            (resolve) =>
              setTimeout(resolve, 500)
          )

          let ripeness:
            | 'unripe'
            | 'ripening'
            | 'ripe'
            | 'overripe'

          const prediction =
            data.prediction?.toLowerCase()

          if (
            prediction === 'unripe'
          )
          {
            ripeness = 'unripe'
          }
          else if (
            prediction === 'ripe'
          )
          {
            ripeness = 'ripe'
          }
          else if (
            prediction ===
            'overripe'
          )
          {
            ripeness = 'overripe'
          }
          else
          {
            ripeness = 'ripening'
          }

          setPredictions((prev) =>
            prev.map((p) =>
              p.id === pred.id
                ? {
                    ...p,

                    processing: false,

                    ripeness,

                    confidence:
                      Number(
                        data.confidence
                      ),

                    quality_score:
                      data.quality_score,

                    shelf_life:
                      data.shelf_life,

                    risk_level:
                      data.risk_level,

                    storage:
                      data.storage,

                    recommendation:
                      data.recommendation,

                    summary:
                      data.summary,
                  }
                : p
            )
          )
        }
        catch (error)
        {
          console.error(
            'Prediction Error:',
            error
          )
        }
      }

      clearInterval(loadingInterval)

      setLoadingText('')

      setIsProcessing(false)
    },
    []
  )

  const {
    getRootProps,

    getInputProps,

    isDragActive,
  } = useDropzone({

    onDrop,

    accept: {
      'image/*': [
        '.jpeg',
        '.jpg',
        '.png',
        '.webp',
      ],
    },
  })

  return (

    <section
      id="detection"
      className="relative py-24 px-6 overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">

          <div className="inline-block mb-4 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full">

            <span className="text-yellow-400 text-sm font-semibold">

              AI Detection Engine

            </span>

          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">

            AI-Powered{' '}

            <GradientText>

              Ripeness Detection

            </GradientText>

          </h2>

          <p className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">

            Advanced computer vision system
            for real-time banana ripeness
            analysis and agricultural quality
            monitoring.

          </p>

        </div>

        {/* Upload */}
        <div className="mb-14">

          <GlassCard>

            <div
              {...getRootProps()}
              className={`relative p-12 border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden ${
                isDragActive
                  ? 'border-yellow-400 bg-yellow-400/10'
                  : 'border-zinc-700 hover:border-yellow-400/40'
              }`}
            >

              <input
                {...getInputProps()}
              />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-5">

                {isProcessing ? (

                  <div className="relative">

                    <Loader
                      size={60}
                      className="text-yellow-400 animate-spin"
                    />

                    <Sparkles
                      size={28}
                      className="absolute -top-2 -right-2 text-green-400 animate-pulse"
                    />

                  </div>

                ) : (

                  <Upload
                    size={52}
                    className="text-yellow-400"
                  />
                )}

                <div className="text-center">

                  <p className="text-2xl font-semibold mb-2 text-white">

                    {isProcessing
                      ? 'Analyzing Image'
                      : isDragActive
                      ? 'Drop images here'
                      : 'Upload Banana Images'}

                  </p>

                  <p className="text-zinc-400">

                    {isProcessing
                      ? loadingText
                      : 'Drag & drop or click to upload banana images'}

                  </p>

                </div>

              </div>

            </div>

          </GlassCard>

        </div>

        {/* Results */}
        {predictions.length > 0 && (

          <div className="space-y-8">

            <h3 className="text-3xl font-bold text-white">

              Detection Results

            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {predictions.map(
                (pred) =>
                {
                  const colors =
                    ripenessColors[
                      pred.ripeness
                    ]

                  return (

                    <GlassCard
                      key={pred.id}
                      className="overflow-hidden hover:-translate-y-2 transition-all duration-500"
                    >

                      <div className="relative">

                        {/* Image */}
                        <div className="relative h-56 bg-zinc-950 overflow-hidden">

                          <img
                            src={
                              pred.preview
                            }
                            alt={pred.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />

                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-5">

                          <p className="text-sm font-medium truncate text-zinc-400">

                            {pred.name}

                          </p>

                          <div
                            className={`px-4 py-3 rounded-2xl border ${colors.bg} ${colors.border} flex items-center justify-between`}
                          >

                            <span
                              className={`font-semibold ${colors.text}`}
                            >

                              {
                                colors.label
                              }

                            </span>

                            <CheckCircle
                              size={18}
                              className={
                                colors.text
                              }
                            />

                          </div>

                          {/* Confidence */}
                          <div className="space-y-2">

                            <div className="flex items-center justify-between text-sm">

                              <span className="text-zinc-500">

                                Confidence

                              </span>

                              <span className="text-yellow-400 font-semibold">

                                {Math.round(
                                  pred.confidence
                                )}
                                %

                              </span>

                            </div>

                            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">

                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-700"
                                style={{
                                  width: `${pred.confidence}%`,
                                }}
                              />

                            </div>

                          </div>

                          {/* AI Insights */}
                          <div className="space-y-4 pt-4 border-t border-zinc-800">

                            <div className="flex items-center justify-between">

                              <span className="text-zinc-500 text-sm">

                                Quality Score

                              </span>

                              <span className="text-green-400 font-semibold">

                                {pred.quality_score}/100

                              </span>

                            </div>

                            <div className="flex items-center justify-between">

                              <span className="text-zinc-500 text-sm">

                                Shelf Life

                              </span>

                              <span className="text-yellow-400 font-semibold">

                                {pred.shelf_life}

                              </span>

                            </div>

                            <div className="flex items-center justify-between">

                              <span className="text-zinc-500 text-sm">

                                Risk Level

                              </span>

                              <span className={`font-semibold ${
                                pred.risk_level === 'Low'
                                  ? 'text-green-400'
                                  : pred.risk_level === 'Medium'
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                              }`}>

                                {pred.risk_level}

                              </span>

                            </div>

                            <div>

                              <p className="text-zinc-500 text-sm mb-2">

                                Storage Advice

                              </p>

                              <p className="text-zinc-300 text-sm leading-relaxed">

                                {pred.storage}

                              </p>

                            </div>

                            <div>

                              <p className="text-zinc-500 text-sm mb-2">

                                AI Recommendation

                              </p>

                              <p className="text-zinc-300 text-sm leading-relaxed">

                                {pred.recommendation}

                              </p>

                            </div>

                            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">

                              <p className="text-sm text-zinc-300 italic leading-relaxed">

                                {pred.summary}

                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </GlassCard>
                  )
                }
              )}

            </div>

          </div>
        )}

      </div>

    </section>
  )
}