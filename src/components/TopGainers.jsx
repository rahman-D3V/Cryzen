import Image from "next/image";
import React from "react";

function TopGainers({ name, img, price }) {
  return (
    <div className="relative max-w-sm mx-auto p-6 backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-slate-800/40 to-slate-900/60 rounded-2xl border border-white/10 shadow-2xl text-white font-sans">
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
                <p>Top Gainers</p>
              </div>
              <div className="text-xs text-yellow-400 flex items-center font-medium">
                🏅 {name}
              </div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 px-4 py-1.5 text-xs font-semibold rounded-full hover:from-cyan-300 hover:to-teal-300 transition-all duration-200 shadow-lg">
            {`view all >`}
          </button>
        </div>

        {/* ROI Section */}
        <div className="mb-6">
          <div className="text-xs text-slate-400 mb-2 font-medium">30D ROI</div>
          <div className="text-4xl font-bold mb-4 text-white">$ {price}</div>

          {/* Glass Chart Background */}
          <div className="relative h-16 w-full rounded-lg backdrop-blur-sm bg-gradient-to-r from-teal-500/20 via-cyan-500/15 to-teal-600/25 border border-teal-400/20 shadow-inner overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent"></div>

            {/* Chart Line */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 300 64"
              fill="none"
            >
              {/* Background dots */}
              <circle cx="40" cy="45" r="1.5" fill="rgba(255,255,255,0.3)" />
              <circle cx="100" cy="35" r="1.5" fill="rgba(255,255,255,0.3)" />
              <circle cx="160" cy="40" r="1.5" fill="rgba(255,255,255,0.3)" />
              <circle cx="220" cy="28" r="1.5" fill="rgba(255,255,255,0.3)" />
              <circle cx="270" cy="25" r="1.5" fill="rgba(255,255,255,0.3)" />

              {/* Glowing chart line */}
              <path
                d="M20 45 Q60 50 100 35 Q140 25 180 30 Q220 35 260 20 Q280 18 290 15"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="transparent"
                filter="url(#glow)"
              />

              {/* Gradient and glow definitions */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#14B8A6", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#06D6A0", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#14B8A6", stopOpacity: 1 }}
                  />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopGainers;
