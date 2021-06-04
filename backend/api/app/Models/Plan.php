<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    public const FREE_PLAN  = 1;
    public const BASIC_PLAN = 2;
    public const PLUS_PLAN  = 3;

    use HasFactory;

    protected $table = 'plans';

    protected $fillable = [
        'name', 'monthly_payment'
    ];

    protected $casts = [
        'monthly_payment' => 'float'
    ];

    public function scopefindByName($query, $name) {
        return $query->where('name', '=', $name);
    }
}
