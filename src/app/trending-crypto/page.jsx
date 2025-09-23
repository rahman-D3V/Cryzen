"use client"
import Link from "next/link";
import React from "react";
import { useStore } from "@/store/useStore";

const TrendingCryptoPage = () => {

  const trendingCoins = useStore(state => state.trendingCoins)

  // console.log(trendingCoins?.coins?.[7]?.item);
  

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] min-h-screen">

      <div className="p-8 px-37 mb-10">

        <div className="flex items-center space-x-3">
          <Link href={"/coins"}>
            <p className="text-white cursor-pointer">Coins</p>
          </Link>
          <p className="text-white">{">"}</p>
          <p className="text-gray-400">Trending-Crypto</p>
        </div>

        <div className="mt-7 space-y-2">
          <p className="text-white text-2xl ">Trending Cryptocurrencies Today</p>
          <p className="text-white">Explore the most popular cryptocurrencies on Cryzen. Ranked by the coins with the highest searches in the past 24 hours.</p>
        </div>

      </div>

      {/* Table */}
      <div className=" mx-auto max-w-full overflow-x-auto">

        <div className="min-w-[800px] w-full max-w-[1250px] mx-auto">
          <div className="table-layout grid  grid-cols-[60px_300px_120px_80px_180px_180px_200px] px-5 py-3 items-center border-b border-[#3c3c3c] text-sm text-gray-300">
          <p className="">#</p>
          <p className="">Coin</p>
          <p className="">Price</p>
          <p className="text-center">24h</p>
          {/* <p className="text-center">7d</p> */}
          <p className="text-right ">Market Cap</p>
          <p className="text-right ">24h Volume</p>
          <p className="text-right">Last 7d</p>
        </div>


        {
          trendingCoins?.coins?.map((eachCoin) => (
            <div key={eachCoin.item.coins} className="table-layout grid grid-cols-[60px_300px_120px_80px_180px_180px_200px] px-5 py-2 items-center border-b border-[#3c3c3c] text-sm text-gray-300">
          <p>{eachCoin.item.market_cap_rank}</p>
          <div className="flex items-center gap-3">
            <img className="h-5" src={eachCoin.item.large} alt="" />
            <p className="font-bold">{eachCoin.item.name} <span className="font-light text-gray-600">{eachCoin.item.symbol}</span></p>
          </div>
          <p>{250 || eachCoin.item.data.price}</p>    
          <p  className={`text-center ${eachCoin.item.data.price_change_percentage_24h.usd >= 0 ? "text-green-400" : "text-red-400"}`}>
          {Math.round(eachCoin.item.data.price_change_percentage_24h.usd * 10) / 10}%
          </p>
          {/* <p  className={`text-center ${item.price_change_percentage_7d_in_currency >= 0 ? "text-green-400" : "text-red-400"}`}>
          {Math.round(item.price_change_percentage_7d_in_currency * 10) / 10}%
          </p> */}
          <p className="text-right ">{(eachCoin.item.data.market_cap)}</p>
          <p className="text-right">{(eachCoin.item.data.total_volume)}</p>
          <div className="flex   justify-end  ">
            <img
              src={eachCoin.item.data.sparkline}
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
};

export default TrendingCryptoPage;







// "use client"
// import Link from "next/link";
// import React from "react";
// import { useStore } from "@/store/useStore";

// const TrendingCryptoPage = () => {
//   const trendingCoins = useStore(state => state.trendingCoins);

//   // Format number helper
//   const formatNumber = (num) => {
//     if (!num) return "N/A";
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(num);
//   };

//   return (
//     <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] min-h-screen">
      
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto p-8 mb-10">
        
//         {/* Breadcrumb Navigation */}
//         <nav className="flex items-center space-x-3 mb-8" aria-label="Breadcrumb">
//           <Link href="/coins" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium">
//             Coins
//           </Link>
//           <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//           </svg>
//           <span className="text-gray-400 font-medium">Trending Cryptocurrencies</span>
//         </nav>

//         {/* Page Header */}
//         <header className="space-y-4 max-w-4xl">
//           <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//             Trending Cryptocurrencies Today
//           </h1>
//           <p className="text-gray-300 text-lg leading-relaxed">
//             Explore the most popular cryptocurrencies on Cryzen. Ranked by the coins with the highest searches in the past 24 hours.
//           </p>
//           <div className="flex items-center space-x-4 pt-2">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-sm text-gray-400">Live Market Data</span>
//             </div>
//             <div className="text-sm text-gray-500">
//               Updated: {new Date().toLocaleTimeString()}
//             </div>
//           </div>
//         </header>
//       </div>

//       {/* Table Container */}
//       <div className="mx-auto max-w-full overflow-x-auto px-4 pb-8">
//         <div className="min-w-[900px] w-full max-w-[1250px] mx-auto">
          
//           {/* Table Header */}
//           <div className="grid grid-cols-[60px_300px_120px_100px_180px_180px_200px] px-6 py-4 items-center border-b-2 border-gray-600 text-sm font-semibold text-gray-300 bg-gray-800/30 rounded-t-lg">
//             <p className="text-gray-400">#</p>
//             <p className="text-gray-400">Coin</p>
//             <p className="text-gray-400">Price</p>
//             <p className="text-center text-gray-400">24h Change</p>
//             <p className="text-right text-gray-400">Market Cap</p>
//             <p className="text-right text-gray-400">24h Volume</p>
//             <p className="text-right text-gray-400">Price Chart</p>
//           </div>

//           {/* Table Body */}
//           <div className="bg-gray-900/50 rounded-b-lg border border-gray-700 border-t-0">
//             {trendingCoins?.coins?.length > 0 ? (
//               trendingCoins.coins.map((eachCoin, index) => (
//                 <div 
//                   key={eachCoin.item.id || eachCoin.item.name} 
//                   className="grid grid-cols-[60px_300px_120px_100px_180px_180px_200px] px-6 py-4 items-center border-b border-gray-700/50 text-sm text-gray-300 hover:bg-gray-800/40 transition-colors duration-200 cursor-pointer group"
//                 >
//                   {/* Rank */}
//                   <p className="text-gray-500 font-medium">
//                     {eachCoin.item.market_cap_rank || index + 1}
//                   </p>
                  
//                   {/* Coin Info */}
//                   <div className="flex items-center gap-3 min-w-0">
//                     <img 
//                       className="h-8 w-8 rounded-full flex-shrink-0 border border-gray-600" 
//                       src={eachCoin.item.large} 
//                       alt={`${eachCoin.item.name} logo`}
//                       loading="lazy"
//                     />
//                     <div className="min-w-0">
//                       <p className="font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
//                         {eachCoin.item.name}
//                       </p>
//                       <p className="text-xs text-gray-500 uppercase font-medium">
//                         {eachCoin.item.symbol}
//                       </p>
//                     </div>
//                   </div>
                  
//                   {/* Price */}
//                   <p className="font-semibold text-white">
//                     ${eachCoin.item.data?.price ? 
//                       formatNumber(eachCoin.item.data.price) : 
//                       'N/A'
//                     }
//                   </p>
                  
//                   {/* 24h Change */}
//                   <div className="text-center">
//                     {eachCoin.item.data?.price_change_percentage_24h?.usd !== undefined ? (
//                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
//                         eachCoin.item.data.price_change_percentage_24h.usd >= 0 
//                           ? 'bg-green-900/30 text-green-400 border border-green-400/20' 
//                           : 'bg-red-900/30 text-red-400 border border-red-400/20'
//                       }`}>
//                         {eachCoin.item.data.price_change_percentage_24h.usd >= 0 ? '+' : ''}
//                         {eachCoin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
//                       </span>
//                     ) : (
//                       <span className="text-gray-500">N/A</span>
//                     )}
//                   </div>
                  
//                   {/* Market Cap */}
//                   <p className="text-right text-gray-300">
//                     {eachCoin.item.data?.market_cap ? 
//                       `$${formatNumber(eachCoin.item.data.market_cap)}` : 
//                       'N/A'
//                     }
//                   </p>
                  
//                   {/* Volume */}
//                   <p className="text-right text-gray-300">
//                     {eachCoin.item.data?.total_volume ? 
//                       `$${formatNumber(eachCoin.item.data.total_volume)}` : 
//                       'N/A'
//                     }
//                   </p>
                  
//                   {/* Sparkline Chart */}
//                   <div className="flex justify-end">
//                     {eachCoin.item.data?.sparkline ? (
//                       <img
//                         src={eachCoin.item.data.sparkline}
//                         alt={`${eachCoin.item.name} price trend`}
//                         className="h-10 w-24 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div className="h-10 w-24 bg-gray-700/30 rounded flex items-center justify-center">
//                         <span className="text-xs text-gray-500">No data</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="flex items-center justify-center py-16">
//                 <div className="text-center">
//                   <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
//                     <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <p className="text-gray-400 text-lg font-medium">No trending coins available</p>
//                   <p className="text-gray-500 text-sm mt-2">Please try again later</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendingCryptoPage;
