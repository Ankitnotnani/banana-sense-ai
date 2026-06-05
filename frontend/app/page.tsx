'use client'

import { useEffect, useRef, useState } from 'react'

import Webcam from 'react-webcam'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'

type HistoryItem = {
  filename: string
  prediction: string
  confidence: number
  timestamp: string
}

export default function Home()
{
  const webcamRef = useRef<Webcam>(null)

  const [image, setImage] =
    useState<File | null>(null)

  const [preview, setPreview] =
    useState<string | null>(null)

  const [prediction, setPrediction] =
    useState('')

  const [confidence, setConfidence] =
    useState<number | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [useCamera, setUseCamera] =
    useState(false)

  const [history, setHistory] =
    useState<HistoryItem[]>([])

  const backend =
    'https://banana-backend-eqj6.onrender.com'

  useEffect(() =>
  {
    fetchHistory()
  }, [])

  const fetchHistory = async () =>
  {
    try
    {
      const response = await fetch(
        `${backend}/history`
      )

      const data = await response.json()

      setHistory(data)
    }
    catch (error)
    {
      console.error(error)
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
  {
    if (e.target.files && e.target.files[0])
    {
      const file = e.target.files[0]

      setImage(file)

      setPreview(
        URL.createObjectURL(file)
      )
    }
  }

  const captureImage = async () =>
  {
    if (!webcamRef.current)
    {
      return
    }

    const screenshot =
      webcamRef.current.getScreenshot()

    if (!screenshot)
    {
      return
    }

    const blob = await fetch(screenshot)
      .then((res) => res.blob())

    const file = new File(
      [blob],
      'capture.jpg',
      {
        type: 'image/jpeg',
      }
    )

    setImage(file)

    setPreview(screenshot)
  }

  const handlePrediction = async () =>
  {
    if (!image)
    {
      alert('Please upload image')
      return
    }

    setLoading(true)

    try
    {
      const formData = new FormData()

      formData.append('file', image)

      const response = await fetch(
        `${backend}/predict`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      setPrediction(data.prediction)

      setConfidence(data.confidence)

      fetchHistory()
    }
    catch (error)
    {
      console.error(error)

      alert('Prediction failed')
    }
    finally
    {
      setLoading(false)
    }
  }

  const getInsight = () =>
  {
    if (prediction === 'Unripe')
    {
      return 'This banana is still raw and ideal for transportation or storage.'
    }

    if (prediction === 'Ripe')
    {
      return 'This banana is perfectly ripe and ideal for eating.'
    }

    if (prediction === 'Overripe')
    {
      return 'This banana is overripe and best suited for smoothies or baking.'
    }

    return 'Upload a banana image to get AI-powered insights.'
  }

  const chartData = [
    {
      name: prediction,
      value: confidence || 0,
    },
    {
      name: 'Remaining',
      value: 100 - (confidence || 0),
    },
  ]

  const COLORS = ['#22c55e', '#27272a']

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-extrabold text-yellow-400 text-center mb-4">
          BananaSense AI
        </h1>

        <p className="text-center text-zinc-400 mb-14 text-xl">
          AI Powered Banana Ripeness Detection System
        </p>

        <div className="grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

              <div className="flex gap-4 mb-6">

                <button
                  onClick={() =>
                    setUseCamera(false)
                  }
                  className={`px-5 py-3 rounded-xl font-semibold transition ${
                    !useCamera
                      ? 'bg-yellow-400 text-black'
                      : 'bg-zinc-800'
                  }`}
                >
                  Upload
                </button>

                <button
                  onClick={() =>
                    setUseCamera(true)
                  }
                  className={`px-5 py-3 rounded-xl font-semibold transition ${
                    useCamera
                      ? 'bg-yellow-400 text-black'
                      : 'bg-zinc-800'
                  }`}
                >
                  Webcam
                </button>
              </div>

              {!useCamera ? (
                <div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-6"
                  />

                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-96 object-cover rounded-2xl border border-zinc-700"
                    />
                  )}
                </div>
              ) : (
                <div>

                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-2xl w-full"
                  />

                  <button
                    onClick={captureImage}
                    className="mt-5 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold transition"
                  >
                    Capture Image
                  </button>
                </div>
              )}

              <button
                onClick={handlePrediction}
                disabled={loading}
                className="mt-8 w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-2xl text-xl font-bold transition"
              >
                {loading
                  ? 'AI Analyzing Banana...'
                  : 'Predict Banana Ripeness'}
              </button>

              {loading && (
                <div className="mt-6 flex justify-center">

                  <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />

                </div>
              )}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-4xl font-bold text-green-400 mb-8">
                Prediction Result
              </h2>

              {prediction ? (
                <div>

                  <p className="text-5xl font-extrabold text-yellow-300 mb-6">
                    {prediction}
                  </p>

                  <div className="w-full bg-zinc-700 rounded-full h-6 overflow-hidden mb-4">

                    <div
                      className="bg-green-400 h-6 transition-all duration-700"
                      style={{
                        width: `${confidence}%`,
                      }}
                    />

                  </div>

                  <p className="text-3xl font-bold mb-8">
                    {confidence}%
                  </p>

                  <div className="bg-zinc-800 rounded-2xl p-6">

                    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                      AI Insights
                    </h3>

                    <p className="text-zinc-300 leading-8 text-lg">
                      {getInsight()}
                    </p>

                  </div>

                </div>
              ) : (
                <p className="text-zinc-400 text-xl">
                  Upload image to start AI prediction.
                </p>
              )}
            </div>

            {prediction && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

                <h2 className="text-4xl font-bold text-pink-400 mb-10">
                  Analytics Dashboard
                </h2>

                <div className="grid lg:grid-cols-2 gap-10 items-center">

                  <div className="grid grid-cols-2 gap-6">

                    <div className="bg-zinc-800 rounded-2xl p-6 text-center">

                      <p className="text-zinc-400 mb-2">
                        Quality Score
                      </p>

                      <p className="text-4xl font-bold text-green-400">
                        {Math.round(confidence || 0)}
                      </p>

                    </div>

                    <div className="bg-zinc-800 rounded-2xl p-6 text-center">

                      <p className="text-zinc-400 mb-2">
                        Total Scans
                      </p>

                      <p className="text-4xl font-bold text-cyan-400">
                        {history.length}
                      </p>

                    </div>

                    <div className="bg-zinc-800 rounded-2xl p-6 text-center">

                      <p className="text-zinc-400 mb-2">
                        Prediction
                      </p>

                      <p className="text-2xl font-bold text-yellow-300">
                        {prediction}
                      </p>

                    </div>

                    <div className="bg-zinc-800 rounded-2xl p-6 text-center">

                      <p className="text-zinc-400 mb-2">
                        Confidence
                      </p>

                      <p className="text-3xl font-bold text-pink-400">
                        {confidence}%
                      </p>

                    </div>

                  </div>

                  <div className="h-72">

                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>

                        <Pie
                          data={chartData}
                          dataKey="value"
                          outerRadius={100}
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index]}
                            />
                          ))}
                        </Pie>

                      </PieChart>
                    </ResponsiveContainer>

                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl h-fit">

            <h2 className="text-3xl font-bold text-orange-400 mb-8">
              Recent Predictions
            </h2>

            <div className="space-y-5">

              {history.length === 0 ? (
                <p className="text-zinc-400">
                  No predictions yet
                </p>
              ) : (
                history.map((item, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700"
                  >

                    <p className="text-lg font-bold text-yellow-300 mb-2">
                      {item.prediction}
                    </p>

                    <p className="text-zinc-400 text-sm mb-1">
                      {item.filename}
                    </p>

                    <p className="text-cyan-400 font-semibold mb-2">
                      {item.confidence}%
                    </p>

                    <p className="text-zinc-500 text-sm">
                      {item.timestamp}
                    </p>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-zinc-500 max-w-3xl mx-auto leading-8">
          BananaSense AI combines Deep Learning, TensorFlow,
          FastAPI, Next.js and Computer Vision to classify
          banana ripeness in real-time using AI.
        </div>
      </div>
    </main>
  )
}