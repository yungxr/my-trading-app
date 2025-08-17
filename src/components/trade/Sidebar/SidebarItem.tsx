"use client";

import Link from 'next/link';
import { ReactNode } from 'react';

interface SidebarItemProps {
  children: ReactNode;
  active?: boolean;
  badge?: string | null;
  badgeColor?: string;
  icon?: string | null;
  href?: string;
}

export default function SidebarItem({
  children,
  active = false,
  badge = null,
  badgeColor = '',
  icon = null,
  href,
}: SidebarItemProps) {
  // Стилизованный контент элемента
  const content = (
    <div className={`w-full py-2 px-3 rounded-xl mb-1 transition-all cursor-pointer ${
      active
        ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-white border border-fuchsia-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
        : 'text-indigo-100/80 hover:bg-white/5 hover:border-white/10 border border-transparent'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </div>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
            badgeColor || 'bg-white/10 text-indigo-100/80'
          }`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  // Для referral и docs открываем в новом окне
  if (href === '/trade/referral' || href === '/trade/docs') {
    return (
      <a 
        href={href === '/trade/referral' ? '/referral' : '/docs'} 
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  // Для остальных ссылок используем Next.js Link
  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}