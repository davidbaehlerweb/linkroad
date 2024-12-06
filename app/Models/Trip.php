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
        'date',
        'time',
        'price',
        'comments',
    ];

    /**
     * Relation avec le modèle User.
     * Chaque trajet appartient à un utilisateur.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
