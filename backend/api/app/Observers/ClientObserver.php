<?php

namespace App\Observers;

use App\Models\Client;
use App\Models\Plan;

class ClientObserver
{
    /**
     * Handle the Client "deleting" event.
     *
     * @param  \App\Models\Client  $client
     * @return void
     */
    public function deleting(Client $client)
    {
        if($client->city->state->name === 'São Paulo' && $client->plans()->find(Plan::FREE_PLAN) !== null){
            abort(403, 'Clientes do plano FREE, do estado de São Paulo, não podem ser excluídos');
        }
    }

    /**
     * Handle the Client "created" event.
     *
     * @param  \App\Models\Client  $client
     * @return void
     */
    public function created(Client $client)
    {
        if($client->plans()->count() === 0){
            $client->plans()->attach(Plan::FREE_PLAN);
        }
    }
}
