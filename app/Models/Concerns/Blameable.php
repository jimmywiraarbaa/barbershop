<?php

namespace App\Models\Concerns;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

trait Blameable
{
    protected static function bootBlameable(): void
    {
        static::creating(function ($model) {
            if (! Auth::check()) {
                return;
            }

            if (empty($model->created_by)) {
                $model->created_by = Auth::id();
            }

            $model->updated_by = Auth::id();
        });

        static::updating(function ($model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });

        static::deleted(function ($model) {
            if (! Auth::check() || ! method_exists($model, 'isForceDeleting')) {
                return;
            }

            if ($model->isForceDeleting()) {
                return;
            }

            $model->deleted_by = Auth::id();
            $model->saveQuietly();
        });

        static::restoring(function ($model) {
            $model->deleted_by = null;
        });
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function deletedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
}
