export async function GET() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
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
