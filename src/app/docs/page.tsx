"use client";

import { motion } from "framer-motion";
import {
  BookOpenIcon,
  CodeIcon,
  LockIcon,
  TrendingUpIcon,
  ZapIcon,
  GlobeIcon,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] opacity-95" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern-dark.svg')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b82f6]/20 via-transparent to-transparent" />
      </div>

      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-sky-300">
            Documentation
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Everything you need to know about Digital Vault platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpenIcon className="text-blue-300" size={24} />,
              title: "Getting Started",
              desc: "Begin your journey with Digital Vault",
              color: "from-blue-500/10 to-blue-600/10",
              link: "/docs/getting-started",
            },
            {
              icon: <TrendingUpIcon className="text-purple-300" size={24} />,
              title: "Trading Guide",
              desc: "Master advanced trading strategies",
              color: "from-purple-500/10 to-fuchsia-600/10",
              link: "/docs/trading",
            },
            {
              icon: <ZapIcon className="text-yellow-300" size={24} />,
              title: "Staking & Yield",
              desc: "Maximize your earnings",
              color: "from-amber-500/10 to-yellow-600/10",
              link: "/docs/staking",
            },
            {
              icon: <LockIcon className="text-emerald-300" size={24} />,
              title: "Security",
              desc: "Keep your assets safe",
              color: "from-emerald-500/10 to-teal-600/10",
              link: "/docs/security",
            },
            {
              icon: <GlobeIcon className="text-rose-300" size={24} />,
              title: "API Reference",
              desc: "Integrate with our platform",
              color: "from-rose-500/10 to-pink-600/10",
              link: "/docs/api",
            },
            {
              icon: <CodeIcon className="text-indigo-300" size={24} />,
              title: "Developer Docs",
              desc: "Build on Digital Vault",
              color: "from-indigo-500/10 to-violet-600/10",
              link: "/docs/developers",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/10 rounded-xl">{item.icon}</div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
              <p className="text-white/70 mb-6">{item.desc}</p>
              <a
                href={item.link}
                className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1"
              >
                Learn more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-900/30 to-sky-900/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-lg shadow-blue-500/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <CodeIcon className="text-blue-300" size={24} />
            <h2 className="text-2xl font-semibold">API Example</h2>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
            <pre className="text-sm font-mono text-blue-100">
              <code>
                {`// Fetch latest BTC price
const response = await fetch('https://api.digitalvault.com/v1/markets/BTC-USD', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

// Response format
{
  "symbol": "BTC-USD",
  "price": "51234.56",
  "change_24h": "+2.34%",
  "volume": "1.25B"
}`}
              </code>
            </pre>
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-all cursor-pointer">
              <CodeIcon size={16} />
              API Documentation
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-all cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download SDK
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}