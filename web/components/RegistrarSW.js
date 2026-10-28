"use client";

import { useEffect } from "react";

// Registra el Service Worker (public/sw.js) al cargar la app
export default function RegistrarSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registrado:", reg.scope))
        .catch((err) => console.error("Error al registrar el SW:", err));
    }
  }, []);
  return null;
}
