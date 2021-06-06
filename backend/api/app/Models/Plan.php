<?php

namespace App\Models;

use App\Traits\Pagination;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use Pagination;
    
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

    protected $relatedColumnMapping = [
        'client_id' => 'clients',
    ];

    /**
     * inverse many-to-many
     */
    public function clients(){
        return $this->belongsToMany(Client::class, 'client_plan');
    }

    public function scopefindByName($query, $name) {
        return $query->where('name', '=', $name);
    }
}
