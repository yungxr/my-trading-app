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
        symbol: `BINANCE:${pair.replace("USD", "USDT")}`,
        interval: "15",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#151A27",
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
