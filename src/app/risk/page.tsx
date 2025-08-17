"use client";

import { motion } from "framer-motion";
import {
  AlertTriangleIcon,
  ZapIcon,
  TrendingDownIcon,
  ShieldOffIcon,
} from "lucide-react";

export default function RiskPage() {
  const risks = [
    {
      icon: <ZapIcon className="text-red-400" />,
      title: "Market Volatility",
      content:
        "Crypto markets are highly volatile. Prices can fluctuate dramatically within short periods, potentially resulting in significant losses.",
    },
    {
      icon: <TrendingDownIcon className="text-amber-400" />,
      title: "Liquidation Risk",
      content:
        "Using leverage may lead to forced liquidation if the market moves against your position, resulting in loss of collateral.",
    },
    {
      icon: <ShieldOffIcon className="text-rose-400" />,
      title: "Security Risks",
      content:
        "While we implement robust security measures, no system is completely immune to hacking, phishing, or other cyber threats.",
    },
    {
      icon: <AlertTriangleIcon className="text-yellow-400" />,
      title: "Regulatory Uncertainty",
      content:
        "Changing regulations may affect the legality, taxation, or availability of certain crypto services in your jurisdiction.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Градиентный фон */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c0a1a] via-[#2d0b2b] to-[#3d0f3a] opacity-95" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern-dark.svg')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#ec4899]/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <AlertTriangleIcon className="text-rose-400" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-300">
              Risk Disclosure
            </h1>
          </div>
          <p className="text-lg text-rose-100/80">
            Understand the risks before trading digital assets
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg shadow-rose-500/10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 p-6 bg-rose-900/20 border border-rose-500/30 rounded-xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-rose-300">
              Important Notice
            </h2>
            <p className="text-white/90 mb-4">
              Digital Vault provides a trading platform only. We do not provide
              investment advice. Cryptocurrency trading involves substantial
              risk of loss.
            </p>
            <p className="text-white/90">
              Only trade with funds you can afford to lose completely.
            </p>
          </motion.div>

          <div className="space-y-8">
            {risks.map((risk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-5 p-6 bg-white/5 rounded-xl border border-white/5 hover:border-rose-400/20 transition-colors"
              >
                <div className="p-3 bg-white/10 rounded-lg mt-1">
                  {risk.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {risk.title}
                  </h3>
                  <p className="text-white/80">{risk.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-black/30 border border-white/10 rounded-xl"
          >
            <h3 className="font-medium text-white mb-3">Acknowledgement</h3>
            <p className="text-white/80">
              By using Digital Vault, you acknowledge that you have read,
              understood, and accept these risks. You alone assume
              responsibility for all trading decisions.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}