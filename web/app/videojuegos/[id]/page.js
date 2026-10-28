import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerVideojuego } from "@/lib/api";
import { borrarVideojuego } from "@/app/actions";
import BotonFavorito from "@/components/BotonFavorito";

export default async function Detalle({ params }) {
  const { id } = await params;
  const { dato: j, status } = await obtenerVideojuego(id);

  if (status === 404) notFound();
  if (!j) {
    return (
      <>
        <p className="alerta">⚠️ No se pudo cargar el videojuego (la API no responde).</p>
        <Link href="/">← Volver al catálogo</Link>
      </>
    );
  }

  const borrar = borrarVideojuego.bind(null, j.id);

  return (
    <article className="detalle">
      <Link href="/">← Volver al catálogo</Link>
      <div className="tarjeta-top">
        <h1>{j.titulo}</h1>
        <BotonFavorito id={j.id} />
      </div>
      <dl>
        <dt>Género</dt><dd>{j.genero}</dd>
        <dt>Plataforma</dt><dd>{j.plataforma}</dd>
        <dt>Precio</dt><dd>{j.precio === 0 ? "Gratis" : `US$ ${j.precio.toFixed(2)}`}</dd>
        <dt>Puntuación</dt><dd>⭐ {j.puntuacion}/10</dd>
        <dt>Lanzamiento</dt><dd>{j.fecha_lanzamiento}</dd>
        <dt>Multijugador</dt><dd>{j.multijugador ? "Sí" : "No"}</dd>
      </dl>
      {j.descripcion && <p>{j.descripcion}</p>}

      <div className="acciones">
        <Link href={`/videojuegos/${j.id}/editar`} className="boton">Editar</Link>
        <form action={borrar}>
          <button type="submit" className="peligro">Borrar</button>
        </form>
      </div>
    </article>
  );
}
