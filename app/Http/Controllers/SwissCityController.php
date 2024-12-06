<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SwissCity;

class SwissCityController extends Controller
{
    public function search(Request $request)
    {
        try {
            $query = $request->query('search');

            if (!$query) {
                return response()->json(['error' => 'Search query is required'], 400);
            }

            $cities = SwissCity::where('name', 'LIKE', "%{$query}%")
                ->orWhere('canton', 'LIKE', "%{$query}%")
                ->get();

            return response()->json($cities);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
