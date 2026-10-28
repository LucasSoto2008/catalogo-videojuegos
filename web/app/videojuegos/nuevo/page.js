import { crearVideojuego } from "@/app/actions";
import FormularioVideojuego from "@/components/FormularioVideojuego";

export default function Nuevo() {
  return (
    <>
      <h1>Agregar videojuego</h1>
      <FormularioVideojuego accion={crearVideojuego} textoBoton="Crear" />
    </>
  );
}
