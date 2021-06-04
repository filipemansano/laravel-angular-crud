<?php

use App\Http\Controllers\ClientController;
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

/**
 * dynamic way to get client-secret to use in web app
 * the common way is get secret and set in env variable
 * but to simplicate test to not have any manuality action to configure
 * this method is chosen
 */
Route::get('oauth/client-secret', function () {
    return response(DB::table('oauth_clients')->where('name', '=', 'webapp')->get(['id', 'secret', 'name']));
});