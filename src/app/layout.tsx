// app/layout.tsx
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { Menu } from "@/components/Menu";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RedCultiva",
  description: "Plataforma para intercambio de semillas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sourceSans3.variable}`}>
      <body className="min-h-screen flex flex-col bg-olive-100 text-olive-900">
        <SessionProviderWrapper>
          <header className="fixed top-0 w-full z-50">
            <Menu />
          </header>
          <main className="flex-grow w-full mt-20">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
