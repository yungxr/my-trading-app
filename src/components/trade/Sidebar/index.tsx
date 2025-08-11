"use client";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import TrendingPairs from "../TrendingPairs";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  trendingPairs: { symbol: string; price: number; change: number }[];
  onPairClick: (symbol: string) => void;
  isLoading?: boolean;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  trendingPairs,
  onPairClick,
  isLoading,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white/5 border-r border-transparent p-4 overflow-y-auto backdrop-blur-sm relative">
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-fuchsia-400/50 to-transparent"></div>

      <SidebarSection title="PRODUCT">
        {[
          { id: "trade", label: "Trade", badge: null },
          {
            id: "alpha",
            label: "Create token",
            badge: "New",
            badgeColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
          },
          {
            id: "degen",
            label: "Degen",
            badge: "1000x",
            badgeColor: "bg-gradient-to-r from-rose-500 to-pink-500",
          },
          {
            id: "earn",
            label: "Earn",
            badge: "+500% APR",
            badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
          },
        ].map((tab) => (
          <SidebarItem
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            badge={tab.badge}
            badgeColor={tab.badgeColor}
          >
            {tab.label}
          </SidebarItem>
        ))}
      </SidebarSection>

      <SidebarSection title="REWARDS">
        <SidebarItem
          active={activeTab === "airdrop"}
          onClick={() => setActiveTab("airdrop")}
          icon="🎁"
          badge="50K Pool"
          badgeColor="bg-gradient-to-r from-yellow-500 to-amber-500"
        >
          Airdrop
        </SidebarItem>
        <SidebarItem
          active={activeTab === "bonus"}
          onClick={() => setActiveTab("bonus")}
          icon="💰"
          badge="$1000"
          badgeColor="bg-gradient-to-r from-emerald-500 to-teal-500"
        >
          Get $1000
        </SidebarItem>
      </SidebarSection>

      <SidebarSection title="OTHER">
        {[
          { id: "referral", label: "Referral", icon: "👥" },
          { id: "docs", label: "Docs", icon: "📄" },
        ].map((item) => (
          <SidebarItem key={item.id} icon={item.icon}>
            {item.label}
          </SidebarItem>
        ))}
      </SidebarSection>

      <SidebarSection title="TRENDING">
        <TrendingPairs
          pairs={trendingPairs}
          onPairClick={onPairClick}
          isLoading={isLoading}
        />
      </SidebarSection>
    </div>
  );
}
