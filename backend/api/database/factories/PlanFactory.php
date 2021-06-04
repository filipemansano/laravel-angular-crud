<?php

namespace Database\Factories;

use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Plan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->lexify('?????'),
            'monthly_payment' => $this->faker->randomFloat(2,1,100),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }
}
