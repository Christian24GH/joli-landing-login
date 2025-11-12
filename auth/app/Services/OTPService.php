<?php

namespace App\Services;

use App\Mail\OtpMail;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OTPService
{
    /**
     * Generate and send OTP
     */
    public function sendOtp(string $email, string $purpose = 'login', $userId = null, $ip = null, $agent = null)
    {
        $otpCode = random_int(100000, 999999);
        $otpHash = Hash::make($otpCode);
        $expiresAt = Carbon::now()->addMinutes(1);

        $otp = Otp::create([
            'user_id'    => $userId,
            'email'      => $email,
            'otp_hash'   => $otpHash,
            'purpose'    => $purpose,
            'ip_address' => $ip,
            'user_agent' => $agent,
            'expires_at' => $expiresAt,
        ]);
        
        Mail::to($email)->send(new OtpMail($otpCode));

        return $otp;
    }

    /**
     * Verify an OTP
     */
    public function verifyOtp(string $email, string $otpInput)
    {
        $record = Otp::where('email', $email)
            ->where('is_used', false)
            ->where('expires_at', '>', now())
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$record) {
            return ['status' => false, 'message' => 'Invalid or expired OTP'];
        }

        if (!Hash::check($otpInput, $record->otp_hash)) {
            return ['status' => false, 'message' => 'Invalid OTP'];
        }
        
        $record->update([
            'is_used' => true,
            'used_by' => Auth::check() ? Auth::id() : $record->user_id,
            'used_at' => now(),
        ]);

        return ['status' => true, 'message' => 'OTP verified'];
    }

    public function resendOtp(string $email, $userId = null, $ip = null, $agent = null)
    {
        $lastOtp = Otp::where('email', $email)
            ->orderBy('created_at', 'desc')
            ->first();

        // Cooldown: allow resend only once per minute
        if ($lastOtp && $lastOtp->created_at->gt(now()->subMinute())) {
            return [
                'status' => false,
                'code' => 429,
                'message' => 'You can request a new OTP after 1 minute.',
            ];
        }

        // Mark previous unused OTPs as expired (optional but cleaner)
        Otp::where('email', $email)
            ->where('is_used', false)
            ->where('expires_at', '>', now())
            ->update(['expires_at' => now()]);

        // Generate and send new OTP
        $newOtp = $this->sendOtp($email, 'login', $userId, $ip, $agent);

        return [
            'status' => true,
            'message' => 'A new OTP has been sent to your email.',
            'otp' => $newOtp,
        ];
    }
}
