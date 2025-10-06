const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY || '';
const HF_MODEL = process.env.HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.3';
const HF_ENDPOINT = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

async function queryHuggingFace(prompt) {
  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 512,
      temperature: 0.3,
      top_p: 0.9,
      return_full_text: false
    },
    options: {
      wait_for_model: true
    }
  };

  const resp = await fetch(HF_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`HF API error ${resp.status}: ${text}`);
  }

  const data = await resp.json();
  // HF returns an array with generated_text or a nested structure depending on model
  const reply = Array.isArray(data)
    ? (data[0]?.generated_text || data[0]?.generated_text?.[0] || '')
    : (data.generated_text || data?.[0]?.generated_text || '');

  return reply || 'Sorry, I could not generate a response.';
}

// Simple chat endpoint (non-streaming)
app.post('/chat', async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ reply: 'Missing prompt' });
  }
  try {
    if (!HUGGING_FACE_API_KEY) throw new Error('Missing HUGGING_FACE_API_KEY');
    const reply = await queryHuggingFace(prompt);
    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ reply: "Sorry, I couldn't process your request." });
  }
});

// Simulated streaming endpoint: generates once, then streams chunks
app.post('/chat-stream', async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Missing prompt');
  }
  try {
    if (!HUGGING_FACE_API_KEY) throw new Error('Missing HUGGING_FACE_API_KEY');

    // Send headers for chunked text streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const full = await queryHuggingFace(prompt);

    // Stream in small chunks to simulate realtime
    const tokens = full.split(/(\s+)/); // keep spaces
    for (const t of tokens) {
      res.write(t);
      await new Promise(r => setTimeout(r, 15));
    }
    res.end();
  } catch (error) {
    console.error('Stream error:', error.message);
    try {
      res.write("Sorry, I couldn't process your request.\n");
      res.end();
    } catch (_) {}
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`HF proxy running on port ${PORT} (model: ${HF_MODEL})`)); 