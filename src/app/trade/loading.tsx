"use client";

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center bg-black/50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}