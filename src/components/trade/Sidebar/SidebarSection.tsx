"use client";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SidebarSection({
  title,
  children,
}: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <div className="text-indigo-100/80 text-xs font-semibold mb-2">
        {title}
      </div>
      {children}
    </div>
  );
};