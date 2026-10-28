<?php

use App\Http\Controllers\VideojuegoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('videojuegos', VideojuegoController::class);
