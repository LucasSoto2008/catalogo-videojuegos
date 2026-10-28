"use client";

import { useEffect, useState } from "react";

// Client Component con estado propio: marca/desmarca favorito y lo guarda en localStorage
export default function BotonFavorito({ id }) {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavorito(favs.includes(id));
  }, [id]);

  function alternar() {
    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const nuevos = favorito ? favs.filter((f) => f !== id) : [...favs, id];
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    setFavorito(!favorito);
  }

  return (
    <button
      type="button"
      className="favorito"
      onClick={alternar}
      aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {favorito ? "❤️" : "🤍"}
    </button>
  );
}
