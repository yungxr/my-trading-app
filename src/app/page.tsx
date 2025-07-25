"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaTelegramPlane, FaTwitter, FaDiscord } from "react-icons/fa";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";

const initialTokens = [
  { symbol: "BTC-USD", price: 0, change: 0 },
  { symbol: "ETH-USD", price: 0, change: 0 },
  { symbol: "SOL-USD", price: 0, change: 0 },
];

const CRYPTO_IDS = ["bitcoin", "ethereum", "solana"];

function getRandomChange() {
  return (Math.random() * 2 - 1) / 100;
}

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false, zIndex: -1 },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#3a86ff", "#8338ec", "#ff006e", "#fb5607", "#ffbe0b"],
          },
          links: {
            color: "#3a86ff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

const AnimatedNumber = ({
  value,
  fraction = 2,
}: {
  value: number;
  fraction?: number;
}) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let frameId: number;
    let start: number | null = null;
    const duration = 450;
    const from = display;
    const to = value;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ratio = Math.min(progress / duration, 1);
      const current = from + (to - from) * ratio;
      setDisplay(current);
      if (progress < duration) {
        frameId = requestAnimationFrame(step);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <>
      {display.toLocaleString(undefined, {
        minimumFractionDigits: fraction,
        maximumFractionDigits: fraction,
      })}
    </>
  );
};

