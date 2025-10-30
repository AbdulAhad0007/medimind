'use server'

function encode(str) {
  return new TextEncoder().encode(str)
}

export async function POST(request) {
  const { symptoms, lang } = await request.json()

  const langName = (code) => {
    switch (code) {
      case 'es': return 'Spanish'
      case 'hi': return 'Hindi'
      case 'fr': return 'French'
      case 'mr': return 'Marathi'
      case 'ta': return 'Tamil'
      default: return 'English'
    }
  }

  const prompt = `You are MediMind, a careful, friendly medical guidance chatbot. The user says: "${symptoms}". Provide clear, concise next-step guidance, including red flags to watch for, possible self-care, and when to seek professional care. Keep it under 180 words, use short paragraphs and bullet points when helpful. Add a brief disclaimer at the end. Respond in ${langName(lang)}.`

  const apiKey = process.env.OPENAI_API_KEY

  // Simple rule-based canned responses for short/very common inputs to avoid API calls
  function getCannedResponse(inputText) {
    if (!inputText) return null
    const s = inputText.trim().toLowerCase()
    // greetings
    if (/^hi$|^hello$|^hey$/.test(s)) return 'Hi! I\'m MediMind — tell me your symptoms and I can help with next steps.'
    if (/i am sick|i'm sick/.test(s)) return 'I\'m sorry you\'re not feeling well. Can you describe your main symptoms (fever, cough, pain, etc.)?'
    if (/cough/.test(s)) return 'For a cough: stay hydrated, rest, consider warm fluids. If you have high fever, blood in mucus, or breathing difficulty, seek medical care. Suggested syrup: https://www.indiamart.com/proddetail/dry-cough-syrup-7078150330.html'
    if (/fever/.test(s)) return 'For fever: rest, fluids, and paracetamol/ibuprofen as appropriate. Seek care for very high fever, severe headache, stiff neck, or confusion. Suggested syrup: https://www.indiamart.com/proddetail/levocetirizine-dihydrochloride-montelukast-sodium-syrup-2850227824330.html'
    if (/headache/.test(s)) return 'Common headaches improve with rest, hydration, and over-the-counter pain relief. Seek care for sudden severe headache, weakness, or vision changes. Suggested Medicine: https://www.1mg.com/otc/saridon-new-saridon-tablet-for-pain-relief-provides-fast-headache-relief-otc123063'
    // fallback for very short messages
    if (s.length < 6) return 'Hi — tell me more about what\'s bothering you (symptoms, duration, severity).' 
    return null
  }

  const canned = getCannedResponse(symptoms)
  if (canned) {
    const chunks = String(canned).match(/.{1,60}/g) || [String(canned)]
    const stream = new ReadableStream({
      start(controller) {
        let i = 0
        const id = setInterval(() => {
          if (i >= chunks.length) { clearInterval(id); controller.close() } else { controller.enqueue(encode(chunks[i])); i += 1 }
        }, 40)
      }
    })
    return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }

  const useGeminiAlways = (String(process.env.USE_GEMINI_ALWAYS || '').toLowerCase() === '1' || String(process.env.USE_GEMINI_ALWAYS || '').toLowerCase() === 'true')

  async function tryGemini(promptText) {
    if (!process.env.GEMINI_API_KEY) return null
    const geminiUrlBase = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText'
    const geminiBody = JSON.stringify({ prompt: { text: promptText }, temperature: 0.2, maxOutputTokens: 400 })

    const tryGeminiRequest = async (url, options) => {
      try {
        const resp = await fetch(url, options)
        const txt = await resp.text()
        if (!resp.ok) return { ok: false, status: resp.status, text: txt }
        try { return { ok: true, json: JSON.parse(txt) } } catch (e) { return { ok: true, text: txt } }
      } catch (e) { return { ok: false, error: e } }
    }

    // Try bearer then key as query param
    let gAttempt = await tryGeminiRequest(geminiUrlBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GEMINI_API_KEY}` },
      body: geminiBody,
    })
    if ((!gAttempt.ok || (!gAttempt.json && !gAttempt.text)) && process.env.GEMINI_API_KEY) {
      const urlWithKey = geminiUrlBase.includes('?') ? `${geminiUrlBase}&key=${process.env.GEMINI_API_KEY}` : `${geminiUrlBase}?key=${process.env.GEMINI_API_KEY}`
      gAttempt = await tryGeminiRequest(urlWithKey, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: geminiBody })
    }

    if (gAttempt.ok && (gAttempt.json || gAttempt.text)) {
      const gJson = gAttempt.json
      let finalText = ''
      if (gJson) {
        if (gJson.candidates && gJson.candidates.length) {
          finalText = gJson.candidates[0].output || gJson.candidates[0].content || gJson.candidates[0].text || ''
          if (!finalText && Array.isArray(gJson.candidates[0].content)) finalText = gJson.candidates[0].content.map(c => c.text || c).join(' ')
        }
        if (!finalText && gJson.output) finalText = typeof gJson.output === 'string' ? gJson.output : JSON.stringify(gJson.output)
        if (!finalText) finalText = JSON.stringify(gJson)
      } else {
        finalText = gAttempt.text || ''
      }
      return String(finalText)
    }
    return null
  }

  // If no OpenAI key, try Gemini fallback (if configured) before returning placeholder
  if (!apiKey) {
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiText = await tryGemini(prompt)
        if (geminiText) {
          const chunks = String(geminiText).match(/.{1,60}/g) || [String(geminiText)]
          const gemStream = new ReadableStream({
            start(controller) {
              let i = 0
              const id = setInterval(() => {
                if (i >= chunks.length) { clearInterval(id); controller.close() } else { controller.enqueue(encode(chunks[i])); i += 1 }
              }, 40)
            }
          })
          return new Response(gemStream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
        }
      } catch (e) {
        console.error('Gemini fallback when no OpenAI key failed', e)
      }
    }

    const text = `Thanks for sharing.\n\n- Try fluids, rest, and monitor symptoms.\n- Consider OTC relief if appropriate for you.\n- Seek care urgently for red flags: severe pain, breathing issues, chest pain, confusion, dehydration.\n\nThis is guidance, not a diagnosis.`
    const stream = new ReadableStream({
      start(controller) {
        const chunks = text.match(/.{1,35}/g) || [text]
        let i = 0
        const interval = setInterval(() => {
          if (i >= chunks.length) {
            clearInterval(interval)
            controller.close()
          } else {
            controller.enqueue(encode(chunks[i]))
            i += 1
          }
        }, 50)
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  }

  // Proxy to OpenAI with streaming
  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        stream: true,
        messages: [
          { role: 'system', content: 'You are MediMind, a careful, friendly medical guidance chatbot. You provide guidance, not diagnosis.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
      }),
    })

    if (!upstream.ok || !upstream.body) {
      let upstreamText = `Upstream error: ${upstream.status}`
      try { upstreamText = await upstream.text() } catch (e) {}
      console.error('OpenAI upstream error', upstream.status, upstreamText)

      // Parse upstream JSON error if present
      let parsedError = null
      try { parsedError = JSON.parse(upstreamText) } catch (e) { parsedError = null }

      const isQuota = parsedError?.error && (parsedError.error.code === 'insufficient_quota' || parsedError.error.type === 'insufficient_quota')

      // If quota error and Gemini credentials exist, try Gemini/PaLM fallback
      if (isQuota && process.env.GEMINI_API_KEY) {
        try {
          const geminiUrlBase = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText'
          const geminiBody = JSON.stringify({ prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 400 })

          const tryGeminiRequest = async (url, options) => {
            try {
              const resp = await fetch(url, options)
              const txt = await resp.text()
              if (!resp.ok) return { ok: false, status: resp.status, text: txt }
              try { return { ok: true, json: JSON.parse(txt) } } catch (e) { return { ok: true, text: txt } }
            } catch (e) { return { ok: false, error: e } }
          }

          // First try Authorization: Bearer
          let gAttempt = await tryGeminiRequest(geminiUrlBase, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GEMINI_API_KEY}` },
            body: geminiBody,
          })

          // If failed, try ?key= API param
          if ((!gAttempt.ok || (!gAttempt.json && !gAttempt.text)) && process.env.GEMINI_API_KEY) {
            const urlWithKey = geminiUrlBase.includes('?') ? `${geminiUrlBase}&key=${process.env.GEMINI_API_KEY}` : `${geminiUrlBase}?key=${process.env.GEMINI_API_KEY}`
            gAttempt = await tryGeminiRequest(urlWithKey, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: geminiBody })
          }

          if (gAttempt.ok && (gAttempt.json || gAttempt.text)) {
            const gJson = gAttempt.json
            let finalText = ''
            if (gJson) {
              if (gJson.candidates && gJson.candidates.length) {
                finalText = gJson.candidates[0].output || gJson.candidates[0].content || gJson.candidates[0].text || ''
                if (!finalText && Array.isArray(gJson.candidates[0].content)) finalText = gJson.candidates[0].content.map(c => c.text || c).join(' ')
              }
              if (!finalText && gJson.output) finalText = typeof gJson.output === 'string' ? gJson.output : JSON.stringify(gJson.output)
              if (!finalText) finalText = JSON.stringify(gJson)
            } else {
              finalText = gAttempt.text || ''
            }

            const chunks = String(finalText).match(/.{1,60}/g) || [String(finalText)]
            const gemStream = new ReadableStream({
              start(controller) {
                let i = 0
                const id = setInterval(() => {
                  if (i >= chunks.length) {
                    clearInterval(id)
                    controller.close()
                  } else {
                    controller.enqueue(encode(chunks[i]))
                    i += 1
                  }
                }, 40)
              }
            })
            return new Response(gemStream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
          } else {
            console.error('Gemini fallback attempts failed', gAttempt)
          }
        } catch (ge) {
          console.error('Gemini fallback error', ge)
        }
      }

      // Otherwise provide a helpful fallback message
      let friendly = upstreamText
      if (parsedError?.error?.message) friendly = `AI service error: ${parsedError.error.message}`
      const fallback = `${friendly}\n\nIn the meantime: rest, hydrate, monitor symptoms, and seek care if severe or worsening.`
      const errStream = new ReadableStream({
        start(controller) {
          controller.enqueue(encode(fallback))
          controller.close()
        }
      })
      return new Response(errStream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
    }

    // Transform OpenAI SSE-style stream into plain text stream of content deltas
    const reader = upstream.body.getReader()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        let buf = ''
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buf += decoder.decode(value, { stream: true })

            // Split into lines
            const parts = buf.split(/\r?\n/)
            buf = parts.pop() || ''

            for (const part of parts) {
              const line = part.trim()
              if (!line) continue
              // OpenAI SSE lines start with "data: "
              if (line.startsWith('data:')) {
                const payload = line.replace(/^data:\s*/, '')
                if (payload === '[DONE]') {
                  controller.close()
                  return
                }
                try {
                  const parsed = JSON.parse(payload)
                  const choices = parsed.choices || []
                  for (const ch of choices) {
                    const delta = ch.delta || {}
                    const content = delta.content || ''
                    if (content) {
                      controller.enqueue(encode(content))
                    }
                  }
                } catch (e) {
                  // ignore JSON parse errors of partial data
                }
              }
            }
          }
        } catch (e) {
          console.error('Stream processing error', e)
          controller.enqueue(encode(e?.message || 'Sorry, the AI service disconnected.'))
          controller.close()
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error('AI stream handler error', err)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encode(err?.message || 'Sorry, the AI service is unavailable.'))
        controller.close()
      },
    })
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      status: 200,
    })
  }
}


