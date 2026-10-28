"use client";

import { useActionState } from "react";

// Formulario reutilizable para crear y editar. Muestra los errores 422 de Laravel.
export default function FormularioVideojuego({ accion, inicial = {}, textoBoton }) {
  const [estado, formAction, pendiente] = useActionState(accion, null);
  const v = estado?.valores ?? inicial;
  const err = estado?.errores ?? {};

  const Error = ({ campo }) =>
    err[campo] ? <span className="error">{err[campo][0]}</span> : null;

  return (
    <form action={formAction} className="formulario" key={JSON.stringify(v)}>
      {err.general && <p className="alerta">{err.general[0]}</p>}

      <label>Título
        <input name="titulo" defaultValue={v.titulo ?? ""} />
        <Error campo="titulo" />
      </label>
      <label>Género
        <input name="genero" defaultValue={v.genero ?? ""} />
        <Error campo="genero" />
      </label>
      <label>Plataforma
        <input name="plataforma" defaultValue={v.plataforma ?? ""} />
        <Error campo="plataforma" />
      </label>
      <label>Precio (US$)
        <input name="precio" type="number" step="0.01" defaultValue={v.precio ?? ""} />
        <Error campo="precio" />
      </label>
      <label>Puntuación (1 a 10)
        <input name="puntuacion" type="number" defaultValue={v.puntuacion ?? ""} />
        <Error campo="puntuacion" />
      </label>
      <label>Fecha de lanzamiento
        <input name="fecha_lanzamiento" type="date" defaultValue={v.fecha_lanzamiento ?? ""} />
        <Error campo="fecha_lanzamiento" />
      </label>
      <label className="check">
        <input name="multijugador" type="checkbox" defaultChecked={!!v.multijugador} />
        Multijugador
      </label>
      <label>Descripción
        <textarea name="descripcion" rows={3} defaultValue={v.descripcion ?? ""} />
        <Error campo="descripcion" />
      </label>

      <button type="submit" disabled={pendiente}>
        {pendiente ? "Guardando..." : textoBoton}
      </button>
    </form>
  );
}