export default function Home() {
  const [tokens, setTokens] = useState(initialTokens);
  const [tvl, setTvl] = useState(1_285_000);
  const [users, setUsers] = useState(1845);
  const [volume, setVolume] = useState(604_910);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS.join(
          ","
        )}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await response.json();

      setTokens([
        {
          symbol: "BTC-USD",
          price: data.bitcoin.usd ?? 0,
          change: data.bitcoin.usd_24h_change ?? 0,
        },
        {
          symbol: "ETH-USD",
          price: data.ethereum.usd ?? 0,
          change: data.ethereum.usd_24h_change ?? 0,
        },
        {
          symbol: "SOL-USD",
          price: data.solana.usd ?? 0,
          change: data.solana.usd_24h_change ?? 0,
        },
      ]);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const intervalId = setInterval(fetchPrices, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTvl((t) => t + Math.floor(Math.random() * 800 - 400));
      setUsers((u) => u + Math.floor(Math.random() * 4 - 2));
      setVolume((v) => v + Math.floor(Math.random() * 8000 - 4000));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#10192b] to-[#18192d] font-sans flex flex-col relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="w-full bg-black/80 backdrop-blur border-b border-[#151A27] py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
            <span className="text-2xl font-black text-white tracking-widest select-none">
              DigitalVault
            </span>
            <nav className="flex gap-6 items-center text-lg">
              <a
                href="#"
                className="text-[#B0B4C4] hover:text-blue-400 transition"
              >
                Home
              </a>
              <a
                href="#"
                className="text-[#B0B4C4] hover:text-blue-400 transition"
              >
                Trade
              </a>
              <a
                href="#"
                className="text-[#B0B4C4] hover:text-blue-400 transition"
              >
                Earn
              </a>
              <a
                href="#"
                className="text-[#B0B4C4] hover:text-blue-400 transition"
              >
                Docs
              </a>
              <motion.a
                whileTap={{ scale: 0.96 }}
                href="#"
                className="ml-6 bg-gradient-to-r from-[#0853fc] to-[#122780] px-6 py-2 rounded-lg shadow-lg font-semibold text-white hover:from-[#1c419e] hover:to-[#1785e6] transition"
              >
                Launch App
              </motion.a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row mt-16 md:mt-20 px-6 gap-14 md:gap-20 items-center">
          <div className="flex-1 min-w-[300px]">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-7"
            >
              The{" "}
              <span className="bg-gradient-to-tr from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Decentralized Derivatives Exchange
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.13 }}
              className="text-xl text-[#B0B4C4] mb-10 max-w-xl"
            >
              Trade with cross margin, high leverage and deep liquidity.
              Security-first, DeFi protocol with the speed and flexibility you
              expect.
            </motion.p>
            <div className="flex flex-wrap items-center gap-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#0853fc] to-[#122780] px-8 py-3 rounded-lg text-lg font-bold shadow-lg text-white hover:from-[#183094] hover:to-[#0c4e87] transition"
                onClick={() => alert("Launch App")}
              >
                Launch App
              </motion.button>
              <button
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-bold shadow hover:bg-[#091d43] transition"
                onClick={() => alert("Docs")}
              >
                Docs
              </button>
            </div>
            <div className="flex gap-8 items-center mt-10">
              <a
                href="#"
                className="text-[#b0b4c4] hover:text-blue-500 transition text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-[#b0b4c4] hover:text-blue-400 transition text-2xl"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="#"
                className="text-[#b0b4c4] hover:text-[#6569e6] transition text-2xl"
              >
                <FaDiscord />
              </a>
            </div>
          </div>

          {/* Stats and Tokens */}
          <div className="flex-1 flex flex-col gap-7 w-full max-w-lg items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#0b1422] to-[#181f32] rounded-2xl py-7 px-4 flex flex-col items-center shadow border border-[#1e2745] min-w-[140px]">
                <div className="text-[#7e83a7] font-medium text-sm mb-1">TVL</div>
                <motion.div
                  animate={{ scale: [1, 1.07, 1], opacity: [1, 0.88, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="font-extrabold text-2xl text-blue-300 tabular-nums whitespace-nowrap"
                >
                  $<AnimatedNumber value={tvl} fraction={0} />
                </motion.div>
              </div>
              <div className="bg-gradient-to-br from-[#0b1422] to-[#181f32] rounded-2xl py-7 px-4 flex flex-col items-center shadow border border-[#1e2745] min-w-[140px]">
                <div className="text-[#7e83a7] font-medium text-sm mb-1">
                  Users
                </div>
                <motion.div
                  animate={{ scale: [1, 1.07, 1], opacity: [1, 0.9, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1.2 }}
                  className="font-extrabold text-2xl text-purple-200 tabular-nums whitespace-nowrap"
                >
                  <AnimatedNumber value={users} fraction={0} />
                </motion.div>
              </div>
              <div className="bg-gradient-to-br from-[#0b1422] to-[#181f32] rounded-2xl py-7 px-4 flex flex-col items-center shadow border border-[#1e2745] min-w-[140px]">
                <div className="text-[#7e83a7] font-medium text-sm mb-1">
                  Volume
                </div>
                <motion.div
                  animate={{ scale: [1, 1.07, 1], opacity: [1, 0.9, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.7 }}
                  className="font-extrabold text-2xl text-pink-200 tabular-nums whitespace-nowrap"
                >
                  $<AnimatedNumber value={volume} fraction={0} />
                </motion.div>
              </div>
            </div>

            {/* Token Cards */}
            <div className="mt-7">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {tokens.map((token) => (
                  <motion.div
                    key={token.symbol}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220 }}
                    className="min-w-[150px] h-[130px] bg-gradient-to-bl from-[#101528] to-[#23273B] border border-[#19264c] rounded-xl p-4 flex flex-col items-center justify-between shadow cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-white truncate w-full text-center">
                      {token.symbol}
                    </span>
                    <span className="font-mono text-xl text-blue-200 truncate w-full text-center">
                      <AnimatedNumber
                        value={token.price}
                        fraction={token.price > 1 ? 2 : 5}
                      />
                    </span>
                    <span
                      className={`text-base font-bold ${
                        token.change >= 0 ? "text-green-400" : "text-red-400"
                      } truncate w-full text-center`}
                    >
                      {token.change >= 0 ? "+" : ""}
                      {token.change.toFixed(2)}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- YIELD POOLS --- */}
        <section className="w-full max-w-7xl mx-auto mt-24 px-6">
          <div className="bg-gradient-to-br from-[#151A27] to-[#171b2b] border border-[#212d50] rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              Ultra Yield Pool
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* BTC Pool */}
              <div className="relative bg-gradient-to-b from-[#0f172a] to-[#1e293b] border border-[#1e3a8a] rounded-xl p-5 group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-7xl font-bold">₿</span>
                </div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="text-green-400 font-bold text-lg">
                    +500% APR
                  </span>
                  <span className="text-white font-semibold flex items-center gap-2">
                    <span className="text-yellow-500">₿</span> BTC
                  </span>
                </div>
                <p className="text-[#b0b4c4] mb-5 relative z-10">Supply WBTC</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition relative z-10">
                  Supply
                </button>
              </div>

              {/* ETH Pool */}
              <div className="relative bg-gradient-to-b from-[#0f172a] to-[#1e293b] border border-[#1e3a8a] rounded-xl p-5 group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-7xl font-bold">⟠</span>
                </div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="text-green-400 font-bold text-lg">
                    +300% APR
                  </span>
                  <span className="text-white font-semibold flex items-center gap-2">
                    <span className="text-purple-400">⟠</span> ETH
                  </span>
                </div>
                <p className="text-[#b0b4c4] mb-5 relative z-10">
                  Supply ETH/WETH
                </p>
                <button
                  className="w-full bg-blue-600/50 text-white/70 font-medium py-2 px-4 rounded-lg transition cursor-not-allowed relative z-10"
                  disabled
                >
                  Supply
                </button>
                <span className="absolute right-4 text-yellow-400 text-sm z-10">
                  In Progress
                </span>
              </div>

              {/* USD Pool */}
              <div className="relative bg-gradient-to-b from-[#0f172a] to-[#1e293b] border border-[#1e3a8a] rounded-xl p-5 group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-7xl font-bold">$</span>
                </div>
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <span className="text-green-400 font-bold text-lg">
                    +100% APR
                  </span>
                  <span className="text-white font-semibold flex items-center gap-2">
                    <span className="text-blue-300">$</span> USD
                  </span>
                </div>
                <p className="text-[#b0b4c4] mb-5 relative z-10">Supply USDC</p>
                <button
                  className="w-full bg-blue-600/50 text-white/70 font-medium py-2 px-4 rounded-lg transition cursor-not-allowed relative z-10"
                  disabled
                >
                  Supply
                </button>
                <span className="absolute right-4 text-yellow-400 text-sm z-10">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="max-w-7xl w-full mx-auto mt-24 px-6">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full bg-gradient-to-r from-[#111629] to-[#202748] border border-[#1a2445] rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center px-10 py-9 gap-8"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                Get your exclusive welcome reward!
              </div>
              <div className="text-[#adb5e3] mt-2 text-lg">
                Connect your wallet and start trading to receive up to{" "}
                <span className="font-bold text-blue-300">4,000 USDC</span> as
                bonus for early users.
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="mt-5 md:mt-0 bg-gradient-to-r from-[#0b76ed] to-[#1047a2] px-10 py-4 rounded-lg text-white text-lg font-bold shadow-lg hover:bg-gradient-to-l hover:from-[#133c8d] hover:to-[#43a3f5] transition"
              onClick={() => alert("Connect wallet")}
            >
              Connect Wallet
            </motion.button>
          </motion.div>
        </section>

        {/* Features */}
        <section className="w-full max-w-7xl mx-auto grid md:grid-cols-3 gap-7 mt-24 mb-24 px-6">
          {[
            {
              title: "Cross-Margin System",
              desc: "Use any asset as margin, maximize capital utilization and trade with leverage.",
            },
            {
              title: "Ultra-Low Liquidation Risk",
              desc: "Offset PnL, reduce margin calls, flexible position management and protection strategies.",
            },
            {
              title: "Liquidity & Security",
              desc: "Deep on-chain liquidity pools, low slippage and institutional Web3-grade security.",
            },
          ].map((f, idx) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -7, scale: 1.03 }}
              className="bg-gradient-to-br from-[#151A27] to-[#171b2b] border border-[#212d50] rounded-2xl p-9 shadow-lg"
            >
              <div className="text-lg font-bold text-blue-300 mb-3">
                {f.title}
              </div>
              <div className="text-[#b0b4c4]">{f.desc}</div>
            </motion.div>
          ))}
        </section>

        {/* Maximum Collateral Section */}
        <section className="w-full max-w-7xl mx-auto mt-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#151A27] to-[#1a2038] border border-[#212d50] rounded-2xl p-10 shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Maximum Collateral Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-b from-[#0f172a]/60 to-[#1e293b]/60 border border-[#1e3a8a]/30 rounded-xl p-6 shadow-lg hover:border-[#1e3a8a]/60 transition-all flex"
              >
                <div className="mr-6 flex-shrink-0">
                  <div className="bg-blue-500/20 p-4 rounded-lg">
                    <svg
                      className="w-8 h-8 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Maximum Collateral
                  </h3>
                  <p className="text-[#b0b4c4]">
                    We support a wide range of collateral deposits for margin
                    trading, allowing you to trade any market with any asset.
                  </p>
                </div>
              </motion.div>

              {/* Minimized Risks Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-b from-[#0f172a]/60 to-[#1e293b]/60 border border-[#1e3a8a]/30 rounded-xl p-6 shadow-lg hover:border-[#1e3a8a]/60 transition-all flex"
              >
                <div className="mr-6 flex-shrink-0">
                  <div className="bg-green-500/20 p-4 rounded-lg">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Minimized Liquidation Risks
                  </h3>
                  <p className="text-[#b0b4c4]">
                    Offset P&L and volatility risks to lower costs and reduce
                    liquidation risks, enabling more robust strategies.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ),
                  title: "High Liquidity",
                  desc: "ELFI offers high liquidity, low slippage, and fast trading. Staking assets like ETH or BTC to earn rewards.",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "High Yield",
                  desc: "Earn yield on collateral through lending and share fee revenues.",
                },
                {
                  icon: (
                    <svg
                      className="w-8 h-8 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ),
                  title: "Transparent",
                  desc: "On-chain, transparent transactions with full user control and secure authorization.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-gradient-to-b from-[#0f172a]/60 to-[#1e293b]/60 border border-[#1e3a8a]/30 rounded-xl p-6 shadow-lg hover:border-[#1e3a8a]/60 transition-all flex items-start"
                >
                  <div className="mr-4 mt-1 flex-shrink-0">
                    <div
                      className="bg-opacity-20 p-3 rounded-lg"
                      style={{
                        backgroundColor:
                          index === 0
                            ? "rgba(167, 139, 250, 0.2)"
                            : index === 1
                            ? "rgba(251, 191, 36, 0.2)"
                            : "rgba(96, 165, 250, 0.2)",
                      }}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-[#b0b4c4]">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <footer className="w-full py-8 md:py-12 text-center text-[#858ba5] text-base border-t border-[#1b2032] bg-[#03040c]">
          <span>ELFi DEX &copy; 2025 — Demo by your request</span>
        </footer>
      </div>
    </main>
  );
}