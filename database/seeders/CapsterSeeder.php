<?php

namespace Database\Seeders;

use App\Models\Capster;
use App\Models\WorkHour;
use Illuminate\Database\Seeder;

class CapsterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $workHourIds = WorkHour::query()->pluck('id')->all();

        $capsters = [
            [
                'name' => 'Rizky Pratama',
                'whatsapp' => '6281211111111',
            ],
            [
                'name' => 'Aditya Mahendra',
                'whatsapp' => '6281211111112',
            ],
            [
                'name' => 'Fajar Nugroho',
                'whatsapp' => '6281211111113',
            ],
            [
                'name' => 'Dimas Putra',
                'whatsapp' => '6281211111114',
            ],
        ];

        foreach ($capsters as $index => $capster) {
            $workHourId = $workHourIds
                ? $workHourIds[$index % count($workHourIds)]
                : null;

            Capster::updateOrCreate(
                ['name' => $capster['name']],
                [
                    'whatsapp' => $capster['whatsapp'],
                    'image' => null,
                    'user_id' => null,
                    'work_hour_id' => $workHourId,
                ],
            );
        }
    }
}
