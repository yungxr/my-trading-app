"use client";

interface PositionTypeSelectorProps {
  positionType: "long" | "short";
  setPositionType: (type: "long" | "short") => void;
}

export default function PositionTypeSelector({ 
  positionType, 
  setPositionType 
}: PositionTypeSelectorProps) {
  return (
    <div className="flex mb-6 rounded-xl overflow-hidden">
      <button
        onClick={() => setPositionType("long")}
        className={`flex-1 py-3 font-bold transition-all ${
          positionType === "long"
            ? "bg-gradient-to-b from-purple-600 to-indigo-500 text-white shadow-lg shadow-emerald-500/20"
            : "bg-white/10 text-indigo-100/80 hover:bg-white/20 border-r border-white/10"
        }`}
      >
        Long
      </button>
      <button
        onClick={() => setPositionType("short")}
        className={`flex-1 py-3 font-bold transition-all ${
          positionType === "short"
            ? "bg-gradient-to-b from-rose-500/90 to-rose-600/90 text-white shadow-lg shadow-rose-500/20"
            : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
        }`}
      >
        Short
      </button>
    </div>
  );
}