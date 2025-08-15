'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../lib/i18n'

const LanguageContext = createContext({ lang: 'en', t: translations.en, setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null
    if (saved && translations[saved]) setLang(saved)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', lang)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] || translations.en }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  return useContext(LanguageContext)
}


