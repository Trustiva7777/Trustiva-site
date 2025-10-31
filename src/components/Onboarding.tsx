import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Buildings, User, Briefcase } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { toast } from 'sonner'

export function Onboarding() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleStart = (type: string) => {
    toast.success(`Starting ${type} onboarding process`)
  }

  return (
    <section id="onboarding" ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Issuer • Investor • Broker Onboarding
            </h2>
            <p className="text-lg text-muted-foreground">
              Single intake with jurisdiction‑aware questions and required disclosures. Upload docs, 
              verify identity, connect wallets, and generate compliance‑ready packets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <Buildings size={48} weight="duotone" className="text-accent" />
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Issuer Onboarding</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  FINRA 10‑22 records • Reg D/Reg S • Rule 144 lockups • MiCA alignment
                </p>
              </div>
              <Button 
                onClick={() => handleStart('Issuer')}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                Start
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Card>

            <Card className="p-8 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <User size={48} weight="duotone" className="text-accent" />
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Investor KYC</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Identity verification • Accreditation checks • Wallet linking • Jurisdiction compliance
                </p>
              </div>
              <Button 
                onClick={() => handleStart('Investor')}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                Start
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Card>

            <Card className="p-8 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <Briefcase size={48} weight="duotone" className="text-accent" />
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Broker/Dealer Intake</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  License verification • Regulatory filings • AML policies • Transaction permissions
                </p>
              </div>
              <Button 
                onClick={() => handleStart('Broker/Dealer')}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                Start
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="outline" size="lg" className="border-2">
              Open Intake
            </Button>
            <Button variant="outline" size="lg" className="border-2">
              View Sample Packet
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
