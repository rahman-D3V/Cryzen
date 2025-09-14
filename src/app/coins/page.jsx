"use client"
import TrendingCoin from "@/components/TrendingCoin";
import {getCoinsList } from "@/lib/getCoinsList";
import { getMarketCap } from "@/lib/getMarketCap";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

function page() {

  //getting coinList Data from Zustand
  const coinList = useStore(state => state.coinList)
  const trendingCoins = useStore(state => state.trendingCoins)
  const marketCapData = useStore(state => state.marketCapData)

  const router = useRouter()


  


  // const marketCapData = await getMarketCap();
  // const { marketCap, percentageChange, tradingVolume } = marketCapData;

  // const coinsList = await getCoinsList()


  // Number formatter for readability (adds commas, no decimals)
  const formatNumber = (num) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(num);


    function handleCoin(id){
      router.push(`/coins/${id}`)
    }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] min-h-screen">
    
      <div className="flex items-center justify-center space-x-8 p-8">
        {/* Left - Trending Coin Box */}
        <div className="  bg-gray-900 rounded-2xl border border-white/30 flex items-center justify-center">
          <TrendingCoin name={trendingCoins?.coins?.[0]?.item.name} img={trendingCoins?.coins?.[0]?.item.thumb} price={trendingCoins?.coins?.[0]?.item.data.price} rank={trendingCoins?.coins?.[0]?.item.market_cap_rank}/>
        </div>

        {/* Middle - Top Gainer Box */}
        <div className="  bg-gray-900 rounded-2xl border border-white/30 flex items-center justify-center">
          <TrendingCoin name={trendingCoins?.coins?.[0]?.item.name} img={trendingCoins?.coins?.[0]?.item.thumb} price={trendingCoins?.coins?.[0]?.item.data.price} />
        </div>

        {/* Right - Stacked Market Stats */}
        <div className="flex flex-col space-y-6">
          
          <div className=" border px-7 py-3 gap-7 border-white/30 rounded-xl bg-gray-900/50 backdrop-blur-sm flex items-center justify-center text-white">
            <div className="space-y-2">
              <p>${formatNumber(marketCapData?.data?.total_market_cap.usd)}</p>
              <p>Market Cap{" "}
              <span
                className={
                  marketCapData?.data?.market_cap_change_percentage_24h_usd > 0
                    ? "text-green-400"
                    : "text-red-400"}>
                    {marketCapData?.data?.market_cap_change_percentage_24h_usd > 0 ? "▲" : "▼"}
                    {Math.round(
                      marketCapData?.data?.market_cap_change_percentage_24h_usd * 10
                    ) / 10}
                    %
              </span>
              </p>
            </div>

            <div>
              <img
                src="https://www.coingecko.com/total_market_cap.svg"
                alt="market cap graph"/>
            </div>
          
          </div>

          {/* 24H Trading Volume Box */}
          <div className=" border px-7 py-3 gap-7 border-white/30 rounded-xl bg-gray-900/50 backdrop-blur-sm flex items-center justify-center text-white">
            <div className="space-y-1">
              <p>${formatNumber(marketCapData?.data?.total_volume.usd)}</p>
              <p>24h Trading Volume</p>
            </div>

            <img
              src="https://www.coingecko.com/total_market_cap.svg"
              alt="trading volume graph"
            />
          </div>
        </div>
      </div>


      {/* Table */}
      <div className=" mx-auto max-w-full overflow-x-auto">

        <div className="min-w-[800px] w-full max-w-[1250px] mx-auto">
          <div className="table-layout grid  grid-cols-[60px_300px_120px_80px_80px_180px_180px_200px] px-5 py-3 items-center border-b border-[#3c3c3c] text-sm text-gray-300">
          <p className="">#</p>
          <p className="">Coin</p>
          <p className="">Price</p>
          <p className="text-center">24h</p>
          <p className="text-center">7d</p>
          <p className="text-right ">Market Cap</p>
          <p className="text-right ">24h Volume</p>
          <p className="text-right">Last 7d</p>
        </div>


        {
          coinList?.map((item) => (
            <div key={item.name} className=" table-layout grid grid-cols-[60px_300px_120px_80px_80px_180px_180px_200px] px-5 py-2 items-center border-b border-[#3c3c3c] text-sm text-gray-300">
          <p>{item.market_cap_rank}</p>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleCoin(item.id)}>
            <img className="h-5" src={item.image} alt="" />
            <p className="font-bold">{item.name} <span className="font-light text-gray-600">{item.symbol}</span></p>
          </div>
          <p>{item.current_price}</p>    
          <p  className={`text-center ${item.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
          {Math.round(item.price_change_percentage_24h * 10) / 10}%
          </p>
          <p  className={`text-center ${item.price_change_percentage_7d_in_currency >= 0 ? "text-green-400" : "text-red-400"}`}>
          {Math.round(item.price_change_percentage_7d_in_currency * 10) / 10}%
          </p>
          <p className="text-right ">{formatNumber(item.market_cap)}</p>
          <p className="text-right">{formatNumber(item.total_volume)}</p>
          <div className="flex   justify-end  ">
            <img
              src={`https://www.coingecko.com/coins/${item.market_cap_rank || 1}/sparkline.svg`}
              alt="BTC 7d sparkline"
              
            />
          </div>
        </div>
          ))
        }
        </div>

        
      </div>
      


    </div>
  );
}

export default page;

