<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    /**
     * Les champs assignables.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'departure',
        'destination',
        'seats',
        'available_seats',
        'date',
        'time',
        'price',
        'comments',
        'status',
    ];

    // Met à jour le statut en fonction du nombre de places disponibles
    public function updateStatus()
    {
        $this->status = $this->available_seats > 0 ? 'Disponible' : 'Complet';
        $this->save();
    }

    /**
     * Relation avec le modèle User.
     * Chaque trajet appartient à un utilisateur.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
