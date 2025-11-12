<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EmailVerified implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $user_uuid;

    /**
     * Create a new event instance.
     */
    public function __construct(string $user_uuid)
    {
        $this->user_uuid = $user_uuid;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): Channel
    {
        // private channel for that specific user
        return new Channel("email-verification.{$this->user_uuid}");
    }

    /**
     * Optional: event name (frontend will listen for this)
     */
    public function broadcastAs(): string
    {
        return 'EmailVerified';
    }

    /**
     * Optional: data to send with the event
     */
    public function broadcastWith(): array
    {
        return [
            'message' => 'Email successfully verified',
            'user_uuid' => $this->user_uuid,
        ];
    }
}
