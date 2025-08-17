"use client";

import { useState } from "react";

export default function AirdropSection() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const tasks = [
    { id: 1, task: "Follow us on Twitter", reward: "$50", completed: false },
    { id: 2, task: "Join Telegram", reward: "$50", completed: false },
    { id: 3, task: "Trade $1000 volume", reward: "$100", completed: false },
    { id: 4, task: "Invite 3 friends", reward: "$150", completed: false },
  ];

  const handleCompleteClick = (task: string) => {
    setSelectedTask(task);
    setShowWalletModal(true);
  };

  const closeModal = () => {
    setShowWalletModal(false);
    setSelectedTask("");
  };

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      <div className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90 -z-10"></div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent mb-4">
          Airdrop Campaign
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/5 p-4 rounded-xl">
            <div className="text-yellow-400/80 text-sm mb-1">Total Rewards</div>
            <div className="text-2xl font-bold">$50,000</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <div className="text-yellow-400/80 text-sm mb-1">
              Your Allocation
            </div>
            <div className="text-2xl font-bold">$0.00</div>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <div className="text-yellow-400/80 text-sm mb-1">
              Days Remaining
            </div>
            <div className="text-2xl font-bold">14</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-yellow-400/80 text-sm mb-2">
            <span>Progress</span>
            <span>0%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl font-bold hover:opacity-90 transition-all cursor-pointer">
          Connect Wallet to Participate
        </button>
      </div>

      <div className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90 -z-10"></div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent mb-4">
          Tasks to Complete
        </h2>

        <div className="space-y-4">
          {tasks.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
            >
              <div>
                <h3 className="font-medium">{item.task}</h3>
                <p className="text-yellow-400/80 text-sm">
                  Reward: {item.reward}
                </p>
              </div>
              <button
                className="px-4 py-2 bg-white/10 text-yellow-400 rounded-lg hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => handleCompleteClick(item.task)}
              >
                {item.completed ? "Claim" : "Complete"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#191633] to-[#2b174a] p-6 rounded-2xl max-w-md w-full border border-purple-800 relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 -z-10"></div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Connect Wallet
              </h3>
              <button
                onClick={closeModal}
                className="text-indigo-100/80 hover:text-white text-2xl leading-none cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <p className="text-indigo-100/80 mb-6">
              Connect your wallet to complete the task: <br />
              <span className="text-yellow-300 font-medium">
                {selectedTask}
              </span>
            </p>

            <div className="space-y-3 mb-6 flex flex-col">
              <button className="w-full py-3 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
                <span>Connect Wallet</span>
              </button>
              <button
                onClick={() => setShowWalletModal(false)}
                className="w-full py-3 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="text-center text-xs text-indigo-100/60">
              By connecting, you agree to our{" "}
              <a href="#" className="text-yellow-400 hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
