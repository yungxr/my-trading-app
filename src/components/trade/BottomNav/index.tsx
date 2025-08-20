"use client";

export default function BottomNav() {
  return (
    <div className="flex border-t border-transparent bg-white/5 backdrop-blur-sm relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>

      {["Positions", "Open Orders", "Order History", "Position History"].map(
        (item) => (
          <button
            key={item}
            className="flex-1 py-3 text-sm text-indigo-100/80 hover:text-white border-r border-white/10 last:border-r-0 transition-all hover:bg-white/5 cursor-pointer"
          >
            {item}
          </button>
        )
      )}
    </div>
  );
}