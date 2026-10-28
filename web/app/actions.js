"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api";

// Convierte el FormData del formulario en el objeto que espera la API
function armarVideojuego(formData) {
  return {
    titulo: formData.get("titulo"),
    genero: formData.get("genero"),
    plataforma: formData.get("plataforma"),
    precio: formData.get("precio"),
    puntuacion: formData.get("puntuacion"),
    fecha_lanzamiento: formData.get("fecha_lanzamiento"),
    multijugador: formData.get("multijugador") === "on",
    descripcion: formData.get("descripcion") || null,
  };
}

async function enviar(url, method, formData) {
  const valores = armarVideojuego(formData);
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(valores),
    });
  } catch {
    return { errores: { general: ["No se pudo conectar con la API."] }, valores };
  }

  if (res.status === 422) {
    const json = await res.json();
    return { errores: json.errors, valores };
  }
  if (!res.ok) {
    return { errores: { general: [`Error ${res.status} de la API.`] }, valores };
  }
  return { ok: true, juego: await res.json() };
}

// Server Action: crear
export async function crearVideojuego(_estadoPrevio, formData) {
  const r = await enviar(`${API_URL}/videojuegos`, "POST", formData);
  if (!r.ok) return r;
  revalidatePath("/");
  redirect(`/videojuegos/${r.juego.id}`);
}

// Server Action: editar
export async function editarVideojuego(id, _estadoPrevio, formData) {
  const r = await enviar(`${API_URL}/videojuegos/${id}`, "PUT", formData);
  if (!r.ok) return r;
  revalidatePath("/");
  revalidatePath(`/videojuegos/${id}`);
  redirect(`/videojuegos/${id}`);
}

// Server Action: borrar
export async function borrarVideojuego(id) {
  await fetch(`${API_URL}/videojuegos/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  revalidatePath("/");
  redirect("/");
}
