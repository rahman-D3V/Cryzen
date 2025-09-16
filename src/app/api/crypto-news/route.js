export async function GET() {
  const res = await fetch("https://openapiv1.coinstats.app/news?limit=3", {
    headers: {
      "X-API-KEY": process.env.COINSTATS_API_KEY,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return Response.json(data);
}
