import { useI18n } from '../../components/LanguageProvider'

export default function TermsPage() {
  const { t } = useI18n()
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-white mb-3">{t.termsTitle || 'Terms & Conditions'}</h1>
      <p className="text-gray-300 max-w-3xl mb-4">{t.termsIntro || 'By using MediMind you agree to the following terms:'}</p>
      <ol className="list-decimal pl-6 text-gray-300 space-y-2 max-w-3xl">
        <li>{t.termsItem1 || 'MediMind provides informational guidance only and is not a medical device.'}</li>
        <li>{t.termsItem2 || 'You are responsible for your own healthcare decisions. Seek professional advice when needed.'}</li>
        <li>{t.termsItem3 || 'We may update these terms periodically; continued use constitutes acceptance.'}</li>
      </ol>
      <p className="text-gray-400 text-sm mt-6">{t.termsNote || 'Demo terms for illustration.'}</p>
    </div>
  )
}


