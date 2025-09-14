"use client"

import Link from "next/link";

const KeyFeatures = () => {
  const FEATURES = [
    {
      key: 'realtime',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-time Data',
      desc: 'Live market updates with millisecond precision for instant decision making.',
    },
    {
      key: 'analytics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Advanced Analytics',
      desc: 'Professional-grade charts and insights to optimize your trading strategies.',
    },
    {
      key: 'portfolio',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Portfolio Management',
      desc: 'Comprehensive tracking and management tools for all your crypto investments.',
    },
  ];

  return (
    <section aria-label="Key features" className="py-20 bg-gradient-to-b from-[#0F0F23] via-[#1a1a2e] to-[#0F0F23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-6 bg-gradient-to-r from-[#2d3748]/80 to-[#4a5568]/60 border border-blue-500/20 text-blue-300 backdrop-blur-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Built for Professional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Crypto Trading
            </span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Enterprise-grade tools designed for serious traders and investors who demand precision, security, and performance.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <article
              key={feature.key}
              className="group relative flex flex-col p-8 rounded-2xl bg-gradient-to-br from-[#2d3748]/60 to-[#4a5568]/40 border border-blue-500/20 hover:border-blue-400/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(59,130,246,0.1)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.2)] transition-all duration-300"
              aria-labelledby={`feat-${feature.key}`}
            >
              
              {/* Icon container */}
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_8px_32px_rgba(59,130,246,0.25)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 
                  id={`feat-${feature.key}`} 
                  className="text-white font-semibold text-xl leading-tight mb-3"
                >
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-blue-500/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs text-blue-300 font-medium">Active</span>
                </div>
                <div className="text-xs text-slate-400">Enterprise Ready</div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </article>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl bg-gradient-to-r from-[#2d3748]/40 via-[#4a5568]/30 to-[#2d3748]/40 border border-blue-500/20 backdrop-blur-xl">
            <div className="text-left">
              <div className="text-white font-semibold text-lg">Ready to get started?</div>
              <div className="text-slate-300 text-sm">Join thousands of professional traders</div>
            </div>
            <Link
              href="#signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_8px_32px_rgba(59,130,246,0.25)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-all duration-300"
            >
              Start Free Trial
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures