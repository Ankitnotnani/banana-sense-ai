'use client'

import { useEffect, useState } from 'react'

type HistoryItem = {
  filename?: string
  prediction?: string
  confidence?: number
}

export default function Home()
{
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() =>
  {
    const fetchHistory = async () =>
    {
      try
      {
        const response = await fetch(
          'https://banana-backend-eqj6.onrender.com/history'
        )

        if (!response.ok)
        {
          setHistory([])
          return
        }

        const data = await response.json()

        if (Array.isArray(data))
        {
          setHistory(data)
        }
        else
        {
          setHistory([])
        }
      }
      catch (error)
      {
        console.error(error)
        setHistory([])
      }
      finally
      {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold mb-10">
        BananaSense AI
      </h1>

      <div className="w-full max-w-2xl border border-gray-700 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Prediction History
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No history available</p>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                className="border border-gray-600 rounded-xl p-4"
              >
                <p>
                  <strong>File:</strong>{' '}
                  {item.filename || 'Unknown'}
                </p>

                <p>
                  <strong>Prediction:</strong>{' '}
                  {item.prediction || 'Unknown'}
                </p>

                <p>
                  <strong>Confidence:</strong>{' '}
                  {item.confidence || 0}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}