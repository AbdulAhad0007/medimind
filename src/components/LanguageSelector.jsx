'use client'
import { useState } from 'react'

export default function LanguageSelector({ onChange }) {
  const [lang, setLang] = useState('en')

  const handleChange = (e) => {
    const newLang = e.target.value
    setLang(newLang)
    onChange(newLang)
  }

  return (
    <div className="inline-flex items-center gap-2">
      <img src="/images/globe.svg" alt="Language" className="w-4 h-4" />
      <select
        value={lang}
        onChange={handleChange}
        className="px-3 py-2 rounded border bg-gray-700 text-white"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
        <option value="mr">Marathi</option>
        <option value="ta">Tamil</option>
      </select>
    </div>
  )
}
