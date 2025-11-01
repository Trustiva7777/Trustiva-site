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
import { InvestorKYC } from '@/components/InvestorKYC'
import { BrokerPartnership } from '@/components/BrokerPartnership'

type OnboardingView = 'home' | 'issuer' | 'investor' | 'broker'

function App() {
  const [view, setView] = useState<OnboardingView>('home')

  if (view === 'issuer') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <IssuerIntake onGoHome={() => setView('home')} />
        <Toaster />
      </div>
    )
  }

  if (view === 'investor') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <InvestorKYC onGoHome={() => setView('home')} />
        <Toaster />
      </div>
    )
  }

  if (view === 'broker') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <BrokerPartnership onGoHome={() => setView('home')} />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onGetStarted={() => setView('issuer')} />
      <Hero onGetStarted={() => setView('issuer')} />
      <PlatformFeatures />
      <Stablecoins />
      <RWA />
      <Compliance />
      <Onboarding 
        onIssuerStart={() => setView('issuer')}
        onInvestorStart={() => setView('investor')}
        onBrokerStart={() => setView('broker')}
      />
      <XRPLSection />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App