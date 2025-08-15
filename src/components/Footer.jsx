import { useI18n } from './LanguageProvider'

export default function Footer() {
  const { lang, setLang, t } = useI18n()
  return (
    <footer className="p-6 text-center text-gray-400">
      <div className="container-page">
        <p className="text-sm">© {new Date().getFullYear()} MediMind — AI Health Assistant</p>
        <p className="text-xs text-gray-500 mt-1">{t.disclaimerShort}</p>
        <div className="mt-3 flex items-center justify-center gap-4 text-sm">
          <a href="/privacy" className="hover:text-white">{t.footerPrivacy}</a>
          <span className="opacity-50">•</span>
          <a href="/terms" className="hover:text-white">{t.footerTerms}</a>
          <span className="opacity-50">•</span>
          <span className="inline-flex items-center gap-2">
            <img src="/images/globe.svg" alt="Language" className="w-4 h-4 opacity-75" />
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border border-white/20 rounded px-2 py-1 text-xs">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="hi">हिन्दी</option>
              <option value="fr">Français</option>
              <option value="mr">Marathi</option>
              <option value="ta">தமிழ்</option>
            </select>
          </span>
        </div>
      </div>
    </footer>
  )
}
