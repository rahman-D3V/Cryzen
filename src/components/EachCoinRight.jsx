import React from "react";

const EachCoinRight = ({ data }) => {

  console.log(data.description.en)
  

  return (
    <div className="bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] h-screen  ">
      <div className="p-6">

        {
          console.log("data.description.en")
          
        }
        
        {/* Clean Coin Header - Matching Hero Typography */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src={data.image.large} 
              alt={data.name} 
              className="h-16 w-16 rounded-full" 
            />
            <div>
              <h1 className="text-2xl font-semibold text-[#F8FAFC] mb-1">
                {data.name}
              </h1>
              <div className="flex items-center space-x-3">
                <span className="text-[#94A3B8] font-medium text-sm uppercase tracking-wider">
                  {data.symbol}
                </span>
                <span className="text-[#64748B] text-sm">
                  Rank #{data.market_cap_rank}
                </span>
              </div>
            </div>
          </div>
          
          {/* Price Display - Clean & Professional */}
          <div className="space-y-2">
            <div className="text-4xl font-bold text-[#F8FAFC]">
              ${data.market_data.current_price.usd.toLocaleString()}
            </div>
            <div className={`inline-flex items-center text-sm font-medium ${
              data.market_data.price_change_percentage_24h >= 0 
                ? "text-[#10B981]" 
                : "text-[#EF4444]"
            }`}>
              {data.market_data.price_change_percentage_24h >= 0 ? "+" : ""}
              {data.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
            </div>
          </div>
        </div>

        {/* Clean Stats Section */}
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-semibold text-[#F8FAFC] border-b border-[#1A2332] pb-3">
            Key Metrics
          </h3>
          
          <div className="space-y-4">
            <StatRow 
              label="Market Cap" 
              value={`$${data.market_data.market_cap.usd.toLocaleString()}`}
            />
            <StatRow 
              label="24h Volume" 
              value={`$${data.market_data.total_volume.usd.toLocaleString()}`}
            />
            <StatRow 
              label="Circulating Supply" 
              value={`${data.market_data.circulating_supply.toLocaleString()} ${data.symbol.toUpperCase()}`}
            />
            <StatRow 
              label="Fully Diluted Valuation" 
              value={`$${data.market_data.fully_diluted_valuation.usd.toLocaleString()}`}
            />
          </div>
        </div>

        {/* Price History - Clean Design */}
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-semibold text-[#F8FAFC] border-b border-[#1A2332] pb-3">
            Price History
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#94A3B8] text-sm">24h Range</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#F8FAFC] font-medium">
                  ${data.market_data.low_24h.usd.toLocaleString()}
                </span>
                <span className="text-[#64748B]">—</span>
                <span className="text-[#F8FAFC] font-medium">
                  ${data.market_data.high_24h.usd.toLocaleString()}
                </span>
              </div>
            </div>

            <StatRow 
              label="All-Time High" 
              value={`$${data.market_data.ath.usd.toLocaleString()}`}
              subtitle={new Date(data.market_data.ath_date.usd).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              })}
            />

            <StatRow 
              label="All-Time Low" 
              value={`$${data.market_data.atl.usd.toLocaleString()}`}
              subtitle={new Date(data.market_data.atl_date.usd).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              })}
            />
          </div>
        </div>

        {/* Clean Resources Section */}
        {(data.links?.homepage?.length > 0 || data.links?.whitepaper) && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#F8FAFC] border-b border-[#1A2332] pb-3">
              Resources
            </h3>
            
            <div className="space-y-3 flex flex-wrap gap-2">
              {data.links?.homepage?.length > 0 && data.links.homepage[0] && (
                <CleanLink
                  href={data.links.homepage[0]}
                  text="Official Website"
                />
              )}
              {data.links?.whitepaper && data.links.whitepaper.trim() !== "" && (
                <CleanLink
                  href={data.links.whitepaper}
                  text="Whitepaper"
                />
              )}

              {data.links?.twitter_screen_name && data.links.twitter_screen_name.trim() !== "" && (
                <CleanLink
                  href={`https://twitter.com/${data.links.twitter_screen_name}`}
                  text="Twitter"
                />
              )}
              {data.links?.subreddit_url && data.links.subreddit_url.trim() !== "" && (
                <CleanLink
                  href={data.links.subreddit_url}
                  text="Reddit"
                />
              )}



            </div>
          </div>
        )}

        <p>hOLA</p>
      </div>
    </div>
  );
};

// Clean Stat Row Component - Matching Hero Section Simplicity
const StatRow = ({ label, value, subtitle }) => (
  <div className="flex justify-between items-start py-2 border">
    <div className="text-[#94A3B8] text-sm font-medium">
      {label}
    </div>
    <div className="text-right">
      <div className="text-[#F8FAFC] font-medium text-sm">
        {value}
      </div>
      {subtitle && (
        <div className="text-[#64748B] text-xs mt-1">
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

// Clean Link Component - Professional Style
const CleanLink = ({ href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-[#3B82F6] hover:text-[#06B6D4] text-sm font-medium transition-colors duration-200 py-2 border-b border-[#1A2332] hover:border-[#3B82F6]/30"
  >
    {text} →
  </a>
);

export default EachCoinRight;
