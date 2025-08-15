import { useI18n } from '../../components/LanguageProvider'

export default function PrivacyPage() {
  const { t } = useI18n()
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-white mb-3">{t.privacyTitle || 'Privacy Policy'}</h1>
      <p className="text-gray-300 max-w-3xl mb-4">{t.privacyIntro || 'We respect your privacy. This summary explains what we collect and why.'}</p>
      <ul className="list-disc pl-6 text-gray-300 space-y-2 max-w-3xl">
        <li>{t.privacyItem1 || 'We collect chat content to generate responses and improve the service.'}</li>
        <li>{t.privacyItem2 || 'We do not sell your data. We share only when required by law or to provide the service.'}</li>
        <li>{t.privacyItem3 || 'You may request deletion of your account and data.'}</li>
      </ul>
      <p className="text-gray-400 text-sm mt-6">{t.privacyNote || 'This is a simplified policy for demo purposes.'}</p>
    </div>
  )
}


