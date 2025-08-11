// app/layout.tsx
import "./globals.css"; // если используешь TailwindCSS или стили
import PageTransitionWrapper from "./PageTransitionWrapper";

export const metadata = {
  title: "Digital Vault",
  description: "Demo trading site with animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </body>
    </html>
  );
}
