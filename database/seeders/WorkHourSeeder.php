<?php

namespace Database\Seeders;

use App\Models\WorkHour;
use Illuminate\Database\Seeder;

class WorkHourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shifts = [
            [
                'name' => 'Shift Pagi',
                'day_start' => 'Senin',
                'day_end' => 'Jumat',
                'time_start' => '09:00',
                'time_end' => '15:00',
            ],
            [
                'name' => 'Shift Malam',
                'day_start' => 'Senin',
                'day_end' => 'Jumat',
                'time_start' => '15:00',
                'time_end' => '21:00',
            ],
        ];

        foreach ($shifts as $shift) {
            WorkHour::updateOrCreate(
                ['name' => $shift['name']],
                $shift,
            );
        }
    }
}
