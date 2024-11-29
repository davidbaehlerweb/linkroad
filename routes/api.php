<?php

use App\Http\Controllers\AuthController;

// Route pour l'inscription
Route::post('register', [AuthController::class, 'register']);

// Route pour vérifier l'email
Route::post('check-email', [AuthController::class, 'checkEmail']);

// Route pour la connexion
Route::post('login', [AuthController::class, 'login'])->name('api.login');


// Route pour la déconnexion
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Route pour vérifier l'authentification
Route::get('check-auth', [AuthController::class, 'checkAuth'])->middleware('auth:sanctum');
Route::get('user', [AuthController::class, 'getUser'])->middleware('auth:sanctum');