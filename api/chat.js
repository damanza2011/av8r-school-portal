/**
 * AV8R School · Vercel Serverless Function: /api/chat
 * Asistente IA para orientación sobre ruta FAA A&P y aviación ejecutiva
 */

const SYSTEM_PROMPT = `You are "AV8R Guide", a knowledgeable, professional, and honest bilingual AI assistant for AV8R School (led by founder Nestor A. Cadena, USAF veteran and FAA-certified aircraft mechanic).
Your goal is to guide prospective students and aircraft technicians on:
1. The FAA A&P (Airframe and Powerplant) certification pathway.
2. The transition from A&P into corporate and business aviation (OEMs like Gulfstream, Bombardier, Dassault, Embraer, Textron).
3. The AV8R private Skool community, courses, mentorship, and OEM benefits.

CRITICAL RULES AND DISCLAIMERS:
- Never promise visas or work authorization in the U.S. An A&P certificate does NOT grant a visa or legal right to work. Visas are handled strictly through immigration attorneys.
- Never guarantee employment or job placement. AV8R provides preparation, alliances, and portfolio support, but hiring is decided by employers.
- Never quote unconfirmed tuition or exam prices. Instruct the user to request a personalized quote based on their country and cohort.
- Answer in the language requested by the user (Spanish or English).
- Be concise, technical yet accessible, encouraging, and transparent.`;

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages = [], lang = 'es' } = req.body || {};

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

  if (!apiKey) {
    return res.status(200).json({
      reply: lang === 'en'
        ? "AV8R Guide is currently running in local mode. Connect GEMINI_API_KEY in Vercel settings to enable full AI responses."
        : "AV8R Guide está en modo local. Configura GEMINI_API_KEY en las variables de entorno de Vercel para habilitar el modelo completo de IA."
    });
  }

  try {
    // Transform chat history into Gemini contents format
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // If last message doesn't exist, provide a fallback prompt
    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: 'Hola' }] });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return res.status(502).json({ error: 'Upstream AI service error' });
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (!replyText) {
      return res.status(502).json({ error: 'No content generated' });
    }

    return res.status(200).json({ reply: replyText });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
