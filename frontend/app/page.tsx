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

  const fetchHistory = async () =>
  {
    try
    {
      const response = await fetch(
        'https://banana-backend-eqj6.onrender.com/history'
      )

      if (!response.ok)
      {
        console.error('Failed to fetch history')
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

  useEffect(() =>
  {
    fetchHistory()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        BananaSense AI
      </h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Prediction History
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No history available</p>
        ) : (
          <div className="space-y-4">
            {Array.isArray(history) &&
              history.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-xl p-4"
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
                    {item.confidence
                      ? `${item.confidence}%`
                      : 'N/A'}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  )
}