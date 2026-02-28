import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUNRAY ECOSYSTEM | Investment & Vendor Platform",
  description: "SUNRAY ECOSYSTEM - A comprehensive investment and vendor platform with 15-25% monthly returns, 6-level referral commission, and revenue sharing. Built by BRAVE ECOM PVT LTD.",
  keywords: ["SUNRAY", "Investment", "Vendor", "Commission", "Returns", "Finance", "BRAVE ECOM", "ROI"],
  authors: [{ name: "BRAVE ECOM PVT LTD" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SUNRAY ECOSYSTEM",
    description: "Investment & Vendor Platform with 15-25% Monthly Returns",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUNRAY ECOSYSTEM",
    description: "Investment & Vendor Platform with 15-25% Monthly Returns",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
