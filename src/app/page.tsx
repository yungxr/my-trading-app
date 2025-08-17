"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Globe,
  Zap,
  Activity,
  Award,
  Eye,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";

// Типы для данных API
type MarketData = {
  pair: string;
  price: string;
  change: string;
  changeColor: string;
};

type PoolData = {
  token: string;
  symbol: string;
  desc: string;
  apr: string;
  colors: string;
};

type StatData = {
  label: string;
  value: string;
  icon: JSX.Element;
};

export default function Home() {
  const router = useRouter();
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [poolData, setPoolData] = useState<PoolData[]>([]);
  const [statsData, setStatsData] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);

  // Функция для навигации
  const navigateToTrade = (pair: string = "BTC") => {
    router.push(`/trade/${pair}`);
  };

  // Функция для форматирования чисел
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(num);
  };

  // Функция для получения данных о криптовалютах
  const fetchCryptoData = async () => {
    try {
      // Используем CoinGecko API для получения данных
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cardano&order=market_cap_desc&per_page=4&page=1&sparkline=false"
      );
      const data = await response.json();

      // Формируем данные для рынка
      const newMarketData = data.map((crypto: any) => {
        const change = crypto.price_change_percentage_24h.toFixed(2);
        return {
          pair: `${crypto.symbol.toUpperCase()}-USD`,
          price: formatNumber(crypto.current_price),
          change: `${change > 0 ? "+" : ""}${change}%`,
          changeColor: change >= 0 ? "text-emerald-400" : "text-rose-400",
        };
      });

      setMarketData(newMarketData);

      // Формируем данные для пулов
      const newPoolData = [
        {
          token: "BTC",
          symbol: "₿",
          desc: "Supply BTC",
          apr: `${(Math.random() * 5 + 5).toFixed(2)}% APR`,
          colors: "from-yellow-400 via-orange-400 to-purple-400",
        },
        {
          token: "ETH",
          symbol: "Ξ",
          desc: "Supply ETH",
          apr: `${(Math.random() * 3 + 3).toFixed(2)}% APR`,
          colors: "from-purple-500 via-blue-400 to-fuchsia-400",
        },
        {
          token: "USDT",
          symbol: "$",
          desc: "Supply USDT",
          apr: `${(Math.random() * 2 + 2).toFixed(2)}% APR`,
          colors: "from-sky-400 via-blue-400 to-indigo-400",
        },
      ];

      setPoolData(newPoolData);

      // Формируем статистику
      const newStatsData = [
        {
          label: "Trading Volume",
          value: formatNumber(1862768218 * (0.9 + Math.random() * 0.2)),
          icon: <TrendingUp className="text-fuchsia-300" size={24} />,
        },
        {
          label: "Total Value Locked",
          value: formatNumber(6701610 * (0.9 + Math.random() * 0.2)),
          icon: <Users className="text-indigo-200" size={24} />,
        },
        {
          label: "Active Users",
          value: `${Math.floor(
            34198 * (0.9 + Math.random() * 0.2)
          ).toLocaleString()}`,
          icon: <Globe className="text-purple-300" size={24} />,
        },
      ];

      setStatsData(newStatsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    }
  };

  // Загрузка данных при монтировании и обновление каждые 30 секунд
  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-50">
        <Image
          src="/images/bg.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-[#a67cf05b] backdrop-blur-[1px]" />
      </div>

      {/* Header */}
      <header className="relative z-30 w-full pt-9 pb-7 px-6 lg:px-24 flex items-center justify-between">
        <span className="font-black text-2xl lg:text-3xl bg-gradient-to-tr from-fuchsia-400 via-purple-300 to-white bg-clip-text text-transparent">
          Digital Vault
        </span>
        <button
          onClick={() => navigateToTrade()}
          className="bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 px-6 py-2 rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all cursor-pointer"
        >
          Launch App
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-12">
        {/* Updated Hero Section - Split Layout */}
        <section className="pt-8 pb-24 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-tr from-fuchsia-300 via-indigo-300 to-white mb-6 leading-tight">
                Decentralized Perpetual Exchange
              </h1>
              <p className="text-xl text-indigo-100/80 mb-8">
                Isolated & Cross Margin, High-Yield, Security DEX, Up to 1000x
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigateToTrade()}
                  className="bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 px-8 py-3 rounded-xl font-bold shadow-lg transition-all hover:opacity-90 cursor-pointer"
                >
                  Launch App
                </button>
              </div>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 gap-6"
            >
              {loading
                ? // Skeleton loader while data is loading
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-sm animate-pulse h-24"
                      />
                    ))
                : statsData.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/5">
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-sm text-indigo-100/80">
                            {stat.label}
                          </div>
                          <div className="text-2xl font-bold text-fuchsia-100 mt-1">
                            {stat.value}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </motion.div>
          </div>
        </section>

        {/* Maximum Collateral for Margin Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold mb-8 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent"
            >
              Maximum Collateral for Margin
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-indigo-100/80 mb-12 max-w-3xl"
            >
              We support a wide range of collateral deposits for margin trading,
              allowing you to trade any market with any asset.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Activity className="text-purple-400" size={24} />,
                  title: "High Liquidity",
                  desc: "ELF offers high liquidity, low slippage, and fast trading. Staking assets like ETH or BTC to earn rewards.",
                },
                {
                  icon: <Award className="text-yellow-300" size={24} />,
                  title: "High Yield",
                  desc: "Earn yield on collateral through lending and share fee revenues.",
                },
                {
                  icon: <ShieldCheck className="text-emerald-400" size={24} />,
                  title: "Minimized Risks",
                  desc: "Offset P&L and volatility risks to lower costs and reduce liquidation risks.",
                },
                {
                  icon: <Zap className="text-fuchsia-300" size={24} />,
                  title: "Fast Trade",
                  desc: "Instant order execution with automatic gas fee deduction for seamless trading.",
                },
                {
                  icon: <Eye className="text-indigo-300" size={24} />,
                  title: "Transparent",
                  desc: "On-chain, transparent transactions with full user control and secure authorization.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-fuchsia-400/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-indigo-100/70">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Two Columns Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Yield Pools */}
          <section className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent"
            >
              Ultra Yield Pool
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loading
                ? // Skeleton loader while data is loading
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`bg-gradient-to-br ${
                          i === 0
                            ? "from-yellow-400 via-orange-400 to-purple-400"
                            : i === 1
                            ? "from-purple-500 via-blue-400 to-fuchsia-400"
                            : "from-sky-400 via-blue-400 to-indigo-400"
                        } bg-opacity-10 border border-white/10 rounded-xl p-5 h-48 animate-pulse`}
                      />
                    ))
                : poolData.map((pool, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`bg-gradient-to-br ${pool.colors} bg-opacity-10 border border-white/10 rounded-xl p-5 cursor-pointer`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xl font-bold">{pool.token}</div>
                          <div className="text-sm text-indigo-100/80 mt-1">
                            {pool.desc}
                          </div>
                        </div>
                        <div className="text-3xl font-black">{pool.symbol}</div>
                      </div>
                      <div className="mt-4 text-lg font-medium">{pool.apr}</div>
                      <button
                        onClick={() => navigateToTrade(pool.token)}
                        className="mt-4 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-white/10 transition cursor-pointer"
                      >
                        Supply <ArrowUpRight size={14} />
                      </button>
                    </motion.div>
                  ))}
            </div>
          </section>

          {/* Right Column - Market Prices */}
          <section>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl font-bold mb-6 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent"
            >
              Market
            </motion.h3>

            <div className="bg-white/10 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
              {loading
                ? // Skeleton loader while data is loading
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`p-4 ${
                          i !== 2 ? "border-b border-white/10" : ""
                        } h-20 animate-pulse`}
                      />
                    ))
                : marketData.map((token, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 flex justify-between items-center ${
                        i !== marketData.length - 1
                          ? "border-b border-white/10"
                          : ""
                      }`}
                    >
                      <div>
                        <div className="font-medium">{token.pair}</div>
                        <div className="text-sm text-indigo-100/80">
                          Perpetual
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{token.price}</div>
                        <div className={`text-sm ${token.changeColor}`}>
                          {token.change}
                        </div>
                      </div>
                    </motion.div>
                  ))}

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => navigateToTrade()}
                  className="w-full py-3 bg-gradient-to-tr from-purple-600/30 via-fuchsia-400/30 to-indigo-500/30 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-white/10 transition cursor-pointer"
                >
                  View All Markets
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* New Partners Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-3xl font-bold mb-8 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent"
            >
              Partners
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Audit Partners */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Audit</h3>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                  <Check className="text-emerald-400" />
                  <span className="font-medium">SHERLOCK</span>
                </div>
              </div>

              {/* Investment Partners */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Investment Partners
                </h3>
                <p className="text-indigo-100/80 mb-6">
                  DigitalVault Protocol is backed by crypto's leading investment
                  partners IDGCapital, KuCoin Ventures.
                </p>

                <div className="space-y-4">
                  {/* IDG Capital */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="font-medium mb-3">IDG Capital</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="text-emerald-400 w-4 h-4" />
                        <span>ANTITIPULM</span>
                      </li>
                    </ul>
                  </div>

                  {/* Gate.io */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="font-medium mb-3">Gate.io</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="text-emerald-400 w-4 h-4" />
                        <span>Mises</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-emerald-400 w-4 h-4" />
                        <span>Gake</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="relative z-20 pt-16 pb-10 border-t border-white/10 bg-gradient-to-b from-[#11061c]/80 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-300 bg-clip-text text-transparent mb-4">
                Digital Vault
              </div>
              <p className="text-sm text-white/60 mb-4">
                Advanced decentralized trading and staking platform
              </p>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#1DA1F2] transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#0088cc] transition-colors"
                  aria-label="Telegram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#5865F2] transition-colors"
                  aria-label="Discord"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="/trade/BTC"
                    className="hover:text-fuchsia-300 transition-colors"
                  >
                    Trade
                  </a>
                </li>
                <li>
                  <a
                    href="/trade/earn"
                    className="hover:text-fuchsia-300 transition-colors"
                  >
                    Earn
                  </a>
                </li>
                <li>
                  <a
                    href="/trade/referral"
                    className="hover:text-fuchsia-300 transition-colors"
                  >
                    Referral
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#1DA1F2] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://telegram.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#0088cc] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#5865F2] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="/terms"
                    className="hover:text-fuchsia-300 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-fuchsia-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/risk"
                    className="hover:text-fuchsia-300 transition-colors"
                  >
                    Risk Disclosure
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/40">
              © {new Date().getFullYear()} Digital Vault. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#1DA1F2] transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#0088cc] transition-colors"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#5865F2] transition-colors"
                aria-label="Discord"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}