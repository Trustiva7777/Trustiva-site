import { Card } from '@/components/ui/card'
import { Globe, ShieldCheck, ChartLine } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Stablecoins() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
              Multi‑Chain Stablecoins
            </h2>
            <p className="text-lg text-muted-foreground">
              XRPL, EVM, Solana, Cosmos, Stellar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4">
              <Globe size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">Multi-Chain Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deploy stablecoins across XRPL, EVM-compatible chains, Solana, Cosmos, and Stellar ecosystems.
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <ShieldCheck size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">Policy‑Gated Operations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mint and redeem operations controlled by customizable compliance policies and rules.
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <ChartLine size={40} weight="duotone" className="text-accent" />
              <h3 className="text-2xl font-semibold">Proof‑of‑Reserves</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time oracle verification of backing assets with transparent on-chain attestation.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
