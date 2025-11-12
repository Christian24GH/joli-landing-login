<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailVerification extends Model
{
     protected $table = 'verification_emails';

    protected $fillable = [
        'user_uuid',
        'code',
        'is_used',
        'issued_for',
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
