<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $hasDayStart = Schema::hasColumn('work_hours', 'day_start');
        $hasDayEnd = Schema::hasColumn('work_hours', 'day_end');
        $hasTimeStart = Schema::hasColumn('work_hours', 'time_start');
        $hasTimeEnd = Schema::hasColumn('work_hours', 'time_end');
        $hasDayRange = Schema::hasColumn('work_hours', 'day_range');
        $hasTimeRange = Schema::hasColumn('work_hours', 'time_range');

        Schema::table('work_hours', function (Blueprint $table) use ($hasDayStart, $hasDayEnd, $hasTimeStart, $hasTimeEnd) {
            if (! $hasDayStart) {
                $table->string('day_start')->nullable()->after('name');
            }
            if (! $hasDayEnd) {
                $table->string('day_end')->nullable()->after('day_start');
            }
            if (! $hasTimeStart) {
                $table->string('time_start')->nullable()->after('day_end');
            }
            if (! $hasTimeEnd) {
                $table->string('time_end')->nullable()->after('time_start');
            }
        });

        if ($hasDayRange || $hasTimeRange) {
            Schema::table('work_hours', function (Blueprint $table) use ($hasDayRange, $hasTimeRange) {
                if ($hasDayRange) {
                    $table->dropColumn('day_range');
                }
                if ($hasTimeRange) {
                    $table->dropColumn('time_range');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $hasDayRange = Schema::hasColumn('work_hours', 'day_range');
        $hasTimeRange = Schema::hasColumn('work_hours', 'time_range');
        $hasDayStart = Schema::hasColumn('work_hours', 'day_start');
        $hasDayEnd = Schema::hasColumn('work_hours', 'day_end');
        $hasTimeStart = Schema::hasColumn('work_hours', 'time_start');
        $hasTimeEnd = Schema::hasColumn('work_hours', 'time_end');

        Schema::table('work_hours', function (Blueprint $table) use ($hasDayRange, $hasTimeRange) {
            if (! $hasDayRange) {
                $table->string('day_range')->nullable()->after('name');
            }
            if (! $hasTimeRange) {
                $table->string('time_range')->nullable()->after('day_range');
            }
        });

        if ($hasDayStart || $hasDayEnd || $hasTimeStart || $hasTimeEnd) {
            Schema::table('work_hours', function (Blueprint $table) use ($hasDayStart, $hasDayEnd, $hasTimeStart, $hasTimeEnd) {
                if ($hasDayStart) {
                    $table->dropColumn('day_start');
                }
                if ($hasDayEnd) {
                    $table->dropColumn('day_end');
                }
                if ($hasTimeStart) {
                    $table->dropColumn('time_start');
                }
                if ($hasTimeEnd) {
                    $table->dropColumn('time_end');
                }
            });
        }
    }
};
