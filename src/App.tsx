import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { PlatformFeatures } from '@/components/PlatformFeatures'
import { Stablecoins } from '@/components/Stablecoins'
import { RWA } from '@/components/RWA'
import { Compliance } from '@/components/Compliance'
import { Onboarding } from '@/components/Onboarding'
import { XRPLSection } from '@/components/XRPLSection'
import { Footer } from '@/components/Footer'
import { IssuerIntake } from '@/components/IssuerIntake'

function App() {
  const [showIntake, setShowIntake] = useState(false)

  if (showIntake) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <IssuerIntake onGoHome={() => setShowIntake(false)} />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onGetStarted={() => setShowIntake(true)} />
      <Hero onGetStarted={() => setShowIntake(true)} />
      <PlatformFeatures />
      <Stablecoins />
      <RWA />
      <Compliance />
      <Onboarding onIssuerStart={() => setShowIntake(true)} />
      <XRPLSection />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App