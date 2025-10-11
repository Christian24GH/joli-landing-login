<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Dotenv\Dotenv;
use Illuminate\Support\Env;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Env::disablePutenv();
        Dotenv::createImmutable(base_path())->load(); 
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
