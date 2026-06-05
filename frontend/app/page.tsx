'use client'

import { useRef, useState } from 'react'
import Webcam from 'react-webcam'

export default function Home()
{
  const webcamRef = useRef<Webcam>(null)

  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [prediction, setPrediction] = useState('')
  const [confidence, setConfidence] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)

  const [useCamera, setUseCamera] = useState(false)

  const backendUrl =
    'https://banana-backend-eqj6.onrender.com/predict'

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
  {
    if (e.target.files && e.target.files[0])
    {
      const file = e.target.files[0]

      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const captureImage = async () =>
  {
    if (!webcamRef.current) return

    const screenshot =
      webcamRef.current.getScreenshot()

    if (!screenshot) return

    const blob = await fetch(screenshot).then((res) =>
      res.blob()
    )

    const file = new File([blob], 'capture.jpg', {
      type: 'image/jpeg',
    })

    setImage(file)
    setPreview(screenshot)
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

      const response = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      })

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

  const getColor = () =>
  {
    if (prediction === 'Unripe')
    {
      return 'text-green-400'
    }

    if (prediction === 'Ripe')
    {
      return 'text-yellow-300'
    }

    if (prediction === 'Overripe')
    {
      return 'text-orange-400'
    }

    return 'text-white'
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-6xl font-extrabold text-yellow-400 mb-12 text-center">
        BananaSense AI
      </h1>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          <div className="flex gap-4 mb-6">

            <button
              onClick={() => setUseCamera(false)}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                !useCamera
                  ? 'bg-yellow-400 text-black'
                  : 'bg-zinc-800'
              }`}
            >
              Upload Image
            </button>

            <button
              onClick={() => setUseCamera(true)}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                useCamera
                  ? 'bg-yellow-400 text-black'
                  : 'bg-zinc-800'
              }`}
            >
              Live Camera
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
                  className="w-full h-72 object-cover rounded-2xl border border-zinc-700"
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
              ? 'Analyzing Banana...'
              : 'Predict Banana Ripeness'}
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-center">

          <h2 className="text-4xl font-bold mb-8 text-green-400">
            Prediction Result
          </h2>

          {prediction ? (
            <div>

              <div className="mb-6">

                <p className="text-2xl mb-2">
                  Prediction
                </p>

                <p
                  className={`text-5xl font-extrabold ${getColor()}`}
                >
                  {prediction}
                </p>
              </div>

              <div>

                <p className="text-2xl mb-3">
                  Confidence
                </p>

                <div className="w-full bg-zinc-700 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-green-400 h-6"
                    style={{
                      width: `${confidence}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-3xl font-bold">
                  {confidence}%
                </p>
              </div>
            </div>
          ) : (
            <p className="text-zinc-400 text-xl">
              Upload or capture a banana image to begin analysis.
            </p>
          )}
        </div>
      </div>

      <div className="mt-14 text-zinc-500 text-center max-w-2xl">
        AI-powered banana ripeness detection system using Deep Learning,
        TensorFlow, FastAPI, Next.js and Computer Vision.
      </div>
    </main>
  )
}