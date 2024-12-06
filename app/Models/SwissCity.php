<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SwissCity extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'canton'];
}
