<?php

use App\Http\Controllers\APIController;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;


Route::get('/test', function(){
    return 'API is working';
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login'])->middleware("throttle:login");

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => response()->json($request->user()));
    Route::post('/logout', [AuthController::class, 'logout']);
});


//Mobile Authentication
Route::post('/sanctum/token', function (Request $request) {
    $validated = (object) $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);
 
    $user = User::where('email', $validated->email)
            ->where('role', 'driver')
            ->first();

    if (!$user || !Hash::check($validated->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
 
    return $user->createToken($request->device_name)->plainTextToken;
});

Route::get('/getDrivers', [APIController::class, 'getDrivers']);
