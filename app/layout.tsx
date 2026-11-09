import type { Metadata } from "next";
import "./globals.css";
import "./logo.css";
import "./readability.css";
import "./results-distribution.css";
import "./header-layout.css";
import "./thanks.css";
import "./question-number.css";
import "./header-emphasis.css";

export const metadata: Metadata = {
  title: "왕십리직영점 직원 시식 평가",
  description: "신의주찹쌀순대 왕십리직영점 직원 시식 평가",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
