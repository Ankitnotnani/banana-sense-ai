'use client'

import dynamic from 'next/dynamic'

const AnalyticsDashboardComponent = dynamic(
  () => import('./analytics-dashboard-client'),
  {
    ssr: false,
  }
)

export function AnalyticsDashboard() {

  return <AnalyticsDashboardComponent />

}