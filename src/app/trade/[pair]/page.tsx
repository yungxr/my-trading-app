"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TradingViewWidget from "@/components/TradingView";
import OrderBook from "@/components/OrderBook";
import TradeForm from "@/components/TradeForm";
import { useParams } from "next/navigation";

export default function TradePage() {
  const params = useParams();
  const pair = (params.pair as string).toUpperCase();
  const [orderBook, setOrderBook] = useState({
    bids: [],
    asks: [],
  });
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);

  // WebSocket подключение к Binance
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair
        .toLowerCase()
        .replace("usd", "usdt")}@depth`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrderBook({
        bids: data.bids.slice(0, 15).map(([p, a]: [string, string]) => ({
          price: parseFloat(p),
          amount: parseFloat(a),
        })),
        asks: data.asks.slice(0, 15).map(([p, a]: [string, string]) => ({
          price: parseFloat(p),
          amount: parseFloat(a),
        })),
      });
    };

    return () => ws.close();
  }, [pair]);

  // Получение текущей цены
  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${pair.replace(
          "USD",
          "USDT"
        )}`
      );
      const data = await res.json();
      setPrice(parseFloat(data.lastPrice));
      setChange(parseFloat(data.priceChangePercent));
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 3000);
    return () => clearInterval(interval);
  }, [pair]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#10192b] to-[#18192d] font-sans text-white">
      {/* Хедер (как на главной) */}
      <header className="w-full bg-black/80 backdrop-blur border-b border-[#151A27] py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-black tracking-widest select-none"
          >
            DigitalVault
          </motion.span>
          <nav className="flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="text-[#B0B4C4] hover:text-blue-400 transition"
            >
              Trade
            </motion.a>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#0853fc] to-[#122780] px-6 py-2 rounded-lg font-semibold hover:from-[#1c419e] hover:to-[#1785e6] transition"
            >
              Connect Wallet
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Левая колонка - Информация */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#151A27] to-[#171b2b] border border-[#212d50] rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold mb-4 text-blue-300">
              Market Data
            </h3>
            <div className="space-y-3">
              {["BTC", "ETH", "SOL", "XRP", "ADA"].map((token) => (
                <div key={token} className="flex justify-between items-center">
                  <span>{token}</span>
                  <span className="font-mono text-green-400">
                    ${(Math.random() * 10000).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#151A27] to-[#171b2b] border border-[#212d50] rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold mb-4 text-purple-300">
              Your Balance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#B0B4C4]">USDT</span>
                <span className="font-mono">0.00</span>
              </div>
              <div className="h-px bg-[#212d50]"></div>
              <div className="text-center text-[#B0B4C4]">
                No open positions
              </div>
            </div>
          </motion.div>
        </div>

        {/* Центральная колонка - График */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#151A27] to-[#171b2b] border border-[#212d50] rounded-2xl p-6 shadow-lg h-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {pair}
                <span
                  className={`ml-3 text-sm ${
                    change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
                </span>
              </h2>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold">
                  $
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
            <div className="h-[500px]">
              <TradingViewWidget pair={pair} />
            </div>
          </motion.div>
        </div>

        {/* Правая колонка - Торговля */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#151A27] to-[#171b2b] border border-[#212d50] rounded-2xl p-6 shadow-lg"
          >
            <OrderBook bids={orderBook.bids} asks={orderBook.asks} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#151A27] to-[#171b2b] border border-[#212d50] rounded-2xl p-6 shadow-lg"
          >
            <TradeForm pair={pair} currentPrice={price} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
