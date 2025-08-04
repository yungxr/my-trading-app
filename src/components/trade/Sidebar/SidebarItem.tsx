"use client";

interface SidebarItemProps {
  children: React.ReactNode;
  active?: boolean;
  badge?: string | null;
  onClick?: () => void;
}

export default function SidebarItem({
  children,
  active = false,
  badge = null,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      className={`w-full text-left py-2 px-3 rounded-xl mb-1 transition-all ${
        active
          ? "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-white border border-fuchsia-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          : "text-indigo-100/80 hover:bg-white/5 hover:border-white/10 border border-transparent"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {children}
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
            badge.includes('%') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {badge}
          </span>
        )}
      </div>
    </button>
  );
}