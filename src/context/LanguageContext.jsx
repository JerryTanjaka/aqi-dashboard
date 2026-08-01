import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'
import { dayNames, monthNames } from '../lib/theme'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'fr')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.setAttribute('lang', lang)
    document.title = lang === 'fr' ? "Dashboard Qualité de l'Air" : 'Air Quality Dashboard'
  }, [lang])

  const t = (key, vars) => {
    let s = translations[lang][key] ?? translations.fr[key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(v)
    }
    return s
  }

  const tDay = (name) => (lang === 'fr' ? dayNames[name] ?? name : name)
  const tMonth = (name) => (lang === 'fr' ? monthNames[name] ?? name : name)
  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, tDay, tMonth }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
