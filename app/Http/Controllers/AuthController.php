<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Log;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Compte créé avec succès.',
            'user' => $user,
        ]);
    }

    /**
     * Vérification de l'existence d'un email
     */
    public function checkEmail(Request $request)
    {
        $emailExists = User::where('email', $request->email)->exists();

        return response()->json(['exists' => $emailExists]);
    }

    /**
     * Connexion utilisateur
     */
    public function login(Request $request)
{
    Log::info('Données reçues pour la connexion : ', $request->all());

    $validator = Validator::make($request->all(), [
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        Log::error('Erreur de validation : ', $validator->errors()->toArray());
        return response()->json($validator->errors(), 422);
    }

    if (Auth::attempt($request->only('email', 'password'))) {
        $user = Auth::user();
        Log::info('Connexion réussie pour l\'utilisateur : ', ['email' => $user->email]);

        $token = $user->createToken('LinkRoadApp')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    Log::warning('Échec de connexion : Email ou mot de passe incorrect.');
    return response()->json(['error' => 'Email ou mot de passe incorrect.'], 401);
}



    /**
     * Déconnexion utilisateur
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie.'], 200);
    }

    public function getUser(Request $request)
    {
        return response()->json(['user' => Auth::user()]);
    }
}
