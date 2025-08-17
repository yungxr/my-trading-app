"use client";

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/components/trade/Sidebar';
import { usePathname, useRouter } from 'next/navigation';

export default function TradingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('trade');

  useEffect(() => {
    // Если находимся на странице trade без пары - редиректим на BTC
    if (pathname === '/trade') {
      const lastPair = localStorage.getItem('lastTradingPair') || 'BTC';
      router.replace(`/trade/${lastPair}`);
      return;
    }

    const tab = pathname.split('/')[2] || 'trade';
    setActiveTab(tab);
  }, [pathname, router]);

  return (
    <div className="relative h-screen flex flex-col bg-black text-white">
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-[#191633]/90 via-black/85 to-[#2b174a]/90" />
      
      <div className="flex flex-1 h-[calc(100vh-73px)]">
        <Sidebar activeTab={activeTab} />
        {children}
      </div>
    </div>
  );
}