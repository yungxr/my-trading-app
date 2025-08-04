"use client";

import { useState, useEffect } from "react";
import TradingView from "@/components/TradingView";
import { getMarketData } from "@/lib/binance";
import { 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Infinity,
  Globe,
  ChevronDown,
  Zap,
  Activity,
  Award,
  Clock,
  Eye,
  Check
} from "lucide-react";

export default function TradePage() {
  // Торговые состояния
  const [pair, setPair] = useState("BTC-USDT");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [activeTab, setActiveTab] = useState("trade");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState("");

  // Состояния кошелька
  const [walletConnected, setWalletConnected] = useState(false);

  // Стейкинг состояния
  const [stakingValue, setStakingValue] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [unclaimed, setUnclaimed] = useState(0);

  // Получение данных рынка
  useEffect(() => {
    if (activeTab !== "trade") return;

    const fetchMarketData = async () => {
      try {
        const data = await getMarketData(pair.replace("-USDT", ""));
        setCurrentPrice(parseFloat(data.lastPrice));
        setPriceChange(parseFloat(data.priceChangePercent));
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);

    return () => clearInterval(interval);
  }, [pair, activeTab]);

  const connectWallet = () => {
    setWalletConnected(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${positionType.toUpperCase()} ${amount} ${pair} at ${currentPrice} with ${leverage}x leverage`);
  };

  const handleStake = () => {
    if (!walletConnected) {
      connectWallet();
      return;
    }
    console.log("Staking initiated");
  };

  const [trendingPairs, setTrendingPairs] = useState([
    { symbol: "BTC-USDT", price: 0, change: 0 },
    { symbol: "ETH-USDT", price: 0, change: 0 },
    { symbol: "SOL-USDT", price: 0, change: 0 },
    { symbol: "BNB-USDT", price: 0, change: 0 },
    { symbol: "ADA-USDT", price: 0, change: 0 },
  ]);

  const updateTrendingPairs = async () => {
    try {
      const updatedPairs = await Promise.all(
        trendingPairs.map(async (p) => {
          try {
            const data = await getMarketData(p.symbol);
            return {
              ...p,
              price: parseFloat(data.lastPrice),
              change: parseFloat(data.priceChangePercent),
            };
          } catch {
            return p;
          }
        })
      );
      setTrendingPairs(updatedPairs);
    } catch (error) {
      console.error("Error updating trending pairs:", error);
    }
  };

  useEffect(() => {
    updateTrendingPairs();
    const interval = setInterval(updateTrendingPairs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTrendingPairClick = (symbol: string) => {
    setPair(symbol);
  };

  const stakingPools = [
    {
      name: "ETH",
      description: "Supply ETH/WETH",
      apr: "11.57X",
      supply: "$500",
      earnings: "+$28.52",
      days: "180 days",
    },
    {
      name: "USD",
      description: "Supply MERC",
      apr: "11.67X",
      supply: "$11.67X",
      days: "90 days",
    },
  ];

  const getNetworkName = () => {
    return walletConnected ? "Ethereum Mainnet" : "Not connected";
  };

  const formatAddress = () => {
    return walletConnected ? "0x742d...3a1b" : "0x000...0000";
  };

  return (
    <div className="relative h-screen flex flex-col bg-black text-white">
      {/* Background Overlay */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90" />
      
      {/* Main Trading Area */}
      <div className="flex flex-1 h-[calc(100vh-73px)]">
        {/* Left Sidebar - Обновленный дизайн с градиентными бордерами */}
        <div className="w-64 bg-white/5 border-r border-transparent p-4 overflow-y-auto backdrop-blur-sm relative">
          {/* Градиентный бордер */}
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>
          
          <div className="mb-6">
            <div className="text-indigo-100/80 text-xs font-semibold mb-2">PRODUCT</div>
            {["trade", "alpha", "degen", "earn"].map((tab) => (
              <button
                key={tab}
                className={`w-full text-left py-2 px-3 rounded-xl mb-1 transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-white border border-fuchsia-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "text-indigo-100/80 hover:bg-white/5 hover:border-white/10 border border-transparent"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "degen" && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full ml-2">
                    1000x
                  </span>
                )}
                {tab === "earn" && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2">
                    +500% APR
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Rewards Section */}
          <div className="mb-6">
            <div className="text-indigo-100/80 text-xs font-semibold mb-2">REWARDS</div>
            {["Airdrop", "Get $4000"].map((item) => (
              <button
                key={item}
                className="w-full text-left text-indigo-100/80 hover:bg-white/5 py-2 px-3 rounded-xl mb-1 transition-all border border-transparent hover:border-white/10"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Other Section */}
          <div className="mb-6">
            <div className="text-indigo-100/80 text-xs font-semibold mb-2">OTHER</div>
            {["Referral", "Docs"].map((item) => (
              <button
                key={item}
                className="w-full text-left text-indigo-100/80 hover:bg-white/5 py-2 px-3 rounded-xl mb-1 transition-all border border-transparent hover:border-white/10"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Trending Pairs */}
          <div>
            <div className="text-indigo-100/80 text-xs font-semibold mb-2">TRENDING</div>
            {trendingPairs.map((pair) => (
              <div
                key={pair.symbol}
                className="flex justify-between items-center py-2 px-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all mb-1 border border-transparent hover:border-white/10"
                onClick={() => handleTrendingPairClick(pair.symbol)}
              >
                <div>
                  <div className="text-white text-sm">
                    {pair.symbol.replace("-USDT", "")}
                  </div>
                  <div className="text-indigo-100/60 text-xs">
                    ${pair.price.toFixed(5)}
                  </div>
                </div>
                <div
                  className={`text-xs font-medium ${
                    pair.change >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {pair.change >= 0 ? "+" : ""}
                  {pair.change.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {activeTab === "trade" ? (
            /* Торговый интерфейс с обновленным дизайном */
            <>
              {/* Pair Info Bar */}
              <div className="flex items-center justify-between p-4 border-b border-transparent bg-white/5 backdrop-blur-sm relative">
                {/* Градиентный бордер снизу */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-bold bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                    {pair.replace("-", "/")}
                  </div>
                  <div className="text-xl font-bold">
                    {currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    Up to 100X
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-indigo-100/80">
                    <span className="text-emerald-400">Long</span> /{" "}
                    <span className="text-rose-400">Short</span> (Envelope note)
                    <br />
                    0.000000X / 0.004000X
                  </div>
                  <div className="text-indigo-100/80">
                    <span className="text-emerald-400">Long</span> /{" "}
                    <span className="text-rose-400">Short</span> (QI)
                    <br />
                    54.30M / 53.84M
                  </div>
                  <div className="text-indigo-100/80">
                    24H High / Low
                    <br />
                    $18,753.64 / $133,110.94
                  </div>
                </div>
              </div>

              {/* TradingView Chart */}
              <div className="flex-1 bg-black/50 relative">
                <TradingView pair={pair} />
              </div>

              {/* Bottom Navigation */}
              <div className="flex border-t border-transparent bg-white/5 backdrop-blur-sm relative">
                {/* Градиентный бордер сверху */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>
                
                {["Positions", "Open Orders", "Order History", "Position History"].map((item) => (
                  <button
                    key={item}
                    className="flex-1 py-3 text-sm text-indigo-100/80 hover:text-white border-r border-white/10 last:border-r-0 transition-all hover:bg-white/5"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Connect Wallet Banner */}
              {!walletConnected && (
                <div className="p-4 bg-white/5 border-t border-transparent text-center backdrop-blur-sm relative">
                  {/* Градиентный бордер сверху */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>
                  
                  <button
                    onClick={connectWallet}
                    className="bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 px-6 py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition-all border border-transparent hover:border-fuchsia-300/50 shadow-purple-500/20"
                  >
                    Connect wallet to trade
                  </button>
                </div>
              )}
            </>
          ) : activeTab === "earn" ? (
            /* Интерфейс стейкинга с обновленным дизайном */
            <div className="flex-1 overflow-y-auto p-6">
              {/* My Staking Section */}
              <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-transparent backdrop-blur-sm relative overflow-hidden">
                {/* Градиентный бордер */}
                <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90"></div>
                </div>
                
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                  My staking (0)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[
                    { label: "Total Staking Value", value: stakingValue },
                    { label: "Total Rewards", value: totalRewards },
                    { label: "Unclaimed", value: unclaimed }
                  ].map((stat, i) => (
                    <div 
                      key={i} 
                      className="bg-white/5 p-4 rounded-xl border border-transparent backdrop-blur-sm relative overflow-hidden"
                    >
                      {/* Градиентный бордер */}
                      <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90"></div>
                      </div>
                      
                      <div className="text-indigo-100/80 text-sm mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold">
                        ${stat.value.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {!walletConnected ? (
                  <button
                    onClick={connectWallet}
                    className="bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all w-full border border-transparent hover:border-fuchsia-300/50 shadow-purple-500/20"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button className="bg-gradient-to-tr from-purple-600 to-fuchsia-500 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all border border-transparent hover:border-fuchsia-300/50 shadow-purple-500/20">
                      Claim Rewards
                    </button>
                    <button className="bg-gradient-to-tr from-emerald-600 to-teal-500 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all border border-transparent hover:border-emerald-300/50 shadow-emerald-500/20">
                      Compound
                    </button>
                  </div>
                )}
              </div>

              {/* Staking Pools */}
              <div className="bg-white/5 rounded-2xl p-6 border border-transparent backdrop-blur-sm relative overflow-hidden">
                {/* Градиентный бордер */}
                <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90"></div>
                </div>
                
                <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                  Available Pools
                </h2>

                {walletConnected && (
                  <div className="bg-rose-500/20 text-rose-400 p-3 rounded-lg text-sm mb-4 border border-rose-500/30">
                    Please switch to Ethereum Mainnet or Polygon for staking
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stakingPools.map((pool, index) => (
                    <div
                      key={index}
                      className="bg-white/5 p-4 rounded-xl border border-transparent backdrop-blur-sm relative overflow-hidden"
                    >
                      {/* Градиентный бордер */}
                      <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90"></div>
                      </div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{pool.name}</h3>
                          <p className="text-indigo-100/80 text-sm">
                            {pool.description}
                          </p>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-sm border border-emerald-500/30">
                          {pool.apr} APR
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-indigo-100/80 text-sm">Total Staked</div>
                          <div className="font-medium">{pool.supply}</div>
                        </div>
                        <div>
                          <div className="text-indigo-100/80 text-sm">
                            Est Earnings/{pool.days.split(" ")[0]}d
                          </div>
                          <div className="font-medium text-emerald-400">
                            {pool.earnings}
                          </div>
                        </div>
                      </div>

                      <button
                        className={`w-full py-2 rounded-lg font-medium transition-all ${
                          walletConnected
                            ? "bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 hover:scale-105 shadow-lg border border-transparent hover:border-fuchsia-300/50 shadow-purple-500/20"
                            : "bg-white/10 cursor-not-allowed border border-white/10"
                        } text-white`}
                        disabled={!walletConnected}
                        onClick={handleStake}
                      >
                        {walletConnected ? "Stake Now" : "Connect Wallet"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Заглушки для других вкладок */
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-indigo-100/80">
                {activeTab === "alpha" ? "Alpha" : "Degen"} section coming soon
              </h2>
            </div>
          )}
        </div>

        {/* Right Panel - Обновленный дизайн с градиентными бордерами */}
        <div className="w-80 border-l border-transparent bg-white/5 p-4 flex flex-col backdrop-blur-sm relative">
          {/* Градиентный бордер слева */}
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>
          
          {activeTab === "trade" ? (
            /* Торговая форма с обновленным дизайном */
            <>
              <div className="flex mb-6 rounded-xl overflow-hidden">
                <button
                  onClick={() => setPositionType("long")}
                  className={`flex-1 py-3 font-bold transition-all ${
                    positionType === "long"
                      ? "bg-gradient-to-b from-purple-600 to-indigo-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-white/10 text-indigo-100/80 hover:bg-white/20 border-r border-white/10"
                  }`}
                >
                  Long
                </button>
                <button
                  onClick={() => setPositionType("short")}
                  className={`flex-1 py-3 font-bold transition-all ${
                    positionType === "short"
                      ? "bg-gradient-to-b from-rose-500/90 to-rose-600/90 text-white shadow-lg shadow-rose-500/20"
                      : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                  }`}
                >
                  Short
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-indigo-100/80">Cross</div>
                <div className="flex gap-2">
                  {[5, 10, 20, 50].map((lev) => (
                    <button
                      key={lev}
                      onClick={() => setLeverage(lev)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        leverage === lev
                          ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20"
                          : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                      }`}
                    >
                      {lev}X
                    </button>
                  ))}
                </div>
                <button className="text-indigo-100/80 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex mb-6 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOrderType("market")}
                  className={`flex-1 py-2 transition-all ${
                    orderType === "market"
                      ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20"
                      : "bg-white/10 text-indigo-100/80 hover:bg-white/20 border-r border-white/10"
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType("limit")}
                  className={`flex-1 py-2 transition-all ${
                    orderType === "limit"
                      ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20"
                      : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
                  }`}
                >
                  Limit
                </button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
                  <span>Use</span>
                  <span>0.0 ETH</span>
                </div>
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex justify-between text-indigo-100/80 text-sm mb-4">
                  <span>
                    {positionType === "long" ? "Long" : "Short"} {pair.split("-")[0]}
                  </span>
                  <span>0.0 {pair.split("-")[0]}</span>
                </div>
                <div className="flex justify-between gap-2 mb-4">
                  {[25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      className="flex-1 py-2 bg-white/10 text-indigo-100/80 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                      onClick={() =>
                        setAmount(((percent / 100) * 1000).toFixed(2))
                      }
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-indigo-100/80 text-sm mb-4">
                Open size = 0.0 USD
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full py-3 rounded-xl font-bold text-white mb-6 transition-all hover:scale-105 shadow-lg ${
                  positionType === "long"
                    ? "bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 shadow-emerald-500/20"
                    : "bg-gradient-to-tr from-rose-500 to-pink-500 shadow-rose-500/20"
                } border border-transparent hover:border-fuchsia-300/50`}
                disabled={!walletConnected}
              >
                {positionType === "long" ? "Long" : "Short"} {pair.split("-")[0]}
              </button>

              <div className="mt-auto">
                <div className="text-indigo-100/80 text-sm mb-2">
                  Market Details
                </div>
                <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
                  <span>Long Margin Token</span>
                  <span>ETH</span>
                </div>
                <div className="flex justify-between text-indigo-100/80 text-sm py-2">
                  <span>Long OI Cap</span>
                  <span>100,000.00 USD</span>
                </div>
              </div>
            </>
          ) : activeTab === "earn" ? (
            /* Панель информации для стейкинга с обновленным дизайном */
            <div className="space-y-6">
              {walletConnected && (
                <div className="bg-white/5 p-4 rounded-xl border border-transparent backdrop-blur-sm relative overflow-hidden">
                  {/* Градиентный бордер */}
                  <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90"></div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                    Wallet Info
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-indigo-100/80 text-xs">Address</div>
                      <div className="text-sm font-mono break-all">
                        {formatAddress()}
                      </div>
                    </div>
                    <div>
                      <div className="text-indigo-100/80 text-xs">Network</div>
                      <div className="text-sm">{getNetworkName()}</div>
                    </div>
                    <div>
                      <div className="text-indigo-100/80 text-xs">Balance</div>
                      <div className="text-sm">0.0 ETH</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white/5 p-4 rounded-xl border border-transparent backdrop-blur-sm relative overflow-hidden">
                {/* Градиентный бордер */}
                <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90"></div>
                </div>
                
                <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                  Staking Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-indigo-100/80 text-xs">Total Value Locked</div>
                    <div className="text-xl font-bold">$3,626,971</div>
                  </div>
                  <div>
                    <div className="text-indigo-100/80 text-xs">Total Participants</div>
                    <div className="text-xl font-bold">1,429</div>
                  </div>
                  <div>
                    <div className="text-indigo-100/80 text-xs">Avg. APR</div>
                    <div className="text-xl font-bold text-emerald-400">9.42%</div>
                  </div>
                </div>
              </div>

              {walletConnected && (
                <button
                  className="w-full py-3 bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-all border border-transparent hover:border-fuchsia-300/50 shadow-purple-500/20"
                  onClick={handleStake}
                >
                  Stake Assets
                </button>
              )}
            </div>
          ) : (
            /* Правая панель для других вкладок */
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