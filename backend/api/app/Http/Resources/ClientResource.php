<?php

namespace App\Http\Resources;

use App\Models\Plan;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'email'      => $this->email,
            'phone'      => $this->phone,
            'state'      => $this->city->state->name,
            'city'       => [
                'id'    => $this->city_id,
                'name'  => $this->city->name
            ],
            'plans' => $this->plans->map(function(Plan $item){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'monthly_payment' => $item->monthly_payment,
                ];
            }),
            'birth_day'  => $this->birth_day->format('Y-m-d'),
        ];
    }
}
