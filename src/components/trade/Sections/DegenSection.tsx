"use client";

import TradingViewWidget from "@/components/trade/TradingViewWidget";
import BottomNav from "../BottomNav";
import ConnectWalletBanner from "../ConnectWalletBanner";

interface DegenSectionProps {
  pair: string;
  positionType: "long" | "short";
}

export default function DegenSection({ pair }: DegenSectionProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-transparent bg-white/5 backdrop-blur-sm relative">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"></div>
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
            DEGEN MODE
          </div>
          <div className="text-xs bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full">
            1000X LEVERAGE
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/50 relative">
        <TradingViewWidget pair={pair} />
      </div>
      <BottomNav />
      <ConnectWalletBanner />
    </div>
  );
}