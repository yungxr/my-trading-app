"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DegenSection from "@/components/trade/Sections/DegenSection";
import { useMarketData } from "@/components/hooks/useMarketData";

export default function DegenPage() {
  const params = useParams();
  const [pair, setPair] = useState("BTC-USDT");
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(1000);
  const [margin, setMargin] = useState(0);
  const [takeProfit, setTakeProfit] = useState(100);

  useEffect(() => {
    if (params.pair) {
      setPair(`${params.pair}-USDT`);
    }
  }, [params]);

  const { currentPrice } = useMarketData(pair);

  const calculateOpenSize = () => (margin * leverage).toLocaleString("en-US");

  const handlePlaceOrder = () => {
    // Оставлено пустым для будущей реализации
  };

  const handleDeposit = () => {
    // Оставлено пустым для будущей реализации
  };

  const handleWithdraw = () => {
    // Оставлено пустым для будущей реализации
  };

  return (
    <>
      <DegenSection pair={pair} positionType={positionType} />

      <div className="w-80 border-l border-transparent bg-white/5 p-4 flex flex-col justify-center backdrop-blur-sm relative">
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-rose-400/50 to-transparent"></div>

        <div className="space-y-4">
          <div className="flex mb-6 rounded-xl overflow-hidden">
            <button
              onClick={() => setPositionType("long")}
              className={`flex-1 py-3 font-bold transition-all cursor-pointer ${
                positionType === "long"
                  ? "bg-gradient-to-b from-purple-600 to-indigo-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-white/10 text-indigo-100/80 hover:bg-white/20 border-r border-white/10"
              }`}
            >
              Long
            </button>
            <button
              onClick={() => setPositionType("short")}
              className={`flex-1 py-3 font-bold transition-all cursor-pointer ${
                positionType === "short"
                  ? "bg-gradient-to-b from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/20"
                  : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
              }`}
            >
              Short
            </button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
              <span>Margin</span>
              <span>{margin.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between gap-2 mb-2">
              {[10, 50, 100].map((value) => (
                <button
                  key={value}
                  className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                    margin === value
                      ? positionType === "long"
                        ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white"
                        : "bg-gradient-to-tr from-rose-500 to-pink-500 text-white"
                      : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                  }`}
                  onClick={() => setMargin(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm mt-2"
              placeholder="Custom amount"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
              <span>Leverage</span>
              <span>About Degen</span>
            </div>
            <div className="flex justify-between gap-2 mb-4">
              {[500, 750, 1000].map((value) => (
                <button
                  key={value}
                  className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                    leverage === value
                      ? positionType === "long"
                        ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white"
                        : "bg-gradient-to-tr from-rose-500 to-pink-500 text-white"
                      : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                  }`}
                  onClick={() => setLeverage(value)}
                >
                  {value}x
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
              <span>Open size</span>
              <span>{calculateOpenSize()} USD</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-indigo-100/80 text-sm mb-2">Take profit</div>
            <div className="flex justify-between gap-2 mb-4">
              {[100, 200, 300].map((value) => (
                <button
                  key={value}
                  className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                    takeProfit === value
                      ? positionType === "long"
                        ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white"
                        : "bg-gradient-to-tr from-rose-500 to-pink-500 text-white"
                      : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                  }`}
                  onClick={() => setTakeProfit(value)}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>

          <button
            className={`w-full py-3 rounded-xl font-bold text-white mb-6 hover:opacity-90 transition-all cursor-pointer ${
              positionType === "long"
                ? "bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500 shadow-emerald-500/20"
                : "bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/20"
            }`}
            onClick={handlePlaceOrder}
          >
            Connect Wallet
          </button>

          <div className="mb-4">
            <div className="text-indigo-100/80 text-sm mb-2">Margin</div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2">
              <span>Maintenance margin rate (MMR)</span>
              <span>Cross</span>
            </div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2">
              <span>Maintenance margin</span>
              <span>{(margin * 0.05).toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2">
              <span>Cross Equity</span>
              <span>{(margin * leverage).toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2">
              <span>Used</span>
              <span>{margin.toFixed(2)} USD</span>
            </div>
          </div>

          <div className="flex justify-between gap-2 mb-6">
            <button
              className="flex-1 py-2 bg-white/10 text-indigo-100/80 rounded-lg hover:bg-white/20 transition-all cursor-pointer"
              onClick={handleDeposit}
            >
              Deposit
            </button>
            <button
              className="flex-1 py-2 bg-white/10 text-indigo-100/80 rounded-lg hover:bg-white/20 transition-all cursor-pointer"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>

          <div>
            <div className="text-indigo-100/80 text-sm mb-2">
              Market Details
            </div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
              <span>Long Margin Token</span>
              <span>ETH</span>
            </div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
              <span>Open Fee Rate</span>
              <span>0.005%</span>
            </div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
              <span>Close Fee Rate</span>
              <span>0.02%</span>
            </div>
            <div className="flex justify-between text-indigo-100/80 text-sm py-2">
              <span>Long OI Cap</span>
              <span>110,000.00 USD</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
