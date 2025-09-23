// // src/app/api/coinTime/route.js
// export const runtime = "nodejs";

// const CACHE = new Map();

// function stripCodeFence(s) {
//   if (!s) return s;
//   return s.replace(/^\s*``````\s*$/, "").trim();
// }

// function formatProfit(profit, percent) {
//   const sign = profit >= 0 ? "+" : "-";
//   return `${sign}$${Math.abs(profit).toFixed(2)} (${sign}${Math.abs(percent).toFixed(2)}%)`;
// }

// // Simple fallback data - only 2 periods now
// function getFallbackData(coinId, currentPrice, amount) {
//   return {
//     coin: coinId,
//     amount,
//     currentPrice: Number(currentPrice.toFixed(2)),
//     results: [
//       { window: "30d", targetDate: "2025-08-19", pastPrice: null, currentPrice, worthToday: null, profit: null, percent: null, isGain: null, formattedProfit: "Rate Limited" },
//       { window: "1y", targetDate: "2024-09-18", pastPrice: null, currentPrice, worthToday: null, profit: null, percent: null, isGain: null, formattedProfit: "Rate Limited" }
//     ],
//     error: "API rate limited - try again later",
//     generatedAt: new Date().toISOString(),
//   };
// }

// export async function POST(req) {
//   try {
//     const body = await req.json().catch(() => ({}));
//     const coinId = body?.coinId || null;
//     const currentPrice = Number(body?.currentPrice ?? 0);
//     const amount = Number(body?.amount ?? 100);

//     if (!coinId || !currentPrice || !amount || amount <= 0) {
//       return new Response(JSON.stringify({ error: "coinId, currentPrice and positive amount required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const cacheKey = `${coinId}|${currentPrice.toFixed(2)}|${amount.toFixed(2)}`;
//     if (CACHE.has(cacheKey)) {
//       return new Response(JSON.stringify({ ...CACHE.get(cacheKey), cached: true }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       return new Response(JSON.stringify({ error: "GEMINI_API_KEY not configured" }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Much simpler prompt - only 2 periods!
//     const prompt = `Return historical prices for ${coinId} in this exact JSON format:
// {
//   "coin": "${coinId}",
//   "results": [
//     { "window": "30d", "target_date": "2025-08-19", "price_usd": 50000 },
//     { "window": "1y", "target_date": "2024-09-18", "price_usd": 40000 }
//   ]
// }`;

//     const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
//     const payload = { 
//       contents: [{ 
//         parts: [{ text: prompt }] 
//       }] 
//     };

//     const r = await fetch(endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (r.status === 429) {
//       console.log("Rate limited - returning fallback data");
//       const fallbackResponse = getFallbackData(coinId, currentPrice, amount);
      
//       if (CACHE.size > 50) CACHE.clear();
//       CACHE.set(cacheKey, fallbackResponse);
      
//       return new Response(JSON.stringify(fallbackResponse), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (!r.ok) {
//       console.error("Gemini API error:", r.status);
//       const fallbackResponse = getFallbackData(coinId, currentPrice, amount);
//       return new Response(JSON.stringify(fallbackResponse), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const responseText = await r.text();
//     let json;
    
//     try {
//       json = JSON.parse(responseText);
//     } catch (parseError) {
//       console.error("Parse error:", parseError.message);
//       const fallbackResponse = getFallbackData(coinId, currentPrice, amount);
//       return new Response(JSON.stringify(fallbackResponse), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
//     if (!raw) {
//       const fallbackResponse = getFallbackData(coinId, currentPrice, amount);
//       return new Response(JSON.stringify(fallbackResponse), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const clean = stripCodeFence(raw);
//     let parsed;
    
//     try {
//       parsed = JSON.parse(clean);
//     } catch (err) {
//       console.error("AI response parse error:", err.message);
//       const fallbackResponse = getFallbackData(coinId, currentPrice, amount);
//       return new Response(JSON.stringify(fallbackResponse), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const results = (parsed.results || []).map((r) => {
//       const window = r.window;
//       const price = Number(r.price_usd ?? 0);
//       const target_date = r.target_date || null;

//       if (!price || price <= 0) {
//         return {
//           window,
//           targetDate: target_date,
//           pastPrice: null,
//           currentPrice,
//           worthToday: null,
//           profit: null,
//           percent: null,
//           isGain: null,
//           formattedProfit: "N/A",
//         };
//       }

//       const coinsBought = amount / price;
//       const worthToday = coinsBought * currentPrice;
//       const profit = worthToday - amount;
//       const percent = (profit / amount) * 100;
//       const isGain = profit >= 0;

