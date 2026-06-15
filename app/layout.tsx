import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIMA Odontología — Primera Consulta Sin Cargo",
  description:
    "Transformá tu sonrisa con atención personalizada. Estética dental, implantes, blanqueamiento y más. Primera consulta sin cargo.",
  keywords: ["odontología", "dentista", "estética dental", "implantes", "blanqueamiento"],
  openGraph: {
    title: "SIMA Odontología",
    description: "Te ayudamos a transformar tu sonrisa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-sima-light text-sima-dark antialiased">
        {children}
      </body>
    </html>
  );
}
