import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZAGON — AI Startup Mentor",
  description: "Your AI startup mentor. From zero to one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
