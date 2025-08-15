'use server'

export async function POST(request) {
  try {
    const { symptoms, lang } = await request.json()
    const prompt = `You are MediMind, a careful, friendly medical guidance chatbot. The user says: "${symptoms}". Provide clear, concise next-step guidance, including red flags to watch for, possible self-care, and when to seek professional care. Keep it under 180 words, use short paragraphs and bullet points when helpful. Add a brief disclaimer at the end. Respond in the user's language as appropriate.`

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ advice: `Thanks for sharing. Based on your description ("${symptoms}"), consider rest, hydration, and monitoring symptoms. If you experience severe pain, difficulty breathing, or symptoms persist, seek professional medical care. This is guidance, not a diagnosis.` }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are MediMind, a careful, friendly medical guidance chatbot. You provide guidance, not diagnosis.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('OpenAI error', res.status, text)
      throw new Error('Upstream AI error')
    }

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || ''

    return new Response(JSON.stringify({ advice: content }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ advice: 'Sorry, I could not generate advice at the moment.' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }
}


