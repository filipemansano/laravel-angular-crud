<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PlanController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('clients', ClientController::class)->middleware('auth:api');
Route::put('clients/{id}/plans/sync', [ClientController::class, 'syncPlans'])->name('sync.plans')->middleware('auth:api');


Route::apiResource('plans', PlanController::class)->middleware('auth:api')->only([
    'index'
]);

Route::apiResource('cities', CityController::class)->middleware('auth:api')->only([
    'index'
]);

/**
 * dynamic way to get client-secret to use in web app
 * the common way is get secret and set in env variable
 * but to simplicate test to not have any manuality action to configure
 * this method is chosen
 */
Route::get('oauth/client-secret', function () {
    return response([
        'data' => DB::table('oauth_clients')->where('name', '=', 'webapp')->first(['id', 'secret', 'name'])
    ]);
});