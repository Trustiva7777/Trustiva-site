import { Card } from '@/components/ui/card'
import { Shield, IdentificationCard, ClipboardText } from '@phosphor-icons/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function Compliance() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
              Compliance & Identity
            </h2>
            <p className="text-lg text-muted-foreground">
              Institutional-grade KYC, AML, and governance infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4">
              <Shield size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">KYC/AML & Sanctions</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Modular compliance adapters</li>
                <li>• Real-time sanctions screening</li>
                <li>• Automated watchlist monitoring</li>
                <li>• Global provider integration</li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4">
              <IdentificationCard size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">Accreditation & Travel Rule</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Investor accreditation verification</li>
                <li>• Travel Rule compliance hooks</li>
                <li>• Cross-border transaction monitoring</li>
                <li>• Regulatory reporting</li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4">
              <ClipboardText size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">Audit & Governance</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Immutable audit trails</li>
                <li>• Role-based access control</li>
                <li>• Multi-signature workflows</li>
                <li>• Compliance reporting engine</li>
              </ul>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
