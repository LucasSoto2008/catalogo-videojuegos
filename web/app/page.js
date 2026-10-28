import Link from "next/link";
import { obtenerVideojuegos } from "@/lib/api";
import BotonFavorito from "@/components/BotonFavorito";

export default async function Inicio({ searchParams }) {
  const { buscar = "" } = await searchParams;
  const { datos: juegos, error } = await obtenerVideojuegos(buscar);

  return (
    <>
      <h1>Catálogo de videojuegos</h1>

      {/* Buscador: un form GET que agrega ?buscar= a la URL */}
      <form className="buscador" action="/">
        <input name="buscar" defaultValue={buscar} placeholder="Buscar por título..." />
        <button type="submit">Buscar</button>
        {buscar && <Link href="/" className="boton secundario">Limpiar</Link>}
      </form>

      {error && <p className="alerta">⚠️ {error}</p>}

      {!error && juegos.length === 0 && <p>No se encontraron videojuegos.</p>}

      <ul className="grilla">
        {juegos.map((j) => (
          <li key={j.id} className="tarjeta">
            <div className="tarjeta-top">
              <span className="etiqueta">{j.genero}</span>
              <BotonFavorito id={j.id} />
            </div>
            <h2><Link href={`/videojuegos/${j.id}`}>{j.titulo}</Link></h2>
            <p className="muted">{j.plataforma} · {j.fecha_lanzamiento.slice(0, 4)}</p>
            <p>⭐ {j.puntuacion}/10 · {j.precio === 0 ? "Gratis" : `US$ ${j.precio.toFixed(2)}`}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
