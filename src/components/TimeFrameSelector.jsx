import React from "react";

const TimeFrameSelector = ({ activeTimeFrame, setActiveTimeFrame }) => {
  // Available timeframes
  const timeframes = ["1D", "7D", "30D", "1Y"];

  return (
    <div className="flex space-x-2 mb-6">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => setActiveTimeFrame(timeframe)}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none
            ${
              activeTimeFrame === timeframe
                ? "bg-blue-500 text-white shadow-md"
                : "bg-[#1A2332] text-[#94A3B8] hover:bg-[#2A3441] hover:text-[#F8FAFC]"
            }
          `}
        >
          {timeframe}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;
