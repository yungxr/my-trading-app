import { useEffect, useState } from "react";
import { getMarketData, setupBinanceWebSocket } from "@/lib/binance";

export function useMarketData(pair: string, activeTab: string) {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeTab !== "trade") return;

    setIsLoading(true);
    const cleanPair = pair.replace("-USDT", "");

    // 1. Получаем начальные данные
    const fetchInitialData = async () => {
      try {
        const data = await getMarketData(cleanPair);
        setCurrentPrice(parseFloat(data.lastPrice));
        setPriceChange(parseFloat(data.priceChangePercent));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // 2. Настраиваем WebSocket для реальных обновлений
    const cleanupWebSocket = setupBinanceWebSocket(cleanPair, (data) => {
      setCurrentPrice(data.price);
      setPriceChange(data.change);
    });

    return () => {
      cleanupWebSocket();
    };
  }, [pair, activeTab]);

  return { currentPrice, priceChange, isLoading };
}