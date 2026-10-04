import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dor | دوّر - وجبات صحية طازجة محسوبة",
  description:
    "مطعم Dor للوجبات الصحية: وجبات رئيسية، معكرونة، ساندويتشات، كوكتيل وبودينج. اطلب عبر واتساب.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
