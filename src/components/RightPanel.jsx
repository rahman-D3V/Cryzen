"use client"

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);
const RightPanel = () => {
  // Purple chart data to match the image
  const chartData = {
    labels: Array(20).fill(''),
    datasets: [
      {
        data: [40, 45, 60, 50, 70, 65, 80, 75, 60, 40, 30, 45, 65, 80, 70, 85, 75, 60, 50, 55],
        fill: true,
        backgroundColor: 'rgba(139, 92, 246, 0.4)',
        borderColor: '#8B5CF6',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: { point: { radius: 0 } }
  };

  return (
    <div className="max-w-md mx-auto bg-[#1E1E1E]/30 rounded-2xl border border-gray-600 p-5 text-white shadow-2xl">
      
      {/* Top Status Bar */}
      <div className="flex justify-between items-center text-xs mb-4 pb-3 border-b border-gray-600">
        <div className="flex items-center gap-2 text-purple-400 uppercase font-semibold">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          LIVE
        </div>
        <div className="flex gap-4 text-xs">
          <span>$61,483 <span className="text-green-400">1.1%</span></span>
          <span>ETH $3,429 <span className="text-red-400">-0.9%</span></span>
          <span>SOL $120.04 <span className="text-red-400">-1.62%</span></span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        
        {/* Left Column - Balance and Stats */}
        <div className="col-span-2">
          {/* Balance */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">Balance</p>
            <h2 className="text-3xl font-bold">$24,800</h2>
          </div>

          {/* Market Stats Row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-xs">Market Cap</p>
              <p className="text-white font-semibold">1.1T</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-xs">24h Vol</p>
              <p className="text-white font-semibold">42B</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-xs">BTC Dom</p>
              <p className="text-white font-semibold">41%</p>
            </div>
          </div>

          {/* Crypto Performance */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-800 rounded-lg p-3 flex justify-between">
              <span className="font-semibold">BTC</span>
              <span className="text-green-400">1.1%</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 flex justify-between">
              <span className="font-semibold">ETH</span>
              <span className="text-red-400">-0.9%</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 flex justify-between">
              <span className="font-semibold">SOL</span>
              <span className="text-red-400">-1.62%</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 flex justify-between">
              <span className="font-semibold">BNB</span>
              <span className="text-green-400">1.75%</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          
          {/* Purple Chart */}
          <div className="h-32 bg-gray-900 rounded-lg p-2">
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Alerts */}
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Alerts</p>
            <p className="text-white text-sm font-semibold">BTC &gt; $61k</p>
          </div>

          {/* Watchlist */}
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-2">Watchlist</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>BTC</span>
                <span className="text-green-400">1.1%</span>
              </div>
              <div className="flex justify-between">
                <span>ETH</span>
                <span className="text-red-400">-0.9%</span>
              </div>
              <div className="flex justify-between">
                <span>SOL</span>
                <span className="text-red-400">-1.62%</span>
              </div>
            </div>
          </div>

          {/* Exchanges */}
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-white font-semibold text-sm mb-1">Exchanges</p>
            <p className="text-gray-300 text-xs">
              <strong>Binance</strong> · <strong>Coinbase</strong> · <strong>Kraken</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPanel