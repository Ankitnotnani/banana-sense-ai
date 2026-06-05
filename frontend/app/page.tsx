'use client'

import { useRef, useState } from 'react'

import Webcam from 'react-webcam'

export default function Home()
{
  const webcamRef = useRef<Webcam>(null)

  const [image, setImage] =
    useState<File | null>(null)

  const [preview, setPreview] =
    useState('')

  const [prediction, setPrediction] =
    useState('')

  const [confidence, setConfidence] =
    useState<number | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [cameraMode, setCameraMode] =
    useState(false)

  const handleImageChange = (
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

    setPreview(screenshot)

    const blob = await fetch(screenshot)
      .then((res) => res.blob())

    const file = new File(
      [blob],
      'webcam.jpg',
      {
        type: 'image/jpeg',
      }
    )

    setImage(file)
  }

  const handlePrediction = async () =>
  {
    if (!image)
    {
      alert('Please upload or capture an image')

      return
    }

    setLoading(true)

    try
    {
      const formData = new FormData()

      formData.append('file', image)

      const response = await fetch(
        'https://banana-backend-eqj6.onrender.com/predict',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      setPrediction(data.prediction)

      setConfidence(data.confidence)
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

  const getPredictionColor = () =>
  {
    if (prediction === 'Ripe')
    {
      return 'text-yellow-400'
    }

    if (prediction === 'Unripe')
    {
      return 'text-green-400'
    }

    if (prediction === 'Overripe')
    {
      return 'text-red-400'
    }

    return 'text-white'
  }

  const getPredictionEmoji = () =>
  {
    if (prediction === 'Ripe')
    {
      return '🍌'
    }

    if (prediction === 'Unripe')
    {
      return '🟢'
    }

    if (prediction === 'Overripe')
    {
      return '🟤'
    }

    return '🤖'
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-green-500/10" />

      <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
            BananaSense AI
          </h1>

          <p className="mt-6 text-zinc-400 text-xl max-w-3xl mx-auto">
            AI powered banana ripeness detection using deep learning and computer vision
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="flex gap-4 mb-8">

              <button
                onClick={() =>
                  setCameraMode(false)
                }
                className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                  !cameraMode
                    ? 'bg-yellow-400 text-black'
                    : 'bg-zinc-800 text-white'
                }`}
              >
                Upload Image
              </button>

              <button
                onClick={() =>
                  setCameraMode(true)
                }
                className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                  cameraMode
                    ? 'bg-yellow-400 text-black'
                    : 'bg-zinc-800 text-white'
                }`}
              >
                Live Camera
              </button>

            </div>

            {!cameraMode ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-600 hover:border-yellow-400 transition-all rounded-3xl p-10 cursor-pointer min-h-[400px]">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-[350px] object-cover rounded-3xl"
                  />
                ) : (
                  <div className="text-center">

                    <div className="text-8xl mb-6">
                      🍌
                    </div>

                    <p className="text-3xl font-black mb-3">
                      Upload Banana Image
                    </p>

                    <p className="text-zinc-400">
                      JPG, PNG supported
                    </p>

                  </div>
                )}

              </label>
            ) : (
              <div className="flex flex-col items-center">

                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-3xl w-full"
                />

                <button
                  onClick={captureImage}
                  className="mt-6 bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-2xl font-black transition-all"
                >
                  Capture Image
                </button>

              </div>
            )}

            <button
              onClick={handlePrediction}
              disabled={loading}
              className="mt-8 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-5 rounded-2xl text-xl transition-all hover:scale-[1.02] active:scale-95"
            >
              {loading
                ? 'Analyzing Banana...'
                : 'Predict Ripeness'}
            </button>

          </div>

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">

            <div>

              <h2 className="text-4xl font-black mb-10">
                Prediction Result
              </h2>

              {prediction ? (
                <div>

                  <div className="text-8xl mb-8">
                    {getPredictionEmoji()}
                  </div>

                  <h3
                    className={`text-6xl font-black mb-8 ${getPredictionColor()}`}
                  >
                    {prediction}
                  </h3>

                  <div className="mb-6">

                    <div className="flex justify-between mb-3">

                      <span className="text-zinc-400 text-lg">
                        Confidence
                      </span>

                      <span className="font-bold text-xl">
                        {confidence}%
                      </span>

                    </div>

                    <div className="w-full bg-zinc-800 rounded-full h-5 overflow-hidden">

                      <div
                        className="bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 h-5 rounded-full transition-all duration-700"
                        style={{
                          width: `${confidence}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">

                  <div className="text-8xl mb-8 opacity-40">
                    🤖
                  </div>

                  <p className="text-2xl text-zinc-400">
                    Upload or capture banana image
                  </p>

                </div>
              )}

            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">

              <div className="bg-black/40 rounded-2xl p-5 text-center border border-zinc-800">
                <div className="text-4xl mb-3">
                  🟢
                </div>

                <p className="font-bold">
                  Unripe
                </p>
              </div>

              <div className="bg-black/40 rounded-2xl p-5 text-center border border-zinc-800">
                <div className="text-4xl mb-3">
                  🍌
                </div>

                <p className="font-bold">
                  Ripe
                </p>
              </div>

              <div className="bg-black/40 rounded-2xl p-5 text-center border border-zinc-800">
                <div className="text-4xl mb-3">
                  🟤
                </div>

                <p className="font-bold">
                  Overripe
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}