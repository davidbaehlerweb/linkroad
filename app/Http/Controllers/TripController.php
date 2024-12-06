<?php

namespace App\Http\Controllers;

use App\Models\Trip;
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
            'reserved_seats' => 'required|integer|min:0', // Ajout de la validation pour reserved_seats
            'date' => 'required|date',
            'time' => 'required',
            'price' => 'required|numeric|min:0',
            'comments' => 'nullable|string',
        ]);

        // Calculer les places disponibles
        $validated['available_seats'] = max(0, $validated['seats'] - $validated['reserved_seats']);

        $trip = Auth::user()->trips()->create($validated);

        // Met à jour le statut automatiquement
        $trip->updateStatus();

        return response()->json(['message' => 'Trajet publié avec succès !', 'trip' => $trip]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    

public function search(Request $request)
{
    $departure = $request->query('departure');
    $destination = $request->query('destination');
    $date = $request->query('date');
    $time = $request->query('time');
    $passengers = $request->query('passengers', 1); // Par défaut, 1 passager

    $trips = Trip::where('departure', 'like', "%{$departure}%")
                ->where('destination', 'like', "%{$destination}%")
                ->where('date', $date)
                ->where('time', '>=', $time)
                ->where('status', 'Disponible') // Vérifie si le trajet est disponible
                ->where('available_seats', '>=', $passengers) // Vérifie le nombre de places disponibles
                ->get();

    return response()->json($trips);
}




}

