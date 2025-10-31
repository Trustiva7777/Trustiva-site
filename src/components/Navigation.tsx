import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { List, X } from '@phosphor-icons/react'

export function Navigation() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'Stablecoins', href: '#stablecoins' },
    { label: 'RWA', href: '#rwa' },
    { label: 'Compliance', href: '#compliance' },
    { label: 'Onboarding', href: '#onboarding' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent">
            <path
              d="M16 4L8 12L16 20L24 12L16 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M8 20L16 28L24 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-2xl font-bold tracking-tight">TRUSTIVA</span>
        </div>

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
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Started
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
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4">
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
