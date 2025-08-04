"use client";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import TrendingPairs from "../TrendingPairs";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  trendingPairs: { symbol: string; price: number; change: number }[];
  onPairClick: (symbol: string) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  trendingPairs,
  onPairClick,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white/5 border-r border-transparent p-4 overflow-y-auto backdrop-blur-sm relative">
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>

      <SidebarSection title="PRODUCT">
        {["trade", "alpha", "degen", "earn"].map((tab) => (
          <SidebarItem
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            badge={
              tab === "degen" ? "1000x" : tab === "earn" ? "+500% APR" : null
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </SidebarItem>
        ))}
      </SidebarSection>

      <SidebarSection title="REWARDS">
        {["Airdrop", "Get $4000"].map((item) => (
          <SidebarItem key={item}>{item}</SidebarItem>
        ))}
      </SidebarSection>

      <SidebarSection title="OTHER">
        {["Referral", "Docs"].map((item) => (
          <SidebarItem key={item}>{item}</SidebarItem>
        ))}
      </SidebarSection>

      <SidebarSection title="TRENDING">
        <TrendingPairs pairs={trendingPairs} onPairClick={onPairClick} />
      </SidebarSection>
    </div>
  );
}