<?php

namespace App\Models;

class Gallery extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'image',
        'is_active',
        'order',
    ];
}
