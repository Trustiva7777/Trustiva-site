import { useKV } from '@github/spark/hooks'
import { type Language } from '@/lib/translations'

export function useLanguage() {
  const [language, setLanguage] = useKV<Language>('user-language', 'en')
  
  return { language: language || 'en', setLanguage }
}
