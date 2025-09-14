export async function getCoinsList() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-api-key": process.env.CG_API_KEY,
    },
  };

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h,7d`,
    options
  );

  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);

  const data = await res.json();
  return data;

 
}
