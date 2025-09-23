// src/components/CoinTimeSimple.jsx
"use client";

import React, { useEffect, useState } from "react";

const WINDOWS = ["30d", "90d", "1y", "3y", "5y"];

export function WhatIfReturns({ coinId, coinName, currentPrice }) {
  const [amount, setAmount] = useState(100);
  const [selected, setSelected] = useState("30d");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!coinId || !currentPrice) return;
    setLoading(true);
    setErr(null);
    setData(null);

    fetch("/api/whatIfReturns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coinId, currentPrice, amount }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch estimates");
        setData(json);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [coinId, currentPrice]);

  // Calculate returns locally for changed amount
  const computeFor = (past) => {
    if (!past || past.pastPrice == null) return null;
    const coinsBought = amount / past.pastPrice;
    const worthToday = coinsBought * currentPrice;
    const profit = worthToday - amount;
    const percent = (profit / amount) * 100;
    const isGain = profit >= 0;
    const formattedProfit =
      (isGain ? "+" : "-") + `$${Math.abs(profit).toFixed(2)} (${isGain ? "+" : "-"}${Math.abs(percent).toFixed(2)}%)`;
    return {
      ...past,
      worthToday: Number(worthToday.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      percent: Number(percent.toFixed(2)),
      isGain,
      formattedProfit,
    };
  };

  const selectedPast = data?.results?.find((r) => r.window === selected) || null;
  const display = computeFor(selectedPast);

  return (
    <div className="p-6 border border-gray-700 rounded-lg bg-gray-900 text-white max-w-md shadow-xl">
      <h4 className="font-bold text-xl mb-3 text-white">Quick Returns</h4>

      <div className="mb-4 text-sm text-gray-300">
        Enter amount and pick a timeframe.
      </div>

      {/* Time Period Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {WINDOWS.map((w) => (
          <button
            key={w}
            onClick={() => setSelected(w)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              selected === w
                ? "bg-blue-600 text-white shadow-md transform scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600"
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Input and Show Button */}
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          value={amount}
          min="1"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border border-gray-600 rounded-md px-3 py-2 flex-1 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter amount"
        />
        <button
          onClick={() => setErr(null)}
          className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          Show
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-300">Calculating estimates...</span>
        </div>
      )}

      {/* Error State */}
      {err && (
        <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800">
          Error: {err}
        </div>
      )}

      {/* Results Display */}
      {display ? (
        <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-800 shadow-inner">
          <div className="text-gray-300 mb-2">
            If you invested <span className="font-semibold text-white">${amount.toLocaleString()}</span> in{" "}
            <span className="font-semibold text-blue-400">{coinName || coinId}</span> {selected} ago:
          </div>

          <div className="text-3xl font-bold mt-2 mb-2 text-white">
            ${display.worthToday.toLocaleString()}
          </div>

          <div
            className={`text-lg font-semibold mb-3 ${
              display.isGain ? "text-green-400" : "text-red-400"
            }`}
          >
            {display.formattedProfit}
          </div>

          <div className="text-xs text-gray-400 mb-2 bg-gray-900/50 p-2 rounded">
            Past price used: <span className="text-gray-300">${selectedPast?.pastPrice?.toLocaleString() ?? "N/A"}</span> (on {selectedPast?.targetDate ?? "approx"})
          </div>

          {selectedPast?.suspicious && (
            <div className="text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded border border-yellow-700 mb-2">
              ⚠️ Estimate may be unreliable for this window.
            </div>
          )}

          <div className="text-xs text-gray-500 italic">
            Estimates are AI-powered for demo purposes.
          </div>
        </div>
      ) : (
        !loading &&
        !err && (
          <div className="text-sm text-gray-400 text-center py-4 border border-gray-700 rounded-lg bg-gray-800/50">
            No estimate available yet.
          </div>
        )
      )}
    </div>
  );
}
