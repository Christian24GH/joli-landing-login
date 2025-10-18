<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    use HasFactory;

    protected $table = 'otps';

    protected $fillable = [
        'user_id',
        'email',
        'otp_hash',
        'purpose',
        'ip_address',
        'user_agent',
        'is_used',
        'used_by',
        'used_at',
        'expires_at',
    ];

    protected $casts = [
        'is_used'    => 'boolean',
        'used_at'    => 'datetime',
        'expires_at' => 'datetime',
    ];
}
