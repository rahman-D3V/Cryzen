export async function getTrendingCoins() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-api-key": "CG-dNMEUoeutyQBnFBbMRwrJ2gT",
    },
  };

  const res = await fetch(
    `https://api.coingecko.com/api/v3/search/trending`,
    options
  );

  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);

  const data = await res.json();
  const item = data?.coins?.[0]?.item;
  if (!item) return { coinName: "", coinImg: "", coinPrice: null };

  const price = Number(item?.data?.price);
  return {
    coinName: item.name,
    coinImg: item.thumb,
    coinPrice: Math.round(price * 1000) / 1000,
  };
}
