import EachCoinLeft from "@/components/eachCoinLeft";
import EachCoinRight from "@/components/eachCoinRight";
import React from "react";

export default async function CoinPage({ params }) {
  const coinId = params.id;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
    headers: {
      accept: "application/json",
      "x-cg-api-key": process.env.CG_API_KEY,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <div className="bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#F8FAFC] mb-2">Unable to load coin data</h2>
          <p className="text-[#94A3B8]">Please try again later</p>
        </div>
      </div>
    );
  }

  const data = await res.json();

  return (
    <div className="bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Clean & Professional */}
        <div className="w-full lg:w-1/4 bg-[#0B1426] border-r border-[#1A2332]">
          <EachCoinRight data={data} />
        </div>
        
        {/* Right Content Area */}
        <div className="w-full lg:w-3/4 bg-[#0B1426]">
          <div className="p-8">
            <div className="text-center py-16">
              <h2 className="text-3xl font-semibold text-[#F8FAFC] mb-4">
                Advanced Analytics Coming Soon
              </h2>
              <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                Professional-grade charts and AI-powered insights to optimize your crypto portfolio decisions.
              </p>
            </div>
            <EachCoinLeft />
          </div>
        </div>
      </div>
    </div>
  );
}
