<?php

namespace App\Observers;

use App\Models\Client;
use App\Models\Plan;
use Exception;

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
        if($client->city->state->name === 'São Paulo' && $client->plans()->find(Plan::FREE_PLAN)->count() > 0){
            throw new Exception("Clientes do plano FREE, do estado de São Paulo, não podem ser excluídos");
        }

    }
}
