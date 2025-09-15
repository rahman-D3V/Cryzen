import React from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

// Process data to include market cap and volume
const processChartData = (apiData) => {
  if (!apiData || !apiData.prices) return [];

  return apiData.prices.map(([timestamp, price], index) => {
    const date = new Date(timestamp);
    const marketCap = apiData.market_caps?.[index]?.[1] || 0;
    const volume = apiData.total_volumes?.[index]?.[1] || 0;
    
    return {
      time: timestamp,
      price: parseFloat(price.toFixed(6)),
      marketCap: marketCap,
      volume: volume,
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      fullDateTime: date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      })
    };
  });
};

// Dark theme tooltip matching your website colors
const DarkTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    // Format large numbers
    const formatLargeNumber = (num) => {
      if (num >= 1e12) {
        return `$${(num / 1e12).toFixed(0).toLocaleString()},${((num % 1e12) / 1e9).toFixed(0).padStart(3, '0')},${((num % 1e9) / 1e6).toFixed(0).padStart(3, '0')},${((num % 1e6) / 1e3).toFixed(0).padStart(3, '0')}`;
      } else if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(0).toLocaleString()},${((num % 1e9) / 1e6).toFixed(0).padStart(3, '0')},${((num % 1e6) / 1e3).toFixed(0).padStart(3, '0')}`;
      } else if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(0).toLocaleString()},${((num % 1e6) / 1e3).toFixed(0).padStart(3, '0')}`;
      } else {
        return `$${num.toLocaleString()}`;
      }
    };
    
    return (
      <div className="bg-[#0B1426] shadow-2xl rounded-lg p-4 border border-[#334155]/30 min-w-[250px]">
        {/* Date/Time - matching your dark theme */}
        <p className="text-[#94A3B8] text-sm font-medium mb-3">
          {data.fullDateTime}
        </p>
        
        {/* Market Cap - using your color scheme */}
        <div className="mb-2">
          <span className="text-[#64748B] text-sm">Market Cap: </span>
          <span className="text-[#F8FAFC] font-semibold">
            {formatLargeNumber(data.marketCap)}
          </span>
        </div>
        
        {/* Volume - using your color scheme */}
        <div>
          <span className="text-[#64748B] text-sm">Vol: </span>
          <span className="text-[#F8FAFC] font-semibold">
            {formatLargeNumber(data.volume)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const EachCoinChart = ({ data, activeTimeFrame }) => {
  const chartData = processChartData(data);
  
  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#1A2332] rounded-lg border border-[#334155]/30">
        <p className="text-[#94A3B8]">Loading chart data...</p>
      </div>
    );
  }

  // Calculate if price went up or down
  const firstPrice = chartData[0]?.price || 0;
  const lastPrice = chartData[chartData.length - 1]?.price || 0;
  const isPositive = lastPrice >= firstPrice;

  return (
    // Changed from white to match your dark theme
    <div className="bg-[#1A2332] rounded-lg p-6 border border-[#334155]/30">
      {/* Header with your dark theme colors */}
      <div className="mb-6">
        <h3 className="text-[#F8FAFC] font-semibold text-lg mb-2">
          Price Chart ({activeTimeFrame})
        </h3>
        <div className="w-full h-px bg-[#334155]/30"></div>
      </div>
      
      {/* Chart with dark background */}
      <div className="h-64 w-full bg-[#0B1426]/50 rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={chartData} 
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={isPositive ? "#00D4AA" : "#EA3943"} 
                  stopOpacity={0.4}
                />
                <stop 
                  offset="95%" 
                  stopColor={isPositive ? "#00D4AA" : "#EA3943"} 
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            
            {/* Dark theme tooltip */}
            <Tooltip 
              content={<DarkTooltip />}
              cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "#00D4AA" : "#EA3943"}
              strokeWidth={2}
              fill="url(#colorPrice)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Optional: Add some stats at bottom matching your theme */}
      <div className="mt-4 pt-4 border-t border-[#334155]/30">
        <div className="flex items-center justify-between text-xs">
          <div className="text-[#64748B]">
            {chartData.length} data points
          </div>
          <div className="text-[#64748B]">
            Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachCoinChart;
