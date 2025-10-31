import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { getTranslation } from '@/lib/translations'

interface HeroProps {
  onGetStarted: () => void
}

export function Hero({ onGetStarted }: HeroProps) {
  const { language } = useLanguage()
  const t = getTranslation(language)
  
  const scrollToOnboarding = () => {
    const element = document.querySelector('#onboarding')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-muted to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            {t.hero.headline}{' '}
            <span className="text-accent">{t.hero.headlineAccent}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 h-14"
              onClick={onGetStarted}
            >
              {t.hero.launchOnboarding}
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 h-14 border-2"
              onClick={scrollToOnboarding}
            >
              {t.hero.explorePlatform}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
