<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'cities';

    protected $fillable = [
        'name', 'state_id'
    ];

    public function state() {
        return $this->belongsTo(State::class);
    }

    public function scopefindByNameAndState($query, $city, $state) {
        return $query->where('name', '=', $city)->whereHas('state', function($q) use ($state) {
            $q->where('name', '=', $state);
        });
    }
}
