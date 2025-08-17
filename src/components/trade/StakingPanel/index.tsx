import React, { useState } from "react";
import StakingPoolCard from "./StakingPools";
import EarnSection from "./EarnSection";

interface StakingPanelProps {
  walletConnected: boolean;
  onConnect: () => void;
}

export default function StakingPanel({
  walletConnected,
  onConnect,
}: StakingPanelProps) {
  const [stakingValue, setStakingValue] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [unclaimed, setUnclaimed] = useState(0);

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

  const handleStake = () => {
    if (!walletConnected) {
      onConnect();
      return;
    }
    console.log("Staking initiated");
  };

  const totalSupply = "$3,635,926";
  const pools = 2;
  const highestAPR = "21.12%";
  const recommended = [
    {
      name: "ETH",
      supply: "Supply ETH,WETH",
      apr: "21.12%",
      earnings: "+$52.08",
      days: "180 days",
    },
    {
      name: "USD",
      supply: "Supply USDC",
      apr: "7.57%",
      earnings: "+$10.00",
      days: "90 days",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <EarnSection
        totalSupply={totalSupply}
        pools={pools}
        highestAPR={highestAPR}
        recommended={recommended}
      />
      <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-fuchsia-400/30 inset-0 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
          My staking (0)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: "Total Staking Value", value: stakingValue },
            { label: "Total Rewards", value: totalRewards },
            { label: "Unclaimed", value: unclaimed },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 p-4 rounded-xl backdrop-blur-sm relative overflow-hidden"
            >
              <div className="text-indigo-100/80 text-sm mb-1">
                {stat.label}
              </div>
              <div className="text-2xl font-bold">
                ${stat.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        {!walletConnected ? (
          <button className="bg-gradient-to-tr flex  from-purple-600 via-fuchsia-400 to-indigo-500 px-6 py-3 rounded-xl font-bold shadow-lg transition-all cursor-pointer justify-center hover:opacity-90 shadow-purple-500/20">
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
      <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-fuchsia-400/30 inset-0 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90">
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
            <StakingPoolCard
              key={index}
              pool={pool}
              walletConnected={walletConnected}
              onStake={handleStake}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
