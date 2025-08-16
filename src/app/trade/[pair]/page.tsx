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
import AlphaSection from "@/components/trade/Sections/AlphaSection";
import DegenSection from "@/components/trade/Sections/DegenSection";
import AirdropSection from "@/components/trade/Rewards/AirdropSection";
import BonusSection from "@/components/trade/Rewards/BonusSection";

export default function TradePage() {
  const [pair, setPair] = useState("BTC-USDT");
  const [activeTab, setActiveTab] = useState("trade");
  const [walletConnected, setWalletConnected] = useState(false);
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(1000);
  const [margin, setMargin] = useState(0);
  const [takeProfit, setTakeProfit] = useState(100);

  const {
    currentPrice,
    priceChange,
    isLoading: marketLoading,
  } = useMarketData(pair, activeTab);
  const { trendingPairs, isLoading: trendingLoading } = useTrendingPairs();

  const connectWallet = () => setWalletConnected(true);
  const handleTrendingPairClick = (symbol: string) => setPair(symbol);

  const calculateOpenSize = () => {
    return (margin * leverage).toLocaleString("en-US");
  };

  const handlePlaceOrder = () => {
    if (!walletConnected) {
      connectWallet();
      return;
    }

    const orderDetails = {
      pair,
      positionType,
      leverage,
      margin,
      takeProfit,
      openSize: calculateOpenSize(),
      timestamp: new Date().toISOString(),
    };

    console.log("Degen Order Placed:", orderDetails);
    alert(`Degen order placed!\n${JSON.stringify(orderDetails, null, 2)}`);
  };

  const renderRightPanel = () => {
    switch (activeTab) {
      case "trade":
        return (
          <OrderPanel
            pair={pair}
            walletConnected={walletConnected}
            onConnect={connectWallet}
            currentPrice={currentPrice}
            isLoading={marketLoading}
          />
        );
      case "earn":
        return (
          <div className="space-y-6">
            <button
              className="w-full cursor-pointer text-center py-3 rounded-xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500
            bg-[length:200%_200%] bg-[position:0%_0%]
            hover:bg-[position:100%_100%]
            transition-[background-position] duration-1000 ease-in-out"
            >
              Connect Wallet
            </button>
          </div>
        );
      case "alpha":
        return (
          <div className="space-y-6">
            <button
              className="w-full cursor-pointer text-center py-3 rounded-xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500
            bg-[length:200%_200%] bg-[position:0%_0%]
            hover:bg-[position:100%_100%]
            transition-[background-position] duration-1000 ease-in-out"
            >
              Connect Wallet
            </button>
          </div>
        );
      case "degen":
        return (
          <div className="space-y-4">
            <div className="flex mb-6 rounded-xl overflow-hidden">
              <button
                onClick={() => setPositionType("long")}
                className={`flex-1 py-3 font-bold transition-all cursor-pointer ${
                  positionType === "long"
                    ? "bg-gradient-to-b from-purple-600 to-indigo-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white/10 text-indigo-100/80 hover:bg-white/20 border-r border-white/10"
                }`}
              >
                Long
              </button>
              <button
                onClick={() => setPositionType("short")}
                className={`flex-1 py-3 font-bold transition-all cursor-pointer ${
                  positionType === "short"
                    ? "bg-gradient-to-b from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/20"
                    : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                }`}
              >
                Short
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
                <span>Margin</span>
                <span>{margin.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between gap-2 mb-2">
                {[10, 50, 100].map((value) => (
                  <button
                    key={value}
                    className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                      margin === value
                        ? positionType === "long"
                          ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white"
                          : "bg-gradient-to-tr from-rose-500 to-pink-500 text-white"
                        : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                    }`}
                    onClick={() => setMargin(value)}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm mt-2"
                placeholder="Custom amount"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
                <span>Leverage</span>
                <span>About Degen</span>
              </div>
              <div className="flex justify-between gap-2 mb-4">
                {[500, 750, 1000].map((value) => (
                  <button
                    key={value}
                    className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                      leverage === value
                        ? positionType === "long"
                          ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white"
                          : "bg-gradient-to-tr from-rose-500 to-pink-500 text-white"
                        : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                    }`}
                    onClick={() => setLeverage(value)}
                  >
                    {value}x
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
                <span>Open size</span>
                <span>{calculateOpenSize()} USD</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-indigo-100/80 text-sm mb-2">Take profit</div>
              <div className="flex justify-between gap-2 mb-4">
                {[100, 200, 300].map((value) => (
                  <button
                    key={value}
                    className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                      takeProfit === value
                        ? positionType === "long"
                          ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white"
                          : "bg-gradient-to-tr from-rose-500 to-pink-500 text-white"
                        : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                    }`}
                    onClick={() => setTakeProfit(value)}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-bold text-white mb-6 hover:opacity-90 transition-all cursor-pointer ${
                positionType === "long"
                  ? "bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500 shadow-emerald-500/20"
                  : "bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/20"
              }`}
              onClick={handlePlaceOrder}
            >
              {walletConnected ? "Place Degen Order" : "Connect Wallet"}
            </button>

            <div className="mb-4">
              <div className="text-indigo-100/80 text-sm mb-2">Margin</div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2">
                <span>Maintenance margin rate (MMR)</span>
                <span>Cross</span>
              </div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2">
                <span>Maintenance margin</span>
                <span>{(margin * 0.05).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2">
                <span>Cross Equity</span>
                <span>{(margin * leverage).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2">
                <span>Used</span>
                <span>{margin.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="flex justify-between gap-2 mb-6">
              <button className="flex-1 py-2 bg-white/10 text-indigo-100/80 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
                Deposit
              </button>
              <button className="flex-1 py-2 bg-white/10 text-indigo-100/80 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
                Withdraw
              </button>
            </div>

            <div>
              <div className="text-indigo-100/80 text-sm mb-2">
                Market Details
              </div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
                <span>Long Margin Token</span>
                <span>ETH</span>
              </div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
                <span>Open Fee Rate</span>
                <span>0.005%</span>
              </div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
                <span>Close Fee Rate</span>
                <span>0.02%</span>
              </div>
              <div className="flex justify-between text-indigo-100/80 text-sm py-2">
                <span>Long OI Cap</span>
                <span>110,000.00 USD</span>
              </div>
            </div>
          </div>
        );
      case "airdrop":
        return (
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-yellow-500/30">
              <h3 className="font-bold text-yellow-300 mb-2">Airdrop Status</h3>
              <p className="text-indigo-100/80 text-sm mb-3">
                Complete tasks to earn your share of $50,000 prize pool
              </p>
              <div className="flex justify-between text-xs text-yellow-400/80 mb-1">
                <span>Your progress</span>
                <span>0/4 tasks</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <button
                className="w-full py-2 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-lg font-bold text-sm hover:scale-105 transition-all"
                onClick={connectWallet}
              >
                {walletConnected ? "Check Eligibility" : "Connect Wallet"}
              </button>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-yellow-500/30">
              <h3 className="font-bold text-yellow-300 mb-2">
                Top Participants
              </h3>
              <div className="space-y-3">
                {[
                  { address: "0x742d...3a1b", earned: "$1,250" },
                  { address: "0x8f2e...4b3c", earned: "$980" },
                  { address: "0x3c9a...1d7f", earned: "$750" },
                ].map((user, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-indigo-100/80">{user.address}</span>
                    <span className="text-yellow-400">{user.earned}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "bonus":
        return (
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/30">
              <h3 className="font-bold text-emerald-300 mb-2">
                Bonus Progress
              </h3>
              <p className="text-indigo-100/80 text-sm mb-3">
                Complete all tiers to claim $4000 bonus
              </p>
              <div className="flex justify-between text-xs text-emerald-400/80 mb-1">
                <span>Completed</span>
                <span>0/4 tiers</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <button
                className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg font-bold text-sm hover:scale-105 transition-all"
                onClick={connectWallet}
              >
                {walletConnected ? "View Bonuses" : "Connect Wallet"}
              </button>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/30">
              <h3 className="font-bold text-emerald-300 mb-2">
                Referral Rewards
              </h3>
              <div className="space-y-3">
                {[
                  { level: "Level 1", reward: "10%" },
                  { level: "Level 2", reward: "5%" },
                  { level: "Level 3", reward: "2%" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-indigo-100/80">{item.level}</span>
                    <span className="text-emerald-400">{item.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "trade":
        return (
          <>
            <PairInfo
              pair={pair}
              currentPrice={currentPrice}
              priceChange={priceChange}
              isLoading={marketLoading}
            />
            <div className="flex-1 bg-black/50 relative">
              <TradingViewWidget pair={pair} />
            </div>
            <BottomNav />
            {!walletConnected && <ConnectWalletBanner />}
          </>
        );
      case "earn":
        return (
          <StakingPanel
            walletConnected={walletConnected}
            onConnect={connectWallet}
          />
        );
      case "alpha":
        return <AlphaSection />;
      case "degen":
        return <DegenSection pair={pair} positionType={positionType} />;
      case "airdrop":
        return <AirdropSection />;
      case "bonus":
        return <BonusSection />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen flex flex-col bg-black text-white">
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90" />

      <div className="flex flex-1 h-[calc(100vh-73px)]">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          trendingPairs={trendingPairs}
          onPairClick={handleTrendingPairClick}
          isLoading={trendingLoading}
        />

        <div className="flex-1 flex flex-col">{renderMainContent()}</div>

        {activeTab !== "bonus" && (
          <div className="w-80 border-l border-transparent bg-white/5 p-4 flex flex-col justify-center backdrop-blur-sm relative">
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>
            {renderRightPanel()}
          </div>
        )}
      </div>
    </div>
  );
}