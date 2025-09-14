import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingCoin = ({ name, img, price, rank }) => {
  return (
    <div className="relative max-w-sm mx-auto px-6 pt-6 backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-slate-800/40 to-slate-900/60 rounded-2xl border border-white/10 shadow-2xl text-white font-sans">
      {/* Glassmorphism overlay for extra depth */}
      <div className="inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            {/* Profile icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 rounded-full bg-black/30 border border-white/20">
                <img src={img} alt="" />
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide">
                Trending Coin
              </div>
              <div className="text-sm text-yellow-400 flex items-center font-medium">
                🏅 {name}
              </div>
            </div>
            <Link href={'/trending-crypto'}>
            <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 px-4 py-1.5 text-xs font-semibold rounded-full hover:from-cyan-300 hover:to-teal-300 transition-all cursor-pointer duration-200 shadow-lg relative bottom-[8px]">
              {`view all >`}
            </button>
            </Link>
          </div>
        </div>

        {/* ROI Section */}
        <div className="mb-6">
          <div className="text-s text-slate-400 mb-2 font-medium">
            Market Cap Rank
          </div>
          <div className=" flex gap-1 text-4xl font-semibold mb-4 text-white">
            <span className=" font-extralight">#</span>
            <p>{rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCoin;
