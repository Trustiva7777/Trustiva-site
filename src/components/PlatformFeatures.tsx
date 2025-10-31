import { Card } from '@/components/ui/card'
import { CheckCircle } from '@phosphor-icons/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: 'XRPL Native',
    description: 'Built on XRP Ledger infrastructure',
  },
  {
    title: 'Reg D/Reg S Ready',
    description: 'U.S. private placement compliance',
  },
  {
    title: 'Rule 144 Lockups',
    description: 'Automated restriction periods',
  },
  {
    title: 'MiCA/MiFID Alignment',
    description: 'European regulatory framework',
  },
]

export function PlatformFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="platform" ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-2">
                <div className="flex flex-col gap-3">
                  <CheckCircle size={32} weight="duotone" className="text-accent" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
