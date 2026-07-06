import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Empieza aqui — Guia de Edgar Boone",
  description: "Cuentame donde estas hoy y te digo por donde entrar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
