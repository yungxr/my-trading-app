"use client";

import { useState } from "react";
import PositionTypeSelector from "./PositionTypeSelector";
import LeverageSelector from "./LeverageSelector";
// import OrderTypeSelector from "./OrderTypeSelector";

interface OrderPanelProps {
  pair: string;
  walletConnected: boolean;
  onConnect: () => void;
}

export default function OrderPanel({ pair, walletConnected, onConnect }: OrderPanelProps) {
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(10);
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${positionType.toUpperCase()} ${amount} ${pair} with ${leverage}x leverage`);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <PositionTypeSelector 
        positionType={positionType}
        setPositionType={setPositionType}
      />

      <LeverageSelector 
        leverage={leverage}
        setLeverage={setLeverage}
      />

      {/* <OrderTypeSelector 
        orderType={orderType}
        setOrderType={setOrderType}
      /> */}

      <div className="mb-4">
        <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
          <span>Use</span>
          <span>0.0 ETH</span>
        </div>
        <input
          type="number"
          placeholder="0.0"
          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-between text-indigo-100/80 text-sm mb-4">
          <span>
            {positionType === "long" ? "Long" : "Short"} {pair.split("-")[0]}
          </span>
          <span>0.0 {pair.split("-")[0]}</span>
        </div>
        <div className="flex justify-between gap-2 mb-4">
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              className="flex-1 py-2 bg-white/10 text-indigo-100/80 rounded-lg hover:bg-white/20 transition-all border border-white/10"
              onClick={() => setAmount(((percent / 100) * 1000).toFixed(2))}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      <div className="text-indigo-100/80 text-sm mb-4">
        Open size = 0.0 USD
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-xl font-bold text-white mb-6 transition-all hover:scale-105 shadow-lg ${
          positionType === "long"
            ? "bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 shadow-emerald-500/20"
            : "bg-gradient-to-tr from-rose-500 to-pink-500 shadow-rose-500/20"
        } border border-transparent hover:border-fuchsia-300/50`}
        disabled={!walletConnected}
      >
        {positionType === "long" ? "Long" : "Short"} {pair.split("-")[0]}
      </button>

      <div className="mt-auto">
        <div className="text-indigo-100/80 text-sm mb-2">
          Market Details
        </div>
        <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
          <span>Long Margin Token</span>
          <span>ETH</span>
        </div>
        <div className="flex justify-between text-indigo-100/80 text-sm py-2">
          <span>Long OI Cap</span>
          <span>100,000.00 USD</span>
        </div>
      </div>
    </div>
  );
}