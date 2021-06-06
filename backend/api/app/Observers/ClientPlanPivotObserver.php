<?php

namespace App\Observers;

use App\Models\Client;
use App\Models\ClientPlanPivot;

class ClientPlanPivotObserver
{
    /**
     * Handle the taggable pivot "creating" event.
     *
     * @param  \App\Models\ClientPlanPivot  $taggablePivot
     * @return void
     */
    public function deleting(ClientPlanPivot $taggablePivot)
    {
        if(Client::findOrFail($taggablePivot->client_id)->plans()->count() === 1){
            //abort(403, 'O cliente deve ter no minimo um plano');
        }
    }
}