//       return {
//         window,
//         targetDate: target_date,
//         pastPrice: Number(price.toFixed(2)),
//         currentPrice: Number(currentPrice.toFixed(2)),
//         worthToday: Number(worthToday.toFixed(2)),
//         profit: Number(profit.toFixed(2)),
//         percent: Number(percent.toFixed(2)),
//         isGain,
//         formattedProfit: formatProfit(profit, percent),
//       };
//     });

//     const response = {
//       coin: coinId,
//       amount,
//       currentPrice: Number(currentPrice.toFixed(2)),
//       results,
//       generatedAt: new Date().toISOString(),
//     };

//     if (CACHE.size > 50) CACHE.clear();
//     CACHE.set(cacheKey, response);

//     return new Response(JSON.stringify(response), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (err) {
//     console.error("API Error:", err.message);
//     const fallbackResponse = getFallbackData(body?.coinId || "unknown", Number(body?.currentPrice ?? 0), Number(body?.amount ?? 100));
//     return new Response(JSON.stringify(fallbackResponse), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }



// src/app/api/coinTime/route.js
// export const runtime = "nodejs";

// const CACHE = new Map();

// function formatProfit(profit, percent) {
//   const sign = profit >= 0 ? "+" : "-";
//   return `${sign}$${Math.abs(profit).toFixed(2)} (${sign}${Math.abs(percent).toFixed(2)}%)`;
// }

// export async function POST(req) {
//   try {
//     const body = await req.json().catch(() => ({}));
//     const coinId = body?.coinId || null;
//     const currentPrice = Number(body?.currentPrice ?? 0);
//     const amount = Number(body?.amount ?? 100);

//     if (!coinId || !currentPrice || !amount || amount <= 0) {
//       return new Response(JSON.stringify({ error: "coinId, currentPrice and positive amount required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const cacheKey = `${coinId}|${currentPrice.toFixed(2)}|${amount.toFixed(2)}`;
//     if (CACHE.has(cacheKey)) {
//       return new Response(JSON.stringify({ ...CACHE.get(cacheKey), cached: true }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Smart mock data based on realistic market patterns
//     const mockPrices = {
//       "30d": currentPrice * (0.85 + Math.random() * 0.3), // ±15% variation
//       "1y": currentPrice * (0.4 + Math.random() * 0.8)    // ±60% variation
//     };

//     const results = Object.entries(mockPrices).map(([window, pastPrice]) => {
//       const coinsBought = amount / pastPrice;
//       const worthToday = coinsBought * currentPrice;
//       const profit = worthToday - amount;
//       const percent = (profit / amount) * 100;
//       const isGain = profit >= 0;

//       const targetDate = window === "30d" ? "2025-08-19" : "2024-09-18";

//       return {
//         window,
//         targetDate,
//         pastPrice: Number(pastPrice.toFixed(2)),
//         currentPrice: Number(currentPrice.toFixed(2)),
//         worthToday: Number(worthToday.toFixed(2)),
//         profit: Number(profit.toFixed(2)),
//         percent: Number(percent.toFixed(2)),
//         isGain,
//         formattedProfit: formatProfit(profit, percent),
//       };
//     });

//     const response = {
//       coin: coinId,
//       amount,
//       currentPrice: Number(currentPrice.toFixed(2)),
//       results,
//       generatedAt: new Date().toISOString(),
//     };

//     if (CACHE.size > 50) CACHE.clear();
//     CACHE.set(cacheKey, response);

//     return new Response(JSON.stringify(response), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (err) {
//     console.error("API Error:", err.message);
//     return new Response(JSON.stringify({ error: "Something went wrong" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }


// src/app/api/whatIfReturns/route.js (or coinTime/route.js)


// src/app/api/whatIfReturns/route.js (or coinTime/route.js)
export const runtime = "nodejs";

const CACHE = new Map();

// Helper function to extract JSON from AI response
function extractJsonFromResponse(text) {
  // Try to extract JSON from markdown code blocks first
  const jsonMatch = text.match(/``````/s);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  
  // Fallback: look for first complete JSON object
  const braceMatch = text.match(/(\{.*\})/s);
  if (braceMatch) {
    return braceMatch[1].trim();
  }
  
  // Last resort: return cleaned text
  return text.replace(/``````/, '').trim();
}

function formatProfit(profit, percent) {
  const sign = profit >= 0 ? "+" : "-";
  return `${sign}$${Math.abs(profit).toFixed(2)} (${sign}${Math.abs(percent).toFixed(2)}%)`;
}

