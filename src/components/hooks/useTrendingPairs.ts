import { useState, useEffect } from "react";
import { getMarketData } from "@/lib/binance";

export function useTrendingPairs() {
  const [trendingPairs, setTrendingPairs] = useState([
    { symbol: "BTC-USDT", price: 0, change: 0 },
    { symbol: "ETH-USDT", price: 0, change: 0 },
    { symbol: "SOL-USDT", price: 0, change: 0 },
    { symbol: "BNB-USDT", price: 0, change: 0 },
    { symbol: "ADA-USDT", price: 0, change: 0 },
  ]);

  const updateTrendingPairs = async () => {
    try {
      const updatedPairs = await Promise.all(
        trendingPairs.map(async (p) => {
          try {
            const data = await getMarketData(p.symbol);
            return {
              ...p,
              price: parseFloat(data.lastPrice),
              change: parseFloat(data.priceChangePercent),
            };
          } catch {
            return p;
          }
        })
      );
      setTrendingPairs(updatedPairs);
    } catch (error) {
      console.error("Error updating trending pairs:", error);
    }
  };

  useEffect(() => {
    updateTrendingPairs();
    const interval = setInterval(updateTrendingPairs, 30000);
    return () => clearInterval(interval);
  }, []);

  return { trendingPairs };
}