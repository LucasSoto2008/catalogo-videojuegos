# 🎮 GameDex — Catálogo de Videojuegos

TP Integrador — Programación Web Dinámica | 6° 1° | EPET Nº 30 | 2026

**Tema:** catálogo de videojuegos. Cada videojuego tiene:

| Campo | Tipo | Ejemplo |
|---|---|---|
| `titulo` | texto | "Hollow Knight" |
| `genero` | texto | "Metroidvania" |
| `plataforma` | texto | "PC" |
| `precio` | número (decimal) | 14.99 |
| `puntuacion` | número entero (1 a 10) | 9 |
| `fecha_lanzamiento` | fecha | 2017-02-24 |
| `multijugador` | booleano | false |
| `descripcion` | texto largo (opcional) | "Descendé al reino..." |

```
catalogo-videojuegos/
├── api/        → API REST en Laravel (SQLite)
├── web/        → Frontend en Next.js + PWA
└── README.md
```

---

## ▶️ Cómo correrlo

**Requisitos:** PHP 8.2+ (con la extensión `pdo_sqlite`), Composer, Node.js 20+ y npm.

### 1. API (Laravel) — terminal 1

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite        # en Windows: type nul > database\database.sqlite
php artisan migrate --seed            # crea las tablas y carga 7 videojuegos de ejemplo
php artisan serve                     # queda en http://127.0.0.1:8000
```

> Si querés volver a los datos de ejemplo: `php artisan migrate:fresh --seed`.

### 2. Frontend (Next.js) — terminal 2

```bash
cd web
npm install
npm run build
npm start                             # queda en http://localhost:3000
```

Abrir **http://localhost:3000**. (La API tiene que estar corriendo.)

> Si la API corre en otra URL, crear `web/.env.local` con `NEXT_PUBLIC_API_URL=http://otra-url/api` y volver a hacer `npm run build`.
> Para la PWA conviene usar `npm run build && npm start` (modo producción) y no `npm run dev`.

---

## 🔌 Endpoints de la API

| Método | Ruta | Acción | Respuesta |
|---|---|---|---|
| GET | `/api/videojuegos` | Listar (acepta `?buscar=texto`) | 200 |
| GET | `/api/videojuegos/{id}` | Ver uno | 200 / 404 |
| POST | `/api/videojuegos` | Crear | 201 / 422 |
| PUT/PATCH | `/api/videojuegos/{id}` | Actualizar | 200 / 404 / 422 |
| DELETE | `/api/videojuegos/{id}` | Borrar | 200 / 404 |

Las rutas se definen con `Route::apiResource('videojuegos', VideojuegoController::class)` en `api/routes/api.php`.
En Thunder Client conviene mandar el header `Accept: application/json`.

Ejemplo de body para POST:

```json
{
  "titulo": "Portal 2",
  "genero": "Puzzle",
  "plataforma": "PC",
  "precio": 9.99,
  "puntuacion": 10,
  "fecha_lanzamiento": "2011-04-19",
  "multijugador": true,
  "descripcion": "Puzzles con portales."
}
```

## 🧪 Pruebas en Thunder Client

| # | Petición | Body / detalle | Código esperado | Código obtenido |
|---|---|---|---|---|
| 1 | `GET /api/videojuegos` | — | 200 | 200 ✅ |
| 2 | `GET /api/videojuegos?buscar=zelda` | — | 200 (1 resultado) | 200 ✅ |
| 3 | `GET /api/videojuegos/1` | — | 200 | 200 ✅ |
| 4 | `GET /api/videojuegos/999` | id que no existe | 404 | 404 ✅ |
| 5 | `POST /api/videojuegos` | body completo (Portal 2) | 201 | 201 ✅ |
| 6 | `POST /api/videojuegos` | `{"titulo": ""}` | 422 | 422 ✅ |
| 7 | `POST /api/videojuegos` | `"puntuacion": 15` | 422 | 422 ✅ |
| 8 | `PUT /api/videojuegos/8` | `{"precio": 4.99}` | 200 | 200 ✅ |
| 9 | `PUT /api/videojuegos/999` | `{"precio": 4.99}` | 404 | 404 ✅ |
| 10 | `PUT /api/videojuegos/8` | `{"precio": -5}` | 422 | 422 ✅ |
| 11 | `DELETE /api/videojuegos/8` | — | 200 | 200 ✅ |
| 12 | `DELETE /api/videojuegos/8` | (ya borrado) | 404 | 404 ✅ |

Ejemplo de respuesta 422:

```json
{
  "message": "El campo titulo es obligatorio. (and 6 more errors)",
  "errors": {
    "titulo": ["El campo titulo es obligatorio."],
    "precio": ["El campo precio es obligatorio."]
  }
}
```

---

## ✅ Qué incluye

**Backend:** modelo `Videojuego` con `$fillable`, migración, CRUD completo con `apiResource`, validación con `$request->validate()` y mensajes en español, `findOrFail` (404 con mensaje propio), seeder con 7 registros.

