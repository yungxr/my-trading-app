"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DocsPage() {
  const router = useRouter();

  useEffect(() => {
    // Открываем документацию в новом окне
    const newWindow = window.open("/docs", "_blank");

    // Если новое окно заблокировано, делаем редирект
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      router.push("/docs");
    } else {
      // Возвращаем пользователя на предыдущую страницу
      router.back();
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Redirecting to Documentation...
        </h1>
        <p className="text-gray-400">
          If you are not redirected automatically,
          <a
            href="/docs"
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