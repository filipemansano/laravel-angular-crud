<?php

namespace App\Models;

use App\Traits\Pagination;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes, Pagination;

    protected $table = 'clients';

    protected $fillable = [
        'name', 'email', 'phone', 'city_id', 'birth_day'
    ];

    protected $dates = [
        'birth_day'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function plans()
    {
        return $this->belongsToMany(Plan::class, 'client_plan', 'client_id');
    }
}
