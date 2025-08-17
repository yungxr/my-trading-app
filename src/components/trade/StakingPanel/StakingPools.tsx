"use client";

interface StakingPoolCardProps {
  pool: {
    name: string;
    description: string;
    apr: string;
    supply: string;
    earnings?: string;
    days: string;
  };
  walletConnected: boolean;
  onStake: () => void;
}

export default function StakingPoolCard({
  pool,
  walletConnected,
  onStake,
}: StakingPoolCardProps) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-transparent backdrop-blur-sm relative overflow-hidden">
      {/* Градиентный бордер */}
      <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10"></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{pool.name}</h3>
          <p className="text-indigo-100/80 text-sm">{pool.description}</p>
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
            {pool.earnings || "N/A"}
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
        onClick={onStake}
      >
        {walletConnected ? "Stake Now" : "Connect Wallet"}
      </button>
    </div>
  );
}
