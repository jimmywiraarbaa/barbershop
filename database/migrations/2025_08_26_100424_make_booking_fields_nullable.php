<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'mysql') {
            DB::statement('ALTER TABLE bookings MODIFY name VARCHAR(255) NULL');
            DB::statement('ALTER TABLE bookings MODIFY whatsapp VARCHAR(30) NULL');
            return;
        }

        if ($driver === 'pgsql') {
            DB::statement('ALTER TABLE bookings ALTER COLUMN name DROP NOT NULL');
            DB::statement('ALTER TABLE bookings ALTER COLUMN whatsapp DROP NOT NULL');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'mysql') {
            DB::statement('ALTER TABLE bookings MODIFY name VARCHAR(255) NOT NULL');
            DB::statement('ALTER TABLE bookings MODIFY whatsapp VARCHAR(30) NOT NULL');
            return;
        }

        if ($driver === 'pgsql') {
            DB::statement('ALTER TABLE bookings ALTER COLUMN name SET NOT NULL');
            DB::statement('ALTER TABLE bookings ALTER COLUMN whatsapp SET NOT NULL');
        }
    }
};
