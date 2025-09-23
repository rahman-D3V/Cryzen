import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET() {
  const url = "https://www.newindianexpress.com/nation/2025/Sep/16/at-least-13-dead-16-missing-as-floods-landslides-wreak-havoc-in-dehradun-neighbouring-areas";
  
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Next.js fetch)", // helps avoid blocks
    },
  });

  const html = await res.text();

  // Load HTML into cheerio
  const $ = cheerio.load(html);

  // Try to grab article content (adjust selector if needed)
  const articleText = $("article").text().replace(/\s+/g, " ").trim();

  return NextResponse.json({ text: articleText });
}
