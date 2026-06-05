'use client'

import { useState } from 'react'

export default function Home()
{
  const [image, setImage] = useState<File | null>(null)
  const [prediction, setPrediction] = useState('')
  const [confidence, setConfidence] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')

  const handleImageChange = (
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

  const handleUpload = async () =>
  {
    if (!image)
    {
      alert('Please select an image first')
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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">

      <h1 className="text-5xl font-bold mb-10 text-yellow-400">
        BananaSense AI
      </h1>

      <div className="w-full max-w-2xl border border-gray-700 rounded-2xl p-8 bg-zinc-900">

        <div className="flex flex-col items-center">

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-6"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-72 rounded-xl mb-6 border border-gray-700"
            />
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl transition-all"
          >
            {loading
              ? 'Predicting...'
              : 'Predict Banana Ripeness'}
          </button>

          {prediction && (
            <div className="mt-10 w-full border border-gray-700 rounded-xl p-6 bg-black">

              <h2 className="text-3xl font-bold mb-4 text-green-400">
                Prediction Result
              </h2>

              <p className="text-xl mb-2">
                <strong>Prediction:</strong> {prediction}
              </p>

              <p className="text-xl">
                <strong>Confidence:</strong> {confidence}%
              </p>

            </div>
          )}

        </div>

      </div>

    </main>
  )
}