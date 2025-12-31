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
        if (Schema::hasColumn('bookings', 'status')) {
            return;
        }

        Schema::table('bookings', function (Blueprint $table) {
            $table->string('status', 20)->default('waiting')->after('price_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('bookings', 'status')) {
            return;
        }

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
