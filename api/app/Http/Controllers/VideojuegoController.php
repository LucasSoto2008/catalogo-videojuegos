<?php

namespace App\Http\Controllers;

use App\Models\Videojuego;
use Illuminate\Http\Request;

class VideojuegoController extends Controller
{
    /** Reglas de validación compartidas por store y update. */
    private function reglas(bool $parcial = false): array
    {
        $req = $parcial ? 'sometimes|required' : 'required';

        return [
            'titulo' => "$req|string|max:150",
            'genero' => "$req|string|max:50",
            'plataforma' => "$req|string|max:50",
            'precio' => "$req|numeric|min:0",
            'puntuacion' => "$req|integer|between:1,10",
            'fecha_lanzamiento' => "$req|date",
            'multijugador' => "$req|boolean",
            'descripcion' => 'nullable|string|max:1000',
        ];
    }

    private array $mensajes = [
        'required' => 'El campo :attribute es obligatorio.',
        'string' => 'El campo :attribute debe ser un texto.',
        'max' => 'El campo :attribute no puede superar :max caracteres.',
        'numeric' => 'El campo :attribute debe ser un número.',
        'integer' => 'El campo :attribute debe ser un número entero.',
        'min' => 'El campo :attribute no puede ser negativo.',
        'between' => 'El campo :attribute debe estar entre :min y :max.',
        'date' => 'El campo :attribute debe ser una fecha válida (AAAA-MM-DD).',
        'boolean' => 'El campo :attribute debe ser verdadero o falso.',
    ];

    // GET /api/videojuegos  (opcional ?buscar=texto)
    public function index(Request $request)
    {
        $query = Videojuego::query()->orderBy('titulo');

        if ($buscar = $request->query('buscar')) {
            $query->where('titulo', 'like', "%{$buscar}%");
        }

        return response()->json($query->get(), 200);
    }

    // POST /api/videojuegos
    public function store(Request $request)
    {
        $datos = $request->validate($this->reglas(), $this->mensajes);
        $videojuego = Videojuego::create($datos);

        return response()->json($videojuego, 201);
    }

    // GET /api/videojuegos/{id}
    public function show(string $id)
    {
        return response()->json(Videojuego::findOrFail($id), 200);
    }

    // PUT/PATCH /api/videojuegos/{id}
    public function update(Request $request, string $id)
    {
        $videojuego = Videojuego::findOrFail($id);
        $datos = $request->validate($this->reglas(true), $this->mensajes);
        $videojuego->update($datos);

        return response()->json($videojuego, 200);
    }

    // DELETE /api/videojuegos/{id}
    public function destroy(string $id)
    {
        Videojuego::findOrFail($id)->delete();

        return response()->json(['mensaje' => 'Videojuego eliminado'], 200);
    }
}
