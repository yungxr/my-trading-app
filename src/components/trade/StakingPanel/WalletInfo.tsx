"use client";

interface WalletInfoProps {
  walletConnected: boolean;
}

export default function WalletInfo({ walletConnected }: WalletInfoProps) {
  const formatAddress = () => {
    return walletConnected ? "0x742d...3a1b" : "0x000...0000";
  };

  const getNetworkName = () => {
    return walletConnected ? "Ethereum Mainnet" : "Not connected";
  };

  return (
    <div className="bg-white/5 p-4 rounded-xl border border-transparent backdrop-blur-sm relative overflow-hidden mb-6">
      <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 -z-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90"></div>
      </div>
      
      <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
        Wallet Info
      </h3>
      <div className="space-y-3">
        <div>
          <div className="text-indigo-100/80 text-xs">Address</div>
          <div className="text-sm font-mono break-all">
            {formatAddress()}
          </div>
        </div>
        <div>
          <div className="text-indigo-100/80 text-xs">Network</div>
          <div className="text-sm">{getNetworkName()}</div>
        </div>
        <div>
          <div className="text-indigo-100/80 text-xs">Balance</div>
          <div className="text-sm">0.0 ETH</div>
        </div>
      </div>
    </div>
  );
}