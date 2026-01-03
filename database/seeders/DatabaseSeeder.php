<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\CapsterSeeder;
use Database\Seeders\HairModelSeeder;
use Database\Seeders\PriceSeeder;
use Database\Seeders\WorkHourSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            WorkHourSeeder::class,
            CapsterSeeder::class,
            HairModelSeeder::class,
            PriceSeeder::class,
        ]);
    }
}
