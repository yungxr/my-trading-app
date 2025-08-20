"use client";

import { useState } from "react";
import PairInfo from "@/components/trade/PairInfoBar";
import TradingViewWidget from "@/components/trade/TradingViewWidget";
import OrderPanel from "@/components/trade/OrderPanel";
import BottomNav from "@/components/trade/BottomNav";
import ConnectWalletBanner from "@/components/trade/ConnectWalletBanner";
import { useMarketData } from "@/components/hooks/useMarketData";

export default function TradeClientComponent({ pair }: { pair: string }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const { currentPrice, priceChange, isLoading } = useMarketData(pair);

  const connectWallet = () => setWalletConnected(true);

  return (
    <>
      <div className="flex-1 flex flex-col">
        <PairInfo
          pair={pair}
          currentPrice={currentPrice}
          priceChange={priceChange}
          isLoading={isLoading}
        />
        <div className="flex-1 bg-black/50 relative">
          <TradingViewWidget pair={pair} />
        </div>
        <BottomNav />
        {!walletConnected && <ConnectWalletBanner />}
      </div>

      <div className="w-80 border-l border-transparent bg-white/5 p-4 flex flex-col justify-center backdrop-blur-sm relative">
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>
        <OrderPanel
          pair={pair}
          walletConnected={walletConnected}
          onConnect={connectWallet}
          currentPrice={currentPrice}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}