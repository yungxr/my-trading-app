"use client";

interface PairInfoProps {
  pair: string;
  currentPrice: number;
  priceChange: number;
  isLoading?: boolean;
}

export default function PairInfo({
  pair,
  currentPrice,
  priceChange,
  isLoading,
}: PairInfoProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-transparent bg-white/5 backdrop-blur-sm relative">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>

      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
          {pair.replace("-", "/")}
        </div>
        <div className="text-xl font-bold">
          {isLoading ? (
            <div className="animate-pulse bg-white/10 rounded w-24 h-6"></div>
          ) : (
            currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          )}
        </div>
        <div
          className={`text-xs px-2 py-0.5 rounded-full ${
            isLoading
              ? "bg-white/10"
              : priceChange >= 0
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-rose-500/20 text-rose-400"
          }`}
        >
          {isLoading
            ? "..."
            : priceChange >= 0
            ? `+${priceChange.toFixed(2)}%`
            : `${priceChange.toFixed(2)}%`}
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <div className="text-indigo-100/80">
          <span className="text-indigo-500">Long</span> /{" "}
          <span className="text-pink-500">Short</span> (Envelope note)
          <br />
          0.000000X / 0.004000X
        </div>
        <div className="text-indigo-100/80">
          <span className="text-indigo-500">Long</span> /{" "}
          <span className="text-pink-500">Short</span> (QI)
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