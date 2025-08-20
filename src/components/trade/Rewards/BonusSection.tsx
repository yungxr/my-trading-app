"use client";

import Image from "next/image";
import { FiUser } from "react-icons/fi";
import { useState } from "react";

interface BonusTask {
  id: number;
  title: string;
  description: string;
  buttons: string[];
  ticketImageSrc: string;
}

const bonusTasks: BonusTask[] = [
  {
    id: 1,
    title: "Deposit Task",
    description: "Deposit 100 USD within the period",
    buttons: ["Deposit"],
    ticketImageSrc: "/assets/Group 2.png",
  },
  {
    id: 2,
    title: "First Trading",
    description: "Complete the first trading ≥ 300 USD to receive 20 USDT",
    buttons: ["Trade"],
    ticketImageSrc: "/assets/Group 3.png",
  },
  {
    id: 3,
    title: "Cumulative Net Deposit & Trading Mission",
    description: "Deposit 3,000 equivalent assets and trade 30,000,000 USD.",
    buttons: ["Trade", "Deposit"],
    ticketImageSrc: "/assets/Group 3.png",
  },
];

export default function BonusSection(): JSX.Element {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [actionType, setActionType] = useState<"Deposit" | "Trade" | null>(
    null
  );

  const handleButtonClick = (buttonType: "Deposit" | "Trade") => {
    setActionType(buttonType);
    setShowWalletModal(true);
  };

  return (
    <section className="rounded-2xl p-16 relative text-white max-w-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400 mb-1">New User Exclusive</p>
          <h1 className="text-4xl font-extrabold leading-tight mb-2">
            1,000 USD Bonus Awaits!
          </h1>
          <div className="flex items-center text-gray-400 text-sm">
            <FiUser className="mr-2" size={16} />
            <span>
              Total Participants:{" "}
              <span className="font-semibold text-white">85,379</span>
            </span>
          </div>
        </div>
        <div className="relative top-1.5 right-4 w-48 h-40">
          <Image
            src="/assets/Group 1.png"
            alt="Bonus Illustration"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      <div className="space-y-6">
        {bonusTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center p-6 relative bg-gradient-to-br from-purple-500/30 via-fuchsia-500/30 to-indigo-500/30 p-4 rounded-xl shadow-md"
          >
            <div className="absolute top-0 left-0 bg-purple-600 rounded-tl-xl rounded-br-xl px-3 py-1 text-xs font-semibold select-none z-10">
              Limited task
            </div>

            <div className="flex-shrink-0 relative w-40 h-24 mr-8">
              <Image
                src={task.ticketImageSrc}
                alt={`Bonus ticket for ${task.title}`}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <div className="flex flex-col flex-grow">
              <h3 className="text-white font-semibold text-lg mb-1">
                {task.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{task.description}</p>
            </div>

            <div className="ml-auto flex space-x-4">
              {task.buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleButtonClick(btn as "Deposit" | "Trade")}
                  className="bg-gradient-to-tl flex from-purple-600 via-fuchsia-400 to-indigo-500 px-6 py-3 rounded-xl font-bold shadow-lg transition-all cursor-pointer justify-center hover:opacity-90 shadow-purple-500/20"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* модалка */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-6 rounded-2xl max-w-md w-full border border-purple-500 relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 -z-10"></div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Connect Wallet
              </h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-purple-100/80 hover:text-white text-2xl leading-none cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <p className="text-purple-100/80 mb-6">
              To {actionType?.toLowerCase()}, you need to connect your wallet
              first.
            </p>

            <div className="space-y-3 mb-6 flex flex-col">
              <button
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-bold text-white hover:opacity-90 transition-all cursor-pointer"
                disabled
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

            <div className="text-center text-xs text-purple-100/60">
              By connecting, you agree to our{" "}
              <a href="#" className="text-purple-300 hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}