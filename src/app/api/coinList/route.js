export async function GET() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h,7d",
    {
      headers: {
        accept: "application/json",
        "x-cg-api-key": process.env.CG_API_KEY,
      },
    }
  );

  const data = await res.json();
  return Response.json(data);
}
