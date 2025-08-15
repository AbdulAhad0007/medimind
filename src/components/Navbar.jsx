'use client'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useI18n } from './LanguageProvider'

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user
  const { t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={`navbar p-4`}>
      <div className="container-page flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/images/medimind-hero.svg" alt="MediMind" className="w-7 h-7" />
          <span className="font-bold">MediMind</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/" className="text-white/90 hover:text-white">{t.navHome}</a>
          <a href="/chat" className="text-white/90 hover:text-white">{t.navChat}</a>
          <a href="/about" className="text-white/90 hover:text-white">{t.navAbout}</a>
          {user ? (
            <>
              <span className="text-white/70">Hi, {user.name?.split(' ')[0] || 'there'}</span>
              <button onClick={() => signOut()} className="bg-white text-blue-700 px-3 py-1 rounded-md hover:brightness-95">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="bg-white text-blue-700 px-3 py-1 rounded-md hover:brightness-95">Login</a>
              <a href="/register" className="border border-white/70 text-white px-3 py-1 rounded-md hover:bg-white hover:text-blue-700">Sign up</a>
            </>
          )}
        </div>

        {/* Mobile: show only user session controls in navbar */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-white/90 text-sm">{user.name?.split(' ')[0] || 'User'}</span>
              <button onClick={() => signOut()} className="bg-white text-blue-700 px-2 py-1 rounded-md text-sm">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a href="/login" className="bg-white text-blue-700 px-2 py-1 rounded-md text-sm">Login</a>
              <a href="/register" className="border border-white/70 text-white px-2 py-1 rounded-md text-sm">Sign up</a>
            </div>
          )}

          {/* Mobile menu toggle button (kept small) */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((s) => !s)}
            className="p-2 rounded-md text-white/90 hover:bg-white/5"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden bg-black/60 backdrop-blur transition-max-h duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="container-page py-3 flex flex-col gap-2">
          <a href="/" className="text-white/90 py-2">{t.navHome}</a>
          <a href="/chat" className="text-white/90 py-2">{t.navChat}</a>
          <a href="/about" className="text-white/90 py-2">{t.navAbout}</a>
        </div>
      </div>
    </nav>
  )
}
