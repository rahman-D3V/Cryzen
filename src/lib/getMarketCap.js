export async function getMarketCap() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-api-key": "CG-dNMEUoeutyQBnFBbMRwrJ2gT",
    },
  };

  const res = await fetch(`https://api.coingecko.com/api/v3/global`, options);

  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);

  const data = await res.json();
  if (!data) return { marketCap: "" };

  const percentageChange =
    Math.round(data?.data.market_cap_change_percentage_24h_usd * 10) / 10;
  const tradingVolume = Math.round(data?.data.total_volume.usd);
  const marketCap = Math.round(data?.data?.total_market_cap.usd);

  return {
    marketCap,
    percentageChange,
    tradingVolume,
  };
}
