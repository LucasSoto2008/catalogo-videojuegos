<?php

namespace Database\Seeders;

use App\Models\Videojuego;
use Illuminate\Database\Seeder;

class VideojuegoSeeder extends Seeder
{
    public function run(): void
    {
        $juegos = [
            ['titulo' => 'The Legend of Zelda: Breath of the Wild', 'genero' => 'Aventura', 'plataforma' => 'Nintendo Switch', 'precio' => 59.99, 'puntuacion' => 10, 'fecha_lanzamiento' => '2017-03-03', 'multijugador' => false, 'descripcion' => 'Explorá un Hyrule enorme y abierto con total libertad.'],
            ['titulo' => 'Minecraft', 'genero' => 'Sandbox', 'plataforma' => 'Multiplataforma', 'precio' => 29.99, 'puntuacion' => 9, 'fecha_lanzamiento' => '2011-11-18', 'multijugador' => true, 'descripcion' => 'Construí, explorá y sobreviví en un mundo de bloques.'],
            ['titulo' => 'Hollow Knight', 'genero' => 'Metroidvania', 'plataforma' => 'PC', 'precio' => 14.99, 'puntuacion' => 9, 'fecha_lanzamiento' => '2017-02-24', 'multijugador' => false, 'descripcion' => 'Descendé al reino en ruinas de Hallownest.'],
            ['titulo' => 'Rocket League', 'genero' => 'Deportes', 'plataforma' => 'Multiplataforma', 'precio' => 0, 'puntuacion' => 8, 'fecha_lanzamiento' => '2015-07-07', 'multijugador' => true, 'descripcion' => 'Fútbol con autos propulsados por cohetes.'],
            ['titulo' => 'Elden Ring', 'genero' => 'RPG', 'plataforma' => 'PlayStation 5', 'precio' => 69.99, 'puntuacion' => 10, 'fecha_lanzamiento' => '2022-02-25', 'multijugador' => true, 'descripcion' => 'RPG de acción en las Tierras Intermedias.'],
            ['titulo' => 'Stardew Valley', 'genero' => 'Simulación', 'plataforma' => 'PC', 'precio' => 14.99, 'puntuacion' => 9, 'fecha_lanzamiento' => '2016-02-26', 'multijugador' => true, 'descripcion' => 'Heredás la granja de tu abuelo y empezás una nueva vida.'],
            ['titulo' => 'Celeste', 'genero' => 'Plataformas', 'plataforma' => 'Nintendo Switch', 'precio' => 19.99, 'puntuacion' => 9, 'fecha_lanzamiento' => '2018-01-25', 'multijugador' => false, 'descripcion' => 'Ayudá a Madeline a escalar la montaña Celeste.'],
        ];

        foreach ($juegos as $juego) {
            Videojuego::create($juego);
        }
    }
}
