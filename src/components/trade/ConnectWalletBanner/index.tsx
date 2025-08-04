"use client";

interface ConnectWalletBannerProps {
  onConnect: () => void;
}

export default function ConnectWalletBanner({
  onConnect,
}: ConnectWalletBannerProps) {
  return (
    <div className="p-4 bg-white/5 border-t border-transparent text-center backdrop-blur-sm relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>

      <div
        onClick={onConnect}
        className="group px-6 py-2 font-semibold cursor-pointer"
      >
        <span
          className="
    bg-[length:200%_200%]
    bg-gradient-to-r from-purple-600 via-fuchsia-400 to-indigo-500
    group-hover:bg-[position:100%_100%]
    bg-clip-text text-transparent
    transition-[background-position] duration-1000 ease-in-out
  "
        >
          Connect wallet
        </span>{" "}
        to trade
      </div>
    </div>
  );
}