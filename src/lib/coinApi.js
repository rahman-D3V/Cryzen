// lib/coinApi.js
async function fetchUrl(url) {
  const res = await fetch(url, {
    headers: { accept: "application/json", "x-cg-api-key": "CG-dNMEUoeutyQBnFBbMRwrJ2gT" },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`CoinGecko ${res.status}: ${text}`);
  }
  return res.json();
}

export async function getCoinList() {
  return fetchUrl(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h,7d"
  );
}

