'use client'

import { useState } from 'react'

export default function Home()
{
  const [image, setImage] = useState<File | null>(null)

  const [preview, setPreview] = useState('')

  const [prediction, setPrediction] = useState('')

  const [confidence, setConfidence] =
    useState<number | null>(null)

  const [loading, setLoading] = useState(false)

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

  const handleUpload = async () =>
  {
    if (!image)
    {
      alert('Please upload an image')

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

  const predictionColor = () =>
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center px-6 py-12">

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,0,0.15),transparent_40%)]" />

      <div className="relative z-10 w-full max-w-4xl">

        <div className="text-center mb-12">

          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-yellow-400">
            BananaSense AI
          </h1>

          <p className="mt-4 text-zinc-400 text-lg">
            Smart AI-powered banana ripeness detection
          </p>

        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">

          <div className="flex flex-col items-center">

            <label className="w-full max-w-xl border-2 border-dashed border-zinc-600 hover:border-yellow-400 transition-all rounded-2xl p-10 cursor-pointer text-center bg-black/30">

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div>

                <p className="text-2xl font-bold mb-2">
                  Upload Banana Image
                </p>

                <p className="text-zinc-400">
                  JPG, PNG supported
                </p>

              </div>

            </label>

            {preview && (
              <div className="mt-10">

                <img
                  src={preview}
                  alt="Preview"
                  className="w-80 h-80 object-cover rounded-3xl border border-zinc-700 shadow-2xl"
                />

              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-10 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              {loading
                ? 'Analyzing Banana...'
                : 'Predict Banana Ripeness'}
            </button>

            {prediction && (
              <div className="mt-12 w-full max-w-2xl bg-black/40 border border-zinc-700 rounded-3xl p-8 shadow-xl">

                <h2 className="text-4xl font-black mb-6 text-center text-white">
                  Prediction Result
                </h2>

                <div className="space-y-5">

                  <div className="flex items-center justify-between border-b border-zinc-700 pb-4">

                    <span className="text-zinc-400 text-xl">
                      Prediction
                    </span>

                    <span
                      className={`text-3xl font-black ${predictionColor()}`}
                    >
                      {prediction}
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-400 text-xl">
                      Confidence
                    </span>

                    <span className="text-3xl font-black text-cyan-400">
                      {confidence}%
                    </span>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  )
}