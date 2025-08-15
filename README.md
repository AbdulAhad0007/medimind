# MediMind

A small, responsive Next.js web app that provides AI-powered symptom guidance, multilingual support, and accessibility features (voice typing and text-to-speech).

## Quick overview
- Tech: Next.js (app router), React, Tailwind CSS
- AI: OpenAI streaming (primary) with optional Gemini/PaLM fallback
- Features: symptom checker chat (streaming), multilingual UI, voice typing (SpeechRecognition), TTS (SpeechSynthesis), responsive layout

## Getting started

1. Clone the repo and install dependencies

```bash
cd medimind
npm install
```

2. Environment variables

Create a `.env.local` file in the `medimind` folder (project root) and add keys you have. Example:

```env
# OpenAI (primary — optional)
OPENAI_API_KEY=sk-REPLACE_WITH_YOUR_KEY

# Gemini / PaLM (optional fallback)
GEMINI_API_KEY=ya29-REPLACE_WITH_YOUR_KEY
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText

# For testing: force Gemini usage
USE_GEMINI_ALWAYS=true
```

Notes:
- Do not include quotes around values.
- Restart the dev server after editing `.env.local`.

3. Run the app

```bash
npm run dev
```

Open https://medimind-one.vercel.app

## Important files & where to edit
- `src/app/page.js` — main landing page content and badge text
- `src/lib/i18n.js` — translations (add/modify language strings here)
- `src/components/LanguageSelector.jsx` & `src/components/Footer.jsx` — language selectors shown in UI
- `src/app/register/page.js` & `src/app/login/page.js` — auth pages
- `src/app/chat/page.js` — chat UI, voice typing and TTS controls
- `src/lib/aiApi.js` — client helper that calls AI endpoints
- `src/app/api/ai/stream/route.js` — streaming AI proxy route (OpenAI primary, Gemini fallback)
- `src/app/api/ai/complete/route.js` — non-streaming completion endpoint

## How the AI routing works
- By default the app calls `/api/ai/stream` which proxies to OpenAI's streaming completions.
- If OpenAI returns an `insufficient_quota` error and `GEMINI_API_KEY` is configured, the server attempts a Gemini/PaLM request and streams that text back to the client.
- The route also includes rule-based canned responses for very short or common inputs (e.g., "hi", "cough") to avoid unnecessary API calls.

## Multilingual support
- Translations are in `src/lib/i18n.js`. Add new languages by creating a new top-level key (e.g., `mr` for Marathi) and provide translations for the keys used.
- Language selection is persisted via `LanguageProvider` which uses localStorage.

## Accessibility features
- Voice typing: uses the Web SpeechRecognition API; toggled from the chat input.
- Text-to-speech: uses the Web SpeechSynthesis API with mapped BCP-47 locales. Click the speaker icon next to AI replies to hear them.

## Troubleshooting
- "AI service is unavailable" or quota errors: check `OPENAI_API_KEY` value, billing and usage on the OpenAI dashboard. If quota exceeded, ensure `GEMINI_API_KEY` is set if you want a fallback.
- Gemini/PaLM fallback: different projects may require a service account or OAuth token instead of a simple API key. If fallback doesn't return text, examine server logs (where `npm run dev` runs) for messages like `Gemini fallback error`.
- SpeechRecognition / SpeechSynthesis compatibility: Chrome (desktop & Android) is most reliable.

## Tests & linting
- This project does not include a test suite by default. Keep linter/dev tooling consistent with the codebase if you add tests.

## Contributing
- Make changes in feature branches, keep commits small and focused, and open a PR describing the change.

## License
MIT
