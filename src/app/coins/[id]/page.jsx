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
    <div className=" overflow-x-hidden bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Clean & Professional */}
        <div className="w-full lg:w-1/3 bg-[#0B1426] border-r border-[#1A2332]">
          <EachCoinRight data={data} />
        </div>

          <div className="w-full lg:w-2/3 bg-[#0B1426]">
            <div className="md:px-8">
              <EachCoinLeft coinId={coinId} data={data}/>
            </div>
          </div>


      </div>
    </div>
  );
}
