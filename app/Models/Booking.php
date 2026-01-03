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
        'model_rambut_id',
        'price_id',
        'booking_date',
        'status',
        'name',
        'email',
        'whatsapp',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booking_date' => 'date',
    ];

    public function capster(): BelongsTo
    {
        return $this->belongsTo(Capster::class);
    }

    public function modelRambut(): BelongsTo
    {
        return $this->belongsTo(HairModel::class, 'model_rambut_id');
    }

    public function price(): BelongsTo
    {
        return $this->belongsTo(Price::class);
    }
}
