<?php

namespace App\Support;

use App\Models\WorkHour;
use Carbon\Carbon;
use Illuminate\Support\Str;

class WorkHourAvailability
{
    private const DAY_ORDER = [
        'minggu',
        'senin',
        'selasa',
        'rabu',
        'kamis',
        'jumat',
        'sabtu',
    ];

    public static function isWithinShift(
        ?WorkHour $workHour,
        ?string $bookingDate = null,
        ?Carbon $now = null,
    ): bool {
        if (! $workHour) {
            return false;
        }

        $startDay = self::dayToIndex($workHour->day_start);
        $endDay = self::dayToIndex($workHour->day_end);
        $startTime = self::timeToMinutes($workHour->time_start);
        $endTime = self::timeToMinutes($workHour->time_end);

        if ($startDay === null || $endDay === null || $startTime === null || $endTime === null) {
            return false;
        }

        $now = ($now ?: Carbon::now('Asia/Jakarta'))->setTimezone('Asia/Jakarta');

        try {
            $date = $bookingDate
                ? Carbon::createFromFormat('Y-m-d', $bookingDate, 'Asia/Jakarta')->startOfDay()
                : $now->copy()->startOfDay();
        } catch (\Throwable $exception) {
            return false;
        }

        $dayIndex = $date->dayOfWeek;
        $inDayRange = $startDay <= $endDay
            ? $dayIndex >= $startDay && $dayIndex <= $endDay
            : $dayIndex >= $startDay || $dayIndex <= $endDay;

        if (! $inDayRange) {
            return false;
        }

        if ($bookingDate && $date->toDateString() !== $now->toDateString()) {
            return true;
        }

        $minutesNow = $now->hour * 60 + $now->minute;

        if ($startTime <= $endTime) {
            return $minutesNow >= $startTime && $minutesNow <= $endTime;
        }

        return $minutesNow >= $startTime || $minutesNow <= $endTime;
    }

    private static function normalizeDay(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        $normalized = Str::of($value)->lower()->replaceMatches('/[^a-z]/', '')->value();

        if ($normalized === 'jumaat') {
            return 'jumat';
        }

        return $normalized ?: null;
    }

    private static function dayToIndex(?string $value): ?int
    {
        $normalized = self::normalizeDay($value);

        if (! $normalized) {
            return null;
        }

        $index = array_search($normalized, self::DAY_ORDER, true);

        return $index === false ? null : $index;
    }

    private static function timeToMinutes(?string $value): ?int
    {
        if (! $value) {
            return null;
        }

        $parts = explode(':', $value);

        if (count($parts) < 2) {
            return null;
        }

        $hour = (int) $parts[0];
        $minute = (int) $parts[1];

        if ($hour < 0 || $hour > 23 || $minute < 0 || $minute > 59) {
            return null;
        }

        return $hour * 60 + $minute;
    }
}
