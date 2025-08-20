"use client";

import { Suspense } from "react";
import TradeClientComponent from "./TradeClientComponent";
import Loading from "@/app/trade/loading";

export default function TradePage({ params }: { params: { pair: string } }) {
  const pair = `${params.pair}-USDT`;

  if (typeof window !== "undefined") {
    localStorage.setItem("lastTradingPair", params.pair);
  }

  return (
    <Suspense fallback={<Loading />}>
      <TradeClientComponent pair={pair} />
    </Suspense>
  );
};