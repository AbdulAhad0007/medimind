'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useI18n } from '../../components/LanguageProvider'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { t } = useI18n()

  const handleLogin = async (e) => {
    e.preventDefault()
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    })
  }

  return (
    <div className="container-page py-12 max-w-md">
      <img src="/images/secure.svg" alt="Secure login" className="w-12 h-12 mb-4" />
      <h1 className="text-3xl font-bold mb-2">{t.loginTitle}</h1>
      <p className="text-sm text-gray-600 mb-6">{t.accessInsights}</p>

      <form onSubmit={handleLogin} className="space-y-4 card">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-full"
        />
        <button type="submit" className="w-full">
          {t.ctaLogin}
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full bg-red-500 hover:brightness-110 flex items-center justify-center space-x-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.47 12.28c0-.77-.07-1.52-.2-2.26H12v4.26h6.05c-.27 1.34-.96 2.48-1.97 3.25l-.26.2V19.9l1.63 1.27c.97-.9 1.7-2.07 2.1-3.41.4-.73.6-1.52.6-2.38z" fill="#4285F4"/>
            <path d="M12 23c3.24 0 5.95-1.08 7.94-2.93l-1.63-1.27c-.42.27-.9.5-1.4.67-.84.27-1.74.4-2.67.4-4.13 0-7.62-2.79-8.89-6.52l-.24-.04-.04.24L3.08 17.5c.87 1.96 2.5 3.52 4.48 4.57C9.55 22.62 10.77 23 12 23z" fill="#34A853"/>
            <path d="M3.08 17.5l2.06-1.61c-.24-.62-.38-1.3-.38-2.01 0-.72.13-1.4.38-2.01L3.08 9.5C2.1 7.55 1.5 5.37 1.5 3c0-.66.07-1.3.18-1.92l.06-.32L.05 1.48C.19 2.15.25 2.82.25 3.5c0 2.8-.75 5.4-2.17 7.6l2.15 1.68c.83.65 1.77 1.15 2.82 1.48 1.05.33 2.14.5 3.25.5 1.23 0 2.37-.18 3.44-.5L18.42 12.28H12V7.74h10.47c.13.74.2 1.49.2 2.26 0 .86-.17 1.7-.5 2.5l-2.06 1.61z" fill="#EA4335"/>
            <path d="M12 6.5c1.62 0 3.06.57 4.2 1.6l3.14-3.14C17.95 2.16 15.24 1.08 12 1.08c-3.07 0-5.78 1.25-7.75 3.28l1.63 1.27c1.27-3.73 4.76-6.52 8.89-6.52z" fill="#FBBC04"/>
          </svg>
          {t.loginWithGoogle}
        </button>
        <p className="text-xs text-gray-500 mt-3">Tip: Use your demo email to explore if you don’t have an account yet.</p>
        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  )
}
