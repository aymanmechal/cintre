const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const MAX_WISH_LENGTH = 300;
const MAX_PIECES = 400;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INSTRUCTIONS = `Tu es le styliste de l'app Cintré. On te donne l'envie de la personne et la liste des pièces qu'elle possède (JSON).
Compose UNE tenue en utilisant uniquement des "id" de cette liste, n'invente jamais de pièce.
Règles : un haut (ou une robe), un bas sauf si c'est une robe, une paire de chaussures, 0 à 2 accessoires.
Explique ton choix en 2 phrases maximum, en français, en tutoyant, avec un ton chaleureux.`;

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    pieceIds: { type: 'ARRAY', items: { type: 'INTEGER' } },
    explanation: { type: 'STRING' },
  },
  required: ['pieceIds', 'explanation'],
};

interface StylistRequest {
  wish: string;
  pieces: unknown[];
}

function reply(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function isValidRequest(value: unknown): value is StylistRequest {
  if (typeof value !== 'object' || value === null) return false;
  const { wish, pieces } = value as Record<string, unknown>;
  return (
    typeof wish === 'string' &&
    wish.trim() !== '' &&
    wish.length <= MAX_WISH_LENGTH &&
    Array.isArray(pieces) &&
    pieces.length > 0 &&
    pieces.length <= MAX_PIECES
  );
}

async function askGemini(request: StylistRequest, apiKey: string): Promise<unknown> {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: INSTRUCTIONS }] },
      contents: [
        {
          role: 'user',
          parts: [{ text: `Envie : ${request.wish}\nPièces : ${JSON.stringify(request.pieces)}` }],
        },
      ],
      generationConfig: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
    }),
  });
  if (!response.ok) throw new Error(`Gemini ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.candidates[0].content.parts[0].text);
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) return reply({ error: 'missing_key' }, 500);
  const body: unknown = await request.json().catch(() => null);
  if (!isValidRequest(body)) return reply({ error: 'invalid_request' }, 400);
  try {
    return reply(await askGemini(body, apiKey));
  } catch {
    return reply({ error: 'ai_failed' }, 502);
  }
});
