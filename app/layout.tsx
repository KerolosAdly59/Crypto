import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Slidebar from "./Slidebar/Slidebar";
import "@fortawesome/fontawesome-free/css/all.min.css"
import CartContextProvider from "./Context/CoinsCotext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "A real-time cryptocurrency dashboard showing prices, trends, market data, and favorites with interactive charts and live updates.",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body className="min-h-screen flex bg-slate-950">

  <Slidebar />

  <div className="flex-1 m-1 bg-slate-950 rounded-[15px] shadow-lg shadow-black/40 text-white overflow-auto">
    <CartContextProvider>
      {children}
    </CartContextProvider>
  </div>

</body>
    </html>
  );
}
