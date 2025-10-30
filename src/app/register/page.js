'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useI18n } from '../../components/LanguageProvider'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [preferredLanguage, setPreferredLanguage] = useState('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { t } = useI18n()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      if (!displayName.trim()) throw new Error('Please enter your name')
      if (!email.trim()) throw new Error('Please enter your email')
      if (password.length < 6) throw new Error('Password must be at least 6 characters')
      if (password !== confirmPassword) throw new Error('Passwords do not match')
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, { displayName })
      await setDoc(doc(db, 'users', user.uid), { displayName, email, preferredLanguage }, { merge: true })

      setSuccess('Registration successful! Redirecting...')
      setTimeout(() => {
        window.location.href = '/'
      }, 800)
    } catch (error) {
      setError(error.message || 'Failed to create your account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page max-w-md mt-10 py-8">
      <img src="/images/doctor.svg" alt="Create account" className="w-12 h-12 mb-4" />
      <h2 className="text-3xl font-bold text-white mb-2">{t.registerTitle}</h2>
      <p className="text-sm text-gray-300 mb-6">{t.accessInsights}</p>

      <form onSubmit={handleRegister} className="space-y-4 card">
        {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}
        {success && <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">{success}</div>}

        <div>
          <label className="block text-sm text-gray-600 mb-1">{t.displayNameLabel}</label>
          <input
            type="text"
            placeholder="e.g. Alex Sharma"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">{t.labelEmail}</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t.passwordLabel}</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">{t.confirmPasswordLabel}</label>
            <input
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-3 py-2 w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">{t.preferredLanguage}</label>
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            className="px-3 py-2 w-full rounded border bg-gray-700 text-white"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="mr">Marathi</option>
            <option value="ta">Tamil</option>
          </select>
        </div>

        <button type="submit" className="w-full px-6 py-2" disabled={loading}>
          {loading ? t.creatingAccount : t.createAccountButton}
        </button>
        <p className="text-xs text-gray-500">By creating an account you agree to our <a className="underline" href="/terms">Terms</a> and <a className="underline" href="/privacy">Privacy Policy</a>.</p>
      </form>
    </div>
  )
}
