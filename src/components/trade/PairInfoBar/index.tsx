"use client";

interface PairInfoProps {
  pair: string;
  currentPrice: number;
  priceChange: number;
}

export default function PairInfo({ pair, currentPrice, priceChange }: PairInfoProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-transparent bg-white/5 backdrop-blur-sm relative">
      {/* Градиентный бордер снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>
      
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
          {pair.replace("-", "/")}
        </div>
        <div className="text-xl font-bold">
          {currentPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
          Up to 100X
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <div className="text-indigo-100/80">
          <span className="text-emerald-400">Long</span> /{" "}
          <span className="text-rose-400">Short</span> (Envelope note)
          <br />
          0.000000X / 0.004000X
        </div>
        <div className="text-indigo-100/80">
          <span className="text-emerald-400">Long</span> /{" "}
          <span className="text-rose-400">Short</span> (QI)
          <br />
          54.30M / 53.84M
        </div>
        <div className="text-indigo-100/80">
          24H High / Low
          <br />
          $18,753.64 / $133,110.94
        </div>
      </div>
    </div>
  );
}