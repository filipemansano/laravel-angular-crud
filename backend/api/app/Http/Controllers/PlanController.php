<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlanResource;
use App\Models\Plan;

class PlanController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return pagination(new Plan(), PlanResource::class);
    }
}
