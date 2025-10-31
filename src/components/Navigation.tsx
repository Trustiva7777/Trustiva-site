import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { List, Globe } from '@phosphor-icons/react'
import { Hummingbird } from '@/components/Hummingbird'
import { useLanguage } from '@/hooks/use-language'
import { languages, getTranslation } from '@/lib/translations'

interface NavigationProps {
  onGetStarted: () => void
}

export function Navigation({ onGetStarted }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = getTranslation(language)

  const navItems = [
    { label: t.nav.platform, href: '#platform' },
    { label: t.nav.stablecoins, href: '#stablecoins' },
    { label: t.nav.rwa, href: '#rwa' },
    { label: t.nav.compliance, href: '#compliance' },
    { label: t.nav.onboarding, href: '#onboarding' },
  ]

  const currentLanguage = languages.find(l => l.code === language)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Hummingbird className="text-accent" size={40} />
          <span className="text-2xl font-bold tracking-tight">TRUSTIVA</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </button>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe size={20} />
                <span className="text-lg">{currentLanguage?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? 'bg-accent/10' : ''}
                >
                  <span className="text-lg mr-2">{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={onGetStarted}
          >
            {t.nav.getStarted}
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <List size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-80">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-lg font-medium text-foreground hover:text-accent transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Globe size={16} />
                  Language
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setOpen(false)
                      }}
                      className={`p-2 rounded-lg border text-left transition-colors ${
                        language === lang.code
                          ? 'bg-accent/10 border-accent'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <span className="text-lg mr-2">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4"
                onClick={() => {
                  onGetStarted()
                  setOpen(false)
                }}
              >
                {t.nav.getStarted}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
