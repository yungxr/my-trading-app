"use client";

interface OrderTypeSelectorProps {
  orderType: "market" | "limit";
  setOrderType: (type: "market" | "limit") => void;
}

export default function OrderTypeSelector({
  orderType,
  setOrderType,
}: OrderTypeSelectorProps) {
  return (
    <div className="flex mb-6 rounded-xl overflow-hidden">
      <button
        onClick={() => setOrderType("market")}
        className={`flex-1 py-2 transition-all ${
          orderType === "market"
            ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20"
            : "bg-white/10 text-indigo-100/80 hover:bg-white/20 border-r border-white/10"
        }`}
      >
        Market
      </button>
      <button
        onClick={() => setOrderType("limit")}
        className={`flex-1 py-2 transition-all ${
          orderType === "limit"
            ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/20"
            : "bg-white/10 text-indigo-100/80 hover:bg-white/20"
        }`}
      >
        Limit
      </button>
    </div>
  );
}