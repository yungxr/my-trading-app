"use client";

import { useState } from "react";
import { useMarketData } from "@/components/hooks/useMarketData";
import { useTrendingPairs } from "@/components/hooks/useTrendingPairs";
import Sidebar from "@/components/trade/Sidebar";
import PairInfo from "@/components/trade/PairInfoBar";
import TradingViewWidget from "@/components/trade/TradingViewWidget";
import OrderPanel from "@/components/trade/OrderPanel";
import StakingPanel from "@/components/trade/StakingPanel";
import ConnectWalletBanner from "@/components/trade/ConnectWalletBanner";
import BottomNav from "@/components/trade/BottomNav";
import WalletInfo from "@/components/trade/StakingPanel/WalletInfo";

export default function TradePage() {
  const [pair, setPair] = useState("BTC-USDT");
  const [activeTab, setActiveTab] = useState("trade");
  const [walletConnected, setWalletConnected] = useState(false);
  
  const { currentPrice, priceChange } = useMarketData(pair, activeTab);
  const { trendingPairs } = useTrendingPairs();

  const connectWallet = () => setWalletConnected(true);
  const handleTrendingPairClick = (symbol: string) => setPair(symbol);

  return (
    <div className="relative h-screen flex flex-col bg-black text-white">
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90" />
      
      <div className="flex flex-1 h-[calc(100vh-73px)]">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          trendingPairs={trendingPairs}
          onPairClick={handleTrendingPairClick}
        />

        <div className="flex-1 flex flex-col">
          {activeTab === "trade" ? (
            <>
              <PairInfo pair={pair} currentPrice={currentPrice} priceChange={priceChange} />
              <div className="flex-1 bg-black/50 relative">
                <TradingViewWidget pair={pair} />
              </div>
              <BottomNav />
              {!walletConnected && <ConnectWalletBanner onConnect={connectWallet} />}
            </>
          ) : activeTab === "earn" ? (
            <StakingPanel walletConnected={walletConnected} onConnect={connectWallet} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-indigo-100/80">
                {activeTab === "alpha" ? "Alpha" : "Degen"} section coming soon
              </h2>
            </div>
          )}
        </div>

        {/* Правый сайдбар */}
        <div className="w-80 border-l border-transparent bg-white/5 p-4 flex flex-col justify-center backdrop-blur-sm relative">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>
          
          {activeTab === "trade" ? (
            <OrderPanel 
              pair={pair}
              walletConnected={walletConnected}
              onConnect={connectWallet}
            />
          ) : activeTab === "earn" ? (
            <div className="space-y-6">
              {walletConnected && <WalletInfo walletConnected={walletConnected} />}
              <div
                className="w-full cursor-pointer text-center py-3 from-purple-600 via-fuchsia-400 to-indigo-500 rounded-xl font-bold text-white shadow-lg transition-all border border-transparent hover:border-fuchsia-300/50"
                onClick={connectWallet}
              >
                {walletConnected ? "Stake Assets" : "Connect Wallet"}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-indigo-100/80 text-center">
                {activeTab === "alpha" ? "Alpha" : "Degen"} tools coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}