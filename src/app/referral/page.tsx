"use client";

import { motion } from "framer-motion";
import {
  CopyIcon,
  Share2Icon,
  UsersIcon,
  GiftIcon,
  DollarSignIcon,
} from "lucide-react";

export default function ReferralPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#2d0b5e] to-[#4a1b8a] opacity-90" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#a855f7]/30 via-transparent to-transparent" />
      </div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-10 w-60 h-60 bg-fuchsia-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-300">
            Referral Program
          </h1>
          <p className="text-xl text-purple-100/80 max-w-2xl mx-auto">
            Invite friends and earn{" "}
            <span className="text-fuchsia-300 font-semibold">
              20% commission
            </span>{" "}
            from their trading fees
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-fuchsia-500/10 rounded-lg">
                  <UsersIcon className="text-fuchsia-400" size={24} />
                </div>
                <h2 className="text-2xl font-semibold">Your Referral Stats</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  icon={<UsersIcon className="text-purple-300" size={18} />}
                  title="Total Referrals"
                  value="24"
                  change="+3 this week"
                />
                <StatCard
                  icon={<DollarSignIcon className="text-green-300" size={18} />}
                  title="Total Earnings"
                  value="$1,245.50"
                  change="+$142.20"
                />
                <StatCard
                  icon={<GiftIcon className="text-yellow-300" size={18} />}
                  title="Pending Rewards"
                  value="$342.20"
                  change="Will be paid in 3d"
                />
                <StatCard
                  icon={<Share2Icon className="text-blue-300" size={18} />}
                  title="Referral Rate"
                  value="38%"
                  change="Conversion rate"
                />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10">
              <h3 className="text-lg font-medium mb-4">Recent Referrals</h3>
              <div className="space-y-3">
                {["0x7f3...42d1", "0x1a9...7b3f", "0xe42...9c2a"].map(
                  (address, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                    >
                      <span className="font-mono text-sm">{address}</span>
                      <span className="text-green-400 text-sm">+$28.50</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg shadow-fuchsia-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Share2Icon className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-semibold">Your Referral Link</h2>
              </div>

              <div className="relative mb-6">
                <div className="bg-black/30 border border-white/10 rounded-xl p-4 pr-12 font-mono text-sm overflow-x-auto">
                  https://digitalvault.com?ref=432573
                </div>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all cursor-pointer">
                  <CopyIcon className="text-white" size={18} />
                </button>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 cursor-pointer">
                <Share2Icon size={18} />
                Share Link
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg shadow-purple-500/10">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <GiftIcon className="text-yellow-300" size={20} />
                How It Works
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Share Your Link",
                    desc: "Send your unique referral link to friends",
                  },
                  {
                    step: "2",
                    title: "They Sign Up",
                    desc: "Your friends register using your link",
                  },
                  {
                    step: "3",
                    title: "You Earn Rewards",
                    desc: "Get 20% of their trading fees forever",
                  },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-fuchsia-500/20 text-fuchsia-300 flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  change,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-white/80">{title}</span>
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-green-400 mt-1">{change}</div>
    </div>
  );
}