import type { Metadata } from "next";
import { Manrope, Noto_Sans_Khmer } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--font-khmer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M23 Cashew Advisor · ជំនួយការស្វាយចន្ទី M23",
  description: "AI advisor for M23 cashew farmers in Cambodia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="km" className={`${manrope.variable} ${notoSansKhmer.variable}`}>
        <body className="antialiased min-h-screen">{children}</body>
      </html>
    </ClerkProvider>
  );
}