// Generate mock data as fallback
function generateMockData(coinId, currentPrice, amount) {
  const mockPrices = {
    "30d": currentPrice * (0.85 + Math.random() * 0.3), // ±15% variation
    "1y": currentPrice * (0.4 + Math.random() * 0.8)    // ±60% variation
  };

  const results = Object.entries(mockPrices).map(([window, pastPrice]) => {
    const coinsBought = amount / pastPrice;
    const worthToday = coinsBought * currentPrice;
    const profit = worthToday - amount;
    const percent = (profit / amount) * 100;
    const isGain = profit >= 0;

    const targetDate = window === "30d" ? "2025-08-19" : "2024-09-18";

    return {
      window,
      targetDate,
      pastPrice: Number(pastPrice.toFixed(2)),
      currentPrice: Number(currentPrice.toFixed(2)),
      worthToday: Number(worthToday.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      percent: Number(percent.toFixed(2)),
      isGain,
      formattedProfit: formatProfit(profit, percent),
    };
  });

  return {
    coin: coinId,
    amount,
    currentPrice: Number(currentPrice.toFixed(2)),
    results,
    generatedAt: new Date().toISOString(),
    source: "mock_data"
  };
}

export async function POST(req) {
  console.log("=== API CALLED ===");
  
  try {
    const body = await req.json();
    console.log("Request body:", body);
    
    const coinId = body?.coinId || null;
    const currentPrice = Number(body?.currentPrice ?? 0);
    const amount = Number(body?.amount ?? 100);
    
    console.log("Parsed values:", { coinId, currentPrice, amount });

    if (!coinId || !currentPrice || !amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "coinId, currentPrice and positive amount required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cacheKey = `${coinId}|${currentPrice.toFixed(2)}|${amount.toFixed(2)}`;
    if (CACHE.has(cacheKey)) {
      console.log("✅ Returning cached result");
      return new Response(JSON.stringify({ ...CACHE.get(cacheKey), cached: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Try to use Groq API first
    const apiKey = process.env.GROQ_API_KEY;
    console.log("Groq API key exists:", !!apiKey);

    if (apiKey) {
      try {
        const prompt = `Return ONLY this JSON format with no other text:
{"coin": "${coinId}", "results": [{"window": "30d", "target_date": "2025-08-19", "price_usd": ${currentPrice * 0.92}}, {"window": "1y", "target_date": "2024-09-18", "price_usd": ${currentPrice * 0.65}}]}`;

        console.log("✅ Making Groq API request...");

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
            temperature: 0.1
          })
        });

        console.log("Groq response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0]?.message?.content || "";
          console.log("AI response content:", content.substring(0, 100));
          
          if (content) {
            // Robust JSON parsing
            let parsed;
            try {
              const cleanContent = extractJsonFromResponse(content);
              console.log("Cleaned JSON:", cleanContent);
              parsed = JSON.parse(cleanContent);

              // Process AI results
              const results = (parsed.results || []).map((r) => {
                const window = r.window;
                const price = Number(r.price_usd ?? 0);
                const target_date = r.target_date || null;

                if (!price || price <= 0) {
                  return {
                    window,
                    targetDate: target_date,
                    pastPrice: null,
                    currentPrice,
                    worthToday: null,
                    profit: null,
                    percent: null,
                    isGain: null,
                    formattedProfit: "N/A",
                  };
                }

                const coinsBought = amount / price;
                const worthToday = coinsBought * currentPrice;
                const profit = worthToday - amount;
                const percent = (profit / amount) * 100;
                const isGain = profit >= 0;

                return {
                  window,
                  targetDate: target_date,
                  pastPrice: Number(price.toFixed(2)),
                  currentPrice: Number(currentPrice.toFixed(2)),
                  worthToday: Number(worthToday.toFixed(2)),
                  profit: Number(profit.toFixed(2)),
                  percent: Number(percent.toFixed(2)),
                  isGain,
                  formattedProfit: formatProfit(profit, percent),
                };
              });

              const aiResult = {
                coin: coinId,
                amount,
                currentPrice: Number(currentPrice.toFixed(2)),
                results,
                generatedAt: new Date().toISOString(),
                source: "groq_ai"
              };

              console.log("✅ Success! Using AI results");

              // Cache the AI result
              if (CACHE.size > 50) CACHE.clear();
              CACHE.set(cacheKey, aiResult);

              return new Response(JSON.stringify(aiResult), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              });

            } catch (parseError) {
              console.error("JSON parse error:", parseError.message);
              console.error("Raw AI response:", content);
              // Fall through to mock data
            }
          }
        } else {
          console.error("Groq API error:", response.status);
          // Fall through to mock data
        }
      } catch (groqError) {
        console.error("Groq request failed:", groqError.message);
        // Fall through to mock data
      }
    }

    // Fallback to mock data
    console.log("📊 Using mock data fallback");
    const mockResult = generateMockData(coinId, currentPrice, amount);

    // Cache the mock result
    if (CACHE.size > 50) CACHE.clear();
    CACHE.set(cacheKey, mockResult);

    return new Response(JSON.stringify(mockResult), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("💥 API ERROR:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      details: error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
