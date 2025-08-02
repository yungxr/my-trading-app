"use client";

import { useEffect, useRef } from "react";

export default function TradingViewWidget({ pair }: { pair: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        autosize: true,
        symbol: `BINANCE:${pair.replace("-", "")}`,
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
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [pair]);

  return (
    <div
      id="tradingview-widget-container"
      ref={containerRef}
      className="w-full h-full"
    />
  );
}