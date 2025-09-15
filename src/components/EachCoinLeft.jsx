'use client';

import React, { useState, useEffect } from 'react';
import TimeFrameSelector from './TimeFrameSelector';
import EachCoinChart from './EachCoinChart';
import { CoinDescription } from './CoinDescription';


const EachCoinLeft = ({ coinId, data }) => {
  const [activeTimeFrame, setActiveTimeFrame] = useState('7D');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTimestamps = (timeFrame) => {
    const now = Math.floor(Date.now() / 1000);
    let daysBack = 7;
    
    switch(timeFrame) {
      case '1D': daysBack = 1; break;
      case '7D': daysBack = 7; break;
      case '30D': daysBack = 30; break;
      case '1Y': daysBack = 365; break;
    }
    
    const from = now - (daysBack * 24 * 60 * 60);
    return { from, to: now };
  };

  useEffect(() => {
    const fetchChartData = async () => {
      if (!coinId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const { from, to } = calculateTimestamps(activeTimeFrame);
        const response = await fetch(
          `/api/chartData?coinId=${coinId}&from=${from}&to=${to}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }
        
        const data = await response.json();
        setChartData(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [activeTimeFrame, coinId]);

  return (
    <div className="p-6">
      <h2 className="text-[#F8FAFC] text-2xl font-semibold mb-6">Analytics</h2>
      
      {/* Time Frame Selector */}
      <TimeFrameSelector 
        activeTimeFrame={activeTimeFrame}
        setActiveTimeFrame={setActiveTimeFrame}
      />
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-96 bg-[#1A2332] rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6] mx-auto mb-2"></div>
            <p className="text-[#94A3B8]">Loading {activeTimeFrame} chart...</p>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
          <p className="text-red-400">❌ Error: {error}</p>
        </div>
      )}
      
      {/* 🔥 Chart Component - Replace raw JSON with beautiful chart */}
      {chartData && !loading && !error && (
        <EachCoinChart 
          data={chartData} 
          activeTimeFrame={activeTimeFrame}
        />
      )}


      <CoinDescription description={data.description.en} data={data}/>

    </div>
  );
};

export default EachCoinLeft;
