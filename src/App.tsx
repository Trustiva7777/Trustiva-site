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

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <PlatformFeatures />
      <Stablecoins />
      <RWA />
      <Compliance />
      <Onboarding />
      <XRPLSection />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App