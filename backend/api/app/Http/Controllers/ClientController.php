<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientFormRequest;
use App\Http\Requests\ClientPlanFormRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;

class ClientController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return pagination(new Client(), ClientResource::class);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\ClientFormRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClientFormRequest $request)
    {
        $model = Client::create($request->all());
        return new ClientResource($model);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return new ClientResource(Client::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\ClientFormRequest  $request
     * @param  int $client
     * @return \Illuminate\Http\Response
     */
    public function update(ClientFormRequest $request, int $client)
    {
        $model = Client::findOrFail($client);
        $model->update($request->all());

        return new ClientResource($model);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $client)
    {
        if(Client::destroy($client) > 0){
            return response(null, 204);
        }

        return response(null, 404);
    }

    public function syncPlans(ClientPlanFormRequest $request, $id)
    {
        Client::findOrFail($id)->plans()->sync($request->get('plans'));
        return response(null, 204);
    }
}
