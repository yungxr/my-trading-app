"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  Check,
} from "lucide-react";

export default function Home() {
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
        <button className="bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 px-6 py-2 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
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
                <button className="bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500 px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition">
                  Launch App
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-xl font-medium transition-all">
                  Learn More
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
              {[
                { 
                  label: "Trading Volume", 
                  value: "$1,862,768,218", 
                  icon: <TrendingUp className="text-fuchsia-300" size={24} /> 
                },
                { 
                  label: "FYL", 
                  value: "$6,701,610", 
                  icon: <Users className="text-indigo-200" size={24} /> 
                },
                { 
                  label: "Users", 
                  value: "34,198", 
                  icon: <Globe className="text-purple-300" size={24} /> 
                },
              ].map((stat, i) => (
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
                      <div className="text-sm text-indigo-100/80">{stat.label}</div>
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
              We support a wide range of collateral deposits for margin trading, allowing you to trade any market with any asset.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: <Activity className="text-purple-400" size={24} />, 
                  title: "High Liquidity", 
                  desc: "ELF offers high liquidity, low slippage, and fast trading. Staking assets like ETH or BTC to earn rewards." 
                },
                { 
                  icon: <Award className="text-yellow-300" size={24} />, 
                  title: "High Yield", 
                  desc: "Earn yield on collateral through lending and share fee revenues." 
                },
                { 
                  icon: <ShieldCheck className="text-emerald-400" size={24} />, 
                  title: "Minimized Risks", 
                  desc: "Offset P&L and volatility risks to lower costs and reduce liquidation risks." 
                },
                { 
                  icon: <Zap className="text-fuchsia-300" size={24} />, 
                  title: "Fast Trade", 
                  desc: "Instant order execution with automatic gas fee deduction for seamless trading." 
                },
                { 
                  icon: <Eye className="text-indigo-300" size={24} />, 
                  title: "Transparent", 
                  desc: "On-chain, transparent transactions with full user control and secure authorization." 
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
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
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
              {[
                {
                  token: "BTC",
                  symbol: "₿",
                  desc: "Supply MERC",
                  apr: "14.44% APR",
                  colors: "from-yellow-400 via-orange-400 to-purple-400",
                },
                {
                  token: "ETH",
                  symbol: "Ξ",
                  desc: "Supply FITWATER",
                  apr: "5.18% APR",
                  colors: "from-purple-500 via-blue-400 to-fuchsia-400",
                },
                {
                  token: "USD",
                  symbol: "U",
                  desc: "Supply MERC",
                  apr: "9.17% APR",
                  colors: "from-sky-400 via-blue-400 to-indigo-400",
                },
              ].map((pool, i) => (
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
                  <button className="mt-4 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-white/10 transition">
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
              {[
                {
                  pair: "HYPSE-USD",
                  price: "$0.38940",
                  change: "+1.53%",
                  changeColor: "text-emerald-400",
                },
                {
                  pair: "PLMP-USD",
                  price: "$0.002934",
                  change: "+11.02%",
                  changeColor: "text-emerald-400",
                },
                {
                  pair: "YALA-USD",
                  price: "$0.1818",
                  change: "+6.71%",
                  changeColor: "text-emerald-400",
                },
              ].map((token, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 flex justify-between items-center ${
                    i !== 2 ? "border-b border-white/10" : ""
                  }`}
                >
                  <div>
                    <div className="font-medium">{token.pair}</div>
                    <div className="text-sm text-indigo-100/80">Perpetual</div>
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
                <button className="w-full py-3 bg-gradient-to-tr from-purple-600/30 via-fuchsia-400/30 to-indigo-500/30 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-white/10 transition">
                  Supply
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
                <h3 className="text-xl font-semibold mb-6">Investment Partners</h3>
                <p className="text-indigo-100/80 mb-6">
                  ELFI Protocol is backed by crypto's leading investment partners IDGCapital, KuCoin Ventures.
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
      <footer className="relative z-20 pt-16 pb-10 border-t border-white/10 bg-gradient-to-b from-[#11061c]/80 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-300 bg-clip-text text-transparent mb-4">
                Digital Vault
              </div>
              <p className="text-sm text-white/60">
                Advanced crypto trading platform for professionals.
              </p>
            </div>

            {["Product", "Company", "Resources", "Social"].map((title, i) => (
              <div key={i}>
                <h4 className="font-medium mb-4">{title}</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  {[1, 2, 3].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-fuchsia-300 transition">
                        {title} Link {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/40">
              © {new Date().getFullYear()} Digital Vault. All rights reserved.
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Twitter", "Telegram", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/60 hover:text-fuchsia-300 transition"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}