import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser
app.use(express.json({ limit: '25mb' }));

// Helper for Gemini Client
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint for Cloud Run
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 1. Plant Disease & Pest Analyzer with Multimodal Gemini
app.post('/api/gemini/analyze-plant', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', cropHint, language = 'te', farmerNote } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel.',
      });
    }

    const langName = language === 'te' ? 'Telugu (తెలుగు)' : language === 'hi' ? 'Hindi (हिंदी)' : 'English';

    const systemInstruction = `You are Dr. Raithu Mithra, a senior agricultural scientist and plant pathologist specialized in South Indian / Indian crops (Paddy, Chilli, Cotton, Groundnut, Tomato, Mango, Sugarcane, Bengal gram, Maize, Onion, etc.).
Your job is to analyze the farmer's uploaded crop photo, identify the exact plant disease, pest infestation, nutrient deficiency, or physiological disorder.
You MUST provide clear, practical guidance in ${langName} language, understandable by a rural farmer.
Return ONLY valid JSON matching this structure:
{
  "cropName": "Crop name in ${langName} and English",
  "conditionName": "Disease / Pest name in ${langName} & English",
  "scientificName": "Scientific / Latin binomial name",
  "pathogenType": "Fungal / Bacterial / Viral / Insect Pest / Nutrient Deficiency / Healthy",
  "severity": "Mild (తేలికపాటి / हल्का) / Moderate (మధ్యస్థ / मध्यम) / Severe (తీవ్రమైన / गंभीर)",
  "confidenceScore": 92,
  "summary": "1-2 sentence quick summary in ${langName}",
  "symptoms": ["Symptom 1 in ${langName}", "Symptom 2 in ${langName}"],
  "causes": "Environmental and pest vector causes in ${langName}",
  "organicRemedy": [
    "Traditional/organic treatment 1 (e.g. Neem Oil 10,000 ppm @ 3ml/L, Jeevamrutham, Dashaparni Kashayam, Sour Buttermilk spray) in ${langName}",
    "Organic treatment 2 in ${langName}"
  ],
  "chemicalRemedy": [
    "Standard agricultural university (ANGRAU / PJTSAU / ICAR) recommended chemical remedy with exact dose per liter/acre in ${langName}",
    "Alternative chemical spray in ${langName}"
  ],
  "preventiveActions": [
    "Immediate preventive action in ${langName}",
    "Irrigation & fertilizer adjustments in ${langName}"
  ],
  "voiceBrief": "A short, encouraging 2-sentence summary in spoken ${langName} suitable for reading aloud to the farmer."
}`;

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          inlineData: {
            mimeType,
            data: cleanBase64,
          },
        },
        {
          text: `Analyze this plant leaf/crop photograph. Crop context: ${cropHint || 'Unknown crop'}. Farmer remarks: "${farmerNote || 'Please identify the disease and give treatment.'}". Please respond in ${langName} as per the JSON specification.`,
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedResult;
    try {
      parsedResult = JSON.parse(text);
    } catch {
      // Clean possible markdown code fence
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleaned);
    }

    res.json({ success: true, result: parsedResult });
  } catch (error: any) {
    console.error('Plant analysis error:', error);
    res.status(500).json({
      error: error.message || 'Failed to analyze plant photo',
      details: error.toString(),
    });
  }
});

// 2. Interactive Voice & Agricultural Advisor API
app.post('/api/gemini/advisor', async (req, res) => {
  try {
    const { query, language = 'te', location = 'Andhra Pradesh', context } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const langName = language === 'te' ? 'Telugu (తెలుగు)' : language === 'hi' ? 'Hindi (हिंदी)' : 'English';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Farmer question: "${query}". Context: Location is ${location}. Previous context: ${JSON.stringify(context || {})}.
Please answer clearly, concisely, and practically in ${langName} with local farmer terminology (e.g. e-Panta/e-Crop, Rythu Bharosa, Mandi, RBK, Rythu Bazaar, local pesticides/fertilizers). Keep the answer warm, respectful ("రైతు సోదరులారా" / "किसान भाइयों"), and formatted with bullet points for easy scanning. Also include a short "spokenSummary" for voice readout.`,
      config: {
        systemInstruction: `You are Dr. Raithu Mithra, an affectionate and knowledgeable agronomist for farmers in Andhra Pradesh, Telangana, and across India. Provide accurate farming advice in ${langName}.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object' as any,
          properties: {
            answer: { type: 'string' as any, description: 'Detailed formatted response with actionable steps in the requested language' },
            keyAdvicePoints: {
              type: 'array' as any,
              items: { type: 'string' as any },
              description: '3-4 key bullet points',
            },
            spokenSummary: {
              type: 'string' as any,
              description: 'Short spoken natural language reply for audio text-to-speech in the requested language',
            },
            helplines: {
              type: 'array' as any,
              items: { type: 'string' as any },
              description: 'Relevant govt or university helplines (e.g. Kisan Call Centre 1800-180-1551, AP 1902)',
            },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Advisor query error:', error);
    res.status(500).json({ error: error.message || 'Failed to query advisor' });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  const distDir = path.resolve(__dirname, 'dist');
  const indexFile = path.resolve(distDir, 'index.html');
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(indexFile);

  if (isProduction && fs.existsSync(indexFile)) {
    console.log('Serving production static build from:', distDir);
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(indexFile);
    });
  } else {
    console.log('Mounting Vite middleware in development mode');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 RythuSeva Farmhouse Server running on port ${PORT}`);
  });
}

startServer();
