"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReferralPage() {
  const router = useRouter();

  useEffect(() => {
    // Открываем реферальную страницу в новом окне
    const newWindow = window.open("/referral", "_blank");

    // Если новое окно заблокировано (например, popup blocker), делаем редирект
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      router.push("/referral");
    } else {
      // Возвращаем пользователя на предыдущую страницу
      router.back();
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Redirecting to Referral Program...
        </h1>
        <p className="text-gray-400">
          If you are not redirected automatically,
          <a
            href="/referral"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}