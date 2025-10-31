import { Card } from '@/components/ui/card'
import { Globe, ShieldCheck, ChartLine } from '@phosphor-icons/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { getTranslation } from '@/lib/translations'

export function Stablecoins() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <section id="stablecoins" ref={ref} className="py-24 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.stablecoins.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.stablecoins.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 space-y-3">
              <h4 className="font-semibold text-sm text-accent">{t.stablecoins.supportedChains}</h4>
              <p className="text-muted-foreground">{t.stablecoins.chains}</p>
            </Card>

            <Card className="p-6 space-y-3">
              <h4 className="font-semibold text-sm text-accent">{t.stablecoins.keyFeatures}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t.stablecoins.feature1}</li>
                <li>• {t.stablecoins.feature2}</li>
                <li>• {t.stablecoins.feature3}</li>
                <li>• {t.stablecoins.feature4}</li>
              </ul>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
