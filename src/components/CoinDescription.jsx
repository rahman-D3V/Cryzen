import React, { useState } from 'react';

export const CoinDescription = ({ description , data}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300; // Show first 300 characters
  
  const shouldTruncate = description.length > maxLength;
  const displayText = isExpanded ? description : description.slice(0, maxLength);

  return (
    <div className="space-y-4 mt-5">
      <div className="bg-[#0B1426]/30 rounded-lg p-4 border border-[#334155]/20">
      <h4 className="text-[#F8FAFC] font-light text-lg mb-2">About</h4>
        <p className="text-[#94A3B8] leading-relaxed text-sm">
          {displayText}
          {!isExpanded && shouldTruncate && '...'}
        </p>
        
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-[#3B82F6] hover:text-[#60A5FA] text-sm font-medium transition-colors duration-200"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

// Usage

