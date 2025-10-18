<?php

namespace App\Http\Controllers;

use App\Models\Otp;
use App\Models\User;
use App\Services\OTPService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    protected $otpService;

    public function __construct(OTPService $otpService)
    {
        $this->otpService = $otpService;
    }

 
    public function register(Request $request)
    {
        $validated = (object) $request->validate([
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
                ]),
            ],
        ]);

        User::create([
            'uuid'     => Str::uuid(),
            'name'     => $validated->name,
            'email'    => $validated->email,
            'password' => $validated->password,
            'role'     => $validated->role,
        ]);

        return response()->json(['message' => 'Registered successfully'], 200);
    }


    public function login(Request $request)
    {
        $validated = (object) $request->validate([
            'email'       => ['required', 'email', 'exists:users,email'],
            'password'    => ['required', 'min:6'],
            'device_name' => 'sometimes|string',
        ]);

        $user = User::where('email', $validated->email)->first();

        if (!$user || !Hash::check($validated->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Check if user already verified OTP today on same device
        $isSameDevice = $user->last_verified_ip === $request->ip()
            && $user->last_verified_agent === $request->userAgent();

        if ($user->otp_verified_at && $user->otp_verified_at->gt(now()->subDay()) && $isSameDevice) 
        {
            $user->tokens()->delete();
            return $this->issueTokenResponse(
                $user,
                $validated->device_name ?? $request->userAgent(),
                'Already verified today'
            )->header('X-OTP-SKIPPED', true);
        }

        // Otherwise send OTP
        $otp = $this->otpService->sendOtp(
            $user->email,
            'login',
            $user->id,
            $request->ip(),
            $request->userAgent()
        );

        // Build JSON response
        $response = response()->json([
            'message' => 'OTP sent to your email',
            'otp_id'  => $otp->id,
            'email'   => $user->email,
        ]);

        foreach ($this->otpCookies($user->email, $otp->id) as $cookie) {
            $response->headers->setCookie($cookie);
        }

        return $response;
    }


    public function verifyOtp(Request $request)
    {
        $validated = $request->validate([
            'email'       => 'required|email',
            'otp'         => 'required|string|size:6',
            'device_name' => 'sometimes|string',
        ]);

        $result = $this->otpService->verifyOtp($validated['email'], $validated['otp']);

        if (!$result['status']) {
            return response()->json(['message' => $result['message']], 422);
        }

        $user = User::where('email', $validated['email'])->first();
        $user->update([
            'otp_verified_at' => now(),
            'last_verified_ip' => $request->ip(),
            'last_verified_agent' => $request->userAgent(),
        ]);

        // Issue access token
        $response = $this->issueTokenResponse(
            $user,
            $validated['device_name'] ?? $request->userAgent(),
            'OTP verified successfully'
        );

        foreach ($this->clearOtpCookies() as $cookie) {
            $response->headers->setCookie($cookie);
        }

        return $response;
    }

    public function resendOtp(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $validated['email'])->first();

        $result = $this->otpService->resendOtp(
            $user->email,
            $user->id,
            $request->ip(),
            $request->userAgent()
        );

        if (!$result['status']) {
            return response()->json(['message' => $result['message']], $result['code']);
        }

        $otp = $result['otp'];

        $response = response()->json([
            'message' => $result['message'],
            'otp_id' => $otp->id,
            'email' => $user->email,
        ]);

        foreach ($this->otpCookies($user->email, $otp->id) as $cookie) {
            $response->headers->setCookie($cookie);
        }

        return $response;
    }


    public function logout(Request $request)
    {
        if ($user = $request->user()) {
            $user->tokens()->delete();
        }

        $response = response()->json(['message' => 'Logged out']);

        $response->headers->setCookie(cookie()->forget('auth_token'));
        foreach ($this->clearOtpCookies() as $cookie) {
            $response->headers->setCookie($cookie);
        }

        return $response;
    }



    // Issue auth token and return response
    private function issueTokenResponse(User $user, $device, $message)
    {
        $token = $user->createToken($device ?? 'spa')->plainTextToken;

        return response()
            ->json(['message' => $message, 'token' => $token])
            ->cookie(
                'auth_token',
                $token,
                60 * 24, // 1 day
                '/',
                env("SESSION_DOMAIN"),
                app()->environment('production'),
                false,
                false,
                'Lax'
            );
    }

    // Create OTP cookies
    private function otpCookies($email, $otpId)
    {
        return [
            cookie('otp_email', $email, 5, '/', env("SESSION_DOMAIN"), app()->environment('production'), false, false, 'Lax'),
            cookie('otp_id', $otpId, 5, '/', env("SESSION_DOMAIN"), app()->environment('production'), false, false, 'Lax'),
        ];
    }

    // Clear OTP cookies
    private function clearOtpCookies()
    {
        return [
            cookie('otp_email', null, -1, '/', env("SESSION_DOMAIN"), app()->environment('production'), false, false, 'Lax'),
            cookie('otp_id', null, -1, '/', env("SESSION_DOMAIN"), app()->environment('production'), false, false, 'Lax'),
        ];
    }
}
