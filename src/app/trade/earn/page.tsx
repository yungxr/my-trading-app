"use client";

import { useState } from "react";
import StakingPanel from "@/components/trade/StakingPanel";

export default function EarnPage() {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto">
      <StakingPanel />
    </div>
  );
}