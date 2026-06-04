'use client'

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

export function WebcamSection() {

  const webcamRef = useRef<Webcam>(null)

  const [cameraOn, setCameraOn] = useState(false)

  const [prediction, setPrediction] = useState('')

  const [confidence, setConfidence] = useState(0)

  const [loading, setLoading] = useState(false)

  const startCamera = () => {

    setPrediction('')

    setConfidence(0)

    setCameraOn(true)
  }

  const stopCamera = () => {

    setCameraOn(false)
  }

  const capture = async () => {

    if (!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()

    if (!imageSrc) return

    setLoading(true)

    try {

      // Convert base64 to blob
      const res = await fetch(imageSrc)

      const blob = await res.blob()

      const formData = new FormData()

      formData.append(
        'file',
        blob,
        'webcam.jpg'
      )

      // Send to backend
      const response = await fetch(
        'https://banana-backend-eqj6.onrender.com/predict',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      let label = ''

      if (data.prediction === 'Class 0') {

        label = 'Overripe'

      } else if (data.prediction === 'Class 1') {

        label = 'Ripe'

      } else {

        label = 'Unripe'
      }

      setPrediction(label)

      setConfidence(data.confidence)

      // Auto close camera after detection
      setTimeout(() => {

        setCameraOn(false)

      }, 1000)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <section className="relative py-20 overflow-hidden">

      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <h2 className="text-4xl md:text-5xl font-bold mb-4">

            Live Webcam Detection

          </h2>

          <p className="text-slate-400 text-lg">

            Real-time banana ripeness analysis using AI

          </p>

        </div>

        <div className="rounded-3xl overflow-hidden border border-neon-green/20 bg-white/5 backdrop-blur-xl p-6">

          {/* Camera OFF State */}
          {!cameraOn && (

            <div className="flex flex-col items-center justify-center py-20 space-y-6">

              <div className="w-24 h-24 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/20">

                <span className="text-4xl">

                  📷

                </span>

              </div>

              <button
                onClick={startCamera}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold hover:scale-105 transition-all duration-300"
              >

                Start Camera

              </button>

            </div>
          )}

          {/* Camera ON State */}
          {cameraOn && (

            <div>

              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-2xl"
              />

              {/* Controls */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">

                <button
                  onClick={capture}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-green to-emerald-accent text-banana-dark font-semibold hover:scale-105 transition-all duration-300"
                >

                  {loading
                    ? 'Analyzing...'
                    : 'Capture & Detect'}

                </button>

                <button
                  onClick={stopCamera}
                  className="px-8 py-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300"
                >

                  Close Camera

                </button>

              </div>

            </div>
          )}

          {/* Results */}
          {prediction && (

            <div className="mt-10 text-center space-y-4">

              <h3 className="text-4xl font-bold text-neon-green">

                {prediction}

              </h3>

              <p className="text-slate-300 text-lg">

                Confidence:
                {' '}
                {Math.round(confidence)}%

              </p>

            </div>
          )}

        </div>

      </div>

    </section>
  )
}