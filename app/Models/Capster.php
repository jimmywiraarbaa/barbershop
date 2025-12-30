<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Capster extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'image',
        'whatsapp',
        'user_id',
        'work_hour_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function workHour(): BelongsTo
    {
        return $this->belongsTo(WorkHour::class);
    }
}
