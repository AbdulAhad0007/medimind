'use client'
import { useState, useEffect, useRef } from 'react'

export default function ChatBox({ messages, isThinking }) {
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white shadow-sm max-h-[400px] overflow-y-auto">
      {messages.length === 0 && (
        <p className="text-gray-400 text-center">
          No conversation yet. Ask your first question!
        </p>
      )}

      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`px-4 py-2 rounded-lg max-w-xs break-words ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {isThinking && (
        <div className="flex items-center gap-2 text-sm text-gray-400 italic mt-2">
          <img src="/images/typing.svg" alt="typing" className="w-4 h-4" />
          <span>MediMind is thinking...</span>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
