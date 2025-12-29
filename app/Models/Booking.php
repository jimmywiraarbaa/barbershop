<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'capster_id',
        'name',
        'email',
        'whatsapp',
        'notes',
    ];

    public function capster(): BelongsTo
    {
        return $this->belongsTo(Capster::class);
    }
}
