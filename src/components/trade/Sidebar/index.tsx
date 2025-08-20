"use client";

import Link from "next/link";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import TrendingPairs from "../TrendingPairs";
import { useTrendingPairs } from "@/components/hooks/useTrendingPairs";
import { useEffect, useState } from "react";

interface SidebarProps {
  activeTab: string;
}

export default function Sidebar({ activeTab }: SidebarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { trendingPairs, isLoading } = useTrendingPairs();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getTradeLink = () => {
    if (!isMounted) return "/trade/BTC";
    const lastPair = localStorage.getItem("lastTradingPair") || "BTC";
    return `/trade/${lastPair}`;
  };

  const handlePairClick = (symbol: string) => {
    const pairName = symbol.split("-")[0];
    if (isMounted) {
      localStorage.setItem("lastTradingPair", pairName);
    }
    window.location.href = `/trade/${pairName}`;
  };

  return (
    <div className="w-64 bg-white/5 border-r border-transparent p-4 overflow-y-auto backdrop-blur-sm relative">
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>

      <SidebarSection title="PRODUCT">
        <Link href={getTradeLink()} passHref>
          <SidebarItem active={activeTab === "trade"}>Trade</SidebarItem>
        </Link>

        <Link href="/trade/alpha" passHref>
          <SidebarItem
            active={activeTab === "alpha"}
            badge="New"
            badgeColor="bg-gradient-to-r from-purple-500 to-indigo-500"
          >
            Create token
          </SidebarItem>
        </Link>

        <Link href="/trade/degen" passHref>
          <SidebarItem
            active={activeTab === "degen"}
            badge="1000x"
            badgeColor="bg-gradient-to-r from-rose-500 to-pink-500"
          >
            Degen
          </SidebarItem>
        </Link>

        <Link href="/trade/earn" passHref>
          <SidebarItem
            active={activeTab === "earn"}
            badge="+500% APR"
            badgeColor="bg-gradient-to-r from-emerald-500 to-teal-500"
          >
            Earn
          </SidebarItem>
        </Link>
      </SidebarSection>

      <SidebarSection title="REWARDS">
        <Link href="/trade/airdrop" passHref>
          <SidebarItem
            active={activeTab === "airdrop"}
            icon="🎁"
            badge="50K Pool"
            badgeColor="bg-gradient-to-r from-yellow-500 to-amber-500"
          >
            Airdrop
          </SidebarItem>
        </Link>

        <Link href="/trade/bonus" passHref>
          <SidebarItem
            active={activeTab === "bonus"}
            icon="💰"
            badge="$1000"
            badgeColor="bg-gradient-to-r from-emerald-500 to-teal-500"
          >
            Get $1000
          </SidebarItem>
        </Link>
      </SidebarSection>

      <SidebarSection title="OTHER">
        <Link href="/trade/referral" passHref>
          <SidebarItem active={activeTab === "referral"} icon="👥">
            Referral
          </SidebarItem>
        </Link>

        <Link href="/trade/docs" passHref>
          <SidebarItem active={activeTab === "docs"} icon="📄">
            Docs
          </SidebarItem>
        </Link>
      </SidebarSection>

      <SidebarSection title="TRENDING">
        <TrendingPairs
          pairs={trendingPairs}
          onPairClick={handlePairClick}
          isLoading={isLoading}
        />
      </SidebarSection>
    </div>
  );
}