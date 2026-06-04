'use client'

import dynamic from 'next/dynamic'

const Navbar = dynamic(
  () => import('@/components/navbar').then((mod) => mod.Navbar),
  { ssr: false }
)

const HeroSection = dynamic(
  () => import('@/components/hero-section').then((mod) => mod.HeroSection),
  { ssr: false }
)

const UploadDetectionSection = dynamic(
  () =>
    import('@/components/upload-detection-section').then(
      (mod) => mod.UploadDetectionSection
    ),
  { ssr: false }
)

const TechnologySection = dynamic(
  () =>
    import('@/components/technology-section').then(
      (mod) => mod.TechnologySection
    ),
  { ssr: false }
)

const ApplicationsSection = dynamic(
  () =>
    import('@/components/applications-section').then(
      (mod) => mod.ApplicationsSection
    ),
  { ssr: false }
)

const HistorySection = dynamic(
  () =>
    import('@/components/history-section').then(
      (mod) => mod.HistorySection
    ),
  { ssr: false }
)

const WebcamSection = dynamic(
  () =>
    import('@/components/webcam-section').then(
      (mod) => mod.WebcamSection
    ),
  { ssr: false }
)

const AnalyticsDashboard = dynamic(
  () =>
    import('@/components/analytics-dashboard').then(
      (mod) => mod.AnalyticsDashboard
    ),
  { ssr: false }
)

const Footer = dynamic(
  () => import('@/components/footer').then((mod) => mod.Footer),
  { ssr: false }
)

export default function Home() {

  return (

    <main className="min-h-screen bg-banana-dark">

      <Navbar />

      <HeroSection />

      <UploadDetectionSection />

      <TechnologySection />

      <ApplicationsSection />

      <AnalyticsDashboard />

      <HistorySection />

      <WebcamSection />

      <Footer />

    </main>
  )
}