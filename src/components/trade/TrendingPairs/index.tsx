"use client";

interface TrendingPairsProps {
  pairs: {
    symbol: string;
    price: number;
    change: number;
  }[];
  onPairClick: (symbol: string) => void;
}

export default function TrendingPairs({ pairs, onPairClick }: TrendingPairsProps) {
  return (
    <div>
      {pairs.map((pair) => (
        <div
          key={pair.symbol}
          className="flex justify-between items-center py-2 px-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all mb-1 border border-transparent hover:border-white/10"
          onClick={() => onPairClick(pair.symbol)}
        >
          <div>
            <div className="text-white text-sm">
              {pair.symbol.replace("-USDT", "")}
            </div>
            <div className="text-indigo-100/60 text-xs">
              ${pair.price.toFixed(5)}
            </div>
          </div>
          <div
            className={`text-xs font-medium ${
              pair.change >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {pair.change >= 0 ? "+" : ""}
            {pair.change.toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
}