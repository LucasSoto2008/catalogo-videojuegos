// URL base de la API Laravel (se puede cambiar con la variable de entorno)
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// Trae el listado. Devuelve { datos, error } para no romper la página.
export async function obtenerVideojuegos(buscar = "") {
  try {
    const url = buscar
      ? `${API_URL}/videojuegos?buscar=${encodeURIComponent(buscar)}`
      : `${API_URL}/videojuegos`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return { datos: [], error: `La API respondió con error ${res.status}.` };
    }
    return { datos: await res.json(), error: null };
  } catch {
    return { datos: [], error: "No se pudo conectar con la API. ¿Está iniciada?" };
  }
}

// Trae un videojuego. status 404 => no existe.
export async function obtenerVideojuego(id) {
  try {
    const res = await fetch(`${API_URL}/videojuegos/${id}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return { dato: null, status: res.status };
    }
    return { dato: await res.json(), status: 200 };
  } catch {
    return { dato: null, status: 0 };
  }
}
