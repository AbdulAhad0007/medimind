'use client'
import { useState, useEffect, useRef } from 'react'
import { getHealthAdvice } from '../../lib/aiApi'
import { useI18n } from '../../components/LanguageProvider'

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const { t } = useI18n()
  const { lang } = useI18n()
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)
  const originalInputRef = useRef('')
  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Streaming from Edge route
    try {
      const res = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: userMessage.text, lang }),
      })
      if (!res.body) {
        const advice = await getHealthAdvice(userMessage.text)
        setMessages(prev => [...prev, { sender: 'ai', text: advice }])
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let done = false
      while (!done) {
        const { value, done: isDone } = await reader.read()
        done = isDone
        if (value) {
          const chunk = decoder.decode(value)
          fullText += chunk
          setMessages(prev => {
            const copy = [...prev]
            const last = copy[copy.length - 1]
            if (!last || last.sender !== 'ai-stream') {
              copy.push({ sender: 'ai-stream', text: chunk })
            } else {
              last.text += chunk
            }
            return copy
          })
        }
      }
      // Convert stream temp message to final 'ai' message
      setMessages(prev => {
        const copy = prev.filter(m => m.sender !== 'ai-stream')
        copy.push({ sender: 'ai', text: fullText })
        return copy
      })
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I could not fetch advice right now.' }])
    }
  }

  // auto-scroll when messages update
  useEffect(() => {
    try {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    } catch (e) {
      // ignore
    }
  }, [messages])

  // Text-to-speech: read AI paragraph in selected language
  const playTTS = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Text-to-speech not supported in this browser')
      return
    }
    const synth = window.speechSynthesis
    synth.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    // map app language codes to BCP-47 locales
    const langMap = {
      en: 'en-US',
      es: 'es-ES',
      hi: 'hi-IN',
      fr: 'fr-FR',
      mr: 'mr-IN',
      ta: 'ta-IN',
    }
    utter.lang = langMap[lang] || 'en-US'
    synth.speak(utter)
  }

  // Render message text with clickable links
  const renderMessageText = (text) => {
    try {
      // find URLs and split
      const parts = text.split(/(https?:\/\/[\w\-./?=&%#:;,+~]+)/g)
      return parts.map((part, i) => {
        if (/^https?:\/\//.test(part)) {
          return (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {part}
            </a>
          )
        }
        return <span key={i}>{part}</span>
      })
    } catch (e) {
      return text
    }
  }

  // Voice typing (SpeechRecognition) for accessibility
  useEffect(() => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const r = new SpeechRecognition()
    recognitionRef.current = r
    r.interimResults = true
    r.maxAlternatives = 1
    r.onresult = (ev) => {
      let interim = ''
      let final = ''
      for (let i = ev.resultIndex; i < ev.results.length; ++i) {
        const res = ev.results[i]
        if (res.isFinal) final += res[0].transcript
        else interim += res[0].transcript
      }
      // merge with the original input captured when recognition started to avoid duplicates
      const base = originalInputRef.current || ''
      const combined = (base + ' ' + final + interim).trim()
      setInput(combined)
    }
    r.onend = () => {
      setListening(false)
      originalInputRef.current = ''
    }
    return () => {
      try { r.stop() } catch (e) {}
    }
  }, [])

  const toggleListening = () => {
    const r = recognitionRef.current
    if (!r) {
      alert('Speech recognition is not supported in this browser')
      return
    }
    if (listening) {
      try { r.stop() } catch (e) {}
      setListening(false)
      originalInputRef.current = ''
    } else {
      try {
        // set recognition language to current app language code if possible
        r.lang = lang || 'en-US'
        r.start()
        // capture current input so interim results do not duplicate content
        originalInputRef.current = input || ''
        setListening(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div className="container-page max-w-2xl py-8">
      <h2 className="text-3xl font-bold mb-1">{t.symptomChecker}</h2>
      <p className="text-sm text-gray-500 mb-4">{t.safetyNote}</p>
      <div className="border p-4 rounded-lg h-96 overflow-y-auto bg-white shadow-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2">
              <div className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
                {renderMessageText(msg.text)}
              </div>
              {msg.sender === 'ai' && (
                <button onClick={() => playTTS(msg.text)} className="p-1 text-blue-600 hover:text-blue-800" aria-label="Listen">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.5A1.5 1.5 0 007.5 6v8A1.5 1.5 0 009 15.5h0A1.5 1.5 0 0010.5 14V6A1.5 1.5 0 009 4.5z" />
                    <path d="M12.5 6.5a3 3 0 010 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.placeholderSymptoms}
          className="flex-1 border rounded-l-lg px-3 py-2"
        />
        <button
          onClick={toggleListening}
          title={listening ? 'Stop voice input' : 'Start voice input'}
          aria-pressed={listening}
          className="px-3 py-2 border-l rounded-r-none text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${listening ? 'text-red-500' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v11m0 0c-1.657 0-3-1.567-3-3.5V6a3 3 0 116 0v2.5C15 10.433 13.657 12 12 12z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11v2a7 7 0 01-14 0v-2" />
          </svg>
        </button>
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-r-lg"
        >
          {t.send}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">Examples: “I have a sore throat and mild fever” · “I felt dizzy after standing up quickly”</p>
    </div>
  )
}
