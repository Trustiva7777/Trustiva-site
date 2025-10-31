import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function RWA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const assetTypes = [
    'Equity',
    'Debt',
    'Revenue‑Share',
    'Commodities',
  ]

  const features = [
    'XRP Ledger native token issuance',
    'Jurisdiction & investor class controls',
    'Automated compliance enforcement',
    'Multi-signature governance',
  ]

  return (
    <section id="rwa" ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              RWA Tokenization on XRPL
            </h2>
            <p className="text-lg text-muted-foreground">
              Tokenize real-world assets with institutional-grade compliance and controls
            </p>
          </div>

          <Card className="p-12 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Supported Asset Classes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {assetTypes.map((type) => (
                  <div
                    key={type}
                    className="p-4 bg-muted rounded-lg text-center font-medium"
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-2xl font-semibold mb-6">Platform Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <p className="text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
