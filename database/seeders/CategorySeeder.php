<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 20; $i++) {
            Category::create([
                'name' => $faker->name(),
                'link' => $faker->url,
                'is_draft' => $faker->randomElement([0, 1]),
                'soft_delete' => $faker->randomElement([0, 1]),
            ]);
        }
    }
}
