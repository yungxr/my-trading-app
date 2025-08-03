"use client";

import { useState, useEffect } from "react";
import TradingView from "@/components/TradingView";
import { getMarketData } from "@/lib/binance";

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

  // Состояния кошелька (упрощенные)
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
    // Пустая функция, которую вы сможете реализовать позже
    console.log("Connect wallet button clicked");
    // Здесь будет ваша реализация подключения кошелька
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      `${positionType.toUpperCase()} ${amount} ${pair} at ${currentPrice} with ${leverage}x leverage`
    );
  };

  const handleStake = () => {
    if (!walletConnected) {
      connectWallet();
      return;
    }
    console.log("Staking initiated");
    // Здесь будет логика стейкинга
  };

  const [trendingPairs, setTrendingPairs] = useState([
    { symbol: "BTC-USDT", price: 0, change: 0 },
    { symbol: "ETH-USDT", price: 0, change: 0 },
    { symbol: "SOL-USDT", price: 0, change: 0 },
    { symbol: "BNB-USDT", price: 0, change: 0 },
    { symbol: "ADA-USDT", price: 0, change: 0 },
  ]);

  // Функция для обновления трендовых пар
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
            return p; // Возвращаем старые данные при ошибке
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
  }, []); // Убрана зависимость от trendingPairs

  // Обработчик клика по паре
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
    return "Not connected";
  };

  const formatAddress = () => {
    return "0x000...0000";
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-black via-[#10192b] to-[#18192d] text-white">
      {/* Main Trading Area */}
      <div className="flex flex-1 h-[calc(100vh-73px)]">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#0b1422]/80 border-r border-[#1E293B] p-4 overflow-y-auto">
          <div className="mb-6">
            <div className="text-[#7e83a7] text-xs font-semibold mb-2">
              PRODUCT
            </div>
            <button
              className={`w-full text-left py-2 px-3 rounded-lg mb-1 ${
                activeTab === "trade"
                  ? "bg-[#1e293b] text-white"
                  : "text-[#b0b4c4] hover:bg-[#1e293b]/50"
              }`}
              onClick={() => setActiveTab("trade")}
            >
              Trade
            </button>
            <button
              className={`w-full text-left py-2 px-3 rounded-lg mb-1 ${
                activeTab === "alpha"
                  ? "bg-[#1e293b] text-white"
                  : "text-[#b0b4c4] hover:bg-[#1e293b]/50"
              }`}
              onClick={() => setActiveTab("alpha")}
            >
              Alpha
            </button>
            <button
              className={`w-full text-left py-2 px-3 rounded-lg mb-1 ${
                activeTab === "degen"
                  ? "bg-[#1e293b] text-white"
                  : "text-[#b0b4c4] hover:bg-[#1e293b]/50"
              }`}
              onClick={() => setActiveTab("degen")}
            >
              Degen{" "}
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded ml-2">
                1000x
              </span>
            </button>
            <button
              className={`w-full text-left py-2 px-3 rounded-lg ${
                activeTab === "earn"
                  ? "bg-[#1e293b] text-white"
                  : "text-[#b0b4c4] hover:bg-[#1e293b]/50"
              }`}
              onClick={() => setActiveTab("earn")}
            >
              Earn{" "}
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2">
                +500% APR
              </span>
            </button>
          </div>

          {/* Rewards Section */}
          <div className="mb-6">
            <div className="text-[#7e83a7] text-xs font-semibold mb-2">
              REWARDS
            </div>
            <button className="w-full text-left text-[#b0b4c4] hover:bg-[#1e293b]/50 py-2 px-3 rounded-lg mb-1">
              Airdrop
            </button>
            <button className="w-full text-left text-[#b0b4c4] hover:bg-[#1e293b]/50 py-2 px-3 rounded-lg mb-1">
              Get $4000
            </button>
          </div>

          {/* Other Section */}
          <div className="mb-6">
            <div className="text-[#7e83a7] text-xs font-semibold mb-2">
              OTHER
            </div>
            <button className="w-full text-left text-[#b0b4c4] hover:bg-[#1e293b]/50 py-2 px-3 rounded-lg mb-1">
              Referral
            </button>
            <button className="w-full text-left text-[#b0b4c4] hover:bg-[#1e293b]/50 py-2 px-3 rounded-lg">
              Docs
            </button>
          </div>

          {/* Trending Pairs */}
          <div>
            <div className="text-[#7e83a7] text-xs font-semibold mb-2">
              TRENDING
            </div>
            {trendingPairs.map((pair) => (
              <div
                key={pair.symbol}
                className="flex justify-between items-center py-2 px-3 hover:bg-[#1e293b]/30 rounded-lg cursor-pointer"
                onClick={() => handleTrendingPairClick(pair.symbol)}
              >
                <div>
                  <div className="text-white text-sm">
                    {pair.symbol.replace("-USDT", "")}
                  </div>
                  <div className="text-[#7e83a4] text-xs">
                    ${pair.price.toFixed(5)}
                  </div>
                </div>
                <div
                  className={`text-xs font-medium ${
                    pair.change >= 0 ? "text-green-400" : "text-red-400"
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
            /* Торговый интерфейс */
            <>
              {/* Pair Info Bar */}
              <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#0b1422]/80">
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-bold">
                    {pair.replace("-", "/")}
                  </div>
                  <div className="text-xl font-bold">
                    {currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                    Up to 100X
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-[#b0b4c4]">
                    <span className="text-green-400">Long</span> /{" "}
                    <span className="text-red-400">Short</span> (Envelope note)
                    <br />
                    0.000000X / 0.004000X
                  </div>
                  <div className="text-[#b0b4c4]">
                    <span className="text-green-400">Long</span> /{" "}
                    <span className="text-red-400">Short</span> (QI)
                    <br />
                    54.30M / 53.84M
                  </div>
                  <div className="text-[#b0b4c4]">
                    24H High / Low
                    <br />
                    $18,753.64 / $133,110.94
                  </div>
                </div>
              </div>
              {/* TradingView Chart */}
              <div className="flex-1 bg-[#0F172A] relative">
                <TradingView pair={pair} />
              </div>
              {/* Bottom Navigation */}
              <div className="flex border-t border-[#1E293B] bg-[#0b1422]">
                {[
                  "Positions",
                  "Open Orders",
                  "Order History",
                  "Position History",
                ].map((item) => (
                  <button
                    key={item}
                    className="flex-1 py-3 text-sm text-[#b0b4c4] hover:text-white border-r border-[#1E293B] last:border-r-0"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Connect Wallet Banner */}
              {!walletConnected && (
                <div className="p-4 bg-[#0b1422] border-t border-[#1E293B] text-center">
                  <button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-[#0853fc] to-[#122780] px-6 py-2 rounded-lg font-semibold text-white"
                  >
                    Connect wallet to trade
                  </button>
                </div>
              )}
            </>
          ) : activeTab === "earn" ? (
            /* Интерфейс стейкинга */
            <div className="flex-1 overflow-y-auto p-6">
              {/* My Staking Section */}
              <div className="bg-[#0b1422]/80 rounded-xl p-6 mb-6 border border-[#1E293B]">
                <h2 className="text-xl font-bold mb-4">My staking (0)</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                    <div className="text-[#B0B4C4] text-sm mb-1">
                      Total Staking Value
                    </div>
                    <div className="text-2xl font-bold">
                      ${stakingValue.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                    <div className="text-[#B0B4C4] text-sm mb-1">
                      Total Rewards
                    </div>
                    <div className="text-2xl font-bold">
                      ${totalRewards.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                    <div className="text-[#B0B4C4] text-sm mb-1">Unclaimed</div>
                    <div className="text-2xl font-bold">
                      ${unclaimed.toLocaleString()}
                    </div>
                  </div>
                </div>

                {!walletConnected ? (
                  <button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-[#0853fc] to-[#122780] px-6 py-3 rounded-lg font-semibold text-white w-full"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white">
                      Claim Rewards
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold text-white">
                      Compound
                    </button>
                  </div>
                )}
              </div>

              {/* Staking Pools */}
              <div className="bg-[#0b1422]/80 rounded-xl p-6 border border-[#1E293B]">
                <h2 className="text-xl font-bold mb-6">Available Pools</h2>

                {walletConnected && (
                  <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                    Please switch to Ethereum Mainnet or Polygon for staking
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stakingPools.map((pool, index) => (
                    <div
                      key={index}
                      className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{pool.name}</h3>
                          <p className="text-[#B0B4C4] text-sm">
                            {pool.description}
                          </p>
                        </div>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                          {pool.apr} APR
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-[#B0B4C4] text-sm">
                            Total Staked
                          </div>
                          <div className="font-medium">{pool.supply}</div>
                        </div>
                        <div>
                          <div className="text-[#B0B4C4] text-sm">
                            Est Earnings/{pool.days.split(" ")[0]}d
                          </div>
                          <div className="font-medium text-green-400">
                            {pool.earnings}
                          </div>
                        </div>
                      </div>

                      <button
                        className={`w-full py-2 rounded-lg font-medium ${
                          walletConnected
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-600 cursor-not-allowed"
                        }`}
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
              <h2 className="text-2xl font-bold text-[#b0b4c4]">
                {activeTab === "alpha" ? "Alpha" : "Degen"} section coming soon
              </h2>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l border-[#1E293B] bg-[#0b1422]/80 p-4 flex flex-col">
          {activeTab === "trade" ? (
            /* Торговая форма */
            <>
              <div className="flex mb-6">
                <button
                  onClick={() => setPositionType("long")}
                  className={`flex-1 py-3 rounded-l-lg font-bold ${
                    positionType === "long"
                      ? "bg-green-500/90 text-white"
                      : "bg-[#1E293B] text-[#b0b4c4]"
                  }`}
                >
                  Long
                </button>
                <button
                  onClick={() => setPositionType("short")}
                  className={`flex-1 py-3 rounded-r-lg font-bold ${
                    positionType === "short"
                      ? "bg-red-500/90 text-white"
                      : "bg-[#1E293B] text-[#b0b4c4]"
                  }`}
                >
                  Short
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-[#b0b4c4]">Cross</div>
                <div className="flex gap-2">
                  {[5, 10, 20, 50].map((lev) => (
                    <button
                      key={lev}
                      onClick={() => setLeverage(lev)}
                      className={`px-3 py-1 rounded ${
                        leverage === lev
                          ? "bg-blue-600 text-white"
                          : "bg-[#1E293B] text-[#b0b4c4]"
                      }`}
                    >
                      {lev}X
                    </button>
                  ))}
                </div>
                <button className="text-[#b0b4c4] hover:text-white">
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

              <div className="flex mb-6">
                <button
                  onClick={() => setOrderType("market")}
                  className={`flex-1 py-2 rounded-l-lg ${
                    orderType === "market"
                      ? "bg-blue-600 text-white"
                      : "bg-[#1E293B] text-[#b0b4c4]"
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType("limit")}
                  className={`flex-1 py-2 rounded-r-lg ${
                    orderType === "limit"
                      ? "bg-blue-600 text-white"
                      : "bg-[#1E293B] text-[#b0b4c4]"
                  }`}
                >
                  Limit
                </button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-[#b0b4c4] text-sm mb-2">
                  <span>Use</span>
                  <span>0.0 ETH</span>
                </div>
                <input
                  type="number"
                  placeholder="0.0"
                  className="w-full p-3 bg-[#0F172A] border border-[#1E3A8A] rounded-lg text-white font-mono mb-2"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex justify-between text-[#b0b4c4] text-sm mb-4">
                  <span>
                    {positionType === "long" ? "Long" : "Short"}{" "}
                    {pair.split("-")[0]}
                  </span>
                  <span>0.0 {pair.split("-")[0]}</span>
                </div>
                <div className="flex justify-between gap-2 mb-4">
                  {[25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      className="flex-1 py-2 bg-[#1E293B] text-[#b0b4c4] rounded hover:bg-blue-600 hover:text-white"
                      onClick={() =>
                        setAmount(((percent / 100) * 1000).toFixed(2))
                      }
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[#b0b4c4] text-sm mb-4">
                Open size = 0.0 USD
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full py-3 rounded-lg font-bold ${
                  positionType === "long"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white mb-6`}
                disabled={!walletConnected}
              >
                {positionType === "long" ? "Long" : "Short"}{" "}
                {pair.split("-")[0]}
              </button>

              <div className="mt-auto">
                <div className="text-[#7e83a7] text-sm mb-2">
                  Market Details
                </div>
                <div className="flex justify-between text-[#b0b4c4] text-sm py-2 border-b border-[#1E293B]">
                  <span>Long Margin Token</span>
                  <span>ETH</span>
                </div>
                <div className="flex justify-between text-[#b0b4c4] text-sm py-2">
                  <span>Long OI Cap</span>
                  <span>100,000.00 USD</span>
                </div>
              </div>
            </>
          ) : activeTab === "earn" ? (
            /* Панель информации для стейкинга */
            <div className="space-y-6">
              {walletConnected && (
                <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                  <h3 className="text-lg font-bold mb-3">Wallet Info</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[#B0B4C4] text-xs">Address</div>
                      <div className="text-sm font-mono break-all">
                        {formatAddress()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#B0B4C4] text-xs">Network</div>
                      <div className="text-sm">{getNetworkName()}</div>
                    </div>
                    <div>
                      <div className="text-[#B0B4C4] text-xs">Balance</div>
                      <div className="text-sm">0.0 ETH</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                <h3 className="text-lg font-bold mb-3">Staking Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-[#B0B4C4] text-xs">
                      Total Value Locked
                    </div>
                    <div className="text-xl font-bold">$3,626,971</div>
                  </div>
                  <div>
                    <div className="text-[#B0B4C4] text-xs">
                      Total Participants
                    </div>
                    <div className="text-xl font-bold">1,429</div>
                  </div>
                  <div>
                    <div className="text-[#B0B4C4] text-xs">Avg. APR</div>
                    <div className="text-xl font-bold text-green-400">
                      9.42%
                    </div>
                  </div>
                </div>
              </div>

              {walletConnected && (
                <button
                  className="w-full py-3 bg-gradient-to-r from-[#0853fc] to-[#122780] rounded-lg font-bold text-white"
                  onClick={handleStake}
                >
                  Stake Assets
                </button>
              )}
            </div>
          ) : (
            /* Правая панель для других вкладок */
            <div className="flex items-center justify-center h-full">
              <p className="text-[#b0b4c4] text-center">
                {activeTab === "alpha" ? "Alpha" : "Degen"} tools coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
