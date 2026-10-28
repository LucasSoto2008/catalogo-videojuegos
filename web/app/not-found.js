import Link from "next/link";

export default function NoEncontrado() {
  return (
    <>
      <h1>404 — No encontrado</h1>
      <p>El videojuego que buscás no existe.</p>
      <Link href="/">← Volver al catálogo</Link>
    </>
  );
}
