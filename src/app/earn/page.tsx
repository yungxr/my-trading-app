"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function EarnPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [stakingValue, setStakingValue] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [unclaimed, setUnclaimed] = useState(0);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsConnected(true);
        setAccount(accounts[0]);
        // Здесь можно добавить загрузку данных стейкинга
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    checkWalletConnection();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount("");
        } else {
          setAccount(accounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  const pools = [
    {
      name: "ETH",
      description: "Supply ETH/WETH",
      apr: "11.57X",
      supply: "$500",
      earnings: "+$28.52",
      days: "180 days",
    },
    {
      name: "USD",
      description: "Supply MERC",
      apr: "11.67X",
      supply: "$11.67X",
      days: "90 days",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#10192b] to-[#18192d] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* My Staking Section */}
        <div className="bg-[#0b1422]/80 rounded-xl p-6 mb-6 border border-[#1E293B]">
          <h2 className="text-xl font-bold mb-4">My staking (0)</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
              <div className="text-[#B0B4C4] text-sm mb-1">
                Total Staking Value
              </div>
              <div className="text-2xl font-bold">
                ${stakingValue.toLocaleString()}
              </div>
            </div>
            <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
              <div className="text-[#B0B4C4] text-sm mb-1">Total Rewards</div>
              <div className="text-2xl font-bold">
                ${totalRewards.toLocaleString()}
              </div>
            </div>
            <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
              <div className="text-[#B0B4C4] text-sm mb-1">Unclaimed</div>
              <div className="text-2xl font-bold">
                ${unclaimed.toLocaleString()}
              </div>
            </div>
          </div>

          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-[#0853fc] to-[#122780] px-6 py-3 rounded-lg font-semibold text-white w-full"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="text-center text-green-400 py-3">
              Connected:{" "}
              {`${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`}
            </div>
          )}
        </div>

        {/* Earn Section */}
        <div className="bg-[#0b1422]/80 rounded-xl p-6 mb-6 border border-[#1E293B]">
          <h2 className="text-xl font-bold mb-4">Earn high reward in ELFI</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
              <div className="text-[#B0B4C4] text-sm mb-1">Total Supply</div>
              <div className="text-2xl font-bold">$3,626,971</div>
            </div>
            <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
              <div className="text-[#B0B4C4] text-sm mb-1">Pools</div>
              <div className="text-2xl font-bold">2</div>
            </div>
            <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
              <div className="text-[#B0B4C4] text-sm mb-1">Highest APR</div>
              <div className="text-2xl font-bold">11.67%</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              As a riskier you're earning yield from
            </h3>
            <ul className="list-disc list-inside text-[#B0B4C4] space-y-1">
              <li>Trading fee</li>
              <li>Tinder's loss</li>
              <li>Non-fee</li>
              <li>Redeem fee</li>
              <li>Barrow fee</li>
            </ul>
          </div>
        </div>

        {/* Recommended Pools */}
        <div className="bg-[#0b1422]/80 rounded-xl p-6 border border-[#1E293B]">
          <h2 className="text-xl font-bold mb-6">Recommended for you</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pools.map((pool, index) => (
              <div
                key={index}
                className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{pool.name}</h3>
                    <p className="text-[#B0B4C4] text-sm">{pool.description}</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                    {pool.apr} APR
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-[#B0B4C4] text-sm">Supply</div>
                    <div className="font-medium">{pool.supply}</div>
                  </div>
                  <div>
                    <div className="text-[#B0B4C4] text-sm">
                      Est Earnings/{pool.days.split(" ")[0]}d
                    </div>
                    <div className="font-medium text-green-400">
                      {pool.earnings}
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full py-2 rounded-lg font-medium ${
                    isConnected
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!isConnected}
                >
                  {isConnected ? "Supply" : "Connect Wallet"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}