<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('videojuegos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');                       // texto
            $table->string('genero');                       // texto
            $table->string('plataforma');                   // texto
            $table->decimal('precio', 8, 2);                // número
            $table->unsignedTinyInteger('puntuacion');      // número (1 a 10)
            $table->date('fecha_lanzamiento');              // fecha
            $table->boolean('multijugador')->default(false); // booleano
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('videojuegos');
    }
};
