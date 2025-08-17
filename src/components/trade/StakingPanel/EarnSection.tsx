import React from 'react';

interface EarnSectionProps {
  totalSupply: string;
  pools: number;
  highestAPR: string;
  recommended: Array<{
    name: string;
    supply: string;
    apr: string;
    earnings: string;
    days: string;
  }>;
}

const EarnSection: React.FC<EarnSectionProps> = ({ totalSupply, pools, highestAPR, recommended }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-fuchsia-400/30 inset-0 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
        Earn high reward in DigitalVault
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 p-4 rounded-lg shadow-md">
          <div>Total Supply</div>
          <div className="text-2xl font-bold">{totalSupply}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 p-4 rounded-lg shadow-md">
          <div>Pools</div>
          <div className="text-2xl font-bold">{pools}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 p-4 rounded-lg shadow-md">
          <div>Highest APR</div>
          <div className="text-2xl font-bold">{highestAPR}</div>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">Recommended for you</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommended.map((item, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 p-4 rounded-xl shadow-md">
            <div className="text-lg font-bold">{item.name}</div>
            <div className="text-indigo-100/80 text-sm">Supply: {item.supply}</div>
            <div className="font-medium">{item.apr} APR</div>
            <div className="text-indigo-100/80 text-sm">Est. Earnings: {item.earnings}</div>
            <div>{item.days}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarnSection;
