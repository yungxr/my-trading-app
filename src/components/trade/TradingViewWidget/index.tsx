"use client";

import { useEffect, useRef, useState } from "react";

export default function TradingViewWidget({ pair }: { pair: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const loadWidget = () => {
      setIsLoading(true);
      setError(null);

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      
      script.onload = () => {
        try {
          const formattedPair = pair.replace('-', '').toUpperCase();
          const symbol = `BINANCE:${formattedPair}`;

          new (window as any).TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: "15",
            theme: "dark",
            style: "9",
            locale: "en",
            toolbar_bg: "#0b1422",
            enable_publishing: false,
            hide_top_toolbar: false,
            withdateranges: true,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: containerRef.current?.id,
            studies: [
              "MASimple@tv-basicstudies",
              "BB@tv-basicstudies",
              "Volume@tv-basicstudies",
            ],
            overrides: {
              "paneProperties.background": "#0b1422",
              "paneProperties.vertGridProperties.color": "#1e293b",
              "paneProperties.horzGridProperties.color": "#1e293b",
              "symbolWatermarkProperties.transparency": 90,
              "scalesProperties.textColor": "#b0b4c4",
            }
          });
          setIsLoading(false);
        } catch (err) {
          console.error("Error loading TradingView:", err);
          setError("Failed to load trading chart");
          setIsLoading(false);
        }
      };

      script.onerror = () => {
        setError("Failed to load TradingView script");
        setIsLoading(false);
      };

      document.body.appendChild(script);
    };

    loadWidget();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [pair]);

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b1422]">
          Loading chart...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b1422] text-red-400">
          {error}
        </div>
      )}
      <div
        id="tradingview-widget-container"
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  );
}