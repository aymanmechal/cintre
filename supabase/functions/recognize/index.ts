const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent';
const MAX_IMAGE_LENGTH = 2_000_000;
const DATA_URL_PATTERN = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/;

const PIECE_TYPES = [
  'chemises',
  'hauts',
  'bas',
  'robes',
  'chaussures',
  'sacs',
  'montres',
  'bijoux',
  'lunettes',
];
const COLORS = [
  'noir',
  'blanc',
  'gris',
  'beige',
  'marron',
  'bleu',
  'vert',
  'rouge',
  'rose',
  'jaune',
  'violet',
  'multicolore',
];
const SEASONS = ['ete', 'mi-saison', 'hiver', 'toute-annee'];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INSTRUCTIONS = `Tu regardes la photo d'un vêtement ou d'un accessoire pour l'app Cintré.
Donne un nom court en français (2 à 4 mots, ex. "Pull col roulé gris"), son type, sa couleur dominante et la saison où on le porte.
"hauts" = t-shirts, pulls, vestes, manteaux ; "chemises" = chemises et chemisiers ; "bas" = pantalons, jeans, jupes, shorts.`;

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    pieceType: { type: 'STRING', enum: PIECE_TYPES },
    color: { type: 'STRING', enum: COLORS },
    season: { type: 'STRING', enum: SEASONS },
  },
  required: ['title', 'pieceType', 'color', 'season'],
};

function reply(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function readImage(value: unknown): { mimeType: string; data: string } | null {
  if (typeof value !== 'object' || value === null) return null;
  const image = (value as Record<string, unknown>).image;
  if (typeof image !== 'string' || image.length > MAX_IMAGE_LENGTH) return null;
  const match = DATA_URL_PATTERN.exec(image);
  return match ? { mimeType: match[1], data: match[2] } : null;
}

async function askGemini(image: { mimeType: string; data: string }, apiKey: string) {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: INSTRUCTIONS }] },
      contents: [
        { role: 'user', parts: [{ inline_data: { mime_type: image.mimeType, data: image.data } }] },
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
  const image = readImage(await request.json().catch(() => null));
  if (!image) return reply({ error: 'invalid_request' }, 400);
  try {
    return reply(await askGemini(image, apiKey));
  } catch {
    return reply({ error: 'ai_failed' }, 502);
  }
});
