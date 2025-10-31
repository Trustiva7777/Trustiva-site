import { Card } from '@/components/ui/card'
import { Shield, IdentificationCard, ClipboardText } from '@phosphor-icons/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { getTranslation } from '@/lib/translations'

export function Compliance() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <section id="compliance" ref={ref} className="py-24 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.compliance.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.compliance.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4">
              <Shield size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">{t.compliance.kycTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.compliance.kycDesc}</p>
            </Card>

            <Card className="p-8 space-y-4">
              <IdentificationCard size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">{t.compliance.accredTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.compliance.accredDesc}</p>
            </Card>

            <Card className="p-8 space-y-4">
              <ClipboardText size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">{t.compliance.governanceTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.compliance.governanceDesc}</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
