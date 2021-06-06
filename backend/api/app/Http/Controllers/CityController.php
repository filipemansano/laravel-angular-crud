<?php

namespace App\Http\Controllers;

use App\Http\Resources\CityResource;
use App\Models\City;

class CityController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return pagination(new City(), CityResource::class);
    }
}
