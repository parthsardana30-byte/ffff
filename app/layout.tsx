import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ek dil se sorry ❤️",
  description: "A soft, sincere little apology made with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
