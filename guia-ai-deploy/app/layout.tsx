import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Empieza aqui — Guia de Edgar Boone",
  description: "¿Qué buscas? ¿Qué te duele? ¿Qué quieres lograr?",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
