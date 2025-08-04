"use client";

interface LeverageSelectorProps {
  leverage: number;
  setLeverage: (value: number) => void;
}

export default function LeverageSelector({ leverage, setLeverage }: LeverageSelectorProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-indigo-100/80">Cross</div>
      <div className="flex gap-2">
        {[5, 10, 20, 50].map((lev) => (
          <button
            key={lev}
            onClick={() => setLeverage(lev)}
            className={`px-3 py-1 rounded-lg transition-all ${
              leverage === lev
                ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20"
                : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
            }`}
          >
            {lev}X
          </button>
        ))}
      </div>
      <button className="text-indigo-100/80 hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}