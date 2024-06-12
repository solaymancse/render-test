<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Nafizul Alam',
            'email' => 'shohebnafiz@gmail.com',
            'password' => bcrypt('123456789'),
        ]);
    }
}
