"use client"

import Link from "next/link";

const CoinTable = () => {
  const SAMPLE = [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 110790.93,
      change24h: -1.52,
      image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png"
    },
    {
      rank: 2,
      name: "Ethereum", 
      symbol: "ETH",
      price: 4299.17,
      change24h: -2.92,
      image: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png"
    },
    {
      rank: 3,
      name: "Tether",
      symbol: "USDT", 
      price: 1.00,
      change24h: 0.01,
      image: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png"
    },
    {
      rank: 4,
      name: "XRP",
      symbol: "XRP",
      price: 2.806,
      change24h: -1.26,
      image: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png"
    },
    {
      rank: 5,
      name: "BNB",
      symbol: "BNB",
      price: 862.96,
      change24h: 1.4,
      image: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png"
    },
  ];

  return (
    <section className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Table Container */}
        <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-6 px-6 py-4 border-b border-gray-800">
            <div className="text-gray-400 text-sm">#</div>
            <div className="text-gray-400 text-sm col-span-2">Name</div>
            <div className="text-gray-400 text-sm text-right">Price</div>
            <div className="text-gray-400 text-sm text-right">24h Change</div>
            <div className="text-gray-400 text-sm text-right">Price Graph (7D)</div>
          </div>

          {/* Table Rows */}
          {SAMPLE.map((coin) => {
            const isPositive = coin.change24h >= 0;
            return (
              <div 
                key={coin.rank} 
                className="grid grid-cols-6 gap-6 items-center px-6 py-4 border-b border-gray-800 hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                {/* Star + Rank */}
                <div className="flex items-center gap-3">
                  <button className="text-gray-500 hover:text-yellow-400 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <span className="text-gray-400 font-medium">{coin.rank}</span>
                </div>

                {/* Coin Name */}
                <div className="col-span-2 flex items-center gap-3">
                  <img 
                    src={coin.image} 
                    alt={coin.name} 
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/32/3b82f6/ffffff?text=${coin.symbol.charAt(0)}`
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{coin.name}</span>
                    <span className="text-gray-400">• {coin.symbol}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <span className="text-white font-semibold">
                    ${coin.price.toLocaleString()}
                  </span>
                </div>

                {/* 24h Change */}
                <div className="text-right">
                  <span className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(coin.change24h)}%
                  </span>
                </div>

                {/* Price Graph Placeholder */}
                <div className="text-right">
                  <div className="inline-block">
                    <svg width="80" height="24" className="overflow-visible">
                      <defs>
                        <linearGradient id={`gradient-${coin.rank}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.8"/>
                          <stop offset="100%" stopColor={isPositive ? '#059669' : '#dc2626'} stopOpacity="0.9"/>
                        </linearGradient>
                      </defs>
                      <polyline
                        fill="none"
                        stroke={`url(#gradient-${coin.rank})`}
                        strokeWidth="1.5"
                        points={
                          isPositive 
                            ? "0,20 20,18 40,16 60,12 80,8"
                            : "0,4 20,8 40,12 60,16 80,20"
                        }
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* See More Button */}
          <div className="flex justify-center py-8">
            <Link href={'/coins'}>
              <button className="px-8 py-3 rounded-full border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-all duration-200">
              See More Coins
            </button>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}


export default CoinTable