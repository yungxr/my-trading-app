"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TradeForm({
  pair,
  currentPrice,
}: {
  pair: string;
  currentPrice: number;
}) {
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      `${orderType.toUpperCase()} ${amount} ${pair} at ${currentPrice}`
    );
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className={`flex-1 py-3 rounded-lg ${
            orderType === "buy" ? "bg-green-500/90" : "bg-[#1E293B]"
          } text-white font-bold`}
          onClick={() => setOrderType("buy")}
        >
          Buy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className={`flex-1 py-3 rounded-lg ${
            orderType === "sell" ? "bg-red-500/90" : "bg-[#1E293B]"
          } text-white font-bold`}
          onClick={() => setOrderType("sell")}
        >
          Sell
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-[#B0B4C4] mb-2">Price</label>
          <input
            type="text"
            value={currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            readOnly
            className="w-full p-3 bg-[#0F172A] border border-[#1E3A8A] rounded-lg text-white font-mono"
          />
        </div>

        <div>
          <label className="block text-sm text-[#B0B4C4] mb-2">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full p-3 bg-[#0F172A] border border-[#1E3A8A] rounded-lg text-white font-mono"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`w-full py-4 rounded-lg ${
            orderType === "buy" ? "bg-green-500" : "bg-red-500"
          } text-white font-bold text-lg shadow-lg`}
        >
          {orderType === "buy" ? "Buy" : "Sell"} {pair.replace("-USD", "")}
        </motion.button>
      </form>
    </div>
  );
}