import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { UploadDetectionSection } from '@/components/upload-detection-section'
import { TechnologySection } from '@/components/technology-section'
import { ApplicationsSection } from '@/components/applications-section'
import { Footer } from '@/components/footer'
import { HistorySection } from '@/components/history-section'
import { WebcamSection } from '@/components/webcam-section'
import { AnalyticsDashboard } from '@/components/analytics-dashboard-client'

export default function Home() {

  return (

    <main className="min-h-screen bg-banana-dark">

      <Navbar />

      <HeroSection />

      <UploadDetectionSection />

      <TechnologySection />

      <ApplicationsSection />

      {/* Detection History */}
      <HistorySection />

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* Live Webcam Detection */}
      <WebcamSection />

      <Footer />

    </main>
  )
}