<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Videojuego extends Model
{
    protected $fillable = [
        'titulo',
        'genero',
        'plataforma',
        'precio',
        'puntuacion',
        'fecha_lanzamiento',
        'multijugador',
        'descripcion',
    ];

    protected $casts = [
        'precio' => 'float',
        'puntuacion' => 'integer',
        'multijugador' => 'boolean',
        'fecha_lanzamiento' => 'date:Y-m-d',
    ];
}
