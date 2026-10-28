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
`GET /api/videojuegos/999` devuelve **404** porque `findOrFail(999)` no encuentra ese registro: la petición está bien formada, pero el recurso pedido no existe. No es 400 (la petición no está mal escrita) ni 500 (el servidor no falló).
`POST /api/videojuegos` con `"puntuacion": 15` devuelve **422** porque el servidor entendió el JSON, pero los datos no cumplen las reglas (`between:1,10`). No es 404 porque la ruta existe, y no es 400 porque el formato es correcto: lo que falla es el contenido, y Laravel lo indica campo por campo.

**2. HTTPS.**
Con HTTP los datos viajan en texto plano: alguien en la misma red (por ejemplo, el Wi-Fi de la escuela) podría ver qué páginas visito, el JSON de los videojuegos y lo que mando en el formulario, e incluso modificar las respuestas (ataque "man in the middle"). Con HTTPS todo va cifrado y se verifica que el servidor sea quien dice ser. El Service Worker exige HTTPS (salvo en `localhost`) porque intercepta **todas** las peticiones de la app y puede cambiar las respuestas: si un atacante pudiera inyectar un SW por HTTP, controlaría la app de forma permanente.

**3. CORS.**
CORS es una regla del **navegador**: bloquea que JavaScript de un origen (`localhost:3000`) lea respuestas de otro origen (`127.0.0.1:8000`) si este no lo permite. En mi app los `fetch` a la API se hacen en Server Components y Server Actions, que corren en el servidor de Next.js (Node), no en el navegador, así que CORS no aplica. Podría aparecer si hiciera el `fetch` desde un Client Component (por ejemplo, si el `BotonFavorito` guardara el favorito llamando directo a la API con `'use client'`); ahí habría que configurar `config/cors.php` en Laravel.

**4. PWA y TWA.**
No, mi app no necesita estar en Google Play. Como PWA ya se puede instalar desde el navegador, tiene ícono propio, se abre en ventana standalone y funciona sin conexión, que es todo lo que necesita un catálogo. Una TWA sólo serviría si quisiera que la encuentren en la tienda o llegar a usuarios que buscan apps sólo ahí, pero implica pagar la cuenta de desarrollador, firmar el paquete y publicarla en HTTPS con Digital Asset Links. Para este proyecto no vale la pena.

**5. Decisiones.**
Lo que más me costó fue que el formulario mostrara los errores de validación de Laravel. La Server Action recibe el 422, y la resolví devolviendo los `errors` del JSON como estado con `useActionState`, así el formulario muestra el mensaje debajo de cada campo y conserva lo que el usuario había escrito. Otro problema fue el modo offline: al principio sólo cacheaba la página de inicio, así que usé una estrategia network-first que guarda cada página visitada y, si no hay nada guardado, muestra `offline.html`.

---

## ⚠️ Notas / limitaciones

- Los favoritos se guardan en el navegador (`localStorage`), no en la base de datos.
- Offline sólo se pueden ver páginas que ya se visitaron con conexión; crear, editar o borrar necesita la API.
- La app no está publicada online ni empaquetada como TWA.
