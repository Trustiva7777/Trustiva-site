import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function XRPLSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 text-center space-y-6 border-2">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 8L12 20L24 32L36 20L24 8Z"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 32L24 44L36 32"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Built on XRPL</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              XRP Ledger native integration
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leveraging the speed, scalability, and compliance features of the XRP Ledger
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
