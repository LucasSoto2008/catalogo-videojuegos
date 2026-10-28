import { notFound } from "next/navigation";
import { obtenerVideojuego } from "@/lib/api";
import { editarVideojuego } from "@/app/actions";
import FormularioVideojuego from "@/components/FormularioVideojuego";

export default async function Editar({ params }) {
  const { id } = await params;
  const { dato, status } = await obtenerVideojuego(id);

  if (status === 404) notFound();
  if (!dato) return <p className="alerta">⚠️ No se pudo conectar con la API.</p>;

  return (
    <>
      <h1>Editar: {dato.titulo}</h1>
      <FormularioVideojuego
        accion={editarVideojuego.bind(null, dato.id)}
        inicial={dato}
        textoBoton="Guardar cambios"
      />
    </>
  );
}
