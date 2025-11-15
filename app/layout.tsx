import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CALO - Ropa de Trabajo | Indumentaria Laboral y Elementos de Protección Personal",
  description: "En CALO nos especializamos en la fabricación y comercialización de indumentaria laboral y elementos de protección personal. Productos de alta calidad que combinan precio y durabilidad.",
  keywords: ["ropa de trabajo", "indumentaria laboral", "EPP", "elementos de protección personal", "uniformes", "ropa industrial"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
