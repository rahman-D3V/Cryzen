// src/app/api/explain/route.js
export const runtime = "nodejs";

const CACHE = new Map();
const MAX_LENGTH = 120;

function firstSentence(text) {
  if (!text) return "";
  const one = text.replace(/\s+/g, " ").trim();
  const parts = one.match(/.+?[.!?](\s|$)/);
  return parts ? parts[0].trim() : one;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const term = body?.term;  

    if (!term || typeof term !== "string") {
      return new Response(JSON.stringify({ error: "Missing term" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const normalized = term.trim().slice(0, MAX_LENGTH);
    if (!normalized) {
      return new Response(JSON.stringify({ error: "Empty term after trimming" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const cacheKey = normalized.toLowerCase();
    if (CACHE.has(cacheKey)) {
      return new Response(JSON.stringify({ 
        definition: CACHE.get(cacheKey), 
        cached: true 
      }), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-1.5-pro"; // 🔧 Add fallback
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY not configured" }), { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const prompt = `Explain the cryptocurrency term "${normalized}". Return exactly one short sentence in plain layman's terms.`;

    // 🔧 FIXED: Add API key to URL and remove header
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 🔧 REMOVED: x-goog-api-key header (key is now in URL)
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      console.error("Gemini error:", r.status, text);
      return new Response(JSON.stringify({ error: "LLM provider error" }), { 
        status: 502, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const json = await r.json().catch(() => null);
    
    // 🔧 FIXED: Correct response parsing
    const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🔧 Add debugging
    console.log("Gemini response:", JSON.stringify(json, null, 2));
    console.log("Extracted text:", raw);

    const sentence = firstSentence(raw) || "No concise definition available.";
    console.log("Final sentence:", sentence);

    CACHE.set(cacheKey, sentence);

    return new Response(JSON.stringify({ definition: sentence }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
    
  } catch (err) {
    console.error("Explain route error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
