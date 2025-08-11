import { useState, useEffect } from "react";
import { getMarketData, setupBinanceWebSocket } from "@/lib/binance";

const DEFAULT_PAIRS = [
  { symbol: "BTC-USDT", price: 0, change: 0 },
  { symbol: "ETH-USDT", price: 0, change: 0 },
  { symbol: "SOL-USDT", price: 0, change: 0 },
  { symbol: "BNB-USDT", price: 0, change: 0 },
  { symbol: "ADA-USDT", price: 0, change: 0 },
];

export function useTrendingPairs() {
  const [trendingPairs, setTrendingPairs] = useState(DEFAULT_PAIRS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updatePairData = async (pair: string) => {
      try {
        const data = await getMarketData(pair);
        return {
          symbol: pair,
          price: parseFloat(data.lastPrice),
          change: parseFloat(data.priceChangePercent),
        };
      } catch {
        return DEFAULT_PAIRS.find(p => p.symbol === pair) || { symbol: pair, price: 0, change: 0 };
      }
    };

    const fetchInitialData = async () => {
      try {
        const updatedPairs = await Promise.all(
          DEFAULT_PAIRS.map(p => updatePairData(p.symbol))
        );
        setTrendingPairs(updatedPairs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating trending pairs:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Настраиваем WebSocket для каждой пары
    const cleanups = DEFAULT_PAIRS.map(pair => {
      const cleanPair = pair.symbol.replace("-USDT", "");
      return setupBinanceWebSocket(cleanPair, (data) => {
        setTrendingPairs(prev => prev.map(p => 
          p.symbol === pair.symbol 
            ? { ...p, price: data.price, change: data.change } 
            : p
        ));
      });
    });

    return () => cleanups.forEach(cleanup => cleanup());
  }, []);

  return { trendingPairs, isLoading };
}