**Frontend:**
- `/` listado tomado de la API, con **buscador** por título.
- `/videojuegos/[id]` detalle con ruta dinámica.
- Manejo de errores con `res.ok`: si la API está apagada o falla, se muestra un mensaje y la página no se rompe. Si el id no existe se muestra una página 404 propia.
- Layout con encabezado y navegación con `Link`.
- Client Component `BotonFavorito` (`'use client'` + `useState`), guarda los favoritos en `localStorage`.

**PWA:** `manifest.json` completo (nombre, íconos 192/512, colores, `display: standalone`), Service Worker (`public/sw.js`) registrado desde `components/RegistrarSW.js`, instalable desde el navegador, funciona offline.

**Extras:**
- ➕ Formulario para **crear** desde el frontend (Server Action), mostrando los errores 422 de Laravel debajo de cada campo.
- ✏️ **Editar** y 🗑️ **borrar** desde el frontend (Server Actions).
- 🔍 **Buscador** en el listado.
- 📡 **Página "sin conexión" propia** (`offline.html`) y caché **network-first** de las páginas: si ya visitaste una página, offline se muestra la última versión guardada; si no, aparece la pantalla de sin conexión.

### Cómo probar la PWA
1. Correr el frontend en modo producción (`npm run build && npm start`) y abrir `http://localhost:3000` en Chrome.
2. En DevTools → *Application* → *Service Workers* debe aparecer `sw.js` activo, y en *Manifest* los datos de la app.
3. Aparece el ícono de instalar en la barra de direcciones → **Instalar GameDex**.
4. En DevTools → *Network* marcar **Offline** y recargar: la app abre igual (muestra el catálogo guardado o la página "Sin conexión").

---

## 📝 Informe teórico

**1. Códigos de estado.**
Si pido `GET /api/videojuegos/999`, la API responde **404**. Uso `findOrFail`, y como no hay ningún juego con ese id, Laravel corta ahí y devuelve "Videojuego no encontrado". Es 404 porque la petición está bien hecha, lo que pasa es que ese juego no existe. Por eso no corresponde un 400 ni un 500.
En cambio, si hago un `POST /api/videojuegos` con `"puntuacion": 15`, responde **422**. La ruta existe y el JSON está bien armado, pero el dato no cumple la regla `between:1,10`. El 422 dice justamente eso: "te entendí, pero estos datos no sirven". Además viene la lista de errores por campo, que es lo que muestro en el formulario.

**2. HTTPS.**
Si la app estuviera publicada en HTTP, todo viajaría sin cifrar. Cualquiera conectado al mismo Wi-Fi podría ver qué juegos estoy mirando, lo que escribo en el formulario de alta e incluso cambiar las respuestas en el camino. Con HTTPS eso no se puede, porque la información va cifrada y el navegador comprueba que el servidor sea el verdadero.
El Service Worker exige HTTPS (menos en `localhost`, que es donde lo probé) porque tiene mucho poder: se mete en el medio de todas las peticiones de la app y queda instalado aunque cierres la pestaña. Si alguien pudiera colar uno falso por HTTP, controlaría la app para siempre.

**3. CORS.**
CORS es un control que hace el navegador: no deja que una página de `localhost:3000` lea respuestas de `127.0.0.1:8000` si la API no lo autoriza. En mi proyecto todos los `fetch` a Laravel están en Server Components y Server Actions, o sea que los hace el servidor de Next y no el navegador. Por eso nunca tuve problemas de CORS.
Me aparecería si, por ejemplo, el botón de favorito (que es un Client Component) llamara directamente a la API para guardar el favorito en la base. Ahí el pedido saldría del navegador y tendría que habilitar el origen en `config/cors.php`.

**4. PWA y TWA.**
No, no necesita estar en Google Play. Como PWA ya se instala desde Chrome con un clic, tiene su ícono, se abre en su propia ventana sin la barra del navegador y funciona sin internet. Para un catálogo de videojuegos eso alcanza y sobra.
Empaquetarla como TWA tendría sentido si quisiera que la gente la encuentre buscando en la tienda. Pero para eso hay que pagar la cuenta de desarrollador, firmar el paquete y tener la app publicada en HTTPS, y para este trabajo no lo vi necesario.

**5. Decisiones.**
Lo que más me costó fue mostrar en el formulario los errores de validación de Laravel. Al principio, cuando mandaba un dato mal, la Server Action recibía el 422 pero en pantalla no pasaba nada y se borraba todo lo que había escrito. Lo solucioné haciendo que la action devuelva los `errors` junto con los valores cargados, y con `useActionState` los muestro debajo de cada campo sin perder lo escrito.
También tuve un problema con el modo offline. Al principio solo se guardaba la página de inicio, así que cambié el Service Worker a "network-first": cada página que visito queda en caché y, si no hay nada guardado, se muestra mi página `offline.html`.

---

## ⚠️ Notas / limitaciones

- Los favoritos se guardan en el navegador (`localStorage`), no en la base de datos.
- Offline sólo se pueden ver páginas que ya se visitaron con conexión; crear, editar o borrar necesita la API.
- La app no está publicada online ni empaquetada como TWA.
