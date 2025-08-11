"use client";

import Sidebar from "../Sidebar";
import PairInfoBar from "../PairInfoBar";
import TradingView from "@/components/TradingView";
import BottomNav from "../BottomNav";
import StakingPanel from "../StakingPanel";
import ConnectWalletBanner from "../ConnectWalletBanner";
import OrderPanel from "../OrderPanel";

interface TradingLayoutProps {
  pair: string;
  currentPrice: number;
  priceChange: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  walletConnected: boolean;
  trendingPairs: { symbol: string; price: number; change: number }[];
  onConnectWallet: () => void;
  onTrendingPairClick: (symbol: string) => void;
}

export default function TradingLayout({
  pair,
  currentPrice,
  priceChange,
  activeTab,
  setActiveTab,
  walletConnected,
  trendingPairs,
  onConnectWallet,
  onTrendingPairClick,
}: TradingLayoutProps) {
  return (
    <div className="relative h-screen flex flex-col bg-black text-white">
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90" />
      
      <div className="flex flex-1 h-[calc(100vh-73px)]">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          trendingPairs={trendingPairs}
          onPairClick={onTrendingPairClick}
        />

        <div className="flex-1 flex flex-col">
          {activeTab === "trade" ? (
            <>
              <PairInfoBar pair={pair} currentPrice={currentPrice} priceChange={priceChange} />
              <div className="flex-1 bg-black/50 relative">
                <TradingView pair={pair} />
              </div>
              <BottomNav />
              {!walletConnected && <ConnectWalletBanner onConnect={onConnectWallet} />}
            </>
          ) : activeTab === "earn" ? (
            <StakingPanel walletConnected={walletConnected} onConnect={onConnectWallet} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-indigo-100/80">
                {activeTab === "alpha" ? "Alpha" : "Degen"} section coming soon
              </h2>
            </div>
          )}
        </div>

        {activeTab === "trade" ? (
          <OrderPanel 
            pair={pair}
            walletConnected={walletConnected}
            onConnect={onConnectWallet}
          />
        ) : activeTab === "earn" ? (
          <StakingPanel 
            walletConnected={walletConnected}
            onConnect={onConnectWallet}
          />
        ) : (
          <div className="w-80 border-l border-transparent bg-white/5 p-4 flex flex-col backdrop-blur-sm relative">
            <div className="flex items-center justify-center h-full">
              <p className="text-indigo-100/80 text-center">
                {activeTab === "alpha" ? "Alpha" : "Degen"} tools coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}