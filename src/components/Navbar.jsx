"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';



const Navbar = () => {

  const setCoinList = useStore(state => state.setCoinList)
  const setTrendingCoins = useStore(state => state.setTrendingCoins)
  const setMarketCapData = useStore(state => state.setMarketCapData)
  const marketCapData = useStore(state => state.marketCapData)
  const coinList = useStore(state => state.coinList)
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState([]);
  
  

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);



  
  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch("/api/coinList"); // calls your safe server route
      const data = await res.json();
      setCoins(data);
      setCoinList(data)
      
    };
    const fetchTrendingCoins = async () => {
      const res = await fetch("/api/trendingCoins"); // calls your safe server route
      const data = await res.json();
      setTrendingCoins(data)
      
    };
    const fetchMarketCapData = async () => {
      const res = await fetch("/api/marketCapData"); // calls your safe server route
      const data = await res.json();
      setMarketCapData(data)
      
    };

    const fetchNews = async () => {
      const response = await fetch("");
      const html = await response.text();
      console.log(html)
      
      
    };
    fetchCoins();
    fetchTrendingCoins()
    fetchMarketCapData()
    fetchNews()

  }, []);




  const tickerData = [
    { symbol: "BTC", price: "$57,432", change: "+2.3%", pos: true },
    { symbol: "ETH", price: "$3,912", change: "-1.2%", pos: false },
    { symbol: "SOL", price: "$114.22", change: "+5.8%", pos: true },
    { symbol: "ADA", price: "$0.42", change: "-0.6%", pos: false },
    { symbol: "XRP", price: "$0.74", change: "+1.1%", pos: true },
  ];

  const marqueeItems = [...tickerData, ...tickerData, ...tickerData, ...tickerData, ...tickerData];

  return (
    <header className="sticky top-0 z-50">
      {
        // console.log(marketCapData?.data)
        
      }
      {/* Main navbar with Deep Ocean Professional colors */}
      <div className="w-full bg-[#0B1426] border-b border-[#2D3748]/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Logo & Navigation */}
            <div className="flex items-center gap-10">
              <Link href="/" className="flex items-center gap-3 no-underline group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] shadow-[0_8px_32px_rgba(59,130,246,0.25)] group-hover:shadow-[0_12px_40px_rgba(6,182,212,0.4)] transition-all duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-95"
                  >
                    <circle cx="12" cy="12" r="9" className="fill-white opacity-20" />
                    <path
                      d="M8 12c2-4 8-4 10 0"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="leading-none">
                  <div className="text-[#F8FAFC] font-semibold text-lg tracking-tight">Cryzen</div>
                  <div className="text-xs text-[#06B6D4] font-medium">AI Crypto Intelligence</div>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  href="#features"
                  className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 relative group"
                >
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="#dashboard"
                  className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="#portfolio"
                  className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 relative group"
                >
                  Portfolio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </nav>
            </div>

            {/* Right: Auth buttons & mobile menu */}
            <div className="flex items-center gap-4">
              <Link
                href="#login"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1A2332] transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                href="#signup"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F8FAFC] shadow-[0_8px_32px_rgba(59,130,246,0.25)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.35)] hover:scale-[1.02] transition-all duration-300"
              >
                Start for Free
              </Link>
              <button
                aria-label="Toggle menu"
                className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1A2332] transition-all duration-200"
                onClick={() => setOpen((s) => !s)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path
                    d={open ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle gradient accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#3B82F6]/40 via-[#06B6D4]/30 to-transparent"></div>

        {/* Professional ticker */}
        <div className="overflow-hidden bg-[#1A2332]/95 border-t border-[#2D3748]/20 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#3B82F6]/5 via-[#06B6D4]/3 to-[#3B82F6]/5"></div>
            <div className="py-2.5">
              <div className="marquee flex items-center gap-10 whitespace-nowrap px-4">
                {marqueeItems.map((ticker, i) => (
                  <div key={i} className="flex items-center gap-3 pr-6">
                    <div className="text-sm font-semibold text-[#F8FAFC]">{ticker.symbol}</div>
                    <div className="text-sm text-[#94A3B8] font-medium">{ticker.price}</div>
                    <div className={`text-sm font-semibold ${
                      ticker.pos ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}>
                      {ticker.pos ? "+" : ""}{ticker.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-[#0B1426]/80 backdrop-blur-lg"></div>
      </div>

      {/* Mobile menu */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85%] transform bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] shadow-2xl border-l border-[#2D3748]/40 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] shadow-lg"></div>
              <div>
                <div className="text-[#F8FAFC] font-semibold">Cryzen</div>
                <div className="text-xs text-[#06B6D4] font-medium">AI Crypto Intelligence</div>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              aria-label="Close" 
              className="text-[#94A3B8] hover:text-[#F8FAFC] p-2 rounded-lg hover:bg-[#1A2332] transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col gap-1">
            <Link href="#features" className="text-base font-medium text-[#F8FAFC] hover:text-[#06B6D4] py-3 px-4 rounded-lg hover:bg-[#1A2332] transition-all duration-200">
              Features
            </Link>
            <Link href="#dashboard" className="text-base font-medium text-[#F8FAFC] hover:text-[#06B6D4] py-3 px-4 rounded-lg hover:bg-[#1A2332] transition-all duration-200">
              Dashboard
            </Link>
            <Link href="#portfolio" className="text-base font-medium text-[#F8FAFC] hover:text-[#06B6D4] py-3 px-4 rounded-lg hover:bg-[#1A2332] transition-all duration-200">
              Portfolio
            </Link>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-[#2D3748]/40">
            <Link href="#login" className="block text-sm mb-4 text-[#94A3B8] hover:text-[#F8FAFC] py-2 px-4 rounded-lg hover:bg-[#1A2332] transition-all duration-200">
              Log in
            </Link>
            <Link href="#signup" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-[#F8FAFC] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              Start for Free
            </Link>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .marquee {
          display: inline-flex;
          align-items: center;
          gap: 2.5rem;
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </header>
  );
}

export default Navbar
