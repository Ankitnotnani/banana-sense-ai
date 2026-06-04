'use client'

import dynamic from 'next/dynamic'

const WebcamSectionComponent = dynamic(
  () => import('./webcam-section-client'),
  {
    ssr: false,
  }
)

export function WebcamSection() {

  return <WebcamSectionComponent />

}