import { useLanguage } from '@/hooks/use-language'
import { getTranslation } from '@/lib/translations'

export function Footer() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  
  return (
    <footer className="py-12 px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © 2025 TRUSTIVA. {t.footer.allRights}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button className="hover:text-accent transition-colors">{t.footer.terms}</button>
            <button className="hover:text-accent transition-colors">{t.footer.privacy}</button>
            <button className="hover:text-accent transition-colors">{t.footer.compliance}</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
