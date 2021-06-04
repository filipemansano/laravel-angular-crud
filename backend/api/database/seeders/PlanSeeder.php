<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Plan::factory()->createMany([
            ['id' => Plan::FREE_PLAN, 'name' => 'Free', 'monthly_payment' => 0],
            ['id' => Plan::BASIC_PLAN, 'name' => 'Basic', 'monthly_payment' => 100],
            ['id' => Plan::PLUS_PLAN, 'name' => 'Plus', 'monthly_payment' => 187],
        ]);
    }
}
