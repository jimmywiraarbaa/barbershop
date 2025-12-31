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
        if (Schema::hasColumn('bookings', 'model_rambut_id')) {
            return;
        }

        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignId('model_rambut_id')
                ->nullable()
                ->constrained('hair_models')
                ->nullOnDelete()
                ->after('capster_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('bookings', 'model_rambut_id')) {
            return;
        }

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropConstrainedForeignId('model_rambut_id');
        });
    }
};
