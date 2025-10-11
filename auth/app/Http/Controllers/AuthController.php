<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request){
        //dd($request);
        $validated = (object)$request->validate([
            'name'      => ['required', 'min:6'],
            'email'     => ['required', 'email', 'unique:users,email'],
            'password'  => ['required', 'min:6'],
            'role'      => [
                'required', 
                Rule::in([
                    'HR1 Admin',
                    'HR2 Admin', 'Trainer', 'Employee',
                    'HR3 Admin',
                    'HR4 Admin',
                    'Payroll Specialist',
                    'LogisticsI Admin', 'Manager', 'Staff',
                    'Fleet Manager', 'Driver',
                    'Facility Admin', 'Legal Admin', 'Front Desk Admin', 'Super Admin'
                ])
            ],
        ]);
        try{
            User::create([
                'uuid'     => Str::uuid(),
                'name'     => $validated->name,
                'email'    => $validated->email,
                'password' => $validated->password,
                'role'     => $validated->role,
            ]);
        }catch(Exception $e){
            return response()->json('Registration Failed'.$e, 500);
        }

        return response()->json('Registered Successfully', 200);
    }

    public function login(Request $request){
        $validated = (object)$request->validate([
            'email'     => ['required', 'email', 'exists:users,email'],
            'password'  => ['required', 'min:6'],
            'device_name' => 'sometimes|string', // Token based only
        ]);

        $user = User::where('email', $validated->email)->first();

        if (!$user || !Hash::check($validated->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $device = $data['device_name'] ?? $request->header('User-Agent') ?? 'spa';
        $token = $user->createToken($device)->plainTextToken;
        

        return response()->json(["message" => "Login successful"])
            ->cookie(
                'auth_token',        // cookie name
                $token,              // value
                60 * 24,             // minutes (1 day)
                '/',                 // path
                env("SESSION_DOMAIN"),     // domain
                app()->environment('production'), // secure = true in production, false in local
                true,                // httpOnly (JavaScript can’t read it)
                false,               // raw
                'Lax'             // SameSite (Strict or Lax)
            );

    }
    
    public function logout(Request $request)
    {
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }
    
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out'])
            ->cookie('auth_token', '', -1, '/', env('SESSION_DOMAIN'), app()->environment('production'), true, false, 'Lax');
    }
}
