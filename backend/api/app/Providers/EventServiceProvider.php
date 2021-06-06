<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\ClientPlanPivot;
use App\Observers\ClientObserver;
use App\Observers\ClientPlanPivotObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Client::observe(ClientObserver::class);
        ClientPlanPivot::observe(ClientPlanPivotObserver::class);
    }
}
