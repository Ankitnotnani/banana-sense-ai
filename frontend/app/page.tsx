'use client'

import { useState } from 'react'

export default function Home()
{
  const [image, setImage] = useState<File | null>(null)
  const [prediction, setPrediction] = useState('')
  const [confidence, setConfidence] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () =>
  {
    if (!image)
    {
      alert('Please select an image')
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

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold mb-10">
        BananaSense AI
      </h1>

      <div className="w-full max-w-xl border border-gray-700 rounded-2xl p-8">
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
          {
            if (e.target.files)
            {
              setImage(e.target.files[0])
            }
          }}
          className="mb-6"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
        >
          {loading ? 'Predicting...' : 'Predict Banana Ripeness'}
        </button>

        {prediction && (
          <div className="mt-8 border border-gray-600 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Prediction Result
            </h2>

            <p className="text-xl">
              <strong>Prediction:</strong> {prediction}
            </p>

            <p className="text-xl mt-2">
              <strong>Confidence:</strong> {confidence}%
            </p>
          </div>
        )}
      </div>
    </main>
  )
}