import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { AuthModal } from "@/components/layout/AuthModal";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { Toast } from "@/components/ui/Toast";
import { siteConfig } from "@/data/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: `${siteConfig.brandName} — Samalkha Flagship | Luxury Streetwear & Menswear`,
  description: siteConfig.description,
  keywords: [
    "Brand X",
    "Brand X Samalkha",
    "Brand X Panipat",
    "Streetwear Panipat",
    "Oversized Tees",
    "Heavyweight Hoodies",
    "Men readymade garments Samalkha",
  ],
  authors: [{ name: "Brand X" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '32x32', type: 'image/svg+xml' }
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: "BRAND X — High-Street Luxury & Heavyweight Drip",
    description: "Samalkha Flagship & Online Store. 240-450 GSM Heavyweight Streetwear.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-black selection:text-white">
        <ShopProvider>
          {children}

          {/* Global Interactive Drawers and Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <AuthModal />
          <QuickViewModal />
          <Toast />
        </ShopProvider>
      </body>
    </html>
  );
}
