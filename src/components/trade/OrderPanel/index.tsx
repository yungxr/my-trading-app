"use client";

import { useState } from "react";
import PositionTypeSelector from "./PositionTypeSelector";
import LeverageSelector from "./LeverageSelector";

interface OrderPanelProps {
  pair: string;
  walletConnected: boolean;
  onConnect: () => void;
  currentPrice: number;
  isLoading?: boolean;
}

export default function OrderPanel({
  pair,
  walletConnected,
  onConnect,
  currentPrice,
  isLoading,
}: OrderPanelProps) {
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletConnected) {
      setShowWalletModal(true);
      return;
    }
    console.log(
      `${positionType.toUpperCase()} ${amount} ${pair} with ${leverage}x leverage`
    );
  };

  const closeModal = () => {
    setShowWalletModal(false);
    setSelectedTask("");
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`
            bg-black p-6 rounded-xl max-w-md w-full mx-4
            ${
              positionType === "long"
                ? "border border-transparent bg-gradient-to-b from-black to-black via-purple-900/10"
                : "border border-transparent bg-gradient-to-b from-black to-black via-rose-900/10"
            }
            relative
            before:absolute before:inset-0 before:rounded-xl before:p-px 
            ${
              positionType === "long"
                ? "before:bg-gradient-to-br before:from-purple-600 before:via-fuchsia-400 before:to-indigo-500"
                : "before:bg-gradient-to-br before:from-rose-500 before:to-pink-500"
            }
            before:-z-10
          `}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-white text-center">
                Connect Your Wallet
              </h3>
              <p className="text-indigo-100/70 text-center">
                To {positionType.toLowerCase()} {pair.split("-")[0]}, please
                connect your wallet
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={onConnect}
                  className={`
                    w-full py-3 rounded-lg font-bold text-white
                    transition-all hover:opacity-90 cursor-pointer
                    ${
                      positionType === "long"
                        ? "bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500"
                        : "bg-gradient-to-tr from-rose-500 to-pink-500"
                    }
                  `}
                >
                  Connect Wallet
                </button>

                <button
                  onClick={() => setShowWalletModal(false)}
                  className="w-full py-3 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PositionTypeSelector
        positionType={positionType}
        setPositionType={setPositionType}
      />

      <LeverageSelector
        leverage={leverage}
        setLeverage={setLeverage}
        positionType={positionType}
      />

      <div className="mb-4">
        <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
          <span>Price</span>
          <span>
            {isLoading ? (
              <span className="animate-pulse bg-white/10 rounded w-16 h-4 inline-block"></span>
            ) : (
              currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            )}
          </span>
        </div>

        <div className="flex justify-between text-indigo-100/80 text-sm mb-2">
          <span>Use</span>
          <span>0.0 ETH</span>
        </div>
        <input
          type="number"
          placeholder="0.0"
          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-between text-indigo-100/80 text-sm mb-4">
          <span>
            {positionType === "long" ? "Long" : "Short"} {pair.split("-")[0]}
          </span>
          <span>0.0 {pair.split("-")[0]}</span>
        </div>
        <div className="flex justify-between gap-2 mb-4">
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              className="flex-1 py-2 bg-white/10 text-indigo-100/80 rounded-lg hover:bg-white/20 transition-all border border-white/10 cursor-pointer"
              onClick={() => setAmount(((percent / 100) * 1000).toFixed(2))}
            >
              {percent}%
            </button>
          ))}
        </div>
        {/* Баннер для новых пользователей */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-3 rounded-lg border border-fuchsia-400/30 mb-6">
          <div className="text-sm font-medium text-white">
            New User Exclusive: 1,000 USDC Bonus Awaits!
            <button
              onClick={closeModal}
              className="text-indigo-100/80 hover:text-white text-2xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      <div className="text-indigo-100/80 text-sm mb-4">Open size = 0.0 USD</div>

      <button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-xl font-bold text-white mb-6 transition-all hover:opacity-90 shadow-lg cursor-pointer ${
          positionType === "long"
            ? "bg-gradient-to-tr from-purple-600 via-fuchsia-400 to-indigo-500"
            : "bg-gradient-to-tr from-rose-500 to-pink-500 shadow-rose-500/20"
        }  hover:border-fuchsia-300/50`}
      >
        {positionType === "long" ? "Long" : "Short"} {pair.split("-")[0]}
      </button>

      <div className="mt-auto">
        <div className="text-indigo-100/80 text-sm mb-2">Market Details</div>
        <div className="flex justify-between text-indigo-100/80 text-sm py-2 border-b border-white/10">
          <span>Long Margin Token</span>
          <span>ETH</span>
        </div>
        <div className="flex justify-between text-indigo-100/80 text-sm py-2">
          <span>Long OI Cap</span>
          <span>100,000.00 USD</span>
        </div>
      </div>
    </div>
  );
}
