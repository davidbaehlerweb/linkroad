<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class TripController extends Controller
{
    

    public function store(Request $request)
{
    try {
        if (!Auth::check()) {
            return response()->json(['message' => 'Non autorisé.'], 401);
        }

        $validated = $request->validate([
            'departure' => 'required|string',
            'destination' => 'required|string',
            'seats' => 'required|integer|min:1',
            'date' => 'required|date',
            'time' => 'required',
            'price' => 'required|numeric|min:0',
            'comments' => 'nullable|string',
        ]);

        $trip = Auth::user()->trips()->create($validated);

        return response()->json(['message' => 'Trajet publié avec succès !', 'trip' => $trip]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


}

