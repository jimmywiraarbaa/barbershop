<?php

namespace Database\Seeders;

use App\Models\Price;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prices = [
            [
                'name' => 'Basic Haircut',
                'price' => 45000,
                'description' => 'Potong rambut standar + styling ringan.',
            ],
            [
                'name' => 'Haircut + Wash',
                'price' => 50000,
                'description' => 'Potong rambut + cuci rambut.',
            ],
            [
                'name' => 'Beard Trim',
                'price' => 40000,
                'description' => 'Rapikan jenggot dan garis tepi.',
            ],
            [
                'name' => 'Haircut + Beard Trim',
                'price' => 50000,
                'description' => 'Paket potong rambut + rapikan jenggot.',
            ],
            [
                'name' => 'Kids Haircut',
                'price' => 40000,
                'description' => 'Potong rambut anak.',
            ],
        ];

        foreach ($prices as $item) {
            Price::updateOrCreate(
                ['name' => $item['name']],
                [
                    'price' => $item['price'],
                    'description' => $item['description'],
                ],
            );
        }
    }
}
