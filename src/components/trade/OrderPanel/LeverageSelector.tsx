"use client";

interface LeverageSelectorProps {
  leverage: number;
  setLeverage: (value: number) => void;
  positionType: "long" | "short"; // Добавляем пропс для типа позиции
}

export default function LeverageSelector({ 
  leverage, 
  setLeverage,
  positionType 
}: LeverageSelectorProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="text-indigo-100/80">Cross</div>
      <div className="flex gap-2">
        {[5, 10, 20, 50].map((lev) => (
          <button
            key={lev}
            onClick={() => setLeverage(lev)}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              leverage === lev
                ? positionType === "long"
                  ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20"
                  : "bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20"
                : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
            }`}
          >
            {lev}X
          </button>
        ))}
      </div>
      <button className="text-indigo-100/80 hover:text-white">

      </button>
    </div>
  );
}