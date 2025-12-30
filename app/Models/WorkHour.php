<?php

namespace App\Models;

class WorkHour extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'day_start',
        'day_end',
        'time_start',
        'time_end',
    ];
}
