import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "بیتانور الکتریک - سامانه تولیدکنندگان چراغ",
  description: "مرکز عملیات فارسی برای یافتن و ارزیابی تولیدکنندگان، مونتاژکنندگان و سازندگان چراغ‌های برقی در ایران",
  keywords: ["چراغ", "نورپردازی", "بیتانور", "تولیدکننده", "تامین‌کننده", "چراغ‌های برقی", "LED", "نورپردازی فضای باز"],
  authors: [{ name: "Bitanoor Electric" }],
  openGraph: {
    title: "بیتانور الکتریک - سامانه تولیدکنندگان چراغ",
    description: "مرکز عملیات فارسی برای چراغ‌های برقی در ایران",
    url: "https://bitanoor-electric.pages.dev",
    siteName: "بیتانور الکتریک",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
