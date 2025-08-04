import { useEffect, useState } from "react";
import { getMarketData } from "@/lib/binance";

export function useMarketData(pair: string, activeTab: string) {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    if (activeTab !== "trade") return;

    const fetchMarketData = async () => {
      try {
        const data = await getMarketData(pair.replace("-USDT", ""));
        setCurrentPrice(parseFloat(data.lastPrice));
        setPriceChange(parseFloat(data.priceChangePercent));
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);

    return () => clearInterval(interval);
  }, [pair, activeTab]);

  return { currentPrice, priceChange };
}