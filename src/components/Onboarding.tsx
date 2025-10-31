import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Buildings, User, Briefcase } from '@phosphor-icons/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { getTranslation } from '@/lib/translations'

interface OnboardingProps {
  onIssuerStart: () => void
}

export function Onboarding({ onIssuerStart }: OnboardingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { language } = useLanguage()
  const t = getTranslation(language)

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
              {t.onboarding.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.onboarding.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <Buildings size={48} weight="duotone" className="text-accent" />
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{t.onboarding.issuerTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.onboarding.issuerDesc}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.onboarding.issuerRequirements}
                </p>
              </div>
              <Button 
                onClick={onIssuerStart}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                {t.onboarding.issuerCta}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Card>

            <Card className="p-8 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <User size={48} weight="duotone" className="text-accent" />
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{t.onboarding.investorTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.onboarding.investorDesc}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.onboarding.investorRequirements}
                </p>
              </div>
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
                disabled
              >
                {t.onboarding.investorCta}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Card>

            <Card className="p-8 space-y-6 hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <Briefcase size={48} weight="duotone" className="text-accent" />
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">{t.onboarding.brokerTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.onboarding.brokerDesc}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.onboarding.brokerRequirements}
                </p>
              </div>
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
                disabled
              >
                {t.onboarding.brokerCta}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
