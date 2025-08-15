'use client'
import { useState } from 'react'

export default function SymptomForm({ onSubmit }) {
  const [symptoms, setSymptoms] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!symptoms.trim()) return
    onSubmit(symptoms)
    setSymptoms('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input
        type="text"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Describe your symptoms..."
        className="flex-1 rounded-l-lg px-3 py-2"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-r-lg"
      >
        Send
      </button>
    </form>
  )
}
