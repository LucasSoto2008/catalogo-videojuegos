import Link from "next/link";
import RegistrarSW from "@/components/RegistrarSW";
import "./globals.css";

export const metadata = {
  title: "GameDex — Catálogo de Videojuegos",
  description: "Catálogo de videojuegos hecho con Laravel + Next.js",
  manifest: "/manifest.json",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
};

export const viewport = {
  themeColor: "#7c3aed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="encabezado">
          <Link href="/" className="logo">🎮 GameDex</Link>
          <nav>
            <Link href="/">Catálogo</Link>
            <Link href="/videojuegos/nuevo">+ Agregar</Link>
          </nav>
        </header>
        <main className="contenedor">{children}</main>
        <footer className="pie">TP Integrador — Programación Web Dinámica · EPET Nº 30</footer>
        <RegistrarSW />
      </body>
    </html>
  );
}
