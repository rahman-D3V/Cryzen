export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get('coinId');
    let from = searchParams.get('from');
    let to = searchParams.get('to');

    if (!coinId) {
      return Response.json(
        { error: 'Missing coinId parameter' }, 
        { status: 400 }
      );
    }

    // Auto-calculate timestamps if missing or invalid
    const now = Math.floor(Date.now() / 1000);
    const maxDaysBack = 365; // CoinGecko's free tier limit
    const minAllowedFrom = now - (maxDaysBack * 24 * 60 * 60);

    // If no timestamps provided, default to last 7 days
    if (!from || !to) {
      to = now;
      from = now - (7 * 24 * 60 * 60); // 7 days ago
    } else {
      // Ensure timestamps are within allowed range
      from = Math.max(parseInt(from), minAllowedFrom);
      to = Math.min(parseInt(to), now);
    }

    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;
    
    // console.log('🔗 CoinGecko URL:', url);
    // console.log('📅 Date Range:', {
    //   from: new Date(from * 1000).toISOString(),
    //   to: new Date(to * 1000).toISOString()
    // });

    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-cg-api-key": process.env.CG_API_KEY,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      // console.log('❌ CoinGecko Error:', errorText);
      
      return Response.json(
        { error: 'Failed to fetch chart data from CoinGecko', details: errorText }, 
        { status: 500 }
      );
    }

    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    console.error('Chart API Error:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message }, 
      { status: 500 }
    );
  }
}
