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
        if (Schema::hasColumn('capsters', 'work_hour_id')) {
            return;
        }

        Schema::table('capsters', function (Blueprint $table) {
            $table->foreignId('work_hour_id')->nullable()->constrained('work_hours')->nullOnDelete()->after('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('capsters', 'work_hour_id')) {
            return;
        }

        Schema::table('capsters', function (Blueprint $table) {
            $table->dropConstrainedForeignId('work_hour_id');
        });
    }
};
