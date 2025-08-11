"use client";

export default function ConnectWalletBanner() {
  return (
    <div className="p-4 bg-white/5 border-t border-transparent text-center backdrop-blur-sm relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>

      <div className="px-6 py-2 font-semibold">
        <span className="inline-block cursor-pointer">
          <span className="
            bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500
            bg-[length:200%_200%] bg-[position:0%_0%]
            hover:bg-[position:100%_100%]
            transition-[background-position] duration-1000 ease-in-out
          ">
            Connect wallet
          </span>
        </span> to trade
      </div>
    </div>
  );
}