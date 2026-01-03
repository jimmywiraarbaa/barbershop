<?php

namespace Database\Seeders;

use App\Models\HairModel;
use Illuminate\Database\Seeder;

class HairModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            [
                'title' => 'Taper Fade',
                'description' => 'Fade tipis dengan garis rapi.',
            ],
            [
                'title' => 'Textured Crop',
                'description' => 'Crop pendek dengan tekstur natural.',
            ],
            [
                'title' => 'Pompadour Classic',
                'description' => 'Volume atas rapi dengan sisi clean.',
            ],
            [
                'title' => 'Buzz Cut Clean',
                'description' => 'Potongan tipis simpel dan gampang diatur.',
            ],
        ];

        foreach ($models as $model) {
            HairModel::updateOrCreate(
                ['title' => $model['title']],
                [
                    'description' => $model['description'],
                    'image' => null,
                ],
            );
        }
    }
}
