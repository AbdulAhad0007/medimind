export async function getHealthAdvice(symptomText, lang = 'en') {
  try {
    const res = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: symptomText, lang }),
    })

    if (!res.ok) {
      throw new Error('Failed to fetch health advice')
    }

    // for non-stream fallback, try to parse JSON
    try {
      const text = await res.text()
      return text
    } catch (e) {
      throw new Error('Failed to parse AI response')
    }
  } catch (error) {
    console.error('AI API error:', error)
    throw error
  }
}
