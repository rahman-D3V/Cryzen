import Link from "next/link";
import RightPanel from "./RightPanel";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#1A2332] to-[#0B1426] min-h-screen">
      {/* Decorative gradient orbs for depth */}
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-br from-[#3B82F6] to-[#06B6D4]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-gradient-to-bl from-[#06B6D4] to-[#3B82F6]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 -bottom-40 transform -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none bg-gradient-to-t from-[#3B82F6] to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          {/* Left: Content */}
          <div className="lg:col-span-7 xl:col-span-6 z-10">
            <div className="max-w-2xl">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/30 bg-[#1A2332] text-[#94A3B8] text-xs font-semibold tracking-wide mb-8 backdrop-blur-lg">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                AI Crypto Intelligence Platform
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-[#F8FAFC] mb-6">
                Smart Crypto
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">
                  Intelligence
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-lg mb-10">
                Track, analyze, and optimize your crypto portfolio with
                professional-grade tools and AI-powered insights.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-[#F8FAFC] bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_8px_48px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_56px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all duration-300"
                >
                  Start Free Trial
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-[#94A3B8] border border-[#3B82F6]/50 hover:border-[#06B6D4] hover:bg-[#1A2332] hover:text-[#F8FAFC] backdrop-blur-sm transition-all duration-300"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  View Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 text-[#94A3B8] text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] border border-[#0B1426]"></div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#10B981] to-[#3B82F6] border border-[#0B1426]"></div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] border border-[#0B1426]"></div>
                  </div>
                  <span>20,000+ traders</span>
                </div>
                <div className="h-4 w-px bg-[#3B82F6]/40"></div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#10B981]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Bank-grade security</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Dashboard Visual */}
          <div className="lg:col-span-5 xl:col-span-5 z-10">
            <RightPanel />
          </div>
        </div>

        {/* Enhanced stats section */}
        <div className="mt-20">
          <div className="rounded-2xl bg-gradient-to-r from-[#1A2332]/40 via-[#2D3748]/30 to-[#1A2332]/40 border border-[#3B82F6]/20 backdrop-blur-xl p-8 shadow-[0_24px_80px_rgba(59,130,246,0.1)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2">
                  20K+
                </div>
                <div className="text-[#94A3B8] text-sm">Active Traders</div>
                <div className="text-[#3B82F6] text-xs mt-1">Growing daily</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2">
                  100+
                </div>
                <div className="text-[#94A3B8] text-sm">Pro Features</div>
                <div className="text-[#3B82F6] text-xs mt-1">
                  Continuously updated
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2">
                  99.9%
                </div>
                <div className="text-[#94A3B8] text-sm">Uptime</div>
                <div className="text-[#3B82F6] text-xs mt-1">
                  Enterprise grade
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2">
                  24/7
                </div>
                <div className="text-[#94A3B8] text-sm">Support</div>
                <div className="text-[#3B82F6] text-xs mt-1">
                  Always available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute left-0 right-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[#0B1426] to-transparent"></div>
    </section>
  );
};

export default Hero;
