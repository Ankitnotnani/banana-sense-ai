'use client'

import { Navbar } from '@/components/navbar'

import { HeroSection } from '@/components/hero-section'

import { UploadDetectionSection } from '@/components/upload-detection-section'

import { AnalyticsDashboard } from '@/components/analytics-dashboard'

import { HistorySection } from '@/components/history-section'

import { TechnologySection } from '@/components/technology-section'

import { ApplicationsSection } from '@/components/applications-section'

import { TestimonialsSection } from '@/components/testimonials-section'

import { Footer } from '@/components/footer'

import { ParticleBackground } from '@/components/particle-background'

export default function Home()
{
  return (

    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Animated Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Upload Detection */}
      <UploadDetectionSection />

      {/* Analytics */}
      <AnalyticsDashboard />

      {/* History */}
      <HistorySection />

      {/* Technology */}
      <TechnologySection />

      {/* Applications */}
      <ApplicationsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />

    </main>
  )
}