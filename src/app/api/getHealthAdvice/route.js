'use server'

export async function POST(request) {
  try {
    const body = await request.json()
    const symptoms = String(body?.symptoms || '').trim()

    if (!symptoms) {
      return new Response(
        JSON.stringify({ advice: 'Please describe your symptoms so I can help.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Simple rule-based placeholder while AI is wired (keeps language neutral)
    const genericAdvice = `Thanks for sharing. Based on your description ("${symptoms}"), consider rest, hydration, and monitoring symptoms. If you experience severe pain, difficulty breathing, or symptoms persist, seek professional medical care. This is guidance, not a diagnosis.`

    return new Response(JSON.stringify({ advice: genericAdvice }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ advice: 'Sorry, something went wrong. Try again.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}


