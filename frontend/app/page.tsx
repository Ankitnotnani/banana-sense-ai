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

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16">

        <div className="text-center mb-14">

          <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">
            BananaSense AI
          </h1>

          <p className="mt-6 text-zinc-400 text-xl max-w-2xl">
            AI powered banana ripeness prediction using deep learning
          </p>

        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold mb-8">
              Upload Image
            </h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-600 hover:border-yellow-400 transition-all rounded-3xl p-10 cursor-pointer min-h-[320px]">

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
                  className="w-full max-h-[300px] object-cover rounded-2xl"
                />
              ) : (
                <div className="text-center">

                  <div className="text-7xl mb-4">
                    🍌
                  </div>

                  <p className="text-2xl font-bold">
                    Drag & Drop Banana Image
                  </p>

                  <p className="text-zinc-400 mt-3">
                    JPG, PNG supported
                  </p>

                </div>
              )}

            </label>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-8 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-2xl text-xl transition-all hover:scale-[1.02] active:scale-95 shadow-2xl"
            >
              {loading
                ? 'Analyzing Banana...'
                : 'Predict Ripeness'}
            </button>

          </div>

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">

            <div>

              <h2 className="text-3xl font-bold mb-10">
                Prediction Result
              </h2>

              {prediction ? (
                <div>

                  <div className="text-8xl mb-6">
                    {getPredictionEmoji()}
                  </div>

                  <h3
                    className={`text-5xl font-black mb-6 ${getPredictionColor()}`}
                  >
                    {prediction}
                  </h3>

                  <div className="space-y-6">

                    <div>

                      <div className="flex justify-between mb-2">

                        <span className="text-zinc-400">
                          Confidence
                        </span>

                        <span className="font-bold">
                          {confidence}%
                        </span>

                      </div>

                      <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                        <div
                          className="bg-gradient-to-r from-yellow-400 to-green-400 h-4 rounded-full"
                          style={{
                            width: `${confidence}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">

                  <div className="text-8xl mb-6 opacity-40">
                    🤖
                  </div>

                  <p className="text-2xl text-zinc-400">
                    Upload an image to begin prediction
                  </p>

                </div>
              )}

            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">

              <div className="bg-black/40 rounded-2xl p-5 text-center border border-zinc-800">
                <div className="text-3xl mb-2">
                  🟢
                </div>

                <p className="font-bold">
                  Unripe
                </p>
              </div>

              <div className="bg-black/40 rounded-2xl p-5 text-center border border-zinc-800">
                <div className="text-3xl mb-2">
                  🍌
                </div>

                <p className="font-bold">
                  Ripe
                </p>
              </div>

              <div className="bg-black/40 rounded-2xl p-5 text-center border border-zinc-800">
                <div className="text-3xl mb-2">
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