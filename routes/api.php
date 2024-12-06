<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\SwissCityController;
use App\Http\Controllers\TripController;
use App\Models\SwissCity;

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



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/trips', [TripController::class, 'store']); // Route pour publier un trajet
    Route::get('/user', function () {
        return response()->json(['user' => auth()->user()]);
    });
});

use Illuminate\Support\Facades\Log;

Route::get('/swiss-cities', [SwissCityController::class, 'search']);
Route::get('/trips', [TripController::class, 'search']);

Route::post('/stripe/payment', [StripeController::class, 'processPayment']);



